'use client';
import React, { useEffect } from 'react';
import '../../styles/matrix.css';

export default function DashboardPage() {
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

  return (
    <div className="matrix">
      <canvas id="matrix-canvas"></canvas>
      <div className="matrix-content flex flex-col items-center justify-center h-screen px-4 text-white z-10 relative">
        <h1 className="text-3xl font-bold mb-6">Seven Tattoo Studio – SMS Console</h1>
        <form className="w-full max-w-md space-y-4">
          <select className="w-full p-2 rounded text-black">
            <option>Appointment Reminder</option>
            <option>Follow-Up</option>
            <option>Re-Engagement</option>
          </select>
          <input
            type="text"
            placeholder="+15149292061"
            className="w-full p-2 rounded text-black"
          />
          <button
            type="submit"
            className="w-full p-2 bg-green-600 hover:bg-green-700 transition rounded font-semibold"
          >
            Send SMS
          </button>
        </form>
      </div>
    </div>
  );
}

