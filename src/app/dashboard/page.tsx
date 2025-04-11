'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hfriuxbaqsudyyuywtzr.supabase.co';
const supabaseKey = 'YOUR_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function DashboardPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login with', email, password);
  };

  return (
    <div className="matrix">
      <canvas id="matrix-canvas"></canvas>
      <div className="matrix-content flex items-center justify-center min-h-screen px-4 text-white relative">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm bg-white/10 backdrop-blur-md p-6 rounded-xl border border-green-500 shadow-lg"
        >
          <h1 className="text-2xl font-bold text-center text-green-400 mb-4">Login to Seven SMS Console</h1>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full mb-3 p-2 rounded text-black placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full mb-4 p-2 rounded text-black placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <button
            type="submit"
            className="w-full p-2 bg-green-500 hover:bg-green-600 text-black font-bold rounded transition"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

