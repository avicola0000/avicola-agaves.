import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus, ShoppingCart, X, MessageCircle, ShoppingBag, Trash2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface AgeOption {
  label: string;
  price: number;
}

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  characteristics: string[];
  ageOptions: AgeOption[];
}

const commonAgeOptions: AgeOption[] = [
  { label: '8 Semanas', price: 10 },
  { label: '12 Semanas', price: 15 },
  { label: '16 Semanas', price: 20 },
  { label: '20 Semanas', price: 25 },
  { label: '24 Semanas', price: 30 },
  { label: '2 Dias X 100', price: 450 },
  { label: '4 Semanas X 100', price: 600 },
];

const products: Product[] = [
  {
    id: 1,
    name: 'ISA Brown',
    description: 'La ponedora estrella, dócil y altamente eficiente; garantiza más de 300 huevos grandes.',
    image: '/gallina-1.jpg',
    characteristics: ['300+ huevos/año', 'Huevos grandes marrones'],
    ageOptions: commonAgeOptions
  },
  {
    id: 2,
    name: 'Leghorn Blanca',
    description: 'Máxima eficiencia en producción de huevos blancos de calidad premium.',
    image: '/gallina-3.jpg',
    characteristics: ['320+ huevos/año', 'Máxima eficiencia'],
    ageOptions: commonAgeOptions
  },
  {
    id: 3,
    name: 'Hy-Line Brown',
    description: 'Famosa por sus huevos de intenso color marrón y excelente persistencia.',
    image: '/hyline.jpg',
    characteristics: ['350+ huevos/año', 'Cáscara extra fuerte'],
    ageOptions: commonAgeOptions
  },
];

export default function Products() {
  const [selectedAges, setSelectedAges] = useState<Record<number, string>>(
    Object.fromEntries(products.map(p => [p.id, p.ageOptions[0].label]))
  );
  const [cart, setCart] = useState<{ product: Product; quantity: number; selectedAge: string; priceAtSelection: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product: Product) => {
    try {
      const ageLabel = selectedAges[product.id];
      const ageOption = product.ageOptions.find(opt => opt.label === ageLabel);
      const price = ageOption ? ageOption.price : 0;
      
      setCart((prev) => {
        const existing = prev.find((item) => item.product.id === product.id && item.selectedAge === ageLabel);
        if (existing) {
          return prev.map((item) => (item.product.id === product.id && item.selectedAge === ageLabel) ? { ...item, quantity: item.quantity + 1 } : item);
        }
        return [...prev, { product, quantity: 1, selectedAge: ageLabel, priceAtSelection: price }];
      });
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
    }
  };

  const updateQuantity = (productId: number, age: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId && item.selectedAge === age) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (productId: number, age: string) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.selectedAge === age)));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.priceAtSelection * item.quantity), 0);
  };

  const sendWhatsAppQuote = () => {
    let message = `📦 *NUEVO PEDIDO - AVÍCOLA AGAVES PERÚ*\n\n`;
    cart.forEach(item => {
      message += `• ${item.quantity}x ${item.product.name} (${item.selectedAge}) - S/ ${item.priceAtSelection * item.quantity}\n`;
    });
    message += `\n💰 *TOTAL ESTIMADO: S/ ${getTotalPrice()}*`;
    window.open(`https://wa.me/51946665053?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="productos" className="py-20 bg-[#fef9f0] relative min-h-[500px]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Catálogo de Productos</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 flex flex-col h-full">
              <img src={product.image} alt={product.name} className="rounded-2xl w-full h-52 object-cover mb-4" />
              <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
              <p className="text-gray-500 text-sm mb-4 flex-grow">{product.description}</p>
              
              <div className="text-[#f7c35f] font-bold text-xl mb-4 text-center bg-gray-50 py-2 rounded-xl">
                S/ {product.ageOptions.find(opt => opt.label === selectedAges[product.id])?.price}
              </div>

              <select 
                className="w-full p-3 border rounded-xl mb-4 bg-white outline-none cursor-pointer"
                value={selectedAges[product.id]}
                onChange={(e) => setSelectedAges({...selectedAges, [product.id]: e.target.value})}
              >
                {product.ageOptions.map(opt => <option key={opt.label} value={opt.label}>{opt.label}</option>)}
              </select>

              <button 
                onClick={() => addToCart(product)}
                className="w-full bg-[#1e1e1e] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#f7c35f] hover:text-[#1e1e1e] transition-all"
              >
                <ShoppingCart className="w-5 h-5" /> Agregar al Pedido
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* BOTÓN FLOTANTE DEL CARRITO */}
      {cart.length > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-10 right-10 z-[999] bg-[#f7c35f] text-[#1e1e1e] p-5 rounded-full shadow-[0_10px_30px_rgba(247,195,95,0.4)] hover:scale-110 transition-transform flex items-center justify-center border-4 border-white"
        >
          <ShoppingBag className="w-8 h-8" />
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center border-2 border-white">
            {totalItems}
          </span>
        </button>
      )}

      {/* PANEL LATERAL (CARRO) */}
      <div className={`fixed inset-0 z-[1000] ${isCartOpen ? 'block' : 'hidden'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
        <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col">
          <div className="p-6 border-b flex justify-between items-center bg-[#1e1e1e] text-white">
            <h2 className="text-xl font-bold flex items-center gap-2">Tu Carrito</h2>
            <button onClick={() => setIsCartOpen(false)} className="p-2"><X className="w-6 h-6" /></button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.map((item, i) => (
              <div key={`${item.product.id}-${item.selectedAge}`} className="flex gap-4 bg-gray-50 p-4 rounded-2xl relative">
                <img src={item.product.image} className="w-20 h-20 rounded-xl object-cover" />
                <div className="flex-1">
                  <p className="font-bold">{item.product.name}</p>
                  <p className="text-xs text-gray-400">{item.selectedAge}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button onClick={() => updateQuantity(item.product.id, item.selectedAge, -1)} className="p-1 bg-white border rounded-md"><Minus className="w-3 h-3"/></button>
                    <span className="text-sm font-bold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.selectedAge, 1)} className="p-1 bg-white border rounded-md"><Plus className="w-3 h-3"/></button>
                  </div>
                </div>
                <div className="text-right flex flex-col justify-between items-end">
                  <button onClick={() => removeItem(item.product.id, item.selectedAge)} className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                  <p className="font-bold text-[#f7c35f]">S/ {item.priceAtSelection * item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 border-t bg-gray-50">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-500 font-medium uppercase text-xs tracking-widest">Total Estimado</span>
              <span className="text-3xl font-black text-[#1e1e1e]">S/ {getTotalPrice()}</span>
            </div>
            <button onClick={sendWhatsAppQuote} className="w-full bg-[#25D366] text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#128C7E] transition-all">
              <MessageCircle className="w-6 h-6" /> Confirmar por WhatsApp
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}