'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'

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

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-background text-foreground px-4">
      <div className="bg-white dark:bg-card p-10 rounded-2xl shadow-xl w-full max-w-xl text-center">
        <h1 className="text-5xl font-sans mb-4">Welcome to Seven SMS Console</h1>
        <h2 className="text-3xl font-sans mb-8">Follow-Up Reminder</h2>

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
          <div className="flex justify-between pt-4 gap-4">
            <Button
              className="w-full text-lg"
              onClick={sendSMS}
            >
              Send Message
            </Button>
            <Button
              className="w-full text-lg"
              variant="secondary"
              onClick={() => router.push('/logs')}
            >
              View Message Logs
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

