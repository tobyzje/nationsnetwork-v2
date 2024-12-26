"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface CheckoutButtonProps {
  name: string
  price: string
  period?: string
  description: string
}

export default function CheckoutButton({ name, price, period, description }: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleCheckout = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          price: Number(price.replace(/[^0-9]/g, '')),
          period,
          description
        }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('Kunne ikke oprette betalingslink')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      toast({
        title: "Der skete en fejl",
        description: "Kunne ikke behandle din betaling. Prøv igen senere.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button 
      variant="outline" 
      className="w-full" 
      onClick={handleCheckout}
      disabled={isLoading}
    >
      {isLoading ? "Behandler..." : "Tilføj til bestilling"}
    </Button>
  )
} 