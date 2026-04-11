import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Leaf, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image mask morph animation
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'circle(0% at 50% 50%)', opacity: 0 },
        {
          clipPath: 'ellipse(50% 50% at 50% 50%)',
          opacity: 1,
          duration: 1.2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content animation
      gsap.fromTo(
        contentRef.current?.children || [],
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // SVG line draw animation
      if (lineRef.current) {
        const length = lineRef.current.getTotalLength();
        gsap.set(lineRef.current, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: Heart,
      title: 'Criadas con Amor',
      description: 'Cada gallina recibe cuidado personalizado y atención diaria.',
    },
    {
      icon: Leaf,
      title: 'Alimentación Natural',
      description: 'Dieta 100% orgánica libre de antibióticos y hormonas.',
    },
    {
      icon: Award,
      title: 'Calidad Garantizada',
      description: '20 años de experiencia respaldan nuestro compromiso.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="sobre-nosotros"
      className="relative py-20 lg:py-32 bg-white overflow-hidden"
    >
      {/* Decorative SVG line */}
      <svg
        className="absolute top-1/2 left-0 w-full h-32 -translate-y-1/2 pointer-events-none"
        viewBox="0 0 1200 100"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          ref={lineRef}
          d="M0 50 Q 300 0, 600 50 T 1200 50"
          stroke="#f7c35f"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.3"
        />
      </svg>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div ref={imageRef} className="relative">
            <div className="relative aspect-[3/4] rounded-[40%_60%_60%_40%/50%_40%_60%_50%] overflow-hidden shadow-2xl">
              <img
                src="/about-image.jpg"
                alt="Familia con gallinas"
                className="w-full h-full object-cover"
              />
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#f7c35f]/10 to-transparent" />
            </div>

            {/* Experience badge */}
            <div className="absolute -bottom-6 -right-6 bg-[#f7c35f] rounded-full w-32 h-32 flex flex-col items-center justify-center shadow-xl">
              <span className="font-display text-4xl font-bold text-[#1e1e1e]">15</span>
              <span className="text-sm font-medium text-[#1e1e1e]">Años</span>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="relative z-10">
            <span className="inline-block text-[#f7c35f] font-semibold text-sm uppercase tracking-wider mb-4">
              Nuestra Historia
            </span>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1e1e1e] mb-6">
              Sobre <span className="text-[#f7c35f]">Nosotros</span>
            </h2>

            <p className="text-lg text-[#444444] mb-6 leading-relaxed">
              Somos una granja familiar dedicada a la cría de gallinas ponedoras felices y saludables. 
              Desde 2005, nos hemos comprometido a proporcionar a las familias Chilenas acceso a 
              huevos frescos de la más alta calidad.
            </p>

            <p className="text-lg text-[#444444] mb-8 leading-relaxed">
              Nuestras gallinas viven en amplios espacios al aire libre, donde pueden pastar libremente 
              y expresar sus comportamientos naturales. Creemos que gallinas felices producen huevos 
              más nutritivos y sabrosos.
            </p>

            {/* Features */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl bg-[#fef9f0] hover:bg-[#f7c35f]/10 transition-colors duration-300"
                >
                  <div className="w-12 h-12 bg-[#f7c35f] rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-[#1e1e1e]" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-[#1e1e1e] mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-[#444444]">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
