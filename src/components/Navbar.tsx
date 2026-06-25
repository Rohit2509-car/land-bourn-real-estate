import React, { useState } from "react";
import { Compass, Menu, X, ShieldCheck, User } from "lucide-react";

interface NavbarProps {
  onScrollToSection: (sectionId: string) => void;
  onOpenSellForm: () => void;
}

export default function Navbar({ onScrollToSection, onOpenSellForm }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginTab, setLoginTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setUserName(email.split("@")[0]);
    setShowLoginModal(false);
  };

  const navLinks = [
    { name: "Home", id: "hero" },
    { name: "Buy Land", id: "buy-land" },
    { name: "AI Advisory", id: "ai-advisory" },
    { name: "Interactive Map", id: "interactive-map" },
    { name: "How It Works", id: "how-it-works" },
    { name: "Sell Land", id: "sell-land" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/90 backdrop-blur-md">
        <div id="navbar-container" className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <div 
            onClick={() => onScrollToSection("hero")}
            className="flex cursor-pointer items-center space-x-2.5 group"
          >
            <Compass className="h-8 w-8 text-[#E53935] transition-transform duration-500 group-hover:rotate-180" />
            <span className="font-sans text-2xl font-black tracking-widest text-zinc-900">
              AURA<span className="text-[#E53935]">.</span>
              <span className="text-xs font-light tracking-widest text-[#E53935] block sm:inline sm:ml-2">LANDS</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onScrollToSection(link.id)}
                className="font-sans text-sm font-medium tracking-wide text-zinc-600 transition-colors duration-200 hover:text-[#E53935]"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-2 text-zinc-900 bg-zinc-100 px-4 py-2 rounded-lg border border-zinc-200">
                <div className="h-2 w-2 rounded-full bg-[#E53935] animate-pulse"></div>
                <span className="text-sm font-medium tracking-wider text-[#E53935]">
                  Welcome, {userName}
                </span>
                <button 
                  onClick={() => setIsLoggedIn(false)}
                  className="text-xs text-zinc-500 hover:text-[#E53935] ml-2 font-bold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setLoginTab("login");
                  setShowLoginModal(true);
                }}
                className="flex items-center space-x-2 font-sans text-sm font-semibold tracking-wide text-zinc-700 hover:text-[#E53935] transition-colors duration-200"
              >
                <User className="h-4 w-4" />
                <span>Broker Login</span>
              </button>
            )}

            <button
              onClick={onOpenSellForm}
              className="relative overflow-hidden rounded-md bg-gradient-to-r from-[#E53935] to-[#D32F2F] px-5 py-2.5 text-sm font-bold tracking-wider text-white shadow-lg transition-transform duration-300 hover:scale-105 active:scale-95"
            >
              List Your Property
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-zinc-900 hover:text-[#E53935] focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="md:hidden border-t border-zinc-200 bg-white/95 backdrop-blur-lg px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onScrollToSection(link.id);
                  setIsOpen(false);
                }}
                className="block w-full text-left font-sans text-base font-semibold text-zinc-600 hover:text-[#E53935] py-2"
              >
                {link.name}
              </button>
            ))}
            <div className="border-t border-zinc-200 pt-4 flex flex-col space-y-3">
              {isLoggedIn ? (
                <div className="text-[#E53935] text-sm">
                  Active Broker: <span className="text-zinc-900 font-bold">{userName}</span>
                  <button 
                    onClick={() => {
                      setIsLoggedIn(false);
                      setIsOpen(false);
                    }}
                    className="block text-xs text-[#E53935] mt-1 font-bold"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setLoginTab("login");
                    setShowLoginModal(true);
                    setIsOpen(false);
                  }}
                  className="flex items-center space-x-2 font-sans text-sm font-semibold text-zinc-700 hover:text-[#E53935]"
                >
                  <User className="h-4 w-4" />
                  <span>Broker Login</span>
                </button>
              )}
              <button
                onClick={() => {
                  onOpenSellForm();
                  setIsOpen(false);
                }}
                className="w-full rounded-md bg-[#E53935] py-2.5 text-center text-sm font-bold text-white"
              >
                List Your Property
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Login / Register Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl border border-[#E53935]/30 bg-white p-8 shadow-2xl">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute right-4 top-4 text-zinc-400 hover:text-zinc-900"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Tab selection */}
            <div className="mb-6 flex border-b border-zinc-200">
              <button
                onClick={() => setLoginTab("login")}
                className={`w-1/2 pb-3 text-center text-base font-bold tracking-wider ${
                  loginTab === "login"
                    ? "border-b-2 border-[#E53935] text-zinc-900"
                    : "text-zinc-500"
                }`}
              >
                Broker Login
              </button>
              <button
                onClick={() => setLoginTab("register")}
                className={`w-1/2 pb-3 text-center text-base font-bold tracking-wider ${
                  loginTab === "register"
                    ? "border-b-2 border-[#E53935] text-zinc-900"
                    : "text-zinc-500"
                }`}
              >
                Register
              </button>
            </div>

            <div className="mb-4 text-center">
              <span className="inline-flex items-center space-x-1.5 rounded-full bg-[#E53935]/10 px-3 py-1 text-xs font-semibold text-[#E53935]">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Aura Secure Auth Broker Network</span>
              </span>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="broker@auralands.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:border-[#E53935] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:border-[#E53935] focus:outline-none"
                />
              </div>

              {loginTab === "register" && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 mb-1">
                    Brokerage License ID
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="BRE #01928420"
                    className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:border-[#E53935] focus:outline-none"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-lg bg-[#E53935] py-3 text-sm font-bold tracking-widest text-white uppercase transition-colors hover:bg-[#D32F2F]"
              >
                {loginTab === "login" ? "Access Vault" : "Create Professional Profile"}
              </button>
            </form>

            <p className="mt-4 text-center text-xs text-zinc-500">
              By proceeding, you agree to Aura Lands' strict confidentiality standard and double-authenticated escrow agreements.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
