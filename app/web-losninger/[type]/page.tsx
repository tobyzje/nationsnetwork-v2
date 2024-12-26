"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Check, ArrowLeft } from "lucide-react"
import Link from "next/link"
import BookingCalendar from "../../components/BookingCalendar"
import CustomSolutionBuilder from "../../components/CustomSolutionBuilder"

const solutions = {
  starter: {
    name: "Lille Hjemmeside",
    subtitle: "Perfekt til nyopstartet virksomheder",
    description: `Vores Lille Hjemmeside-pakke er skræddersyet til nyopstartede virksomheder, 
    der ønsker en professionel online tilstedeværelse uden at skulle investere en formue. 
    Med denne pakke får du en moderne, responsiv hjemmeside der præsenterer din virksomhed på bedste vis.`,
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
    benefits: [
      "Hurtig lancering på 2-3 uger",
      "Professionelt design der matcher din brand",
      "Sikker og hurtig hosting",
      "Løbende support og vedligeholdelse"
    ],
    idealFor: [
      "Nyopstartede virksomheder",
      "Freelancere",
      "Små servicevirksomheder",
      "Lokale butikker"
    ],
    deliveryTime: "2-3 uger",
    includes: [
      "Domæne opsætning",
      "Email integration",
      "Mobilvenligt design",
      "Grundlæggende SEO",
      "Kontaktformular",
      "Google Analytics",
      "Support"
    ],
    modules: []
  },
  pro: {
    name: "Medium Hjemmeside",
    subtitle: "Til virksomheder med vokseværk",
    description: `Medium Hjemmeside-pakken er designet til etablerede virksomheder, der har brug for 
    mere avancerede funktioner og større fleksibilitet. Denne løsning giver dig alle værktøjerne til 
    at vokse din online tilstedeværelse og engagere dine kunder effektivt.`,
    price: { monthly: "599", yearly: "5990" },
    features: [
      "Alt fra Lille pakke",
      "Op til 15 undersider",
      "Blog sektion",
      "Nyhedsbrev integration",
      "Booking system",
      "24/7 Support",
      "Premium hosting"
    ],
    benefits: [
      "Professionel blog platform",
      "Avanceret kundeengagement",
      "Ubegrænset skalerbarhed",
      "Premium support og vedligeholdelse"
    ],
    idealFor: [
      "Voksende virksomheder",
      "Konsulentvirksomheder",
      "Restauranter og cafeer",
      "Servicebranchen"
    ],
    deliveryTime: "3-4 uger",
    includes: [
      "Alt fra Lille pakke",
      "Blog platform",
      "Nyhedsbrev system",
      "Booking system",
      "Avanceret SEO",
      "Premium hosting",
      "24/7 Support"
    ],
    modules: []
  },
  enterprise: {
    name: "Stor Hjemmeside",
    subtitle: "Til større virksomheder",
    description: `Vores Enterprise løsning er en komplet digital platform, skræddersyet til større 
    virksomheder med komplekse behov. Med denne pakke får du en kraftfuld, skalerbar løsning med 
    avancerede funktioner og ubegrænset potentiale for vækst.`,
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
    benefits: [
      "Fuldstændig tilpasset løsning",
      "Enterprise-niveau sikkerhed",
      "Dedikeret support team",
      "Ubegrænset skalerbarhed"
    ],
    idealFor: [
      "Større virksomheder",
      "Internationale firmaer",
      "B2B virksomheder",
      "Organisationer med komplekse behov"
    ],
    deliveryTime: "6-8 uger",
    includes: [
      "Alt fra Medium pakke",
      "Kundeportal",
      "API integrationer",
      "Multisprog",
      "Enterprise hosting",
      "Dedikeret support",
      "Custom features"
    ],
    modules: []
  },
  webshop: {
    name: "Webshop Løsning",
    subtitle: "WordPress / WooCommerce",
    description: `Vores WooCommerce webshop-løsning giver dig en kraftfuld e-handelsplatform 
    bygget på WordPress. Perfekt til både nye og etablerede online butikker, med alle de 
    værktøjer du behøver for at drive en succesfuld e-commerce forretning.`,
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
    benefits: [
      "Komplet e-handelsløsning",
      "Brugervenligt admin panel",
      "Sikker betalingshåndtering",
      "Skalerbar platform"
    ],
    idealFor: [
      "Online butikker",
      "Detailhandlere",
      "Dropshipping virksomheder",
      "B2C virksomheder"
    ],
    deliveryTime: "7-9 uger",
    includes: [
      "WooCommerce setup",
      "Betalingsgateway integration",
      "Produktopsætning",
      "Lagerstyring",
      "Fragtintegration",
      "E-commerce hosting",
      "24/7 Support"
    ],
    modules: []
  },
  custom: {
    name: "Bland-Selv Løsning",
    subtitle: "Skræddersy din egen løsning",
    description: `Skab den perfekte hjemmeside ved at vælge præcis de funktioner, 
    du har brug for. Med vores Bland-Selv løsning kan du sammensætte din egen 
    pakke og kun betale for det, du faktisk skal bruge.`,
    price: { monthly: "Fra 299", yearly: "Fra 2990" },
    deliveryTime: "9-12 uger",
    features: [],
    benefits: [
      "Betal kun for det du bruger",
      "Fuld fleksibilitet",
      "Skaler op og ned efter behov",
      "Tilpasset din virksomhed"
    ],
    idealFor: [
      "Virksomheder med specifikke behov",
      "Projekter med særlige krav",
      "Innovative løsninger",
      "Specialiserede brancher"
    ],
    includes: [],
    modules: [
      {
        category: "Basis Funktioner",
        options: [
          { name: "Responsivt Design (Altid Gratis)", price: 0, required: true },
          { name: "SEO Optimering", price: 750, description: "Grundlæggende SEO opsætning" },
          { name: "SSL Certifikat (Altid Gratis)", price: 0, required: true },
          { name: "Kontaktformular (Altid Gratis)", price: 0 },
          { name: "Google Analytics", price: 499 },
        ]
      },
      {
        category: "Indhold",
        options: [
          { name: "Blog Platform", price: 1499 },
          { name: "Nyhedsbrev System", price: 999 },
          { name: "Multilingual Support", price: 2499 },
          { name: "Custom CMS", price: 4999 },
        ]
      },
      {
        category: "E-commerce",
        options: [
          { name: "Produktkatalog", price: 2999 },
          { name: "Betalingsgateway", price: 1999 },
          { name: "Lagerstyring", price: 1499 },
          { name: "Kundekonti", price: 999 },
        ]
      },
      {
        category: "Integration",
        options: [
          { name: "API Integration", price: 3999 },
          { name: "Social Media Integration", price: 250 },
          { name: "Calendar Integration", price: 1000 },
        ]
      },
      {
        category: "Support",
        options: [
          { name: "Basic Support (9-16) (Altid Gratis)", price: 0, monthly: true },
          { name: "Premium Support (24/7)", price: 500, monthly: true },
          { name: "Dedikeret Support Team", price: 1999, monthly: true },
        ]
      },
      {
        category: "Hosting",
        options: [
          { name: "Basic Hosting (5GB SSD)", price: 75, monthly: true, required: true },
          { name: "Premium Hosting (10GB SSD)", price: 199, monthly: true },
          { name: "Enterprise Hosting (20GB SSD)", price: 399, monthly: true },
        ]
      }
    ]
  }
}

