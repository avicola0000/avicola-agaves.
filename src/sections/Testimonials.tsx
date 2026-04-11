import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  { id: 1, name: 'María González', role: 'Ama de Casa', content: 'Las mejores gallinas que he tenido. Mis Rhode Island Red ponen huevos todos los días y son muy dóciles.', rating: 5, image: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, name: 'Carlos Rodríguez', role: 'Agricultor', content: 'Excelente servicio y gallinas de primera calidad. Llevo 3 años comprando con Agaves y nunca han fallado.', rating: 5, image: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, name: 'Ana López', role: 'Huerto Urbano', content: 'Huevos frescos diariamente gracias a mis Leghorn. Es increíble la diferencia de sabor con el supermercado.', rating: 5, image: 'https://i.pravatar.cc/150?u=3' },
  { id: 4, name: 'Pedro Martínez', role: 'Jubilado', content: 'Muy recomendable. Compré gallinas Orpington para mi jardín y son perfectas como mascotas. Muy dóciles.', rating: 5, image: 'https://i.pravatar.cc/150?u=4' },
  { id: 5, name: "Héctor Valenzuela", role: "Granja El Roble", content: "Llevo años en el rubro y es difícil encontrar pollas con esta sanidad. Las Hy-Line Brown llegaron fuertes.", rating: 5, image: "https://i.pravatar.cc/150?u=5" },
  { id: 6, name: "Clara Montes", role: "Emprendedora", content: "Al principio me daba miedo comprar por internet, pero el embalaje es impecable. Ni uno llegó quebrado.", rating: 5, image: "https://i.pravatar.cc/150?u=6" },
  { id: 7, name: "Juan Pablo Silva", role: "Cliente Recurrente", content: "Lo que más valoro es la transparencia. Me enviaron fotos de las Sussex antes del despacho. Un negocio serio.", rating: 5, image: "https://i.pravatar.cc/150?u=7" },
  { id: 8, name: "Mónica Garrido", role: "Almacén", content: "El rendimiento de las aves es impresionante. Mis gallinas empezaron a poner justo a tiempo. Gran calidad.", rating: 5, image: "https://i.pravatar.cc/150?u=8" },
  { id: 9, name: "Roberto Tapia", role: "Productor Avícola", content: "La uniformidad del lote que me entregó Agaves es superior. Todas las aves crecen al mismo ritmo.", rating: 5, image: "https://i.pravatar.cc/150?u=9" },
  { id: 10, name: "Lucía Méndez", role: "Consumo Hogar", content: "Excelente relación calidad-precio. Las cajas de 180 unidades vienen seleccionadas por tamaño real.", rating: 5, image: "https://i.pravatar.cc/150?u=10" }
];

export default function Testimonials() {
  const [offset, setOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // AUTO-PLAY: Se mueve solo cada 4 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setOffset((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonios" className="py-24 bg-[#fef9f0] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1e1e1e] mb-4">Lo que dicen nuestros clientes</h2>
          <div className="w-24 h-1 bg-[#f7c35f] mx-auto"></div>
        </div>

        {/* Ventana del Carrusel */}
        <div className="relative max-w-7xl mx-auto">
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${offset * (100 / (window.innerWidth < 768 ? 1 : 3))}%)` }}
          >
            {testimonials.map((t) => (
              <div key={t.id} className="w-full md:w-1/3 flex-shrink-0 px-4">
                <div className="bg-white p-8 rounded-[30px] shadow-sm border border-[#f7c35f]/10 h-full flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div>
                    <Quote className="w-8 h-8 text-[#f7c35f] mb-4 opacity-50" />
                    <div className="flex gap-1 mb-4">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#f7c35f] text-[#f7c35f]" />
                      ))}
                    </div>
                    <p className="text-[#444444] italic mb-6 leading-relaxed">
                      "{t.content}"
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full border-2 border-[#f7c35f]" />
                    <div>
                      <h4 className="font-bold text-[#1e1e1e]">{t.name}</h4>
                      <p className="text-sm text-[#f7c35f] font-medium">{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicadores inferiores */}
        <div className="flex justify-center gap-2 mt-12">
          {testimonials.map((_, i) => (
            <button 
              key={i}
              onClick={() => setOffset(i)}
              className={`h-2 rounded-full transition-all ${i === offset ? 'w-8 bg-[#f7c35f]' : 'w-2 bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}