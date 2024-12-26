"use client"

import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('da-DK', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

export default function CartItems() {
  const { cart, removeFromCart, total } = useCart()

  if (cart.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Din kurv er tom</p>
      </div>
    )
  }

  return (
    <div>
      {cart.map((item) => (
        <div key={item.id} className="flex items-center justify-between py-4 border-b">
          <div>
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-gray-600">{item.description}</p>
            <p className="font-bold mt-1">
              {formatPrice(Number(item.price))} kr
              {item.period && <span className="text-sm font-normal text-gray-500">/md</span>}
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={() => removeFromCart(item.id)}
          >
            <Trash2 className="h-5 w-5 text-red-500" />
          </Button>
        </div>
      ))}
      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">At betale:</span>
          <span className="text-2xl font-bold">{formatPrice(total)} kr</span>
        </div>
      </div>
    </div>
  )
} 