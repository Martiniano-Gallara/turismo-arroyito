"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  ArrowLeft,
  Compass,
  Church,
  Train,
  Waves,
  Award,
  Users,
  Sparkles,
  Maximize2,
  X,
  Calendar,
  Building2,
} from "lucide-react";

interface ConocerArroyitoViewProps {
  onBack: () => void;
}

interface HistoryMilestone {
  id: string;
  icon: React.ElementType;
  badge: string;
  title: string;
  period: string;
  image: string;
  imagePosition?: string;
  alt: string;
  photoCaption: string;
  summary: string;
  keyFact: string;
}

const HISTORIA_OFICIAL: HistoryMilestone[] = [
  {
    id: "origen-inisacate",
    icon: Compass,
    badge: "Pueblos Originarios",
    title: "El Antiguo Paraje e Inisacate",
    period: "Período Precolombino",
    image: "/images/paraje_antiguo_arroyito_real.jpg",
    imagePosition: "object-[center_78%]",
    alt: "Postal de archivo histórico del paraje primitivo de Arroyito",
    photoCaption: "Fotografía histórica de archivo: paraje y primeras chacras de Arroyito",
    summary:
      "Los aborígenes sanavirones llamaban a este suelo Inisacate o Intisacate. La aldea debe su nombre al arroyo que ingresaba por el sur (entre actuales avenidas Cura Brochero y José Boetto), originado en las vertientes de Arroyo de Álvarez y Los Manantiales, serpenteando hacia la Laguna de Don Gerónimo Lario antes de desembocar en el río Xanaes.",
    keyFact: "El arroyo original —hoy desaparecido— dio nombre y ubicación a la ciudad.",
  },
  {
    id: "origen-1778",
    icon: Church,
    badge: "Año 1778 · Virreinato",
    title: "Origen Colonial y Capilla de la Merced",
    period: "Primer Censo Virreinal",
    image: "/images/capilla_san_cayetano_arroyito_real.jpg",
    imagePosition: "object-[center_42%]",
    alt: "Capilla Histórica San Cayetano en Arroyito",
    photoCaption: "Capilla Histórica San Cayetano (antigua Capilla Ntra. Sra. de la Merced)",
    summary:
      "En 1778, el primer censo virreinal registró 220 habitantes y 34 viviendas. La creciente población se formó alrededor de la capilla construida por el español José Ignacio Urquía en homenaje a Nuestra Señora de la Merced (hoy Templo San Cayetano), ubicada sobre un solar elevado para resguardarla de las crecidas.",
    keyFact: "Aún se conservan en su interior las lápidas de mármol de los primeros pobladores.",
  },
  {
    id: "ferrocarril",
    icon: Train,
    badge: "Fines Siglo XIX",
    title: "Llegada del Ferrocarril y Museo Histórico",
    period: "Conexión Ferroviaria",
    image: "/images/estacion_arroyito_alta_calidad.jpg",
    imagePosition: "object-[center_55%]",
    alt: "Estación del ferrocarril de Arroyito y Museo Histórico Municipal",
    photoCaption: "Estación ferroviaria inglesa, sede del Museo Histórico Municipal",
    summary:
      "La llegada del ferrocarril integró la producción agrícola del este cordobés con los principales mercados y puertos, atrayendo a familias inmigrantes (en su mayoría italianas). La casona ferroviaria de diseño inglés alberga actualmente las salas del Museo Histórico Municipal de Arroyito.",
    keyFact: "Testimonio arquitectónico del auge agrario y la inmigración europea.",
  },
  {
    id: "rio-xanaes",
    icon: Waves,
    badge: "Río y Balneario",
    title: "Ciudad de Ruta 19 y Río Xanaes",
    period: "Dique Los Molinos (1947)",
    image: "/images/rio_xanaes_arroyito_real.jpg",
    imagePosition: "object-[center_60%]",
    alt: "Río Xanaes en Arroyito",
    photoCaption: "Río Xanaes (Río Segundo), ribera natural y balneario municipal",
    summary:
      "Arroyito es la segunda urbe del Departamento San Justo sobre la Ruta Nacional 19. Históricamente, las crecidas primaverales del río inundaban las zonas bajas. Con la habilitación del Dique Los Molinos en 1947 se estabilizó el cauce, naciendo las célebres playas de arena y el balneario municipal.",
    keyFact: "Ubicada estratégicamente sobre la RN 19 a 115 km de Córdoba capital.",
  },
  {
    id: "plaza-pioneros",
    icon: Users,
    badge: "Memoria e Identidad",
    title: "Plaza 25 de Mayo y Homenaje a los Pioneros",
    period: "Corazón Cívico",
    image: "/images/plaza_25_de_mayo_real.png",
    imagePosition: "object-[center_45%]",
    alt: "Plaza 25 de Mayo de Arroyito, Monumento a la Madre y bandera argentina",
    photoCaption: "Plaza 25 de Mayo: Monumento a la Madre, fuentes y centro cívico",
    summary:
      "El trazado céntrico de Arroyito perpetúa el homenaje a los pioneros españoles, criollos, aborígenes y colonos que forjaron el pueblo. La Plaza 25 de Mayo es el punto de encuentro ciudadano por excelencia, custodiando esculturas conmemorativas y la memoria viva de la comunidad.",
    keyFact: "Homenaje cívico permanente a Don José Ignacio Urquía y los forjadores del pueblo.",
  },
  {
    id: "capital-dulzura",
    icon: Award,
    badge: "Capital de la Dulzura",
    title: "Economía y Nacimiento de Arcor",
    period: "1951 al Presente",
    image: "/images/real_arcor.jpg",
    imagePosition: "object-center",
    alt: "Complejo industrial Arcor en Arroyito",
    photoCaption: "Fábrica Arcor Arroyito, cuna de la Capital Nacional de la Dulzura",
    summary:
      "La economía de chacras y molinos harineros experimentó un salto transformador en 1951 cuando un grupo de jóvenes emprendedores fundó la primera fábrica de caramelos Arcor. La ciudad fue consagrada Capital Nacional de la Dulzura, exportando golosinas a más de 120 países en todo el globo.",
    keyFact: "Polo agroindustrial líder con más de 30.000 habitantes en su área de influencia.",
  },
];

