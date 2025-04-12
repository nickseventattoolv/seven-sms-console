'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSupabase } from '@/utils/supabaseClient'

export default function HomePage() {
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()
  const supabase = useSupabase()

  const sendSMS = () => {
    if (!phone || !message) return alert('Phone number and message required')
    console.log('Sending message:', { phone, message })
    // Your Twilio logic would go here
  }

  const logout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-10 text-center font-sans">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">WELCOME TO SEVEN SMS CONSOLE</h1>
      <p className="text-lg md:text-xl mb-8">
        Easily send follow-ups, reminders, and thank you messages to clients — all in one place.
      </p>

      <div className="flex flex-col items-center gap-4 max-w-sm w-full mx-auto">
        <Input
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="text-base"
        />
        <Input
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="text-base"
        />
        <Button onClick={sendSMS} className="text-base w-full">
          Send Message
        </Button>
        <Button
          onClick={() => router.push('/logs')}
          variant="secondary"
          className="text-base w-full"
        >
          View Message Logs
        </Button>
        <Button
          variant="ghost"
          onClick={logout}
          className="text-sm text-muted-foreground underline mt-4"
        >
          Log Out
        </Button>
      </div>
    </main>
  )
}

