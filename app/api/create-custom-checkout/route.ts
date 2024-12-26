import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia"
})

interface Module {
  name: string
  price: number
  monthly: boolean
  description?: string
}

interface CheckoutData {
  selectedModules: Module[]
  totals: {
    oneTime: number
    monthly: number
  }
}

export async function POST(req: Request) {
  try {
    const { selectedModules } = (await req.json()) as CheckoutData

    // Opret line items for engangskøb
    const oneTimeItems = selectedModules
      .filter((module) => !module.monthly)
      .map((module) => ({
        price_data: {
          currency: "dkk",
          product_data: {
            name: module.name,
            description: module.description || "",
          },
          unit_amount: module.price * 100,
        },
        quantity: 1,
      }))

    // Opret recurring subscription items
    const recurringItems = selectedModules
      .filter((module) => module.monthly)
      .map((module) => ({
        price_data: {
          currency: "dkk",
          product_data: {
            name: module.name,
            description: "Månedligt abonnement",
          },
          unit_amount: module.price * 100,
          recurring: {
            interval: "month",
          },
        },
        quantity: 1,
      }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [...oneTimeItems, ...recurringItems],
      mode: recurringItems.length > 0 ? "subscription" : "payment",
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/priser`,
      metadata: {
        type: "custom",
        modules: JSON.stringify(selectedModules.map((m) => m.name)),
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error("Stripe checkout error:", error)
    return NextResponse.json(
      { error: "Der skete en fejl ved oprettelse af betalingen" },
      { status: 500 }
    )
  }
} 