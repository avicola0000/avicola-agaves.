import { useState, useEffect } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Sobre Nosotros', href: '#sobre-nosotros' },
  { label: 'Productos', href: '#productos' },
  { label: '¿Por qué elegirnos?', href: '#por-que-elegirnos' },
  { label: 'Testimonios', href: '#testimonios' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('¡Hola! Me interesa información sobre sus productos de Avícola Agaves.');
    window.open(`https://wa.me/56952424597?text=${message}`, '_blank');
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg py-3'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#inicio" className="flex items-center gap-3">
            <div
  className={`w-12 h-12 rounded-full overflow-hidden flex items-center justify-center transition-colors ${
    isScrolled ? 'bg-white' : 'bg-white'
  }`}
>
  <img 
    src="/Logo.png" 
    alt="Logo Avícola Agaves" 
    className="w-full h-full object-cover" 
  />
</div>
              <span
                className={`font-display text-xl font-bold transition-colors ${
                  isScrolled ? 'text-[#1e1e1e]' : 'text-[#1e1e1e] lg:text-[#1e1e1e]'
                }`}
              >
                Agaves
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`font-medium transition-colors hover:text-[#f7c35f] ${
                    isScrolled ? 'text-[#444444]' : 'text-[#1e1e1e]'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <button
                onClick={handleWhatsAppClick}
                className="flex items-center gap-2 bg-[#f7c35f] text-[#1e1e1e] px-5 py-2.5 rounded-full font-medium hover:bg-[#e5b150] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Cotizar
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center"
            >
              {isMobileMenuOpen ? (
                <X className={`w-6 h-6 ${isScrolled ? 'text-[#1e1e1e]' : 'text-[#1e1e1e]'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isScrolled ? 'text-[#1e1e1e]' : 'text-[#1e1e1e]'}`} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu panel */}
        <div
          className={`absolute top-0 right-0 w-full max-w-sm h-full bg-white shadow-2xl transition-transform duration-500 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6 pt-20">
            <div className="space-y-4">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block text-lg font-medium text-[#1e1e1e] hover:text-[#f7c35f] transition-colors py-3 border-b border-gray-100"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <button
              onClick={handleWhatsAppClick}
              className="mt-8 w-full flex items-center justify-center gap-3 bg-[#f7c35f] text-[#1e1e1e] px-6 py-4 rounded-full font-semibold"
            >
              <MessageCircle className="w-5 h-5" />
              Cotizar por WhatsApp
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
