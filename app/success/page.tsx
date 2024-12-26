"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/CartContext"

function SuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { dispatch } = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const sessionId = searchParams.get('session_id')
    if (sessionId) {
      dispatch({ type: 'CLEAR_CART' })
    }
  }, [searchParams, dispatch])

  if (!mounted) return null

  return (
    <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
      <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
      <h1 className="text-2xl font-bold mb-4">Tak for din ordre!</h1>
      <p className="text-gray-600 mb-8">
        Vi har modtaget din betaling og sender dig en bekræftelse på mail.
      </p>
      <div className="space-y-4">
        <Button 
          onClick={() => router.push('/')}
          className="w-full bg-green-500 hover:bg-green-600"
        >
          Tilbage til forsiden
        </Button>
        <Button 
          variant="outline"
          onClick={() => router.push('/kontakt')}
          className="w-full"
        >
          Kontakt support
        </Button>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-zinc-100 flex items-center justify-center p-4">
      <Suspense fallback={
        <div className="text-center">
          <p>Indlæser...</p>
        </div>
      }>
        <SuccessContent />
      </Suspense>
    </div>
  )
} 