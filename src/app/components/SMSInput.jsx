'use client';

import { useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { useRouter } from 'next/navigation';

const messages = {
  'Appointment Reminder': 'Hi, this is Seven Tattoo Studio. Just a reminder about your upcoming appointment tomorrow. Text us if you have any questions!',
  'Healing Follow-up': 'Hi, this is Seven Tattoo Studio. We hope you loved your tattoo! If you have any healing questions, feel free to reach out.',
  'We Miss You': 'Hi, this is Seven Tattoo Studio. It’s been a while! If you\'re thinking about your next piece, we’d love to help.',
  'Thank You': 'Hi, this is Seven Tattoo Studio. Thank you again for trusting us with your tattoo — we appreciate you!',
  'Confirmation': 'Hi, this is Seven Tattoo Studio. Your appointment has been confirmed. Text us if you have any questions.',
};

export default function SMSInput() {
  const [phone, setPhone] = useState('');
  const [messageType, setMessageType] = useState('Appointment Reminder');
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState('');
  const router = useRouter();

  const handleSend = async () => {
    setSending(true);
    setFeedback('');

    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (!session?.user?.id) {
      setFeedback('You must be logged in to send a message.');
      router.push('/login');
      return;
    }

    const userId = session.user.id;
    const message = messages[messageType];

    const response = await fetch('/api/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone,
        message,
        messageType,
        userId,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      setFeedback('✅ Message sent!');
      setPhone('');
    } else {
      setFeedback(`❌ ${result.error || 'Failed to send message'}`);
    }

    setSending(false);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl text-center w-full max-w-md">
      <h1 className="text-2xl font-semibold mb-4">💬 Seven Tattoo Studio SMS Console</h1>

      <label className="block mb-2 text-left font-medium">Select Message Type:</label>
      <select
        className="w-full border p-2 rounded mb-4"
        value={messageType}
        onChange={(e) => setMessageType(e.target.value)}
      >
        {Object.keys(messages).map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>

      <label className="block mb-2 text-left font-medium">Client Phone Number:</label>
      <input
        className="w-full border p-2 rounded mb-4"
        placeholder="+1XXXXXXXXXX"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <button
        className="w-full bg-black text-white py-2 rounded hover:opacity-90 transition disabled:opacity-50"
        onClick={handleSend}
        disabled={sending}
      >
        {sending ? 'Sending...' : 'Send SMS'}
      </button>

      {feedback && <p className="mt-3 text-sm">{feedback}</p>}
    </div>
  );
}

