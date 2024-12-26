import ContactForm from "./components/ContactForm";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Rocket, Users, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nations Network | Webudvikling & Hosting',
  description: 'Nations Network er en webudvikling og hosting virksomhed der tilbyder skræddersyede digitale løsninger til din virksomhed',
  keywords: 'webudvikling, hosting, digitale løsninger, skræddersyede, virksomhed, nationsnetwork, nations network, hjemmesider, webshop til min virksomhed, billige hjemmesider',
  openGraph: {
    title: 'Nations Network | Webudvikling & Hosting',
    description: 'Nations Network er en webudvikling og hosting virksomhed der tilbyder skræddersyede digitale løsninger til din virksomhed',
    images: ['/logo.png'],
  }
}

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-100">
      {/* Hero Section */}
      <div className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-green-500 opacity-90" />
        <div className="absolute z-10 text-center max-w-4xl px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Din Digitale Partner</h1>
          <p className="text-xl text-white mb-8">Vi hjælper din virksomhed med at vokse gennem skræddersyede digitale løsninger</p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-green-500 hover:bg-green-600">
              Kom i gang
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link href="/priser">
              <p className={buttonVariants({ variant: "outline", size: "lg", className: "text-white bg-black border-white hover:outline-white hover:cursor-pointer" })}>
                Se vores priser
              </p>
            </Link>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Vores Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Vi tilbyder en bred vifte af digitale løsninger til din virksomhed</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <Code2 className="h-10 w-10 text-green-500 mb-2" />
                <CardTitle>Webudvikling</CardTitle>
                <CardDescription>Skræddersyede hjemmesider og webapplikationer</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Rocket className="h-10 w-10 text-green-500 mb-2" />
                <CardTitle>Digital Marketing</CardTitle>
                <CardDescription>SEO og sociale medier strategier</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-green-500 mb-2" />
                <CardTitle>Konsulentydelser</CardTitle>
                <CardDescription>Rådgivning og digital transformation</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="h-10 w-10 text-green-500 mb-2" />
                <CardTitle>Support</CardTitle>
                <CardDescription>24/7 teknisk support og vedligeholdelse</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Lad os snakke om dit projekt</h2>
          <p className="text-gray-600 mb-8">Udfyld formularen nedenfor, så vender vi tilbage inden for 24 timer</p>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
