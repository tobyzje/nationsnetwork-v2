import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Metadata } from 'next';
import Link from "next/link";
import { FolderPlus } from "lucide-react";

export const metadata: Metadata = {
  title: 'Cases | Vores Projekter og Løsninger',
  description: 'Se vores tidligere projekter og løsninger vi har udviklet for vores kunder.',
  keywords: ['cases', 'projekter', 'portfolio', 'referencer', 'kundeløsninger'],
  openGraph: {
    title: 'Cases & Projekter | Nations Network',
    description: 'Udforsk vores tidligere projekter og kundeløsninger',
  }
}

interface Case {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
}

const cases: Case[] = [];

export default function CasesPage() {
  return (
    <div className="min-h-screen bg-zinc-100 py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-4xl font-bold mb-4">Vores Cases</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Se eksempler på projekter vi har udviklet for vores kunder
          </p>
        </div>

        {cases.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            <div className="bg-zinc-200 p-6 rounded-full mb-6 animate-bounce-slow">
              <FolderPlus className="h-12 w-12 text-zinc-500" />
            </div>
            <h2 className="text-2xl font-semibold mb-3">Ingen cases endnu</h2>
            <p className="text-zinc-600 max-w-md mb-6">
              Vi er i gang med at arbejde på spændende projekter. Kom tilbage senere for at se vores seneste arbejde.
            </p>
            <Link 
              href="/kontakt" 
              className="text-green-600 hover:text-green-700 font-medium transition-all duration-300 hover:scale-105"
            >
              Vil du være vores næste succeshistorie? Kontakt os i dag →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cases.map((case_, index) => (
              <Link href={case_.link || ''} target="_blank" key={index}>
                <Card 
                  key={index} 
                  className="overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-lg animate-in fade-in slide-in-from-bottom-4" 
                  style={{ animationDelay: `${index * 200}ms` }}
                >
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
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm animate-in fade-in"
                          style={{ animationDelay: `${tagIndex * 100}ms` }}
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
        )}
      </div>
    </div>
  );
}