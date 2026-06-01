import Link from 'next/link';
import { Phone, Mail, MapPin, ArrowRight, ExternalLink } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-obsidian border-t border-gold/10 pt-20 pb-10">
      {/* Decorative vertical gold rules */}
      <div className="absolute top-0 left-12 w-[1px] h-20 bg-gradient-to-b from-gold/30 to-transparent" />
      <div className="absolute top-0 right-12 w-[1px] h-20 bg-gradient-to-b from-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand Summary */}
        <div className="flex flex-col space-y-6">
          <Link href="/" className="flex flex-col justify-start">
            <div className="flex items-center gap-2">
              <span className="font-bebas text-4xl tracking-wider text-pearl">CSK</span>
              <span className="font-cormorant italic text-base text-gold mt-1">CONSTRUCTIONS</span>
            </div>
            <span className="font-jetbrains text-[10px] text-platinum tracking-[0.25em] -mt-1">
              ENGINEERING LEGACY
            </span>
          </Link>
          <p className="font-dm text-sm text-platinum leading-relaxed">
            Delivering exceptional residential, commercial, and massive infrastructure assets through precision engineering, cutting-edge innovation, and uncompromising quality.
          </p>
          <div className="flex flex-col space-y-2 font-jetbrains text-xs">
            <span className="text-gold tracking-widest uppercase">Direct WhatsApp Funnel</span>
            <a
              href="https://wa.me/919876543210?text=Hi%20CSK%20Constructions,%20I%20am%20interested%20in%20discussing%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-pearl hover:text-gold transition-colors"
            >
              <span>+91 98765 43210</span>
              <ExternalLink size={12} className="text-gold" />
            </a>
          </div>
        </div>

        {/* Quick Directories */}
        <div className="flex flex-col space-y-6">
          <h4 className="font-bebas text-xl tracking-widest text-pearl uppercase border-b border-gold/10 pb-2">
            DIRECTORIES
          </h4>
          <div className="grid grid-cols-2 gap-4 font-jetbrains text-xs">
            <div className="flex flex-col space-y-3">
              <Link href="/" className="hover:text-gold text-platinum transition-colors">HOME</Link>
              <Link href="/about" className="hover:text-gold text-platinum transition-colors">ABOUT</Link>
              <Link href="/services" className="hover:text-gold text-platinum transition-colors">SERVICES</Link>
              <Link href="/projects" className="hover:text-gold text-platinum transition-colors">PORTFOLIO</Link>
            </div>
            <div className="flex flex-col space-y-3">
              <Link href="/process" className="hover:text-gold text-platinum transition-colors">JOURNEY</Link>
              <Link href="/careers" className="hover:text-gold text-platinum transition-colors">CAREERS</Link>
              <Link href="/blog" className="hover:text-gold text-platinum transition-colors">LOGS/NEWS</Link>
              <Link href="/contact" className="hover:text-gold text-platinum transition-colors">CONTACT</Link>
            </div>
          </div>
        </div>

        {/* Technical Headquarters */}
        <div className="flex flex-col space-y-6">
          <h4 className="font-bebas text-xl tracking-widest text-pearl uppercase border-b border-gold/10 pb-2">
            HEADQUARTERS
          </h4>
          <div className="flex flex-col space-y-4 font-dm text-sm">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-gold shrink-0 mt-0.5" />
              <span className="text-platinum leading-relaxed">
                CSK Heights, Level 18, Commercial Plaza, Bandra Kurla Complex, Mumbai, MH - 400051
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-gold shrink-0" />
              <span className="text-platinum">+91 (22) 6789-0123</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-gold shrink-0" />
              <span className="text-platinum">hq@cskconstructions.com</span>
            </div>
          </div>
        </div>

        {/* Embedded Map Panel */}
        <div className="flex flex-col space-y-4">
          <h4 className="font-bebas text-xl tracking-widest text-pearl uppercase border-b border-gold/10 pb-2">
            LOCATION MAP
          </h4>
          <div className="w-full h-36 rounded border border-gold/15 overflow-hidden relative group bg-graphite">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.8025219460596!2d72.86311681533038!3d19.06140518709503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8e6dfd6e35d%3A0xe6dd7be8ba0f0312!2sBandra%20Kurla%20Complex%2C%20Bandra%20East%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1689000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) grayscale(100%) brightness(85%) contrast(110%)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="CSK Headquarters location map"
            />
            <div className="absolute inset-0 bg-gold/5 pointer-events-none group-hover:bg-transparent transition-colors duration-500" />
          </div>
        </div>
      </div>

      {/* Footer Base */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-gold/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-jetbrains text-[10px] text-platinum tracking-wider text-center md:text-left">
          © {currentYear} CSK CONSTRUCTIONS. ALL RIGHTS RESERVED. REGISTERED CONTRACTOR & BUILDER.
        </p>
        <div className="flex items-center gap-6 font-jetbrains text-[10px] text-platinum tracking-wider">
          <span className="flex items-center gap-1.5">
            ZERO COMPROMISE <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          </span>
          <Link href="/admin" className="text-gold hover:text-champagne transition-colors">
            ADMIN HQ LOG
          </Link>
        </div>
      </div>
    </footer>
  );
}
