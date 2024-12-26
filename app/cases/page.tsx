import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Metadata } from 'next';
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Cases | Nations Network',
  description: 'Se vores tidligere projekter og løsninger vi har udviklet for vores kunder',
  openGraph: {
    title: 'Cases | Nations Network',
    description: 'Se vores tidligere projekter og løsninger vi har udviklet for vores kunder',
    images: ['favicon.ico'],
  }
}

interface Case {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
}

const cases: Case[] = [
  {
    title: "Lars Vegas Golf | Golf Simulator Center",
    description: "Udvikling af en komplet hjemmeside for Lars Vegas Golf, med booking system, e-handel, nyhedsbrev, tunerings-kalender og meget mere",
    image: "/cases/lars-vegas-golf.png",
    tags: ["Komplet Hjemmeside", "Next.js", "Stripe", "Booking", "E-handel", "Nyhedsbrev", "Tunerings-kalender" ],
    link: "https://larsvegasgolf.com"
  },
  {
    title: "Billund Handelsforening",
    description: "Udvikling af denne side var en sjov og lærig opgave, da denne side var den første side vi lavede, som var en side for en virksomhed, og ikke en side for en person. Vi er tilfredse med resultatet, og vi har fået en masse feedback fra kunden, som har været tilfredse med resultatet.",
    image: "/cases/billund-handelsforening.png",
    tags: [ "Event-kalender", "MySQL", "Next.js", "Login-system", "Admin-panel", "Nyhedsbrev" ],
    link: "https://billund-handelsforening.dk"
  },
  // Tilføj flere cases her
];

export default function CasesPage() {
  return (
    <div className="min-h-screen bg-zinc-100 py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Vores Cases</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Se eksempler på projekter vi har udviklet for vores kunder
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((case_, index) => (
            <Link href={case_.link || ''} target="_blank" key={index}>
              <Card key={index} className="overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-lg">
                <div className="relative h-48 w-full">
                  <Image
                  src={case_.image}
                  alt={case_.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{case_.title}</CardTitle>
                <CardDescription>{case_.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {case_.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 