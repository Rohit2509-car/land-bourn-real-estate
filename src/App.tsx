import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PropertyGrid from "./components/PropertyGrid";
import WhyChooseUs from "./components/WhyChooseUs";
import HowItWorks from "./components/HowItWorks";
import InteractiveMap from "./components/InteractiveMap";
import Testimonials from "./components/Testimonials";
import SellYourLand from "./components/SellYourLand";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import ComparisonDrawer from "./components/ComparisonDrawer";
import { INITIAL_PROPERTIES } from "./data";
import { Property, SearchCriteria } from "./types";
import { Sparkles, Compass, ShieldCheck, X } from "lucide-react";

export default function App() {
  // Properties State - begins with core Napa, Malibu, Swiss Alps parcels
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);

  // Search/Filters state
  const [criteria, setCriteria] = useState<SearchCriteria>({
    searchQuery: "",
    location: "",
    category: "All",
    minPrice: 0,
    maxPrice: 25000000,
    minAcres: 0,
    maxAcres: 100,
    onlyVerified: false,
  });

  // Saved Listings Bookmarks (persisted in localStorage)
  const [savedList, setSavedList] = useState<string[]>([]);
  
  // Side-by-side comparison list (max 3 parcels)
  const [compareList, setCompareList] = useState<Property[]>([]);
  const [isCompareDrawerOpen, setIsCompareDrawerOpen] = useState(false);

  // Programmatic detail drawer opener callback ref
  const viewDetailsCallbackRef = useRef<((property: Property) => void) | null>(null);

  // Notification Toast alert state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load Saved Bookmarks from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("aura_saved_listings");
    if (saved) {
      try {
        setSavedList(JSON.parse(saved));
      } catch (err) {
        console.error("Failed to parse saved listings from localStorage:", err);
      }
    }
  }, []);

  // Show Toast helper
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Toggle saving property
  const handleToggleSave = (id: string) => {
    const isCurrentlySaved = savedList.includes(id);
    let updated: string[];
    
    if (isCurrentlySaved) {
      updated = savedList.filter((savedId) => savedId !== id);
      showToast("Property removed from private portfolio bookmark.");
    } else {
      updated = [...savedList, id];
      showToast("Property bookmarked securely in private portfolio.");
    }

    setSavedList(updated);
    localStorage.setItem("aura_saved_listings", JSON.stringify(updated));
  };

  // Add/Remove property from side-by-side comparison list
  const handleAddToCompare = (property: Property) => {
    const alreadyIncluded = compareList.some((item) => item.id === property.id);
    if (alreadyIncluded) {
      showToast("Property is already listed on your comparison ledger.");
      return;
    }
    
    if (compareList.length >= 3) {
      showToast("Comparison ledger limit reached. Max 3 parcels may be compared.");
      return;
    }

    const updated = [...compareList, property];
    setCompareList(updated);
    setIsCompareDrawerOpen(true);
    showToast(`${property.title} added to comparison list.`);
  };

  const handleRemoveFromCompare = (id: string) => {
    const updated = compareList.filter((item) => item.id !== id);
    setCompareList(updated);
    if (updated.length === 0) {
      setIsCompareDrawerOpen(false);
    }
    showToast("Property removed from comparison ledger.");
  };

  const handleClearCompare = () => {
    setCompareList([]);
    setIsCompareDrawerOpen(false);
    showToast("Acquisition comparison list cleared.");
  };

  // Dynamic state list mutation - when landowner registers their property
  const handleAddProperty = (newProperty: Property) => {
    setProperties((prev) => [newProperty, ...prev]);
    showToast(`${newProperty.title} listed on active ledger successfully!`);
  };

  // Smooth Scroll Trigger
  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // height of sticky navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Trigger scroll to Sell Form & flash focus border
  const handleOpenSellForm = () => {
    handleScrollToSection("sell-land");
    setTimeout(() => {
      const container = document.getElementById("sell-form-container");
      if (container) {
        container.classList.add("ring-2", "ring-[#E53935]", "duration-500");
        setTimeout(() => {
          container.classList.remove("ring-2", "ring-[#E53935]");
        }, 2000);
      }
    }, 800);
  };

  return (
    <div id="root-container" className="min-h-screen bg-[#121212] text-[#FAFAFA] font-sans antialiased overflow-x-hidden selection:bg-[#E53935] selection:text-white">
      
      {/* Sticky Luxury Transparent Header */}
      <Navbar 
        onScrollToSection={handleScrollToSection}
        onOpenSellForm={handleOpenSellForm}
      />

      {/* Cinematic Hero Segment */}
      <Hero 
        criteria={criteria}
        onCriteriaChange={setCriteria}
        onSearch={() => handleScrollToSection("buy-land")}
        onScrollToSection={handleScrollToSection}
      />

      {/* Advanced Filtered Property Acquisitions Grid */}
      <PropertyGrid 
        properties={properties}
        criteria={criteria}
        onCriteriaChange={setCriteria}
        onAddToCompare={handleAddToCompare}
        compareList={compareList}
        onViewDetailsRef={(openerFn) => {
          viewDetailsCallbackRef.current = openerFn;
        }}
        savedList={savedList}
        onToggleSave={handleToggleSave}
      />

      {/* Why Choose Us Features Ledger */}
      <WhyChooseUs />


      {/* Interactive Global Deed Plot Map */}
      <InteractiveMap 
        properties={properties}
        onSelectProperty={(prop: Property) => {
          // Open details modal programmatically via our callback ref
          if (viewDetailsCallbackRef.current) {
            viewDetailsCallbackRef.current(prop);
          }
        }}
      />

      {/* Escrow Timeline Process Protocol */}
      <HowItWorks />

      {/* Interactive Land Owner Liquidation Form */}
      <SellYourLand 
        onAddProperty={handleAddProperty}
        onScrollToSection={handleScrollToSection}
      />

      {/* Testimonial Success logs */}
      <Testimonials />

      {/* Accordion Regulatory FAQ */}
      <FAQ />

      {/* Final Conversion CTA Banner */}
      <section className="relative bg-[#E53935] py-28 px-6 lg:px-8 overflow-hidden text-center">
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">

          <h2 className="font-sans text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Start Your Land Investment <br />
            Journey Today
          </h2>

          <p className="font-sans text-sm sm:text-base text-white/90 max-w-xl mx-auto leading-relaxed">
            Formulate secure portfolios, leverage active zoning classifications, and acquire vetted global real estate deeds securely on Land Bourn.
          </p>

          <div className="flex justify-center pt-4">
            <button
              onClick={() => handleScrollToSection("buy-land")}
              className="rounded-md bg-white px-10 py-4 text-sm font-bold tracking-widest text-[#E53935] uppercase hover:bg-zinc-100 shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              Explore Active Ledger
            </button>
          </div>
        </div>
      </section>

      {/* Sophisticated Black Footer */}
      <Footer onScrollToSection={handleScrollToSection} />

      {/* Floating Side-by-Side Comparison Ledger (Locks at screen bottom) */}
      <ComparisonDrawer 
        compareList={compareList}
        onRemoveFromCompare={handleRemoveFromCompare}
        onClearCompare={handleClearCompare}
        isOpen={isCompareDrawerOpen}
        onToggleOpen={() => setIsCompareDrawerOpen(!isCompareDrawerOpen)}
        onViewDetails={(prop) => {
          if (viewDetailsCallbackRef.current) {
            viewDetailsCallbackRef.current(prop);
          }
        }}
      />

      {/* Elegant Toast Alert Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 right-6 z-50 flex items-center space-x-3 rounded-xl border border-[#E53935]/40 bg-[#121212]/95 p-4.5 shadow-2xl backdrop-blur-md animate-slide-in-right">
          <ShieldCheck className="h-5 w-5 text-[#E53935] flex-shrink-0" />
          <p className="font-sans text-xs font-semibold text-[#FAFAFA]">{toastMessage}</p>
          <button
            onClick={() => setToastMessage(null)}
            className="text-[#B8B8B8] hover:text-[#FAFAFA]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

    </div>
  );
}
