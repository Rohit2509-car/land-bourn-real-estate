import React, { useState } from "react";
import { Menu, X, ShieldCheck, User, Home, Map, TrendingUp } from "lucide-react";

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
    { name: "Home", id: "hero", icon: Home, animClass: "animate-hover-bounce" },
    { name: "Buy Land", id: "buy-land", icon: Map, animClass: "animate-hover-pulse" },
    { name: "Sell Land", id: "sell-land", icon: TrendingUp, animClass: "animate-hover-wiggle" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white">
        <div id="navbar-container" className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8 relative">
          {/* Logo */}
          <div 
            onClick={() => onScrollToSection("hero")}
            className="flex cursor-pointer items-center space-x-3 group"
          >
            <img 
              src="/logo.jpg" 
              alt="Land Bourn Real Estate" 
              className="h-12 w-auto rounded transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-0.5"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center space-x-10">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => onScrollToSection(link.id)}
                  className="relative flex items-center space-x-2 font-sans text-base font-semibold tracking-wide text-zinc-700 hover:text-[#E53935] transition-colors duration-300 py-1.5 cursor-pointer group"
                >
                  <Icon className={`h-4.5 w-4.5 text-zinc-400 group-hover:text-[#E53935] transition-colors duration-300 ${link.animClass}`} />
                  <span>{link.name}</span>
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#E53935] scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </button>
              );
            })}
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
                className="flex items-center space-x-2 font-sans text-sm font-semibold tracking-wide text-zinc-700 hover:text-[#E53935] transition-colors duration-200 group cursor-pointer"
              >
                <User className="h-4 w-4 text-zinc-400 group-hover:text-[#E53935] transition-colors duration-200 animate-hover-pulse" />
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
              className="text-zinc-900 hover:text-[#E53935] focus:outline-none transition-transform duration-300 hover:scale-110 active:scale-95 cursor-pointer group"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6 transition-transform duration-300 group-hover:rotate-90" />
              ) : (
                <Menu className="h-6 w-6 transition-transform duration-300 group-hover:scale-y-75" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="md:hidden border-t border-zinc-200 bg-white/95 backdrop-blur-lg px-6 py-4 space-y-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    onScrollToSection(link.id);
                    setIsOpen(false);
                  }}
                  className="flex items-center space-x-3 w-full text-left font-sans text-lg font-bold text-zinc-700 hover:text-[#E53935] py-2.5 transition-colors duration-200 group"
                >
                  <Icon className={`h-5 w-5 text-zinc-400 group-hover:text-[#E53935] transition-colors duration-200 ${link.animClass}`} />
                  <span>{link.name}</span>
                </button>
              );
            })}
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
                  className="flex items-center space-x-2 font-sans text-sm font-semibold text-zinc-700 hover:text-[#E53935] group cursor-pointer"
                >
                  <User className="h-4 w-4 text-zinc-400 group-hover:text-[#E53935] transition-colors duration-200 animate-hover-pulse" />
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
                <span>Land Bourn Secure Auth Broker Network</span>
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
                  placeholder="broker@landbourn.com"
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
              By proceeding, you agree to Land Bourn's strict confidentiality standard and double-authenticated escrow agreements.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
