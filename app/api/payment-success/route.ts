import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import nodemailer from "nodemailer"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia"
})

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  }
})

interface LineItem {
  name: string;
  quantity: number;
  amount: number;
}

interface PaymentDetails {
  id: string;
  amount: number;
  created: number;
  customer: {
    name: string;
    email: string;
  };
  items: LineItem[];
  isSubscription: boolean;
}

function generateReceiptHTML(paymentDetails: PaymentDetails) {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('da-DK', {
      style: 'currency',
      currency: 'DKK'
    }).format(amount / 100)
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('da-DK', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #16a34a;">Tak for din bestilling!</h1>
        <p style="color: #666;">Her er din kvittering fra NationsNetwork</p>
      </div>

      <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="color: #333; margin-bottom: 15px;">Ordredetaljer</h2>
        <p style="margin: 5px 0;"><strong>Ordre ID:</strong> ${paymentDetails.id}</p>
        <p style="margin: 5px 0;"><strong>Dato:</strong> ${formatDate(paymentDetails.created)}</p>
        <p style="margin: 5px 0;"><strong>Kunde:</strong> ${paymentDetails.customer.name}</p>
        <p style="margin: 5px 0;"><strong>Email:</strong> ${paymentDetails.customer.email}</p>
      </div>

      <div style="margin-bottom: 30px;">
        <h2 style="color: #333; margin-bottom: 15px;">Købte produkter</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #f3f4f6;">
              <th style="padding: 10px; text-align: left;">Produkt</th>
              <th style="padding: 10px; text-align: right;">Antal</th>
              <th style="padding: 10px; text-align: right;">Pris</th>
            </tr>
          </thead>
          <tbody>
            ${paymentDetails.items.map((item: LineItem) => `
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px;">${item.name}</td>
                <td style="padding: 10px; text-align: right;">${item.quantity}</td>
                <td style="padding: 10px; text-align: right;">${formatAmount(item.amount)}</td>
              </tr>
            `).join('')}
            <tr style="background-color: #f9fafb; font-weight: bold;">
              <td style="padding: 10px;" colspan="2">Total</td>
              <td style="padding: 10px; text-align: right;">${formatAmount(paymentDetails.amount)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      ${paymentDetails.isSubscription ? `
        <div style="background-color: #ebf5ff; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <p style="color: #1e40af; margin: 0;">
            Dit abonnement er nu aktivt. Du vil blive faktureret månedligt.
          </p>
        </div>
      ` : ''}

      <div style="text-align: center; color: #666; font-size: 14px;">
        <p>Har du spørgsmål til din ordre?</p>
        <p>Kontakt os på <a href="mailto:ordre@nationsnetwork.dk" style="color: #16a34a;">ordre@nationsnetwork.dk</a></p>
      </div>
    </div>
  `
}

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.nextUrl.searchParams.get('session_id')
    if (!sessionId) {
      throw new Error('No session ID provided')
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'customer']
    })

    const paymentDetails = {
      id: session.id,
      amount: session.amount_total || 0,
      created: session.created,
      customer: {
        name: session.customer_details?.name || 'N/A',
        email: session.customer_details?.email || 'N/A'
      },
      items: session.line_items?.data.map(item => ({
        name: item.description || 'Unnamed product',
        quantity: item.quantity || 1,
        amount: item.amount_total || 0
      })) || [],
      isSubscription: session.mode === 'subscription'
    }

    // Send kvittering på email
    if (paymentDetails.customer.email !== 'N/A') {
      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: paymentDetails.customer.email,
        subject: 'Kvittering for din bestilling - NationsNetwork',
        html: generateReceiptHTML(paymentDetails)
      })

      // Send notifikation til virksomheden
      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: process.env.CONTACT_EMAIL,
        subject: 'Ny ordre modtaget',
        html: generateReceiptHTML(paymentDetails)
      })
    }

    return NextResponse.json(paymentDetails)
  } catch (error) {
    console.error('Error retrieving session:', error)
    return NextResponse.json(
      { error: 'Could not retrieve payment details' },
      { status: 500 }
    )
  }
} 