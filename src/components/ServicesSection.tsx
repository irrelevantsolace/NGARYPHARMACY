import React from 'react';
import { 
  FileCheck2, 
  CreditCard, 
  Stethoscope, 
  MessageCircle, 
  Phone, 
  CheckCircle2, 
  Shield, 
  Smartphone, 
  HelpCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { PHARMACY_PHONE, PHARMACY_WHATSAPP } from '../data/stores';

interface ServicesSectionProps {
  onOpenPrescriptionModal: () => void;
  onOpenMpesaModal: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenPrescriptionModal,
  onOpenMpesaModal,
}) => {
  return (
    <section id="services" className="py-12 sm:py-20 bg-white scroll-mt-20 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Exact Heading from Prompt */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Community Healthcare & Pharmacy Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            What we do
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Professional healthcare dispensing built on trust, certified clinical pharmacists, and instant digital convenience.
          </p>
        </div>

        {/* 3 Main Service Pillars matching prompt exactly */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* 1. Prescriptions filled */}
          <div className="relative rounded-2xl p-6 sm:p-7 bg-slate-50 border border-slate-200/90 flex flex-col justify-between hover:border-emerald-500/50 hover:shadow-md transition-all">
            <div>
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-5">
                <FileCheck2 className="w-6 h-6" />
              </div>

              {/* Exact H3 */}
              <h3 className="text-xl font-extrabold text-slate-900">
                Prescriptions filled
              </h3>

              {/* Exact Prompt Text */}
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Bring your prescription or send a photo on WhatsApp. A pharmacist checks it and prepares your order.
              </p>

              <div className="mt-5 space-y-2 border-t border-slate-200 pt-4 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Doctor prescription verified by registered pharmacist</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Send clear WhatsApp photo of handwritten/printed script</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>We confirm total cost and pack before you arrive</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4">
              <button
                onClick={onOpenPrescriptionModal}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>Upload / Send Prescription</span>
              </button>
            </div>
          </div>

          {/* 2. Pay your way */}
          <div className="relative rounded-2xl p-6 sm:p-7 bg-slate-50 border border-slate-200/90 flex flex-col justify-between hover:border-emerald-500/50 hover:shadow-md transition-all">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5">
                <CreditCard className="w-6 h-6" />
              </div>

              {/* Exact H3 */}
              <h3 className="text-xl font-extrabold text-slate-900">
                Pay your way
              </h3>

              {/* Exact Prompt Text */}
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Cash, M-Pesa and insurance accepted at the till.
              </p>

              <div className="mt-5 space-y-2 border-t border-slate-200 pt-4 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>M-Pesa Buy Goods Till:</strong> Instant checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Insurance:</strong> Jubilee, APA, Britam, CIC, AAR & more</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Cash & Cards:</strong> Visa, Mastercard accepted</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4">
              <button
                onClick={onOpenMpesaModal}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-800 bg-white hover:bg-slate-100 border border-slate-200 transition-colors shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>View Payment & Insurance Details</span>
              </button>
            </div>
          </div>

          {/* 3. Advice from a pharmacist */}
          <div className="relative rounded-2xl p-6 sm:p-7 bg-slate-50 border border-slate-200/90 flex flex-col justify-between hover:border-emerald-500/50 hover:shadow-md transition-all">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-5">
                <Stethoscope className="w-6 h-6" />
              </div>

              {/* Exact H3 */}
              <h3 className="text-xl font-extrabold text-slate-900">
                Advice from a pharmacist
              </h3>

              {/* Exact Prompt Text */}
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Ask about doses, side effects and how to take your medicine safely.
              </p>

              <div className="mt-5 space-y-2 border-t border-slate-200 pt-4 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Drug interaction checks & allergy precautions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Child and elderly dosage guidance</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Free blood pressure & glucose test in-store</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 flex gap-2">
              <a
                href={`tel:${PHARMACY_PHONE.replace(/\s+/g, '')}`}
                className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call {PHARMACY_PHONE}</span>
              </a>
              <a
                href={`https://wa.me/${PHARMACY_WHATSAPP}?text=${encodeURIComponent('Hello Pharmacist, I would like to ask some questions regarding dosage and medicine safety.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                title="Ask Pharmacist on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Free Health Checks Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-emerald-800 to-teal-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              In-Store Wellness Care
            </span>
            <h4 className="text-xl font-bold">
              Free Blood Pressure & Weight Checks at All Branches
            </h4>
            <p className="text-xs text-emerald-100 max-w-xl">
              Walk in anytime during opening hours. Our pharmacists provide free clinical blood pressure screening and dietary lifestyle advice.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#stores"
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-white text-emerald-950 hover:bg-emerald-50 transition-colors shadow-sm"
            >
              Find Nearest Branch
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
