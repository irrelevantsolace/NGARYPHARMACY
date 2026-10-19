export type MedicineCategory =
  | 'All'
  | 'Pain & Fever'
  | 'Antibiotics & Anti-infectives'
  | 'Cough, Cold & Allergy'
  | 'Chronic & Heart (Hypertension/Diabetes)'
  | 'Stomach & Digestion'
  | 'Skin & Topicals'
  | 'Vitamins & Supplements'
  | 'Maternal & Child Health'
  | 'First Aid & Antiseptics';

export type DosageForm =
  | 'Tablet'
  | 'Capsule'
  | 'Syrup'
  | 'Suspension'
  | 'Inhaler'
  | 'Cream/Ointment'
  | 'Eye/Ear Drops'
  | 'Sachet'
  | 'Injection/Vial';

export interface Medicine {
  id: string;
  name: string;
  brand: string;
  genericName: string;
  category: MedicineCategory;
  dosageForm: DosageForm;
  strength: string;
  unitPrice: number; // in KES
  unitName: string; // e.g., 'tablet', 'bottle', 'vial', 'sachet'
  packSizeInfo: string; // e.g., 'Strip of 10 or per tablet', '100ml Bottle'
  isRx: boolean;
  inStock: boolean;
  description: string;
  indications: string[];
  dosageInstructions: string;
  storage: string;
  commonBrands?: string[];
  imagePlaceholder?: string;
}

export interface CartItem {
  medicine: Medicine;
  quantity: number;
  notes?: string;
}

export interface PharmacyStore {
  id: string;
  name: string;
  location: string;
  address: string;
  landmark: string;
  hours: string;
  isOpen24Hours: boolean;
  phone: string;
  whatsappNumber: string; // international without '+' e.g. "254110342455"
  services: string[];
  isPopular?: boolean;
}
