import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, Phone, MapPin, Truck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleWhatsAppClick = () => {
    const pollito = "\uD83D\uDC24";
    const destello = "\u2728";
    const text = `¡Hola! Estoy listo para tener gallinas ponedoras. ¿Me pueden ayudar con una cotización? ${pollito}${destello}`;
    const message = encodeURIComponent(text);
    window.open(`https://wa.me/56952424597?text=${message}`, '_blank');
  };

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-32 overflow-hidden">
      <div ref={imageRef} className="absolute inset-0">
        <img src="/cta-background.jpg" alt="Granja" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e1e1e]/90 via-[#1e1e1e]/70 to-[#1e1e1e]/50" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div ref={contentRef}>
            <span className="inline-block text-[#f7c35f] font-semibold text-sm uppercase tracking-wider mb-4">
              ¿Listo para comenzar?
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              ¿Listo para tener <span className="text-[#f7c35f]">gallinas ponedoras</span>?
            </h2>
            
            <button
              onClick={handleWhatsAppClick}
              className="inline-flex items-center gap-3 bg-[#f7c35f] text-[#1e1e1e] px-8 py-4 rounded-full text-lg font-semibold hover:bg-white transition-colors duration-300 shadow-xl"
            >
              <MessageCircle className="w-5 h-5" />
              Cotizar por WhatsApp
            </button>

            <div className="mt-12 grid sm:grid-cols-2 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#f7c35f]" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Teléfono</p>
                  <p className="text-white font-semibold">+56 9 5242 4597</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <Truck className="w-5 h-5 text-[#f7c35f]" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Logística</p>
                  <p className="text-white font-semibold">Despachos a todo Chile</p>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:col-span-2">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#f7c35f]" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Ubicación</p>
                  <p className="text-white font-semibold">Valdivia, Región de Los Ríos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}