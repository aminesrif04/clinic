"use client";

import { motion } from "framer-motion";
import doctorsData from "../data/doctors.json";
import { ArrowRight, Star } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import Link from "next/link";

export const Doctors = () => {
  const { language, t } = useLanguage();

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-[#e2e8f0]/40 to-white relative overflow-hidden" id="doctors">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/5 rounded-[100%] blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="w-full px-6 md:px-12 lg:px-20 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 px-4">
          <div className="max-w-2xl">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-secondary font-bold tracking-widest text-sm mb-4 uppercase"
            >
              {t("doctors.subtitle")}
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black text-primary mb-6 drop-shadow-sm"
            >
              {t("doctors.title")}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 text-lg md:text-xl font-light"
            >
              {t("doctors.desc")}
            </motion.p>
          </div>
          <Link href="/doctors" passHref>
            <motion.button 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="hidden md:flex items-center gap-2 border border-primary/20 bg-white shadow-sm text-primary hover:bg-primary hover:text-white hover:border-primary font-bold py-3 px-8 rounded-full transition-all duration-300 mt-6 md:mt-0 group"
            >
              {t("doctors.see_all")} <ArrowRight size={20} className={`opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all ${language === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
            </motion.button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctorsData.map((doctor, idx) => (
            <Link href={`/doctors/${doctor.id}`} key={doctor.id}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6, type: "spring", stiffness: 100 }}
                className="bg-white rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,168,168,0.1)] border border-slate-100/60 group relative transform hover:-translate-y-2 transition-all duration-500 h-full"
              >
              <div className="h-72 overflow-hidden relative">
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-1000"
                  style={{ backgroundImage: `url(${doctor.image})` }}
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-2 py-1 flex items-center gap-1 rounded-full text-xs font-bold text-amber-500 shadow-sm">
                  <Star size={12} fill="currentColor" /> 4.9
                </div>
              </div>
              <div className="p-6 text-center bg-white relative">
                <h3 className="font-bold text-xl text-primary mb-1 group-hover:text-secondary transition-colors duration-300">
                  {language === 'ar' ? doctor.name_ar : doctor.name_fr}
                </h3>
                <p className="text-secondary font-medium text-sm px-4 py-1 bg-secondary/10 rounded-full inline-block mt-2">
                  {language === 'ar' ? doctor.specialty_ar : doctor.specialty_fr}
                </p>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/95 to-primary-light/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-6 text-center backdrop-blur-sm">
                <h3 className="font-bold text-2xl text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  {language === 'ar' ? doctor.name_ar : doctor.name_fr}
                </h3>
                <p className="text-secondary-light font-medium mb-8 translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                  {language === 'ar' ? doctor.specialty_ar : doctor.specialty_fr}
                </p>
                <button className="bg-white text-primary px-8 py-3 rounded-full font-bold hover:bg-secondary hover:text-white transition-all shadow-lg hover:shadow-secondary/50 flex items-center gap-2 translate-y-4 group-hover:translate-y-0 duration-300 delay-100 hover:scale-105">
                  {t("doctors.book")} <ArrowRight size={16} className={language === 'ar' ? 'rotate-180' : ''} />
                </button>
              </div>
            </motion.div>
            </Link>
          ))}
        </div>
        
        <Link href="/doctors" passHref>
          <button className="md:hidden w-full bg-primary hover:bg-secondary text-white font-bold py-4 mt-10 rounded-xl transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
            {t("doctors.see_all")} <ArrowRight size={20} className={language === 'ar' ? 'rotate-180' : ''} />
          </button>
        </Link>
      </div>
    </section>
  );
};
