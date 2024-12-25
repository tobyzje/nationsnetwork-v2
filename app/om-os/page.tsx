import { Lightbulb, Star, Handshake, CheckCircle2 } from "lucide-react";


export default function OmOs() {
    return (
        <div className="min-h-screen bg-black">
            <div className="relative z-10 pt-32 pb-16 flex flex-col items-center justify-center">
                <h1 className="text-5xl font-bold text-white mb-4">Om os</h1>
                <p className="text-xl text-white/90">Vi er dedikerede til at hjælpe din virksomhed med at vokse</p>
            </div>
            <div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="bg-white/95 p-8 rounded-xl shadow-xl">
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

                        <div className="bg-white/95 p-8 rounded-xl shadow-xl">
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

                    <div className="mt-16 bg-white/95 p-8 rounded-xl shadow-xl">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Vores Værdier</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                                    <Lightbulb className="h-8 w-8 text-green-500" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Innovation</h3>
                                <p className="text-gray-600">
                                    Vi er altid på forkant med den nyeste teknologi og trends inden for digital udvikling.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                                    <Handshake className="h-8 w-8 text-green-500" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Partnerskab</h3>
                                <p className="text-gray-600">
                                    Vi bygger stærke relationer med vores kunder baseret på tillid og gensidig respekt.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
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
        </div>
    )
}