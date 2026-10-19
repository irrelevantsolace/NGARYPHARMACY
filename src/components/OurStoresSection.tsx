import React from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  MessageCircle, 
  Check, 
  Building2, 
  Navigation,
  ShieldCheck
} from 'lucide-react';
import { PharmacyStore } from '../types/pharmacy';
import { PHARMACY_PHONE, PHARMACY_STORES } from '../data/stores';

interface OurStoresSectionProps {
  selectedStore: PharmacyStore;
  onSelectStore: (store: PharmacyStore) => void;
}

export const OurStoresSection: React.FC<OurStoresSectionProps> = ({
  selectedStore,
  onSelectStore,
}) => {
  return (
    <section id="stores" className="py-12 sm:py-16 bg-slate-50 scroll-mt-20 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Exact Heading from Prompt */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-2">
            <Building2 className="w-4 h-4" />
            <span>Nairobi Locations</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Our stores
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Find your nearest Ngary Pharmacy branch. Send your list in advance on WhatsApp and we will have your medicines packed, checked, and ready for swift counter collection.
          </p>
        </div>

        {/* Store Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PHARMACY_STORES.map((store) => {
            const isSelected = selectedStore.id === store.id;

            return (
              <div
                key={store.id}
                className={`rounded-2xl bg-white border transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-2xs hover:shadow-md ${
                  isSelected
                    ? 'border-emerald-600 ring-2 ring-emerald-600/20'
                    : 'border-slate-200'
                }`}
              >
                <div className="p-5 sm:p-6 flex-1">
                  
                  {/* Top Header */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                        {store.location}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                        {store.name}
                      </h3>
                    </div>

                    {store.isOpen24Hours ? (
                      <span className="px-2.5 py-1 rounded-full text-xs font-black bg-emerald-600 text-white shadow-2xs">
                        24/7 OPEN
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                        Open Daily
                      </span>
                    )}
                  </div>

                  {/* Address & Landmark */}
                  <div className="space-y-2 mt-4 text-xs text-slate-600">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-slate-800">{store.address}</p>
                        <p className="text-slate-500 mt-0.5">{store.landmark}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-slate-800">Hours:</p>
                        <p className="text-slate-600">{store.hours}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Phone className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-slate-800">Direct Branch Line:</p>
                        <a 
                          href={`tel:${store.phone.replace(/\s+/g, '')}`}
                          className="text-emerald-700 hover:underline font-bold"
                        >
                          {store.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Services Available */}
                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Branch Services:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {store.services.map((srv, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-100"
                        >
                          {srv}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Card Actions */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectStore(store)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      isSelected
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Selected Store</span>
                      </>
                    ) : (
                      <span>Select for Pick-up</span>
                    )}
                  </button>

                  <a
                    href={`https://wa.me/${store.whatsappNumber}?text=${encodeURIComponent(`Hello ${store.name}, I would like to check medicine availability.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-colors"
                    title="Chat on WhatsApp with this branch"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

        {/* Central Hotline reminder card */}
        <div className="mt-8 p-5 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Central Pharmacist Line: {PHARMACY_PHONE}</h4>
              <p className="text-xs text-slate-500">Need directions or want to speak with the on-duty pharmacist directly?</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`tel:${PHARMACY_PHONE.replace(/\s+/g, '')}`}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors"
            >
              Call 0110 342 455
            </a>
            <a
              href={`https://wa.me/254110342455?text=${encodeURIComponent('Hello Pharmacist, I have a question regarding my medication.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
