import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Snowflake, 
  Truck, 
  Droplets, 
  Menu, 
  X, 
  MapPin, 
  Facebook, 
  Instagram, 
  MessageCircle,
  ShieldCheck,
  ChevronRight,
  ShoppingBag,
  Settings,
  Package,
  Save,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  Eye,
  EyeOff,
  Minus,
  Plus,
  Lock
} from 'lucide-react';

// --- Custom Generated Assets ---
const GlacierLogo = ({ className = "w-12 h-12", textClassName = "text-xl" }) => (
  <div className="flex items-center gap-3 select-none">
    <div className={`relative ${className} flex-shrink-0`}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="iceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
        </defs>
        <path d="M50 15 L80 70 H20 L50 15Z" fill="url(#iceGradient)" stroke="white" strokeWidth="2" strokeLinejoin="round" />
        <path d="M50 15 L60 70 M50 15 L40 70" stroke="white" strokeWidth="1" opacity="0.4" />
        <path d="M35 50 H65" stroke="white" strokeWidth="1" opacity="0.3" />
        <path d="M15 75 Q 35 90 50 75 T 85 75" stroke="#0ea5e9" strokeWidth="6" strokeLinecap="round" />
      </svg>
    </div>
    <div className="flex flex-col justify-center">
      <span className={`${textClassName} font-black text-slate-800 tracking-tighter leading-none`}>
        GLACIER
      </span>
      <span className="text-[0.6em] font-bold text-cyan-600 tracking-[0.3em] uppercase leading-none mt-1">
        Pure Ice
      </span>
    </div>
  </div>
);

// Default inventory state
const defaultInventory = {
  products: {
    'ice-cubes': { 
      name: 'Ice Cubes', 
      subtitle: '2kg & 5kg Bags',
      stock: 100, 
      available: true,
      price: 'R25 - R50',
      image: 'https://images.unsplash.com/photo-1599818826720-d380f2824346?q=80&w=1000&auto=format&fit=crop',
      desc: 'Our most popular product. Perfect crystal clear cubes for parties, restaurants, and home use.'
    },
    'crushed-ice': { 
      name: 'Crushed Ice', 
      subtitle: '5kg Bags',
      stock: 75, 
      available: true,
      price: 'R45',
      image: 'https://images.unsplash.com/photo-1563286386-8d1976a445d4?q=80&w=1000&auto=format&fit=crop',
      desc: 'Finely ground ice. Essential for cocktails (mojitos!), smoothies, and rapid cooling of beverages.'
    },
    'ice-blocks': { 
      name: 'Solid Ice Blocks', 
      subtitle: 'Bulk / Large Format',
      stock: 30, 
      available: true,
      price: 'R80 - R150',
      image: 'https://images.unsplash.com/photo-1596489397631-5c317551cc13?q=80&w=1000&auto=format&fit=crop',
      desc: 'Large, slow-melting blocks designed for cooler boxes, fishing trips, and catering events.'
    }
  },
  announcement: '',
  showAnnouncement: false,
  lastUpdated: null
};

// Local storage key
const STORAGE_KEY = 'glacier_inventory_v1';

// --- Helper utilities ---
function formatTimestamp(ts) {
  if (!ts) return 'Never';
  try {
    return new Date(ts).toLocaleString();
  } catch (e) {
    return String(ts);
  }
}

