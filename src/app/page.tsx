'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';
import Matrix from './components/Matrix';

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [phone, setPhone] = useState('');
  const [messageType, setMessageType] = useState('Appointment Reminder');
  const [sending, setSending] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push('/login');
      } else {
        setUser(data.session.user.id);
      }
    };
    checkUser();
  }, [router]);

  const handleSend = async () => {
    if (!phone || !messageType || !user) {
      alert('Missing phone, message type, or user ID');
      return;
    }

    setSending(true);

    const res = await fetch('/api/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, messageType, userId: user }),
    });

    const data = await res.json();
    setSending(false);

    if (!res.ok) {
      alert(`Failed to send SMS: ${data.error || 'Unknown error'}`);
    } else {
      alert('✅ SMS sent!');
      setPhone('');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Matrix />
      <div className="absolute top-4 right-4 z-50">
        <button onClick={handleLogout} className="px-4 py-2 bg-black text-white rounded">
          Log Out
        </button>
      </div>

      <div className="absolute inset-0 flex items-center justify-center z-40">
        <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md text-center space-y-4">
          <h1 className="text-2xl font-bold">🗨️ Seven Tattoo Studio SMS Console</h1>

          <div className="text-left space-y-2">
            <label className="block text-sm font-medium">Select Message Type:</label>
            <select
              value={messageType}
              onChange={(e) => setMessageType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option>Appointment Reminder</option>
              <option>Healing Follow-up</option>
              <option>We Miss You</option>
              <option>Thank You</option>
              <option>Confirmation</option>
            </select>

            <label className="block text-sm font-medium">Client Phone Number:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="+1XXXXXXXXXX"
            />
          </div>

          <button
            onClick={handleSend}
            disabled={sending}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 disabled:opacity-50"
          >
            {sending ? 'Sending...' : 'Send SMS'}
          </button>
        </div>
      </div>
    </div>
  );
}

