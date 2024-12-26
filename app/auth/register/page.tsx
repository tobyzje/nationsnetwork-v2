"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Mail, Lock, User, Building2, Phone } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function RegisterPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.get('email'),
          password: formData.get('password'),
          name: formData.get('name'),
          companyName: formData.get('companyName'),
          phone: formData.get('phone')
        })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Der skete en fejl')
      }

      toast({
        title: "Konto oprettet",
        description: "Du kan nu logge ind"
      })

      router.push('/auth/login')

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registrering fejlede",
        description: error instanceof Error ? error.message : "Der skete en fejl"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md space-y-8 p-8 bg-white">
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Opret ny konto
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Eller{' '}
            <Link 
              href="/auth/login" 
              className="font-medium text-green-600 hover:text-green-500"
            >
              log ind på eksisterende konto
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">Navn</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="pl-10"
                  placeholder="Dit navn"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="pl-10"
                  placeholder="Email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="companyName" className="sr-only">Virksomhed</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building2 className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="companyName"
                  name="companyName"
                  type="text"
                  required
                  className="pl-10"
                  placeholder="Virksomhedsnavn"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="sr-only">Telefon</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="pl-10"
                  placeholder="Telefonnummer (valgfrit)"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Adgangskode</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="pl-10"
                  placeholder="Adgangskode"
                />
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading}
          >
            {loading ? "Opretter konto..." : "Opret konto"}
          </Button>
        </form>
      </Card>
    </div>
  )
}
