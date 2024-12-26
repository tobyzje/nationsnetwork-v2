import { NextResponse } from "next/server"
import Stripe from "stripe"

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined')
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-12-18.acacia"
})

interface Item {
  name: string
  description: string
  price: string | { monthly: string; yearly: string }
  period?: "once" | "recurring"
  billingCycle?: "monthly" | "yearly"
}

const baseUrl = process.env.NEXT_PUBLIC_URL || 
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { items, contactInfo } = body

    if (!items?.length || !contactInfo) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      )
    }

    try {
      // Opret eller find kunde
      const customer = await stripe.customers.create({
        email: contactInfo.email,
        name: contactInfo.name,
        phone: contactInfo.phone,
        metadata: {
          company: contactInfo.company || '',
          cvr: contactInfo.cvr || ''
        }
      })

      // Håndter forskellige typer af betalinger
      const lineItems = items.map((item: Item) => {
        const price = typeof item.price === 'string' ? 
          parseInt(item.price.replace(/\D/g, '')) : 
          parseInt((item.billingCycle === 'monthly' ? item.price.monthly : item.price.yearly).replace(/\D/g, ''))

        if (isNaN(price)) {
          throw new Error(`Invalid price for item: ${item.name}`)
        }

        return {
          price_data: {
            currency: 'dkk',
            product_data: {
              name: item.name,
              description: item.description,
              metadata: {
                period: item.period,
                billingCycle: item.billingCycle
              }
            },
            unit_amount: price * 100,
            recurring: item.period === 'recurring' ? {
              interval: item.billingCycle === 'monthly' ? 'month' : 'year'
            } : undefined
          },
          quantity: 1
        }
      })

      // Opret Stripe session
      const session = await stripe.checkout.sessions.create({
        customer: customer.id,
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: items.some((item: Item) => item.period === 'recurring') ? 'subscription' : 'payment',
        success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/checkout`,
        metadata: {
          customerEmail: contactInfo.email,
          customerName: contactInfo.name,
          customerPhone: contactInfo.phone
        }
      })

      return NextResponse.json({ url: session.url })
    } catch (stripeError: unknown) {
      console.error('Stripe Error:', stripeError)
      return NextResponse.json(
        { 
          error: 'Stripe processing failed', 
          details: stripeError instanceof Error ? stripeError.message : 'Unknown error'
        },
        { status: 500 }
      )
    }
  } catch (error: unknown) {
    console.error('Server Error:', error)
    return NextResponse.json(
      { 
        error: 'Server error occurred', 
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}