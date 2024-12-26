"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/context/CartContext"
import { useState } from "react"

interface ContactInfo {
  name: string
  email: string
  phone: string
  company?: string
  cvr?: string
}

export default function CheckoutButton() {
  const { cart, total } = useCart()
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    try {
      setLoading(true)
      
      // Validér at alle påkrævede felter er udfyldt
      const name = (document.getElementById('name') as HTMLInputElement)?.value
      const email = (document.getElementById('email') as HTMLInputElement)?.value
      const phone = (document.getElementById('phone') as HTMLInputElement)?.value
      const company = (document.getElementById('company') as HTMLInputElement)?.value
      const cvr = (document.getElementById('cvr') as HTMLInputElement)?.value

      if (!name || !email || !phone) {
        alert('Udfyld venligst alle påkrævede felter')
        return
      }

      const contactInfo: ContactInfo = {
        name,
        email,
        phone,
        company,
        cvr
      }

      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart,
          contactInfo
        }),
      })

      const data = await response.json()
      
      // Redirect til betalings-siden
      window.location.href = data.url
    } catch (error) {
      console.error('Fejl ved checkout:', error)
      alert('Der skete en fejl. Prøv venligst igen.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button 
      onClick={handleCheckout} 
      disabled={cart.length === 0 || loading}
      className="w-full"
    >
      {loading ? 'Behandler...' : `Betal ${total} kr.`}
    </Button>
  )
} 