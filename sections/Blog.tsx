"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, ArrowUpRight, BookOpen } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const articles = [
  {
    id: 1,
    title_fr: "Ouverture du nouveau centre de chirurgie robotique",
    title_ar: "افتتاح مركز الجراحة الروبوتية الجديد",
    date: "Mars 28, 2026",
    date_ar: "28 مارس 2026",
    category_fr: "Actualités",
    category_ar: "أخبار المستشفى",
    image: "/images/blog_robotic.png"
  },
  {
    id: 2,
    title_fr: "Percée dans la chirurgie cardiaque mini-invasive",
    title_ar: "إنجاز في الجراحة القلبية طفيفة التوغل",
    date: "Mars 25, 2026",
    date_ar: "25 مارس 2026",
    category_fr: "Innovations",
    category_ar: "إنجازات طبية",
    image: "/images/blog_cardiac.png"
  },
  {
    id: 3,
    title_fr: "Comprendre votre santé cardiovasculaire",
    title_ar: "فهم صحتك القلبية الوعائية",
    date: "Mars 20, 2026",
    date_ar: "20 مارس 2026",
    category_fr: "Conseils Santé",
    category_ar: "نصائح صحية",
    image: "/images/blog_health.png"
  }
];

export const Blog = () => {
  const { language, t } = useLanguage();

  return (
    <section className="py-16 md:py-20 bg-slate-50 relative border-t border-slate-200/60" id="blog">
      {/* Decorative dot grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, black 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="w-full px-6 md:px-12 lg:px-20 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 text-center md:text-start">
          <div className="md:w-1/2 flex flex-col items-center md:items-start">
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-secondary font-bold tracking-widest text-sm mb-4 uppercase flex items-center gap-2"
            >
              <BookOpen size={18} strokeWidth={2.5} />
              {t("blog.subtitle")}
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black text-primary"
            >
              {t("blog.title")}
            </motion.h2>
          </div>
          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="hidden md:flex items-center gap-3 text-primary font-bold hover:text-secondary hover:tracking-wide transition-all duration-300 mt-6 md:mt-0 group"
          >
            {t("blog.see_all")} 
            <span className={`bg-primary/5 group-hover:bg-secondary/10 p-2 rounded-full transition-colors ${language === 'ar' ? 'rotate-180' : ''}`}>
              <ArrowRight size={18} />
            </span>
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {articles.map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6, type: "spring" }}
              className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-slate-100 transition-all duration-500 hover:-translate-y-2 flex flex-col"
            >
              <div className="overflow-hidden relative h-56 m-2 rounded-2xl">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                  style={{ backgroundImage: `url(${article.image})` }}
                />
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-primary shadow-sm border border-slate-100">
                  {language === 'ar' ? article.category_ar : article.category_fr}
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-4 uppercase tracking-wider">
                  <Calendar size={14} className="text-secondary" /> {language === 'ar' ? article.date_ar : article.date}
                </div>
                <h3 className="text-2xl font-bold text-primary mb-6 group-hover:text-secondary transition-colors line-clamp-2 leading-snug flex-1">
                  {language === 'ar' ? article.title_ar : article.title_fr}
                </h3>
                
                <div className="flex items-center text-sm font-bold text-secondary gap-2 group-hover:gap-3 transition-all pt-6 border-t border-slate-100">
                  <span>{t("nav.more")}</span>
                  <span className={`bg-secondary/10 p-1.5 rounded-full group-hover:bg-secondary group-hover:text-white transition-colors delay-100`}>
                    <ArrowUpRight size={16} className={language === 'ar' ? '-rotate-90' : ''} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <button className="md:hidden w-full border border-slate-200 bg-white text-primary font-bold py-4 mt-12 rounded-xl shadow-sm hover:border-primary hover:text-secondary transition-colors flex items-center justify-center gap-2">
          {t("blog.see_all")} <ArrowRight size={18} className={language === 'ar' ? 'rotate-180' : ''} />
        </button>
      </div>
    </section>
  );
};
