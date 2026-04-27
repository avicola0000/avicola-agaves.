import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus, Check, ChevronDown } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

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
    return product.ageOptions.find(opt => opt.label === selectedAgeLabel)?.price || 'S/ 0';
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
    
    setIsDialogOpen(true);
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
    const today = new Date().toLocaleDateString('es-PE');
    let message = `📦 *SOLICITUD DE COTIZACIÓN - AVÍCOLA AGAVES PERÚ*\n`;
    message += `*Fecha:* ${today}\n\n`;
    message += `*DETALLE:*\n`;
    cart.forEach((item) => {
      message += `• ${item.quantity}x ${item.product.name} (${item.selectedAge}) — *${item.priceAtSelection}*\n`;
    });
    message += `\n📍 *Ubicación:* Perú\n`;
    // USANDO TU NÚMERO ORIGINAL: +51 946 665 053
    window.open(`https://wa.me/51946665053?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section ref={sectionRef} id="productos" className="relative py-20 bg-[#fef9f0]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">Nuestro Catálogo</h2>
          <p className="text-gray-600">Precios actualizados para Perú</p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="product-card bg-white rounded-3xl shadow-lg p-6 flex flex-col">
              <div className="relative mb-4">
                <img src={product.image} className="rounded-2xl w-full h-48 object-cover" />
                <div className="absolute top-2 right-2 bg-white/90 px-3 py-1 rounded-full font-bold">
                  {getPriceForSelectedAge(product)}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4">{product.name}</h3>
              <select 
                onChange={(e) => handleAgeChange(product.id, e.target.value)}
                className="mb-4 p-2 border rounded-xl w-full"
              >
                {product.ageOptions.map(opt => <option key={opt.label} value={opt.label}>{opt.label}</option>)}
              </select>
              <button onClick={() => addToCart(product)} className="bg-[#1e1e1e] text-white py-3 rounded-xl font-bold hover:bg-[#f7c35f]">
                Agregar al Pedido
              </button>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white rounded-3xl">
          <DialogHeader><DialogTitle>Resumen de Pedido</DialogTitle></DialogHeader>
          <div className="space-y-4 my-4">
            {cart.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl">
                <div>
                  <p className="font-bold">{item.product.name}</p>
                  <p className="text-xs">{item.selectedAge} (Cant: {item.quantity})</p>
                </div>
                <p className="font-bold text-[#f7c35f]">{item.priceAtSelection}</p>
              </div>
            ))}
          </div>
          <button onClick={sendWhatsAppQuote} className="w-full bg-green-500 text-white py-4 rounded-xl font-bold">
            Enviar por WhatsApp
          </button>
        </DialogContent>
      </Dialog>
    </section>
  );
}