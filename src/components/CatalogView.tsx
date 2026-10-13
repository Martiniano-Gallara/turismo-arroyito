"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  MapPin,
  Search,
  SlidersHorizontal,
  Map as MapIcon,
  Grid,
  Check,
  ChevronDown,
} from "lucide-react";
import dynamic from "next/dynamic";
import { PlaceItem, CATEGORIES, TOURIST_PLACES } from "@/data/tourismData";
import { PlaceDetailDrawer } from "@/components/PlaceDetailDrawer";

const ArroyitoMap = dynamic(
  () => import("@/components/ArroyitoMap").then((mod) => mod.ArroyitoMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-[60vh] sm:h-[65vh] w-full flex items-center justify-center bg-white/60 rounded-3xl border border-[#3A4F3F]/10">
        <span className="text-xs font-bold text-[#3A4F3F]/60 animate-pulse">
          Cargando mapa interactivo de Arroyito...
        </span>
      </div>
    ),
  }
);

interface CatalogViewProps {
  categoryId: string;
  onBack: () => void;
}

export function CatalogView({ categoryId, onBack }: CatalogViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [viewMode, setViewMode] = useState<"catalog" | "map">("catalog");
  const [selectedPlace, setSelectedPlace] = useState<PlaceItem | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const catalogScrollRef = useRef<HTMLDivElement>(null);
  const savedScrollTop = useRef<number>(0);

  // Preserve scroll position and lock background when modal is open
  useEffect(() => {
    if (selectedPlace) {
      if (catalogScrollRef.current) {
        savedScrollTop.current = catalogScrollRef.current.scrollTop;
      }
    } else {
      if (catalogScrollRef.current && savedScrollTop.current > 0) {
        catalogScrollRef.current.scrollTop = savedScrollTop.current;
      }
    }
  }, [selectedPlace]);

  const handleBack = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      onBack();
    }, 400);
  };

  const currentCategory = useMemo(() => {
    return CATEGORIES.find((c) => c.id === categoryId) || CATEGORIES[0];
  }, [categoryId]);

  const allCategoryPlaces = useMemo(() => {
    return TOURIST_PLACES.filter((p) => p.category === categoryId);
  }, [categoryId]);

  // Filtered places according to search and tag filter
  const filteredPlaces = useMemo(() => {
    return allCategoryPlaces.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subCategory.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter =
        activeFilter === "Todos" ||
        p.subCategory.toLowerCase() === activeFilter.toLowerCase() ||
        p.tag.toLowerCase().includes(activeFilter.toLowerCase());

      return matchesSearch && matchesFilter;
    });
  }, [allCategoryPlaces, searchQuery, activeFilter]);

  return (
    <div
      ref={catalogScrollRef}
      className={`fixed inset-0 z-40 bg-[#F5F2EB] flex flex-col ${
        selectedPlace ? "overflow-hidden" : "overflow-y-auto"
      } ${
        isClosing ? "animate-page-turn-out pointer-events-none" : "animate-page-turn-in"
      }`}
    >
      {/* Top Floating App Bar */}
      <header className="sticky top-0 z-30 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#3A4F3F]/10 px-4 py-3 flex items-center justify-between">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#3A4F3F] text-[#FAF8F5] text-xs font-bold shadow-xs hover:bg-[#2B3B2F] transition active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver</span>
        </button>

        <h1 className="text-sm font-black uppercase tracking-wider text-[#3A4F3F]">
          {currentCategory.title}
        </h1>

        {/* Toggle between 2-column Catalog and Map view */}
        <button
          onClick={() => setViewMode(viewMode === "catalog" ? "map" : "catalog")}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#D4A359] text-[#3A4F3F] text-xs font-bold shadow-xs hover:bg-[#b8853b] transition active:scale-95 cursor-pointer"
        >
          {viewMode === "catalog" ? (
            <>
              <MapIcon className="w-3.5 h-3.5" />
              <span>Ver mapa</span>
            </>
          ) : (
            <>
              <Grid className="w-3.5 h-3.5" />
              <span>Ver catálogo</span>
            </>
          )}
        </button>
      </header>

      {/* Hero Banner for the Section */}
      <div className="relative w-full h-36 sm:h-48 bg-[#3A4F3F] overflow-hidden shrink-0">
        <Image
          src={currentCategory.bannerImage}
          alt={currentCategory.title}
          fill
          priority
          className="object-cover object-center brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />

        <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end text-white max-w-4xl mx-auto w-full">
          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D4A359]">
                Guía de Arroyito
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-wide text-[#FAF8F5]">
                {currentCategory.title}
              </h2>
              <p className="text-xs text-white/80 max-w-md line-clamp-1 mt-0.5">
                {currentCategory.subtitle}
              </p>
            </div>

            {/* Quick banner button: Ver mapa */}
            {viewMode === "catalog" && (
              <button
                onClick={() => setViewMode("map")}
                className="hidden xs:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#D4A359] text-[#3A4F3F] text-xs font-black shadow-md hover:bg-[#b8853b] transition shrink-0 active:scale-95 cursor-pointer"
              >
                <MapIcon className="w-4 h-4" />
                <span>Ver mapa</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl mx-auto w-full p-4 sm:p-6 space-y-4">
        {/* Search Bar & Filter Button Row */}
        <div className="flex items-center gap-2 relative">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#3A4F3F]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Buscar en ${currentCategory.title.toLowerCase()}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-[#3A4F3F]/15 text-[#3A4F3F] placeholder-[#3A4F3F]/40 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#D4A359] shadow-2xs"
            />
          </div>

          {/* Filter Button */}
          <div className="relative">
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl border text-xs sm:text-sm font-bold shadow-2xs transition active:scale-95 cursor-pointer ${
                activeFilter !== "Todos"
                  ? "bg-[#3A4F3F] text-[#FAF8F5] border-[#3A4F3F]"
                  : "bg-white text-[#3A4F3F] border-[#3A4F3F]/15 hover:border-[#D4A359]"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden xs:inline">
                {activeFilter === "Todos" ? "Filtros" : activeFilter}
              </span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            {/* Filter Dropdown Popover */}
            {showFilterDropdown && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setShowFilterDropdown(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-48 bg-[#FAF8F5] rounded-2xl shadow-xl border border-[#D4A359]/30 p-2 z-30 space-y-1">
                  <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#3A4F3F]/60">
                    Filtrar por tipo
                  </div>
                  {currentCategory.filterTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        setActiveFilter(tag);
                        setShowFilterDropdown(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition ${
                        activeFilter === tag
                          ? "bg-[#3A4F3F] text-[#FAF8F5]"
                          : "text-[#3A4F3F] hover:bg-black/5"
                      }`}
                    >
                      <span>{tag}</span>
                      {activeFilter === tag && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* View Mode 1: 2-COLUMN CATALOG */}
        {viewMode === "catalog" ? (
          <div>
            {filteredPlaces.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-[#3A4F3F]/10">
                <p className="text-sm font-semibold text-[#3A4F3F]">
                  No se encontraron resultados
                </p>
                <p className="text-xs text-[#3A4F3F]/60 mt-1">
                  Probá ajustando tu búsqueda o cambiando el filtro seleccionado.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveFilter("Todos");
                  }}
                  className="mt-3 text-xs font-bold text-[#D4A359] underline"
                >
                  Restablecer filtros
                </button>
              </div>
            ) : (
              /* STRICT 2-COLUMN CATALOG */
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {filteredPlaces.map((place) => (
                  <div
                    key={place.id}
                    onClick={() => setSelectedPlace(place)}
                    className="group bg-white rounded-2xl sm:rounded-3xl border border-[#3A4F3F]/10 hover:border-[#D4A359] shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col cursor-pointer active:scale-[0.98]"
                  >
                    {/* Thumbnail Image with Open/Closed Badge */}
                    <div className="relative w-full aspect-4/3 bg-[#3A4F3F]/10 overflow-hidden">
                      <Image
                        src={place.image}
                        alt={place.name}
                        fill
                        sizes="(max-width: 640px) 50vw, 300px"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Open / Closed Badge */}
                      <div className="absolute top-2 left-2">
                        <span
                          className={`inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow-xs ${
                            place.isOpenNow
                              ? "bg-emerald-500 text-white"
                              : "bg-rose-500 text-white"
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          <span>{place.isOpenNow ? "Abierto" : "Cerrado"}</span>
                        </span>
                      </div>

                      {/* Category tag */}
                      <div className="absolute bottom-1.5 left-2 right-2">
                        <span className="text-[9px] sm:text-[10px] font-bold text-white/90 truncate block drop-shadow-xs">
                          {place.tag}
                        </span>
                      </div>
                    </div>

                    {/* Card Body: Nombre y Ubicación */}
                    <div className="p-3 sm:p-4 flex flex-col justify-between flex-1 gap-1">
                      <div>
                        <h3 className="text-xs sm:text-sm font-black text-[#3A4F3F] leading-snug group-hover:text-[#253529] transition-colors line-clamp-2">
                          {place.name}
                        </h3>
                      </div>

                      <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-[#3A4F3F]/70 pt-1 border-t border-[#3A4F3F]/5">
                        <MapPin className="w-3 h-3 text-[#D4A359] shrink-0" />
                        <span className="truncate">{place.address}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* View Mode 2: BOUNDED INTERACTIVE MAP */
          <div className="space-y-3">
            <div className="h-[60vh] sm:h-[65vh] w-full">
              <ArroyitoMap
                places={filteredPlaces}
                selectedPlace={selectedPlace}
                onSelectPlace={(place) => setSelectedPlace(place)}
              />
            </div>
            <p className="text-center text-xs text-[#3A4F3F]/60">
              Tocá cualquier marcador en el mapa para ver el nombre, dirección y abrir la ficha completa.
            </p>
          </div>
        )}
      </main>

      {/* Bottom Detail Drawer (Abierto al tocar cualquier tarjeta) */}
      <PlaceDetailDrawer
        place={selectedPlace}
        onClose={() => setSelectedPlace(null)}
        onViewOnMap={(place) => {
          setSelectedPlace(place);
          setViewMode("map");
        }}
      />
    </div>
  );
}
