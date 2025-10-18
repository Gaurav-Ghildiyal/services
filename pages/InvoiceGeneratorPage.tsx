import React, { useState, useEffect } from 'react';
import { SERVICES, CERAMIC_PACKAGES } from '../constants';
import type { Service, Page, AddOn, VehicleType } from '../types';

interface InvoiceGeneratorPageProps {
  navigateTo: (page: Page) => void;
}

interface InvoiceItem {
    id: string;
    description: string;
    price: number;
}

const InvoiceGeneratorPage: React.FC<InvoiceGeneratorPageProps> = ({ navigateTo }) => {
  const [invoiceId, setInvoiceId] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [lineItems, setLineItems] = useState<InvoiceItem[]>([]);
  const [serviceSelections, setServiceSelections] = useState<Record<string, {vehicleType?: VehicleType, package?: 'Silver' | 'Gold' | 'Platinum'}>>({});
  const [customItems, setCustomItems] = useState<{ id: number; description: string; price: string }[]>([]);

  useEffect(() => {
    const date = new Date();
    setInvoiceId(`GDC-${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}-${Math.floor(Math.random() * 10000)}`);
    setInvoiceDate(date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  const handlePrint = () => window.print();
  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-AE', { style: 'currency', currency: 'AED' }).format(amount);

  // Re-calculate line items whenever selections change
  useEffect(() => {
    const items: InvoiceItem[] = [];
    Object.entries(serviceSelections).forEach(([title, selections]) => {
      const service = SERVICES.find(s => s.title === title);
      if (!service) return;

      if (service.pricing.type === 'packages') {
        if (selections.vehicleType && selections.package) {
          const price = service.pricing.vehicleTypes[selections.vehicleType][selections.package];
          items.push({
            id: title,
            description: `${title} - ${selections.package} (${selections.vehicleType})`,
            price: price,
          });
        }
      } else if (service.pricing.type === 'fixed') {
        items.push({ id: title, description: title, price: parseFloat(service.pricing.priceText.replace(/[^0-9.]/g, '')) || 0 });
      } else {
        // For quote or tiered, we add with price 0, to be manually entered
         items.push({ id: title, description: title, price: 0 });
      }
    });
    setLineItems(items);
  }, [serviceSelections]);
  
  const subtotal = lineItems.reduce((acc, item) => acc + item.price, 0) +
                   customItems.reduce((acc, item) => acc + (parseFloat(item.price) || 0), 0);

  const taxRate = 0.05; // 5% VAT
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const handleServiceToggle = (service: Service) => {
    setServiceSelections(prev => {
      const newSelections = { ...prev };
      if (newSelections[service.title]) {
        delete newSelections[service.title];
      } else {
        newSelections[service.title] = {};
      }
      return newSelections;
    });
  };

  const handleServiceOptionChange = (title: string, option: 'vehicleType' | 'package', value: string) => {
      setServiceSelections(prev => ({
          ...prev,
          [title]: {
              ...prev[title],
              [option]: value,
          }
      }));
  }


  const handleAddCustomItem = () => setCustomItems(prev => [...prev, { id: Date.now(), description: '', price: '' }]);
  const handleRemoveCustomItem = (id: number) => setCustomItems(prev => prev.filter(item => item.id !== id));
  const handleCustomItemChange = (id: number, field: 'description' | 'price', value: string) => {
    setCustomItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const inputClasses = "w-full px-4 py-2 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:bg-white transition-all duration-300 text-brand-dark placeholder-brand-gray text-sm";


  return (
    <>
      <style>{`
        @media print {
          body, html { background-color: #fff; }
          .no-print { display: none !important; }
          .printable-area { display: block !important; position: absolute; left: 0; top: 0; width: 100%; }
          .invoice-container { box-shadow: none !important; border: none !important; margin: 0 !important; padding: 0 !important; max-width: 100% !important; }
        }
      `}</style>
      <div className="pt-24 sm:pt-32 pb-16 bg-brand-light-bg">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Controls Column */}
                <div className="lg:col-span-2 space-y-6 no-print">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                        <h3 className="text-xl font-bold text-brand-dark mb-4">Customer Details</h3>
                        <div className="space-y-4">
                           <div>
                             <label htmlFor="customerName" className="block text-sm font-medium text-brand-dark mb-1">Full Name</label>
                             <input type="text" id="customerName" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className={inputClasses} placeholder="John Doe" />
                           </div>
                           <div>
                             <label htmlFor="customerAddress" className="block text-sm font-medium text-brand-dark mb-1">Address / Email</label>
                             <textarea id="customerAddress" value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} rows={2} className={inputClasses} placeholder="123 Main St, Anytown..."></textarea>
                           </div>
                        </div>
                    </div>
                     <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                        <h3 className="text-xl font-bold text-brand-dark mb-4">Services</h3>
                        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                          {SERVICES.map(service => (
                            <div key={service.title}>
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input type="checkbox" onChange={() => handleServiceToggle(service)} checked={!!serviceSelections[service.title]} className="h-5 w-5 text-brand-cyan rounded border-gray-300 focus:ring-brand-cyan" />
                                    <span className="font-semibold text-brand-dark">{service.title}</span>
                                </label>
                                {serviceSelections[service.title] && service.pricing.type === 'packages' && (
                                    <div className="pl-8 pt-2 space-y-3 animate-scale-in origin-top">
                                        <select onChange={(e) => handleServiceOptionChange(service.title, 'vehicleType', e.target.value)} value={serviceSelections[service.title]?.vehicleType || ''} className={inputClasses}>
                                            <option value="" disabled>Select Vehicle Type</option>
                                            <option value="Sedan / Sports Car">Sedan / Sports Car</option>
                                            <option value="SUV">SUV</option>
                                        </select>
                                         <select onChange={(e) => handleServiceOptionChange(service.title, 'package', e.target.value)} value={serviceSelections[service.title]?.package || ''} className={inputClasses}>
                                            <option value="" disabled>Select Package</option>
                                            <option value="Silver">Silver</option>
                                            <option value="Gold">Gold</option>
                                            <option value="Platinum">Platinum</option>
                                        </select>
                                    </div>
                                )}
                            </div>
                          ))}
                        </div>
                    </div>
                     <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                        <h3 className="text-xl font-bold text-brand-dark mb-4">Custom & Manual Items</h3>
                        <div className="space-y-3">
                            {customItems.map((item) => (
                                <div key={item.id} className="flex items-center gap-2">
                                    <input type="text" value={item.description} onChange={e => handleCustomItemChange(item.id, 'description', e.target.value)} placeholder="Item description" className={inputClasses} />
                                    <input type="number" value={item.price} onChange={e => handleCustomItemChange(item.id, 'price', e.target.value)} placeholder="Price (AED)" className={`${inputClasses} w-32`} />
                                    <button onClick={() => handleRemoveCustomItem(item.id)} className="text-red-500 hover:text-red-700 p-1 font-bold text-xl">&times;</button>
                                </div>
                            ))}
                        </div>
                        <button onClick={handleAddCustomItem} className="mt-4 text-sm font-semibold text-brand-cyan hover:text-brand-dark">+ Add Custom Item</button>
                    </div>
                </div>

                {/* Invoice Preview Column */}
                <div className="lg:col-span-3 printable-area">
                  <div className="invoice-container bg-white p-8 md:p-12 rounded-2xl shadow-2xl border border-gray-200">
                    <header className="flex justify-between items-start mb-8 border-b pb-8">
                      <div>
                        <h1 className="text-2xl font-bold text-brand-dark">GULF <span className="text-brand-cyan">DETAILING CUSTOMS</span></h1>
                        <p className="text-brand-gray text-sm">Warehouse #39, AL GOZE BUILDING - Al Quoz - Al Quoz 1 - Dubai</p>
                      </div>
                      <div className="text-right">
                        <h2 className="text-3xl font-extrabold text-brand-dark uppercase">Invoice</h2>
                        <p className="text-brand-gray"># {invoiceId}</p>
                        <p className="text-brand-gray">{invoiceDate}</p>
                      </div>
                    </header>
                    
                    <section className="mb-8">
                      <h3 className="text-sm font-semibold uppercase text-brand-gray mb-2">Bill To</h3>
                      <p className="font-semibold text-brand-dark whitespace-pre-wrap">{customerName || 'Customer Name'}</p>
                      <p className="text-brand-gray whitespace-pre-wrap">{customerAddress || 'Customer Address'}</p>
                    </section>

                    <table className="w-full mb-8">
                      <thead>
                        <tr className="border-b-2 border-gray-300">
                          <th className="text-left py-2 font-semibold uppercase text-sm text-brand-gray">Description</th>
                          <th className="text-right py-2 font-semibold uppercase text-sm text-brand-gray">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lineItems.map(item => (
                             <tr key={item.id} className="border-b border-gray-200">
                               <td className="py-3 pr-2 text-brand-dark">{item.description}</td>
                               <td className="py-3 text-right font-semibold text-brand-dark">{item.price > 0 ? formatCurrency(item.price) : 'Quote'}</td>
                             </tr>
                        ))}
                        {customItems.map(item => (
                             <tr key={item.id} className="border-b border-gray-200">
                               <td className="py-3 pr-2 text-brand-dark">{item.description || 'Custom Item'}</td>
                               <td className="py-3 text-right font-semibold text-brand-dark">{formatCurrency(parseFloat(item.price) || 0)}</td>
                             </tr>
                        ))}
                         {lineItems.length === 0 && customItems.length === 0 && (
                            <tr><td colSpan={2} className="text-center py-8 text-brand-gray">No items selected.</td></tr>
                        )}
                      </tbody>
                    </table>

                    <section className="flex justify-end mb-8">
                      <div className="w-full max-w-xs space-y-1">
                        <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
                        <div className="flex justify-between"><span>VAT (5%)</span><span>{formatCurrency(tax)}</span></div>
                        <div className="flex justify-between pt-2 border-t-2 border-brand-dark mt-2">
                          <span className="font-bold text-lg">Total</span><span className="font-bold text-lg">{formatCurrency(total)}</span>
                        </div>
                      </div>
                    </section>

                    <footer className="text-center text-sm text-brand-gray pt-4 border-t border-gray-200">
                      <p>Thank you for choosing Gulf Detailing Customs!</p>
                    </footer>
                  </div>
                </div>
            </div>
             {/* Action Buttons */}
            <div className="no-print max-w-7xl mx-auto mt-8 flex flex-col sm:flex-row justify-end gap-4">
                <button onClick={() => navigateTo('home')} className="px-6 py-3 bg-gray-200 text-brand-dark font-bold text-sm rounded-lg hover:bg-gray-300 transition-all">Back to Site</button>
                <button onClick={handlePrint} className="px-6 py-3 bg-brand-cyan text-white font-bold text-sm rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                Print Invoice
                </button>
            </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceGeneratorPage;