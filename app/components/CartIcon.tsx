"use client"

import { ShoppingCart } from "lucide-react"
import { useCart } from "../context/CartContext"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CartIcon() {
  const { state } = useCart()
  const itemCount = state.items.length

  return (
    <Link href="/cart">
      <Button variant="default" className="relative bg-green-500 hover:bg-green-600 text-white">
        <ShoppingCart className="h-6 w-6" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </Button>
    </Link>
  )
} 