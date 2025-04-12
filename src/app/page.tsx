'use client'

import { useState } from 'react'
import { supabase } from '@/utils/supabaseClient'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleSend = async () => {
    if (!phone || !message) return alert('Phone number and message are required.')
    const { error } = await supabase.from('messages').insert([{ phone, message }])
    if (error) {
      alert('Error sending message: ' + error.message)
    } else {
      alert('Message sent!')
      setPhone('')
      setMessage('')
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <div className="w-full max-w-md space-y-6 border rounded-xl p-6">
        <h1 className="text-center text-4xl bebas-neue-regular">Welcome to Seven SMS Console</h1>
        <p className="text-center text-lg bebas-neue-regular">
          Easily send follow-ups, reminders, and thank you messages — all in one place.
        </p>

        <div className="space-y-3">
          <Input
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Input
            placeholder="Enter message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button className="w-full text-lg bebas-neue-regular" onClick={handleSend}>
            Send Message
          </Button>
          <Button
            variant="secondary"
            className="w-full text-lg bebas-neue-regular"
            onClick={() => router.push('/logs')}
          >
            View Message Logs
          </Button>
          <Button
            variant="ghost"
            className="w-full text-sm text-muted-foreground bebas-neue-regular"
            onClick={handleLogout}
          >
            Log Out
          </Button>
        </div>
      </div>
    </div>
  )
}

