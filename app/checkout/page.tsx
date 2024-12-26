"use client"

import { useCart } from "@/context/CartContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Trash2 } from "lucide-react"

export default function CheckoutPage() {
  const { cart, total, removeFromCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    cvr: ""
  })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage(null)

    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cart.map(item => ({
            name: item.name,
            description: item.description,
            price: item.price,
            period: item.period,
            billingCycle: item.billingCycle
          })),
          contactInfo: formData
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Der skete en fejl ved behandling af betalingen')
      }

      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('Ingen betalings-URL modtaget')
      }
    } catch (error: unknown) {
      console.error('Betalingsfejl:', error)
      setErrorMessage(error instanceof Error ? error.message : 'Der skete en uventet fejl')
    } finally {
      setLoading(false)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-100 py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Din indkøbskurv er tom</h1>
          <Button onClick={() => router.push("/priser")}>
            Se vores produkter
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-100 py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid gap-8 md:grid-cols-[1fr,380px]">
          {/* Venstre side - Kontaktinfo */}
          <Card>
            <CardHeader>
              <CardTitle>Kontaktinformation</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Navn</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Virksomhed (valgfrit)</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cvr">CVR-nummer (valgfrit)</Label>
                  <Input
                    id="cvr"
                    value={formData.cvr}
                    onChange={(e) => setFormData({...formData, cvr: e.target.value})}
                  />
                </div>

                {errorMessage && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    <p>{errorMessage}</p>
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-green-500 hover:bg-green-600"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Behandler...
                    </>
                  ) : (
                    `Betal ${total} kr`
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Højre side - Ordreoversigt */}
          <Card>
            <CardHeader>
              <CardTitle>Din ordre</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-start pb-4 border-b">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.description}</p>
                      {item.billingCycle && (
                        <p className="text-sm text-gray-500">
                          {item.billingCycle === 'monthly' ? 'Månedlig' : 'Årlig'} betaling
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-medium">{item.price} kr</p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}

                <div className="pt-4 border-t">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>{total} kr</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Ekskl. moms</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 