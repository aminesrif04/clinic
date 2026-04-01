"use client";

import { Stethoscope, CalendarPlus, FileText, Phone, ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";
import Link from "next/link";

export const QuickAccess = () => {
  const { t, language } = useLanguage();

  const items = [
    {
      title: t("quick.international"),
      desc: t("quick.international_desc"),
      icon: <Stethoscope size={28} strokeWidth={1.5} />,
      href: "/contact",
    },
    {
      title: t("quick.appointment"),
      desc: t("quick.appointment_desc"),
      icon: <CalendarPlus size={28} strokeWidth={1.5} />,
      href: "/contact",
    },
    {
      title: t("quick.assessment"),
      desc: t("quick.assessment_desc"),
      icon: <FileText size={28} strokeWidth={1.5} />,
      href: "/doctors",
    },
    {
      title: t("quick.contact"),
      desc: "05 35 52 55 25",
      icon: <Phone size={28} strokeWidth={1.5} />,
      href: "/contact",
    }
  ];

  return (
    <section className="relative z-30 -mt-10 md:-mt-14 px-6 md:px-12 lg:px-20 mb-16 md:mb-20 max-w-[1600px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
        {items.map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15, duration: 0.7, type: "spring", stiffness: 100 }}
            className="h-full"
          >
            <Link href={item.href} className={`group block relative overflow-hidden bg-white/95 backdrop-blur-2xl rounded-[2rem] p-8 shadow-[0_30px_70px_rgba(0,168,168,0.1)] border border-secondary/20 hover:border-secondary/40 transition-all duration-500 cursor-pointer translate-y-0 hover:-translate-y-4 flex flex-col items-center sm:items-start text-center sm:text-left h-full ${language === 'ar' ? 'sm:items-end sm:text-right' : ''}`}>
              {/* The Premium Sweep Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/80 to-transparent -translate-x-[150%] skew-x-[-30deg] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out pointer-events-none z-20" />

              {/* Glowing inner background elements (now permanently intense) */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full blur-[40px] translate-x-1/2 -translate-y-1/2 group-hover:bg-secondary/30 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/20 rounded-full blur-[40px] -translate-x-1/2 translate-y-1/2 group-hover:bg-primary/30 transition-colors duration-500" />
              
              {/* Accent Glowing Line (now permanently visible) */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-100 group-hover:via-primary transition-colors duration-500" />

              {/* Icon Container (now permanently active gradient) */}
              <div className="relative z-10 w-16 h-16 mb-8 flex items-center justify-center bg-gradient-to-br from-primary to-secondary text-white rounded-[1.2rem] shadow-[0_15px_30px_rgba(0,168,168,0.3)] transform transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
                {item.icon}
              </div>
              
              {/* Typography */}
              <div className="relative z-10 w-full mb-6 mt-auto">
                <h3 className="font-bold text-xl text-secondary mb-3 group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-slate-500 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>

              {/* Interactive Arrow Indicator (now permanently visible) */}
              <div className={`relative z-10 mt-auto flex items-center text-sm font-bold text-secondary gap-2 tracking-wide uppercase opacity-100 translate-x-0 group-hover:text-primary transition-all duration-500 ${language === 'ar' ? 'flex-row-reverse group-hover:-translate-x-2' : 'group-hover:translate-x-2'}`}>
                {t("nav.more")} <ArrowRight size={16} className={language === 'ar' ? 'rotate-180' : ''} />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
