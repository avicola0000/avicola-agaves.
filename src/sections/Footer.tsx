import { Egg, Facebook, Instagram, Youtube, MessageCircle, Phone, MapPin, Truck } from 'lucide-react';

const footerLinks = {
  contacto: [
    { label: '+56 9 5242 4597', href: 'https://wa.me/56952424597', icon: Phone },
    { label: 'Valdivia, Región de Los Ríos', href: '#', icon: MapPin },
    { label: 'Despachos a todo Chile', href: '#', icon: Truck },
  ],
};

export default function Footer() {
  const handleWhatsAppClick = () => {
    // Códigos Unicode para evitar el rombo ()
    const gallina = "\uD83D\uDC14"; 
    const huevo = "\uD83E\uDD5A";
    const text = `¡Hola! Me interesa información sobre sus gallinas ponedoras. ${gallina}${huevo}`;
    const message = encodeURIComponent(text);
    window.open(`https://wa.me/56952424597?text=${message}`, '_blank');
  };

  return (
    <footer className="bg-[#1e1e1e] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#f7c35f] rounded-full flex items-center justify-center shadow-lg shadow-[#f7c35f]/10">
                <Egg className="w-6 h-6 text-[#1e1e1e]" />
              </div>
              <span className="font-display text-2xl font-bold tracking-tight text-white">Agaves</span>
            </div>
            <p className="text-white/70 mb-6 leading-relaxed">
  Granja familiar dedicada a la cría de gallinas ponedoras felices y saludables desde Valdivia. Brindando calidad desde 2005.
</p>

// Busca la sección de la barra inferior al final del componente
<div className="border-t border-white/10 mt-16 pt-8 text-center md:text-left">
  <p className="text-white/40 text-sm">
    © {new Date().getFullYear()} Agaves - Gallinas Ponedoras. Trayectoria desde 2005. Valdivia, Región de Los Ríos, Chile.
  </p>
</div>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#f7c35f] hover:text-[#1e1e1e] transition-all duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#f7c35f] hover:text-[#1e1e1e] transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#f7c35f] hover:text-[#1e1e1e] transition-all duration-300">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-display text-xl font-semibold mb-6 text-[#f7c35f] flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Nuestra Ubicación Exacta
            </h4>
            
            <div className="w-full h-64 rounded-3xl overflow-hidden border border-white/5 shadow-2xl relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d191297.439019623!2d-73.3486259!3d-39.817303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9615eeec9093f9e1%3A0x6e38209214436894!2sValdivia%2C%20Los%20R%C3%ADos!5e0!3m2!1ses-419!2scl!4v1712715000000!5m2!1ses-419!2scl" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Avícola Agaves"
              ></iframe>
            </div>
          </div>

          <div>
            <h4 className="font-display text-xl font-semibold mb-6">Contáctanos</h4>
            <ul className="space-y-5">
              {footerLinks.contacto.map((link, index) => (
                <li key={index}>
                  <div className="flex items-start gap-4 text-white/70">
                    <div className="mt-1 w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                      {link.icon && <link.icon className="w-5 h-5 text-[#f7c35f]" />}
                    </div>
                    <div>
                      <span className="block text-white font-medium">{link.label}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <button
              onClick={handleWhatsAppClick}
              className="mt-8 w-full flex items-center justify-center gap-3 bg-green-600 text-white px-6 py-4 rounded-2xl font-bold hover:bg-green-500 transition-all duration-300 shadow-lg"
            >
              <MessageCircle className="w-6 h-6" />
              WhatsApp Business
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}