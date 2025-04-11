'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";

export default function Home() {
  const [messageType, setMessageType] = useState('Appointment Reminder');
  const [phone, setPhone] = useState('');
  const [sending, setSending] = useState(false);
  const router = useRouter();

  const sendSMS = async () => {
    setSending(true);
    const user = await supabase.auth.getUser();
    const userId = user.data?.user?.id;

    if (!phone || !messageType || !userId) {
      alert('Missing phone, message type, or user ID');
      setSending(false);
      return;
    }

    const res = await fetch('/api/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, messageType, userId }),
    });

    const data = await res.json();
    setSending(false);

    if (!res.ok) {
      alert('Twilio send failed: ' + data.error);
    } else {
      alert('Message sent successfully!');
      setPhone('');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <Card className="w-full max-w-sm p-4 bg-white">
        <CardContent className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">SMS Console</h1>
            <button
              onClick={handleLogout}
              className="text-xs text-blue-600 hover:underline"
            >
              Log Out
            </button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full">
                {messageType}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              {[
                'Appointment Reminder',
                'Healing Follow-up',
                'We Miss You',
                'Thank You',
                'Confirmation',
              ].map((type) => (
                <DropdownMenuItem key={type} onClick={() => setMessageType(type)}>
                  {type}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Input
            type="text"
            placeholder="+1XXXXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <Button onClick={sendSMS} disabled={sending} className="w-full">
            {sending ? 'Sending...' : 'Send SMS'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

