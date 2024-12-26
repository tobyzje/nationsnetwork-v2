"use client"

import { useCart } from "../context/CartContext"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function MobileCartIcon() {
  const { state } = useCart()
  const itemCount = state.items.length

  return (
    <div className="md:hidden fixed bottom-4 right-4 z-50">
      <Link href="/cart">
        <Button className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg relative">
          <ShoppingCart className="h-6 w-6 text-white" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Button>
      </Link>
    </div>
  )
} 