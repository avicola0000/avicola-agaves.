import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus, ShoppingCart, Check, ChevronDown } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

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

const products: Product[] = [
  {
    id: 1,
    name: 'Sussex',
    description: 'Gallina de doble propósito, muy tranquila y excelente madre. Ideal para climas variados.',
    image: '/gallina-4.jpg',
    characteristics: ['240-260 huevos/año', 'Resistente al frío', 'Muy dócil', 'Doble propósito'],
    ageOptions: [
      { label: '1 Día', price: 1100 },
      { label: '2 Días', price: 1350 },
      { label: '3 Días', price: 1800 },
      { label: '4 Días', price: 1900 },
      { label: '5 Días', price: 2200 },
      { label: '6 Días', price: 2900 },
      { label: '1 Semana', price: 3200 },
      { label: '2 Semanas', price: 3500 },
      { label: '3 Semanas', price: 3900 },
      { label: '4 Semanas', price: 4400 },
      { label: '5 Semanas', price: 4900 },
      { label: '6 Semanas', price: 5300 },
      { label: '7 Semanas', price: 5900 },
      { label: '8 Semanas', price: 6500 },
      { label: '9 Semanas', price: 6900 },
      { label: '10 Semanas', price: 7700 },
      { label: '11 Semanas', price: 7900 },
      { label: '12 Semanas', price: 8500 },
      { label: '13 Semanas', price: 9100 },
      { label: '14 Semanas', price: 9900 },
      { label: '15 Semanas', price: 11000 },
      { label: '16 Semanas', price: 12000 },
      { label: '17 Semanas', price: 13000 },
      { label: '18 Semanas', price: 15000 },
    ]
  },
  {
    id: 2,
    name: 'ISA Brown',
    description: 'La ponedora estrella, dócil y altamente eficiente; garantiza más de 300 huevos grandes, resistentes y de calidad premium cada año.',
    image: '/gallina-1.jpg',
    characteristics: ['300+ huevos/año', 'Huevos grandes marrones', 'Excelente temperamento', 'Muy eficiente'],
    ageOptions: [
      { label: '1 Día', price: 1100 },
      { label: '2 Días', price: 1300 },
      { label: '3 Días', price: 1500 },
      { label: '4 Días', price: 1900 },
      { label: '5 Días', price: 2100 },
      { label: '6 Días', price: 2500 },
      { label: '1 Semana', price: 2900 },
      { label: '2 Semanas', price: 3500 },
      { label: '3 Semanas', price: 3900 },
      { label: '4 Semanas', price: 4200 },
      { label: '5 Semanas', price: 4800 },
      { label: '6 Semanas', price: 5000 },
      { label: '7 Semanas', price: 5900 },
      { label: '8 Semanas', price: 6000 },
      { label: '9 Semanas', price: 6200 },
      { label: '10 Semanas', price: 7600 },
      { label: '11 Semanas', price: 8200 },
      { label: '12 Semanas', price: 9200 },
      { label: '13 Semanas', price: 10800 },
      { label: '14 Semanas', price: 11600 },
      { label: '15 Semanas', price: 11900 },
      { label: '16 Semanas', price: 12500 },
      { label: '17 Semanas', price: 13200 },
      { label: '18 Semanas', price: 14600 },
    ]
  },
  {
    id: 3,
    name: 'Lohmann Brown',
    description: 'La ponedora estrella, dócil y altamente eficiente; garantiza más de 320 huevos grandes, resistentes y de calidad premium cada año.',
    image: '/gallina-3.jpg', // Asegúrate de que esta imagen corresponda a la Lohmann
    characteristics: ['320+ huevos/año', 'Máxima eficiencia', 'Huevos calidad premium', 'Muy dócil'],
    ageOptions: [
      { label: '1 Día', price: 1500 },
      { label: '2 Días', price: 2500 },
      { label: '3 Días', price: 2800 },
      { label: '4 Días', price: 3400 },
      { label: '5 Días', price: 4000 },
      { label: '6 Días', price: 4300 },
      { label: '1 Semana', price: 4500 },
      { label: '2 Semanas', price: 5500 },
      { label: '3 Semanas', price: 6500 },
      { label: '4 Semanas', price: 7500 },
      { label: '5 Semanas', price: 8500 },
      { label: '6 Semanas', price: 9500 },
      { label: '7 Semanas', price: 9800 },
      { label: '8 Semanas', price: 13300 },
      { label: '9 Semanas', price: 13900 },
      { label: '10 Semanas', price: 14200 },
      { label: '11 Semanas', price: 14600 },
      { label: '12 Semanas', price: 14900 },
      { label: '13 Semanas', price: 15100 },
      { label: '14 Semanas', price: 15600 },
      { label: '15 Semanas', price: 15900 },
      { label: '16 Semanas', price: 16100 },
      { label: '17 Semanas', price: 16400 },
      { label: '18 Semanas', price: 16900 },
    ]
  },
  {
    id: 4,
    name: 'Hy-Line Brown',
    description: 'La ponedora más equilibrada del mercado; dócil, persistente y famosa por producir más de 350 huevos de un intenso color marrón y cáscara extra fuerte.',
    image: '/hyline.jpg', // Recuerda subir una foto con este nombre a la carpeta public
    characteristics: ['350+ huevos/año', 'Cáscara extra fuerte', 'Excelente persistencia', 'Color marrón intenso'],
    ageOptions: [
      { label: '1 Día', price: 1300 },
      { label: '2 Días', price: 1900 },
      { label: '3 Días', price: 2200 },
      { label: '4 Días', price: 2500 },
      { label: '5 Días', price: 2900 },
      { label: '6 Días', price: 3100 },
      { label: '1 Semana', price: 3500 },
      { label: '2 Semanas', price: 3900 },
      { label: '3 Semanas', price: 4500 },
      { label: '4 Semanas', price: 5100 },
      { label: '5 Semanas', price: 5800 },
      { label: '6 Semanas', price: 6000 },
      { label: '7 Semanas', price: 6300 },
      { label: '8 Semanas', price: 6900 },
      { label: '9 Semanas', price: 7500 },
      { label: '10 Semanas', price: 7900 },
      { label: '11 Semanas', price: 8200 },
      { label: '12 Semanas', price: 9000 },
      { label: '13 Semanas', price: 9300 },
      { label: '14 Semanas', price: 10200 },
      { label: '15 Semanas', price: 11100 },
      { label: '16 Semanas', price: 12000 },
      { label: '17 Semanas', price: 13300 },
      { label: '18 Semanas', price: 14900 },
    ]
  },
  {
    id: 5,
    name: 'Araucana Mapuche',
    description: 'La exótica de los huevos azules; una raza ancestral y rústica, famosa por sus llamativos aretes de plumas y por producir huevos de cáscara resistente en tonos turquesa y verde esmeralda. Ideal para quienes buscan un producto único.',
    image: '/gallina-5.jpg', // Recuerda guardar la foto como araucana.jpg en la carpeta public
    characteristics: ['Huevos Turquesa/Verde', 'Raza Ancestral', 'Alta resistencia', 'Producto Premium'],
    ageOptions: [
      { label: '1 Día', price: 6200 },
      { label: '2 Días', price: 7100 },
      { label: '3 Días', price: 7800 },
      { label: '4 Días', price: 8000 },
      { label: '5 Días', price: 8500 },
      { label: '6 Días', price: 9000 },
      { label: '1 Semana', price: 10000 },
      { label: '2 Semanas', price: 10400 },
      { label: '3 Semanas', price: 11000 },
      { label: '4 Semanas', price: 12700 },
      { label: '5 Semanas', price: 13100 },
      { label: '6 Semanas', price: 13800 },
      { label: '7 Semanas', price: 14100 },
      { label: '8 Semanas', price: 14500 },
      { label: '9 Semanas', price: 15000 },
      { label: '10 Semanas', price: 15600 },
      { label: '11 Semanas', price: 16000 },
      { label: '12 Semanas', price: 16800 },
      { label: '13 Semanas', price: 17000 },
      { label: '14 Semanas', price: 17500 },
      { label: '15 Semanas', price: 18200 },
      { label: '16 Semanas', price: 19000 },
      { label: '17 Semanas', price: 19600 },
      { label: '18 Semanas', price: 20000 },
    ]
  },
  {
    id: 6,
    name: 'Huevos Blancos de Campo',
    description: 'Huevos frescos seleccionados. Elige el tamaño y formato que mejor se adapte a tus necesidades.',
    image: '/huevo-1.jpg',
    characteristics: ['Frescura diaria', 'Cáscara firme', 'Directo de granja'],
    ageOptions: [
      { label: 'Segunda (Cartón x30)', price: 3100 },
      { label: 'Segunda (Caja x180)', price: 18200 },
      { label: 'Primera (Cartón x30)', price: 3700 },
      { label: 'Primera (Caja x180)', price: 20800 },
      { label: 'Extra (Cartón x30)', price: 3800 },
      { label: 'Extra (Caja x180)', price: 21400 },
      { label: 'Súper (Cartón x30)', price: 4400 },
      { label: 'Súper (Caja x180)', price: 24800 },
      { label: 'Jumbo (Cartón x30)', price: 4800 },
      { label: 'Jumbo (Caja x180)', price: 27400 },
    ]
  },
  {
    id: 7,
    name: 'Huevos Rojos Premium',
    description: 'Nuestra selección de huevos rojos con yema de color intenso y gran valor nutricional.',
    image: '/huevo-2.jpg',
    characteristics: ['Yema intensa', 'Sabor superior', 'Calidad exportación'],
    ageOptions: [
      { label: 'Segunda (Cartón x30)', price: 3200 },
      { label: 'Segunda (Caja x180)', price: 19000 },
      { label: 'Primera (Cartón x30)', price: 3900 },
      { label: 'Primera (Caja x180)', price: 21600 },
      { label: 'Extra (Cartón x30)', price: 4050 },
      { label: 'Extra (Caja x180)', price: 22000 },
      { label: 'Súper (Cartón x30)', price: 4500 },
      { label: 'Súper (Caja x180)', price: 26000 },
      { label: 'Jumbo (Cartón x30)', price: 5000 },
      { label: 'Jumbo (Caja x180)', price: 30000 },
    ]
  },
  {
    id: 8,
    name: 'Huevos Azules (Araucana)',
    description: 'El orgullo de nuestra granja. Huevos de color único, bajos en colesterol y de cáscara muy resistente.',
    image: '/huevo-3.jpg',
    characteristics: ['Color turquesa natural', 'Bajo colesterol', 'Exclusivos'],
    ageOptions: [
      { label: 'Cartón x30', price: 4300 },
      { label: 'Caja x180', price: 24900 },
    ]
  },
];
export default function Products() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  // Estado para manejar qué edad seleccionó el usuario para cada gallina
  const [selectedAges, setSelectedAges] = useState<Record<number, string>>(
    Object.fromEntries(products.map(p => [p.id, p.ageOptions[0].label]))
  );

  const [cart, setCart] = useState<{ product: Product; quantity: number; selectedAge: string; priceAtSelection: number }[]>([]);
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
    return product.ageOptions.find(opt => opt.label === selectedAgeLabel)?.price || 0;
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

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.priceAtSelection * item.quantity), 0);
  };

  const sendWhatsAppQuote = () => {
    if (cart.length === 0) return;

    // Obtener la fecha actual automáticamente
    const today = new Date().toLocaleDateString('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    // Separar productos por categoría (ID 1-5 son aves, el resto son huevos)
    const birds = cart.filter(item => item.product.id <= 5);
    const eggs = cart.filter(item => item.product.id > 5);

    let message = `📦 *SOLICITUD DE COTIZACIÓN - AVÍCOLA AGAVES*\n`;
    message += `👋 ¡Hola, Avícola Agaves! Me gustaría recibir una cotización formal para el siguiente pedido realizado desde la web:\n\n`;
    message += `*Cliente:* [Nombre del Cliente]\n`;
    message += `*Fecha:* ${today}\n\n`;
    message += `*DETALLE DEL PEDIDO:*\n`;

    if (birds.length > 0) {
      message += `🐣 *Aves de Raza:*\n`;
      birds.forEach((item) => {
        message += `• ${item.quantity}x ${item.product.name} (${item.selectedAge}) — *$${(item.priceAtSelection * item.quantity).toLocaleString('es-CL')}*\n`;
      });
      message += `\n`;
    }

    if (eggs.length > 0) {
      message += `🥚 *Huevos de Campo Premium:*\n`;
      eggs.forEach((item) => {
        message += `• ${item.quantity}x ${item.product.name} (${item.selectedAge}) — *$${(item.priceAtSelection * item.quantity).toLocaleString('es-CL')}*\n`;
      });
      message += `\n`;
    }

    message += `---------------------------------------\n`;
    message += `💰 *TOTAL ESTIMADO: $${getTotalPrice().toLocaleString('es-CL')}*\n`;
    message += `---------------------------------------\n\n`;
    message += `📍 *DESPACHO:*\n`;
    message += `Me encuentro en [Ciudad/Comuna], Chile.\n\n`;
    message += `*Por favor, cotizar el envío para incluirlo en el pago total.*\n`;
    message += `_(Nota: El costo del envío será calculado y gestionado por nosotros tras confirmar disponibilidad)._\n\n`;
    message += `Quedo atento(a) a su confirmación de stock.`;

    window.open(`https://wa.me/56952424597?text=${encodeURIComponent(message)}`, '_blank');
    setIsDialogOpen(false);
  };

  return (
    <section ref={sectionRef} id="productos" className="relative py-20 bg-[#fef9f0] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-[#f7c35f] font-semibold text-sm uppercase tracking-wider mb-2 block">Venta de Gallinas</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1e1e1e] mb-4">Nuestro <span className="text-[#f7c35f]">Catálogo</span></h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Selecciona la edad ideal para tu proyecto avícola. Despacho a todo Chile.</p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="product-card bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-lg">
                  <span className="text-xl font-bold text-[#1e1e1e]">
                    ${getPriceForSelectedAge(product).toLocaleString('es-CL')}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-[#1e1e1e] mb-2">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-6 flex-1">{product.description}</p>

                {/* Selector de Edad */}
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

        {/* Floating Cart Button */}
        {cart.length > 0 && (
          <div className="fixed bottom-8 right-8 z-50">
            <button
              onClick={() => setIsDialogOpen(true)}
              className="bg-[#f7c35f] text-[#1e1e1e] p-5 rounded-full shadow-2xl flex items-center gap-3 hover:scale-105 transition-transform"
            >
              <ShoppingCart className="w-6 h-6" />
              <span className="font-bold">{cart.reduce((a, b) => a + b.quantity, 0)}</span>
            </button>
          </div>
        )}
      </div>

      {/* Cart Dialog */}
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
                <p className="font-bold text-[#f7c35f]">${(item.priceAtSelection * item.quantity).toLocaleString('es-CL')}</p>
              </div>
            ))}
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-500 font-medium">Total Estimado</span>
              <span className="text-3xl font-bold">${getTotalPrice().toLocaleString('es-CL')}</span>
            </div>
            <button onClick={sendWhatsAppQuote} className="w-full bg-green-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-green-600">
              <Check className="w-6 h-6" /> Enviar por WhatsApp
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}