export function ConocerArroyitoModal({ onBack }: ConocerArroyitoViewProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<HistoryMilestone | null>(null);
  const [mounted, setMounted] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock scrolling when a card detail is open to prevent page movement
  useEffect(() => {
    if (!lightboxImage) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyTouch = document.body.style.touchAction;

    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.touchAction = originalBodyTouch;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxImage]);

  const handleBack = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(onBack, 360);
  };

  const handleCardClick = (item: HistoryMilestone) => {
    setLightboxImage(item);
  };

  return (
    <div
      ref={scrollContainerRef}
      className={`fixed inset-0 z-40 bg-[#F5F2EB] flex flex-col ${
        lightboxImage ? "overflow-hidden" : "overflow-y-auto"
      } ${isClosing ? "animate-page-turn-out pointer-events-none" : "animate-page-turn-in"}`}
    >
      {/* Sticky Top Header */}
      <header className="sticky top-0 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#3A4F3F]/10 px-4 py-3 flex items-center justify-between">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#3A4F3F] text-[#FAF8F5] text-xs font-bold shadow-xs hover:bg-[#2B3B2F] transition active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver</span>
        </button>
        <div className="flex items-center gap-1.5">
          <Building2 className="w-4 h-4 text-[#D4A359]" />
          <h1 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#3A4F3F]">
            Historia de Arroyito
          </h1>
        </div>
        <span className="w-[76px]" aria-hidden />
      </header>

      {/* Hero Banner */}
      <div className="relative w-full h-44 sm:h-56 bg-[#3A4F3F] overflow-hidden shrink-0">
        <Image
          src="/images/hero-arroyito.jpg"
          alt="Arroyito, Córdoba"
          fill
          priority
          className="object-cover object-center brightness-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
        <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end text-white max-w-4xl mx-auto w-full">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D4A359] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Archivo Histórico Municipal
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-wide text-[#FAF8F5] mt-0.5">
            Arroyito, Nuestra Historia
          </h2>
          <p className="text-xs sm:text-sm text-white/90 max-w-xl line-clamp-2 mt-1">
            Crónica oficial y fidedigna desde las raíces de Inisacate y la capilla colonial de 1778 hasta la Capital Nacional de la Dulzura.
          </p>
        </div>
      </div>

      {/* Main Content: Pure Official History */}
      <main className="flex-1 max-w-4xl mx-auto w-full p-4 sm:p-6 space-y-4">
        {/* Section Header */}
        <div className="px-1 py-1 flex items-center justify-between border-b border-[#3A4F3F]/10 pb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4A359]" />
            <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#3A4F3F]">
              6 Hitos de la Memoria Arroyitense
            </h3>
          </div>
        </div>

        {/* Milestone Cards Grid */}
        <div className="space-y-4">
          {HISTORIA_OFICIAL.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.id}
                onClick={(e) => {
                  e.preventDefault();
                  handleCardClick(item);
                }}
                className="p-4 sm:p-5 rounded-3xl bg-white border border-[#3A4F3F]/10 hover:border-[#D4A359]/80 shadow-[0_4px_20px_rgba(58,79,63,0.04)] hover:shadow-lg transition-all duration-300 flex flex-col gap-3 cursor-pointer group active:scale-[0.99] select-none"
              >
                {/* Real Photograph with Zoom and Fine-tuned Positioning */}
                <div
                  className="relative h-48 sm:h-64 w-full rounded-2xl overflow-hidden bg-[#243328] group"
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 850px"
                    className={`group-hover:scale-105 transition-transform duration-500 ease-out object-cover ${
                      item.imagePosition || "object-center"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25 pointer-events-none" />

                  {/* Top-Left Category Badge */}
                  <div className="absolute top-3 left-3 bg-[#3A4F3F]/95 backdrop-blur-md text-[#D4A359] text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wide px-3 py-1 rounded-full border border-white/10 shadow-sm flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    <span>{item.badge}</span>
                  </div>

                  {/* Top-Right Lightbox Button */}
                  <div
                    className="absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-md text-white group-hover:bg-[#3A4F3F] group-hover:text-[#D4A359] group-hover:scale-110 transition shadow-xs"
                    aria-label="Tocar para ampliar"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>

                  {/* Bottom Image Caption */}
                  <div className="absolute bottom-2.5 left-3 right-3 text-white text-[11px] sm:text-xs font-semibold line-clamp-1 drop-shadow-sm flex items-center gap-1.5 opacity-95">
                    <span className="text-[#D4A359]">Foto:</span>
                    <span>{item.photoCaption}</span>
                  </div>
                </div>

                {/* Card Info Content */}
                <div className="flex items-start gap-3 pt-1">
                  <div className="p-2.5 rounded-2xl bg-[#3A4F3F] text-[#D4A359] shrink-0 shadow-xs group-hover:bg-[#2B3B2F] transition">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <h4 className="text-base sm:text-lg font-black text-[#3A4F3F] leading-snug group-hover:text-[#2B3B2F]">
                        {item.title}
                      </h4>
                      <span className="text-[11px] font-bold text-[#D4A359] bg-[#F5F2EB] px-2.5 py-0.5 rounded-full border border-[#D4A359]/20">
                        {item.period}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#3A4F3F]/85 mt-2 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                </div>

                {/* Key Highlight Pill */}
                <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#3A4F3F]/10 flex items-center gap-2 text-[11px] sm:text-xs text-[#3A4F3F]/90">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4A359] shrink-0" />
                  <span className="font-semibold text-[#3A4F3F]">Hito oficial:</span>
                  <span className="text-[#3A4F3F]/80 flex-1">{item.keyFact}</span>
                </div>
              </article>
            );
          })}
        </div>
      </main>

      {/* Lightbox Modal Rendered in Portal directly to document.body:
          - Prevents scroll jump to top (stays in place)
          - Blocks/freezes background scrolling until closed
      */}
      {mounted && lightboxImage && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxImage(null)}
          onTouchMove={(e) => {
            if (e.target === e.currentTarget) {
              e.preventDefault();
            }
          }}
          className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md p-3 sm:p-6 flex flex-col items-center justify-center animate-modal-backdrop overscroll-none"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full bg-[#1A251D] rounded-3xl overflow-hidden border border-white/15 shadow-2xl flex flex-col max-h-[92vh] animate-modal-card"
          >
            {/* Lightbox Header */}
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-white/10 bg-[#131C15] text-white shrink-0">
              <div className="pr-2">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#D4A359]">
                  {lightboxImage.badge}
                </span>
                <h4 className="text-base sm:text-lg font-black text-[#FAF8F5] leading-snug mt-0.5">
                  {lightboxImage.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/25 active:scale-90 text-white transition cursor-pointer shrink-0"
                aria-label="Cerrar tarjeta"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Image View with crisp containment */}
            <div className="relative w-full h-56 sm:h-80 bg-black flex items-center justify-center shrink-0">
              <Image
                src={lightboxImage.image}
                alt={lightboxImage.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 850px"
                className="object-contain"
                priority
              />
            </div>

            {/* Lightbox Footer Content (Scrollable only if text is long) */}
            <div className="p-4 sm:p-5 bg-[#202E24] text-white/95 text-xs sm:text-sm border-t border-white/10 overflow-y-auto overscroll-contain">
              <p className="leading-relaxed font-normal">{lightboxImage.summary}</p>
              <div className="mt-3.5 pt-3 border-t border-white/10 flex items-start gap-2 text-[11px] sm:text-xs text-[#D4A359]">
                <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="font-semibold text-white/90">
                  {lightboxImage.keyFact}
                </span>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
