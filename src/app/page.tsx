"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Bed,
  Utensils,
  Fuel,
  Compass,
  ChevronRight,
  MapPin,
  BookOpen,
} from "lucide-react";
import { IntroLoader } from "@/components/IntroLoader";
import { CatalogView } from "@/components/CatalogView";
import { EmergencyModal } from "@/components/EmergencyModal";
import { ConocerArroyitoModal } from "@/components/ConocerArroyitoModal";
import { getAssetUrl } from "@/utils/assetPath";

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showEmergencies, setShowEmergencies] = useState(false);
  const [showConocer, setShowConocer] = useState(false);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setHasLoaded(true);
  };

  return (
    <main className="relative h-[100dvh] max-h-[100dvh] w-full overflow-hidden flex flex-col justify-between select-none bg-[#F5F2EB]">
      {/* Presentation Intro Loader */}
      {showIntro && <IntroLoader onComplete={handleIntroComplete} forceShow={showIntro} />}

      {/* Cinematic Background Image Container */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={getAssetUrl("/images/hero-arroyito.jpg")}
          alt="Arroyito, Córdoba al atardecer"
          fill
          priority
          sizes="100vw"
          className={`object-cover object-center transition-all duration-1200 ease-out ${hasLoaded ? "scale-100 blur-0 brightness-100" : "scale-105 blur-sm brightness-95"
            }`}
        />

        {/* Sophisticated gradient scrim layers for contrast and glowing sunset */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(212,163,89,0.2)_0%,rgba(58,79,63,0.35)_70%,rgba(20,28,22,0.8)_100%)] pointer-events-none" />
      </div>

      {/* CENTER VIEWPORT: Title, Prompt, and Main 4 Tourist Options */}
      <section className="relative z-10 w-full px-4 sm:px-6 my-auto max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Subtle decorative badge with MapPin */}
        <div
          className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D4A359] text-[#3A4F3F] text-[10px] sm:text-xs font-extrabold uppercase tracking-widest shadow-md mb-2 sm:mb-3 transition-all duration-1000 delay-300 ${hasLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
        >
          <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#3A4F3F] shrink-0" />
          <span>Portal Turístico Oficial</span>
        </div>

        {/* Grand Hero Title */}
        <h1
          className={`text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#F5F2EB] uppercase drop-shadow-md transition-all duration-1000 delay-400 ${hasLoaded ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
            }`}
        >
          Turismo Arroyito
        </h1>

        {/* Golden divider line */}
        <div
          className={`w-20 sm:w-28 h-0.5 bg-gradient-to-r from-transparent via-[#D4A359] to-transparent my-2 sm:my-3 transition-all duration-1000 delay-450 ${hasLoaded ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
            }`}
        />

        {/* Prompt question */}
        <h2
          className={`text-lg sm:text-2xl font-bold text-[#F5F2EB] tracking-wide mb-4 sm:mb-6 drop-shadow-sm transition-all duration-1000 delay-500 ${hasLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
        >
          ¿Qué buscás?
        </h2>

        {/* 4 Primary Interactive Tourist Options (Optimized for mobile single screen) */}
        <div
          className={`w-full max-w-2xl grid grid-cols-2 sm:grid-cols-2 gap-2.5 sm:gap-3.5 transition-all duration-1000 delay-600 ${hasLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
          {/* 1. Alojamiento */}
          <button
            onClick={() => setActiveCategory("alojamiento")}
            className="group relative flex flex-col items-start p-3 sm:p-4 rounded-2xl bg-[#F5F2EB]/92 hover:bg-[#FAF8F5] text-[#3A4F3F] backdrop-blur-md border border-white/80 hover:border-[#D4A359] shadow-lg hover:shadow-xl transition-all duration-300 transform active:scale-98 text-left overflow-hidden cursor-pointer"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-[#D4A359]/10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />
            <div className="flex items-center justify-between w-full mb-1.5 sm:mb-2">
              <div className="p-2 sm:p-2.5 rounded-xl bg-[#3A4F3F] text-[#D4A359] shadow-xs group-hover:bg-[#2B3B2F] transition-colors">
                <Bed className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <ChevronRight className="w-4 h-4 text-[#3A4F3F]/40 group-hover:text-[#D4A359] group-hover:translate-x-0.5 transition-all" />
            </div>
            <span className="text-sm sm:text-base font-extrabold uppercase tracking-wide text-[#3A4F3F] leading-tight">
              Alojamiento
            </span>
            <span className="text-[11px] sm:text-xs text-[#3A4F3F]/75 font-medium mt-0.5 line-clamp-1">
              Hoteles y hospedajes
            </span>
          </button>

          {/* 2. Gastronomía */}
          <button
            onClick={() => setActiveCategory("gastronomia")}
            className="group relative flex flex-col items-start p-3 sm:p-4 rounded-2xl bg-[#F5F2EB]/92 hover:bg-[#FAF8F5] text-[#3A4F3F] backdrop-blur-md border border-white/80 hover:border-[#D4A359] shadow-lg hover:shadow-xl transition-all duration-300 transform active:scale-98 text-left overflow-hidden cursor-pointer"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-[#D4A359]/10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />
            <div className="flex items-center justify-between w-full mb-1.5 sm:mb-2">
              <div className="p-2 sm:p-2.5 rounded-xl bg-[#3A4F3F] text-[#D4A359] shadow-xs group-hover:bg-[#2B3B2F] transition-colors">
                <Utensils className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <ChevronRight className="w-4 h-4 text-[#3A4F3F]/40 group-hover:text-[#D4A359] group-hover:translate-x-0.5 transition-all" />
            </div>
            <span className="text-sm sm:text-base font-extrabold uppercase tracking-wide text-[#3A4F3F] leading-tight">
              Gastronomía
            </span>
            <span className="text-[11px] sm:text-xs text-[#3A4F3F]/75 font-medium mt-0.5 line-clamp-1">
              Restaurantes, cafés y bares
            </span>
          </button>

          {/* 3. Servicios */}
          <button
            onClick={() => setActiveCategory("servicios")}
            className="group relative flex flex-col items-start p-3 sm:p-4 rounded-2xl bg-[#F5F2EB]/92 hover:bg-[#FAF8F5] text-[#3A4F3F] backdrop-blur-md border border-white/80 hover:border-[#D4A359] shadow-lg hover:shadow-xl transition-all duration-300 transform active:scale-98 text-left overflow-hidden cursor-pointer"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-[#D4A359]/10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />
            <div className="flex items-center justify-between w-full mb-1.5 sm:mb-2">
              <div className="p-2 sm:p-2.5 rounded-xl bg-[#3A4F3F] text-[#D4A359] shadow-xs group-hover:bg-[#2B3B2F] transition-colors">
                <Fuel className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <ChevronRight className="w-4 h-4 text-[#3A4F3F]/40 group-hover:text-[#D4A359] group-hover:translate-x-0.5 transition-all" />
            </div>
            <span className="text-sm sm:text-base font-extrabold uppercase tracking-wide text-[#3A4F3F] leading-tight">
              Servicios
            </span>
            <span className="text-[11px] sm:text-xs text-[#3A4F3F]/75 font-medium mt-0.5 line-clamp-1">
              Estaciones y cajeros
            </span>
          </button>

          {/* 4. Puntos de interés */}
          <button
            onClick={() => setActiveCategory("puntos_interes")}
            className="group relative flex flex-col items-start p-3 sm:p-4 rounded-2xl bg-[#F5F2EB]/92 hover:bg-[#FAF8F5] text-[#3A4F3F] backdrop-blur-md border border-white/80 hover:border-[#D4A359] shadow-lg hover:shadow-xl transition-all duration-300 transform active:scale-98 text-left overflow-hidden cursor-pointer"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-[#D4A359]/10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />
            <div className="flex items-center justify-between w-full mb-1.5 sm:mb-2">
              <div className="p-2 sm:p-2.5 rounded-xl bg-[#3A4F3F] text-[#D4A359] shadow-xs group-hover:bg-[#2B3B2F] transition-colors">
                <Compass className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <ChevronRight className="w-4 h-4 text-[#3A4F3F]/40 group-hover:text-[#D4A359] group-hover:translate-x-0.5 transition-all" />
            </div>
            <span className="text-sm sm:text-base font-extrabold uppercase tracking-wide text-[#3A4F3F] leading-tight">
              Puntos de Interés
            </span>
            <span className="text-[11px] sm:text-xs text-[#3A4F3F]/75 font-medium mt-0.5 line-clamp-1">
              Balneario, plazas y paseos
            </span>
          </button>

          {/* 5. Conocer Arroyito (ancho completo, debajo de las últimas dos tarjetas) */}
          <button
            onClick={() => setShowConocer(true)}
            className="col-span-2 group inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#D4A359] hover:bg-[#c2924a] text-[#3A4F3F] text-sm font-extrabold uppercase tracking-wide shadow-lg hover:shadow-xl transition-all active:scale-98 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
            Conocer Arroyito
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </section>

      {/* BOTTOM SECTION: Emergencias (debajo en pequeño) */}
      <footer
        className={`relative z-10 w-full px-4 pb-3 sm:pb-4 pt-1 transition-all duration-1000 delay-700 flex flex-col items-center gap-1.5 ${hasLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
      >
        {/* Emergencias Button (debajo en pequeño, sutil pero accesible) */}
        <button
          onClick={() => setShowEmergencies(true)}
          className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F5]/85 hover:bg-[#FAF8F5] backdrop-blur-md border border-red-300/60 hover:border-red-400 text-[#3A4F3F] text-xs font-semibold shadow-md transition-all active:scale-95 cursor-pointer"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
          </span>
          <span className="text-[11px] sm:text-xs text-[#3A4F3F] font-bold">
            Emergencias
          </span>
          <span className="text-[10px] text-[#3A4F3F]/60 hidden xs:inline">
            (Hospital 107 · Policía 101 · Bomberos 100)
          </span>
        </button>

        {/* Discreet municipal caption */}
        <p className="text-[10px] text-[#F5F2EB]/70 font-medium tracking-wide">
          Municipalidad de Arroyito · Córdoba, Argentina
        </p>
      </footer>

      {/* Full-Screen Catalog View with Banner, Bounded Map, and 2-Column Grid */}
      {activeCategory && (
        <CatalogView
          categoryId={activeCategory}
          onBack={() => setActiveCategory(null)}
        />
      )}

      {showConocer && (
        <ConocerArroyitoModal onBack={() => setShowConocer(false)} />
      )}

      {/* Quick Emergency Modal */}
      <EmergencyModal
        isOpen={showEmergencies}
        onClose={() => setShowEmergencies(false)}
      />
    </main>
  );
}
