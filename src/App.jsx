import React, { useState, useEffect, useRef } from 'react';
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
  ShoppingBag
} from 'lucide-react';

// Configuration / constants
const PHONE_LOCAL = '0792066830';
const PHONE_E164 = '+27792066830';
const WHATSAPP_NUMBER = '27792066830'; // E.164 without plus for wa.me
const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;

// --- Custom Generated Assets ---

// 1. The Custom Logo Component (Vector/SVG)
const GlacierLogo = ({ className = "w-12 h-12", textClassName = "text-xl" }) => (
  <div className="flex items-center gap-3 select-none" role="img" aria-label="Glacier Pure Ice logo">
    <div className={`relative ${className} flex-shrink-0`}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="iceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
        </defs>
        {/* Mountain Peak */}
        <path d="M50 15 L80 70 H20 L50 15Z" fill="url(#iceGradient)" stroke="white" strokeWidth="2" strokeLinejoin="round" />
        {/* Ice Facet Lines */}
        <path d="M50 15 L60 70 M50 15 L40 70" stroke="white" strokeWidth="1" opacity="0.4" />
        {/* Horizontal Cut */}
        <path d="M35 50 H65" stroke="white" strokeWidth="1" opacity="0.3" />
        {/* Water/Wave Base */}
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

// --- Components ---

const Navbar = ({ isScrolled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Lock body scroll while mobile menu is open and restore on close
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // focus the menu container for accessibility
      mobileMenuRef.current?.focus();
    } else {
      document.body.style.overflow = '';
      menuButtonRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close menu on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  const whatsappUrl = WHATSAPP_BASE;

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 shadow-md backdrop-blur-md py-3' : 'bg-transparent py-6'}`}
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="inline-block">
          <GlacierLogo />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8" role="navigation" aria-label="Desktop navigation">
          {['Home', 'Products', 'About', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`text-sm font-bold uppercase tracking-widest hover:text-cyan-600 transition-colors ${isScrolled ? 'text-slate-600' : 'text-slate-800'}`}
            >
              {item}
            </a>
          ))}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-900 text-white hover:bg-cyan-600 px-6 py-2.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
            aria-label="Order now on WhatsApp"
          >
            <Phone size={16} aria-hidden="true" />
            Order Now
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 text-slate-900`}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            ref={menuButtonRef}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div
          id="mobile-menu"
          ref={mobileMenuRef}
          tabIndex={-1}
          className="md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl"
        >
          <div className="flex flex-col py-8 px-6 gap-6">
            {['Home', 'Products', 'About', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className="text-slate-800 text-xl font-bold border-b border-slate-100 pb-4"
              >
                {item}
              </a>
            ))}
            <a
              href={whatsappUrl}
              className="bg-green-500 text-white py-4 rounded-xl font-bold text-center flex items-center justify-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp order"
            >
              <MessageCircle size={20} aria-hidden="true" />
              WhatsApp Order
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  const whatsappUrl = `${WHATSAPP_BASE}`;
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-slate-50">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Text Content */}
          <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left pt-8 lg:pt-0">
            <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-200 px-4 py-2 rounded-full mx-auto lg:mx-0">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" aria-hidden="true"></span>
              <span className="text-blue-800 font-bold text-xs uppercase tracking-widest">Pretoria's #1 Ice Supplier</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1]">
              WE KEEP IT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
                ICE COLD.
              </span>
            </h1>
            
            <p className="text-lg text-slate-600 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
              Premium ice cubes, crushed ice, and blocks delivered directly to your home, restaurant, or event. 
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl shadow-green-500/20 flex items-center justify-center gap-3"
                aria-label="Order on WhatsApp"
              >
                <MessageCircle size={24} aria-hidden="true" />
                Order on WhatsApp
              </a>
              <a 
                href={`tel:${PHONE_E164}`}
                className="bg-white border-2 border-slate-200 hover:border-cyan-500 text-slate-700 hover:text-cyan-600 px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2"
                aria-label={`Call ${PHONE_LOCAL}`}
              >
                <Phone size={20} aria-hidden="true" />
                {PHONE_LOCAL}
              </a>
            </div>

            <div className="pt-8 flex items-center justify-center lg:justify-start gap-8 text-slate-400">
               <div className="flex items-center gap-2">
                 <Truck size={20} aria-hidden="true" /> <span className="text-sm font-semibold">Fast Delivery</span>
               </div>
               <div className="flex items-center gap-2">
                 <ShieldCheck size={20} aria-hidden="true" /> <span className="text-sm font-semibold">Purified Water</span>
               </div>
            </div>
          </div>

          {/* Hero Image - A literal Bucket of Ice / Party Vibe */}
          <div className="w-full lg:w-1/2 relative">
             <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-1 hover:rotate-0 transition-all duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1547402830-1845eb5b78c8?q=80&w=2070&auto=format&fit=crop" 
                  alt="Close up of crystal clear ice" 
                  className="w-full h-[500px] object-cover"
                  loading="lazy"
                />
                
                {/* Floating Price Tag/Badge */}
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/50">
                   <div className="flex items-center gap-3">
                      <div className="bg-cyan-100 p-2 rounded-lg">
                        <ShoppingBag className="text-cyan-600 w-6 h-6" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase">Bulk Orders</p>
                        <p className="text-slate-900 font-bold">Available Now</p>
                      </div>
                   </div>
                </div>
             </div>
             
             {/* Decorative blob behind */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-200/50 rounded-full blur-3xl -z-10" aria-hidden="true"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Products = () => {
  const products = [
    {
      id: 1,
      name: "Ice Cubes",
      subtitle: "2kg & 5kg Bags",
      image: "https://images.unsplash.com/photo-1599818826720-d380f2824346?q=80&w=1000&auto=format&fit=crop",
      desc: "Our most popular product. Perfect crystal clear cubes for parties, restaurants, and home use."
    },
    {
      id: 2,
      name: "Crushed Ice",
      subtitle: "5kg Bags",
      image: "https://images.unsplash.com/photo-1563286386-8d1976a445d4?q=80&w=1000&auto=format&fit=crop",
      desc: "Finely ground ice. Essential for cocktails (mojitos!), smoothies, and rapid cooling of beverages."
    },
    {
      id: 3,
      name: "Solid Ice Blocks",
      subtitle: "Bulk / Large Format",
      image: "https://images.unsplash.com/photo-1596489397631-5c317551cc13?q=80&w=1000&auto=format&fit=crop",
      desc: "Large, slow-melting blocks designed for cooler boxes, fishing trips, and catering events."
    }
  ];

  return (
    <section id="products" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-cyan-600 font-bold tracking-widest uppercase text-sm">Our Range</span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mt-2 mb-6">Choose Your Ice</h2>
          <div className="w-20 h-1.5 bg-cyan-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {products.map((p) => (
            <div key={p.id} className="group flex flex-col h-full bg-slate-50 border border-slate-100 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="h-64 overflow-hidden relative">
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10" aria-hidden="true"></div>
                <img 
                  src={p.image} 
                  alt={p.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold text-slate-900">{p.name}</h3>
                  <Snowflake className="text-cyan-400 w-5 h-5" aria-hidden="true" />
                </div>
                <p className="text-slate-500 font-medium text-sm mb-4 bg-white inline-block self-start px-3 py-1 rounded-md border border-slate-200">{p.subtitle}</p>
                <p className="text-slate-600 mb-8 leading-relaxed flex-1">{p.desc}</p>
                
                <a 
                  href={`${WHATSAPP_BASE}?text=${encodeURIComponent(`I would like to order ${p.name}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-cyan-600 text-white font-bold py-4 rounded-xl transition-colors"
                  aria-label={`Order ${p.name} on WhatsApp`}
                >
                  Order Now <ChevronRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  return (
    <section id="about" className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
          {[
            { icon: <Droplets className="w-8 h-8" aria-hidden="true"/>, title: "Triple Filtered", desc: "We use advanced filtration for pure, tasteless water." },
            { icon: <Snowflake className="w-8 h-8" aria-hidden="true"/>, title: "Slow Frozen", desc: "Harder ice that lasts longer in your drink." },
            { icon: <Truck className="w-8 h-8" aria-hidden="true"/>, title: "Fast Delivery", desc: "We deliver to your door in record time." },
            { icon: <ShieldCheck className="w-8 h-8" aria-hidden="true"/>, title: "Hygiene Certified", desc: "Produced in a clean, controlled environment." }
          ].map((f, i) => (
            <div key={i} className="space-y-4">
              <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center text-cyan-400 mx-auto md:mx-0">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold">{f.title}</h3>
              <p className="text-slate-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-[2.5rem] p-8 md:p-16 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-12">
          
          <div className="text-white md:w-1/2">
            <h2 className="text-3xl md:text-5xl font-black mb-6">Running Low?</h2>
            <p className="text-blue-50 text-lg mb-8 font-medium">
              We are just a message away. Contact us for bulk pricing, event supply, or emergency deliveries.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-full"><Phone className="text-white" aria-hidden="true" /></div>
                <a href={`tel:${PHONE_E164}`} className="text-2xl font-bold" aria-label={`Call ${PHONE_LOCAL}`}>{PHONE_LOCAL}</a>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-full"><MapPin className="text-white" aria-hidden="true" /></div>
                <span className="text-lg font-medium">Pretoria, Gauteng</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg w-full md:w-1/3">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Quick Order</h3>
            <p className="text-slate-500 text-sm mb-6">Enter details to start WhatsApp chat</p>
            
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              const name = e.target.elements.name.value;
              const msg = e.target.elements.message.value;
              const url = `${WHATSAPP_BASE}?text=${encodeURIComponent(`Name: ${name}\nOrder: ${msg}`)}`;
              window.open(url, '_blank');
            }}>
              <div>
                <input name="name" type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none" placeholder="Your Name" required />
              </div>
              <div>
                <textarea name="message" rows="3" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none" placeholder="How many bags do you need?" required></textarea>
              </div>
              <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2" aria-label="Start WhatsApp order">
                <MessageCircle size={20} aria-hidden="true" />
                WhatsApp Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-slate-50 py-12 border-t border-slate-200">
    <div className="container mx-auto px-6 text-center">
      <div className="flex justify-center mb-6">
        <GlacierLogo className="w-10 h-10" textClassName="text-lg" />
      </div>
      <div className="flex justify-center gap-8 mb-8 text-slate-600 font-medium text-sm">
        <a href="#home" className="hover:text-cyan-600">Home</a>
        <a href="#products" className="hover:text-cyan-600">Products</a>
        <a href="#contact" className="hover:text-cyan-600">Contact</a>
      </div>
      <div className="flex justify-center gap-6 mb-8">
        <a href="#" className="bg-white p-2 rounded-full shadow-sm hover:text-blue-600 cursor-pointer transition-colors" aria-label="Facebook">
          <Facebook size={20} />
        </a>
        <a href="#" className="bg-white p-2 rounded-full shadow-sm hover:text-pink-600 cursor-pointer transition-colors" aria-label="Instagram">
          <Instagram size={20} />
        </a>
      </div>
      <p className="text-slate-400 text-xs">&copy; {new Date().getFullYear()} Glacier Pure Ice. All rights reserved.</p>
    </div>
  </footer>
);

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-sans antialiased text-slate-800 bg-white">
      <Navbar isScrolled={isScrolled} />
      <Hero />
      <Features />
      <Products />
      <Contact />
      <Footer />
      
      {/* Floating Action Button */}
      <a 
        href={`${WHATSAPP_BASE}?text=${encodeURIComponent('Hi Glacier Pure Ice, I would like to place an order.')}`} 
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-400 transition-transform hover:scale-110 z-50 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={28} aria-hidden="true" />
      </a>
    </div>
  );
};

export default App;
