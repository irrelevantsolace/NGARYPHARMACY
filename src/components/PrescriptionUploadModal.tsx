import React, { useState } from 'react';
import { 
  X, 
  UploadCloud, 
  MessageCircle, 
  CheckCircle2, 
  ShieldAlert, 
  FileText, 
  Phone,
  Image as ImageIcon
} from 'lucide-react';
import { PharmacyStore } from '../types/pharmacy';
import { PHARMACY_PHONE, PHARMACY_WHATSAPP } from '../data/stores';

interface PrescriptionUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedStore: PharmacyStore;
}

export const PrescriptionUploadModal: React.FC<PrescriptionUploadModalProps> = ({
  isOpen,
  onClose,
  selectedStore,
}) => {
  if (!isOpen) return null;

  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [additionalNotes, setAdditionalNotes] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendToWhatsApp = () => {
    const textLines = [
      `*Ngary Pharmacy - Prescription Verification Request*`,
      `*Branch:* ${selectedStore.name} (${selectedStore.location})`,
      patientName.trim() ? `*Patient Name:* ${patientName.trim()}` : null,
      patientPhone.trim() ? `*Phone:* ${patientPhone.trim()}` : null,
      additionalNotes.trim() ? `*Notes / Requirements:* ${additionalNotes.trim()}` : null,
      ``,
      `Hello Pharmacist, I have a doctor's prescription for filling. I am attaching the photo now for you to check stock and calculate total cost.`,
    ].filter(Boolean);

    const encoded = encodeURIComponent(textLines.join('\n'));
    const url = `https://wa.me/${selectedStore.whatsappNumber}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-800 to-emerald-800 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">
                Prescription Fill & Review
              </h3>
              <p className="text-xs text-teal-200">
                Send a photo on WhatsApp for instant pharmacist check
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

        {/* Form Body */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-xs sm:text-sm">
          
          {/* Prompt compliance note */}
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs">
            <strong className="block font-bold mb-0.5">What we do:</strong>
            <p className="text-emerald-800">
              Bring your prescription or send a photo on WhatsApp. A pharmacist checks it and prepares your order.
            </p>
          </div>

          {/* Valid Prescription checklist */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 space-y-1.5 text-xs text-slate-700">
            <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-emerald-600" />
              <span>Valid prescription requirements:</span>
            </h4>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Doctor / Medical Officer name, clinic stamp & signature</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Patient full name and issue date</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Clearly legible medicine name, strength, dosage and duration</span>
            </div>
          </div>

          {/* Photo attachment preview */}
          <div>
            <label className="block font-bold text-slate-800 text-xs mb-1.5">
              Select or take a photo of your prescription:
            </label>
            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-4 text-center hover:border-emerald-500 transition-colors bg-white">
              {filePreview ? (
                <div className="space-y-2">
                  <img
                    src={filePreview}
                    alt="Prescription preview"
                    className="max-h-48 mx-auto rounded-lg object-contain shadow-xs border border-slate-200"
                  />
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-xs font-semibold text-emerald-700">Photo attached</span>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFile(null);
                        setFilePreview(null);
                      }}
                      className="text-xs text-rose-600 hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <label className="cursor-pointer block py-4">
                  <UploadCloud className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                  <span className="font-bold text-xs text-slate-800 block">
                    Click to browse or snap prescription photo
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-1">
                    JPEG, PNG, PDF up to 10MB
                  </span>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Patient Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Patient Name:
              </label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Patient's name"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Phone Number:
              </label>
              <input
                type="tel"
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                placeholder="e.g. 0712 345 678"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1 text-xs">
              Special instructions or allergies:
            </label>
            <input
              type="text"
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              placeholder="e.g. Allergic to penicillin, please advise generic pricing"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 outline-none focus:border-emerald-600 text-xs"
            />
          </div>

          <div className="p-3 rounded-lg bg-slate-100 text-[11px] text-slate-600">
            <strong>Target branch:</strong> {selectedStore.name} ({selectedStore.location})
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-5 bg-slate-50 border-t border-slate-200 space-y-2">
          <button
            onClick={handleSendToWhatsApp}
            className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] cursor-pointer"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Send Prescription on WhatsApp to Pharmacist</span>
          </button>

          <div className="text-center">
            <span className="text-[11px] text-slate-500">
              Or speak with our duty pharmacist right now: 
              <a href={`tel:${PHARMACY_PHONE.replace(/\s+/g, '')}`} className="ml-1 text-emerald-700 font-bold hover:underline">
                Call {PHARMACY_PHONE}
              </a>
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
