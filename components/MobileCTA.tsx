"use client";

import Link from "next/link";
import { CalendarPlus } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export const MobileCTA = () => {
  const { language } = useLanguage();

  return (
    <div className="md:hidden fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4 pb-safe">
      <div className="pointer-events-auto relative inline-flex justify-center w-full max-w-[320px]">
        {/* Breathing Aura */}
        <div className="absolute inset-0 bg-secondary rounded-full blur-[20px] opacity-40 animate-pulse pointer-events-none" />
        
        <Link href="/contact" className="relative group overflow-hidden bg-gradient-to-r from-primary to-[#0f4466] flex items-center justify-center gap-3 w-full py-4 px-6 rounded-full shadow-[0_15px_40px_rgba(5,28,46,0.3)] border border-white/20 active:scale-95 transition-all duration-300">
          {/* Glossy sweep on action */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-[150%] skew-x-[-30deg] group-active:translate-x-[150%] transition-transform duration-700 pointer-events-none" />
          
          <CalendarPlus size={20} className="text-secondary relative z-10" />
          <span className="text-white font-bold tracking-wide text-[14px] relative z-10 drop-shadow-md">
            {language === 'ar' ? 'إحجز موعدك الآن' : 'Prendre Rendez-vous'}
          </span>
        </Link>
      </div>
    </div>
  );
};
