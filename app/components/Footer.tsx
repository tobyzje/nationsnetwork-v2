"use client"

import Link from "next/link"
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Kontakt */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <a href="mailto:kontakt@nationsnetwork.dk" className="hover:text-green-500">
                kontakt@nationsnetwork.dk
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <a href="tel:+4527572437" className="hover:text-green-500">
                +45 27 57 24 37
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <a className="hover:text-green-500">
                7200 Grindsted, Danmark
              </a>
            </li>
          </ul>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/om-os" className="hover:text-green-500">
                Om os
              </Link>
            </li>
            <li>
              <Link href="/cases" className="hover:text-green-500">
                Cases
              </Link>
            </li>
            <li>
              <Link href="/priser" className="hover:text-green-500">
                Priser
              </Link>
            </li>
            <li>
              <Link href="/kontakt" className="hover:text-green-500">
                Kontakt
              </Link>
            </li>
          </ul>
        </div>

        {/* Juridisk */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Juridisk</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/handelsbetingelser" className="hover:text-green-500">
                Handelsbetingelser
              </Link>
            </li>
            <li>
              <Link href="/cookie-politik" className="hover:text-green-500">
                Cookie Politik
              </Link>
            </li>
            <li>
              <button 
                onClick={() => {
                  localStorage.removeItem('cookieConsent')
                  window.location.reload()
                }}
                className="hover:text-green-500 cursor-pointer"
              >
                Cookie Indstillinger
              </button>
            </li>
          </ul>
        </div>

        {/* Sociale Medier */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Følg os</h3>
          <div className="flex gap-4">
            <a 
              href="https://www.facebook.com/nationsnetwork" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-green-500"
            >
              <Facebook className="h-6 w-6" />
            </a>
            <a 
              href="https://www.instagram.com/nationsnetwork" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-green-500"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a 
              href="https://www.linkedin.com/company/nationsnetwork" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-green-500"
            >
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-zinc-800">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-zinc-400">
            © {new Date().getFullYear()} NationsNetwork. Alle rettigheder forbeholdes.
          </p>
          <p className="text-sm text-zinc-400">
            CVR: 45062260
          </p>
        </div>
      </div>
    </footer>
  )
}
