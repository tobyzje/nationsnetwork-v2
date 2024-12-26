import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from '@/context/CartContext'
import MobileCartIcon from "./components/MobileCartIcon"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://nationsnetwork.dk'),
  title: {
    default: 'Nations Network | Webudvikling & Hosting',
    template: '%s | Nations Network'
  },
  description: 'Nations Network er en webudvikling og hosting virksomhed der tilbyder skræddersyede digitale løsninger til din virksomhed',
  keywords: ['webudvikling', 'hosting', 'hjemmeside', 'webshop', 'digitale løsninger', 'nations network', 'nationsnetwork'],
  authors: [{ name: 'Nations Network' }],
  creator: 'Nations Network',
  publisher: 'Nations Network',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'da_DK',
    url: 'https://nationsnetwork.dk',
    siteName: 'Nations Network',
    title: 'Nations Network | Webudvikling & Hosting',
    description: 'Professionel webudvikling og hosting løsninger til din virksomhed',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Nations Network'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nations Network | Webudvikling & Hosting',
    description: 'Professionel webudvikling og hosting løsninger til din virksomhed',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      {
        url: 'public/favicon.ico',
        sizes: '32x32',
      },
      {
        url: 'public/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: 'public/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: 'public/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
  manifest: 'public/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="da">
      <body className={inter.className}>
        <CartProvider>
          <TopBar />
          <Navbar />
          {children}
          <MobileCartIcon />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}