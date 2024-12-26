"use client"

import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import CheckoutPage from "../components/CheckoutPage"

export default function CartPage() {
  const { state, dispatch } = useCart()

  const handleRemoveItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Din kurv er tom</h1>
          <p className="text-gray-600">Tilføj nogle produkter for at fortsætte</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Din Kurv</h1>
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          {state.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-4 border-b">
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">{item.description}</p>
                <p className="font-bold mt-1">
                  {item.price} kr
                  {item.period && <span className="text-sm font-normal text-gray-500">/md</span>}
                </p>
              </div>
              <Button
                variant="ghost"
                onClick={() => handleRemoveItem(item.id)}
              >
                <Trash2 className="h-5 w-5 text-red-500" />
              </Button>
            </div>
          ))}
          <div className="mt-6 pt-6 border-t">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-2xl font-bold">{state.total} kr</span>
            </div>
            <CheckoutPage amount={state.total} />
          </div>
        </div>
      </div>
    </div>
  )
} 