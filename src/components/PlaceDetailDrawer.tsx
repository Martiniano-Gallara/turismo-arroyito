"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  X,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  ExternalLink,
  CheckCircle2,
  Navigation,
} from "lucide-react";
import { PlaceItem } from "@/data/tourismData";

interface PlaceDetailDrawerProps {
  place: PlaceItem | null;
  onClose: () => void;
  onViewOnMap?: (place: PlaceItem) => void;
}

export function PlaceDetailDrawer({ place, onClose, onViewOnMap }: PlaceDetailDrawerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (place) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [place, onClose]);

  if (!place || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs transition-opacity duration-300"
      onClick={onClose}
      onTouchMove={(e) => {
        if (e.target === e.currentTarget) {
          e.preventDefault();
        }
      }}
    >
      <div
        className="relative w-full max-w-lg max-h-[85vh] sm:max-h-[88vh] bg-[#FAF8F5] rounded-t-3xl sm:rounded-3xl shadow-2xl border-t sm:border border-[#D4A359]/30 overflow-hidden flex flex-col transform transition-all duration-300 translate-y-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile handle pull */}
        <div className="w-12 h-1.5 bg-[#3A4F3F]/20 rounded-full mx-auto my-2.5 sm:hidden" />

        {/* Hero image with badges and close button */}
        <div className="relative w-full h-44 sm:h-52 bg-[#3A4F3F] shrink-0 overflow-hidden">
          <Image
            src={place.image}
            alt={place.name}
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors z-10"
            aria-label="Cerrar detalle"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges on image */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-[#D4A359] text-[#3A4F3F] shadow-sm">
                {place.tag}
              </span>
              {place.badge && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 text-[#3A4F3F]">
                  {place.badge}
                </span>
              )}
            </div>

            {/* Open / Closed pill */}
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold shadow-sm ${
                place.isOpenNow
                  ? "bg-emerald-500 text-white"
                  : "bg-rose-500 text-white"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>{place.isOpenNow ? "Abierto ahora" : "Cerrado"}</span>
            </div>
          </div>
        </div>

        {/* Content body with overscroll-contain and extra bottom padding */}
        <div className="p-5 sm:p-6 pb-8 sm:pb-6 overflow-y-auto space-y-4 overscroll-contain">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#3A4F3F] leading-tight">
              {place.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#3A4F3F]/80 mt-1.5 leading-relaxed">
              {place.description}
            </p>
          </div>

          {/* Precise Hours Card */}
          <div className="p-3.5 rounded-2xl bg-white border border-[#3A4F3F]/10 shadow-2xs space-y-2">
            <div className="flex items-start gap-2.5">
              <div className="p-1.5 rounded-lg bg-[#D4A359]/20 text-[#3A4F3F] mt-0.5 shrink-0">
                <Clock className="w-4 h-4 text-[#3A4F3F]" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#3A4F3F] block">
                  Horarios de atención
                </span>
                <span className="text-xs text-[#3A4F3F]/85 font-medium leading-snug">
                  {place.hours}
                </span>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-2.5 pt-2 border-t border-[#3A4F3F]/5">
              <div className="p-1.5 rounded-lg bg-[#3A4F3F]/10 text-[#3A4F3F] mt-0.5 shrink-0">
                <MapPin className="w-4 h-4 text-[#D4A359]" />
              </div>
              <div className="flex-1">
                <span className="text-xs font-bold text-[#3A4F3F] block">
                  Ubicación
                </span>
                <span className="text-xs text-[#3A4F3F]/85">
                  {place.address}
                </span>
              </div>
              {onViewOnMap && (
                <button
                  onClick={() => {
                    onViewOnMap(place);
                    onClose();
                  }}
                  className="text-[11px] font-bold text-[#D4A359] hover:underline self-center shrink-0 flex items-center gap-1"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Ver mapa</span>
                </button>
              )}
            </div>
          </div>

          {/* Services list if available */}
          {place.services && place.services.length > 0 && (
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#3A4F3F]/70 block mb-2">
                Servicios y Comodidades
              </span>
              <div className="flex flex-wrap gap-1.5">
                {place.services.map((srv, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 text-[11px] font-medium bg-[#F5F2EB] text-[#3A4F3F] px-2.5 py-1 rounded-lg border border-[#3A4F3F]/10"
                  >
                    <CheckCircle2 className="w-3 h-3 text-[#D4A359]" />
                    {srv}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Call / WhatsApp Buttons */}
          <div className="pt-2 flex items-center gap-2">
            {place.whatsapp && (
              <a
                href={`https://wa.me/${place.whatsapp}?text=Hola!%20Te%20contacto%20desde%20la%20guía%20de%20Turismo%20Arroyito%20por%20${encodeURIComponent(
                  place.name
                )}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-xs transition active:scale-98"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            )}

            {place.instagram && (
              <a
                href={`https://instagram.com/${place.instagram.replace(/^@/, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 text-white font-bold text-xs sm:text-sm py-3 px-3.5 rounded-xl shadow-xs transition active:scale-98 shrink-0"
                title={`@${place.instagram.replace(/^@/, "")}`}
              >
                <svg
                  className="w-4 h-4 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span className="hidden xs:inline">Instagram</span>
              </a>
            )}

            {place.phone && (
              <a
                href={`tel:${place.phone.replace(/[^0-9+]/g, "")}`}
                className="inline-flex items-center justify-center gap-1.5 bg-[#FAF8F5] hover:bg-[#F0EDE6] text-[#3A4F3F] border border-[#3A4F3F]/20 font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-xs transition active:scale-98 shrink-0"
              >
                <Phone className="w-4 h-4 text-[#3A4F3F]" />
                <span className="hidden xs:inline">Llamar</span>
              </a>
            )}

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${place.name}, ${place.address}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 bg-[#D4A359] hover:bg-[#b8853b] text-[#3A4F3F] font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-xs transition active:scale-98 shrink-0"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Cómo llegar</span>
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
