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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6">
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger value="personal" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Personlig Info
          </TabsTrigger>
          <TabsTrigger value="company" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Virksomhed
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal" className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              name="name"
              placeholder="Dit navn"
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 transition-all"
            />
          </div>
          <div className="space-y-2">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 transition-all"
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              name="password"
              placeholder="Adgangskode"
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 transition-all"
            />
          </div>
          <div className="space-y-2">
            <Input
              type="tel"
              name="phone"
              placeholder="Telefonnummer"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 transition-all"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="company" className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              name="companyName"
              placeholder="Virksomhedsnavn"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 transition-all"
            />
          </div>
          <div className="space-y-2">
            <Input
              type="text"
              name="cvr"
              placeholder="CVR-nummer"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 transition-all"
            />
          </div>
          <div className="space-y-2">
            <Input
              type="text"
              name="address"
              placeholder="Adresse"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 transition-all"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="text"
              name="zipCode"
              placeholder="Postnr."
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 transition-all"
            />
            <Input
              type="text"
              name="city"
              placeholder="By"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 transition-all"
            />
          </div>
        </TabsContent>
      </Tabs>

      <Button 
        type="submit" 
        disabled={loading} 
        className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Opretter...</span>
          </div>
        ) : (
          "Opret bruger"
        )}
      </Button>
    </form>
  )
} 