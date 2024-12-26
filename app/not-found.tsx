"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-100 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-900">404</h1>
        <h2 className="text-4xl font-semibold text-gray-700 mt-4">Side ikke fundet</h2>
        <p className="text-gray-500 mt-4 mb-8 max-w-md">
          Beklager, men siden du leder efter findes ikke. Den kan være flyttet eller slettet.
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link href="/">
            <Button variant="default" className="gap-2">
              <Home className="h-4 w-4" />
              Gå til forsiden
            </Button>
          </Link>
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Gå tilbage
          </Button>
        </div>
      </div>
    </div>
  )
} 
