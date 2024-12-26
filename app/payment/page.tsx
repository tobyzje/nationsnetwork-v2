"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react"

interface Payment {
  id: string
  amount: number
  status: "succeeded" | "processing" | "failed"
  created: number
  description: string
  isSubscription: boolean
}

export default function PaymentPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch('/api/payments')
        if (!response.ok) {
          const errorData = await response.json()
          console.error('Payment API Error:', errorData)
          throw new Error(errorData.details || 'Failed to fetch payments')
        }
        const data = await response.json()
        setPayments(data.payments)
      } catch (error) {
        console.error('Fejl ved hentning af betalinger:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPayments()
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'succeeded':
        return <Badge className="bg-green-500"><CheckCircle2 className="w-4 h-4 mr-1" /> Gennemført</Badge>
      case 'processing':
        return <Badge className="bg-yellow-500"><Clock className="w-4 h-4 mr-1" /> Behandler</Badge>
      case 'failed':
        return <Badge className="bg-red-500"><XCircle className="w-4 h-4 mr-1" /> Fejlet</Badge>
      default:
        return <Badge className="bg-gray-500"><AlertCircle className="w-4 h-4 mr-1" /> Ukendt</Badge>
    }
  }

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
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            Indlæser betalinger...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-100 pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Betalinger</h1>
          <p className="text-gray-600">Oversigt over dine betalinger og abonnementer</p>
        </div>

        <div className="grid gap-6">
          {payments.length > 0 ? (
            payments.map((payment) => (
              <Card key={payment.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{payment.description}</CardTitle>
                      <CardDescription>{formatDate(payment.created)}</CardDescription>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(payment.status)}
                      {payment.isSubscription && (
                        <Badge variant="outline">Abonnement</Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{formatAmount(payment.amount)}</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-gray-500">Ingen betalinger at vise</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
} 