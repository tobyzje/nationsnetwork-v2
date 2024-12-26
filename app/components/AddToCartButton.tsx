"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/context/CartContext"
import { useAuth } from "@/context/AuthContext"
import { ShoppingCart } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface CartItem {
  id: string
  name: string
  price: string
  description: string
  period?: "once" | "recurring"
  billingCycle?: "monthly" | "yearly"
}

interface AddToCartButtonProps {
  item: CartItem
  className?: string
}

export default function AddToCartButton({ item, className }: AddToCartButtonProps) {
  const { dispatch } = useCart()
  const { user, checkWebSolution } = useAuth()
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleAddToCart = async () => {
    setLoading(true)
    
    if (!user) {
      toast({
        title: "Log ind påkrævet",
        description: "Du skal være logget ind for at tilføje produkter til kurven",
        variant: "destructive"
      })
      setLoading(false)
      return
    }

    const hasWebSolution = await checkWebSolution()
    if (!hasWebSolution) {
      toast({
        title: "Webløsning påkrævet",
        description: "Du skal have en aktiv webløsning hos NationsNetwork for at købe tilkøb",
        variant: "destructive"
      })
      setLoading(false)
      return
    }

    dispatch({ type: 'ADD_ITEM', payload: item })
    toast({
      title: "Produkt tilføjet",
      description: "Produktet er blevet tilføjet til din kurv"
    })
    
    setTimeout(() => setLoading(false), 500)
  }

  return (
    <Button 
      onClick={handleAddToCart} 
      disabled={loading}
      className={className}
    >
      {loading ? (
        "Tilføjer..."
      ) : (
        <>
          <ShoppingCart className="mr-2 h-5 w-5" />
          Tilføj til kurv
        </>
      )}
    </Button>
  )
} 