'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { supabase } from '@/utils/supabaseClient'

export default function HomePage() {
  const router = useRouter()
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')

  const sendSMS = async () => {
    if (!phone || !message) return alert('Phone and message required')
    const res = await fetch('/api/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, message }),
    })
    const data = await res.json()
    if (data.success) alert('Message sent!')
    else alert('Error sending message.')
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-background text-foreground px-4">
      <div className="bg-white dark:bg-card p-10 rounded-2xl shadow-xl w-full max-w-md text-center">
        {/* LOGOUT BUTTON */}
        <div className="flex justify-end">
          <Button onClick={handleLogout} variant="destructive" size="sm">
            Logout
          </Button>
        </div>

        <h1 className="text-5xl font-sans mb-4">Welcome to Seven SMS Console</h1>
        <h2 className="text-3xl font-sans mb-6">Follow-Up Reminder</h2>

        {/* FORM */}
        <div className="space-y-4 text-left">
          <Input
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="text-lg"
          />
          <Input
            placeholder="Enter message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="text-lg"
          />
          <Button onClick={sendSMS} className="w-full text-lg">
            Send Message
          </Button>
          <Button
            onClick={() => router.push('/logs')}
            variant="secondary"
            className="w-full text-lg"
          >
            View Message Logs
          </Button>
        </div>
      </div>
    </main>
  )
}

