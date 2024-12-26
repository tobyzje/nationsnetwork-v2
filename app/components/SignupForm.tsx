"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SignupFormProps {
  onSuccess: () => void;
}

export default function SignupForm({ onSuccess }: SignupFormProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const userData = {
      email: formData.get('email'),
      password: formData.get('password'),
      name: formData.get('name'),
      phone: formData.get('phone'),
      companyName: formData.get('companyName'),
      cvr: formData.get('cvr'),
      address: formData.get('address'),
      city: formData.get('city'),
      zipCode: formData.get('zipCode'),
      contactPerson: formData.get('contactPerson') || formData.get('name'),
      contactEmail: formData.get('contactEmail') || formData.get('email'),
      contactPhone: formData.get('contactPhone') || formData.get('phone'),
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Oprettelse fejlede')
      }

      toast({
        title: "Bruger oprettet",
        description: "Du er nu logget ind"
      })

      router.refresh()
      router.push('/dashboard')
      onSuccess()
    } catch (error) {
      toast({
        title: "Oprettelse fejlede",
        description: error instanceof Error ? error.message : "Der skete en fejl",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="personal">Personlig Info</TabsTrigger>
          <TabsTrigger value="company">Virksomhed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal" className="space-y-4">
          <Input
            type="text"
            name="name"
            placeholder="Dit navn"
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Adgangskode"
            required
          />
          <Input
            type="tel"
            name="phone"
            placeholder="Telefonnummer"
          />
        </TabsContent>
        
        <TabsContent value="company" className="space-y-4">
          <Input
            type="text"
            name="companyName"
            placeholder="Virksomhedsnavn"
          />
          <Input
            type="text"
            name="cvr"
            placeholder="CVR-nummer"
          />
          <Input
            type="text"
            name="address"
            placeholder="Adresse"
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="text"
              name="zipCode"
              placeholder="Postnr."
            />
            <Input
              type="text"
              name="city"
              placeholder="By"
            />
          </div>
        </TabsContent>
      </Tabs>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Opretter..." : "Opret bruger"}
      </Button>
    </form>
  )
} 