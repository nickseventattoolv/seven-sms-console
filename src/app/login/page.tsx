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

  return (
    <div className="flex items-center justify-center min-h-screen bg-black relative overflow-hidden">
      <canvas id="matrixCanvas" className="absolute inset-0 z-0 pointer-events-none" />
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

