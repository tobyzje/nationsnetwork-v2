"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "../context/CartContext"
import { ShoppingCart } from "lucide-react"

interface AddToCartButtonProps {
  name: string
  price: string
  period?: string
  description: string
}

export default function AddToCartButton({ name, price, period, description }: AddToCartButtonProps) {
  const { dispatch } = useCart()

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: `${name}-${Date.now()}`,
        name,
        price,
        period,
        description
      }
    })
  }

  return (
    <Button 
      onClick={handleAddToCart}
      className="w-full"
    >
      <ShoppingCart className="mr-2 h-4 w-4" />
      Tilføj til kurv
    </Button>
  )
} 