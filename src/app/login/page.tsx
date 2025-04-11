'use client';

import { useState } from 'react';
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
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-md max-w-sm w-full">
        <h1 className="text-xl font-bold text-center mb-4">Login to Seven SMS Console</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded text-black"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-white text-black py-2 rounded hover:bg-gray-200"
        >
          Log In
        </button>
      </div>
    </div>
  );
}

