'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';

export default function Home() {
  const [messageType, setMessageType] = useState('Appointment Reminder');
  const [phone, setPhone] = useState('');
  const [sending, setSending] = useState(false);
  const router = useRouter();

  const sendSMS = async () => {
    setSending(true);
    const user = await supabase.auth.getUser();
    const userId = user.data?.user?.id;

    if (!phone || !messageType || !userId) {
      alert('Missing phone, message type, or user ID');
      setSending(false);
      return;
    }

    const res = await fetch('/api/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, messageType, userId }),
    });

    const data = await res.json();
    setSending(false);

    if (!res.ok) {
      alert('Twilio send failed: ' + data.error);
    } else {
      alert('Message sent successfully!');
      setPhone('');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  useEffect(() => {
    const canvas = document.getElementById('matrixCanvas') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');

    if (canvas && ctx) {
      canvas.height = window.innerHeight;
      canvas.width = window.innerWidth;

      const letters = '01';
      const fontSize = 16;
      const columns = canvas.width / fontSize;
      const drops: number[] = Array(Math.floor(columns)).fill(1);

      const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
          const text = letters[Math.floor(Math.random() * letters.length)];
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
          drops[i]++;
        }
      };

      const interval = setInterval(draw, 33);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      <canvas id="matrixCanvas" className="absolute inset-0 z-0" />
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
          <h1 className="text-xl font-bold mb-4">💬 Seven Tattoo Studio SMS Console</h1>
          <button
            onClick={handleLogout}
            className="text-xs text-right text-blue-600 hover:underline mb-2 float-right"
          >
            Log Out
          </button>
          <select
            value={messageType}
            onChange={(e) => setMessageType(e.target.value)}
            className="w-full p-2 mb-3 border rounded"
          >
            <option>Appointment Reminder</option>
            <option>Healing Follow-up</option>
            <option>We Miss You</option>
            <option>Thank You</option>
            <option>Confirmation</option>
          </select>
          <input
            type="text"
            placeholder="+1XXXXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 mb-3 border rounded"
          />
          <button
            onClick={sendSMS}
            disabled={sending}
            className={`w-full py-2 rounded text-white ${
              sending ? 'bg-gray-600' : 'bg-black hover:bg-gray-800'
            }`}
          >
            {sending ? 'Sending...' : 'Send SMS'}
          </button>
        </div>
      </div>
    </div>
  );
}

