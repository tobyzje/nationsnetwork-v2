import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
})

export async function POST(req: Request) {
  try {
    const { name, price, period, description } = await req.json()

    // Opret Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "dkk",
            product_data: {
              name,
              description,
              metadata: {
                type: period === 'md' ? 'subscription' : 'one_time'
              }
            },
            unit_amount: Number(price) * 100, // Konverter til øre og sikr at det er et nummer
            ...(period === 'md' && {
              recurring: {
                interval: 'month',
                interval_count: 1
              },
            }),
          },
          quantity: 1,
        },
      ],
      mode: period === 'md' ? 'subscription' : 'payment',
      payment_intent_data: {
        metadata: {
          product_name: name,
          is_subscription: period === 'md' ? 'true' : 'false'
        }
      },
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
      customer_creation: 'always',
      success_url: `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/priser`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe error:', error)
    return NextResponse.json(
      { error: 'Der skete en fejl ved oprettelse af betalingen' },
      { status: 500 }
    )
  }
}