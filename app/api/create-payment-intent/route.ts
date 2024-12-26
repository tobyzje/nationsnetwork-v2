import { NextResponse } from "next/server"
import Stripe from "stripe"

interface LineItem {
  name: string
  description: string
  price: number | string
}

interface ContactInfo {
  email: string
  name: string
  phone: string
  company?: string
  cvr?: string
}

interface RequestBody {
  items: LineItem[]
  contactInfo: ContactInfo
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia"
})

export async function POST(req: Request) {
  try {
    const { items, contactInfo }: RequestBody = await req.json()

    const customer = await stripe.customers.create({
      email: contactInfo.email,
      name: contactInfo.name,
      phone: contactInfo.phone,
      metadata: {
        company: contactInfo.company || '',
        cvr: contactInfo.cvr || ''
      }
    })

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        price_data: {
          currency: "dkk",
          product_data: {
            name: item.name,
            description: item.description,
          },
          unit_amount: Number(item.price) * 100,
        },
        quantity: 1,
      })),
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Fejl i create-payment-intent:', error)
    return NextResponse.json(
      { error: 'Der skete en fejl ved oprettelse af betalingen' },
      { status: 500 }
    )
  }
}