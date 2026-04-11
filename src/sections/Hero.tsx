import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, Egg } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const egg1Ref = useRef<HTMLDivElement>(null);
  const egg2Ref = useRef<HTMLDivElement>(null);
  const egg3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal animation
      gsap.fromTo(
        imageRef.current,
        { scale: 1.2, clipPath: 'circle(0% at 50% 50%)' },
        { scale: 1, clipPath: 'circle(100% at 50% 50%)', duration: 1.4, ease: 'power3.out' }
      );

      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: 'power4.out' }
      );

      // Subheading animation
      gsap.fromTo(
        subheadingRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.6, ease: 'power2.out' }
      );

      // Button animation
      gsap.fromTo(
        buttonRef.current,
        { scale: 0 },
        { scale: 1, duration: 0.8, delay: 0.8, ease: 'elastic.out(1, 0.5)' }
      );

      // Floating eggs animation
      [egg1Ref, egg2Ref, egg3Ref].forEach((ref, i) => {
        gsap.fromTo(
          ref.current,
          { y: 50, rotation: -15, opacity: 0 },
          { y: 0, rotation: 0, opacity: 1, duration: 1.2, delay: 1 + i * 0.2, ease: 'back.out(1.7)' }
        );
      });

      // Parallax on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          gsap.to(imageRef.current, { y: self.progress * 200, duration: 0.1 });
          gsap.to(headingRef.current, { y: self.progress * -100, duration: 0.1 });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('¡Hola! Me interesa cotizar gallinas ponedoras de Avícola Agaves. ¿Podrían darme más información?');
    window.open(`https://wa.me/56952424597?text=${message}`, '_blank');
  };

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative min-h-screen w-full overflow-hidden bg-[#fef9f0]"
    >
      {/* Floating decorative eggs */}
      <div
        ref={egg1Ref}
        className="absolute top-20 left-[10%] w-12 h-16 bg-gradient-to-br from-[#f7c35f] to-[#e5b150] rounded-[50%_50%_50%_50%/60%_60%_40%_40%] opacity-80 animate-float z-10"
        style={{ animationDelay: '0s' }}
      />
      <div
        ref={egg2Ref}
        className="absolute top-40 right-[15%] w-8 h-11 bg-gradient-to-br from-[#f7c35f] to-[#d4a03d] rounded-[50%_50%_50%_50%/60%_60%_40%_40%] opacity-60 animate-float z-10"
        style={{ animationDelay: '1s' }}
      />
      <div
        ref={egg3Ref}
        className="absolute bottom-32 left-[20%] w-10 h-14 bg-gradient-to-br from-[#f7c35f] to-[#c9942e] rounded-[50%_50%_50%_50%/60%_60%_40%_40%] opacity-70 animate-float z-10"
        style={{ animationDelay: '2s' }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full py-20">
          {/* Content */}
          <div className="relative z-20 order-2 lg:order-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-[#f7c35f]/20 px-4 py-2 rounded-full mb-6">
              <Egg className="w-4 h-4 text-[#f7c35f]" />
              <span className="text-sm font-medium text-[#1e1e1e]">Granja Familiar desde 2005</span>
            </div>

            <h1
              ref={headingRef}
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#1e1e1e] leading-tight mb-6"
            >
              Gallinas{' '}
              <span className="text-[#f7c35f]">Ponedoras</span>{' '}
              de Alta Calidad
            </h1>

            <p
              ref={subheadingRef}
              className="text-lg sm:text-xl text-[#444444] max-w-xl mx-auto lg:mx-0 mb-8 font-body"
            >
              Huevos frescos todos los días directamente de nuestra granja a tu hogar.
              Gallinas saludables, criadas con amor y alimentación 100% natural.
            </p>

            <button
              ref={buttonRef}
              onClick={handleWhatsAppClick}
              className="btn-yolk inline-flex items-center gap-3 bg-[#1e1e1e] text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:shadow-xl"
            >
              <MessageCircle className="w-5 h-5" />
              Cotizar Ahora
            </button>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 max-w-md mx-auto lg:mx-0">
              <div className="text-center">
                <div className="font-display text-3xl sm:text-4xl font-bold text-[#f7c35f]">15+</div>
                <div className="text-sm text-[#444444]">Años de experiencia</div>
              </div>
              <div className="text-center">
                <div className="font-display text-3xl sm:text-4xl font-bold text-[#f7c35f]">5000+</div>
                <div className="text-sm text-[#444444]">Clientes felices</div>
              </div>
              <div className="text-center">
                <div className="font-display text-3xl sm:text-4xl font-bold text-[#f7c35f]">6</div>
                <div className="text-sm text-[#444444]">Razas disponibles</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative order-1 lg:order-2">
            <div
              ref={imageRef}
              className="relative rounded-[30%_70%_70%_30%/30%_30%_70%_70%] overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-square"
            >
              <img
                src="/hero-image.jpg"
                alt="Huevos frescos de granja"
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e1e]/20 to-transparent" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
              <div className="w-12 h-12 bg-[#f7c35f] rounded-full flex items-center justify-center">
                <Egg className="w-6 h-6 text-[#1e1e1e]" />
              </div>
              <div>
                <div className="font-display font-bold text-[#1e1e1e]">100% Natural</div>
                <div className="text-sm text-[#444444]">Alimentación orgánica</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
