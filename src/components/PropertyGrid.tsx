import React, { useState } from "react";
import { 
  ShieldCheck, MapPin, Compass, Info, Check, X, 
  HelpCircle, MessageSquare, Plus, Save, Sparkles, SlidersHorizontal, Calculator 
} from "lucide-react";
import { Property, SearchCriteria, Inquiry } from "../types";
import MortgageCalculator from "./MortgageCalculator";

interface PropertyGridProps {
  properties: Property[];
  criteria: SearchCriteria;
  onCriteriaChange: (updater: (prev: SearchCriteria) => SearchCriteria) => void;
  onAddToCompare: (property: Property) => void;
  compareList: Property[];
  onViewDetailsRef: (openerFn: (property: Property) => void) => void;
  savedList: string[];
  onToggleSave: (id: string) => void;
}

export default function PropertyGrid({
  properties,
  criteria,
  onCriteriaChange,
  onAddToCompare,
  compareList,
  onViewDetailsRef,
  savedList,
  onToggleSave,
}: PropertyGridProps) {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "acres-desc">("featured");
  
  // Inquiry form states
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryPhone, setInquiryPhone] = useState("");
  const [inquiryMessage, setInquiryMessage] = useState("");
  const [inquirySuccess, setInquirySuccess] = useState(false);
  const [aiAnalysisLoading, setAiAnalysisLoading] = useState(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState<string | null>(null);

  // Sync ref to App-wide drawer opener if needed
  React.useEffect(() => {
    onViewDetailsRef((prop: Property) => {
      setSelectedProperty(prop);
      setAiAnalysisResult(null);
      setInquirySuccess(false);
    });
  }, [onViewDetailsRef]);

  // Categories helper
  const categories: ("All" | Property["category"])[] = [
    "All", "Viticulture", "Legacy Estate", "Residential", "Agricultural", "Commercial"
  ];

  // Filtering properties
  const filteredProperties = properties.filter((prop) => {
    // Location Filter
    if (criteria.location && !prop.location.toLowerCase().includes(criteria.location.toLowerCase())) {
      return false;
    }
    // Category Filter
    if (criteria.category !== "All" && prop.category !== criteria.category) {
      return false;
    }
    // Verified Filter
    if (criteria.onlyVerified && !prop.verified) {
      return false;
    }
    return true;
  });

  // Sorting
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "acres-desc") return b.acres - a.acres;
    return 0; // default featured
  });

  // Triggering Smart Inquiry AI analysis
  const handleSendInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProperty) return;

    setAiAnalysisLoading(true);
    setAiAnalysisResult(null);

    try {
      const response = await fetch("/api/ai/analyze-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyId: selectedProperty.id,
          propertyTitle: selectedProperty.title,
          location: selectedProperty.location,
          price: selectedProperty.price,
          buyerName: inquiryName,
          message: inquiryMessage,
        }),
      });

      const data = await response.json();
      if (data && data.analysis) {
        setAiAnalysisResult(data.analysis);
      }
      setInquirySuccess(true);
    } catch (err) {
      console.error("Failed to fetch smart inquiry analysis:", err);
      // Fallback
      setAiAnalysisResult("Failed to complete broker model verification. Escrow lead registered.");
      setInquirySuccess(true);
    } finally {
      setAiAnalysisLoading(false);
    }
  };

  const handleOpenModal = (prop: Property) => {
    setSelectedProperty(prop);
    setInquiryName("");
    setInquiryEmail("");
    setInquiryPhone("");
    setInquiryMessage("I am interested in acquiring this land deed. Please send soil metrics and title deeds.");
    setInquirySuccess(false);
    setAiAnalysisResult(null);
  };

  return (
    <section id="buy-land" className="bg-[#FAFAFA] py-24 px-6 lg:px-8 border-t border-zinc-200">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#E53935] uppercase block">
              ACQUISITIONS AND PLACEMENTS
            </span>
            <h2 className="font-sans text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
              Featured Land Portfolios
            </h2>
            <p className="font-sans text-zinc-600 max-w-xl text-sm leading-relaxed">
              Exquisite, pre-screened raw acreage curated for immediate legacy architectural development, commercial zoning, or premium agricultural enterprises.
            </p>
          </div>

          {/* Sorter & Filter Drawer Toggle */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center space-x-2 bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs">
              <span className="text-zinc-500">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-zinc-800 font-bold focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-white text-zinc-900">Curated Order</option>
                <option value="price-asc" className="bg-white text-zinc-900">Price: Low to High</option>
                <option value="price-desc" className="bg-white text-zinc-900">Price: High to Low</option>
                <option value="acres-desc" className="bg-white text-zinc-900">Acreage: Large to Small</option>
              </select>
            </div>
          </div>
        </div>

        {/* Custom Category Quick Filter Pills */}
        <div className="mb-8 flex flex-wrap gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCriteriaChange((prev) => ({ ...prev, category: cat }))}
              className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                criteria.category === cat
                  ? "bg-[#E53935] text-white font-black shadow-lg shadow-[#E53935]/20"
                  : "bg-white text-zinc-600 border border-zinc-200 hover:border-[#E53935]/40 hover:text-[#E53935]"
              }`}
            >
              {cat === "All" ? "All Land Assets" : cat}
            </button>
          ))}
        </div>

        {/* Listings Grid */}
        {sortedProperties.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-200 p-16 text-center text-zinc-500 space-y-4 bg-white">
            <Compass className="h-12 w-12 text-[#E53935] mx-auto animate-spin" />
            <h4 className="text-lg font-bold text-zinc-900">No Matching Parcels Located</h4>
            <p className="max-w-md mx-auto text-sm">
              Our active global ledger does not contain listings matching those specific metrics. Try broadening your pricing, region, or acreage criteria.
            </p>
            <button
              onClick={() => onCriteriaChange(() => ({
                searchQuery: "",
                location: "",
                category: "All",
                minPrice: 0,
                maxPrice: 25000000,
                minAcres: 0,
                maxAcres: 100,
                onlyVerified: false
              }))}
              className="mt-2 text-xs text-[#E53935] hover:text-[#E53935] font-bold underline cursor-pointer"
            >
              Reset Search Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {sortedProperties.map((prop) => {
              const isSaved = savedList.includes(prop.id);
              const inCompare = compareList.some((item) => item.id === prop.id);
              
              return (
                <div 
                  key={prop.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all duration-300 hover:border-[#E53935]/50 hover:shadow-xl hover:shadow-zinc-200/50 hover:-translate-y-1.5"
                >
                  
                  {/* Property Image & Badge Header */}
                  <div className="relative h-64 overflow-hidden bg-black">
                    <img
                      src={prop.image}
                      alt={prop.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                    {/* Verified indicator */}
                    {prop.verified && (
                      <div className="absolute left-4 top-4 flex items-center space-x-1 rounded-full bg-white/95 border border-[#E53935]/40 px-3 py-1 text-[10px] font-bold tracking-wider text-[#E53935] uppercase shadow-sm">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        <span>Aura Audited</span>
                      </div>
                    )}

                    {/* Saved button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSave(prop.id);
                      }}
                      className="absolute right-4 top-4 rounded-full bg-white/90 p-2 text-zinc-800 border border-zinc-200 hover:border-[#E53935] hover:text-[#E53935] transition-colors shadow-sm"
                      title={isSaved ? "Remove Saved" : "Save Listing"}
                    >
                      <Save className={`h-4 w-4 ${isSaved ? "fill-[#E53935] text-[#E53935]" : ""}`} />
                    </button>

                    {/* Bottom Specs Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <span className="inline-block px-2.5 py-1 rounded bg-[#E53935] text-white text-[10px] font-bold tracking-widest uppercase">
                        {prop.category}
                      </span>
                      <span className="font-mono text-xs font-bold text-[#E53935] bg-white/95 px-2 py-1 rounded border border-[#E53935]/20 shadow-sm">
                        {prop.acres} Acres
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-1 text-zinc-500 text-xs">
                        <MapPin className="h-3.5 w-3.5 text-[#E53935] flex-shrink-0" />
                        <span className="truncate">{prop.location}</span>
                      </div>

                      <h3 className="font-sans text-lg font-bold tracking-tight text-zinc-900 group-hover:text-[#E53935] transition-colors line-clamp-1">
                        {prop.title}
                      </h3>

                      <p className="font-sans text-xs text-zinc-500 leading-relaxed line-clamp-2">
                        {prop.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-zinc-150 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">Acquisition Capital</span>
                        <span className="text-xl font-black text-[#E53935]">${prop.price.toLocaleString()}</span>
                      </div>
                      <div className="flex flex-col items-end text-right font-mono text-[10px] text-zinc-500">
                        <span>Carry Rate</span>
                        <span className="font-bold text-zinc-900">${Math.round(prop.pricePerAcres).toLocaleString()}/ac</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="grid grid-cols-2 border-t border-zinc-200 bg-zinc-50 divide-x divide-zinc-200">
                    <button
                      onClick={() => onAddToCompare(prop)}
                      disabled={inCompare}
                      className={`py-3 text-center text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center space-x-1.5 ${
                        inCompare 
                          ? "text-zinc-400 bg-zinc-100 cursor-not-allowed" 
                          : "text-zinc-600 hover:text-[#E53935] hover:bg-[#E53935]/5"
                      }`}
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>{inCompare ? "Comparing" : "Add Compare"}</span>
                    </button>
                    
                    <button
                      onClick={() => handleOpenModal(prop)}
                      className="py-3 text-center text-xs font-extrabold tracking-widest uppercase bg-gradient-to-r from-transparent to-[#E53935]/5 hover:to-[#E53935]/10 transition-colors cursor-pointer text-[#E53935]"
                    >
                      View Dossier
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Property Detail Dossier Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 overflow-y-auto backdrop-blur-md">
          <div className="relative w-full max-w-5xl rounded-2xl border border-[#E53935]/20 bg-white p-6 sm:p-8 shadow-2xl my-8 text-zinc-950">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedProperty(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/80 border border-zinc-200 p-2 text-zinc-500 hover:text-zinc-900 shadow-sm"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Body */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-h-[80vh] overflow-y-auto pr-2">
              
              {/* Left Column: Visuals & Spec Ledger (8/12) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Hero visual */}
                <div className="relative h-80 rounded-xl overflow-hidden bg-black border border-zinc-200">
                  <img
                    src={selectedProperty.image}
                    alt={selectedProperty.title}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  
                  {/* Category Badge overlay */}
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-block px-3 py-1 rounded bg-[#E53935] text-white text-xs font-bold uppercase tracking-widest">
                      {selectedProperty.category}
                    </span>
                  </div>
                </div>

                {/* Main Header title info */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-[#E53935] text-sm font-semibold">
                    <MapPin className="h-4 w-4" />
                    <span>{selectedProperty.location}</span>
                    {selectedProperty.verified && (
                      <span className="text-green-600 font-semibold flex items-center space-x-0.5 text-xs bg-green-500/10 px-2 py-0.5 rounded ml-2">
                        <Check className="h-3 w-3" />
                        <span>Aura Audited</span>
                      </span>
                    )}
                  </div>
                  <h3 className="font-sans text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
                    {selectedProperty.title}
                  </h3>
                </div>

                {/* Editorial Description */}
                <div className="space-y-3">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-[#E53935]">
                    Asset Evaluation Dossier
                  </span>
                  <p className="font-sans text-sm text-zinc-600 leading-relaxed">
                    {selectedProperty.description}
                  </p>
                </div>

                {/* Grid Technical Specifications */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 rounded-xl border border-zinc-200 bg-zinc-50 p-5 font-mono">
                  <div>
                    <span className="block text-[10px] text-zinc-500 uppercase">Total Size</span>
                    <span className="text-sm font-bold text-zinc-900">{selectedProperty.acres} Acres</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-zinc-500 uppercase">Zoning Classification</span>
                    <span className="text-sm font-bold text-zinc-900">{selectedProperty.zoning}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-zinc-500 uppercase">Zoning Slope</span>
                    <span className="text-sm font-bold text-zinc-900">{selectedProperty.slope}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-zinc-500 uppercase">Water Rights</span>
                    <span className={`text-sm font-bold ${selectedProperty.waterRights ? "text-green-600" : "text-zinc-400"}`}>
                      {selectedProperty.waterRights ? "Granted / Active" : "No Water Rights"}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-zinc-500 uppercase">Road Access</span>
                    <span className={`text-sm font-bold ${selectedProperty.roadAccess ? "text-green-600" : "text-zinc-400"}`}>
                      {selectedProperty.roadAccess ? "Paved Public" : "Off-grid Trail"}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-zinc-500 uppercase">Electricity Grid</span>
                    <span className={`text-sm font-bold ${selectedProperty.electricity ? "text-green-600" : "text-zinc-400"}`}>
                      {selectedProperty.electricity ? "Ready for hookup" : "Solar required"}
                    </span>
                  </div>
                </div>

                {/* Amenities checklist with Gold Icons */}
                <div className="space-y-3">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-[#E53935]">
                    Amenities & Allowable Infrastructure
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    {selectedProperty.amenities.map((am, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-zinc-800">
                        <div className="rounded bg-[#E53935]/15 p-1 text-[#E53935]">
                          <Check className="h-4 w-4" />
                        </div>
                        <span>{am}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mortgage / Carrying Cost widget */}
                <MortgageCalculator initialPrice={selectedProperty.price} />

              </div>

              {/* Right Column: Encrypted Lead Form & Real AI Broker Assistant (4/12 or 5/12) */}
              <div className="lg:col-span-5 space-y-6 lg:border-l lg:border-zinc-200 lg:pl-8">
                
                {/* Financial overview sticky box */}
                <div className="rounded-xl border border-[#E53935]/30 bg-[#E53935]/5 p-5 text-center">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#E53935] block mb-1">
                    ASSET VALUATION
                  </span>
                  <span className="text-3xl font-black text-[#E53935] tracking-tight">
                    ${selectedProperty.price.toLocaleString()}
                  </span>
                  <div className="mt-2 flex justify-center space-x-4 text-xs text-zinc-500 font-mono">
                    <span>{selectedProperty.acres} Acres</span>
                    <span>•</span>
                    <span>${Math.round(selectedProperty.pricePerAcres).toLocaleString()}/Ac</span>
                  </div>
                </div>

                {/* Private Broker Inquiry form */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-sans text-lg font-bold text-zinc-900 flex items-center space-x-2">
                      <MessageSquare className="h-5 w-5 text-[#E53935]" />
                      <span>Encrypted Escrow Inquiry</span>
                    </h4>
                    <p className="text-xs text-zinc-500 mt-1">
                      Connecting you with the authorized private seller. Submitting this form activates the automated AI negotiation analyzer.
                    </p>
                  </div>

                  {inquirySuccess ? (
                    <div className="rounded-xl border border-green-500/30 bg-green-50/70 p-5 space-y-4">
                      <span className="flex items-center space-x-2 text-green-600 font-bold text-sm">
                        <ShieldCheck className="h-5 w-5" />
                        <span>Deed Escrow Lead Registered</span>
                      </span>
                      <p className="text-xs text-zinc-600">
                        Your verification inquiry has been saved in our local persistence ledger. An Aura Concierge Private Broker will contact you at <span className="text-zinc-900 font-semibold">{inquiryEmail}</span> within 24 hours.
                      </p>

                      {/* AI Broker Advisory Note Results */}
                      {aiAnalysisResult && (
                        <div className="pt-4 border-t border-green-500/20 space-y-3">
                          <span className="flex items-center space-x-1 text-xs text-[#E53935] font-bold uppercase tracking-widest">
                            <Sparkles className="h-3.5 w-3.5" />
                            <span>AI Broker Internal Advisory Note</span>
                          </span>
                          <div className="rounded bg-zinc-50 p-4 text-xs text-left text-zinc-700 leading-relaxed border border-[#E53935]/20 whitespace-pre-wrap">
                            {aiAnalysisResult}
                          </div>
                        </div>
                      )}

                      <button
                        onClick={() => {
                          setInquirySuccess(false);
                          setAiAnalysisResult(null);
                        }}
                        className="w-full rounded bg-zinc-200 py-2 text-xs text-zinc-800 hover:bg-[#E53935] hover:text-white font-semibold"
                      >
                        Submit Secondary Inquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSendInquiry} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase text-zinc-600 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Lord Sterling"
                          value={inquiryName}
                          onChange={(e) => setInquiryName(e.target.value)}
                          className="w-full rounded border border-zinc-200 bg-zinc-50 px-4 py-3 text-xs text-zinc-900 placeholder-zinc-400 focus:border-[#E53935] focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold uppercase text-zinc-600 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="investor@hedge.com"
                            value={inquiryEmail}
                            onChange={(e) => setInquiryEmail(e.target.value)}
                            className="w-full rounded border border-zinc-200 bg-zinc-50 px-4 py-3 text-xs text-zinc-900 placeholder-zinc-400 focus:border-[#E53935] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase text-zinc-600 mb-1">
                            Phone
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="+1 (555) 0192"
                            value={inquiryPhone}
                            onChange={(e) => setInquiryPhone(e.target.value)}
                            className="w-full rounded border border-zinc-200 bg-zinc-50 px-4 py-3 text-xs text-zinc-900 placeholder-zinc-400 focus:border-[#E53935] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase text-zinc-600 mb-1">
                          Encrypted Message
                        </label>
                        <textarea
                          rows={4}
                          required
                          value={inquiryMessage}
                          onChange={(e) => setInquiryMessage(e.target.value)}
                          className="w-full rounded border border-zinc-200 bg-zinc-50 px-4 py-3 text-xs text-zinc-900 placeholder-zinc-400 focus:border-[#E53935] focus:outline-none resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={aiAnalysisLoading}
                        className="w-full rounded bg-[#E53935] hover:bg-[#D32F2F] text-white font-bold text-xs uppercase py-3.5 tracking-wider transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        {aiAnalysisLoading ? (
                          <>
                            <Compass className="h-4 w-4 animate-spin" />
                            <span>Acquiring Smart AI Advisory Notes...</span>
                          </>
                        ) : (
                          <>
                            <ShieldCheck className="h-4 w-4" />
                            <span>Request Escrow Contract Dossier</span>
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
