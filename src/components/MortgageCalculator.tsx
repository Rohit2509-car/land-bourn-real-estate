import React, { useState, useEffect } from "react";
import { Calculator, DollarSign, Percent, Calendar, ShieldAlert } from "lucide-react";

interface MortgageCalculatorProps {
  initialPrice: number;
}

export default function MortgageCalculator({ initialPrice }: MortgageCalculatorProps) {
  const [price, setPrice] = useState(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTermYears, setLoanTermYears] = useState(30);
  const [annualPropertyTaxPercent, setAnnualPropertyTaxPercent] = useState(0.8); // standard agricultural/raw land tax is lower
  const [monthlyCarryCosts, setMonthlyCarryCosts] = useState(500); // insurance, security, brush clearing

  const [downPayment, setDownPayment] = useState(initialPrice * 0.2);
  const [loanAmount, setLoanAmount] = useState(initialPrice * 0.8);
  const [monthlyPrincipalAndInterest, setMonthlyPrincipalAndInterest] = useState(0);
  const [monthlyPropertyTax, setMonthlyPropertyTax] = useState(0);
  const [totalMonthlyPayment, setTotalMonthlyPayment] = useState(0);

  // Sync state if initialPrice changes (e.g. user toggles between property cards)
  useEffect(() => {
    setPrice(initialPrice);
    const dp = initialPrice * (downPaymentPercent / 100);
    setDownPayment(dp);
    setLoanAmount(initialPrice - dp);
  }, [initialPrice]);

  useEffect(() => {
    const dp = price * (downPaymentPercent / 100);
    setDownPayment(dp);
    const la = price - dp;
    setLoanAmount(la);

    // Calculate monthly interest rate
    const monthlyRate = (interestRate / 100) / 12;
    const totalPayments = loanTermYears * 12;

    let monthlyPAndI = 0;
    if (monthlyRate === 0) {
      monthlyPAndI = la / totalPayments;
    } else {
      monthlyPAndI = (la * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                    (Math.pow(1 + monthlyRate, totalPayments) - 1);
    }

    setMonthlyPrincipalAndInterest(monthlyPAndI);

    // Raw Land Tax Calculation
    const monthlyTax = (price * (annualPropertyTaxPercent / 100)) / 12;
    setMonthlyPropertyTax(monthlyTax);

    setTotalMonthlyPayment(monthlyPAndI + monthlyTax + monthlyCarryCosts);
  }, [price, downPaymentPercent, interestRate, loanTermYears, annualPropertyTaxPercent, monthlyCarryCosts]);

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-xl">
      <div className="mb-6 flex items-center space-x-2.5">
        <Calculator className="h-5 w-5 text-[#E53935]" />
        <h4 className="font-sans text-lg font-bold tracking-tight text-zinc-900">
          Land Carrying & Leverage Calculator
        </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Sliders Input */}
        <div className="space-y-4">
          
          {/* Down Payment % */}
          <div>
            <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1">
              <span>Down Payment ({downPaymentPercent}%)</span>
              <span className="text-[#E53935]">${Math.round(downPayment).toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="10"
              max="90"
              step="5"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-[#E53935] h-1.5 bg-zinc-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* Interest Rate % */}
          <div>
            <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1">
              <span>Interest Rate</span>
              <span className="text-[#E53935]">{interestRate}%</span>
            </div>
            <input
              type="range"
              min="3"
              max="12"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-[#E53935] h-1.5 bg-zinc-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* Loan Term */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1">
              Loan Amortization
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[10, 15, 30].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setLoanTermYears(term)}
                  className={`rounded py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    loanTermYears === term
                      ? "bg-[#E53935] text-[#FAFAFA]"
                      : "bg-zinc-50 text-zinc-500 border border-zinc-200 hover:border-[#E53935]/30"
                  }`}
                >
                  {term} Years
                </button>
              ))}
            </div>
          </div>

          {/* Annual Property Tax */}
          <div>
            <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1">
              <span>Annual Raw Land Tax</span>
              <span className="text-[#E53935]">{annualPropertyTaxPercent}%</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="2.5"
              step="0.1"
              value={annualPropertyTaxPercent}
              onChange={(e) => setAnnualPropertyTaxPercent(Number(e.target.value))}
              className="w-full accent-[#E53935] h-1.5 bg-zinc-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* Monthly Carrying Cost (insurance, security, easements) */}
          <div>
            <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1">
              <span>Monthly Carry Costs</span>
              <span className="text-[#E53935]">${monthlyCarryCosts.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="100"
              max="2500"
              step="50"
              value={monthlyCarryCosts}
              onChange={(e) => setMonthlyCarryCosts(Number(e.target.value))}
              className="w-full accent-[#E53935] h-1.5 bg-zinc-200 rounded-lg cursor-pointer"
            />
          </div>

        </div>

        {/* Results output */}
        <div className="rounded-lg border border-zinc-200 bg-zinc-50/50 p-5 flex flex-col justify-between space-y-4">
          
          <div className="space-y-3">
            <span className="block text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400">
              LEVERAGED EXPOSURE BREAKDOWN
            </span>

            {/* Price */}
            <div className="flex justify-between text-sm border-b border-zinc-200 pb-2">
              <span className="text-zinc-500">Total Acquisition Price:</span>
              <span className="font-bold text-zinc-900">${price.toLocaleString()}</span>
            </div>

            {/* Financed Amount */}
            <div className="flex justify-between text-sm border-b border-zinc-200 pb-2">
              <span className="text-zinc-500">Financed Capital:</span>
              <span className="font-bold text-zinc-900">${Math.round(loanAmount).toLocaleString()}</span>
            </div>

            {/* Principal and Interest */}
            <div className="flex justify-between text-xs text-zinc-500">
              <span>Monthly Principal & Interest:</span>
              <span className="font-semibold text-zinc-900">${Math.round(monthlyPrincipalAndInterest).toLocaleString()}</span>
            </div>

            {/* Taxes */}
            <div className="flex justify-between text-xs text-zinc-500">
              <span>Monthly Land Tax Reserve:</span>
              <span className="font-semibold text-zinc-900">${Math.round(monthlyPropertyTax).toLocaleString()}</span>
            </div>

            {/* Upkeep */}
            <div className="flex justify-between text-xs text-zinc-500">
              <span>Est. Insurance & Brush Abatement:</span>
              <span className="font-semibold text-zinc-900">${monthlyCarryCosts.toLocaleString()}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-200 text-center">
            <span className="block text-[10px] font-bold uppercase tracking-widest text-[#E53935] mb-1">
              ESTIMATED MONTHLY INVESTMENT OUTFLOW
            </span>
            <span className="text-3xl font-black text-[#E53935] tracking-tight">
              ${Math.round(totalMonthlyPayment).toLocaleString()}
              <span className="text-xs font-medium text-zinc-500"> /mo</span>
            </span>
          </div>

          <div className="flex items-start space-x-2 rounded border border-[#E53935]/10 bg-[#E53935]/5 p-2.5 text-[10px] text-[#E53935]">
            <ShieldAlert className="h-3.5 w-3.5 flex-shrink-0" />
            <span>
              Disclaimer: Financing terms are subject to local underwriting audits. Land Bourn assists in arranging elite syndications.
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
