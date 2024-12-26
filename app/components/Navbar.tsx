"use client"

import Link from "next/link";
import { useState, useEffect } from "react";
import LoginButton from "./LoginButton";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Logo = ({ isScrolled }: { isScrolled: boolean }) => (
  <Link href="/" className="font-bold text-xl text-white tracking-tight hover:scale-105 transition-all duration-300">
    <p className={cn(isScrolled ? "text-zinc-600" : "text-zinc-400")}>
      NATIONS <span className="text-green-500">NETWORK</span>
    </p>
  </Link>
);

const NavLinks = ({ isScrolled }: { isScrolled?: boolean }) => (
  <div className="flex items-center gap-8">
    <Link 
      href="/vores-team" 
      className={cn(
        "transition-colors",
        isScrolled ? "text-gray-600 hover:text-green-500" : "text-black hover:text-green-400"
      )}
    >
      Vores Team
    </Link>
    <Link 
      href="/cases"
      className={cn(
        "transition-colors",
        isScrolled ? "text-gray-600 hover:text-green-500" : "text-black hover:text-green-400"
      )}
    >
      Cases
    </Link>
    <Link 
      href="/priser"
      className={cn(
        "transition-colors",
        isScrolled ? "text-gray-600 hover:text-green-500" : "text-black hover:text-green-400"
      )}
    >
      Priser
    </Link>
    <Link 
      href="/om-os"
      className={cn(
        "transition-colors",
        isScrolled ? "text-gray-600 hover:text-green-500" : "text-black hover:text-green-400"
      )}
    >
      Om os
    </Link>
  </div>
);

const MobileMenu = ({ isScrolled }: { isScrolled: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) setIsOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "p-2 rounded-lg transition-colors",
          isScrolled 
            ? "hover:bg-gray-100 text-gray-600" 
            : "text-slate-600 hover:bg-white/10"
        )}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>
      
      {isOpen && (
        <div className="absolute top-20 left-0 right-0 bg-gradient-to-b from-white/80 to-white/60 backdrop-blur-lg shadow-lg animate-in slide-in-from-top duration-300">
          <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
            <Link 
              href="/vores-team" 
              className="text-gray-800 text-lg font-medium hover:text-green-500 transition-colors"
            >
              Vores Team
            </Link>
            <Link 
              href="/cases" 
              className="text-gray-800 text-lg font-medium hover:text-green-500 transition-colors"
            >
              Cases
            </Link>
            <Link 
              href="/priser" 
              className="text-gray-800 text-lg font-medium hover:text-green-500 transition-colors"
            >
              Priser
            </Link>
            <Link 
              href="/om-os" 
              className="text-gray-800 text-lg font-medium hover:text-green-500 transition-colors"
            >
              Om os
            </Link>
            <Link 
              href="/kontakt" 
              className="text-gray-800 text-lg font-medium hover:text-green-500 transition-colors"
            >
              Kontakt os
            </Link>
            <div className="pt-6 border-t">
              <LoginButton isScrolled={isScrolled} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        isScrolled 
          ? "top-2 mx-auto max-w-7xl left-0 right-0 bg-white/80 backdrop-blur-md shadow-lg rounded-full" 
          : "md:top-10 top-0 bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Logo isScrolled={isScrolled} />
        <nav className="hidden md:flex items-center gap-8">
          <NavLinks isScrolled={isScrolled} />
          <LoginButton isScrolled={isScrolled} />
        </nav>
        <MobileMenu isScrolled={isScrolled} />
      </div>
    </header>
  );
}
