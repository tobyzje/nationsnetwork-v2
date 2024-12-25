"use client"

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${
            isScrolled ? `bg-white shadow-lg py-2 lg:max-w-[85%] md:max-w-[90%] max-w-[95%] left-1/2 -translate-x-1/2 mt-2 ${!isOpen && 'rounded-full'}` : 'py-4'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center">
                            <span className={`text-2xl font-bold ${isScrolled ? 'text-slate-600' : 'text-white'}`}>
                                NATIONS<span className="text-green-500">NETWORK</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop menu */}
                    <div className="hidden lg:flex items-center space-x-8">
                        <Link href="/vores-team" className={`font-medium hover:text-green-500 transition-colors ${isScrolled ? 'text-slate-600' : 'text-white'}`}>
                            Vores Team
                        </Link>
                        <Link href="/cases" className={`font-medium hover:text-green-500 transition-colors ${isScrolled ? 'text-slate-600' : 'text-white'}`}>
                            Cases
                        </Link>
                        <Link href="/priser" className={`font-medium hover:text-green-500 transition-colors ${isScrolled ? 'text-slate-600' : 'text-white'}`}>
                            Priser
                        </Link>
                        <Link href="/om-os" className={`font-medium hover:text-green-500 transition-colors ${isScrolled ? 'text-slate-600' : 'text-white'}`}>
                            Om os
                        </Link>
                        <Link href="/kontakt" className="px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors">
                            Kontakt os
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="lg:hidden">
                        <button 
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-md text-gray-600"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {isOpen && (
                    <div className="lg:hidden bg-white mt-2 rounded-lg shadow-lg">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <Link href="/vores-team" className="block px-3 py-2 text-gray-600 hover:text-green-500 rounded-md">
                                Vores Team
                            </Link>
                            <Link href="/cases" className={`font-medium hover:text-green-500 transition-colors ${isScrolled ? 'text-slate-600' : 'text-white'}`}>
                                Cases
                            </Link>
                            <Link href="/priser" className="block px-3 py-2 text-gray-600 hover:text-green-500 rounded-md">
                                Priser
                            </Link>
                            <Link href="/om-os" className="block px-3 py-2 text-gray-600 hover:text-green-500 rounded-md">
                                Om os
                            </Link>
                            <Link href="/kontakt" className="block px-3 py-2 text-green-500 hover:text-green-600 rounded-md">
                                Kontakt os
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
