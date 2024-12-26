"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

interface OrderModalProps {
  isOpen: boolean
  onClose: () => void
  product: {
    id: string
    name: string
    price: string
    description: string
    period?: string
  }
}

interface Addon {
  id: string
  label: string
  price: string
  period?: string
}

const formatPrice = (price: string) => {
  return new Intl.NumberFormat('da-DK', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(Number(price))
}

const addons: Addon[] = [
  { id: "blog", label: "Blog post", price: "299" },
  { id: "konti", label: "Komplet konti-system", price: "999" },
  { id: "vedligeholdelse", label: "Vedligeholdelse af hjemmeside", price: "799", period: "md" },
  { id: "hosting", label: "Hosting af hjemmeside", price: "50", period: "md" },
  { id: "nyhedsbrev", label: "Nyhedsbrev", price: "699", period: "md" },
]

export default function OrderModal({ isOpen, onClose, product }: OrderModalProps) {
  const [loading, setLoading] = useState(false)
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.target as HTMLFormElement)
    const contactInfo = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      company: formData.get('company') as string,
      message: formData.get('message') as string,
      product: product.name,
      addons: addons.filter(addon => selectedAddons.includes(addon.id))
    }

    try {
      // Send email eller gem i database
      const response = await fetch('/api/send-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactInfo),
      })

      if (response.ok) {
        alert('Tak for din henvendelse. Vi kontakter dig hurtigst muligt!')
        onClose()
      } else {
        throw new Error('Noget gik galt')
      }
    } catch {
      alert('Der skete en fejl. Prøv venligst igen eller kontakt os direkte.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Anmod om {product.name}</DialogTitle>
          <DialogDescription>
            Udfyld formularen, så kontakter vi dig for at diskutere dine behov og oprette et tilbud
          </DialogDescription>
        </DialogHeader>

        <div className="bg-blue-50 p-4 rounded-lg flex gap-2 items-start mt-4">
          <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
          <p className="text-sm text-blue-700">
            Denne pakke faktureres efter aftale. Vi kontakter dig for at gennemgå dine specifikke behov 
            og udarbejde et skræddersyet tilbud.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 max-h-[60vh] overflow-y-auto p-4">
          {/* Venstre kolonne - Formular */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Navn *</Label>
              <Input id="name" name="name" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" name="email" type="email" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefon *</Label>
              <Input id="phone" name="phone" type="tel" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Virksomhed</Label>
              <Input id="company" name="company" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Besked</Label>
              <Input id="message" name="message" />
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <Button type="button" variant="outline" onClick={onClose}>
                Annuller
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Sender..." : "Send forespørgsel"}
              </Button>
            </div>
          </form>

          {/* Højre kolonne - Tilkøb og Opsummering */}
          <div className="space-y-4">
            <div className="space-y-4">
              <Label>Tilkøbsmuligheder</Label>
              <Card className="bg-gray-50">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {addons.map((addon) => (
                      <div key={addon.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={addon.id}
                            checked={selectedAddons.includes(addon.id)}
                            onCheckedChange={(checked) => {
                              setSelectedAddons(prev => 
                                checked 
                                  ? [...prev, addon.id]
                                  : prev.filter(id => id !== addon.id)
                              )
                            }}
                          />
                          <label
                            htmlFor={addon.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {addon.label}
                          </label>
                        </div>
                        <div className="text-sm">
                          {formatPrice(addon.price)} kr
                          {addon.period && <span className="text-gray-500">/{addon.period}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-50">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">Fra {formatPrice(product.price)} kr</p>
                    {product.period && (
                      <span className="text-sm text-gray-500">/{product.period}</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}