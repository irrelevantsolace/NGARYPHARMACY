import React from 'react';
import { Phone, MessageCircle, ShieldCheck, MapPin, Heart } from 'lucide-react';
import { PHARMACY_PHONE, PHARMACY_WHATSAPP } from '../data/stores';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 pb-10 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-black text-lg">
                ✚
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Ngary<span className="text-emerald-400">Pharmacy</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Find your medicine and see the price before you walk in. Search our shelf list, add what you need and send the list to your nearest store on WhatsApp.
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 text-emerald-400 text-[11px] font-semibold border border-slate-700">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>PPB Registered & Licensed</span>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
              Explore
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#medicines" className="hover:text-emerald-400 transition-colors">
                  Medicines & Shelf Prices
                </a>
              </li>
              <li>
                <a href="#your-list" className="hover:text-emerald-400 transition-colors">
                  Your List (WhatsApp Order)
                </a>
              </li>
              <li>
                <a href="#stores" className="hover:text-emerald-400 transition-colors">
                  Our stores & Locations
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-emerald-400 transition-colors">
                  Services (Prescriptions, M-Pesa, Advice)
                </a>
              </li>
            </ul>
          </div>

          {/* Stores */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
              Branches (Nairobi)
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <span className="text-slate-200 font-semibold">Westlands:</span> Mpaka Rd (Open 24/7)
              </li>
              <li>
                <span className="text-slate-200 font-semibold">CBD Central:</span> Kimathi St Corner House
              </li>
              <li>
                <span className="text-slate-200 font-semibold">Kilimani:</span> Adlife Plaza Ground Floor
              </li>
              <li>
                <span className="text-slate-200 font-semibold">Karen:</span> The Hub Shopping Centre
              </li>
              <li>
                <span className="text-slate-200 font-semibold">Mombasa Rd:</span> Nextgen Mall South C
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
              Speak with a Pharmacist
            </h4>
            <p className="text-slate-400">
              Have questions about dosage or urgent medication stock? Call or message us directly.
            </p>
            <div className="space-y-2 pt-1">
              <a
                href={`tel:${PHARMACY_PHONE.replace(/\s+/g, '')}`}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-700 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Call {PHARMACY_PHONE}</span>
              </a>

              <a
                href={`https://wa.me/${PHARMACY_WHATSAPP}?text=${encodeURIComponent('Hello Amani Pharmacy, I would like to enquire about medicine prices.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-700 text-white font-bold hover:bg-emerald-600 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp 0110 342 455</span>
              </a>
            </div>
          </div>

        </div>

        {/* EXACT PROMPT MANDATORY DISCLAIMER LINE */}
        <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 text-center text-xs sm:text-sm text-slate-300 font-medium leading-relaxed mb-6">
          <p>
            · Licensed pharmacy. Call 0110 342 455. Prices in Kenya shillings (KES) and subject to change. Medicines marked Rx are sold only with a valid prescription. This site gives general information and is not medical advice.
          </p>
        </div>

        {/* Bottom copyright & emergency */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 pt-4">
          <p>© {new Date().getFullYear()} Ngary Community Pharmacy Ltd. All rights reserved.</p>
          <p className="flex items-center gap-1 text-slate-400">
            <span>In case of severe medical emergencies, dial 999 or visit the nearest hospital emergency department.</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
