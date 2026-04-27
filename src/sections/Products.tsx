import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingCart, X, MessageCircle, Trash2, Plus, Minus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface AgeOption {
  label: string;
  price: string; 
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
  { label: '8 Semanas', price: 'S/ 10' },
  { label: '12 Semanas', price: 'S/ 15' },
  { label: '16 Semanas', price: 'S/ 20' },
  { label: '20 Semanas', price: 'S/ 25' },
  { label: '24 Semanas', price: 'S/ 30' },
  { label: '2 Dias X 100', price: 'S/ 450' },
  { label: '4 Semanas X 100', price: 'S/ 600' },
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
    description: 'Máxima eficiencia en producción de huevos blancos de calidad premium con bajo consumo de alimento.',
    image: '/gallina-3.jpg',
    characteristics: ['320+ huevos/año', 'Máxima eficiencia'],
    ageOptions: commonAgeOptions
  },
  {
    id: 3,
    name: 'Hy-Line Brown',
    description: 'La ponedora más equilibrada del mundo; famosa por sus huevos de intenso color marrón y excelente persistencia.',
    image: '/hyline.jpg',
    characteristics: ['350+ huevos/año', 'Cáscara extra fuerte'],
    ageOptions: commonAgeOptions
  },
];

export default function Products() {
  const [selectedAges, setSelectedAges] = useState<Record<number, string>>(
    Object.fromEntries(products.map(p => [p.id, p.ageOptions[0].label]))
  );
  const [cart, setCart] = useState<{ product: Product; quantity: number; selectedAge: string; priceAtSelection: string }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Lógica para calcular el TOTAL
  const calculateTotal = () => {
    return cart.reduce((acc, item) => {
      // Quitamos "S/ " y convertimos a número para sumar
      const numericPrice = parseFloat(item.priceAtSelection.replace('S/ ', ''));
      return acc + (numericPrice * item.quantity);
    }, 0);
  };

  const addToCart = (product: Product) => {
    const age = selectedAges[product.id];
    const price = product.ageOptions.find(opt => opt.label === age)?.price || 'S/ 0';
    
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.selectedAge === age);
      if (existing) {
        return prev.map((item) => (item.product.id === product.id && item.selectedAge === age) ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1, selectedAge: age, priceAtSelection: price }];
    });
    setIsCartOpen(true);
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

  const sendWhatsApp = () => {
    let message = `📦 *NUEVO PEDIDO - AVÍCOLA AGAVES PERÚ*\n\n`;
    cart.forEach(item => {
      message += `• ${item.quantity}x ${item.product.name} (${item.selectedAge}) - ${item.priceAtSelection}\n`;
    });
    message += `\n💰 *TOTAL ESTIMADO: S/ ${calculateTotal()}*`;
    window.open(`https://wa.me/51946665053?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="productos" className="py-20 bg-[#fef9f0] relative overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">Nuestro Catálogo</h2>
        <p className="text-center text-gray-600 mb-12">Calidad garantizada para tu producción</p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 flex flex-col h-full transition-transform hover:scale-[1.02]">
              <img src={product.image} className="rounded-2xl w-full h-52 object-cover mb-4" />
              <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
              <p className="text-gray-500 text-sm mb-4 flex-grow">{product.description}</p>
              
              <div className="space-y-2 mb-6">
                {product.characteristics.map((c, i) => (
                  <div key={i} className="flex items-center text-xs text-gray-600 font-medium">
                    <span className="w-2 h-2 bg-[#f7c35f] rounded-full mr-2" /> {c}
                  </div>
                ))}
              </div>

              <div className="text-[#f7c35f] font-bold text-xl mb-4 text-center bg-gray-50 py-2 rounded-xl">
                {product.ageOptions.find(opt => opt.label === selectedAges[product.id])?.price}
              </div>

              <select 
                className="w-full p-3 border rounded-xl mb-4 bg-white outline-none ring-1 ring-gray-200"
                value={selectedAges[product.id]}
                onChange={(e) => setSelectedAges({...selectedAges, [product.id]: e.target.value})}
              >
                {product.ageOptions.map(opt => <option key={opt.label} value={opt.label}>{opt.label}</option>)}
              </select>

              <button 
                onClick={() => addToCart(product)}
                className="w-full bg-[#1e1e1e] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#f7c35f] hover:text-[#1e1e1e] transition-all"
              >
                <ShoppingCart className="w-5 h-5" /> Agregar al Carrito
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CARRITO LATERAL (DRAWER) */}
      <div className={`fixed inset-0 z-[100] transition-all duration-300 ${isCartOpen ? 'visible' : 'invisible'}`}>
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0'}`} 
          onClick={() => setIsCartOpen(false)}
        />
        <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-500 transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
          <div className="p-6 border-b flex justify-between items-center bg-[#1e1e1e] text-white">
            <h2 className="text-xl font-bold flex items-center gap-2"><ShoppingCart className="w-6 h-6 text-[#f7c35f]" /> Tu Carrito</h2>
            <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white/10 rounded-full"><X /></button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p>Tu carrito está vacío</p>
              </div>
            ) : (
              cart.map((item, i) => (
                <div key={i} className="flex gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm relative group">
                  <img src={item.product.image} className="w-20 h-20 rounded-xl object-cover" />
                  <div className="flex-1">
                    <p className="font-bold text-lg">{item.product.name}</p>
                    <p className="text-sm text-[#f7c35f] font-semibold">{item.selectedAge}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center border rounded-lg overflow-hidden bg-gray-50">
                        <button onClick={() => updateQuantity(item.product.id, item.selectedAge, -1)} className="p-1 px-3 hover:bg-gray-200"><Minus className="w-3 h-3"/></button>
                        <span className="px-2 font-bold text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.selectedAge, 1)} className="p-1 px-3 hover:bg-gray-200"><Plus className="w-3 h-3"/></button>
                      </div>
                      <p className="font-bold ml-auto">{item.priceAtSelection}</p>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.product.id, item.selectedAge)} className="absolute top-2 right-2 text-gray-300 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-6 border-t bg-gray-50">
              {/* SECCIÓN DEL TOTAL */}
              <div className="flex justify-between items-center mb-4 px-2">
                <span className="text-gray-600 font-semibold uppercase text-sm tracking-wider">Total del Pedido:</span>
                <span className="text-2xl font-black text-[#1e1e1e]">S/ {calculateTotal()}</span>
              </div>

              <button 
                onClick={sendWhatsApp}
                className="w-full bg-[#25D366] text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#128C7E] transition-all shadow-lg"
              >
                <MessageCircle className="w-6 h-6" /> Confirmar por WhatsApp
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}