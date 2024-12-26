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
  title: "NationsNetwork - Din digitale partner",
  description: "Din digitale partner",
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