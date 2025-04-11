k'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to Seven SMS Console</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">Choose a category below to begin:</p>
          <div className="flex flex-col gap-2">
            <Button asChild variant="default">
              <a href="/logs">📄 View Message Logs</a>
            </Button>
            <Button asChild variant="secondary">
              <a href="/dashboard">📊 Dashboard</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

