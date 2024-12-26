"use client"

import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutButton from "./CheckoutButton";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function CheckoutPage({ amount }: { amount: number }) {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((err) => console.error("Fejl ved hentning af client secret:", err));
  }, [amount]);

  if (!clientSecret) {
    return <div>Loading...</div>;
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "stripe",
          variables: {
            colorPrimary: "#0F172A",
          },
        },
      }}
    >
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Betal {amount} DKK</h2>
        <CheckoutButton />
      </div>
    </Elements>
  );
}