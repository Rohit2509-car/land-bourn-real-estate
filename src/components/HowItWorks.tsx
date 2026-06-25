import React, { useState } from "react";
import { Search, SlidersHorizontal, MessageSquare, Calendar, CreditCard, Upload, LayoutList, Bell, Shield, Coins } from "lucide-react";

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState<"buyers" | "sellers">("buyers");

  const buyerSteps = [
    {
      icon: Search,
      title: "1. Advanced Global Search",
      desc: "Use our advanced multi-variable search and filters to locate premium parcels across elite regions, including specific zoning classes."
    },
    {
      icon: SlidersHorizontal,
      title: "2. Compare Side-by-Side",
      desc: "Add promising parcels to your private compare ledger. Review pricing, soil slope, utilities, and carrying rates side-by-side."
    },
    {
      icon: MessageSquare,
      title: "3. Direct Broker Contact",
      desc: "Submit an encrypted inquiry form. Instant server AI analysis provides you with custom regional negotiation insights."
    },
    {
      icon: Calendar,
      title: "4. Schedule Site Surveys",
      desc: "Arrange in-person guided inspections, multi-spectral drone mapping, and local water well audits with assigned surveyors."
    },
    {
      icon: CreditCard,
      title: "5. Safe Escrow Acquisition",
      desc: "Finalize land contracts and close the deed transfers securely with our premier third-party escrow and title partners."
    }
  ];

  const sellerSteps = [
    {
      icon: Upload,
      title: "1. Create Premium Listing",
      desc: "Input your parcel coordinates, legal APN number, and set your premium asking price. Our system automatically structures the listing."
    },
    {
      icon: LayoutList,
      title: "2. Verify Title & Zoning",
      desc: "Upload land surveys or deed histories. Our title attorneys audit boundaries to award your asset the coveted verified badge."
    },
    {
      icon: Bell,
      title: "3. Acquire Verified Leads",
      desc: "Receive encrypted lead alerts directly from verified high-net-worth individuals, estate developers, or private equity desks."
    },
    {
      icon: Shield,
      title: "4. Direct Deal Negotiator",
      desc: "Coordinate soil core test data and drone flyovers with our concierge desk to address buyer due-diligence questions."
    },
    {
      icon: Coins,
      title: "5. Liquidate & Close Escrow",
      desc: "Sign secure closing agreements online. Transfer title deeds seamlessly and receive direct funds wired instantly."
    }
  ];

  return (
    <section id="how-it-works" className="bg-[#FAFAFA] py-24 px-6 lg:px-8 border-t border-zinc-200">
      <div className="mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#E53935] uppercase block">
            MARKETPLACE DYNAMICS
          </span>
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
            The Aura Transaction Protocol
          </h2>
          <p className="font-sans text-sm text-zinc-600 max-w-xl mx-auto leading-relaxed">
            A simplified, high-security pipeline tailored for seamless raw acreage transfers, engineered from the ground up for elite asset allocators.
          </p>
 
          {/* Interactive Toggle */}
          <div className="pt-6">
            <div className="inline-flex rounded-full bg-zinc-100 border border-zinc-200 p-1.5 shadow-sm">
              <button
                onClick={() => setActiveTab("buyers")}
                className={`rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === "buyers"
                    ? "bg-[#E53935] text-white shadow-md shadow-[#E53935]/20"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                Acquiring Land (Buyers)
              </button>
              <button
                onClick={() => setActiveTab("sellers")}
                className={`rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === "sellers"
                    ? "bg-[#E53935] text-white shadow-md shadow-[#E53935]/20"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                Liquidating Land (Sellers)
              </button>
            </div>
          </div>
        </div>
 
        {/* Side-by-side 3D flipping cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5 pt-4">
          {buyerSteps.map((step, idx) => {
            const BuyerIcon = step.icon;
            const sellerStep = sellerSteps[idx];
            const SellerIcon = sellerStep.icon;
            
            return (
              <div 
                key={idx}
                className="perspective-1000 w-full h-[290px] cursor-pointer"
                onClick={() => setActiveTab(activeTab === "buyers" ? "sellers" : "buyers")}
              >
                <div 
                  className="relative w-full h-full duration-700 preserve-3d transition-transform"
                  style={{ transform: activeTab === "sellers" ? "rotateY(180deg)" : "rotateY(0deg)" }}
                >
                  
                  {/* Front Side: Buyers */}
                  <div className="absolute inset-0 w-full h-full backface-hidden rounded-xl border border-zinc-200 bg-white p-5 flex flex-col justify-between shadow-sm hover:border-[#E53935]/40 transition-colors">
                    <div className="space-y-3">
                      <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#E53935]/10 border border-[#E53935]/20 text-[#E53935]">
                        <BuyerIcon className="h-4.5 w-4.5" />
                      </div>
                      <h4 className="font-sans text-xs sm:text-sm font-bold text-zinc-900 leading-snug">
                        {step.title}
                      </h4>
                      <p className="font-sans text-[11px] text-zinc-500 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Back Side: Sellers */}
                  <div 
                    className="absolute inset-0 w-full h-full backface-hidden rounded-xl border border-zinc-200 bg-white p-5 flex flex-col justify-between shadow-sm hover:border-[#E53935]/40 transition-colors"
                    style={{ transform: "rotateY(180deg)" }}
                  >
                    <div className="space-y-3">
                      <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#E53935]/10 border border-[#E53935]/20 text-[#E53935]">
                        <SellerIcon className="h-4.5 w-4.5" />
                      </div>
                      <h4 className="font-sans text-xs sm:text-sm font-bold text-zinc-900 leading-snug">
                        {sellerStep.title}
                      </h4>
                      <p className="font-sans text-[11px] text-zinc-500 leading-relaxed">
                        {sellerStep.desc}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
