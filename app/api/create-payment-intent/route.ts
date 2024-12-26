import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { amount, currency = "dkk" } = body

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe bruger mindste enhed (øre)
      currency,
      payment_method_types: ["card"],
      metadata: {
        orderId: `order_${Date.now()}`,
      },
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error("Stripe error:", error)
    return NextResponse.json(
      { error: "Der skete en fejl ved behandling af betalingen" },
      { status: 500 }
    )
  }
}