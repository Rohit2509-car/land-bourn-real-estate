import React, { useState } from "react";
import { Sparkles, Coins, HelpCircle, ShieldCheck, Compass, Info, Check, ArrowRight } from "lucide-react";

export default function AiAssistant() {
  const [budget, setBudget] = useState(3500000);
  const [size, setSize] = useState(25);
  const [location, setLocation] = useState("Napa Valley, California");
  const [category, setCategory] = useState("Viticulture");
  const [intent, setIntent] = useState("Wealth Preservation & Family Trust");
  const [experience, setExperience] = useState("Institutional Developer");

  const [loading, setLoading] = useState(false);
  const [reportText, setReportText] = useState<string | null>(null);
  const [suggestedCriteria, setSuggestedCriteria] = useState<{
    recommendedCategory: string;
    estimatedROI: string;
    riskProfile: string;
    recommendedAction: string;
  } | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);

  const handleGenerateReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setReportText(null);
    setSuggestedCriteria(null);

    try {
      const response = await fetch("/api/ai/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          budget,
          size,
          location,
          category,
          intent,
          experience
        }),
      });

      const data = await response.json();
      if (data) {
        setReportText(data.text);
        if (data.suggestedCriteria) {
          setSuggestedCriteria(data.suggestedCriteria);
        }
        setIsDemoMode(!!data.isDemo);
      }
    } catch (err) {
      console.error("AI Assistant Failed:", err);
      setReportText("Failed to establish secure handshake with the AI model. Escrow desk offline.");
    } finally {
      setLoading(false);
    }
  };

  // Helper to format the markdown output nicely in standard HTML elements
  const renderFormattedReport = (text: string) => {
    if (!text) return null;
    
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      if (line.startsWith("### ")) {
        return (
          <h4 key={idx} className="font-sans text-base font-bold text-[#E53935] mt-4 mb-2">
            {line.replace("### ", "")}
          </h4>
        );
      }
      if (line.startsWith("#### ")) {
        return (
          <h5 key={idx} className="font-sans text-sm font-semibold text-zinc-900 mt-3 mb-1">
            {line.replace("#### ", "")}
          </h5>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h3 key={idx} className="font-sans text-lg font-black text-zinc-900 mt-5 mb-3 border-b border-zinc-200 pb-1.5">
            {line.replace("## ", "")}
          </h3>
        );
      }
      if (line.startsWith("1. ") || line.startsWith("2. ") || line.startsWith("3. ") || line.startsWith("4. ")) {
        return (
          <p key={idx} className="font-sans text-xs sm:text-sm text-zinc-600 pl-4 leading-relaxed mb-1.5 flex items-start">
            <span className="text-[#E53935] font-bold mr-2">{line.split(" ")[0]}</span>
            <span>{line.substring(3)}</span>
          </p>
        );
      }
      if (line.startsWith("- ")) {
        return (
          <div key={idx} className="flex items-start space-x-2 pl-4 mb-1 text-xs sm:text-sm text-zinc-600">
            <span className="text-[#E53935] mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0"></span>
            <span>{line.substring(2)}</span>
          </div>
        );
      }
      if (line.trim() === "") {
        return <div key={idx} className="h-2"></div>;
      }
      return (
        <p key={idx} className="font-sans text-xs sm:text-sm text-zinc-600 leading-relaxed mb-2">
          {line}
        </p>
      );
    });
  };

  return (
    <section id="ai-advisory" className="bg-[#FAFAFA] py-24 px-6 lg:px-8 border-t border-zinc-200">
      <div className="mx-auto max-w-5xl">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl flex items-center justify-center space-x-2">
            <Sparkles className="h-7 w-7 text-[#E53935] animate-pulse" />
            <span>Aura AI Investment Advisory</span>
          </h2>
          <p className="font-sans text-sm text-zinc-600 max-w-xl mx-auto leading-relaxed">
            Formulate bespoke raw acreage investment strategies instantly. Our server-side neural models synthesize zoning codes, water rights parameters, and location trends.
          </p>
        </div>

        {/* Assistant Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Form Side (5/12) */}
          <div className="lg:col-span-5 rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xl flex flex-col justify-between">
            <form onSubmit={handleGenerateReport} className="space-y-4">
              
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#E53935] block">
                CONFIGURE DESIRED ALLOCATION
              </span>

              {/* Budget slider */}
              <div>
                <div className="flex justify-between text-xs text-zinc-500 font-bold mb-1">
                  <span>CAPITAL BUDGET</span>
                  <span className="text-[#E53935]">${(budget).toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="500000"
                  max="25000000"
                  step="500000"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full accent-[#E53935] h-1.5 bg-zinc-200 rounded-lg cursor-pointer"
                />
              </div>

              {/* Acres slider */}
              <div>
                <div className="flex justify-between text-xs text-zinc-500 font-bold mb-1">
                  <span>SIZE TARGET</span>
                  <span className="text-[#E53935]">{size} Acres</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="150"
                  step="5"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="w-full accent-[#E53935] h-1.5 bg-zinc-200 rounded-lg cursor-pointer"
                />
              </div>

              {/* Preferred Location */}
              <div>
                <label className="block text-xs font-semibold uppercase text-zinc-600 mb-1">
                  PREFERRED REGION
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-md border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-xs text-zinc-900 focus:border-[#E53935] focus:outline-none cursor-pointer"
                >
                  <option value="Napa Valley, California">Napa Valley (Viticulture Hills)</option>
                  <option value="Malibu Peninsula, California">Malibu Beachfront (Legacy Cliffside)</option>
                  <option value="Aspen Peaks, Colorado">Aspen Slopes (Alpine Ski Meadows)</option>
                  <option value="Maui Shoreline, Hawaii">Maui North Shore (Tropical Conservation)</option>
                  <option value="Tuscany Hills, Italy">Siena Valley, Italy (Olive & Vine Hills)</option>
                  <option value="Swiss Alps, Switzerland">Zermatt Ridge (Commercial Lodging Peaks)</option>
                </select>
              </div>

              {/* Land Asset Genre */}
              <div>
                <label className="block text-xs font-semibold uppercase text-zinc-600 mb-1">
                  ASSET CLASS TARGET
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-md border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-xs text-zinc-900 focus:border-[#E53935] focus:outline-none cursor-pointer"
                >
                  <option value="Viticulture">Viticulture & Vineyard Reserves</option>
                  <option value="Legacy Estate">Legacy Estates / Peninsula Compounds</option>
                  <option value="Agricultural">Agricultural Preserves & Conservation</option>
                  <option value="Residential">Residential Subdivision Projects</option>
                  <option value="Commercial">Commercial Resort / Medical Lodges</option>
                </select>
              </div>

              {/* Investment Intent */}
              <div>
                <label className="block text-xs font-semibold uppercase text-zinc-600 mb-1">
                  INVESTMENT INTENT
                </label>
                <select
                  value={intent}
                  onChange={(e) => setIntent(e.target.value)}
                  className="w-full rounded-md border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-xs text-zinc-900 focus:border-[#E53935] focus:outline-none cursor-pointer"
                >
                  <option value="Wealth Preservation & Trust">Wealth Preservation & Family Trusts</option>
                  <option value="Immediate Architectural Development">Immediate High-End Architectural Development</option>
                  <option value="Long Term Land Banking Appreciation">Long-Term Land-Banking Capital Appreciation</option>
                  <option value="Agricultural Tax Mitigation & Easement">Agricultural Tax Exemption & Easements</option>
                </select>
              </div>

              {/* Investor Experience */}
              <div>
                <label className="block text-xs font-semibold uppercase text-zinc-600 mb-1">
                  INVESTOR CLASSIFICATION
                </label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full rounded-md border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-xs text-zinc-900 focus:border-[#E53935] focus:outline-none cursor-pointer"
                >
                  <option value="Private Individual Account">Private Individual Account</option>
                  <option value="Experienced Developer Partner">Experienced Developer / Syndicate Partner</option>
                  <option value="Family Office Director">Institutional Family Office / Private Trust</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-[#E53935] hover:bg-[#D32F2F] text-white font-extrabold text-xs uppercase py-3.5 tracking-[0.2em] shadow-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Compass className="h-4 w-4 animate-spin" />
                    <span>Synthesizing Legal Models...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 text-white" />
                    <span>Compute Strategic Report</span>
                  </>
                )}
              </button>

            </form>

            <div className="flex items-start space-x-2 rounded border border-zinc-200 bg-zinc-50 p-3 text-[10px] text-zinc-500 mt-4">
              <Compass className="h-4 w-4 text-[#E53935] flex-shrink-0 animate-spin-slow" />
              <span>
                Note: Neural recommendations are simulated projections. Consult with licensed legal desks before signing deeds.
              </span>
            </div>

          </div>

          {/* Results Side (7/12) */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-[#E53935]/20 bg-white p-6 sm:p-8 shadow-xl min-h-[500px]">
            
            {loading ? (
              <div className="flex-grow flex flex-col items-center justify-center text-center space-y-4">
                <div className="relative h-12 w-12 flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E53935] opacity-30"></span>
                  <Compass className="h-8 w-8 text-[#E53935] animate-spin" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-widest animate-pulse">Establishing Escrow Handshake...</h4>
                  <p className="text-xs text-zinc-500 max-w-sm leading-relaxed">
                    Analyzing environmental slopes, soil volcanic indexes, Chianti viticulture quotas, and local property tax schedules...
                  </p>
                </div>
              </div>
            ) : reportText ? (
              <div className="flex flex-col justify-between h-full space-y-6">
                
                {/* Mode Indicator */}
                <div className="flex justify-between items-center pb-3 border-b border-zinc-200">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#E53935] font-bold">
                    PORTFOLIO MEMORANDUM COMPLETE
                  </span>
                  {isDemoMode && (
                    <span className="text-[9px] font-bold bg-[#E53935]/5 text-[#E53935] px-2.5 py-0.5 rounded border border-[#E53935]/20 uppercase">
                      SECURE SANDBOX DEMO
                    </span>
                  )}
                </div>

                {/* Formatted Report */}
                <div className="flex-grow overflow-y-auto max-h-[350px] pr-2 text-left space-y-3 font-sans">
                  {renderFormattedReport(reportText)}
                </div>

                {/* Suggested criteria box */}
                {suggestedCriteria && (
                  <div className="pt-4 border-t border-zinc-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left font-mono">
                    <div className="space-y-0.5">
                      <span className="block text-[9px] text-zinc-400 uppercase">SUGGESTED CLASS</span>
                      <span className="text-xs font-bold text-zinc-900 truncate block">{suggestedCriteria.recommendedCategory}</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="block text-[9px] text-zinc-400 uppercase">ESTIMATED APPR.</span>
                      <span className="text-xs font-bold text-[#E53935]">{suggestedCriteria.estimatedROI}</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="block text-[9px] text-zinc-400 uppercase">RISK LEVEL</span>
                      <span className="text-xs font-bold text-zinc-900">{suggestedCriteria.riskProfile}</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="block text-[9px] text-zinc-400 uppercase">BROKER ACTION</span>
                      <span className="text-xs font-bold text-[#E53935] truncate block" title={suggestedCriteria.recommendedAction}>
                        {suggestedCriteria.recommendedAction}
                      </span>
                    </div>
                  </div>
                )}

              </div>
            ) : (
              <div className="flex-grow flex flex-col items-center justify-center text-center p-8 space-y-4">
                <Compass className="h-12 w-12 text-[#E53935] animate-spin-slow" />
                <h4 className="font-sans text-base font-bold text-zinc-900 uppercase tracking-widest">
                  Ready for Portfolio Computation
                </h4>
                <p className="text-xs text-zinc-500 max-w-sm leading-relaxed">
                  Select your capital target allocation and experience brackets. Click 'Compute Strategic Report' to request neural broker assessments and localized zoning analyses.
                </p>
                <button
                  onClick={handleGenerateReport}
                  className="rounded-full border border-[#E53935] bg-transparent text-[#E53935] text-xs font-bold uppercase tracking-widest px-6 py-2.5 hover:bg-[#E53935] hover:text-white transition-colors cursor-pointer"
                >
                  Synthesize Default Model
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
