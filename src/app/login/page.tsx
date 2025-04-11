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
    <div className="flex items-center justify-center min-h-screen bg-black px-4 text-white">
      <div className="w-full max-w-sm p-8 rounded-lg border border-green-500 bg-black shadow-2xl">
        <h1 className="text-2xl font-bold text-center mb-6">
          💬 Seven Tattoo Studio SMS Console
        </h1>
        <input
          type="email"

