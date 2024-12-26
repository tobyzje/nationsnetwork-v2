"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ContactForm from "../components/ContactForm"
import { useState } from "react"
import ProcessSteps from "../components/ProcessSteps"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

const webSolutions = [
  {
    name: "Lille Hjemmeside",
    subtitle: "Perfekt til nyopstartet virksomheder",
    price: { monthly: "299", yearly: "2990" },
    features: [
      "Op til 5 undersider",
      "Responsivt design", 
      "SEO optimering",
      "SSL-certifikat",
      "Kontaktformular",
      "Google Analytics",
      "Support 9-16",
    ],
    type: "starter",
    deliveryTime: "2-3 uger"
  },
  {
    name: "Medium Hjemmeside", 
    subtitle: "Til virksomheder med vokseværk",
    price: { monthly: "599", yearly: "5990" },
    features: [
      "Alt fra Lille pakke",
      "Op til 15 undersider",
      "Blog sektion",
      "Nyhedsbrev integration",
      "Booking system",
      "24/7 Support",
    ],
    type: "pro",
    deliveryTime: "3-4 uger"
  },
  {
    name: "Stor Hjemmeside",
    subtitle: "Til større virksomheder",
    price: { monthly: "999", yearly: "9990" },
    features: [
      "Alt fra Medium pakke",
      "Ubegrænset undersider",
      "Kundeportal",
      "API integrationer", 
      "Multisprogs support",
      "Avanceret SEO",
      "Premium support",
      "Enterprise hosting"
    ],
    type: "enterprise",
    deliveryTime: "6-8 uger"
  },
  {
    name: "Webshop Løsning",
    subtitle: "WordPress / WooCommerce",
    price: { monthly: "799", yearly: "7990" },
    features: [
      "WordPress + WooCommerce",
      "Produktkatalog",
      "Betalingsgateway",
      "Lagerstyring",
      "Ordrehåndtering", 
      "Ubegrænset produkter",
      "Ubegrænset kunder",
      "Kundekonti",
      "24/7 Support",
      "E-commerce hosting"
    ],
    type: "webshop",
    deliveryTime: "4-6 uger"
  }
  ,
  {
    name: "Bland-Selv Løsning",
    subtitle: "Skræddersy din egen løsning",
    price: { monthly: "Fra 299", yearly: "Fra 2990" },
    features: [
      "Vælg præcis de funktioner du har brug for", 
      "Betal kun for det du bruger",
      "Fuld fleksibilitet",
      "Skaler op og ned efter behov",
      "Tilpasset din virksomhed",
      "Support inkluderet",
    ],
    type: "custom",
    deliveryTime: "9-12 uger",
    popular: true
  }
]

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const router = useRouter()

  const handleOrderClick = async (solution: typeof webSolutions[0]) => {
    router.push(`/web-losninger/${solution.type}`)
  }

  return (
    <motion.div 
      className="min-h-screen bg-zinc-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-base font-semibold leading-7 text-green-600">Priser</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Find den rigtige løsning til din virksomhed
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="mt-8 flex justify-center gap-4">
            <Button 
              variant={billingCycle === "monthly" ? "default" : "outline"}
              onClick={() => setBillingCycle("monthly")}
            >
              Månedlig
            </Button>
            <Button 
              variant={billingCycle === "yearly" ? "default" : "outline"}
              onClick={() => setBillingCycle("yearly")}
            >
              Årlig
              <Badge variant="secondary" className="ml-2">Spar 20%</Badge>
            </Button>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mt-16">
            {webSolutions.map((solution) => (
              <Card key={solution.name} className="flex flex-col hover:scale-105 transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{solution.name}</CardTitle>
                      <CardDescription>{solution.subtitle}</CardDescription>
                    </div>
                    {solution.popular && (
                      <Badge className="bg-green-500 text-white">Populær</Badge>
                    )}
                  </div>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">
                      {billingCycle === "monthly" ? solution.price.monthly : solution.price.yearly}
                    </span>
                    <span className="text-sm text-gray-500">
                      {billingCycle === "monthly" ? "kr/md" : "kr/år"}
                    </span>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm text-gray-500">
                      Leveringstid: {solution.deliveryTime}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {solution.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full"
                    onClick={() => handleOrderClick(solution)}
                  >
                    Læs mere
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Process Steps */}
          <ProcessSteps />
        </div>
      </div>
    </motion.div>
  )
}
