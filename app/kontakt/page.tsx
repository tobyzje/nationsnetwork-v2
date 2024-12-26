"use client"

import { Mail, Phone, Clock, Hash } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function Kontakt() {
    return (
        <div className="min-h-screen bg-zinc-100 pt-28 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-12">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                        Tag fat i os – så tager vi en uforpligtende snak om jeres hjemmesidebehov
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Vi er her kun for at hjælpe din forretning til online succes gennem professionelle hjemmesider og webshops. Vi rådgiver gratis og uforpligtende
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Kontaktformular */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Send os en besked</CardTitle>
                            <CardDescription>
                                Udfyld formularen, så vender vi tilbage hurtigst muligt
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Dit fulde navn</Label>
                                        <Input id="name" placeholder="John Doe" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="company">Virksomhedsnavn</Label>
                                        <Input id="company" placeholder="Firma A/S" />
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">E-mail</Label>
                                        <Input id="email" type="email" placeholder="john@firma.dk" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Telefonnummer</Label>
                                        <Input id="phone" type="tel" placeholder="+45 12 34 56 78" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message">Din besked</Label>
                                    <Textarea 
                                        id="message" 
                                        placeholder="Skriv din besked her..." 
                                        className="min-h-[150px]"
                                        required 
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="consent"
                                            className="h-4 w-4 rounded border-gray-300 text-green-500 focus:ring-green-500"
                                            required
                                        />
                                        <Label htmlFor="consent" className="text-sm text-gray-600">
                                            Jeg accepterer at NationsNetwork må kontakte mig
                                        </Label>
                                    </div>

                                    <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">
                                        Send besked
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Kontakt Information */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Kontakt Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Mail className="h-5 w-5 text-green-500" />
                                        <div>
                                            <p className="font-medium">Email</p>
                                            <a href="mailto:kontakt@nationsnetwork.dk" className="text-gray-600 hover:text-green-500">
                                                kontakt@nationsnetwork.dk
                                            </a>
                                            
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Hash className="h-5 w-5 text-green-500" />
                                        <div>
                                            <p className="font-medium">CVR-NR</p>
                                            <p className="text-gray-600">45062260</p>
                                            
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Phone className="h-5 w-5 text-green-500" />
                                        <div>
                                            <p className="font-medium">Telefon</p>
                                            <a href="tel:+4527572437" className="text-gray-600 hover:text-green-500">
                                                +45 27 57 24 37 (Tobias)
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Clock className="h-5 w-5 text-green-500" />
                                        <div>
                                            <p className="font-medium">Åbningstider</p>
                                            <p className="text-gray-600">Man-Fre: 8:00 - 17:00</p>
                                            <p className="text-gray-600">Weekend: Lukket</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-gray-200">
                                    <p className="text-sm text-gray-500">
                                        Har du brug for øjeblikkelig assistance? Ring til os på vores hovednummer.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Svartid</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    Vi svarer altid indenfor 24 timer.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}