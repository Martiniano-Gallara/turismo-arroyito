import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#3A4F3F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://turismoarroyito.com.ar"),
  title: "Turismo Arroyito",
  description: "Guía práctica y rápida para descubrir Arroyito, Córdoba: alojamiento, gastronomía, puntos de interés, servicios y teléfonos útiles.",
  keywords: ["Turismo Arroyito", "Arroyito Córdoba", "Hoteles en Arroyito", "Dónde comer en Arroyito", "La Dulce Ciudad"],
  authors: [{ name: "Municipalidad de Arroyito - Dirección de Turismo" }],
  openGraph: {
    title: "Turismo Arroyito",
    description: "Descubrí Arroyito: descanso, gastronomía, naturaleza y servicios.",
    url: "https://turismoarroyito.com.ar",
    siteName: "Turismo Arroyito",
    images: [
      {
        url: "/images/hero-arroyito.jpg",
        width: 1200,
        height: 800,
        alt: "Arroyito, Córdoba al atardecer",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/images/escudo-arroyito.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/images/escudo-arroyito.png",
    apple: "/images/escudo-arroyito.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="h-full bg-[#F5F2EB] text-[#3A4F3F] font-sans overflow-x-hidden selection:bg-[#D4A359] selection:text-[#3A4F3F]">
        {children}
      </body>
    </html>
  );
}
