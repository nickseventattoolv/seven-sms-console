'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert('Login failed: ' + error.message);
    } else {
      router.push('/');
    }
  };

  useEffect(() => {
    const canvas = document.getElementById('matrixCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const letters = '01'.split('');
    const fontSize = 14;
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

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black relative overflow-hidden">
      {/* Matrix Canvas */}
      <canvas id="matrixCanvas" className="absolute inset-0 z-0 pointer-events-none" />

      {/* Solid Login Box */}
      <div className="relative z-10 w-[90%] max-w-md">
        <div className="bg-white border border-green-500 shadow-xl rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-center text-black mb-4">Login</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded bg-white text-black mb-3"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded bg-white text-black mb-4"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold py-2 rounded"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}

