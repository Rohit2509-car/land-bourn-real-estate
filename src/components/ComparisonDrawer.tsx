import React from "react";
import { X, Check, EyeOff, SlidersHorizontal, Trash2 } from "lucide-react";
import { Property } from "../types";

interface ComparisonDrawerProps {
  compareList: Property[];
  onRemoveFromCompare: (id: string) => void;
  onClearCompare: () => void;
  isOpen: boolean;
  onToggleOpen: () => void;
  onViewDetails: (property: Property) => void;
}

export default function ComparisonDrawer({
  compareList,
  onRemoveFromCompare,
  onClearCompare,
  isOpen,
  onToggleOpen,
  onViewDetails,
}: ComparisonDrawerProps) {
  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t-2 border-[#E53935] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] transition-all duration-500 ease-in-out">
      
      {/* Drawer Header/Toggle Bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-zinc-50 border-b border-zinc-200">
        <div className="flex items-center space-x-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E53935] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#E53935]"></span>
          </span>
          <h4 className="font-sans text-sm font-bold tracking-wider text-zinc-900 uppercase">
            Acquisition Comparison Ledger ({compareList.length} / 3)
          </h4>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={onClearCompare}
            className="text-xs text-zinc-500 hover:text-[#E53935] font-semibold transition-colors uppercase tracking-widest cursor-pointer"
          >
            Clear All
          </button>
          <button
            onClick={onToggleOpen}
            className="rounded-full bg-zinc-200 px-4 py-1.5 text-xs font-bold text-zinc-800 hover:bg-[#E53935] hover:text-white transition-colors cursor-pointer"
          >
            {isOpen ? "Collapse Table" : "Expand side-by-side"}
          </button>
        </div>
      </div>

      {/* Drawer Content - Comparison Table */}
      {isOpen && (
        <div className="max-h-[70vh] overflow-y-auto p-6">
          <div className="mx-auto max-w-7xl overflow-x-auto">
            <table className="w-full text-left font-sans border-collapse">
              <thead>
                <tr className="border-b border-zinc-200">
                  <th className="py-4 text-xs font-bold text-[#E53935] uppercase tracking-wider w-48">Spec Feature</th>
                  {compareList.map((prop) => (
                    <th key={prop.id} className="py-4 px-6 w-80 text-zinc-900">
                      <div className="flex items-start justify-between">
                        <div>
                          <h5 className="font-bold text-sm leading-tight text-zinc-900 line-clamp-1">{prop.title}</h5>
                          <span className="text-xs text-zinc-500">{prop.location}</span>
                        </div>
                        <button
                          onClick={() => onRemoveFromCompare(prop.id)}
                          className="text-zinc-400 hover:text-[#E53935] p-1 cursor-pointer"
                          title="Remove from comparison"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </th>
                  ))}
                  {/* Fill empty slots to keep columns aligned */}
                  {Array.from({ length: Math.max(0, 3 - compareList.length) }).map((_, i) => (
                    <th key={`empty-th-${i}`} className="py-4 px-6 text-zinc-300 italic text-xs font-light">
                      Waiting for parcel slot...
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 text-sm">
                
                {/* Image & Price row */}
                <tr>
                  <td className="py-4 text-xs font-bold uppercase tracking-wider text-zinc-500">Imagery / Price</td>
                  {compareList.map((prop) => (
                    <td key={`image-${prop.id}`} className="py-4 px-6">
                      <div className="space-y-2">
                        <img
                          src={prop.image}
                          alt={prop.title}
                          className="h-20 w-full object-cover rounded-md border border-zinc-100"
                          referrerPolicy="no-referrer"
                        />
                        <span className="block text-lg font-black text-[#E53935]">${prop.price.toLocaleString()}</span>
                      </div>
                    </td>
                  ))}
                  {Array.from({ length: Math.max(0, 3 - compareList.length) }).map((_, i) => (
                    <td key={`empty-img-${i}`} className="py-4 px-6 bg-zinc-50"></td>
                  ))}
                </tr>

                {/* Acreage */}
                <tr>
                  <td className="py-4 text-xs font-bold uppercase tracking-wider text-zinc-500">Acreage</td>
                  {compareList.map((prop) => (
                    <td key={`acres-${prop.id}`} className="py-4 px-6 font-mono font-semibold text-zinc-900">
                      {prop.acres} Acres
                    </td>
                  ))}
                  {Array.from({ length: Math.max(0, 3 - compareList.length) }).map((_, i) => (
                    <td key={`empty-acres-${i}`} className="py-4 px-6"></td>
                  ))}
                </tr>

                {/* Price Per Acre */}
                <tr>
                  <td className="py-4 text-xs font-bold uppercase tracking-wider text-zinc-500">Carry Cost Per Acre</td>
                  {compareList.map((prop) => (
                    <td key={`ppa-${prop.id}`} className="py-4 px-6 font-mono text-zinc-900">
                      ${Math.round(prop.pricePerAcres).toLocaleString()} / Acre
                    </td>
                  ))}
                  {Array.from({ length: Math.max(0, 3 - compareList.length) }).map((_, i) => (
                    <td key={`empty-ppa-${i}`} className="py-4 px-6"></td>
                  ))}
                </tr>

                {/* Category */}
                <tr>
                  <td className="py-4 text-xs font-bold uppercase tracking-wider text-zinc-500">Asset Category</td>
                  {compareList.map((prop) => (
                    <td key={`cat-${prop.id}`} className="py-4 px-6">
                      <span className="inline-block px-2.5 py-1 rounded bg-[#E53935]/10 text-[#E53935] text-xs font-bold">
                        {prop.category}
                      </span>
                    </td>
                  ))}
                  {Array.from({ length: Math.max(0, 3 - compareList.length) }).map((_, i) => (
                    <td key={`empty-cat-${i}`} className="py-4 px-6"></td>
                  ))}
                </tr>

                {/* Zoning code */}
                <tr>
                  <td className="py-4 text-xs font-bold uppercase tracking-wider text-zinc-500">Zoning Class</td>
                  {compareList.map((prop) => (
                    <td key={`zone-${prop.id}`} className="py-4 px-6 font-mono text-zinc-900">
                      {prop.zoning}
                    </td>
                  ))}
                  {Array.from({ length: Math.max(0, 3 - compareList.length) }).map((_, i) => (
                    <td key={`empty-zone-${i}`} className="py-4 px-6"></td>
                  ))}
                </tr>

                {/* Slope terrain */}
                <tr>
                  <td className="py-4 text-xs font-bold uppercase tracking-wider text-zinc-500">Slope Terrain</td>
                  {compareList.map((prop) => (
                    <td key={`slope-${prop.id}`} className="py-4 px-6 text-zinc-900">
                      {prop.slope}
                    </td>
                  ))}
                  {Array.from({ length: Math.max(0, 3 - compareList.length) }).map((_, i) => (
                    <td key={`empty-slope-${i}`} className="py-4 px-6"></td>
                  ))}
                </tr>

                {/* Utility Infrastructure */}
                <tr>
                  <td className="py-4 text-xs font-bold uppercase tracking-wider text-zinc-500">Infrastructure Grid</td>
                  {compareList.map((prop) => (
                    <td key={`infra-${prop.id}`} className="py-4 px-6">
                      <div className="flex flex-col space-y-1 text-xs">
                        <span className="flex items-center space-x-1.5">
                          {prop.waterRights ? <Check className="h-3.5 w-3.5 text-green-600" /> : <X className="h-3.5 w-3.5 text-red-500" />}
                          <span className={prop.waterRights ? "text-zinc-900" : "text-zinc-400"}>Water Rights</span>
                        </span>
                        <span className="flex items-center space-x-1.5">
                          {prop.roadAccess ? <Check className="h-3.5 w-3.5 text-green-600" /> : <X className="h-3.5 w-3.5 text-red-500" />}
                          <span className={prop.roadAccess ? "text-zinc-900" : "text-zinc-400"}>Paved Road Access</span>
                        </span>
                        <span className="flex items-center space-x-1.5">
                          {prop.electricity ? <Check className="h-3.5 w-3.5 text-green-600" /> : <X className="h-3.5 w-3.5 text-red-500" />}
                          <span className={prop.electricity ? "text-zinc-900" : "text-zinc-400"}>Electricity Hooked</span>
                        </span>
                      </div>
                    </td>
                  ))}
                  {Array.from({ length: Math.max(0, 3 - compareList.length) }).map((_, i) => (
                    <td key={`empty-infra-${i}`} className="py-4 px-6"></td>
                  ))}
                </tr>

                {/* Verification */}
                <tr>
                  <td className="py-4 text-xs font-bold uppercase tracking-wider text-zinc-500">Title Deed Verification</td>
                  {compareList.map((prop) => (
                    <td key={`ver-${prop.id}`} className="py-4 px-6 text-zinc-900">
                      {prop.verified ? (
                        <span className="text-green-600 font-bold flex items-center space-x-1">
                          <Check className="h-4 w-4" />
                          <span>100% Aura Audited</span>
                        </span>
                      ) : (
                        <span className="text-amber-600 text-xs font-semibold">Pending Escrow Desk Review</span>
                      )}
                    </td>
                  ))}
                  {Array.from({ length: Math.max(0, 3 - compareList.length) }).map((_, i) => (
                    <td key={`empty-ver-${i}`} className="py-4 px-6"></td>
                  ))}
                </tr>

                {/* Actions */}
                <tr>
                  <td className="py-4 text-xs font-bold uppercase tracking-wider text-zinc-500">Actions</td>
                  {compareList.map((prop) => (
                    <td key={`act-${prop.id}`} className="py-4 px-6">
                      <button
                        onClick={() => onViewDetails(prop)}
                        className="w-full rounded bg-[#E53935] hover:bg-[#D32F2F] text-[#FAFAFA] font-bold text-xs uppercase py-2 tracking-wider transition-colors cursor-pointer"
                      >
                        Deep Dive Dossier
                      </button>
                    </td>
                  ))}
                  {Array.from({ length: Math.max(0, 3 - compareList.length) }).map((_, i) => (
                    <td key={`empty-act-${i}`} className="py-4 px-6"></td>
                  ))}
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
