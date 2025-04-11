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
    const ctx = canvas?.getContext('2d');

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    if (canvas && ctx) {
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      const letters = '0123456789ABCDEF';
      const fontSize = 14;
      const columns = Math.floor(canvas.width / fontSize);
      const drops: number[] = Array(columns).fill(1);

      const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < drops.length; i++) {
          const text = letters[Math.floor(Math.random() * letters.length)];
          const color = Math.random() < 0.1 ? 'rgba(100, 255, 100, 0.9)' : 'rgba(0, 255, 0, 0.75)';
          ctx.fillStyle = color;
          ctx.font = fontSize + 'px monospace';
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);
          drops[i] += 1 + Math.random() * 2;

          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
        }
      };

      const interval = setInterval(draw, 25);

      return () => {
        clearInterval(interval);
        window.removeEventListener('resize', resizeCanvas);
      };
    }
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black text-white">
      <canvas id="matrixCanvas" className="absolute inset-0 z-0" />
      <div className="absolute inset-0 z-10 flex items-center justify-center px-4">
        <div className="bg-black/90 backdrop-blur-sm p-8 rounded-lg border border-green-500 shadow-2xl w-full max-w-sm">
          <h1 className="text-2xl font-bold text-center mb-6">
            💬 Seven Tattoo Studio SMS Console
          </h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-4 py-2 bg-black border border-green-500 text-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-6 px-4 py-2 bg-black border border-green-500 text-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-2 rounded-md border border-white transition-colors"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}

