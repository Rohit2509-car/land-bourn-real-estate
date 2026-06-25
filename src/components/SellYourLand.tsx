import React, { useState } from "react";
import { Upload, Coins, Check, Compass, HelpCircle, ShieldAlert, FileText, Landmark } from "lucide-react";
import { Property } from "../types";

interface SellYourLandProps {
  onAddProperty: (property: Property) => void;
  onScrollToSection: (sectionId: string) => void;
}

export default function SellYourLand({ onAddProperty, onScrollToSection }: SellYourLandProps) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [acres, setAcres] = useState("");
  const [category, setCategory] = useState<Property["category"]>("Residential");
  const [slope, setSlope] = useState<Property["slope"]>("Flat");
  const [description, setDescription] = useState("");
  const [region, setRegion] = useState<Property["region"]>("West Coast");
  const [zoning, setZoning] = useState("R1 (Residential)");
  
  // checkbox amenities
  const [waterRights, setWaterRights] = useState(true);
  const [roadAccess, setRoadAccess] = useState(true);
  const [electricity, setElectricity] = useState(true);

  const [formSuccess, setFormSuccess] = useState(false);
  const [consultationSuccess, setConsultationSuccess] = useState(false);

  const handleRegisterProperty = (e: React.FormEvent) => {
    e.preventDefault();

    const priceNum = Number(price);
    const acresNum = Number(acres);

    if (isNaN(priceNum) || isNaN(acresNum) || priceNum <= 0 || acresNum <= 0) {
      alert("Please provide valid numbers for price and acreage.");
      return;
    }

    // Curate beautiful stock background depending on the category selected
    let image = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80";
    if (category === "Viticulture") {
      image = "https://images.unsplash.com/photo-1444858291040-58fe7d05327e?auto=format&fit=crop&w=1200&q=80";
    } else if (category === "Legacy Estate") {
      image = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80";
    } else if (category === "Commercial") {
      image = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80";
    }

    const newProperty: Property = {
      id: `custom-prop-${Date.now()}`,
      title,
      location,
      region,
      price: priceNum,
      acres: acresNum,
      pricePerAcres: Math.round(priceNum / acresNum),
      category,
      slope,
      description: description || `Premium high-value listed asset situated in the elite ${location} region, featuring excellent sun orientations and mineral-dense soil arrays. Fully deed audited.`,
      image,
      verified: true, // Auto-verified for instant visual feedback on our elegant landing!
      amenities: [
        waterRights ? "Spring Water Rights" : "No Water Rights",
        roadAccess ? "Paved Highway Access" : "Off-grid Dirt Road",
        electricity ? "High-capacity Grid Lines" : "Requires Solar Array",
        "Assigned Land Broker Partner",
        "Geological Soils Clear Certificate"
      ],
      zoning,
      coords: { x: 30 + Math.random() * 40, y: 30 + Math.random() * 40 }, // Place in a central region on the interactive map
      waterRights,
      roadAccess,
      electricity
    };

    onAddProperty(newProperty);
    setFormSuccess(true);
    
    // Clear inputs
    setTitle("");
    setLocation("");
    setPrice("");
    setAcres("");
    setDescription("");
  };

  return (
    <section id="sell-land" className="bg-[#FAFAFA] py-24 px-6 lg:px-8 border-t border-zinc-200 relative overflow-hidden">
      
      {/* Visual background lights */}
      <div className="absolute left-1/3 bottom-0 h-96 w-96 rounded-full bg-[#E53935]/5 blur-[120px] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copywriting & Value Propositions (5/12) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#E53935] uppercase block">
                GLOBAL ASSET LIQUIDATION
              </span>
              <h2 className="font-sans text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
                Reach Thousands of Serious Land Buyers
              </h2>
              <p className="font-sans text-sm text-zinc-600 leading-relaxed">
                Connect your prime land holdings directly with institutional asset management desks, luxury estate developers, family offices, and verified global private equity partners. 
              </p>
            </div>

            {/* Three key stats metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-zinc-200">
              <div className="flex items-start space-x-3">
                <div className="rounded bg-[#E53935]/15 p-2 text-[#E53935] mt-1">
                  <Coins className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-sans text-sm font-bold text-zinc-900">0% Upfront Listing</h4>
                  <p className="text-xs text-zinc-500 mt-0.5">List and market your acreage globally with zero listing placement fees.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="rounded bg-[#E53935]/15 p-2 text-[#E53935] mt-1">
                  <Landmark className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-sans text-sm font-bold text-zinc-900">14-Day Escrow Escort</h4>
                  <p className="text-xs text-zinc-500 mt-0.5">Secure buyer deposit verifications within our high-speed closing protocol.</p>
                </div>
              </div>
            </div>

            {/* Consultation Lead form */}
            <div className="rounded-xl border border-zinc-200 bg-white p-6 space-y-4 shadow-sm">
              <h4 className="font-sans text-sm font-bold text-zinc-950 flex items-center space-x-1.5">
                <FileText className="h-4.5 w-4.5 text-[#E53935]" />
                <span>Arrange Free Private Consultation</span>
              </h4>
              <p className="text-xs text-zinc-500">
                Request an analytical broker valuation for your legacy land parcels under full non-disclosure confidentiality covenants.
              </p>

              {consultationSuccess ? (
                <div className="rounded border border-green-500/20 bg-green-50 p-3.5 text-xs text-green-700 font-semibold flex items-center space-x-2">
                  <Check className="h-4 w-4" />
                  <span>Success! A Land Bourn Managing Director will call you shortly.</span>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="tel"
                    required
                    placeholder="Enter Private Mobile Number"
                    className="flex-grow rounded-md border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-xs text-zinc-900 focus:border-[#E53935] focus:outline-none placeholder-zinc-300"
                  />
                  <button
                    onClick={() => setConsultationSuccess(true)}
                    className="rounded-md bg-[#E53935] hover:bg-[#D32F2F] text-white font-bold text-xs uppercase px-5 py-2.5 tracking-wider transition-colors cursor-pointer"
                  >
                    Request Valuation
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Stateful Interactive Listing Form (7/12) */}
          <div id="sell-form-container" className="lg:col-span-7">
            <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-xl relative">
              
              <div className="mb-6">
                <span className="inline-flex items-center space-x-1.5 rounded-full bg-[#E53935]/15 px-3 py-1 text-xs font-bold text-[#E53935]">
                  <Upload className="h-3.5 w-3.5" />
                  <span>Deed Placement Portal</span>
                </span>
                <h3 className="font-sans text-xl font-bold text-zinc-900 mt-2 tracking-tight">
                  List Your Land Asset Instantly
                </h3>
              </div>

              {formSuccess ? (
                <div className="text-center py-12 space-y-6">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10 border border-green-500/30 text-green-500">
                    <Check className="h-7 w-7" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-sans text-lg font-bold text-zinc-900">Asset Registered & Verified Live</h4>
                    <p className="text-xs text-zinc-500 max-w-md mx-auto leading-relaxed">
                      Your parcel has been synthesized and appended to the main database ledger. You can now examine your property, compare carrying metrics, or trigger map plots instantly!
                    </p>
                  </div>
                  <div className="flex justify-center space-x-3 pt-2">
                    <button
                      onClick={() => {
                        setFormSuccess(false);
                        onScrollToSection("buy-land");
                      }}
                      className="rounded-md bg-[#E53935] text-white font-bold text-xs uppercase tracking-wider px-6 py-3 transition-colors hover:bg-opacity-90"
                    >
                      Examine in Grid
                    </button>
                    <button
                      onClick={() => setFormSuccess(false)}
                      className="rounded-md border border-zinc-200 text-zinc-700 text-xs uppercase tracking-wider px-6 py-3 transition-colors hover:border-[#E53935] hover:text-[#E53935]"
                    >
                      List Another Parcel
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleRegisterProperty} className="space-y-4">
                  
                  {/* Name of the parcel */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 mb-1">
                      Parcel Trademark Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Napa Valley Crest Ridge Reserve"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full rounded-md border border-zinc-200 bg-zinc-50 px-4 py-3 text-xs text-zinc-900 placeholder-zinc-300 focus:border-[#E53935] focus:outline-none"
                    />
                  </div>

                  {/* Location and Region */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 mb-1">
                        Specific Location
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sonoma Bench, CA"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full rounded-md border border-zinc-200 bg-zinc-50 px-4 py-3 text-xs text-zinc-900 placeholder-zinc-300 focus:border-[#E53935] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 mb-1">
                        Sub-Region
                      </label>
                      <select
                        value={region}
                        onChange={(e) => setRegion(e.target.value as any)}
                        className="w-full rounded-md border border-zinc-200 bg-zinc-50 px-4 py-3 text-xs text-zinc-900 focus:border-[#E53935] focus:outline-none cursor-pointer"
                      >
                        <option value="West Coast">West Coast (Napa/Malibu/Sonoma)</option>
                        <option value="Mountain West">Mountain West (Aspen/Vail/Jackson)</option>
                        <option value="Tropical">Tropical Islands (Hawaii/Kauai)</option>
                        <option value="European">European Countryside (Tuscany/Swiss)</option>
                        <option value="East Coast">East Coast (Hamptons/Maine)</option>
                      </select>
                    </div>
                  </div>

                  {/* Ask Price and Acreage */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 mb-1">
                        Asking Price (USD Capital)
                      </label>
                      <input
                        type="number"
                        required
                        min="100000"
                        placeholder="e.g. 4500000"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full rounded-md border border-zinc-200 bg-zinc-50 px-4 py-3 text-xs text-zinc-900 placeholder-zinc-300 focus:border-[#E53935] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 mb-1">
                        Total Acres
                      </label>
                      <input
                        type="number"
                        required
                        min="1"
                        step="0.1"
                        placeholder="e.g. 25.5"
                        value={acres}
                        onChange={(e) => setAcres(e.target.value)}
                        className="w-full rounded-md border border-zinc-200 bg-zinc-50 px-4 py-3 text-xs text-zinc-900 placeholder-zinc-300 focus:border-[#E53935] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Category and Zoning */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 mb-1">
                        Zoning Designation
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. AP-40 (Agricultural Preserve)"
                        value={zoning}
                        onChange={(e) => setZoning(e.target.value)}
                        className="w-full rounded-md border border-zinc-200 bg-zinc-50 px-4 py-3 text-xs text-zinc-900 placeholder-zinc-300 focus:border-[#E53935] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 mb-1">
                        Land Asset Genre
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as any)}
                        className="w-full rounded-md border border-zinc-200 bg-zinc-50 px-4 py-3 text-xs text-zinc-900 focus:border-[#E53935] focus:outline-none cursor-pointer"
                      >
                        <option value="Residential">Residential Development</option>
                        <option value="Legacy Estate">Legacy Estate Peninsula</option>
                        <option value="Viticulture">Viticulture (Vineyards)</option>
                        <option value="Agricultural">Agricultural Wilderness</option>
                        <option value="Commercial">Commercial Zoning</option>
                      </select>
                    </div>
                  </div>

                  {/* Slope and Infrastructure options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-2">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 mb-1">
                        Slope Topography
                      </label>
                      <div className="grid grid-cols-4 gap-1">
                        {(["Flat", "Gentle", "Sloped", "Terraced"] as Property["slope"][]).map((sl) => (
                          <button
                            key={sl}
                            type="button"
                            onClick={() => setSlope(sl)}
                            className={`rounded py-2 text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                              slope === sl
                                ? "bg-[#E53935] text-white"
                                : "bg-zinc-100 text-zinc-600 border border-zinc-200 hover:bg-zinc-200"
                            }`}
                          >
                            {sl}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600">
                        Active Infrastructure Grid
                      </label>
                      <div className="flex flex-wrap gap-4 text-xs font-medium text-zinc-500">
                        <label className="flex items-center space-x-1.5 cursor-pointer hover:text-zinc-900">
                          <input
                            type="checkbox"
                            checked={waterRights}
                            onChange={(e) => setWaterRights(e.target.checked)}
                            className="h-4 w-4 accent-[#E53935] cursor-pointer"
                          />
                          <span>Water Rights</span>
                        </label>
                        <label className="flex items-center space-x-1.5 cursor-pointer hover:text-zinc-900">
                          <input
                            type="checkbox"
                            checked={roadAccess}
                            onChange={(e) => setRoadAccess(e.target.checked)}
                            className="h-4 w-4 accent-[#E53935] cursor-pointer"
                          />
                          <span>Paved Access</span>
                        </label>
                        <label className="flex items-center space-x-1.5 cursor-pointer hover:text-zinc-900">
                          <input
                            type="checkbox"
                            checked={electricity}
                            onChange={(e) => setElectricity(e.target.checked)}
                            className="h-4 w-4 accent-[#E53935] cursor-pointer"
                          />
                          <span>Electricity Grid</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Description text area */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 mb-1">
                      Legal Parcel Description
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Explain the water availability, subdivision possibilities, historic trees, and soil values of the parcel..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full rounded-md border border-zinc-200 bg-zinc-50 px-4 py-3 text-xs text-zinc-900 placeholder-zinc-300 focus:border-[#E53935] focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-md bg-[#E53935] hover:bg-[#D32F2F] text-white font-extrabold text-xs uppercase py-4 tracking-[0.2em] shadow-lg hover:shadow-[0_0_15px_rgba(229,57,53,0.2)] transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Compass className="h-4 w-4 animate-spin-slow" />
                    <span>Publish Asset to Ledger</span>
                  </button>

                  <div className="flex items-start space-x-2 text-[10px] text-zinc-500 text-center justify-center">
                    <ShieldAlert className="h-3.5 w-3.5 text-[#E53935] flex-shrink-0" />
                    <span>Publishing appends the parcel instantly to your local active state. No upfront commercial brokerage fees are due.</span>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
