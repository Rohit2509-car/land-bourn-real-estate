import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle, ShieldCheck } from "lucide-react";
import { FAQS } from "../data";

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="bg-[#FAFAFA] py-24 px-6 lg:px-8 border-t border-zinc-200">
      <div className="mx-auto max-w-4xl">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#E53935] uppercase block">
            REGULATORY INFORMATION
          </span>
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
            Frequently Answered Inquiries
          </h2>
          <p className="font-sans text-sm text-zinc-600 max-w-lg mx-auto leading-relaxed">
            Unraveling legalities, Escrow guidelines, and how Land Bourn maintains absolute safety across high-value luxury real estate placements.
          </p>
        </div>

        {/* Accordion Layout */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                className="rounded-xl border border-zinc-200 bg-white overflow-hidden transition-all duration-300 shadow-sm"
              >
                {/* Accordion Header bar */}
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none hover:bg-zinc-50 cursor-pointer"
                >
                  <span className="font-sans text-base font-bold text-zinc-900 hover:text-[#E53935] transition-colors">
                    {faq.question}
                  </span>
                  <div>
                    {isOpen ? (
                      <ChevronUp className="h-5 w-5 text-[#E53935]" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-zinc-400" />
                    )}
                  </div>
                </button>

                {/* Accordion Panel Content */}
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-60 border-t border-zinc-100 p-6 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                  }`}
                >
                  <p className="font-sans text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
