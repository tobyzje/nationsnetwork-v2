"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent")
    if (!consent) {
      setShowConsent(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted")
    setShowConsent(false)
  }

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined")
    setShowConsent(false)
  }

  if (!showConsent) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-black/20 backdrop-blur-sm">
      <Card className="max-w-4xl mx-auto p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600">
            <p className="mb-2">
              Vi bruger cookies for at forbedre din oplevelse på vores website. 
              Ved at fortsætte accepterer du vores brug af cookies.
            </p>
            <Link href="/cookie-politik" className="text-green-600 hover:underline">
              Læs mere om vores cookie-politik
            </Link>
          </div>
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              onClick={handleDecline}
              className="whitespace-nowrap"
            >
              Afvis alle
            </Button>
            <Button 
              onClick={handleAccept}
              className="whitespace-nowrap bg-green-500 hover:bg-green-600"
            >
              Accepter alle
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
} 