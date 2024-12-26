"use client"

import { createContext, useContext, useReducer, ReactNode } from 'react'

interface CartItem {
  id: string
  name: string
  price: string
  period?: string
  description: string
}

interface CartState {
  items: CartItem[]
  total: number
}

type CartAction = 
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_CART' }

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
} | undefined>(undefined)

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload],
        total: state.total + Number(action.payload.price)
      }
    case 'REMOVE_ITEM':
      const itemToRemove = state.items.find(item => item.id === action.payload)
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        total: state.total - (itemToRemove ? Number(itemToRemove.price) : 0)
      }
    case 'CLEAR_CART':
      return {
        items: [],
        total: 0
      }
    default:
      return state
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 })

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
} 