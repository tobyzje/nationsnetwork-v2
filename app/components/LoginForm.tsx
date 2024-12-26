"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface LoginFormProps {
  onSuccess: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.get('email'),
          password: formData.get('password'),
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Login fejlede')
      }

      toast({
        title: "Login succesfuld",
        description: "Du er nu logget ind"
      })

      router.refresh()
      onSuccess()
    } catch (error) {
      toast({
        title: "Login fejlede",
        description: error instanceof Error ? error.message : "Der skete en fejl",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          required
        />
      </div>
      <div>
        <Input
          type="password"
          name="password"
          placeholder="Adgangskode"
          required
        />
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Logger ind..." : "Log ind"}
      </Button>
    </form>
  )
} 