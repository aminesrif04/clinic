"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Award } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { useLanguage } from "../context/LanguageContext";

const accreditations = [
  { text: "ISO 9001", sub: "Quality Management" },
  { text: "JCI", sub: "Gold Seal of Approval" },
  { text: "HIMSS", sub: "Stage 7 Validated" },
  { text: "WHO", sub: "Patient Safety" },
  { text: "CAP", sub: "Laboratory Accreditation" },
  { text: "Planetree", sub: "Gold Certification" }
];

export const Accreditations = () => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const { language } = useLanguage();

  return (
    <section className="py-16 md:py-20 bg-white relative border-y border-slate-100 overflow-hidden">
      {/* Premium subtle background matrix */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '32px 32px' }} />

      <div className="w-full px-6 md:px-12 lg:px-20 relative z-10 max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16">
          <div className="flex items-center gap-4 mb-6 md:mb-0">
            <div className="bg-secondary/10 p-3 rounded-2xl text-secondary">
              <Award size={36} strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-secondary font-bold tracking-widest text-xs uppercase mb-1">{language === 'ar' ? 'معايير عالمية' : 'Global Standards'}</p>
              <h2 className="text-3xl md:text-4xl font-black text-primary">
                {language === 'ar' ? "الاعتمادات العالمية" : "Accréditations Mondiales"}
              </h2>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => swiper?.slidePrev()}
              className="w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-[0_5px_15px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_25px_rgba(0,168,168,0.15)] hover:bg-primary hover:text-white transition-all duration-300 text-primary border border-slate-100 group"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => swiper?.slideNext()}
              className="w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-[0_5px_15px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_25px_rgba(0,168,168,0.15)] hover:bg-primary hover:text-white transition-all duration-300 text-primary border border-slate-100 group"
              aria-label="Next slide"
            >
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            onSwiper={setSwiper}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              480: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1400: { slidesPerView: 5 },
            }}
            loop={true}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            className="pb-16 px-4"
          >
            {accreditations.map((acc, idx) => (
              <SwiperSlide key={idx} className="h-full py-4">
                <div className="bg-white rounded-3xl p-8 h-48 border border-slate-100 shadow-[0_8px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_30px_rgba(0,168,168,0.08)] hover:border-secondary/20 transition-all duration-500 cursor-grab active:cursor-grabbing flex flex-col justify-center items-center text-center group">
                  <h3 className="text-3xl font-black text-slate-300 group-hover:text-primary transition-colors duration-500 mb-2 font-serif tracking-tight">{acc.text}</h3>
                  <p className="text-xs font-bold text-slate-400 group-hover:text-secondary uppercase tracking-widest transition-colors duration-500">{acc.sub}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};
