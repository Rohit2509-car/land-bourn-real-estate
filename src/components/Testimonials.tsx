import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck } from "lucide-react";
import { INITIAL_TESTIMONIALS } from "../data";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? INITIAL_TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === INITIAL_TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = INITIAL_TESTIMONIALS[currentIndex];

  return (
    <section className="bg-[#FAFAFA] py-24 px-6 lg:px-8 border-t border-zinc-200 relative overflow-hidden">
      
      {/* Background grid light */}
      <div className="absolute left-10 top-10 h-80 w-80 rounded-full bg-[#E53935]/2 blur-[100px] pointer-events-none"></div>

      <div className="mx-auto max-w-4xl relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#E53935] uppercase block">
            INVESTOR CONVICTION
          </span>
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
            Success Logs From the Sovereign Vault
          </h2>
        </div>

        {/* Carousel Slider */}
        <div className="relative rounded-2xl border border-[#E53935]/20 bg-white p-8 sm:p-12 shadow-xl">
          
          <Quote className="absolute right-8 top-8 h-12 w-12 text-[#E53935]/10 pointer-events-none" />

          <div className="space-y-6 text-center">
            
            {/* Stars */}
            <div className="flex justify-center space-x-1">
              {Array.from({ length: current.rating }).map((_, idx) => (
                <Star key={idx} className="h-4.5 w-4.5 fill-[#E53935] text-[#E53935]" />
              ))}
            </div>

            {/* Testimonial Quote */}
            <blockquote className="font-sans text-lg sm:text-xl text-zinc-800 font-light leading-relaxed italic">
              "{current.quote}"
            </blockquote>

            {/* Profile info */}
            <div className="flex flex-col items-center space-y-3 pt-4">
              <img
                src={current.avatar}
                alt={current.name}
                className="h-16 w-16 rounded-full object-cover border-2 border-[#E53935] shadow-md"
                referrerPolicy="no-referrer"
              />
              <div>
                <h4 className="font-sans text-sm font-black text-zinc-900 tracking-wide">
                  {current.name}
                </h4>
                <p className="font-sans text-xs text-[#E53935] mt-0.5">
                  {current.role}
                </p>
                <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 block mt-1">
                  Registered Escrow Office: {current.location}
                </span>
              </div>
            </div>

          </div>

          {/* Navigation Controls */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 sm:px-4 pointer-events-none">
            <button
              onClick={handlePrev}
              className="pointer-events-auto rounded-full bg-white/90 border border-zinc-200 p-2 text-zinc-500 hover:text-[#E53935] transition-colors shadow-sm cursor-pointer"
              title="Previous Success Log"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="pointer-events-auto rounded-full bg-white/90 border border-zinc-200 p-2 text-zinc-500 hover:text-[#E53935] transition-colors shadow-sm cursor-pointer"
              title="Next Success Log"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

        </div>

        {/* Carousel indicator dots */}
        <div className="flex justify-center space-x-2.5 mt-8">
          {INITIAL_TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 w-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx ? "bg-[#E53935] w-6" : "bg-zinc-200"
              }`}
              aria-label={`Slide ${idx + 1}`}
            ></button>
          ))}
        </div>

        {/* FDIC / SEC Assurance Mark */}
        <div className="mt-12 flex justify-center items-center space-x-2 text-center text-[10px] font-mono tracking-widest text-zinc-400">
          <ShieldCheck className="h-4 w-4 text-[#E53935]" />
          <span>Sovereign client records are sealed under strict Swiss-protocol end-to-end security models.</span>
        </div>

      </div>
    </section>
  );
}
