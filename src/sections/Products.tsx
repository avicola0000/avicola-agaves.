import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus, ShoppingCart, Check, ChevronDown } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

interface AgeOption {
  label: string;
  price: string; // Cambiado a string para soportar "S/"
}

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  characteristics: string[];
  ageOptions: AgeOption[];
}

// Todos los productos tienen ahora los mismos precios unificados
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
    id: 2,
    name: 'ISA Brown',
    description: 'La ponedora estrella, dócil y altamente eficiente; garantiza más de 300 huevos grandes, resistentes y de calidad premium cada año.',
    image: '/gallina-1.jpg',
    characteristics: ['300+ huevos/año', 'Huevos grandes marrones', 'Excelente temperamento', 'Muy eficiente'],
    ageOptions: commonAgeOptions
  },
  {
    id: 3,
    name: 'Leghorn Blanca',
    description: 'La ponedora estrella, dócil y altamente eficiente; garantiza más de 320 huevos grandes, resistentes y de calidad premium cada año.',
    image: '/gallina-3.jpg',
    characteristics: ['320+ huevos/año', 'Máxima eficiencia', 'Huevos calidad premium', 'Muy dócil'],
    ageOptions: commonAgeOptions
  },
  {
    id: 4,
    name: 'Hy-Line Brown',
    description: 'La ponedora más equilibrada del mercado; dócil, persistente y famosa por producir más de 350 huevos de un intenso color marrón y cáscara extra fuerte.',
    image: '/hyline.jpg',
    characteristics: ['350+ huevos/año', 'Cáscara extra fuerte', 'Excelente persistencia', 'Color marrón intenso'],
    ageOptions: commonAgeOptions
  },
];

export default function Products() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  const [selectedAges, setSelectedAges] = useState<Record<number, string>>(
    Object.fromEntries(products.map(p => [p.id, p.ageOptions[0].label]))
  );

  const [cart, setCart] = useState<{ product: Product; quantity: number; selectedAge: string; priceAtSelection: string }[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.product-card');
      if (cards) {
        gsap.fromTo(cards,
          { rotateX: 45, opacity: 0, y: 50 },
          {
            rotateX: 0, opacity: 1, y: 0,
            duration: 0.8, stagger: 0.1, ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleAgeChange = (productId: number, ageLabel: string) => {
    setSelectedAges(prev => ({ ...prev, [productId]: ageLabel }));
  };

  const getPriceForSelectedAge = (product: Product) => {
    const selectedAgeLabel = selectedAges[product.id];
    return product.ageOptions.find(opt => opt.label === selectedAgeLabel)?.price || '0';
  };

  const addToCart = (product: Product) => {
    const age = selectedAges[product.id];
    const price = getPriceForSelectedAge(product);

    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.selectedAge === age);
      if (existing) {
        return prev.map((item) =>
          (item.product.id === product.id && item.selectedAge === age)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, selectedAge: age, priceAtSelection: price }];
    });
  };

  const removeFromCart = (productId: number, age: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === productId && item.selectedAge === age);
      if (existing && existing.quantity > 1) {
        return prev.map((item) =>
          (item.product.id === productId && item.selectedAge === age)
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prev.filter((item) => !(item.product.id === productId && item.selectedAge === age));
    });
  };

  const sendWhatsAppQuote = () => {
    if (cart.length === 0) return;

    const today = new Date().toLocaleDateString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    let message = `📦 *SOLICITUD DE COTIZACIÓN - AVÍCOLA AGAVES PERÚ*\n`;
    message += `👋 ¡Hola! Me gustaría cotizar el siguiente pedido desde la web:\n\n`;
    message += `*Fecha:* ${today}\n\n`;
    message += `*DETALLE:*\n`;

    cart.forEach((item) => {
      message += `• ${item.quantity}x ${item.product.name} (${item.selectedAge}) — *${item.priceAtSelection}*\n`;
    });

    message += `\n📍 *Ubicación:* Perú\n`;
    window.open(`https://wa.me/51982057180?text=${encodeURIComponent(message)}`, '_blank');
    setIsDialogOpen(false);
  };

  return (
    <section ref={sectionRef} id="productos" className="relative py-20 bg-[#fef9f0] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-[#f7c35f] font-semibold text-sm uppercase tracking-wider mb-2 block">Venta de Gallinas</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1e1e1e] mb-4">Nuestro <span className="text-[#f7c35f]">Catálogo</span></h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Selecciona la edad ideal para tu proyecto avícola. Despacho a todo el Perú.</p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="product-card bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-lg">
                  <span className="text-xl font-bold text-[#1e1e1e]">
                    {getPriceForSelectedAge(product)}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-[#1e1e1e] mb-2">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-6 flex-1">{product.description}</p>

                <div className="mb-6">
                  <label className="text-[10px] uppercase font-bold text-gray-400 mb-2 block tracking-widest">Seleccionar Edad</label>
                  <div className="relative">
                    <select
                      value={selectedAges[product.id]}
                      onChange={(e) => handleAgeChange(product.id, e.target.value)}
                      className="w-full appearance-none bg-gray-50 border border-gray-200 text-[#1e1e1e] py-3 px-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f7c35f] transition-all cursor-pointer"
                    >
                      {product.ageOptions.map((opt) => (
                        <option key={opt.label} value={opt.label}>{opt.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-[#1e1e1e] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#f7c35f] hover:text-[#1e1e1e] transition-all"
                >
                  <Plus className="w-5 h-5" /> Agregar al Pedido
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Resumen de Pedido</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 my-4 max-h-[60vh] overflow-y-auto">
            {cart.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-gray-50 p-3 rounded-2xl">
                <img src={item.product.image} className="w-16 h-16 rounded-xl object-cover" />
                <div className="flex-1">
                  <h4 className="font-bold text-sm">{item.product.name}</h4>
                  <p className="text-xs text-gray-400">{item.selectedAge}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button onClick={() => removeFromCart(item.product.id, item.selectedAge)} className="p-1 bg-gray-200 rounded-md"><Minus className="w-3 h-3"/></button>
                    <span className="text-sm font-bold">{item.quantity}</span>
                    <button onClick={() => addToCart(item.product)} className="p-1 bg-gray-200 rounded-md"><Plus className="w-3 h-3"/></button>
                  </div>
                </div>
                <p className="font-bold text-[#f7c35f]">{item.priceAtSelection}</p>
              </div>
            ))}
          </div>
          <button onClick={sendWhatsAppQuote} className="w-full bg-green-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-green-600">
            <Check className="w-6 h-6" /> Enviar por WhatsApp
          </button>
        </DialogContent>
      </Dialog>
    </section>
  );
}