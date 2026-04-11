import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Wheat, Truck, Phone, Shield, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Heart,
    title: 'Gallinas Saludables',
    description: 'Todas nuestras gallinas son vacunadas y revisadas veterinariamente. Garantizamos su salud y bienestar.',
  },
  {
    icon: Wheat,
    title: 'Alimentación Natural',
    description: 'Dieta 100% orgánica a base de maíz, trigo y vegetales frescos. Sin antibióticos ni hormonas.',
  },
  {
    icon: Truck,
    title: 'Entrega a Domicilio',
    description: 'Llevamos tus gallinas directamente a tu puerta. Servicio de entrega seguro y puntual en toda la zona.',
  },
  {
    icon: Phone,
    title: 'Asesoría Experta',
    description: 'Te guiamos en el cuidado de tus gallinas. Soporte telefónico y visitas de seguimiento disponibles.',
  },
  {
    icon: Shield,
    title: 'Garantía de Calidad',
    description: '15 días de garantía en cada gallina. Si no está satisfecho, hacemos el cambio sin costo.',
  },
  {
    icon: Clock,
    title: 'Atención Personalizada',
    description: 'Cada cliente es único. Diseñamos soluciones según tus necesidades específicas y espacio disponible.',
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.feature-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // SVG line draw animation
      if (lineRef.current) {
        const length = lineRef.current.getTotalLength();
        gsap.set(lineRef.current, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            end: 'bottom 80%',
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="por-que-elegirnos"
      className="relative py-20 lg:py-32 bg-white overflow-hidden"
    >
      {/* Decorative connecting line */}
      <svg
        className="absolute top-1/2 left-0 w-full h-full -translate-y-1/2 pointer-events-none"
        viewBox="0 0 1200 800"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          ref={lineRef}
          d="M100 100 Q 300 200, 500 150 T 900 200 T 1100 400 T 600 600 T 100 700"
          stroke="#f7c35f"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.3"
        />
      </svg>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-[#f7c35f] font-semibold text-sm uppercase tracking-wider mb-4">
            Nuestras Ventajas
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1e1e1e] mb-4">
            ¿Por Qué <span className="text-[#f7c35f]">Elegirnos</span>?
          </h2>
          <p className="text-lg text-[#444444] max-w-2xl mx-auto">
            Más de 20 años de experiencia nos respaldan. Descubre por qué miles de familias 
            confían en nosotros para tener gallinas ponedoras.
          </p>
        </div>

        {/* Features Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card group relative bg-[#fef9f0] rounded-2xl p-8 hover:bg-[#f7c35f] transition-all duration-500 cursor-default"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-[#f7c35f] group-hover:bg-white rounded-2xl flex items-center justify-center mb-6 transition-colors duration-500">
                <feature.icon className="w-8 h-8 text-[#1e1e1e]" />
              </div>

              {/* Content */}
              <h3 className="font-display text-2xl font-semibold text-[#1e1e1e] mb-3 group-hover:text-[#1e1e1e]">
                {feature.title}
              </h3>
              <p className="text-[#444444] group-hover:text-[#1e1e1e]/80 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover decoration */}
              <div className="absolute top-4 right-4 w-8 h-8 border-2 border-[#f7c35f] group-hover:border-white rounded-full opacity-50 transition-colors duration-500" />
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { value: '10.000+', label: 'Clientes Satisfechos' },
            { value: '20+', label: 'Años de Experiencia' },
            { value: '50,000+', label: 'Gallinas Vendidas' },
            { value: '98%', label: 'Clientes que Recomiendan' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-display text-4xl lg:text-5xl font-bold text-[#f7c35f] mb-2">
                {stat.value}
              </div>
              <div className="text-[#444444]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
