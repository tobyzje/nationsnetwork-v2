"use client"

import { Check, FileCog } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ContactForm from "../components/ContactForm"
import BookingCalendar from "../components/BookingCalendar"
import { useState } from "react"
import ProcessSteps from "../components/ProcessSteps"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

interface HandleOrderClickParams {
  name: string
  price: string | { monthly: string; yearly: string }
  description: string
  period?: "once" | "recurring"
  billingCycle?: "monthly" | "yearly"
}

const features = {
  starter: ["Op til 3 sider", "Simpel SEO optimering", "SSL Certifikat", "Support 9-16"],
  pro: ["Op til 8 sider", "SEO optimering", "Google Ads", "24/7 Support", "Analytics"],
  enterprise: ["Alt i pro", "Ubegrenset sider", "Ubegrenset SEO optimering", "Udvidet support", "Og meget mere"]
}

const addons = [
  { name: "Blog-sektion", price: "299", description: "Tilføj en professionel blog sektion", period: "once" },
  { name: "Webshop", price: "4999", description: "Komplet webshop løsning. Med eget Admin-panel, til h��ndtere produkter, kunder og ordrer.", period: "once" },
  { name: "Komplet konti-system", price: "999", description: "Komplet log-ind, oprettelse af brugere, som fungere perfekt med vores Admin-panel.", period: "once" },
  { 
    name: "Vedligeholdelse af hjemmeside", 
    price: { monthly: "799", yearly: "7990" }, 
    description: "Vi holder din hjemmeside opdateret og vedligeholdt, så den altid fungerer perfekt.", 
    period: "recurring" 
  },
  { 
    name: "Hosting af hjemmeside", 
    price: { monthly: "25", yearly: "250" }, 
    description: "Vi hoster din hjemmeside på vores egne servere, så den altid fungerer perfekt.", 
    period: "recurring" 
  },
  { 
    name: "Nyhedsbrev", 
    price: "999",
    description: "Vi hjælper dig med at oprette et nyhedsbrev, som du kan sende til dine kunder.", 
    period: "once" 
  },
  { name: "Personligt Bookingsystem / Kalender", price: "1999", description: "Vi hjælper dig med at oprette et personligt bookingsystem, som du kan bruge til at booke tid med dig.", period: "once" },
  { name: "Event / Billet System", price: "1199", description: "Vi hjælper dig med at oprette et event / billet system, som du kan bruge til at sælge billetter til dine events.", period: "once" },
]

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleOrderClick = async ({ name, price, description, period, billingCycle }: HandleOrderClickParams) => {
    setLoading(true)
    const finalPrice = typeof price === 'string' ? price : (billingCycle === 'monthly' ? price.monthly : price.yearly)
    
    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [{
            name,
            description,
            price: finalPrice.replace(/\D/g, ''),
            period,
            billingCycle
          }],
          contactInfo: {
            email: "",
            name: "",
            phone: ""
          }
        }),
      })

      const { url } = await response.json()
      if (url) {
        router.push(url)
      }
    } catch (error) {
      console.error('Fejl ved oprettelse af betaling:', error)
    } finally {
      setLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
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
          <motion.div 
            className="mx-auto max-w-4xl text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Priser & Løsninger
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Vælg den løsning der passer bedst til dine behov. Alle priser er eks. moms.
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <motion.div 
            className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Starter */}
            <motion.div variants={itemVariants} whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
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
                      <motion.li 
                        key={feature} 
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Check className="h-4 w-4 text-green-500" />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full"
                    onClick={() => handleOrderClick({
                      name: "Starter",
                      price: "1500",
                      description: "Perfekt til små virksomheder",
                      period: "once"
                    })}
                    disabled={loading}
                  >
                    {loading ? "Behandler..." : "Vælg Starter"}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Pro */}
            <motion.div 
              variants={itemVariants} 
              whileHover={{ scale: 1.03 }} 
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <motion.div
                className="absolute -top-5 right-4"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Badge className="z-10">Populær</Badge>
              </motion.div>
              <Card className="flex flex-col relative border-green-500">
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <CardDescription>For vækstende virksomheder</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">3.500 kr</span>
                    <span className="text-gray-500">/eksl. moms</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {features.pro.map((feature) => (
                      <motion.li 
                        key={feature} 
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Check className="h-4 w-4 text-green-500" />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-green-500 hover:bg-green-600"
                    onClick={() => handleOrderClick({
                      name: "Pro",
                      price: "3500",
                      description: "For vækstende virksomheder",
                      period: "once"
                    })}
                    disabled={loading}
                  >
                    {loading ? "Behandler..." : "Vælg Pro"}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Enterprise */}
            <motion.div variants={itemVariants} whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <CardDescription>Til store virksomheder</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">6.500 kr</span>
                    <span className="text-gray-500">/eks. moms</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {features.enterprise.map((feature) => (
                      <motion.li 
                        key={feature} 
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Check className="h-4 w-4 text-green-500" />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full"
                    onClick={() => handleOrderClick({
                      name: "Enterprise",
                      price: "6500",
                      description: "Til store virksomheder",
                      period: "once"
                    })}
                    disabled={loading}
                  >
                    {loading ? "Behandler..." : "Vælg Enterprise"}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>

          {/* Process Steps */}
          <motion.div 
            className="mt-8 bg-zinc-200 rounded-lg p-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <ProcessSteps />
          </motion.div>

          {/* Addons Section */}
          <motion.div 
            className="mt-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-center mb-12">Tilkøb og Udvidelser</h2>
            {/* Billing Cycle Toggle */}
            <div className="flex justify-center gap-4 -mt-4 mb-8">
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
              </Button>
            </div>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {addons.map((addon) => (
                <motion.div 
                  key={addon.name}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="flex flex-col">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileCog className="h-5 w-5" />
                        {addon.name}
                      </CardTitle>
                      <CardDescription>{addon.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div>
                        {addon.period === 'recurring' ? (
                          <p className="text-2xl font-bold">
                            {typeof addon.price === 'object' ? 
                              (billingCycle === 'monthly' ? addon.price.monthly : addon.price.yearly) 
                              : addon.price} kr
                            <span className="text-sm font-normal text-gray-500">
                              /{billingCycle === 'monthly' ? 'md' : 'år'} eks. moms
                            </span>
                          </p>
                        ) : (
                          <p className="text-2xl font-bold">
                            {typeof addon.price === 'string' ? addon.price : ''} kr
                            <span className="text-sm font-normal text-gray-500"> eks. moms</span>
                          </p>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full"
                        onClick={() => handleOrderClick({
                          name: addon.name,
                          price: addon.price,
                          description: addon.description,
                          period: addon.period as "once" | "recurring",
                          billingCycle: addon.period === 'recurring' ? billingCycle : undefined
                        })}
                        disabled={loading}
                      >
                        {loading ? "Behandler..." : "Køb nu"}
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div 
            className="mt-24 text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
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
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
