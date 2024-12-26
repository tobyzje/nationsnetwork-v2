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
    icon: '/favicon.ico',
  },
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