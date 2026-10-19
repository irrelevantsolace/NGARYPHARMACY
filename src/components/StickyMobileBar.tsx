import React from 'react';
import { ShoppingBag, MessageCircle, ArrowRight } from 'lucide-react';
import { PharmacyStore } from '../types/pharmacy';

interface StickyMobileBarProps {
  itemCount: number;
  totalAmount: number;
  selectedStore: PharmacyStore;
  onOpenList: () => void;
  onSendWhatsApp: () => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({
  itemCount,
  totalAmount,
  selectedStore,
  onOpenList,
  onSendWhatsApp,
}) => {
  if (itemCount === 0) return null;

  return (
    <div className="md:hidden fixed bottom-3 left-3 right-3 z-40 animate-in slide-in-from-bottom-4">
      <div className="bg-slate-900/95 backdrop-blur-md text-white p-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center justify-between gap-2">
        <button
          onClick={onOpenList}
          className="flex items-center gap-2.5 text-left cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center font-bold text-sm shrink-0">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white">Your list ({itemCount})</span>
              <span className="text-[10px] text-emerald-300 font-medium truncate max-w-[100px]">
                • {selectedStore.location.split(',')[0]}
              </span>
            </div>
            <span className="text-sm font-extrabold text-emerald-400">
              KES {totalAmount.toLocaleString()}
            </span>
          </div>
        </button>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onOpenList}
            className="px-3 py-2 rounded-xl bg-slate-800 text-xs font-bold text-slate-200 hover:bg-slate-700 transition-colors"
          >
            Review
          </button>
          <button
            onClick={onSendWhatsApp}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-extrabold text-white flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Send list</span>
          </button>
        </div>
      </div>
    </div>
  );
};
