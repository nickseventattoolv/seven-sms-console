'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';

export default function Home() {
  const [selectedType, setSelectedType] = useState('Appointment Reminder');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push('/login');
      } else {
        setUser(data.session.user);
      }
    };
    checkUser();
  }, [router]);

  const sendSMS = async () => {
    if (!phone || !selectedType) return alert('Please fill in all fields');

    setLoading(true);

    const messageMap = {
      'Appointment Reminder':
        'Hi, this is Seven Tattoo Studio. Just a reminder about your upcoming appointment tomorrow. Text us if you have any questions!',
      'Healing Follow-up':
        'Hi, this is Seven Tattoo Studio. We hope you loved your tattoo! If you have any healing questions, feel free to reach out.',
      'We Miss You':
        'Hi, this is Seven Tattoo Studio. It’s been a while! If you’re thinking about your next piece, we’d love to help.',
      'Thank You':
        'Hi, this is Seven Tattoo Studio. Thank you again for coming in. We appreciate your trust in our team!',
      'Confirmation':
        'Hi, this is Seven Tattoo Studio. Just confirming your upcoming appointment is officially locked in. See you soon!'
    };

    const message = messageMap[selectedType];

    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id;

    const res = await fetch('/api/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone,
        messageType: selectedType,
        message,
        userId
      })
    });

    const data = await res.json();

    if (data.success) {
      alert('SMS sent successfully!');
      setPhone('');
      setSelectedType('Appointment Reminder');
    } else {
      alert('Failed to send SMS: ' + data.error);
    }

    setLoading(false);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <button
        onClick={logout}
        className="absolute top-5 right-5 bg-white text-black px-4 py-1 rounded"
      >
        Log Out
      </button>
      <div className="bg-white p-8 rounded shadow-md text-center z-50">
        <h1 className="text-2xl font-bold mb-4">
          💬 Seven Tattoo Studio SMS Console
        </h1>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Select Message Type:</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option>Appointment Reminder</option>
            <option>Healing Follow-up</option>
            <option>We Miss You</option>
            <option>Thank You</option>
            <option>Confirmation</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Client Phone Number:</label>
          <input
            type="text"
            placeholder="+1XXXXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          onClick={sendSMS}
          disabled={loading}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
        >
          {loading ? 'Sending...' : 'Send SMS'}
        </button>
      </div>
    </div>
  );
}

