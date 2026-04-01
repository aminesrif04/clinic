"use client";

import Link from "next/link";
import { ArrowUp, MapPin, Phone, Mail, ChevronRight, ChevronLeft } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";

export const Footer = () => {
  const { t, language } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-br from-[#0A2E46] to-[#041B2D] text-white pt-20 pb-10 relative overflow-hidden border-t border-white/5">
      
      {/* Premium Laser Scanning Animated Border - Full Width Endless Sweep */}
      <div className="absolute top-0 left-0 right-0 h-1.5 overflow-hidden z-20">
        {/* Solid base line so it never disappears */}
        <div className="absolute inset-0 bg-secondary/20" />
        <motion.div 
          animate={{ x: ["-100%", "100%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="w-full h-full bg-gradient-to-r from-transparent via-[#00c6c6] to-transparent shadow-[0_0_15px_4px_rgba(0,198,198,1)] opacity-100 relative z-10"
        />
      </div>

      {/* Decorative premium artifacts */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[300px] bg-primary-light/5 rounded-full blur-[100px] pointer-events-none" />

      <div className={`w-full px-6 md:px-12 lg:px-20 relative z-10 ${language === 'ar' ? 'text-right' : 'text-left'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo Column */}
          <div className="flex flex-col items-start text-start">
            <h2 className="text-sm lg:text-base font-black mb-3 tracking-wide text-white drop-shadow-md flex" dir="ltr">POLYCLINIQUE&nbsp;<span className="text-secondary font-light">TAFILALET</span></h2>
            <p className="text-white text-base mb-8 max-w-[250px] leading-relaxed">
              {language === 'ar' ? 'مكناس، المغرب' : 'Meknès, Maroc'}
            </p>
            <div className="flex gap-4">
              <a href="#" className="bg-white/10 hover:bg-secondary text-white p-3 rounded-xl transition-all duration-300 shadow-lg hover:-translate-y-1 flex items-center justify-center group" aria-label="Facebook">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="bg-white/10 hover:bg-secondary text-white p-3 rounded-xl transition-all duration-300 shadow-lg hover:-translate-y-1 flex items-center justify-center group" aria-label="LinkedIn">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="#" className="bg-white/10 hover:bg-secondary text-white p-3 rounded-xl transition-all duration-300 shadow-lg hover:-translate-y-1 flex items-center justify-center group" aria-label="Instagram">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-start text-start">
            <h3 className="font-bold mb-8 text-white text-xl relative inline-block">
              {t("footer.quick_links")}
              <span className="absolute -bottom-2 h-0.5 bg-secondary/50 rounded-full inset-x-0 w-full"></span>
            </h3>
            <ul className="flex flex-col gap-4 text-white text-base font-medium items-start">
              {[
                { href: "/", label: t("nav.home") },
                { href: "#about", label: t("nav.about") },
                { href: "#departments", label: t("quick.departments") },
                { href: "/doctors", label: t("nav.doctors") },
                { href: "/blog", label: t("nav.blog") }
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="group flex items-center hover:text-secondary transition-all w-fit gap-2">
                    <span className={`text-secondary opacity-0 transition-transform duration-300 ${language === 'ar' ? 'translate-x-2' : '-translate-x-2'} group-hover:opacity-100 group-hover:translate-x-0`}>
                      {language === 'ar' ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                    </span>
                    <span className={`capitalize lowercase transition-transform duration-300 ${language === 'ar' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}>
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Nos Pages (Quick Links Part 2) */}
          <div className="md:pt-0 flex flex-col items-start text-start">
            <h3 className="font-bold mb-8 text-white text-xl relative inline-block">
               {language === 'ar' ? 'صفحاتنا' : 'Nos Pages'}
               <span className="absolute -bottom-2 h-0.5 bg-secondary/50 rounded-full inset-x-0 w-full"></span>
            </h3>
            <ul className="flex flex-col gap-4 text-white text-base font-medium items-start">
              {[
                { href: "#health", label: t("quick.assessment") },
                { href: "/recrutement", label: language === 'ar' ? 'التوظيف / وظائف' : 'Carrières & Recrutement' },
                { href: "/faq", label: language === 'ar' ? 'الأسئلة الشائعة' : 'Questions fréquentes' },
                { href: "/feedback", label: language === 'ar' ? 'رأيك يهمنا' : 'Votre avis & Expérience' },
                { href: "#events", label: language === 'ar' ? 'الفعاليات' : 'Événements' },
                { href: "/contact", label: language === 'ar' ? 'تواصل معنا' : 'Contactez-nous' }
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="group flex items-center hover:text-secondary transition-all w-fit gap-2">
                    <span className={`text-secondary opacity-0 transition-transform duration-300 ${language === 'ar' ? 'translate-x-2' : '-translate-x-2'} group-hover:opacity-100 group-hover:translate-x-0`}>
                      {language === 'ar' ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                    </span>
                    <span className={`transition-transform duration-300 ${language === 'ar' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}>
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col items-start text-start">
            <h3 className="font-bold mb-8 text-white text-xl relative inline-block">
              {t("footer.contact")}
              <span className="absolute -bottom-2 h-0.5 bg-secondary/50 rounded-full inset-x-0 w-full"></span>
            </h3>
            <ul className="flex flex-col gap-6 text-white text-base">
              <li className="flex gap-4 items-start group">
                <span className="bg-white/10 p-2.5 rounded-lg text-secondary group-hover:bg-secondary group-hover:text-white transition-colors duration-300"><MapPin size={18} /></span>
                <span className="leading-relaxed font-medium mt-1">
                  {language === 'ar' ? 'مكناس،' : 'Meknès,'}<br />
                  {language === 'ar' ? 'المغرب' : 'Maroc'}
                </span>
              </li>
              <li className="flex gap-4 items-center group">
                <span className="bg-white/10 p-2.5 rounded-lg text-secondary group-hover:bg-secondary group-hover:text-white transition-colors duration-300"><Phone size={18} /></span>
                <span dir="ltr" className="font-bold tracking-wider pt-1">05 35 52 55 25</span>
              </li>
              <li className="flex gap-4 items-center group">
                <span className="bg-white/10 p-2.5 rounded-lg text-secondary group-hover:bg-secondary group-hover:text-white transition-colors duration-300"><Mail size={18} /></span>
                <span className="font-medium pt-1 text-[13px]">contact@polyclinique-tafilalet.ma</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center text-sm text-white font-medium">
          <p>© 2026 Polyclinique Tafilalet. {t("footer.rights")}</p>
          <div className="flex gap-8 mt-6 md:mt-0">
            <Link href="#" className="hover:text-secondary transition-colors">{t("footer.privacy")}</Link>
            <Link href="#" className="hover:text-secondary transition-colors">{t("footer.terms")}</Link>
          </div>
        </div>
      </div>

      <button 
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="absolute bottom-10 right-10 bg-secondary hover:bg-white text-white hover:text-primary p-4 rounded-xl shadow-[0_10px_20px_rgba(0,168,168,0.3)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 group"
      >
        <ArrowUp size={24} className="group-hover:animate-bounce" />
      </button>
    </footer>
  );
};
