"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface PaymentDetails {
  id: string
  amount: number
  created: number
  customer: {
    name: string
    email: string
  }
  items: Array<{
    name: string
    quantity: number
    amount: number
  }>
  isSubscription: boolean
}

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [payment, setPayment] = useState<PaymentDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      if (!sessionId) return
      
      try {
        const response = await fetch(`/api/payment-success?session_id=${sessionId}`)
        if (!response.ok) throw new Error('Kunne ikke hente betalingsdetaljer')
        const data = await response.json()
        setPayment(data)
      } catch (error) {
        console.error('Fejl ved hentning af betalingsdetaljer:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPaymentDetails()
  }, [sessionId])

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('da-DK', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('da-DK', {
      style: 'currency',
      currency: 'DKK'
    }).format(amount / 100)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-100 pt-28 pb-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center">
            Indlæser betalingsdetaljer...
          </div>
        </div>
      </div>
    )
  }

  if (!payment) {
    return (
      <div className="min-h-screen bg-zinc-100 pt-28 pb-12">
        <div className="max-w-3xl mx-auto px-4">
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-red-500">Kunne ikke finde betalingsdetaljer</p>
              <Link href="/priser">
                <Button className="mt-4">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Tilbage til priser
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-100 pt-28 pb-12">
      <div className="max-w-3xl mx-auto px-4">
        <Card>
          <CardHeader className="text-center border-b">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="h-6 w-6 text-green-500" />
            </div>
            <CardTitle className="text-2xl text-green-500">Betaling gennemført!</CardTitle>
            <CardDescription>
              Tak for din bestilling. En bekræftelse er sendt til din email.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-2">
              <h3 className="font-medium">Ordredetaljer</h3>
              <p className="text-sm text-gray-500">Ordre ID: {payment.id}</p>
              <p className="text-sm text-gray-500">Dato: {formatDate(payment.created)}</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Kundeoplysninger</h3>
              <p className="text-sm text-gray-500">{payment.customer.name}</p>
              <p className="text-sm text-gray-500">{payment.customer.email}</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Købte produkter</h3>
              <div className="border rounded-lg divide-y">
                {payment.items.map((item, index) => (
                  <div key={index} className="p-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">Antal: {item.quantity}</p>
                    </div>
                    <p className="font-medium">{formatAmount(item.amount)}</p>
                  </div>
                ))}
                <div className="p-4 flex justify-between items-center bg-gray-50">
                  <p className="font-medium">Total</p>
                  <p className="font-bold text-lg">{formatAmount(payment.amount)}</p>
                </div>
              </div>
            </div>

            {payment.isSubscription && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-700">
                  Dit abonnement er nu aktivt. Du vil blive faktureret månedligt.
                </p>
              </div>
            )}

            <div className="flex justify-center pt-4">
              <Link href="/payment">
                <Button>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Se alle dine betalinger
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Hovedkomponenten med Suspense
export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-zinc-100 pt-28 pb-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center">
            Indlæser betalingsdetaljer...
          </div>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  )
} 