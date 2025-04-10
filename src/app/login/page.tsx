'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert('Login failed: ' + error.message);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <canvas id="matrixCanvas" className="absolute inset-0 z-0" />
      <div className="flex items-center justify-center h-full z-10 relative">
        <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
          <h1 className="text-xl font-semibold mb-6">Login to Seven SMS Console</h1>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-4 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="bg-black text-white px-4 py-2 rounded w-full"
          >
            Log In
          </button>
        </div>
      </div>
      <script>
        {`
        const canvas = document.getElementById('matrixCanvas');
        const ctx = canvas?.getContext('2d');
        if (canvas && ctx) {
          canvas.height = window.innerHeight;
          canvas.width = window.innerWidth;

          const letters = '01';
          const fontSize = 16;
          const columns = canvas.width / fontSize;
          const drops = Array(Math.floor(columns)).fill(1);

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

          setInterval(draw, 35);
        }
        `}
      </script>
    </div>
  );
}

