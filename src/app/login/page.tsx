k'use client';

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

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    if (canvas && ctx) {
      handleResize();
      window.addEventListener('resize', handleResize);

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
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      <canvas id="matrixCanvas" className="absolute inset-0 z-0 opacity-100" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center px-4">
        <div className="bg-black/70 backdrop-blur-sm p-10 rounded-xl w-full max-w-md shadow-2xl border border-green-500/30">
          <h2 className="text-2xl font-bold mb-6 text-green-300 text-center bg-white/10 px-4 py-2 rounded-md inline-block shadow-sm">
            Login to Seven SMS Console
          </h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 rounded-md bg-black/40 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-inner"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-6 rounded-md bg-black/40 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-inner"
          />
          <button
            onClick={handleLogin}
            className="bg-green-500 hover:bg-green-600 text-white w-full py-3 rounded-md transition-colors duration-200 font-semibold shadow-md"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}

