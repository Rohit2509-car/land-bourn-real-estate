import React, { useState } from "react";
import { Map, ZoomIn, ZoomOut, Compass, MapPin, Eye, ShieldCheck } from "lucide-react";
import { Property } from "../types";

interface InteractiveMapProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
}

export default function InteractiveMap({ properties, onSelectProperty }: InteractiveMapProps) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [hoveredProperty, setHoveredProperty] = useState<Property | null>(null);
  const [selectedPin, setSelectedPin] = useState<Property | null>(properties[0] || null);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.5, 1));

  return (
    <section id="interactive-map" className="bg-white py-24 px-6 lg:px-8 border-t border-zinc-200">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="mb-12 space-y-4 text-center md:text-left">
          <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#E53935] uppercase block">
            GEOGRAPHIC DEED REGISTRY
          </span>
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl flex items-center justify-center md:justify-start space-x-2">
            <Map className="h-7 w-7 text-[#E53935]" />
            <span>Interactive Land Asset Map</span>
          </h2>
          <p className="font-sans text-sm text-zinc-600 max-w-xl leading-relaxed">
            Examine our high-value global inventory mapped in real-time. Hover over pins to inspect regional price parameters or click to view full site legal dossiers.
          </p>
        </div>

        {/* Map Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Map Vector Canvas (8/12 columns) */}
          <div className="lg:col-span-8 relative rounded-2xl border border-zinc-200 bg-zinc-50 h-[500px] overflow-hidden group shadow-sm">
            
            {/* Map Grid Vector lines / Background styling */}
            <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
              <div className="h-full w-full bg-[radial-gradient(#0002_1px,transparent_1px)] [background-size:16px_16px]"></div>
              <div className="absolute inset-y-0 left-1/4 w-0.5 bg-zinc-200 dashed"></div>
              <div className="absolute inset-y-0 left-1/2 w-0.5 bg-[#E53935]/20"></div>
              <div className="absolute inset-x-0 top-1/2 h-0.5 bg-[#E53935]/20"></div>
            </div>

            {/* Simulated Continental Continents (Elegant minimal outline overlay) */}
            <svg className="absolute inset-0 h-full w-full opacity-5 pointer-events-none text-zinc-900" viewBox="0 0 800 500">
              {/* North America */}
              <path d="M 50 100 Q 150 80 250 150 T 350 250 T 250 400 Z" fill="currentColor" />
              {/* Europe */}
              <path d="M 450 100 Q 550 50 650 120 T 600 280 Z" fill="currentColor" />
              {/* Pacific / Hawaii */}
              <circle cx="100" cy="280" r="25" fill="currentColor" />
            </svg>

            {/* Compass Rose Accent */}
            <div className="absolute bottom-6 left-6 z-10 flex items-center space-x-2 bg-white/90 border border-zinc-200 rounded-lg p-2.5 backdrop-blur shadow-sm">
               <Compass className="h-5 w-5 text-[#E53935] animate-spin-slow" />
              <div className="font-mono text-[9px] text-zinc-500 leading-tight uppercase">
                <span>Aura Registry Office</span> <br />
                <span className="text-[#E53935]">True North aligned</span>
              </div>
            </div>

            {/* Zoom Controls */}
            <div className="absolute bottom-6 right-6 z-10 flex flex-col space-y-2">
              <button
                onClick={handleZoomIn}
                className="rounded-lg bg-white/95 border border-zinc-200 p-2 text-zinc-700 hover:text-[#E53935] transition-colors shadow-sm cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
              <button
                onClick={handleZoomOut}
                className="rounded-lg bg-white/95 border border-zinc-200 p-2 text-zinc-700 hover:text-[#E53935] transition-colors shadow-sm cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
            </div>

            {/* Map Plot Container */}
            <div 
              className="absolute inset-0 transition-transform duration-500 ease-out origin-center"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              {properties.map((prop) => {
                const isSelected = selectedPin?.id === prop.id;
                
                return (
                  <div
                    key={prop.id}
                    className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300"
                    style={{ left: `${prop.coords.x}%`, top: `${prop.coords.y}%` }}
                    onMouseEnter={() => setHoveredProperty(prop)}
                    onMouseLeave={() => setHoveredProperty(null)}
                    onClick={() => setSelectedPin(prop)}
                  >
                    {/* Pulsing circle and marker */}
                    <div className="relative flex items-center justify-center">
                      <span className={`absolute inline-flex rounded-full bg-[#E53935] opacity-75 transition-all duration-500 ${
                        isSelected ? "h-8 w-8 animate-ping" : "h-0 w-0"
                      }`}></span>
                      
                      {/* Price overlay flag */}
                      <div className={`absolute bottom-6 px-2 py-0.5 rounded border font-mono text-[9px] font-bold text-white transition-all shadow-md ${
                        isSelected 
                          ? "bg-[#E53935] border-[#E53935] scale-100 z-30" 
                          : "bg-white border-[#E53935]/20 text-zinc-900 scale-90"
                      }`}>
                        ${(prop.price / 1000000).toFixed(1)}M
                      </div>

                      {/* Map Pin */}
                      <MapPin className={`h-6 w-6 transition-all ${
                        isSelected ? "text-[#E53935] scale-125 drop-shadow-[0_0_10px_rgba(229,57,53,0.5)]" : "text-[#E53935] hover:scale-110"
                      }`} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Hover Tooltip Overlay */}
            {hoveredProperty && (
              <div 
                className="absolute z-30 pointer-events-none rounded-lg border border-[#E53935]/30 bg-white p-3.5 shadow-xl backdrop-blur-md"
                style={{
                  left: `${hoveredProperty.coords.x}%`,
                  top: `calc(${hoveredProperty.coords.y}% - 70px)`,
                  transform: "translateX(-50%)"
                }}
              >
                <div className="space-y-1 font-sans">
                  <h5 className="font-bold text-xs text-zinc-900 leading-tight">{hoveredProperty.title}</h5>
                  <div className="flex justify-between items-center space-x-4 text-[10px] text-zinc-500">
                    <span>{hoveredProperty.location}</span>
                    <span className="font-bold text-[#E53935]">${hoveredProperty.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Map details panel (4/12 columns) */}
          <div className="lg:col-span-4 flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            
            {selectedPin ? (
              <div className="space-y-6 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  
                  {/* Category and verified */}
                  <div className="flex items-center justify-between">
                    <span className="inline-block px-2.5 py-1 rounded bg-[#E53935]/10 text-[#E53935] text-[10px] font-bold tracking-widest uppercase">
                      {selectedPin.category}
                    </span>
                    {selectedPin.verified && (
                      <span className="text-green-600 text-[10px] font-bold flex items-center space-x-1">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        <span>AURA DEED AUDITED</span>
                      </span>
                    )}
                  </div>

                  {/* Image */}
                  <img
                    src={selectedPin.image}
                    alt={selectedPin.title}
                    className="h-40 w-full object-cover rounded-xl border border-zinc-100"
                    referrerPolicy="no-referrer"
                  />

                  {/* Text details */}
                  <div className="space-y-1.5">
                    <h4 className="font-sans text-lg font-bold text-zinc-900 tracking-tight leading-tight">
                      {selectedPin.title}
                    </h4>
                    <span className="text-xs text-zinc-500 flex items-center">
                      <MapPin className="h-3.5 w-3.5 text-[#E53935] mr-1" />
                      {selectedPin.location}
                    </span>
                  </div>

                  {/* Grid numbers */}
                  <div className="grid grid-cols-2 gap-4 rounded-lg bg-zinc-50 border border-zinc-100 p-4 font-mono text-xs">
                    <div>
                      <span className="block text-[10px] text-zinc-400">CAPITAL PRICE</span>
                      <span className="font-bold text-[#E53935] text-sm">${selectedPin.price.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-zinc-400">PARCEL SIZE</span>
                      <span className="font-bold text-zinc-900 text-sm">{selectedPin.acres} Acres</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-zinc-400">ZONING CLASS</span>
                      <span className="font-bold text-zinc-900">{selectedPin.zoning}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-zinc-400">TERRAIN SLOPE</span>
                      <span className="font-bold text-zinc-900">{selectedPin.slope}</span>
                    </div>
                  </div>

                  {/* Brief description */}
                  <p className="text-xs text-zinc-600 leading-relaxed line-clamp-3">
                    {selectedPin.description}
                  </p>

                </div>

                <div className="pt-4 border-t border-zinc-200 space-y-2">
                  <button
                    onClick={() => onSelectProperty(selectedPin)}
                    className="w-full rounded-lg bg-[#E53935] hover:bg-[#D32F2F] text-[#FAFAFA] font-bold text-xs uppercase py-3 tracking-widest transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <Eye className="h-4 w-4" />
                    <span>Open Private Dossier</span>
                  </button>
                  <p className="text-[10px] text-center text-zinc-400 italic">
                    Coordinates: LAT {selectedPin.coords.y}°N / LONG {selectedPin.coords.x}°W
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-zinc-500 py-12 space-y-4">
                <Compass className="h-10 w-10 text-[#E53935] animate-spin-slow" />
                <h5 className="font-bold text-zinc-900">Select a Map Plot Pin</h5>
                <p className="text-xs max-w-xs leading-relaxed">
                  Click on any coordinate pin on the vector canvas to load the localized site survey, geological data, and pricing matrices.
                </p>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
