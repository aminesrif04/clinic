"use client";

import { useLanguage } from "../../../context/LanguageContext";
import doctorsData from "../../../data/doctors.json";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, Globe2, FileText, CalendarPlus, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function DoctorProfile() {
  const params = useParams();
  const id = params?.id as string;
  const { language, t } = useLanguage();
  
  const doctor = doctorsData.find(d => d.id.toString() === id);

  if (!doctor) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center bg-slate-50 text-slate-500 font-bold">
          Doctor Not Found.
        </div>
        <Footer />
      </div>
    );
  }

  const name = language === 'ar' ? doctor.name_ar : doctor.name_fr;
  const specialty = language === 'ar' ? doctor.specialty_ar : doctor.specialty_fr;
  const bio = language === 'ar' ? doctor.bio_ar : doctor.bio_fr;
  const expertise = language === 'ar' ? doctor.expertise_ar : doctor.expertise_fr;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      {/* Ultra-Premium Depth Header Background */}
      <div className="relative w-full h-[35vh] min-h-[300px] bg-[#041B2D] overflow-hidden flex items-start pt-32 pb-12">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=2000')] bg-cover bg-center opacity-10 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#041B2D] via-[#0A2E46]/80 to-transparent" />
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        
        {/* Breadcrumb Layer - Elevated Premium Pill */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 w-full max-w-[1400px] px-6 md:px-12 lg:px-20 mx-auto"
        >
          <div className={`inline-flex items-center gap-3 text-secondary-light text-[12px] font-bold tracking-wider uppercase bg-white/5 backdrop-blur-lg border border-white/10 px-5 py-2.5 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.15)] ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <Link href="/doctors" className="hover:text-white transition-all duration-300 flex items-center gap-2 group/back">
              {language === 'ar' ? <ChevronRight size={14} className="group-hover/back:translate-x-1 transition-transform" /> : <ArrowLeft size={14} className="group-hover/back:-translate-x-1 transition-transform" />}
              {t("directory.filter_all") || "Back to directory"}
            </Link>
            <span className="w-1.5 h-1.5 flex-shrink-0 rounded-full bg-secondary shadow-[0_0_8px_rgba(0,198,198,0.8)]"></span>
            <span className="text-white drop-shadow-md truncate max-w-[200px] md:max-w-none">{name}</span>
          </div>
        </motion.div>
      </div>

      <main className="flex-grow relative z-20 -mt-24 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto w-full mb-32">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
          
          {/* Left Column: Fixed/Sticky Doctor Card Profile */}
          <div className="w-full lg:w-1/3 xl:w-[400px]">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
              className="sticky top-24 bg-white rounded-[2rem] p-3 shadow-[0_30px_60px_rgba(0,30,60,0.1)] border border-slate-100 flex flex-col items-center"
            >
              {/* Doctor Avatar Container */}
              <div className="w-full aspect-square rounded-[1.5rem] overflow-hidden relative shadow-inner">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${doctor.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#041B2D]/60 via-transparent to-transparent opacity-80" />
              </div>

              {/* Title Identity */}
              <div className="w-full p-6 text-center border-b border-slate-100 mb-2">
                <h1 className="text-3xl font-black text-primary mb-2 line-clamp-2">{name}</h1>
                <p className="text-secondary font-bold text-sm uppercase tracking-widest">{specialty}</p>
              </div>

              {/* Instant Languages Badges */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-6 px-4">
                <Globe2 size={16} className="text-slate-400 mr-1" />
                {doctor.languages.map((lang, i) => (
                  <span key={i} className="bg-slate-50 text-slate-600 font-bold text-[11px] uppercase tracking-wide px-3 py-1.5 rounded-md border border-slate-200">
                    {lang}
                  </span>
                ))}
              </div>

              {/* CTA Action */}
              <div className="w-full px-4 pb-4">
                <button className="w-full bg-gradient-to-r from-secondary to-primary text-white py-4 rounded-xl font-bold uppercase tracking-wide text-sm shadow-[0_10px_20px_rgba(0,168,168,0.25)] hover:shadow-[0_15px_30px_rgba(0,168,168,0.4)] hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
                  <CalendarPlus size={18} /> {t("doctors.book_long")}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Column: In-Depth Scrollable Content */}
          <div className="w-full lg:w-2/3 flex flex-col gap-12 pt-16 lg:pt-32">
            
            {/* Bio Section */}
            <motion.section
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <div className={`flex items-center gap-3 mb-6 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <div className="bg-primary/10 p-2.5 rounded-lg text-primary">
                  <FileText size={24} />
                </div>
                <h2 className="text-3xl font-black text-primary drop-shadow-sm">
                  {t("hero.about_us")}
                </h2>
              </div>
              <p className={`text-slate-600 text-lg leading-relaxed font-medium ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                {bio}
              </p>
            </motion.section>

            {/* Expertise Section */}
            <motion.section
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className={`flex items-center gap-3 mb-8 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <div className="bg-secondary/10 p-2.5 rounded-lg text-secondary">
                  <CheckCircle2 size={24} />
                </div>
                <h2 className="text-3xl font-black text-primary drop-shadow-sm">
                  {language === 'ar' ? 'مجالات الخبرة السريرية' : 'Domaines d\'expertise'}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {expertise.map((exp, idx) => (
                  <div key={idx} className={`bg-slate-50 border border-slate-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-secondary/30 transition-all flex items-center gap-4 group cursor-default ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <div className="w-2 h-2 rounded-full bg-secondary group-hover:scale-150 transition-transform"/>
                    <span className={`font-bold text-slate-700 group-hover:text-primary transition-colors ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                      {exp}
                    </span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Simulated Additional High-Quality Mock Sections */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-primary text-white rounded-[2rem] p-10 relative overflow-hidden shadow-2xl shadow-primary/20 mt-8"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[60px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
              <div className={`flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 ${language === 'ar' ? 'md:flex-row-reverse text-right' : 'text-left'}`}>
                <div className="flex-1">
                  <h3 className="text-2xl font-black mb-2">{language === 'ar' ? 'هل تبحث عن استشارة عاجلة؟' : 'Besoin d\'une consultation urgente ?'}</h3>
                  <p className="text-white/70 font-medium">{language === 'ar' ? 'عياداتنا مجهزة بأحدث التقنيات لاستقبالكم في أفضل الظروف.' : 'Nos cliniques sont équipées des dernières technologies pour vous accueillir dans les meilleures conditions.'}</p>
                </div>
                <button className="bg-white text-primary px-8 py-4 rounded-xl font-bold uppercase tracking-wide hover:bg-secondary hover:text-white transition-colors duration-300 shadow-xl whitespace-nowrap">
                  05 35 52 55 25
                </button>
              </div>
            </motion.section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
