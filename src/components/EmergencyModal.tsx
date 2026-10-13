"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Phone, AlertTriangle, Shield, HeartPulse, Flame, Compass, Car } from "lucide-react";
import { EMERGENCY_CONTACTS, EmergencyContact } from "@/data/tourismData";

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EmergencyModal({ isOpen, onClose }: EmergencyModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const renderIcon = (type: EmergencyContact["iconType"]) => {
    switch (type) {
      case "hospital":
        return <HeartPulse className="w-5 h-5 text-rose-600" />;
      case "police":
        return <Shield className="w-5 h-5 text-blue-600" />;
      case "fire":
        return <Flame className="w-5 h-5 text-amber-600" />;
      case "tourism":
        return <Compass className="w-5 h-5 text-emerald-600" />;
      case "transit":
        return <Car className="w-5 h-5 text-orange-600" />;
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
      onTouchMove={(e) => {
        if (e.target === e.currentTarget) {
          e.preventDefault();
        }
      }}
    >
      <div
        className="relative w-full max-w-lg bg-[#FAF8F5] rounded-3xl shadow-2xl border border-[#D4A359]/30 overflow-hidden transform transition-all duration-300 scale-100 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#3A4F3F] text-[#F5F2EB] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-red-500/20 text-red-300">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold uppercase tracking-wider text-white">
                Teléfonos de Emergencia
              </h2>
              <p className="text-xs text-[#F5F2EB]/70">Arroyito · Asistencia inmediata 24 hs</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3">
          {EMERGENCY_CONTACTS.map((item) => (
            <div
              key={item.id}
              className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#3A4F3F]/10 hover:border-[#D4A359] shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#F5F2EB] mt-0.5 shrink-0">
                  {renderIcon(item.iconType)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#3A4F3F] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#3A4F3F]/75 mt-0.5">{item.description}</p>
                  {item.address && (
                    <p className="text-[11px] text-[#3A4F3F]/50 mt-1">📍 {item.address}</p>
                  )}
                </div>
              </div>

              {/* Direct call button */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#3A4F3F]/5">
                <a
                  href={`tel:${item.number}`}
                  className="inline-flex items-center gap-1.5 bg-[#D4A359] hover:bg-[#b8853b] text-[#3A4F3F] font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs transition active:scale-95"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Llamar {item.number}</span>
                </a>
                {item.secondaryNumber && (
                  <span className="text-[11px] text-[#3A4F3F]/60 font-mono">
                    {item.secondaryNumber}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F5F2EB] border-t border-[#3A4F3F]/10 text-center text-xs text-[#3A4F3F]/70">
          Oficina de Turismo Municipal:{" "}
          <a
            href="https://wa.me/5493576414921"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[#3A4F3F] underline hover:text-[#D4A359]"
          >
            WhatsApp +54 9 3576 41-4921
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}