// --- Components ---
const Navbar = ({ isScrolled, onAdminClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappUrl = "https://wa.me/27792066830";

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 shadow-md backdrop-blur-md py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <GlacierLogo />

        <div className="hidden md:flex items-center gap-8">
          {['Home', 'Products', 'About', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className={`text-sm font-bold uppercase tracking-widest hover:text-cyan-600 transition-colors ${isScrolled ? 'text-slate-600' : 'text-slate-800'}`}>
              {item}
            </a>
          ))}
          <a 
            href={whatsappUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-slate-900 text-white hover:bg-cyan-600 px-6 py-2.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg flex items-center gap-2">
            <Phone size={16} />
            Order Now
          </a>
          <button 
            onClick={onAdminClick}
            className="p-2 text-slate-400 hover:text-cyan-600 transition-colors"
            title="Admin Panel">
            <Settings size={20} />
          </button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button 
            onClick={onAdminClick}
            className="p-2 text-slate-600"
            title="Admin Panel">
            <Settings size={22} />
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-900">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl">
          <div className="flex flex-col py-8 px-6 gap-6">
            {['Home', 'Products', 'About', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onClick={() => setIsOpen(false)} 
                className="text-slate-800 text-xl font-bold border-b border-slate-100 pb-4">{item}</a>
            ))}
            <a 
              href={whatsappUrl}
              className="bg-green-500 text-white py-4 rounded-xl font-bold text-center flex items-center justify-center gap-2">
              <MessageCircle size={20} />
              WhatsApp Order
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

const AnnouncementBanner = ({ message }) => {
  if (!message) return null;
  
  return (
    <div className="bg-amber-500 text-white py-3 px-6 text-center fixed top-0 left-0 right-0 z-[60]">
      <div className="container mx-auto flex items-center justify-center gap-2">
        <AlertCircle size={18} />
        <span>{message}</span>
      </div>
    </div>
  );
};

const Hero = ({ hasAnnouncement }) => {
  const whatsappUrl = "https://wa.me/27792066830";

  return (
    <section id="home" className={`relative min-h-[90vh] flex items-center overflow-hidden bg-slate-50 ${hasAnnouncement ? 'pt-32' : 'pt-20'}`}>
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left pt-8 lg:pt-0">
            <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-200 px-4 py-2 rounded-full mx-auto lg:mx-0">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
              <span className="text-blue-800 font-bold text-xs uppercase tracking-widest">Pretoria's #1 Ice Supplier</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1]">
              WE KEEP IT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">ICE COLD.</span>
            </h1>

            <p className="text-slate-600 max-w-xl mt-4">
              Fast delivery across the Tshwane area. Premium crystal-clear ice for households and events. Order online or via WhatsApp and we'll have it on your doorstep.
            </p>

            <div className="flex items-center gap-4 mt-6 justify-center lg:justify-start">
              <a 
                href={whatsappUrl}
                className="bg-slate-900 text-white px-6 py-3 rounded-full font-bold flex items-center gap-3 hover:bg-cyan-600 transition">
                <Phone size={16} /> Order Now
              </a>

              <a href="#products" className="text-slate-700 font-bold flex items-center gap-2">
                View Products <ChevronRight size={18} />
              </a>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border rounded-lg p-6 shadow"> 
                <h3 className="font-bold text-lg">Fast Delivery</h3>
                <p className="text-sm text-slate-600 mt-2">Same-day delivery options within Pretoria.</p>
              </div>
              <div className="bg-white border rounded-lg p-6 shadow"> 
                <h3 className="font-bold text-lg">Commercial Orders</h3>
                <p className="text-sm text-slate-600 mt-2">Bulk pricing available for catering and events.</p>
              </div>
              <div className="bg-white border rounded-lg p-6 shadow"> 
                <h3 className="font-bold text-lg">Quality Assured</h3>
                <p className="text-sm text-slate-600 mt-2">Crystal clear, slow-melting ice produced under hygienic conditions.</p>
              </div>
              <div className="bg-white border rounded-lg p-6 shadow"> 
                <h3 className="font-bold text-lg">Support</h3>
                <p className="text-sm text-slate-600 mt-2">Contactless delivery and customer support via WhatsApp.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const ProductCard = ({ id, product }) => {
  return (
    <div className="bg-white border rounded-lg overflow-hidden shadow">
      <img src={product.image} alt={product.name} className="w-full h-44 object-cover" />
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4 className="font-bold text-lg">{product.name}</h4>
            <p className="text-sm text-slate-500">{product.subtitle}</p>
          </div>
          <div className="text-right">
            <div className={`text-sm font-bold ${product.available ? 'text-emerald-600' : 'text-rose-500'}`}>
              {product.available ? 'Available' : 'Out'}
            </div>
            <div className="text-xs text-slate-400">Stock: {product.stock}</div>
          </div>
        </div>
        <p className="text-sm text-slate-600 mt-3">{product.desc}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="font-extrabold text-slate-900">{product.price}</div>
          <button className="bg-cyan-600 text-white px-3 py-1 rounded flex items-center gap-2">
            <ShoppingBag size={16} /> Buy
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminPanel = ({ inventory, onClose, onSave }) => {
  const [localData, setLocalData] = useState(inventory);
  const [newKey, setNewKey] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [adminPass, setAdminPass] = useState('');

  useEffect(() => {
    setLocalData(inventory);
  }, [inventory]);

  const updateProductField = (key, field, value) => {
    setLocalData(prev => ({
      ...prev,
      products: {
        ...prev.products,
        [key]: {
          ...prev.products[key],
          [field]: value
        }
      }
    }));
  };

  const addProduct = () => {
    const key = newKey.trim();
    if (!key) return;
    if (localData.products[key]) {
      alert('Product key already exists');
      return;
    }
    setLocalData(prev => ({
      ...prev,
      products: {
        ...prev.products,
        [key]: { name: 'New Product', subtitle: '', stock: 0, available: false, price: 'R0', image: '', desc: '' }
      }
    }));
    setNewKey('');
  };

  const removeProduct = (key) => {
    if (!confirm(`Delete product "${key}"? This cannot be undone.`)) return;
    setLocalData(prev => {
      const { [key]: removed, ...rest } = prev.products;
      return { ...prev, products: rest };
    });
  };

  const resetToDefaults = () => {
    if (!confirm('Reset inventory to defaults? This will overwrite local changes.')) return;
    setLocalData(defaultInventory);
  };

  const handleSave = () => {
    const now = new Date().toISOString();
    onSave({ ...localData, lastUpdated: now });
  };

  return (
    <div className="fixed inset-0 z-[70] flex">
      <div className="bg-black/40 backdrop-blur-sm flex-1" onClick={onClose} />
      <div className="w-[760px] max-w-full bg-white h-full shadow-xl overflow-auto">
        <div className="p-6 border-b flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-black">Admin Panel</h2>
            <div className="text-sm text-slate-500">Manage inventory & announcements</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xs text-slate-500">Last saved: {formatTimestamp(localData.lastUpdated)}</div>
            <button onClick={onClose} className="p-2 text-slate-600" title="Close"><X /></button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <section className="space-y-3">
            <h3 className="font-semibold">Announcement</h3>
            <div className="flex gap-3">
              <textarea
                value={localData.announcement}
                onChange={(e) => setLocalData(prev => ({ ...prev, announcement: e.target.value }))}
                className="w-full border rounded p-3 h-24"
                placeholder="Announcement message shown in the banner (leave empty to hide)"
              />
              <div className="flex flex-col gap-2 w-44">
                <label className="text-xs text-slate-600">Show Announcement</label>
                <div className="flex items-center gap-2">
                  <button onClick={() => setLocalData(prev => ({ ...prev, showAnnouncement: true }))} className={`px-3 py-1 rounded ${localData.showAnnouncement ? 'bg-emerald-600 text-white' : 'bg-slate-100'}`}>On</button>
                  <button onClick={() => setLocalData(prev => ({ ...prev, showAnnouncement: false }))} className={`px-3 py-1 rounded ${!localData.showAnnouncement ? 'bg-rose-600 text-white' : 'bg-slate-100'}`}>Off</button>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="font-semibold">Products</h3>
            <div className="flex gap-2">
              <input value={newKey} onChange={(e) => setNewKey(e.target.value)} placeholder="new-product-key" className="border p-2 rounded flex-1" />
              <button onClick={addProduct} className="bg-cyan-600 text-white px-4 py-2 rounded">Add</button>
              <button onClick={resetToDefaults} className="bg-rose-500 text-white px-4 py-2 rounded">Reset</button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {Object.entries(localData.products).map(([key, prod]) => (
                <div key={key} className="border rounded p-4 bg-slate-50">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex gap-2 items-center">
                        <input className="w-44 border p-1 rounded" value={key} readOnly />
                        <input className="border p-1 rounded flex-1" value={prod.name} onChange={(e) => updateProductField(key, 'name', e.target.value)} />
                      </div>
                      <div className="flex gap-2 mt-3">
                        <input className="border p-1 rounded flex-1" value={prod.subtitle} onChange={(e) => updateProductField(key, 'subtitle', e.target.value)} placeholder="subtitle" />
                        <input className="border p-1 rounded w-36" value={prod.price} onChange={(e) => updateProductField(key, 'price', e.target.value)} />
                      </div>

                      <div className="flex gap-2 mt-3 items-center">
                        <label className="text-sm">Stock</label>
                        <input type="number" className="border p-1 rounded w-28" value={prod.stock} onChange={(e) => updateProductField(key, 'stock', Number(e.target.value))} />

                        <label className="text-sm ml-4">Available</label>
                        <input type="checkbox" checked={prod.available} onChange={(e) => updateProductField(key, 'available', e.target.checked)} />

                        <button onClick={() => removeProduct(key)} className="ml-auto text-rose-600 font-bold">Delete</button>
                      </div>

                      <div className="mt-3">
                        <input className="border p-1 rounded w-full" value={prod.image} onChange={(e) => updateProductField(key, 'image', e.target.value)} placeholder="image url" />
                        <textarea className="border p-2 rounded w-full mt-2" value={prod.desc} onChange={(e) => updateProductField(key, 'desc', e.target.value)} placeholder="description" />
                      </div>
                    </div>
                    <div className="w-36 flex-shrink-0">
                      <img src={prod.image || 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop'} alt={prod.name} className="w-36 h-24 object-cover rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="flex items-center justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 bg-emerald-600 text-white rounded flex items-center gap-2"><Save /> Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [inventory, setInventory] = useState(defaultInventory);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Load from localStorage
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setInventory(prev => ({ ...prev, ...parsed }));
      }
    } catch (e) {
      // ignore parse errors
      console.error('Failed to parse stored inventory', e);
    }

    const onScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // Persist inventory when it changes
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(inventory));
    } catch (e) {
      console.error('Failed to persist inventory', e);
    }
  }, [inventory]);

  const handleAdminSave = (newInventory) => {
    setInventory(newInventory);
    setIsAdminOpen(false);
    // persisted via effect
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <AnnouncementBanner message={inventory.showAnnouncement ? inventory.announcement : ''} />
      <Navbar isScrolled={isScrolled} onAdminClick={() => setIsAdminOpen(true)} />

      <main className="pt-24">
        <Hero hasAnnouncement={inventory.showAnnouncement && inventory.announcement} />

        <section id="products" className="container mx-auto px-6 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black">Products</h2>
            <div className="text-sm text-slate-500">Last updated: {formatTimestamp(inventory.lastUpdated)}</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(inventory.products).map(([id, prod]) => (
              <ProductCard key={id} id={id} product={prod} />
            ))}
          </div>
        </section>

        <footer className="bg-white border-t mt-12">
          <div className="container mx-auto px-6 py-8 flex items-center justify-between">
            <GlacierLogo textClassName="text-lg" />
            <div className="text-sm text-slate-500">&copy; {new Date().getFullYear()} Glacier — All rights reserved</div>
          </div>
        </footer>
      </main>

      {isAdminOpen && (
        <AdminPanel inventory={inventory} onClose={() => setIsAdminOpen(false)} onSave={handleAdminSave} />
      )}
    </div>
  );
}
