"use client"

import React, { useEffect, useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const CheckoutPage = ({ amount }: { amount: number }) => {
    const stripe = useStripe();
    const elements = useElements();
    
    const [errorMessage, setErrorMessage] = useState<string | undefined>();
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch("api/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
        })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret))
        .catch((error) => setErrorMessage(error.message))
    }, [amount])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage(undefined);

        if (!stripe || !elements) {
            setErrorMessage("Betalingssystem ikke klar. Prøv igen.");
            setLoading(false);
            return;
        }  

        const { error } = await elements.submit();
    
        if (error) {
            setErrorMessage(error.message);
            setLoading(false);
            return;
        }
    };

    return (
        <div className="space-y-4">
            {errorMessage && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
            )}
            
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded-md space-y-4">
                {clientSecret && <PaymentElement />}
                <Button 
                    type="submit" 
                    disabled={loading || !stripe} 
                    className="w-full"
                >
                    {loading ? "Behandler..." : "Betal nu"}
                </Button>
            </form>
        </div>
    )
}

export default CheckoutPage;