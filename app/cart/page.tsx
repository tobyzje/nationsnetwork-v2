"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CartItems from "../components/CartItems";
import CheckoutButton from "../components/CheckoutButton";


export default function CartPage() {
  return (
    <div className="min-h-screen bg-zinc-100 py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Din Indkøbskurv</h1>
        
        <div className="grid gap-8 md:grid-cols-[1fr,380px]">
          {/* Venstre side - Kurv items */}
          <Card>
            <CardHeader>
              <CardTitle>Valgte produkter</CardTitle>
              <CardDescription>Gennemgå dine valgte produkter</CardDescription>
            </CardHeader>
            <CardContent>
              <CartItems />
            </CardContent>
          </Card>

          {/* Højre side - Kontaktinfo og betaling */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Kontaktinformation</CardTitle>
                <CardDescription>Udfyld venligst dine oplysninger</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Fulde navn</Label>
                  <Input id="name" placeholder="Dit fulde navn" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="din@email.dk" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input id="phone" type="tel" placeholder="+45 12 34 56 78" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Virksomhed</Label>
                  <Input id="company" placeholder="Virksomhedsnavn" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cvr">CVR-nummer</Label>
                  <Input id="cvr" placeholder="12345678" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <CheckoutButton />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 