import React, { useState } from 'react';
import { 
  X, 
  ShieldAlert, 
  Check, 
  Info, 
  AlertTriangle, 
  Pill, 
  Plus, 
  Minus,
  Clock,
  Sparkles
} from 'lucide-react';
import { Medicine } from '../types/pharmacy';

interface MedicineDetailModalProps {
  medicine: Medicine | null;
  onClose: () => void;
  onAddToCart: (medicine: Medicine, quantity: number) => void;
  currentCartQty: number;
}

export const MedicineDetailModal: React.FC<MedicineDetailModalProps> = ({
  medicine,
  onClose,
  onAddToCart,
  currentCartQty,
}) => {
  if (!medicine) return null;

  const [quantity, setQuantity] = useState(currentCartQty > 0 ? currentCartQty : 1);

  const handleAdd = () => {
    onAddToCart(medicine, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-sm">
              ✚
            </span>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                {medicine.category}
              </span>
              <h3 className="font-extrabold text-slate-900 text-lg leading-tight">
                {medicine.name}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-xs sm:text-sm text-slate-700">
          
          {/* Rx / OTC Badge & Price Alert */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
            <div>
              <span className="text-xs text-slate-500 block">Single Unit Price</span>
              <span className="text-xl font-black text-emerald-900">
                KES {medicine.unitPrice.toLocaleString()}{' '}
                <span className="text-xs font-normal text-slate-600">/ {medicine.unitName}</span>
              </span>
            </div>

            {medicine.isRx ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-100 text-amber-900 font-extrabold text-xs border border-amber-300">
                <ShieldAlert className="w-4 h-4 text-amber-700" />
                Rx - Prescription Required
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs">
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                Over-the-Counter (No Rx)
              </span>
            )}
          </div>

          {/* Active Ingredients & Brand */}
          <div className="space-y-1">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500">
              Active Ingredient(s) & Formulation
            </h4>
            <p className="font-semibold text-slate-800 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              {medicine.genericName} ({medicine.strength})
            </p>
            <p className="text-[11px] text-slate-500">
              Manufactured / Distributed by: <strong>{medicine.brand}</strong>
            </p>
          </div>

          {/* Pack size info */}
          <div className="p-3 rounded-lg bg-slate-100 text-slate-700 text-xs">
            <strong>Packaging info:</strong> {medicine.packSizeInfo}
          </div>

          {/* Indications */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500 mb-1.5">
              Approved Indications & Uses
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {medicine.indications.map((ind, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 font-medium text-xs border border-teal-100"
                >
                  ✓ {ind}
                </span>
              ))}
            </div>
          </div>

          {/* Dosage Instructions */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500 mb-1">
              Standard Dosage Guidance
            </h4>
            <p className="p-3 rounded-xl bg-amber-50/50 border border-amber-200/60 text-slate-800 text-xs leading-relaxed">
              {medicine.dosageInstructions}
            </p>
          </div>

          {/* Storage note */}
          <div className="text-[11px] text-slate-500">
            <strong>Storage:</strong> {medicine.storage}
          </div>

          {medicine.isRx && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-900 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p>
                <strong>Prescription notice:</strong> Under Kenyan PPB laws, this medication cannot be dispensed without a valid prescription from a registered medical practitioner.
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          {/* Quantity Stepper */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600 hidden sm:inline">Qty:</span>
            <div className="flex items-center border border-slate-300 bg-white rounded-xl p-1 shadow-2xs">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-7 h-7 rounded-lg text-slate-700 hover:bg-slate-100 flex items-center justify-center font-bold cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center text-xs font-bold text-slate-900">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-7 h-7 rounded-lg text-slate-700 hover:bg-slate-100 flex items-center justify-center font-bold cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              = KES {(medicine.unitPrice * quantity).toLocaleString()}
            </span>
          </div>

          {/* Add to list button */}
          <button
            onClick={handleAdd}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add to list (KES {(medicine.unitPrice * quantity).toLocaleString()})</span>
          </button>
        </div>

      </div>
    </div>
  );
};
