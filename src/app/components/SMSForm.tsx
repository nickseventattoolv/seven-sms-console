'use client';

import { useState } from 'react';

type Props = {
  senderId: string;
};

const messages: Record<string, string> = {
  'Appointment Reminder': 'Hi, this is Seven Tattoo Studio. Just a reminder about your upcoming appointment tomorrow. Text us if you have any questions!',
  'Healing Follow-up': 'Hi, this is Seven Tattoo Studio. We hope you loved your tattoo! If you have any healing questions, feel free to reach out.',
  'We Miss You': 'Hi, this is Seven Tattoo Studio. It’s been a while! If you’re thinking about your next piece, we’d love to help.',
};

export default function SMSForm({ senderId }: Props) {
  const [phone, setPhone] = useState('');
  const [messageType, setMessageType] = useState('Appointment Reminder');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    const res = await fetch('/api/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone,
        message: messages[messageType],
        messageType,
        senderId,
      }),
    });

    if (res.ok) {
      alert('✅ SMS sent successfully!');
      setPhone('');
    } else {
      const err = await res.json();
      alert(`❌ Failed to send SMS: ${err.error || 'Unknown error'}`);
    }

    setSending(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label className="text-left font-medium">Select Message Type:</label>
      <select
        className="p-2 border rounded"
        value={messageType}
        onChange={(e) => setMessageType(e.target.value)}
      >
        {Object.keys(messages).map((type) => (
          <option key={type}>{type}</option>
        ))}
      </select>

      <label className="text-left font-medium">Client Phone Number:</label>
      <input
        className="p-2 border rounded"
        placeholder="+1XXXXXXXXXX"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />

      <button
        type="submit"
        className="bg-black text-white py-2 rounded hover:opacity-80"
        disabled={sending}
      >
        {sending ? 'Sending...' : 'Send SMS'}
      </button>
    </form>
  );
}

