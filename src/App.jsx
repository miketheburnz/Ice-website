import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabaseClient';
import {
  Phone, Snowflake, Truck, Droplets, Menu, X, MapPin, Facebook, Instagram,
  MessageCircle, ShieldCheck, ChevronRight, ShoppingBag, Settings, Package,
  Save, AlertCircle, ArrowLeft, Eye, EyeOff, Minus, Plus, Lock
} from 'lucide-react';

// --- Re-used UI components (GlacierLogo, small helpers) ---
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

function formatTimestamp(ts) {
  if (!ts) return 'Never';
  try {
    return new Date(ts).toLocaleString();
  } catch {
    return String(ts);
  }
}

// Default inventory fallback (used if DB is empty)
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

// --- Small UI pieces: Announcement, ProductCard (simplified) ---
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

const ProductCard = ({ product }) => {
  const inStock = product.available && product.stock > 0;
  return (
    <div className={`bg-white border rounded-lg overflow-hidden shadow ${!inStock ? 'opacity-70' : ''}`}>
      <img src={product.image} alt={product.name} className="w-full h-44 object-cover" />
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4 className="font-bold text-lg">{product.name}</h4>
            <p className="text-sm text-slate-500">{product.subtitle}</p>
          </div>
          <div className="text-right">
            <div className={`text-sm font-bold ${inStock ? 'text-emerald-600' : 'text-rose-500'}`}>
              {inStock ? 'Available' : 'Unavailable'}
            </div>
            <div className="text-xs text-slate-400">Stock: {product.stock}</div>
          </div>
        </div>
        <p className="text-sm text-slate-600 mt-3">{product.desc}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="font-extrabold text-slate-900">{product.price}</div>
          <a
            href={`https://wa.me/27792066830?text=Hi,%20I%20would%20like%20to%20order%20${encodeURIComponent(product.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-3 py-1 rounded flex items-center gap-2 ${inStock ? 'bg-cyan-600 text-white' : 'bg-slate-300 text-slate-500 cursor-not-allowed'}`}
            aria-disabled={!inStock}
          >
            <ShoppingBag size={16} /> Order
          </a>
        </div>
      </div>
    </div>
  );
};

