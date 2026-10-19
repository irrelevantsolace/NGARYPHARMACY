import React, { useState } from 'react';
import { 
  Phone, 
  ShoppingBag, 
  MapPin, 
  Clock, 
  Menu, 
  X, 
  MessageCircle,
  ShieldCheck
} from 'lucide-react';
import { PharmacyStore } from '../types/pharmacy';
import { PHARMACY_PHONE, PHARMACY_WHATSAPP } from '../data/stores';

interface NavbarProps {
  cartItemCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  selectedStore: PharmacyStore;
  onSelectStoreClick: () => void;
  onOpenPrescriptionModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItemCount,
  cartTotal,
  onOpenCart,
  selectedStore,
  onSelectStoreClick,
  onOpenPrescriptionModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Banner Alert / Store Hours info */}
      <div className="bg-emerald-900 text-emerald-100 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-700 text-white">
              PPB LICENSED
            </span>
            <span className="hidden sm:inline">Official Shelf List & Counter Reserve</span>
            <span className="text-emerald-300">•</span>
            <span className="flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5 text-emerald-300" />
              Westlands Open 24/7
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button 
              onClick={onSelectStoreClick}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-left"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-200">Pickup branch:</span>
              <span className="font-semibold underline decoration-emerald-500 underline-offset-2">
                {selectedStore.location}
              </span>
            </button>
            <span className="hidden md:inline text-emerald-600">|</span>
            <a 
              href={`tel:${PHARMACY_PHONE.replace(/\s+/g, '')}`} 
              className="hidden md:flex items-center gap-1 font-semibold text-emerald-200 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              Call {PHARMACY_PHONE}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo / Brand Name */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-700 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <span className="text-xl font-black">✚</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900">
                  Ngary<span className="text-emerald-600">Pharmacy</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Kenya
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Verified Shelf Prices & WhatsApp Pickup
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700">
            <a 
              href="#medicines" 
              className="hover:text-emerald-700 transition-colors py-1 border-b-2 border-transparent hover:border-emerald-600"
            >
              Medicines
            </a>
            <a 
              href="#stores" 
              className="hover:text-emerald-700 transition-colors py-1 border-b-2 border-transparent hover:border-emerald-600"
            >
              Our stores
            </a>
            <a 
              href="#services" 
              className="hover:text-emerald-700 transition-colors py-1 border-b-2 border-transparent hover:border-emerald-600"
            >
              Services
            </a>
            <button
              onClick={onOpenPrescriptionModal}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200/80 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              Upload Prescription (Rx)
            </button>
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${PHARMACY_PHONE.replace(/\s+/g, '')}`}
              className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              title="Call Licensed Pharmacist"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>{PHARMACY_PHONE}</span>
            </a>

            {/* Your List Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 active:scale-95 transition-all cursor-pointer"
              aria-label="View your medicine list"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-100" />
              <span className="hidden sm:inline">Your list</span>
              {cartItemCount > 0 ? (
                <span className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-white text-emerald-700 text-xs font-black flex items-center justify-center">
                    {cartItemCount}
                  </span>
                  <span className="text-xs font-medium text-emerald-100 hidden sm:inline">
                    • KES {cartTotal.toLocaleString()}
                  </span>
                </span>
              ) : (
                <span className="text-xs text-emerald-200 hidden sm:inline">(0)</span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-3 space-y-2 animate-in fade-in">
            <a
              href="#medicines"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-100"
            >
              Medicines
            </a>
            <a
              href="#stores"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-100"
            >
              Our stores
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-100"
            >
              Services
            </a>
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2 px-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPrescriptionModal();
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold bg-teal-50 text-teal-800 flex items-center justify-between"
              >
                <span>Upload / Send Prescription (Rx)</span>
                <ShieldCheck className="w-4 h-4 text-teal-600" />
              </button>
              <a
                href={`tel:${PHARMACY_PHONE.replace(/\s+/g, '')}`}
                className="w-full px-3 py-2 rounded-lg text-sm font-semibold bg-slate-100 text-slate-800 flex items-center justify-between"
              >
                <span>Call Pharmacist</span>
                <span className="font-bold text-emerald-700">{PHARMACY_PHONE}</span>
              </a>
              <a
                href={`https://wa.me/${PHARMACY_WHATSAPP}?text=${encodeURIComponent('Hello Ngary Pharmacy, I would like to enquire about medicines.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-3 py-2 rounded-lg text-sm font-semibold bg-emerald-50 text-emerald-800 flex items-center justify-between"
              >
                <span>WhatsApp Enquiry</span>
                <MessageCircle className="w-4 h-4 text-emerald-600" />
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
