"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getAssetUrl } from "@/utils/assetPath";

interface IntroLoaderProps {
  onComplete: () => void;
  forceShow?: boolean;
}

export function IntroLoader({ onComplete, forceShow = false }: IntroLoaderProps) {
  const [stage, setStage] = useState<"initial" | "animate" | "fadeout" | "hidden">("initial");

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setStage("animate");
    }, 100);

    const timer2 = setTimeout(() => {
      setStage("fadeout");
    }, 1400);

    const timer3 = setTimeout(() => {
      setStage("hidden");
      onComplete();
    }, 2100);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete, forceShow]);

  if (stage === "hidden") return null;

  return (
    <div
      onClick={onComplete}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F5F2EB] cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        stage === "fadeout"
          ? "opacity-0 pointer-events-none scale-105 blur-[2px]"
          : "opacity-100 scale-100"
      }`}
      aria-label="Cargando experiencia Turismo Arroyito"
      role="status"
    >
      {/* Subtle organic background ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,163,89,0.18)_0%,transparent_70%)] pointer-events-none" />

      {/* Main presentation badge */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-sm">
        {/* Official Municipal Emblem */}
        <div
          className={`w-20 h-20 mb-5 relative transition-all duration-700 drop-shadow-lg ${
            stage === "animate" ? "scale-100 opacity-100" : "scale-90 opacity-0"
          }`}
        >
          <Image
            src={getAssetUrl("/images/escudo-arroyito.png")}
            alt="Escudo Oficial de Arroyito"
            width={80}
            height={80}
            priority
            className="w-full h-full object-contain"
          />
        </div>

        {/* Small municipal label */}
        <span
          className={`text-[11px] font-semibold tracking-[0.25em] uppercase text-[#D4A359] mb-2 transition-all duration-700 delay-100 ${
            stage === "animate" ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          Córdoba · Argentina
        </span>

        {/* Stately Title */}
        <h1
          className={`text-2xl sm:text-3xl font-extrabold tracking-wider text-[#3A4F3F] uppercase transition-all duration-700 delay-150 ${
            stage === "animate" ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          Turismo Arroyito
        </h1>

        {/* Slogan */}
        <p
          className={`text-xs font-medium text-[#3A4F3F]/70 mt-2 transition-all duration-700 delay-200 ${
            stage === "animate" ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          La Dulce Ciudad del País
        </p>

        {/* Golden progress bar */}
        <div className="w-36 h-1 bg-[#3A4F3F]/10 rounded-full mt-6 overflow-hidden relative">
          <div
            className={`h-full bg-gradient-to-r from-[#D4A359] to-[#E7C286] rounded-full transition-all duration-1000 ease-out ${
              stage === "animate" ? "w-full" : "w-0"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
