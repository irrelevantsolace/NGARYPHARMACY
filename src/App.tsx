import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MedicineCatalog } from './components/MedicineCatalog';
import { YourListSection } from './components/YourListSection';
import { OurStoresSection } from './components/OurStoresSection';
import { ServicesSection } from './components/ServicesSection';
import { MedicineDetailModal } from './components/MedicineDetailModal';
import { PrescriptionUploadModal } from './components/PrescriptionUploadModal';
import { MpesaModal } from './components/MpesaModal';
import { Footer } from './components/Footer';
import { StickyMobileBar } from './components/StickyMobileBar';

import { MEDICINES_DATA } from './data/medicines';
import { PHARMACY_STORES } from './data/stores';
import { Medicine, CartItem, PharmacyStore, MedicineCategory } from './types/pharmacy';

export default function App() {
  // State for cart with localStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ngary_pharmacy_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Selected store for pick-up
  const [selectedStore, setSelectedStore] = useState<PharmacyStore>(PHARMACY_STORES[0]);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<MedicineCategory>('All');

  // Modals
  const [selectedMedicineForModal, setSelectedMedicineForModal] = useState<Medicine | null>(null);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [isMpesaModalOpen, setIsMpesaModalOpen] = useState(false);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ngary_pharmacy_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Cart operations
  const handleAddToCart = (medicine: Medicine, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.medicine.id === medicine.id);
      if (existing) {
        return prev.map((item) =>
          item.medicine.id === medicine.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { medicine, quantity }];
    });
  };

  const handleUpdateQuantity = (medicineId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(medicineId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.medicine.id === medicineId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (medicineId: string) => {
    setCart((prev) => prev.filter((item) => item.medicine.id !== medicineId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Calculations
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotalAmount = cart.reduce(
    (sum, item) => sum + item.medicine.unitPrice * item.quantity,
    0
  );

  // Navigation helpers
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSendWhatsAppDirect = () => {
    if (cart.length === 0) {
      scrollToSection('medicines');
      return;
    }
    scrollToSection('your-list');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Top Navbar */}
      <Navbar
        cartItemCount={cartItemCount}
        cartTotal={cartTotalAmount}
        onOpenCart={() => scrollToSection('your-list')}
        selectedStore={selectedStore}
        onSelectStoreClick={() => scrollToSection('stores')}
        onOpenPrescriptionModal={() => setIsPrescriptionModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedStore={selectedStore}
          onSelectStoreClick={() => scrollToSection('stores')}
          onOpenPrescriptionModal={() => setIsPrescriptionModalOpen(true)}
          onCategorySelect={(cat) => {
            setActiveCategory(cat as MedicineCategory);
            scrollToSection('medicines');
          }}
          cartCount={cartItemCount}
          onOpenCart={() => scrollToSection('your-list')}
        />

        {/* Medicines Catalog Section (ID: medicines) */}
        <MedicineCatalog
          medicines={MEDICINES_DATA}
          cart={cart}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
          onSelectMedicineDetails={(med) => setSelectedMedicineForModal(med)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Your List & WhatsApp Checkout Section (ID: your-list) */}
        <YourListSection
          cart={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
          selectedStore={selectedStore}
          onStoreChange={setSelectedStore}
          onOpenPrescriptionModal={() => setIsPrescriptionModalOpen(true)}
        />

        {/* Our Stores Section (ID: stores) */}
        <OurStoresSection
          selectedStore={selectedStore}
          onSelectStore={(store) => {
            setSelectedStore(store);
            scrollToSection('your-list');
          }}
        />

        {/* What We Do / Services Section (ID: services) */}
        <ServicesSection
          onOpenPrescriptionModal={() => setIsPrescriptionModalOpen(true)}
          onOpenMpesaModal={() => setIsMpesaModalOpen(true)}
        />
      </main>

      {/* Footer with mandatory prompt disclaimer and info */}
      <Footer />

      {/* Sticky Mobile Bar when cart has items */}
      <StickyMobileBar
        itemCount={cartItemCount}
        totalAmount={cartTotalAmount}
        selectedStore={selectedStore}
        onOpenList={() => scrollToSection('your-list')}
        onSendWhatsApp={handleSendWhatsAppDirect}
      />

      {/* Medicine Info Modal */}
      {selectedMedicineForModal && (
        <MedicineDetailModal
          medicine={selectedMedicineForModal}
          onClose={() => setSelectedMedicineForModal(null)}
          onAddToCart={handleAddToCart}
          currentCartQty={
            cart.find((item) => item.medicine.id === selectedMedicineForModal.id)?.quantity || 0
          }
        />
      )}

      {/* Prescription Upload & WhatsApp Bridge Modal */}
      <PrescriptionUploadModal
        isOpen={isPrescriptionModalOpen}
        onClose={() => setIsPrescriptionModalOpen(false)}
        selectedStore={selectedStore}
      />

      {/* M-Pesa & Payment Guide Modal */}
      <MpesaModal
        isOpen={isMpesaModalOpen}
        onClose={() => setIsMpesaModalOpen(false)}
      />

    </div>
  );
}