// --- Admin UI components (LoginForm + AdminPanelUI) ---
const LoginForm = ({ onLogin, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await onLogin(email.trim(), password);
    } catch (err) {
      alert(err.message || 'Login failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-md w-full">
      <h3 className="font-bold text-lg mb-2">Admin Sign In</h3>
      <p className="text-sm text-slate-500 mb-4">Use your Supabase admin account</p>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full border rounded px-3 py-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full border rounded px-3 py-2" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <div className="flex gap-2">
          <button type="submit" className="px-4 py-2 bg-cyan-600 text-white rounded" disabled={busy}>{busy ? 'Signing in...' : 'Sign in'}</button>
          <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
};

const AdminPanelUI = ({ inventory, onClose, onSave, saving }) => {
  const [local, setLocal] = useState(inventory);

  useEffect(() => setLocal(inventory), [inventory]);

  const updateProduct = (key, field, value) => {
    setLocal(prev => ({
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

  const addProduct = (key) => {
    if (!key) return alert('Enter a product key');
    if (local.products[key]) return alert('Key already exists');
    setLocal(prev => ({
      ...prev,
      products: {
        ...prev.products,
        [key]: { name: 'New Product', subtitle: '', stock: 0, available: false, price: 'R0', image: '', desc: '' }
      }
    }));
  };

  const removeProduct = (key) => {
    if (!confirm('Delete product?')) return;
    const { [key]: removed, ...rest } = local.products;
    setLocal(prev => ({ ...prev, products: rest }));
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-4xl w-full mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold">Admin Panel</h3>
          <p className="text-sm text-slate-500">Manage inventory and site announcement</p>
        </div>
        <div className="text-sm text-slate-400">Last: {formatTimestamp(local.lastUpdated)}</div>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold mb-2">Announcement</h4>
        <textarea className="w-full border rounded p-2 mb-2" rows="2" value={local.announcement} onChange={(e) => setLocal(prev => ({ ...prev, announcement: e.target.value }))} />
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2"><input type="checkbox" checked={local.showAnnouncement} onChange={(e) => setLocal(prev => ({ ...prev, showAnnouncement: e.target.checked }))} /> Show announcement</label>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Products</h4>
        <ProductAdminList
          products={local.products}
          onUpdate={({ key, field, value }) => updateProduct(key, field, value)}
          onRemove={removeProduct}
        />
        <div className="mt-4 flex gap-2">
          <input id="newkey" placeholder="product-key" className="border p-2 rounded flex-1" />
          <button onClick={() => { const k = document.getElementById('newkey').value.trim(); addProduct(k); }} className="px-3 py-2 bg-cyan-600 text-white rounded">Add</button>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
        <button onClick={() => onSave({ ...local, lastUpdated: new Date().toISOString() })} className="px-4 py-2 bg-emerald-600 text-white rounded flex items-center gap-2">
          <Save /> {saving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
};

const ProductAdminList = ({ products, onUpdate, onRemove }) => {
  return (
    <div className="space-y-3">
      {Object.entries(products).map(([key, p]) => (
        <div key={key} className="border rounded p-3 bg-slate-50">
          <div className="flex gap-3">
            <div className="flex-1">
              <div className="flex gap-2 items-center">
                <input className="w-36 border p-1 rounded" value={key} readOnly />
                <input className="flex-1 border p-1 rounded" value={p.name} onChange={(e) => onUpdate({ key, field: 'name', value: e.target.value })} />
              </div>
              <div className="flex gap-2 mt-2">
                <input className="border p-1 rounded flex-1" value={p.subtitle} onChange={(e) => onUpdate({ key, field: 'subtitle', value: e.target.value })} placeholder="subtitle" />
                <input className="border p-1 rounded w-36" value={p.price} onChange={(e) => onUpdate({ key, field: 'price', value: e.target.value })} />
              </div>
              <div className="flex gap-2 mt-2 items-center">
                <label className="text-sm">Stock</label>
                <input type="number" className="border p-1 rounded w-28" value={p.stock} onChange={(e) => onUpdate({ key, field: 'stock', value: Number(e.target.value) })} />
                <label className="text-sm ml-4">Available</label>
                <input type="checkbox" checked={p.available} onChange={(e) => onUpdate({ key, field: 'available', value: e.target.checked })} />
                <button onClick={() => onRemove(key)} className="ml-auto text-rose-600">Delete</button>
              </div>
              <div className="mt-2">
                <input className="border p-1 rounded w-full" value={p.image} onChange={(e) => onUpdate({ key, field: 'image', value: e.target.value })} />
                <textarea className="border p-2 rounded w-full mt-2" value={p.desc} onChange={(e) => onUpdate({ key, field: 'desc', value: e.target.value })} />
              </div>
            </div>
            <div className="w-36">
              <img src={p.image || 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop'} alt={p.name} className="w-36 h-24 object-cover rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// --- Main App with Supabase wiring ---
export default function App() {
  const [inventory, setInventory] = useState({ ...defaultInventory });
  const [loading, setLoading] = useState(true);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [saving, setSaving] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Session listener
  useEffect(() => {
    // initial session
    supabase.auth.getSession().then(({ data }) => {
      if (data?.session?.user) setUser(data.session.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // Fetch inventory from Supabase
  const fetchInventory = async () => {
    setLoading(true);
    try {
      const { data: products, error: pErr } = await supabase.from('products').select('*');
      if (pErr) throw pErr;

      const { data: settings, error: sErr } = await supabase.from('settings').select('*');
      if (sErr) throw sErr;

      // Map products to object keyed by id
      const productsObj = {};
      for (const r of (products || [])) {
        productsObj[r.id] = {
          name: r.name,
          subtitle: r.subtitle,
          stock: r.stock,
          available: r.available,
          price: r.price,
          image: r.image,
          desc: r.description,
          updated_at: r.updated_at
        };
      }

      let announcement = '';
      let showAnnouncement = false;
      let lastUpdated = null;
      for (const s of (settings || [])) {
        try {
          if (s.key === 'announcement') announcement = s.value;
          if (s.key === 'showAnnouncement') showAnnouncement = s.value === true || s.value === 'true';
          if (s.key === 'lastUpdated') lastUpdated = s.value;
        } catch { /* ignore */ }
      }

      // If DB empty, fallback to defaults (but DO NOT auto-insert here)
      if (Object.keys(productsObj).length === 0) {
        setInventory(defaultInventory);
      } else {
        setInventory({ products: productsObj, announcement, showAnnouncement, lastUpdated });
      }
    } catch (err) {
      console.error('Fetch inventory failed', err);
      setInventory(defaultInventory);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Auth actions
  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    setUser(data.user);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // Save inventory to Supabase (requires authenticated admin and RLS configured)
  const saveInventory = async (newInventory) => {
    setSaving(true);
    try {
      // Prepare product rows for upsert
      const rows = Object.entries(newInventory.products).map(([id, p]) => ({
        id,
        name: p.name,
        subtitle: p.subtitle,
        stock: p.stock,
        available: p.available,
        price: p.price,
        image: p.image,
        description: p.desc,
        updated_at: new Date().toISOString()
      }));

      // Upsert products (onConflict id)
      const { error: upsertErr } = await supabase.from('products').upsert(rows, { onConflict: 'id' });
      if (upsertErr) throw upsertErr;

      // Upsert settings individually
      const settings = [
        { key: 'announcement', value: newInventory.announcement },
        { key: 'showAnnouncement', value: newInventory.showAnnouncement },
        { key: 'lastUpdated', value: newInventory.lastUpdated || new Date().toISOString() }
      ];
      for (const s of settings) {
        const { error: sErr } = await supabase.from('settings').upsert([{ key: s.key, value: s.value, updated_at: new Date().toISOString() }], { onConflict: 'key' });
        if (sErr) throw sErr;
      }

      // Refresh local cache
      await fetchInventory();
      setIsAdminOpen(false);
    } catch (err) {
      console.error('Save failed', err);
      throw err;
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-200 border-t-cyan-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans antialiased text-slate-800 bg-white">
      {inventory.showAnnouncement && inventory.announcement && <AnnouncementBanner message={inventory.announcement} />}

      <header className={`fixed w-full z-50 ${isScrolled ? 'bg-white/95 shadow py-3' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#home"><GlacierLogo /></a>
          <div className="hidden md:flex items-center gap-6">
            <a href="#products" className="font-bold uppercase text-sm">Products</a>
            {user ? (
              <>
                <button onClick={() => setIsAdminOpen(true)} className="p-2"><Settings /></button>
                <button onClick={logout} className="px-3 py-2 border rounded">Logout</button>
              </>
            ) : (
              <button onClick={() => setIsLoginOpen(true)} className="px-3 py-2 bg-cyan-600 text-white rounded">Admin</button>
            )}
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsLoginOpen(true)} className="p-2"><Settings /></button>
          </div>
        </div>
      </header>

      <main className="pt-28">
        {/* Hero simplified */}
        <section className="relative min-h-[60vh] flex items-center bg-slate-50">
          <div className="container mx-auto px-6 py-16 flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-black">WE KEEP IT <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">ICE COLD.</span></h1>
              <p className="mt-4 text-slate-600 max-w-lg">Premium ice cubes and blocks delivered to your door in Pretoria. Manage stock from the admin panel.</p>
            </div>
            <div className="w-96 hidden lg:block">
              <img src="https://images.unsplash.com/photo-1547402830-1845eb5b78c8?q=80&w=2070&auto=format&fit=crop" alt="ice" className="rounded-lg shadow" />
            </div>
          </div>
        </section>

        {/* Products grid */}
        <section id="products" className="container mx-auto px-6 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black">Products</h2>
            <div className="text-sm text-slate-500">Last updated: {formatTimestamp(inventory.lastUpdated)}</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(inventory.products).map(([id, p]) => <ProductCard key={id} product={p} />)}
          </div>
        </section>

        <footer className="bg-slate-50 border-t">
          <div className="container mx-auto px-6 py-8 flex items-center justify-between">
            <GlacierLogo textClassName="text-lg" />
            <div className="text-sm text-slate-500">&copy; {new Date().getFullYear()} Glacier — All rights reserved</div>
          </div>
        </footer>
      </main>

      {/* Login modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40">
          <div>
            <LoginForm onLogin={async (email, pass) => { await login(email, pass); setIsLoginOpen(false); setIsAdminOpen(true); }} onClose={() => setIsLoginOpen(false)} />
          </div>
        </div>
      )}

      {/* Admin Panel modal */}
      {isAdminOpen && (
        <div className="fixed inset-0 z-[70] flex items-start justify-center p-4 overflow-auto">
          <div className="w-full max-w-4xl">
            <AdminPanelUI inventory={inventory} onClose={() => setIsAdminOpen(false)} onSave={saveInventory} saving={saving} />
          </div>
        </div>
      )}
    </div>
  );
}
