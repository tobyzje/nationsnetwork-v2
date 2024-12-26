"use client"

import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Kontakt Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Kontakt Os</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-green-500" />
                <p>+45 27 57 24 37</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-green-500" />
                <p>kontakt@nationsnetwork.dk</p>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-500" />
                <p>Grindsted, Danmark</p>
              </div>
            </div>
          </div>

          {/* Hurtige Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Hurtige Links</h3>
            <ul className="space-y-2">
              <li><Link href="/priser" className="hover:text-green-500 transition-colors">Ydelser</Link></li>
              <li><Link href="/om-os" className="hover:text-green-500 transition-colors">Om Os</Link></li>
              <li><Link href="/kontakt" className="hover:text-green-500 transition-colors">Kontakt</Link></li>
              <li><Link href="/vores-team" className="hover:text-green-500 transition-colors">Vores Team</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>Webudvikling</li>
              <li>Digital Marketing</li>
              <li>SEO Optimering</li>
              <li>Support & Vedligeholdelse</li>
            </ul>
          </div>

          {/* Sociale Medier */}
          <div>
            <h3 className="text-xl font-bold mb-4">Følg Os</h3>
            <div className="flex gap-4 text-black">
              <Button variant="outline" size="icon" className="rounded-full">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

        </div>

        <div className="border-t border-zinc-800 mt-8 pt-8 text-center text-sm text-zinc-400">
          <p>© {new Date().getFullYear()} NationsNetwork. Alle rettigheder forbeholdes.</p>
        </div>
      </div>
    </footer>
  )
}
