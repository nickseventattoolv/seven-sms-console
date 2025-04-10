'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../utils/supabaseClient';

export default function LogsPage() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push('/login');
      }
    };
    checkSession();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white text-black rounded-2xl shadow-xl p-6 w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-4">📜 Message Log</h1>
        <p>This is your protected message log page. It will show SMS records here.</p>
      </div>
    </div>
  );
}
