import React, { useState } from "react";
import { ShieldCheck, Mail, ArrowRight, Phone, MapPin, Globe } from "lucide-react";

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Footer({ onScrollToSection }: FooterProps) {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setEmail("");
  };

  const currentYear = new Date().getFullYear();

  const linksGroup1 = [
    { name: "Acquisitions Ledger", id: "buy-land" },
    { name: "AI Investment Advisory", id: "ai-advisory" },
    { name: "Interactive Deed Map", id: "interactive-map" },
    { name: "Escrow Dynamic Flow", id: "how-it-works" },
  ];

  const linksGroup2 = [
    { name: "Zoning Audits", id: "how-it-works" },
    { name: "Sovereign Land Banking", id: "hero" },
    { name: "Liquidate Acreage", id: "sell-land" },
    { name: "Escrow Safeguards FAQ", id: "hero" },
  ];

  return (
    <footer className="bg-zinc-50 border-t border-zinc-200 pt-20 pb-12 px-6 lg:px-8 text-zinc-500 font-sans">
      <div className="mx-auto max-w-7xl">

        {/* Main Grid content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">

          {/* Column 1: Brand details (4/12) */}
          <div className="lg:col-span-4 space-y-6">
            <div
              onClick={() => onScrollToSection("hero")}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <img
                src="/logo.jpg"
                alt="Land Bourn Real Estate"
                className="h-12 w-auto rounded transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-0.5"
              />
            </div>

            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
              Land Bourn is an elite, double-authenticated escrow land registry platform. We bridge the gap between premium raw land investments and secure digital title closure under Swiss-level confidentiality protocols.
            </p>

            {/* Direct contact indicators */}
            <div className="space-y-2 text-xs font-mono text-zinc-400">
              <div className="flex items-start space-x-2.5">
                <MapPin className="h-4 w-4 text-[#E53935] mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">137, Jawaharlal Nehru Salai, opposite to sunshine school, AGS Colony, Velachery, Chennai, Tamil Nadu 600042</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="h-4 w-4 text-[#E53935]" />
                <span>+91 91767 77222</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="h-4 w-4 text-[#E53935]" />
                <span>hello@autobourncars.com</span>
              </div>
            </div>

          </div>

          {/* Column 2: Navigation 1 (2/12) */}
          <div className="lg:col-span-2 space-y-4">
            <h5 className="text-xs font-bold uppercase tracking-widest text-zinc-900">Land Acquisitions</h5>
            <ul className="space-y-2 text-xs">
              {linksGroup1.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onScrollToSection(link.id)}
                    className="hover:text-[#E53935] text-zinc-500 transition-colors text-left cursor-pointer"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Navigation 2 (2/12) */}
          <div className="lg:col-span-2 space-y-4">
            <h5 className="text-xs font-bold uppercase tracking-widest text-zinc-900">Wealth Advisory</h5>
            <ul className="space-y-2 text-xs">
              {linksGroup2.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onScrollToSection(link.id)}
                    className="hover:text-[#E53935] text-zinc-500 transition-colors text-left cursor-pointer"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter placement (4/12) */}
          <div className="lg:col-span-4 space-y-4">
            <h5 className="text-xs font-bold uppercase tracking-widest text-zinc-900">Private Placement Alerts</h5>
            <p className="text-xs leading-relaxed text-zinc-500">
              Register your private email credentials to receive strictly confidential alerts regarding high-value off-market acreage releases.
            </p>

            {success ? (
              <div className="rounded border border-green-600/20 bg-green-500/5 p-4 text-xs text-green-600 font-semibold flex items-center space-x-2">
                <ShieldCheck className="h-4 w-4 flex-shrink-0" />
                <span>Email credentials encrypted. Welcome to Land Bourn Vault.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder="investor@familyoffice.ch"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow rounded border border-zinc-300 bg-white px-4 py-3 text-xs text-zinc-800 placeholder-zinc-400 focus:border-[#E53935] focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded bg-[#E53935] hover:bg-[#D32F2F] text-white px-5 py-3 transition-colors flex items-center justify-center cursor-pointer"
                  aria-label="Submit newsletter subscription"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}

            <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-400">
              <ShieldCheck className="h-3.5 w-3.5 text-[#E53935]" />
              <span>Double-Authenticated SEC compliant list</span>
            </div>

          </div>

        </div>

        {/* Footer bottom links / copy notes */}
        <div className="pt-8 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono">

          <div className="text-center sm:text-left">
            <span>© {currentYear} Land Bourn AG. Licensed broker network. Swiss legal registry #CH-020.3.104.928-1. All rights reserved.</span>
          </div>

          <div className="flex space-x-6 text-center">
            <a href="#hero" className="hover:text-[#E53935] transition-colors">Privacy Ledger</a>
            <span>•</span>
            <a href="#hero" className="hover:text-[#E53935] transition-colors">Deed Escrow Terms</a>
            <span>•</span>
            <a href="#hero" className="hover:text-[#E53935] transition-colors">Zoning Compliance</a>
          </div>

        </div>

      </div>
    </footer>
  );
}
