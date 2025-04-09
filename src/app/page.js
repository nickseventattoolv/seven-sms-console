'use client';

import { useState } from 'react';
import Matrix from './components/Matrix';

export default function Home() {
  const [phone, setPhone] = useState('');
  const [type, setType] = useState('1');
  const [status, setStatus] = useState('');

  const messages = {
    1: 'Hi, this is Seven Tattoo Studio. Just a reminder about your appointment tomorrow. Text us if you have any questions!',
    2: 'Hi, this is Seven Tattoo Studio. We hope you loved your tattoo! If you have any healing questions, feel free to reach out.',
    3: 'Hi, this is Seven Tattoo Studio. It’s been a while! If you’re thinking about your next piece, we’d love to help.',
  };

  const handleSend = async () => {
    setStatus('Sending...');
    const res = await fetch('/api/send-sms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, message: messages[type] }),
    });
    const data = await res.json();
    setStatus(data.success ? '✅ Message sent!' : `❌ Error: ${data.error}`);
  };

  return (
    <main className="relative h-screen overflow-hidden bg-black text-green-500">
      <Matrix />
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="bg-black bg-opacity-80 p-8 rounded-xl shadow-2xl w-full max-w-md text-white">
          <h1 className="text-2xl font-bold text-center mb-6">💬 Seven Tattoo Studio SMS Console</h1>

          <label className="block mb-2">Select Message Type:</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 mb-4 rounded bg-gray-900 border border-green-500 text-green-400"
          >
            <option value="1">Appointment Reminder</option>
            <option value="2">Follow-Up</option>
            <option value="3">Re-Engagement</option>
          </select>

          <label className="block mb-2">Client Phone Number:</label>
          <input
            type="text"
            placeholder="+15149292061"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 mb-4 rounded bg-gray-900 border border-green-500 text-green-400"
          />

          <button
            onClick={handleSend}
            className="w-full p-2 rounded bg-green-600 hover:bg-green-700 text-black font-bold"
          >
            Send SMS
          </button>

          {status && <p className="text-center mt-4 text-sm">{status}</p>}
        </div>
      </div>
    </main>
  );
}



