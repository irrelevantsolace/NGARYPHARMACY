import React from 'react';
import { 
  Search, 
  MessageCircle, 
  CheckCircle2, 
  ShieldAlert, 
  Store, 
  CreditCard,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { PharmacyStore } from '../types/pharmacy';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedStore: PharmacyStore;
  onSelectStoreClick: () => void;
  onOpenPrescriptionModal: () => void;
  onCategorySelect: (category: string) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  selectedStore,
  onSelectStoreClick,
  onOpenPrescriptionModal,
  onCategorySelect,
  cartCount,
  onOpenCart,
}) => {
  const quickSearches = [
    'Panadol Extra',
    'Augmentin',
    'Cetirizine',
    'Ventolin',
    'Omeprazole',
    'Coartem Malaria',
    'Calpol Syrup',
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-slate-50 pt-8 pb-12 sm:pt-14 sm:pb-16 border-b border-slate-200/60">
      {/* Subtle background decorative shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-teal-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center">
          
          {/* Tag badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/90 text-emerald-800 text-xs font-semibold mb-5 shadow-xs border border-emerald-200/60">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>Nairobi Live Shelf List & Counter Reserve</span>
          </div>

          {/* Exact Prompt H1 */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.18] sm:leading-[1.15]">
            Find your medicine and see the price before you walk in.
          </h1>

          {/* Exact Prompt Subtitle */}
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Search our shelf list, add what you need and send the list to your nearest store on WhatsApp. We confirm stock and have it ready for pick-up.
          </p>

          {/* Search Bar Input */}
          <div className="mt-7 sm:mt-8 relative max-w-2xl mx-auto">
            <div className="relative flex items-center shadow-lg rounded-2xl bg-white border-2 border-emerald-500/40 focus-within:border-emerald-600 focus-within:ring-4 focus-within:ring-emerald-500/15 transition-all">
              <div className="pl-4 sm:pl-5 text-emerald-600">
                <Search className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search brand, generic name, illness (e.g. Panadol, Augmentin, Asthma, Cough)..."
                className="w-full py-4 pl-3 sm:pl-4 pr-12 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 bg-transparent outline-none rounded-2xl"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="mr-3 text-slate-400 hover:text-slate-600 p-1 text-xs font-bold bg-slate-100 hover:bg-slate-200 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick search suggestions */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs">
              <span className="text-slate-500 font-medium">Popular searches:</span>
              {quickSearches.map((item) => (
                <button
                  key={item}
                  onClick={() => onSearchChange(item)}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-emerald-500 hover:text-emerald-700 hover:bg-emerald-50/50 transition-colors cursor-pointer font-medium shadow-2xs"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#medicines"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-md transition-all active:scale-95"
            >
              <span>Browse Shelf Catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenPrescriptionModal}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-emerald-50 text-emerald-800 font-semibold text-sm border border-emerald-300 shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Have a Prescription? Send Photo</span>
            </button>

            {cartCount > 0 && (
              <button
                onClick={onOpenCart}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md shadow-emerald-600/30 transition-all active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>View List & Send on WhatsApp ({cartCount})</span>
              </button>
            )}
          </div>

          {/* Key Trust Pillars */}
          <div className="mt-10 pt-8 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-700">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Per-unit prices</h4>
                <p className="text-[11px] text-slate-500 leading-tight">Buy exact tablets or full packs</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center shrink-0 text-teal-700">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">WhatsApp reserve</h4>
                <p className="text-[11px] text-slate-500 leading-tight">Packed & verified before arrival</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0 text-amber-700">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Rx verified</h4>
                <p className="text-[11px] text-slate-500 leading-tight">Doctor scripts checked safely</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0 text-blue-700">
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">M-Pesa & Insurance</h4>
                <p className="text-[11px] text-slate-500 leading-tight">Cash, Till & Medical Cover</p>
              </div>
            </div>
          </div>

          {/* Selected Store Indicator Card */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-xs">
            <div className="flex items-center gap-2">
              <Store className="w-4 h-4 text-emerald-600" />
              <span className="text-slate-600">Selected pick-up store:</span>
              <span className="font-bold text-slate-900">{selectedStore.name}</span>
              <span className="text-emerald-700 font-medium">({selectedStore.hours})</span>
            </div>
            <button
              onClick={onSelectStoreClick}
              className="text-emerald-700 hover:text-emerald-800 font-bold hover:underline cursor-pointer"
            >
              Change Store
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
