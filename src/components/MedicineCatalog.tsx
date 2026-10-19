import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Info, 
  Plus, 
  Minus, 
  ShieldAlert, 
  Check, 
  Pill, 
  Sparkles,
  ArrowUpDown
} from 'lucide-react';
import { Medicine, MedicineCategory, DosageForm, CartItem } from '../types/pharmacy';

interface MedicineCatalogProps {
  medicines: Medicine[];
  cart: CartItem[];
  onAddToCart: (medicine: Medicine, quantity?: number) => void;
  onUpdateQuantity: (medicineId: string, quantity: number) => void;
  onSelectMedicineDetails: (medicine: Medicine) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCategory: MedicineCategory;
  onCategoryChange: (cat: MedicineCategory) => void;
}

const CATEGORIES: MedicineCategory[] = [
  'All',
  'Pain & Fever',
  'Antibiotics & Anti-infectives',
  'Cough, Cold & Allergy',
  'Chronic & Heart (Hypertension/Diabetes)',
  'Stomach & Digestion',
  'Skin & Topicals',
  'Vitamins & Supplements',
  'Maternal & Child Health',
  'First Aid & Antiseptics',
];

export const MedicineCatalog: React.FC<MedicineCatalogProps> = ({
  medicines,
  cart,
  onAddToCart,
  onUpdateQuantity,
  onSelectMedicineDetails,
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
}) => {
  const [rxFilter, setRxFilter] = useState<'all' | 'otc' | 'rx'>('all');
  const [selectedDosage, setSelectedDosage] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');

  // Quick lookup of quantities in cart
  const cartQuantityMap = useMemo(() => {
    const map = new Map<string, number>();
    cart.forEach((item) => {
      map.set(item.medicine.id, item.quantity);
    });
    return map;
  }, [cart]);

  // Filtering & Sorting
  const filteredMedicines = useMemo(() => {
    return medicines
      .filter((med) => {
        // Category filter
        if (activeCategory !== 'All' && med.category !== activeCategory) {
          return false;
        }

        // Rx filter
        if (rxFilter === 'otc' && med.isRx) return false;
        if (rxFilter === 'rx' && !med.isRx) return false;

        // Dosage Form
        if (selectedDosage !== 'all' && med.dosageForm !== selectedDosage) {
          return false;
        }

        // Search query (name, genericName, brand, description, indications)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchesName = med.name.toLowerCase().includes(q);
          const matchesGeneric = med.genericName.toLowerCase().includes(q);
          const matchesBrand = med.brand.toLowerCase().includes(q);
          const matchesCategory = med.category.toLowerCase().includes(q);
          const matchesIndications = med.indications.some((ind) => ind.toLowerCase().includes(q));
          return matchesName || matchesGeneric || matchesBrand || matchesCategory || matchesIndications;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.unitPrice - b.unitPrice;
        if (sortBy === 'price-desc') return b.unitPrice - a.unitPrice;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0; // Default featured order
      });
  }, [medicines, activeCategory, rxFilter, selectedDosage, searchQuery, sortBy]);

  return (
    <section id="medicines" className="py-12 sm:py-16 bg-slate-50 scroll-mt-20 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-2">
              <Pill className="w-4 h-4" />
              <span>Verified Dispensary Inventory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Medicines & Shelf Prices
            </h2>
            <p className="mt-1 text-sm text-slate-600 max-w-xl">
              Prices are per single unit (one tablet, one vial, one bottle). Add items to create your WhatsApp pick-up reservation.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-xs font-semibold text-slate-500">Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-semibold bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-slate-800 pr-8 outline-none focus:border-emerald-600 cursor-pointer shadow-2xs"
              >
                <option value="featured">Featured / Common</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills (Horizontal scrollable) */}
        <div className="mb-6 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-2 min-w-max">
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-2xs ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-600/30'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sub-filters Bar (Rx vs OTC & Dosage form) */}
        <div className="mb-8 p-3 rounded-xl bg-white border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
          {/* Rx Filter Toggle */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="font-semibold text-slate-600 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              Filter:
            </span>
            <button
              onClick={() => setRxFilter('all')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                rxFilter === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setRxFilter('otc')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                rxFilter === 'otc'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Over-the-Counter (No Rx)
            </button>
            <button
              onClick={() => setRxFilter('rx')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                rxFilter === 'rx'
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <ShieldAlert className="w-3 h-3" />
              Prescription Required (Rx)
            </button>
          </div>

          {/* Dosage Form Selector */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Form:</span>
            <select
              value={selectedDosage}
              onChange={(e) => setSelectedDosage(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="all">All Forms</option>
              <option value="Tablet">Tablets</option>
              <option value="Capsule">Capsules</option>
              <option value="Syrup">Syrups & Liquids</option>
              <option value="Suspension">Suspensions</option>
              <option value="Inhaler">Inhalers & Sprays</option>
              <option value="Cream/Ointment">Creams & Ointments</option>
              <option value="Sachet">Sachets & Powders</option>
            </select>
          </div>
        </div>

        {/* Results summary */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-4 px-1">
          <span>
            Showing <strong className="text-slate-900">{filteredMedicines.length}</strong> items
            {activeCategory !== 'All' && ` in ${activeCategory}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </span>

          {(searchQuery || activeCategory !== 'All' || rxFilter !== 'all' || selectedDosage !== 'all') && (
            <button
              onClick={() => {
                onSearchChange('');
                onCategoryChange('All');
                setRxFilter('all');
                setSelectedDosage('all');
              }}
              className="text-emerald-700 hover:underline font-semibold cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Medicines Grid */}
        {filteredMedicines.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto shadow-xs">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">No medicines found</h3>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">
              We couldn't find matches for "{searchQuery}". You can call our pharmacist directly at <strong>0110 342 455</strong> to check availability.
            </p>
            <div className="mt-4 flex justify-center gap-3">
              <button
                onClick={() => {
                  onSearchChange('');
                  onCategoryChange('All');
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
              >
                Clear Search
              </button>
              <a
                href="tel:0110342455"
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors"
              >
                Call Pharmacist
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filteredMedicines.map((med) => {
              const currentQty = cartQuantityMap.get(med.id) || 0;
              const isInCart = currentQty > 0;

              return (
                <div
                  key={med.id}
                  className={`bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-2xs hover:shadow-md ${
                    isInCart
                      ? 'border-emerald-500 ring-2 ring-emerald-500/10'
                      : 'border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  <div className="p-4 sm:p-5 flex-1 flex flex-col">
                    
                    {/* Top Badges row */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {med.dosageForm}
                      </span>

                      {med.isRx ? (
                        <span 
                          className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-300"
                          title="Requires a valid doctor's prescription"
                        >
                          <ShieldAlert className="w-3 h-3 text-amber-600" />
                          <span>Rx Required</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                          OTC • No Rx
                        </span>
                      )}
                    </div>

                    {/* Medicine Title & Strength */}
                    <div>
                      <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-emerald-700">
                        {med.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5 line-clamp-1" title={med.genericName}>
                        {med.genericName}
                      </p>
                    </div>

                    {/* Indications tags */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      {med.indications.slice(0, 2).map((ind, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-50 text-slate-600 border border-slate-100"
                        >
                          {ind}
                        </span>
                      ))}
                      {med.indications.length > 2 && (
                        <span className="text-[10px] font-medium text-slate-400 self-center">
                          +{med.indications.length - 2} more
                        </span>
                      )}
                    </div>

                    {/* Brief description */}
                    <p className="mt-2.5 text-xs text-slate-600 line-clamp-2 leading-relaxed flex-1">
                      {med.description}
                    </p>

                    {/* Details link button */}
                    <div className="mt-3 pt-2">
                      <button
                        onClick={() => onSelectMedicineDetails(med)}
                        className="text-xs font-semibold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Info className="w-3.5 h-3.5" />
                        <span>Dosage & Info</span>
                      </button>
                    </div>
                  </div>

                  {/* Bottom Price & Add to List Footer */}
                  <div className="px-4 py-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-base font-extrabold text-slate-900">
                          KES {med.unitPrice.toLocaleString()}
                        </span>
                        <span className="text-[11px] font-medium text-slate-500">
                          /{med.unitName}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 block -mt-0.5 truncate max-w-[120px]" title={med.packSizeInfo}>
                        {med.packSizeInfo}
                      </span>
                    </div>

                    {/* Add / Stepper */}
                    <div>
                      {isInCart ? (
                        <div className="flex items-center gap-1.5 bg-white border border-emerald-500 rounded-xl p-0.5 shadow-2xs">
                          <button
                            onClick={() => onUpdateQuantity(med.id, currentQty - 1)}
                            className="w-7 h-7 rounded-lg text-slate-700 hover:bg-slate-100 flex items-center justify-center font-bold active:scale-95 transition-transform cursor-pointer"
                            title="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-6 text-center text-xs font-black text-slate-900">
                            {currentQty}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(med.id, currentQty + 1)}
                            className="w-7 h-7 rounded-lg text-emerald-800 bg-emerald-100 hover:bg-emerald-200 flex items-center justify-center font-bold active:scale-95 transition-transform cursor-pointer"
                            title="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => onAddToCart(med, 1)}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-xs active:scale-95 transition-all cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to list</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Prompt note under Medicines section */}
        <div className="mt-8 p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-start sm:items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5 sm:mt-0" />
            <p>
              <strong>Important note:</strong> Prices are per single unit (one tablet, one vial, one bottle) and are confirmed by the pharmacist. Items marked <strong>Rx</strong> need a valid prescription.
            </p>
          </div>
          <a
            href="tel:0110342455"
            className="text-emerald-700 hover:text-emerald-800 font-bold shrink-0"
          >
            Need help? Call 0110 342 455
          </a>
        </div>

      </div>
    </section>
  );
};
