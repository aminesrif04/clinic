"use client";

import { motion } from "framer-motion";
import { PlayCircle, Quote } from "lucide-react";
import testimonialsData from "../data/testimonials.json";
import { useLanguage } from "../context/LanguageContext";

export const Testimonials = () => {
  const { language, t } = useLanguage();

  return (
    <section className="py-16 md:py-20 bg-gradient-to-tr from-slate-50 via-[#f0f8fb] to-white relative overflow-hidden" id="testimonials">
      {/* Decorative standard shapes */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="w-full px-6 md:px-12 lg:px-20 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-secondary font-bold tracking-widest text-sm mb-4 uppercase"
          >
            {t("testimonials.subtitle")}
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-primary drop-shadow-sm"
          >
            {t("testimonials.title")}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonialsData.map((test, idx) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6, type: "spring" }}
              className="bg-white/95 backdrop-blur-md rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden group cursor-pointer hover:shadow-[0_30px_70px_rgba(0,198,198,0.15)] hover:border-secondary/30 transition-all duration-700 hover:-translate-y-3 flex flex-col"
            >
              {/* Video Thumbnail Area */}
              <div className="relative h-[220px] overflow-hidden m-2 rounded-3xl">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${test.videoThumb})` }}
                />
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors duration-500" />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="relative">
                    <div className="absolute inset-0 bg-secondary rounded-full blur-[25px] opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-lg group-hover:scale-[1.15] group-hover:bg-secondary transition-all duration-500 relative z-10 border border-white/50 group-hover:border-secondary">
                      <PlayCircle size={32} strokeWidth={1.5} className="text-primary group-hover:text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="p-8 flex-1 flex flex-col relative">
                <Quote size={40} className="absolute top-4 right-6 text-slate-100 rotate-180" />
                <blockquote className="text-lg font-medium italic mb-6 text-slate-600 line-clamp-4 relative z-10 flex-1 leading-relaxed">
                  &quot;{language === 'ar' ? test.quote_ar : test.quote_fr}&quot;
                </blockquote>
                
                <div className="flex justify-between items-center pt-6 border-t border-slate-100/80">
                  <div>
                    <h4 className="font-bold text-xl text-primary mb-1">
                      {language === 'ar' ? test.name_ar : test.name_fr}
                    </h4>
                    <p className="text-sm font-semibold text-secondary">
                      {language === 'ar' ? test.location_ar : test.location_fr}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
