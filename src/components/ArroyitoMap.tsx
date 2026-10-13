"use client";

import React, { useEffect, useRef } from "react";
import L from "leaflet";
import { PlaceItem } from "@/data/tourismData";

interface ArroyitoMapProps {
  places: PlaceItem[];
  selectedPlace: PlaceItem | null;
  onSelectPlace: (place: PlaceItem) => void;
}

export function ArroyitoMap({ places, selectedPlace, onSelectPlace }: ArroyitoMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Arroyito coordinates: -31.4208, -63.0505
      // Strict bounding box: user cannot wander away into other provinces/countries
      const southWest = L.latLng(-31.465, -63.095);
      const northEast = L.latLng(-31.385, -63.005);
      const bounds = L.latLngBounds(southWest, northEast);

      const map = L.map(mapContainerRef.current, {
        center: [-31.4208, -63.0505],
        zoom: 15,
        minZoom: 13,
        maxZoom: 18,
        maxBounds: bounds,
        maxBoundsViscosity: 1.0, // bounce back immediately if dragged out
        zoomControl: true,
      });

      // Clean OpenStreetMap tiles: 100% free, no API key, displays full local street network
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      const markersGroup = L.layerGroup().addTo(map);
      markersGroupRef.current = markersGroup;
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update markers when places change
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersGroupRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();

    places.forEach((place) => {
      // Custom HTML Pin
      const isSelected = selectedPlace?.id === place.id;
      const customIcon = L.divIcon({
        className: "custom-map-pin",
        html: `
          <div style="
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: ${isSelected ? "38px" : "32px"};
            height: ${isSelected ? "38px" : "32px"};
            background-color: ${isSelected ? "#D4A359" : "#3A4F3F"};
            color: #FAF8F5;
            border-radius: 50%;
            border: 2.5px solid #FAF8F5;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            cursor: pointer;
            transition: all 0.2s ease;
          ">
            <svg style="width: 16px; height: 16px;" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 21s7-4.5 7-10a7 7 0 10-14 0c0 5.5 7 10 7 10z" />
              <circle cx="12" cy="11" r="2.5" fill="currentColor" />
            </svg>
          </div>
        `,
        iconSize: [isSelected ? 38 : 32, isSelected ? 38 : 32],
        iconAnchor: [isSelected ? 19 : 16, isSelected ? 38 : 32],
        popupAnchor: [0, isSelected ? -38 : -32],
      });

      const marker = L.marker([place.lat, place.lng], { icon: customIcon });

      // Custom Popup
      const popupHtml = `
        <div style="font-family: var(--font-inter, sans-serif); padding: 4px; min-width: 170px;">
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
            <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; background: ${
              place.isOpenNow ? "#DCFCE7" : "#FEE2E2"
            }; color: ${place.isOpenNow ? "#166534" : "#991B1B"}; padding: 2px 6px; border-radius: 999px;">
              ${place.isOpenNow ? "Abierto" : "Cerrado"}
            </span>
            <span style="font-size: 10px; color: #3A4F3F; opacity: 0.7; font-weight: 600;">${place.tag}</span>
          </div>
          <h4 style="margin: 0; font-size: 13px; font-weight: 800; color: #3A4F3F; line-height: 1.2;">${place.name}</h4>
          <p style="margin: 3px 0 8px 0; font-size: 11px; color: #556B5C;">📍 ${place.address}</p>
          <button id="btn-detail-${place.id}" style="
            width: 100%;
            background-color: #3A4F3F;
            color: #FAF8F5;
            font-size: 11px;
            font-weight: 700;
            padding: 6px 10px;
            border-radius: 8px;
            border: none;
            cursor: pointer;
          ">
            Ver ficha completa
          </button>
        </div>
      `;

      marker.bindPopup(popupHtml, { closeButton: false, offset: [0, -6] });

      marker.on("popupopen", () => {
        const btn = document.getElementById(`btn-detail-${place.id}`);
        if (btn) {
          btn.onclick = () => onSelectPlace(place);
        }
      });

      marker.addTo(markersGroup);
    });

    if (selectedPlace) {
      map.flyTo([selectedPlace.lat, selectedPlace.lng], 16, { animate: true, duration: 0.8 });
    }
  }, [places, selectedPlace, onSelectPlace]);

  return (
    <div className="relative w-full h-full min-h-[400px] rounded-3xl overflow-hidden border border-[#3A4F3F]/15 shadow-inner">
      <div ref={mapContainerRef} className="w-full h-full z-0" />
    </div>
  );
}
