'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';

const messages = {
  'Appointment Reminder': 'Hi, this is Seven Tattoo Studio. Just a reminder about your upcoming appointment tomorrow. Text us if you have any questions!',
  'Healing Follow-up': 'Hi, this is Seven Tattoo Studio. We hope you loved your tattoo! If you have any healing questions, feel free to reach out.',
  'We Miss You': 'Hi, this is Seven Tattoo Studio. It’s been a while! If you\'re thinking about your next piece, we’d love to help.',
};

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [phone, setPhone] = useState('');
  const [messageType, setMessageType] = useState('Appointment Reminder');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push('/login');
      } else {
        setUser(data.session.user);
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  const handleSend = async () => {
    if (!phone || !messageType || !user?.id) {
      alert('Missing phone, message type, or user ID.');
      return;
    }

    setSending(true);
    const res = await fetch('/api/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone,
        messageType,
        userId: user.id,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(`❌ Failed to send SMS: ${data.error || 'Unknown error'}`);
    } else {
      alert('✅ SMS sent successfully!');
      setPhone('');
    }

    setSending(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="absolute top-4 right-4">
        <button onClick={handleLogout} className="px-4 py-2 text-white border border-white">
          Log Out
        </button>
      </div>
      <div className="bg-white rounded-xl p-8 shadow-lg w-full max-w-md">
        <h1 className="text-xl font-semibold text-center mb-6">
          💬 Seven Tattoo Studio SMS Console
        </h1>
        <label className="block text-sm mb-2 font-semibold">Select Message Type:</label>
        <select
          className="w-full border px-3 py-2 mb-4"
          value={messageType}
          onChange={(e) => setMessageType(e.target.value)}
        >
          {Object.keys(messages).map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>

        <label className="block text-sm mb-2 font-semibold">Client Phone Number:</label>
        <input
          type="tel"
          placeholder="+1XXXXXXXXXX"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border px-3 py-2 mb-4"
        />

        <button
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-900"
          onClick={handleSend}
          disabled={sending}
        >
          {sending ? 'Sending...' : 'Send SMS'}
        </button>
      </div>
    </div>
  );
}

