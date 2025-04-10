'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';

export default function SMSInput() {
  const [selectedType, setSelectedType] = useState('Appointment Reminder');
  const [phone, setPhone] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Fetch user session
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        setUserId(session.user.id);
      }
    };

    getUser();
  }, []);

  const handleSend = async () => {
    if (!phone || !selectedType || !userId) {
      alert('Please fill in all fields and ensure you are logged in.');
      return;
    }

    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          type: selectedType,
          userId,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('✅ SMS sent successfully!');
        setPhone('');
      } else {
        console.error('Twilio send failed:', data.error);
        alert(`Failed to send SMS: ${data.error}`);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('Something went wrong.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md p-8 bg-white rounded-2xl shadow-xl space-y-4">
      <h1 className="text-xl font-semibold text-center">💬 Seven Tattoo Studio SMS Console</h1>

      <div className="w-full">
        <label className="block mb-1 font-medium">Select Message Type:</label>
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

      <div className="w-full">
        <label className="block mb-1 font-medium">Client Phone Number:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+1XXXXXXXXXX"
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        onClick={handleSend}
        className="w-full py-2 mt-2 text-white bg-black rounded hover:opacity-90"
      >
        Send SMS
      </button>
    </div>
  );
}

