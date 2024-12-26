import { NextResponse } from "next/server"
import Stripe from "stripe"

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-12-18.acacia"
})

export async function GET() {
  try {
    // Hent betalinger fra Stripe
    const paymentIntents = await stripe.paymentIntents.list({
      limit: 100,
    }).catch(error => {
      console.error('Error fetching payment intents:', error);
      return { data: [] };
    });

    // Hent abonnementer
    const subscriptions = await stripe.subscriptions.list({
      limit: 100,
    }).catch(error => {
      console.error('Error fetching subscriptions:', error);
      return { data: [] };
    });

    // Kombiner og formater data
    const payments = [
      ...paymentIntents.data.map(pi => ({
        id: pi.id,
        amount: pi.amount,
        status: pi.status,
        created: pi.created,
        description: pi.description || 'Engangsbetaling',
        isSubscription: false
      })),
      ...subscriptions.data.map(sub => ({
        id: sub.id,
        amount: sub.items.data[0]?.price?.unit_amount || 0,
        status: sub.status,
        created: sub.created,
        description: sub.items.data[0]?.price?.nickname || 'Abonnement',
        isSubscription: true
      }))
    ].sort((a, b) => b.created - a.created);

    return NextResponse.json({ payments });
  } catch (error) {
    console.error('Stripe error:', error);
    // Mere detaljeret fejlbesked
    return NextResponse.json(
      { 
        error: 'Kunne ikke hente betalinger',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 