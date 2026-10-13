"use client";

import React, { useEffect, useState } from "react";
import { X, MapPin, Phone, MessageCircle, ExternalLink, Bed, Utensils, Fuel, Compass, Search } from "lucide-react";
import { PlaceItem, TOURIST_PLACES, CATEGORIES } from "@/data/tourismData";

interface CategoryDrawerProps {
  categoryId: string | null;
  onClose: () => void;
}

export function CategoryDrawer({ categoryId, onClose }: CategoryDrawerProps) {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (categoryId) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [categoryId, onClose]);

  if (!categoryId) return null;

  const currentCategory = CATEGORIES.find((c) => c.id === categoryId);
  const places = TOURIST_PLACES.filter((p) => p.category === categoryId);
  const filteredPlaces = places.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryIcon = () => {
    switch (categoryId) {
      case "alojamiento":
        return <Bed className="w-5 h-5" />;
      case "gastronomia":
        return <Utensils className="w-5 h-5" />;
      case "servicios":
        return <Fuel className="w-5 h-5" />;
      case "puntos_interes":
        return <Compass className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm transition-all duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl max-h-[85vh] sm:max-h-[90vh] bg-[#FAF8F5] rounded-t-3xl sm:rounded-3xl shadow-2xl border-t sm:border border-[#D4A359]/30 overflow-hidden flex flex-col transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle bar on mobile */}
        <div className="w-12 h-1.5 bg-[#3A4F3F]/20 rounded-full mx-auto my-2.5 sm:hidden" />

        {/* Header */}
        <div className="bg-[#3A4F3F] text-[#F5F2EB] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#D4A359] text-[#3A4F3F]">
              {getCategoryIcon()}
            </div>
            <div>
              <h2 className="text-lg font-bold uppercase tracking-wider text-white">
                {currentCategory?.title || "Detalles"}
              </h2>
              <p className="text-xs text-[#F5F2EB]/70">
                {currentCategory?.subtitle || "Opciones verificadas en Arroyito"}
              </p>
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

        {/* Search input if more than 3 items */}
        {places.length > 2 && (
          <div className="p-3 bg-[#F5F2EB] border-b border-[#3A4F3F]/10">
            <div className="relative">
              <Search className="w-4 h-4 text-[#3A4F3F]/50 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={`Buscar en ${currentCategory?.title.toLowerCase()}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white border border-[#3A4F3F]/15 text-[#3A4F3F] placeholder-[#3A4F3F]/40 focus:outline-none focus:border-[#D4A359]"
              />
            </div>
          </div>
        )}

        {/* Places List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {filteredPlaces.length === 0 ? (
            <div className="text-center py-8 text-sm text-[#3A4F3F]/60">
              No se encontraron resultados para tu búsqueda.
            </div>
          ) : (
            filteredPlaces.map((place) => (
              <div
                key={place.id}
                className="p-4 rounded-2xl bg-white border border-[#3A4F3F]/10 hover:border-[#D4A359] shadow-xs transition-all flex flex-col gap-3 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#D4A359]/20 text-[#3A4F3F]">
                        {place.tag}
                      </span>
                      {place.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#3A4F3F] text-[#F5F2EB]">
                          {place.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-[#3A4F3F] mt-1 group-hover:text-[#253529] transition-colors">
                      {place.name}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-[#3A4F3F]/80 leading-relaxed">
                  {place.description}
                </p>

                {/* Info rows */}
                <div className="space-y-1 text-xs text-[#3A4F3F]/70 pt-1 border-t border-[#3A4F3F]/5">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#D4A359] shrink-0" />
                    <span>{place.address}</span>
                  </div>
                  {place.hours && (
                    <div className="flex items-center gap-2 text-[11px] text-[#3A4F3F]/60">
                      <span className="font-medium text-[#3A4F3F]/80">Horarios:</span> {place.hours}
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 pt-2 flex-wrap">
                  {place.whatsapp && (
                    <a
                      href={`https://wa.me/${place.whatsapp}?text=Hola!%20Consulta%20desde%20Turismo%20Arroyito`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs px-3 py-1.5 rounded-xl transition shadow-xs active:scale-95"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  )}

                  {place.phone && (
                    <a
                      href={`tel:${place.phone.replace(/[^0-9+]/g, "")}`}
                      className="inline-flex items-center gap-1.5 bg-[#F5F2EB] hover:bg-[#ebe6dc] text-[#3A4F3F] font-semibold text-xs px-3 py-1.5 rounded-xl border border-[#3A4F3F]/15 transition active:scale-95"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Llamar</span>
                    </a>
                  )}

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${place.name}, Arroyito, Córdoba`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-[#3A4F3F]/70 hover:text-[#3A4F3F] ml-auto underline"
                  >
                    <span>Ver en mapa</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-[#F5F2EB] border-t border-[#3A4F3F]/10 text-center text-xs text-[#3A4F3F]/60">
          Información verificada por la Dirección de Turismo de Arroyito
        </div>
      </div>
    </div>
  );
}
