"use client"

import { useState } from "react"
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"

export default function CheckoutButton() {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    
    if (!stripe || !elements) return
    
    setIsProcessing(true)
    
    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
      })

      if (error) {
        setErrorMessage(error.message || "Der skete en fejl")
      }
    } catch {
      setErrorMessage("Der skete en uventet fejl")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button 
        className="w-full mt-4"
        disabled={isProcessing || !stripe || !elements}
      >
        {isProcessing ? "Behandler..." : "Betal nu"}
      </Button>
      {errorMessage && (
        <div className="text-red-500 mt-2">{errorMessage}</div>
      )}
    </form>
  )
} 