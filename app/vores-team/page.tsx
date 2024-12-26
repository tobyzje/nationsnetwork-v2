"use client"

import OurTeamBG from "@/public/our-team-bg.jpg"
import Image from "next/image"
import ContactForm from "../components/ContactForm"

export default function VoresTeam() {
    return (
        <div className="relative min-h-screen">
            <Image
                src={OurTeamBG}
                alt="Vores Team"
                fill
                className="object-cover brightness-50"
                priority
            />
            <div className="relative z-10 pt-32 pb-16">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-white mb-4">Mød holdet bag din webpræsenation</h1>
                    <p className="text-xl text-white/90">Vi er dedikerede til at hjælpe din virksomhed med at vokse</p>
                    <div className="flex items-center justify-center mt-8 -mb-7">
                        <ContactForm/>
                    </div>
                </div>


                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 gap-8">
                        <div className="bg-white/95 p-8 rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300">
                            <div className="text-center">
                                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                                    <span className="text-4xl">👨‍💼</span>
                                </div>
                                <h3 className="text-3xl font-bold text-gray-800 mb-2">Tobias Stoklund</h3>
                                <p className="text-green-600 font-semibold text-lg mb-4">CEO & Grundlægger</p>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    Med over 3 års erfaring inden for digital marketing og webudvikling, 
                                    leder Tobias NationsNetwork med en passion for at skabe innovative 
                                    digitale løsninger for vores kunder.
                                </p>
                                <div className="space-y-2 text-gray-700">
                                    <p className="flex items-center justify-center gap-2 hover:text-green-600 transition-colors">
                                        <span>📧</span>
                                        <a href="mailto:mathias@nationsnetwork.dk">tobias@nationsnetwork.dk</a>
                                    </p>
                                    <p className="flex items-center justify-center gap-2 hover:text-green-600 transition-colors">
                                        <span>📱</span>
                                        <a href="tel:+4527572437">+45 27 57 24 37</a>
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}