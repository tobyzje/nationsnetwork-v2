"use client"

import { Check, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ContactForm from "../components/ContactForm"
import BookingCalendar from "../components/BookingCalendar"
import CheckoutButton from "../components/CheckoutButton"

const features = {
  starter: ["Hjemmeside", "SEO Optimering", "SSL Certifikat", "Support 9-16"],
  pro: ["Alt i Starter", "SoMe Marketing", "Google Ads", "24/7 Support", "Analytics"],
  enterprise: ["Alt i Pro", "Custom Design", "API Integration", "Dedicated Manager", "Priority Support"]
}

const addons = [
  { name: "Blog post", price: "299", description: "Tilføj en professionel blog sektion" },
  { name: "Webshop", price: "3.999", description: "Komplet webshop løsning. Med eget Admin-panel, til håndtere produkter, kunder og ordrer." },
  { name: "Komplet konti-system", price: "999", description: "Komplet log-ind, oprettelse af brugere, som fungere perfekt med vores Admin-panel." },
  { name: "Vedligeholdelse af hjemmeside", price: "799", description: "Vi holder din hjemmeside opdateret og vedligeholdt, så den altid fungerer perfekt. Betales månedligt.", period: "md" },
  { name: "Hosting af hjemmeside", price: "50", description: "Vi hoster din hjemmeside på vores egne servere, så den altid fungerer perfekt. Betales månedligt.", period: "md" },
  { name: "Nyhedsbrev", price: "699", description: "Vi hjælper dig med at oprette et nyhedsbrev, som du kan sende til dine kunder. Betales månedligt.", period: "md" },

]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-zinc-200">
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Priser og Pakker
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Vælg den pakke der passer bedst til dine behov. Alle priser er eks. moms.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Starter */}
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Starter</CardTitle>
                <CardDescription>Perfekt til små virksomheder</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">1.500 kr</span>
                  <span className="text-gray-500">/eksl. moms</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {features.starter.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Vælg Starter</Button>
              </CardFooter>
            </Card>

            {/* Pro */}
            <Card className="flex flex-col relative border-green-500">
              <Badge className="absolute -top-2 right-4">Populær</Badge>
              <CardHeader>
                <CardTitle>Pro</CardTitle>
                <CardDescription>For vækstende virksomheder</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">5.000 kr</span>
                  <span className="text-gray-500">/eksl. moms</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {features.pro.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-green-500 hover:bg-green-600">Vælg Pro</Button>
              </CardFooter>
            </Card>

            {/* Enterprise */}
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <CardDescription>Til store virksomheder</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">8.500 kr</span>
                  <span className="text-gray-500">/eksl. moms</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {features.enterprise.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Vælg Enterprise</Button>
              </CardFooter>
            </Card>
          </div>

          {/* Addons Section */}
          <div className="mt-24">
            <h2 className="text-3xl font-bold text-center mb-12">Tilkøb og Udvidelser</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {addons.map((addon) => (
                <Card key={addon.name} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="h-5 w-5" />
                      {addon.name}
                    </CardTitle>
                    <CardDescription>{addon.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div>
                      {addon.period === 'md' ? (
                        <p className="text-2xl font-bold">
                          {addon.price} kr<span className="text-sm font-normal text-gray-500">/md eksl. moms</span>
                        </p>
                      ) : (
                        <p className="text-2xl font-bold">
                          {addon.price} kr<span className="text-sm font-normal text-gray-500"> eksl. moms</span>
                        </p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <CheckoutButton
                      name={addon.name}
                      price={addon.price}
                      period={addon.period}
                      description={addon.description}
                    />
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-24 text-center">
            <h2 className="text-3xl font-bold mb-4">Book et uforpligtende møde</h2>
            <p className="text-gray-600 mb-8">
              Lad os tage en snak om dine behov og hvordan vi kan hjælpe
            </p>
            <div className="max-w-md mx-auto">
              <BookingCalendar />
            </div>
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-4">Eller kontakt os direkte</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
