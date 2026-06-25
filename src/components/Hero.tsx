import React from "react";
import { Search, Compass, SlidersHorizontal } from "lucide-react";
import { SearchCriteria } from "../types";

interface HeroProps {
  criteria: SearchCriteria;
  onCriteriaChange: (updater: (prev: SearchCriteria) => SearchCriteria) => void;
  onSearch: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export default function Hero({ criteria, onCriteriaChange, onSearch, onScrollToSection }: HeroProps) {
  
  const handleInputChange = (field: keyof SearchCriteria, value: any) => {
    onCriteriaChange((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const triggerSearch = () => {
    onSearch();
    onScrollToSection("buy-land");
  };

  return (
    <section 
      id="hero" 
      className="relative flex min-h-[95vh] items-center justify-center bg-white py-20 px-6 lg:px-8 overflow-hidden"
    >


      <div className="relative z-10 w-full max-w-6xl text-center space-y-10">
        


        {/* Cinematic Headline */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="font-sans text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl">
            Find the Perfect Land <br />
            <span className="bg-gradient-to-r from-zinc-900 via-[#E53935] to-[#E53935] bg-clip-text text-transparent">
              For Your Next Investment
            </span>
          </h1>
          
          <p className="font-sans text-base sm:text-lg lg:text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            Browse verified high-value land parcels, analyze zoning with professional tools, and connect directly with trusted private owners.
          </p>
        </div>

        {/* Advanced Glassmorphism Search Panel */}
        <div className="mx-auto max-w-4xl rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xl backdrop-blur-xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 text-left">
            
            {/* Field: Search Keyword / Location */}
            <div className="flex flex-col space-y-1">
              <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#E53935]">
                Search Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Napa Valley, Malibu..."
                  value={criteria.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  className="w-full bg-transparent py-2.5 text-sm text-zinc-900 placeholder-zinc-300 focus:outline-none border-b border-zinc-200 focus:border-[#E53935] transition-colors"
                />
              </div>
            </div>

            {/* Field: Category */}
            <div className="flex flex-col space-y-1">
              <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#E53935]">
                Property Type
              </label>
              <select
                value={criteria.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className="w-full bg-transparent py-2.5 text-sm text-zinc-900 focus:outline-none border-b border-zinc-200 focus:border-[#E53935] cursor-pointer"
              >
                <option value="All" className="bg-white text-zinc-900">All Categories</option>
                <option value="Viticulture" className="bg-white text-zinc-900">Viticulture (Vineyards)</option>
                <option value="Legacy Estate" className="bg-white text-zinc-900">Legacy Estates</option>
                <option value="Residential" className="bg-white text-zinc-900">Residential Parcels</option>
                <option value="Agricultural" className="bg-white text-zinc-900">Agricultural Acreage</option>
                <option value="Commercial" className="bg-white text-zinc-900">Commercial Zoning</option>
              </select>
            </div>

            {/* Field: Land Size (Acres) */}
            <div className="flex flex-col space-y-1">
              <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#E53935]">
                Min Acreage
              </label>
              <select
                value={criteria.minAcres}
                onChange={(e) => handleInputChange("minAcres", Number(e.target.value))}
                className="w-full bg-transparent py-2.5 text-sm text-zinc-900 focus:outline-none border-b border-zinc-200 focus:border-[#E53935] cursor-pointer"
              >
                <option value={0} className="bg-white text-zinc-900">No Min Size</option>
                <option value={10} className="bg-white text-zinc-900">10+ Acres</option>
                <option value={30} className="bg-white text-zinc-900">30+ Acres</option>
                <option value={50} className="bg-white text-zinc-900">50+ Acres</option>
                <option value={80} className="bg-white text-zinc-900">80+ Acres</option>
              </select>
            </div>

            {/* Field: Max Budget */}
            <div className="flex flex-col space-y-1">
              <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#E53935]">
                Max Price
              </label>
              <select
                value={criteria.maxPrice}
                onChange={(e) => handleInputChange("maxPrice", Number(e.target.value))}
                className="w-full bg-transparent py-2.5 text-sm text-zinc-900 focus:outline-none border-b border-zinc-200 focus:border-[#E53935] cursor-pointer"
              >
                <option value={25000000} className="bg-white text-zinc-900">No Max Price</option>
                <option value={5000000} className="bg-white text-zinc-900">$5,000,000</option>
                <option value={8000000} className="bg-white text-zinc-900">$8,000,000</option>
                <option value={12000000} className="bg-white text-zinc-900">$12,000,000</option>
                <option value={15000000} className="bg-white text-zinc-900">$15,000,000</option>
              </select>
            </div>

          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-zinc-150 gap-4">
            {/* Toggle Verified */}
            <label className="flex items-center space-x-2.5 cursor-pointer text-xs font-semibold text-zinc-500 hover:text-zinc-800 transition-colors">
              <input
                type="checkbox"
                checked={criteria.onlyVerified}
                onChange={(e) => handleInputChange("onlyVerified", e.target.checked)}
                className="h-4.5 w-4.5 rounded border-zinc-200 bg-zinc-50 text-[#E53935] focus:ring-0 cursor-pointer accent-[#E53935]"
              />
              <span>Show Aura-Verified Escrow Listings Only</span>
            </label>

            {/* Submit Action */}
            <button
              onClick={triggerSearch}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-lg bg-[#E53935] px-8 py-3.5 text-sm font-bold tracking-widest text-white uppercase transition-all hover:bg-[#D32F2F] hover:shadow-[0_0_15px_rgba(229,57,53,0.2)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <Search className="h-4 w-4" />
              <span>Acquire Listings</span>
            </button>
          </div>
        </div>

        {/* Bottom CTA & Trust Stats */}
        <div className="flex flex-col items-center space-y-6 pt-4">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onScrollToSection("buy-land")}
              className="rounded-md border border-[#E53935] bg-transparent px-8 py-3 text-sm font-bold tracking-widest text-[#E53935] uppercase hover:bg-[#E53935] hover:text-white transition-all animate-none"
            >
              Examine Portfolios
            </button>
            <button
              onClick={() => onScrollToSection("sell-land")}
              className="rounded-md border border-zinc-200 bg-zinc-100/80 px-8 py-3 text-sm font-bold tracking-widest text-zinc-600 uppercase hover:border-zinc-400 hover:text-zinc-900 transition-all"
            >
              Sell Legacy Land
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-2 sm:flex sm:space-x-16 pt-8 font-mono border-t border-zinc-200 w-full justify-center">
            <div className="text-center sm:text-left">
              <span className="block text-2xl sm:text-3xl font-bold text-zinc-900">$2.4B+</span>
              <span className="text-[10px] tracking-wider text-zinc-500 uppercase">Assets Transacted</span>
            </div>
            <div className="text-center sm:text-left">
              <span className="block text-2xl sm:text-3xl font-bold text-[#E53935]">100%</span>
              <span className="text-[10px] tracking-wider text-zinc-500 uppercase">Zoning Audited</span>
            </div>
            <div className="text-center sm:text-left">
              <span className="block text-2xl sm:text-3xl font-bold text-[#E53935]">48hr</span>
              <span className="text-[10px] tracking-wider text-zinc-500 uppercase">Lead Response</span>
            </div>
            <div className="text-center sm:text-left">
              <span className="block text-2xl sm:text-3xl font-bold text-zinc-900">35k+</span>
              <span className="text-[10px] tracking-wider text-zinc-500 uppercase">Institutional Members</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
