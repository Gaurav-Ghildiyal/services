import React, { useState, useEffect } from 'react';
import type { Service, Page, AddOn } from '../types';

interface InvoicePageProps {
  service: Service;
  navigateTo: (page: Page) => void;
}

const InvoicePage: React.FC<InvoicePageProps> = ({ service, navigateTo }) => {
  const [invoiceDetails, setInvoiceDetails] = useState({
    id: '',
    date: '',
  });
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);

  useEffect(() => {
    const date = new Date();
    setInvoiceDetails({
      id: `GDC-${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}-${Math.floor(Math.random() * 10000)}`,
      date: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    });
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleAddOnToggle = (addOn: AddOn) => {
    setSelectedAddOns(prev => {
      if (prev.find(a => a.name === addOn.name)) {
        return prev.filter(a => a.name !== addOn.name);
      } else {
        return [...prev, addOn];
      }
    });
  };

  const parsePrice = (priceString: string): number => {
    if (priceString.toLowerCase().includes('quote')) return 0;
    return parseInt(priceString.replace(/[^0-9]/g, ''), 10) || 0;
  };

  const basePrice = parsePrice(service.pricing);
  // Assign a dummy price to add-ons for demonstration
  const addOnPrice = 50;
  const subtotal = basePrice + selectedAddOns.length * addOnPrice;
  const taxRate = 0.05; // 5% VAT
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };
  
  return (
    <>
      <style>{`
        @media print {
          body, html {
            background-color: #fff;
          }
          body * {
            visibility: hidden;
          }
          .invoice-container, .invoice-container * {
            visibility: visible;
          }
          .invoice-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            border: none;
            box-shadow: none;
            padding: 0;
          }
          .no-print {
            display: none;
          }
        }
      `}</style>
      <div className="pt-24 sm:pt-32 pb-16 bg-brand-light-bg">
        <div className="container mx-auto px-6">
          {/* Invoice itself */}
          <div className="invoice-container max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-2xl border border-gray-200">
            {/* Header */}
            <header className="flex justify-between items-start mb-8 border-b pb-8">
              <div>
                <h1 className="text-2xl font-bold text-brand-dark">GULF <span className="text-brand-cyan">DETAILING CUSTOMS</span></h1>
                <p className="text-brand-gray">123 Luxury Lane, Dubai, UAE</p>
                <p className="text-brand-gray">contact@gulfcustoms.com</p>
              </div>
              <div className="text-right">
                <h2 className="text-3xl font-extrabold text-brand-dark uppercase">Invoice</h2>
                <p className="text-brand-gray" aria-label="Invoice Number"># {invoiceDetails.id}</p>
                <p className="text-brand-gray" aria-label="Invoice Date">Date: {invoiceDetails.date}</p>
              </div>
            </header>
            
            {/* Bill To */}
            <section className="mb-8" aria-labelledby="bill-to-heading">
              <h3 id="bill-to-heading" className="text-sm font-semibold uppercase text-brand-gray mb-2">Bill To</h3>
              <div className="w-1/2 h-6 bg-gray-200 rounded animate-pulse mb-2" title="Customer Name Placeholder"></div>
              <div className="w-2/3 h-6 bg-gray-200 rounded animate-pulse" title="Customer Address Placeholder"></div>
              <p className="text-sm text-brand-gray mt-2">(Please fill in your details)</p>
            </section>

            {/* Items Table */}
            <table className="w-full mb-8" aria-label="Invoice items">
              <thead>
                <tr className="border-b border-gray-300">
                  <th scope="col" className="text-left py-2 font-semibold uppercase text-sm text-brand-gray">Service / Item</th>
                  <th scope="col" className="text-right py-2 font-semibold uppercase text-sm text-brand-gray">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-4">
                    <p className="font-bold text-brand-dark">{service.title}</p>
                    <p className="text-sm text-brand-gray">{service.description}</p>
                  </td>
                  <td className="py-4 text-right font-semibold text-brand-dark">{formatCurrency(basePrice)}</td>
                </tr>
                {selectedAddOns.map(addOn => (
                  <tr key={addOn.name} className="border-b border-gray-200">
                    <td className="py-4">
                       <p className="font-bold text-brand-dark">{addOn.name}</p>
                       <p className="text-sm text-brand-gray">{addOn.description}</p>
                    </td>
                    <td className="py-4 text-right font-semibold text-brand-dark">{formatCurrency(addOnPrice)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <section className="flex justify-end mb-8" aria-label="Invoice totals">
              <div className="w-full max-w-xs">
                <div className="flex justify-between py-2">
                  <span>Subtotal</span>
                  <span className="font-semibold text-brand-dark">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span>VAT (5%)</span>
                  <span className="font-semibold text-brand-dark">{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between py-2 border-t-2 border-brand-dark mt-2">
                  <span className="font-bold text-lg text-brand-dark">Total</span>
                  <span className="font-bold text-lg text-brand-dark">{formatCurrency(total)}</span>
                </div>
              </div>
            </section>

            {/* Notes */}
            <footer className="text-center text-sm text-brand-gray">
              <p>Thank you for choosing Gulf Detailing Customs. We appreciate your business!</p>
              <p>Payment is due upon receipt.</p>
            </footer>
          </div>

          {/* Add-ons selection (not printed) */}
          {service.addOns && service.addOns.length > 0 && (
             <div className="no-print max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-200 mt-8">
              <h3 className="text-xl font-bold text-brand-dark mb-4">Customize Your Invoice</h3>
              <p className="text-brand-gray mb-4">Select any add-ons you'd like to include in the service (demo price: {formatCurrency(addOnPrice)} each).</p>
               <div className="space-y-3">
                  {service.addOns.map(addon => (
                     <label key={addon.name} htmlFor={addon.name} className="flex items-center p-4 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                       <input
                         type="checkbox"
                         id={addon.name}
                         name={addon.name}
                         checked={selectedAddOns.some(a => a.name === addon.name)}
                         onChange={() => handleAddOnToggle(addon)}
                         className="h-5 w-5 text-brand-cyan border-gray-300 rounded focus:ring-brand-cyan"
                       />
                       <div className="ml-4">
                         <p className="font-semibold text-brand-dark">{addon.name}</p>
                         <p className="text-sm text-brand-gray">{addon.description}</p>
                       </div>
                       <span className="ml-auto font-semibold text-brand-cyan">{formatCurrency(addOnPrice)}</span>
                     </label>
                  ))}
               </div>
             </div>
          )}

          {/* Action Buttons (not printed) */}
          <div className="no-print max-w-4xl mx-auto mt-8 flex flex-col sm:flex-row justify-end gap-4">
            <button
              onClick={() => navigateTo('home')}
              className="px-6 py-3 bg-gray-200 text-brand-dark font-bold text-sm rounded-lg hover:bg-gray-300 transition-all duration-300"
            >
              Back to Site
            </button>
            <button
              onClick={handlePrint}
              className="px-6 py-3 bg-brand-cyan text-white font-bold text-sm rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
              Print Invoice
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoicePage;