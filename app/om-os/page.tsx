import { Lightbulb, Star, Handshake, CheckCircle2 } from "lucide-react";
import type { Metadata } from 'next'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'NationsNetwork - Webudvikling & Hosting',
  description: 'Nations Network er en webudvikling og hosting virksomhed der tilbyder skræddersyede digitale løsninger til din virksomhed',
  url: 'https://nationsnetwork.dk',
  // Tilføj flere relevante felter
}

export const metadata: Metadata = {
  title: 'Om Os | Nations Network',
  description: 'Lær mere om Nations Network og vores passion for at skabe digitale løsninger der gør en forskel.',
  keywords: ['om os', 'nations network team', 'virksomhed', 'digital partner'],
  openGraph: {
    title: 'Om Nations Network',
    description: 'Din digitale partner for professionel webudvikling og hosting',
  }
}

export default function OmOs() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="min-h-screen bg-zinc-100">
                <div className="relative z-10 pt-24 pb-16 bg-slate-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6">
                        <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
                            <h1 className="text-5xl font-bold text-white mb-4">Om os</h1>
                            <p className="text-xl text-white/90">Vi er dedikerede til at hjælpe din virksomhed med at vokse</p>
                        </div>
                    </div>
                </div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: '200ms' }}>
                            <h2 className="text-3xl font-bold text-gray-800 mb-6">Vores Historie</h2>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                NationsNetwork blev grundlagt i 2024 med en klar vision: At hjælpe virksomheder med at udnytte 
                                deres fulde digitale potentiale. Vi startede som et lille team med store drømme, og i dag 
                                fortsætter vi med at vokse og udvikle os sammen med vores kunder.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Vi tror på at skabe langvarige partnerskaber med vores kunder, hvor vi ikke bare er en 
                                leverandør, men en aktiv del af deres digitale rejse og vækst.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: '400ms' }}>
                            <h2 className="text-3xl font-bold text-gray-800 mb-6">Vores Mission</h2>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Vores mission er at levere skræddersyede digitale løsninger, der skaber reel værdi for 
                                vores kunder. Vi fokuserer på at kombinere kreativitet med teknisk ekspertise for at 
                                skabe resultater, der overgår forventninger.
                            </p>
                            <ul className="space-y-4 text-gray-600">
                                <li className="flex items-center">
                                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                                    Kundefokuseret tilgang
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                                    Innovative løsninger
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                                    Transparent kommunikation
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-16 bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: '600ms' }}>
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Vores Værdier</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                            <div className="text-center animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: '800ms' }}>
                                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center animate-blob">
                                    <Lightbulb className="h-8 w-8 text-green-500" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Innovation</h3>
                                <p className="text-gray-600">
                                    Vi er altid på forkant med den nyeste teknologi og trends inden for digital udvikling.
                                </p>
                            </div>
                            <div className="text-center animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: '1000ms' }}>
                                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center animate-blob">
                                    <Handshake className="h-8 w-8 text-green-500" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Partnerskab</h3>
                                <p className="text-gray-600">
                                    Vi bygger stærke relationer med vores kunder baseret på tillid og gensidig respekt.
                                </p>
                            </div>
                            <div className="text-center animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: '1200ms' }}>
                                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center animate-blob">
                                    <Star className="h-8 w-8 text-green-500" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Kvalitet</h3>
                                <p className="text-gray-600">
                                    Vi leverer kun løsninger af højeste kvalitet, der skaber målbare resultater.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}