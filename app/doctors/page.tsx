"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Star, ArrowRight, UserRound, Sparkles } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import doctorsData from "../../data/doctors.json";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";

export default function DoctorsPage() {
  const { language, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("ALL");

  // Extract unique specialties based on current language
  const specialties = useMemo(() => {
    const list = doctorsData.map(d => language === 'ar' ? d.specialty_ar : d.specialty_fr);
    return ["ALL", ...Array.from(new Set(list))];
  }, [language]);

  // Filter logic
  const filteredDoctors = useMemo(() => {
    return doctorsData.filter(doctor => {
      const name = language === 'ar' ? doctor.name_ar : doctor.name_fr;
      const specialty = language === 'ar' ? doctor.specialty_ar : doctor.specialty_fr;
      
      const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            specialty.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialty = selectedSpecialty === "ALL" || specialty === selectedSpecialty;

      return matchesSearch && matchesSpecialty;
    });
  }, [searchTerm, selectedSpecialty, language]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      <main className="flex-grow">
        {/* Premium Cinematic Hero Banner */}
        <section className="relative h-[50vh] min-h-[450px] w-full bg-[#041B2D] overflow-hidden flex items-center justify-center">
          {/* Decorative Glowing Orbs */}
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          
          {/* Dot Grid Overlay */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto -mt-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center gap-2 mb-4"
            >
              <Sparkles className="text-secondary" size={20} />
              <span className="text-secondary-light font-bold tracking-[0.3em] uppercase text-sm">
                {t("doctors.subtitle")}
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl"
            >
              {t("doctors.title")}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/70 text-lg md:text-xl font-medium max-w-2xl mx-auto"
            >
              {t("doctors.desc")}
            </motion.p>
          </div>
        </section>

        {/* Floating Glassmorphism Filter Bar */}
        <section className="relative z-20 -mt-12 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto mb-16">
          <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-4 md:p-6 shadow-[0_20px_50px_rgba(4,27,45,0.08)] border border-white/50 flex flex-col md:flex-row gap-4 items-center">
            
            <div className={`relative flex-1 w-full flex items-center bg-slate-50 rounded-2xl p-2 border border-slate-100 focus-within:border-secondary/50 focus-within:ring-4 focus-within:ring-secondary/10 transition-all ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
              <div className="pl-4 pr-3 text-slate-400">
                <Search size={20} />
              </div>
              <input 
                type="text" 
                placeholder={t("directory.search_placeholder")}
                className={`w-full bg-transparent border-none outline-none font-medium text-primary py-2 px-2 ${language === 'ar' ? 'text-right' : 'text-left'}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="w-full md:w-1/3 min-w-[250px]">
              <div className="relative bg-slate-50 rounded-2xl border border-slate-100 hover:border-secondary/30 transition-all">
                <select 
                  className={`w-full appearance-none bg-transparent py-4 px-6 font-bold text-primary outline-none cursor-pointer ${language === 'ar' ? 'text-right' : 'text-left'}`}
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  dir={language === 'ar' ? 'rtl' : 'ltr'}
                >
                  {specialties.map(spec => (
                    <option key={spec} value={spec} className="font-bold text-slate-700">
                      {spec === "ALL" ? t("directory.filter_all") : spec}
                    </option>
                  ))}
                </select>
                <div className={`absolute top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 ${language === 'ar' ? 'left-6' : 'right-6'}`}>
                  ▼
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Doctors Grid Container */}
        <section className="px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto mb-32">
          
          {filteredDoctors.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-[3rem] shadow-sm border border-slate-100">
              <div className="bg-slate-50 p-6 rounded-full text-slate-300 mb-6">
                <UserRound size={64} />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-2">{t("directory.no_results")}</h3>
              <button 
                onClick={() => {setSearchTerm(""); setSelectedSpecialty("ALL");}}
                className="mt-6 text-secondary font-bold hover:underline"
              >
                {t("nav.more")}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredDoctors.map((doctor, idx) => (
                <Link href={`/doctors/${doctor.id}`} key={doctor.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.6, type: "spring", stiffness: 100 }}
                    className="bg-white rounded-[2rem] overflow-hidden shadow-[0_15px_40px_rgb(0,0,0,0.04)] hover:shadow-[0_25px_60px_rgba(0,168,168,0.12)] border border-slate-100 group relative transform hover:-translate-y-3 transition-all duration-500 h-full"
                  >
                  <div className="h-80 overflow-hidden relative">
                    <div 
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-1000"
                      style={{ backgroundImage: `url(${doctor.image})` }}
                    />
                    
                    {/* Deep Premium Gradient for Text Visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#041B2D]/90 via-[#041B2D]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                    
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 flex items-center gap-1.5 rounded-full text-xs font-bold text-amber-500 shadow-sm border border-white/20">
                      <Star size={14} fill="currentColor" /> 4.9
                    </div>

                    {/* Meta info layered over the image */}
                    <div className="absolute bottom-6 left-6 right-6 z-10 text-white transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-4">
                      <h3 className="font-bold text-2xl mb-2 drop-shadow-md">
                        {language === 'ar' ? doctor.name_ar : doctor.name_fr}
                      </h3>
                      <p className="text-secondary-light font-bold text-sm tracking-wide uppercase drop-shadow-sm">
                        {language === 'ar' ? doctor.specialty_ar : doctor.specialty_fr}
                      </p>
                    </div>
                  </div>

                  {/* Ultimate Hover Overlay Action Screen */}
                  <div className="absolute inset-0 bg-[#041B2D]/98 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center items-center p-8 text-center translate-y-8 group-hover:translate-y-0 z-20">
                    <div className="bg-secondary/20 p-4 rounded-full text-secondary-light mb-6 transform scale-50 group-hover:scale-100 transition-transform duration-500 delay-100">
                      <Stethoscope size={32} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-bold text-2xl text-white mb-2">
                      {language === 'ar' ? doctor.name_ar : doctor.name_fr}
                    </h3>
                    <p className="text-slate-400 font-medium mb-10 text-sm">
                      {t("quick.international_desc")}
                    </p>
                    <button className="bg-gradient-to-r from-secondary to-primary text-white w-full py-4 rounded-2xl font-bold shadow-[0_10px_20px_rgba(0,168,168,0.3)] hover:scale-105 hover:shadow-[0_15px_30px_rgba(0,168,168,0.5)] transition-all duration-300 flex items-center justify-center gap-2">
                      {t("doctors.book")} <ArrowRight size={18} className={language === 'ar' ? 'rotate-180' : ''} />
                    </button>
                  </div>
                </motion.div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
      
      {/* Sticky Mobile CTA */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 bg-gradient-to-r from-secondary to-primary text-white py-4 px-6 rounded-2xl text-center font-bold z-40 shadow-2xl border border-white/20">
        {t("doctors.book_long")}
      </div>
    </div>
  );
}

// Quick fallback mock icon just in case lucide doesn't load it out of context
function Stethoscope(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={props.strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/>
      <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/>
      <circle cx="20" cy="10" r="2"/>
    </svg>
  );
}
