"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Construction, ArrowLeft, Timer, Mail } from "lucide-react"
import Link from "next/link"

export default function UnderConstruction() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-green-500 flex items-center justify-center p-4 animate-gradient-x">
      <Card className="max-w-2xl w-full p-8 text-center relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-1000">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-green-500 animate-pulse" />
        <div className="absolute -top-8 -right-8 w-24 h-24 bg-green-100 rounded-full opacity-20 animate-blob" />
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-blue-100 rounded-full opacity-20 animate-blob delay-700" />

        <div className="relative">
          <div className="animate-bounce-slow">
            <Construction className="h-20 w-20 mx-auto mb-6 text-green-500 animate-spin-slow" />
          </div>
          
          <h1 className="text-4xl font-bold mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Siden er under opbygning
          </h1>
          
          <p className="text-gray-600 mb-8 max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 delay-200 duration-1000">
            Vi arbejder på højtryk for at gøre denne side klar. Kom tilbage snart eller kontakt os for mere information.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="flex items-center justify-center gap-2 text-gray-600 animate-in fade-in slide-in-from-bottom-4 delay-300 duration-1000">
              <Timer className="h-5 w-5 text-blue-500 animate-pulse" />
              <span>Forventet klar snart</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-600 animate-in fade-in slide-in-from-bottom-4 delay-500 duration-1000">
              <Mail className="h-5 w-5 text-green-500 animate-bounce" />
              <span>kontakt@nationsnetwork.dk</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 delay-700 duration-1000">
            <Link href="/">
              <Button variant="outline" className="w-full sm:w-auto gap-2 transition-transform hover:scale-105">
                <ArrowLeft className="h-4 w-4" />
                Gå til forsiden
              </Button>
            </Link>
            <Link href="/kontakt">
              <Button className="w-full sm:w-auto gap-2 bg-green-500 hover:bg-green-600 transition-transform hover:scale-105">
                <Mail className="h-4 w-4" />
                Kontakt os
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  )
} 