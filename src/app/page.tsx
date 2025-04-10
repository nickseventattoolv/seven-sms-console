'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../utils/supabaseClient';
import MatrixCanvas from './components/MatrixCanvas';
import SMSForm from './components/SMSForm';

export default function Home() {
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!data?.session) {
        router.push('/login');
      } else {
        setUserId(data.session.user.id);
      }
    };
    checkUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <MatrixCanvas />
      {userId && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10">
          <div className="bg-white p-8 rounded-xl shadow-lg w-[400px] text-center space-y-4">
            <h1 className="text-xl font-bold">💬 Seven Tattoo Studio SMS Console</h1>
            <button
              className="absolute top-4 right-4 text-xs text-gray-600 underline"
              onClick={handleLogout}
            >
              Log Out
            </button>
            <SMSForm senderId={userId} />
          </div>
        </div>
      )}
    </div>
  );
}

