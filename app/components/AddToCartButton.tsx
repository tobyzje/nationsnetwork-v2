"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/context/CartContext"
import { ShoppingCart } from "lucide-react"
import { useState } from "react"

interface AddToCartButtonProps {
  item: {
    id: string
    name: string
    price: string
    period?: string
    description: string
  }
  className?: string
}

export default function AddToCartButton({ item, className }: AddToCartButtonProps) {
  const { dispatch } = useCart()
  const [loading, setLoading] = useState(false)

  const handleAddToCart = () => {
    setLoading(true)
    dispatch({ type: 'ADD_ITEM', payload: item })
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