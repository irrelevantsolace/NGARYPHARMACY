import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  MessageCircle, 
  ShieldAlert, 
  MapPin, 
  Copy, 
  Check, 
  Printer, 
  Clock, 
  AlertCircle,
  FileText
} from 'lucide-react';
import { CartItem, PharmacyStore } from '../types/pharmacy';
import { PHARMACY_PHONE, PHARMACY_STORES } from '../data/stores';

interface YourListSectionProps {
  cart: CartItem[];
  onUpdateQuantity: (medicineId: string, quantity: number) => void;
  onRemoveItem: (medicineId: string) => void;
  onClearCart: () => void;
  selectedStore: PharmacyStore;
  onStoreChange: (store: PharmacyStore) => void;
  onOpenPrescriptionModal: () => void;
}

export const YourListSection: React.FC<YourListSectionProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  selectedStore,
  onStoreChange,
  onOpenPrescriptionModal,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [hasPrescriptionPhoto, setHasPrescriptionPhoto] = useState(true);
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);

  // Totals
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cart.reduce((acc, item) => acc + item.medicine.unitPrice * item.quantity, 0);
  const hasRxItems = cart.some((item) => item.medicine.isRx);

  // Generate WhatsApp formatted text
  const generateWhatsAppMessage = () => {
    const lines = [
      `*Ngary Pharmacy - Medicine Reservation Order*`,
      `*Store for Pick-up:* ${selectedStore.name} (${selectedStore.location})`,
      customerName.trim() ? `*Customer:* ${customerName.trim()}` : null,
      customerPhone.trim() ? `*Phone:* ${customerPhone.trim()}` : null,
      ``,
      `*ITEMS REQUESTED:*`,
      ...cart.map((item, idx) => {
        const rxTag = item.medicine.isRx ? ' [Rx Required]' : '';
        const itemTotal = item.medicine.unitPrice * item.quantity;
        return `${idx + 1}. ${item.medicine.name} (${item.quantity} ${item.medicine.unitName}${item.quantity > 1 ? 's' : ''})${rxTag} - KES ${itemTotal.toLocaleString()}`;
      }),
      ``,
      `*Estimated Shelf Total:* KES ${totalAmount.toLocaleString()}`,
      hasRxItems
        ? `⚠️ *Note:* List contains prescription (Rx) item(s). I will attach my doctor prescription photo in this chat.`
        : null,
      notes.trim() ? `*Customer Note:* ${notes.trim()}` : null,
      ``,
      `Please confirm stock availability and have it ready for pick-up. Thank you!`,
    ].filter(Boolean);

    return lines.join('\n');
  };

  const handleSendWhatsApp = () => {
    const message = generateWhatsAppMessage();
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${selectedStore.whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyList = () => {
    const message = generateWhatsAppMessage();
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="your-list" className="py-12 sm:py-16 bg-white scroll-mt-20 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-1">
              <ShoppingBag className="w-4 h-4" />
              <span>Counter Pick-up & WhatsApp Checkout</span>
            </div>
            {/* Exact Heading from Prompt */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Your list
            </h2>
          </div>

          {cart.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyList}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                title="Copy formatted text to clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy List'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                title="Print list for counter"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>

              <button
                onClick={onClearCart}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline px-2 py-1 cursor-pointer"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Exact Prompt Required Disclaimer */}
        <div className="my-5 p-4 rounded-xl bg-amber-50/80 border border-amber-200/90 text-amber-950 text-xs sm:text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <p className="font-semibold text-amber-900">
              Prices are per single unit (one tablet, one vial, one bottle) and are confirmed by the pharmacist. Items marked Rx need a valid prescription.
            </p>
            <p className="text-amber-800 text-xs mt-1">
              You pay nothing online. Pay at the counter via M-Pesa, Cash, or Insurance when collecting your medicines.
            </p>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="py-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
              <ShoppingBag className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Your list is currently empty</h3>
            <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
              Search our medicines above and click <strong>"Add to list"</strong> to check prices and prepare your WhatsApp pick-up request.
            </p>
            <div className="mt-5">
              <a
                href="#medicines"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-sm"
              >
                Browse Medicines
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* List Items Table / Cards */}
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-2xs">
              <div className="bg-slate-50/90 px-4 py-2.5 text-xs font-bold text-slate-600 uppercase tracking-wider grid grid-cols-12 gap-2">
                <span className="col-span-6 sm:col-span-6">Medicine Item</span>
                <span className="col-span-3 sm:col-span-3 text-center">Quantity</span>
                <span className="col-span-3 sm:col-span-3 text-right">Subtotal (KES)</span>
              </div>

              {cart.map((item) => {
                const subtotal = item.medicine.unitPrice * item.quantity;
                return (
                  <div key={item.medicine.id} className="p-4 grid grid-cols-12 gap-2 items-center hover:bg-slate-50/50 transition-colors">
                    
                    {/* Item info */}
                    <div className="col-span-6 sm:col-span-6">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">
                          {item.medicine.name}
                        </span>
                        {item.medicine.isRx && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-black bg-amber-100 text-amber-800 border border-amber-300">
                            Rx
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500">
                        KES {item.medicine.unitPrice.toLocaleString()} per {item.medicine.unitName}
                      </p>
                    </div>

                    {/* Quantity controls */}
                    <div className="col-span-3 sm:col-span-3 flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => onUpdateQuantity(item.medicine.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 flex items-center justify-center font-bold transition-colors cursor-pointer"
                        title="Reduce"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-7 text-center text-xs font-bold text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.medicine.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 flex items-center justify-center font-bold transition-colors cursor-pointer"
                        title="Increase"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onRemoveItem(item.medicine.id)}
                        className="ml-1 text-slate-400 hover:text-rose-600 p-1 cursor-pointer transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="col-span-3 sm:col-span-3 text-right">
                      <span className="font-extrabold text-slate-900 text-sm">
                        KES {subtotal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Total Row */}
              <div className="bg-slate-50 px-4 py-4 flex items-center justify-between border-t border-slate-200">
                <div className="text-xs text-slate-500">
                  Total items: <strong>{totalItems}</strong>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 mr-2">Estimated Shelf Total:</span>
                  <span className="text-xl font-extrabold text-emerald-800">
                    KES {totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Prescription Reminder Alert if Rx is present */}
            {hasRxItems && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-900">
                <div className="flex items-start gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">Prescription verification needed</strong>
                    <span>Your list includes prescription-only medication. Have your doctor’s script photo ready to attach in the WhatsApp chat.</span>
                  </div>
                </div>
                <button
                  onClick={onOpenPrescriptionModal}
                  className="px-3 py-1.5 rounded-lg bg-amber-200 hover:bg-amber-300 font-bold text-amber-900 transition-colors shrink-0 cursor-pointer"
                >
                  View Rx Requirements
                </button>
              </div>
            )}

            {/* Store Selection & Customer details */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Select Pick-up Branch:</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PHARMACY_STORES.map((store) => {
                  const isSelected = selectedStore.id === store.id;
                  return (
                    <button
                      key={store.id}
                      type="button"
                      onClick={() => onStoreChange(store)}
                      className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-50/80 border-emerald-600 ring-2 ring-emerald-600/20 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-900">{store.name}</span>
                        {store.isOpen24Hours && (
                          <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                            24/7
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{store.address}</p>
                      <p className="text-[10px] text-emerald-700 font-medium mt-1">{store.hours}</p>
                    </button>
                  );
                })}
              </div>

              {/* Optional customer info */}
              <div className="pt-2 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Your Name (Optional for counter reserve):
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Mary Wanjiku"
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Phone / WhatsApp number (Optional):
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. 0712 345 678"
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1 text-xs">
                  Pharmacist Note or Questions (Optional):
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Prefer generic version if cheaper, or ask about pediatric dosage"
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-600 text-xs"
                />
              </div>
            </div>

            {/* Prominent Action Button matching Prompt: "Send to [Send list on WhatsApp](#)" */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-lg space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-emerald-200">
                    Send to {selectedStore.name}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black mt-0.5">
                    Ready to pick up?
                  </h3>
                  <p className="text-xs text-emerald-100 mt-1">
                    Click below to open WhatsApp with your itemised list pre-written.
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs text-emerald-200 block">Total at Counter</span>
                  <span className="text-2xl sm:text-3xl font-black">
                    KES {totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Exact WhatsApp button link */}
              <div>
                <button
                  onClick={handleSendWhatsApp}
                  className="w-full py-4 px-6 rounded-xl bg-white hover:bg-emerald-50 text-emerald-900 font-extrabold text-base flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all active:scale-[0.99] cursor-pointer"
                >
                  <MessageCircle className="w-6 h-6 text-emerald-600 fill-emerald-600" />
                  <span>Send list on WhatsApp</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-emerald-100 pt-2 border-t border-emerald-500/60">
                <span>Direct WhatsApp: <strong>+{selectedStore.whatsappNumber}</strong></span>
                <span>Branch Hotline: <strong>{PHARMACY_PHONE}</strong></span>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
