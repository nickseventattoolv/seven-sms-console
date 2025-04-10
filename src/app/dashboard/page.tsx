'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import '../../styles/matrix.css';

const supabaseUrl = 'https://hfriuxbaqsudyyuywtzr.supabase.co';
const supabaseKey = 'YOUR_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function DashboardPage() {
  const [phone, setPhone] = useState('');
  const [template, setTemplate] = useState('Appointment Reminder');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const canvas = document.getElementById('matrix-canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    const columns = window.innerWidth / 20;
    const drops: number[] = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      if (!ctx) return;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0F0';
      ctx.font = '16px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = String.fromCharCode(0x30A0 + Math.random() * 96);
        ctx.fillText(text, i * 20, drops[i] * 20);
        if (drops[i] * 20 > canvas.height || Math.random() > 0.95) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('');

    if (!phone) {
      setStatus('❌ Please enter a phone number.');
      return;
    }

    try {
      const { error } = await supabase.from('messages').insert([
        {
          phone,
          message_type: template,
          sent_at: new Date().toISOString(),
          sender_id: 'system-user', // change later if needed
        },
      ]);

      if (error) {
        console.error(error);
        setStatus('❌ Failed to log message.');
      } else {
        setStatus('✅ Message sent and logged!');
        setPhone('');
      }
    } catch (err) {
      console.error(err);
      setStatus('❌ Something went wrong.');
    }
  };

  return (
    <div className="matrix">
      <canvas id="matrix-canvas"></canvas>
      <div className="matrix-content flex flex-col items-center justify-center h-screen px-4 text-white z-10 relative">
        <h1 className="text-3xl font-bold mb-6">Seven Tattoo Studio – SMS Console</h1>
        <form
          className="w-full max-w-md space-y-4 bg-white/5 backdrop-blur-md p-6 rounded-xl border border-green-500"
          onSubmit={handleSubmit}
        >
          <select
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            className="w-full p-2 rounded text-black"
          >
            <option>Appointment Reminder</option>
            <option>Follow-Up</option>
            <option>Re-Engagement</option>
          </select>
          <input
            type="text"
            placeholder="+1 (___) ___ - ____"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 rounded text-black"
          />
          <button
            type="submit"
            className="w-full p-2 bg-green-500 hover:bg-green-600 text-black font-bold rounded transition"
          >
            Send SMS
          </button>
          {status && (
            <p className="text-green-300 text-center text-sm mt-2">{status}</p>
          )}
        </form>
      </div>
    </div>
  );
}

