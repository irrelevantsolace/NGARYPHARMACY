import React from 'react';
import { 
  X, 
  Smartphone, 
  CreditCard, 
  ShieldCheck, 
  Banknote, 
  CheckCircle2, 
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';
import { PHARMACY_PHONE } from '../data/stores';

interface MpesaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MpesaModal: React.FC<MpesaModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [copiedTill, setCopiedTill] = React.useState(false);

  const TILL_NUMBER = '5422891';

  const copyTill = () => {
    navigator.clipboard.writeText(TILL_NUMBER);
    setCopiedTill(true);
    setTimeout(() => setCopiedTill(false), 2000);
  };

  const insurances = [
    'Jubilee Insurance',
    'APA Insurance',
    'Britam Health',
    'CIC Insurance',
    'AAR Insurance',
    'Madison Insurance',
    'SHIF / NHIF Kenya',
    'UAP Old Mutual',
    'First Assurance',
    'Heritage Insurance',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">
                Pay your way
              </h3>
              <p className="text-xs text-emerald-200">
                Cash, M-Pesa and insurance accepted at the till
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto text-xs sm:text-sm text-slate-700">
          
          {/* M-Pesa Buy Goods Box */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                  M
                </span>
                <span className="font-extrabold text-slate-900 text-sm">
                  M-Pesa Buy Goods (Till)
                </span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                No Transaction Fee
              </span>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-emerald-200 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-500 block">Buy Goods Till Number:</span>
                <span className="text-xl font-black text-slate-900 tracking-wider">
                  {TILL_NUMBER}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  Store Name: <strong>NGARY PHARMACY LTD</strong>
                </span>
              </div>

              <button
                onClick={copyTill}
                className="px-3 py-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedTill ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedTill ? 'Copied' : 'Copy Till'}</span>
              </button>
            </div>

            <div className="text-[11px] text-slate-600 space-y-1">
              <p>1. Go to <strong>Lipa na M-Pesa</strong> &gt; <strong>Buy Goods and Services</strong></p>
              <p>2. Enter Till: <strong>{TILL_NUMBER}</strong></p>
              <p>3. Enter Amount confirmed by pharmacist and input your M-Pesa PIN.</p>
            </div>
          </div>

          {/* Insurance Acceptance */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Medical Insurance Accepted at the Till</span>
            </div>
            <p className="text-xs text-slate-600">
              Present your physical or digital medical card at any of our branches. We process instant biometric & portal authorizations.
            </p>
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              {insurances.map((ins, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs bg-slate-50 p-2 rounded-lg border border-slate-200 text-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{ins}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cash & Cards */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Banknote className="w-4 h-4 text-slate-700" />
              <span>Cash & Debit / Credit Cards</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              We accept Kenya Shillings (KES) cash at all till points, as well as Visa, Mastercard, and contactless tap-to-pay cards with immediate receipt issue.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Billing inquiries? Call <strong>{PHARMACY_PHONE}</strong>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
