"use client";

import { motion } from "framer-motion";
import { 
  Bone, HeartPulse, Microscope, Syringe, Baby, Brain, 
  Droplet, Radiation, Ear, Smile, Heart, ArrowRight
} from "lucide-react";
import departmentsData from "../data/departments.json";
import { useLanguage } from "../context/LanguageContext";
import Link from "next/link";

import React from "react";

const iconMap: Record<string, React.ReactNode> = {
  Radiation: <Radiation size={42} strokeWidth={1.5} />,
  Baby: <Baby size={42} strokeWidth={1.5} />,
  Microscope: <Microscope size={42} strokeWidth={1.5} />,
  Syringe: <Syringe size={42} strokeWidth={1.5} />,
  Bone: <Bone size={42} strokeWidth={1.5} />,
  Droplet: <Droplet size={42} strokeWidth={1.5} />,
  Brain: <Brain size={42} strokeWidth={1.5} />,
  Ear: <Ear size={42} strokeWidth={1.5} />,
  Smile: <Smile size={42} strokeWidth={1.5} />,
  HeartPulse: <HeartPulse size={42} strokeWidth={1.5} />,
  Heart: <Heart size={42} strokeWidth={1.5} />
};

export const Departments = () => {
  const { language, t } = useLanguage();

  return (
    <section className="py-16 md:py-20 relative overflow-hidden bg-gradient-to-br from-[#0A2E46] via-[#0B3C5D] to-[#02182b]" id="departments">
      {/* Decorative Orbs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-secondary/30 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-primary-light/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full px-6 md:px-12 lg:px-20 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-white mb-6 drop-shadow-lg"
            >
              {t("departments.title")}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[#9fc1d8] text-lg md:text-xl font-light"
            >
              {t("departments.subtitle")}
            </motion.p>
          </div>
          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="hidden md:flex items-center gap-2 text-white bg-[#15537d] hover:bg-secondary border border-[#1b6b9e] hover:border-secondary font-bold py-3 px-6 rounded-full mt-6 md:mt-0 transition-all duration-300 shadow-lg group"
          >
            {t("departments.see_all")} <ArrowRight size={20} className={`group-hover:translate-x-1 transition-transform ${language === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {departmentsData.map((dept, idx) => (
            <Link href={`/departments/${dept.id}`} key={dept.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.5 }}
                className="bg-[#0f4466] border border-[#185e8a] p-8 rounded-2xl hover:bg-[#155a87] hover:border-secondary transition-all duration-300 group cursor-pointer relative overflow-hidden shadow-lg shadow-black/20 hover:shadow-secondary/20 hover:-translate-y-1 h-full"
              >
              {/* Shine effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:animate-shimmer transition-opacity duration-300" />

              <div className="text-secondary-light group-hover:text-white mb-8 transition-colors duration-300 drop-shadow-[0_0_8px_rgba(0,198,198,0.5)]">
                {iconMap[dept.icon]}
              </div>
              <h3 className="text-xl font-bold text-white group-hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] transition-all duration-300">
                {language === 'ar' ? dept.name_ar : dept.name_fr}
              </h3>
            </motion.div>
            </Link>
          ))}
        </div>
        
        <button className="md:hidden flex items-center justify-center gap-2 text-white bg-white/10 hover:bg-white hover:text-primary backdrop-blur-md font-bold mt-10 transition-all w-full border border-white/20 py-4 rounded-xl shadow-lg">
          {t("departments.see_all")} <ArrowRight size={20} className={language === 'ar' ? 'rotate-180' : ''} />
        </button>
      </div>
    </section>
  );
};