export default function SolutionPage() {
  const params = useParams()
  const type = params.type as keyof typeof solutions
  const solution = solutions[type]

  if (!solution) return <div>Løsning ikke fundet</div>

  if (type === 'custom') {
    return (
      <motion.div 
        className="min-h-screen bg-zinc-100 pt-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-12">
          <Link href="/priser">
            <Button variant="outline" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Tilbage til priser
            </Button>
          </Link>

          <h1 className="text-4xl font-bold mb-4">{solution.name}</h1>
          <p className="text-xl text-gray-600 mb-6">{solution.subtitle}</p>
          <p className="text-gray-700 mb-8">{solution.description}</p>

          <CustomSolutionBuilder modules={solution.modules} />
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div 
      className="min-h-screen bg-zinc-100 pt-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Link href="/priser">
          <Button variant="outline" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Tilbage til priser
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h1 className="text-4xl font-bold mb-4">{solution.name}</h1>
            <p className="text-xl text-gray-600 mb-6">{solution.subtitle}</p>
            <p className="text-gray-700 mb-8">{solution.description}</p>

            <div className="bg-white rounded-lg p-6 shadow-lg mb-8">
              <h2 className="text-2xl font-semibold mb-4">Inkluderet i løsningen</h2>
              <ul className="space-y-3">
                {solution.includes.map((item) => (
                  <li key={item} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Ideel for</h2>
              <ul className="space-y-3">
                {solution.idealFor.map((item) => (
                  <li key={item} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Book et uforpligtende møde</h2>
              <p className="text-gray-600 mb-6">
                Lad os tage en snak om hvordan vi kan hjælpe dig med at komme i gang med din nye hjemmeside.
              </p>
              <BookingCalendar />
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Leveringstid</h2>
              <p className="text-gray-600">
                {solution.deliveryTime}
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Fordele</h2>
              <ul className="space-y-3">
                {solution.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 