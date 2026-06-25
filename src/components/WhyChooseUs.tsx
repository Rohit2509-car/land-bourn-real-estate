import React from "react";
import { ShieldCheck, Lock, UserCheck, TrendingUp, Headphones, Zap } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: ShieldCheck,
      title: "100% Verified Deeds",
      description: "Our legal desks run deep-level title audits, verify historical deed access, and certify land boundaries with satellite telemetry before listing."
    },
    {
      icon: Lock,
      title: "Secure Escrow Conveyance",
      description: "Transactions are executed through premier global title agencies. We guarantee your earnest deposits are locked in protected double-vault accounts."
    },
    {
      icon: UserCheck,
      title: "Elite Trusted Brokerage",
      description: "Every user and broker on our platform undergoes background audits, ensuring you negotiate directly with verified high-net-worth sellers."
    },
    {
      icon: TrendingUp,
      title: "Legacy Appreciation Yields",
      description: "We filter and select parcels in regions with high historical appreciation rates and massive development potential, safeguarding your capital."
    },
    {
      icon: Headphones,
      title: "Expert Land Advisory Team",
      description: "Get direct 24/7 access to physical land surveyors, environmental zoning specialists, civil engineers, and custom luxury estate architects."
    },
    {
      icon: Zap,
      title: "Automated Escrow Pipeline",
      description: "From soil metrics to municipal zoning, complete your environmental site assessments and title releases five times faster than traditional brokerages."
    }
  ];

  return (
    <section className="bg-white py-24 px-6 lg:px-8 border-t border-zinc-200 relative overflow-hidden">
      
      {/* Background radial gold glow */}
      <div className="absolute right-0 top-1/2 h-96 w-96 rounded-full bg-[#E53935]/5 blur-[120px] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#E53935] uppercase block">
            AURA QUALITY COMMITMENT
          </span>
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
            Why Capital Allocators Choose Aura
          </h2>
          <p className="font-sans text-sm text-zinc-600 leading-relaxed">
            We merge luxury estate curation with state-of-the-art fintech escrow, making high-value land acquisition clear, secure, and highly liquid.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx}
                className="group relative rounded-xl border border-zinc-200 bg-zinc-50/50 p-8 hover:bg-white hover:border-[#E53935]/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Icon Backdrop */}
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#E53935]/10 border border-[#E53935]/20 text-[#E53935] transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="font-sans text-lg font-bold text-zinc-900 mb-2 group-hover:text-[#E53935] transition-colors">
                  {feat.title}
                </h3>

                <p className="font-sans text-xs text-zinc-600 leading-relaxed">
                  {feat.description}
                </p>

                {/* Subtle Gold accent line */}
                <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-[#E53935] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
