"use client";

import React, { useMemo, useState } from "react";
import { useLanguage } from "../../../context/LanguageContext";
import departmentsData from "../../../data/departments.json";
import doctorsData from "../../../data/doctors.json";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronRight, Activity, CalendarPlus, ShieldCheck, Clock, Stethoscope, ChevronLeft, Star, ArrowRight, UserRound } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  Bone, HeartPulse, Microscope, Syringe, Baby, Brain, 
  Droplet, Radiation, Ear, Smile, Heart
} from "lucide-react";

// Local Map for Icons
const iconMap: Record<string, any> = {
  Radiation: <Radiation size={64} strokeWidth={1} />,
  Baby: <Baby size={64} strokeWidth={1} />,
  Microscope: <Microscope size={64} strokeWidth={1} />,
  Syringe: <Syringe size={64} strokeWidth={1} />,
  Bone: <Bone size={64} strokeWidth={1} />,
  Droplet: <Droplet size={64} strokeWidth={1} />,
  Brain: <Brain size={64} strokeWidth={1} />,
  Ear: <Ear size={64} strokeWidth={1} />,
  Smile: <Smile size={64} strokeWidth={1} />,
  HeartPulse: <HeartPulse size={64} strokeWidth={1} />,
  Heart: <Heart size={64} strokeWidth={1} />
};

export default function DepartmentProfile() {
  const params = useParams();
  const id = params?.id as string;
  const { language, t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const dept = useMemo(() => departmentsData.find(d => d.id.toString() === id), [id]);

  if (!dept) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center bg-slate-50 text-slate-500 font-bold">
          Department Not Found.
        </div>
        <Footer />
      </div>
    );
  }

  const name = language === 'ar' ? dept.name_ar : dept.name_fr;
  const desc = language === 'ar' ? dept.desc_ar : dept.desc_fr;
  const services = language === 'ar' ? dept.services_ar : dept.services_fr;
  
  const gallery = dept.gallery || [dept.image];
  const detailedText = language === 'ar' ? dept.detailed_content_ar : dept.detailed_content_fr;
  
  const attachedDoctors = useMemo(() => doctorsData.filter((doc: any) => doc.department_ids?.includes(dept.id)), [dept.id]);
  
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % gallery.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      <Navbar />

      {/* Massive Cinematic Hero Section */}
      <section className="relative w-full h-[55vh] min-h-[500px] flex items-center bg-[#051c2e] overflow-hidden">
        {/* Parallax Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-[0.15] mix-blend-screen scale-105"
          style={{ backgroundImage: `url(${dept.image})` }}
        />
        
        {/* Deep Abdali-Style Medical Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#02182b] via-[#051c2e]/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#02182b] via-transparent to-transparent" />
        
        {/* Decorative Neon Orbs */}
        <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-[1400px] px-6 md:px-12 lg:px-20 mx-auto">
          
          {/* Breadcrumb Layer */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`font-bold text-sm flex items-center gap-3 text-secondary-light mb-8 `}
          >
            <Link href="/#departments" className="hover:text-white transition-colors flex items-center gap-1">
              {language === 'ar' ? <ChevronRight size={16} /> : <ArrowLeft size={16} />}
              {language === 'ar' ? 'جميع الأقسام' : 'Tous les départements'}
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-white/70">{name}</span>
          </motion.div>

          {/* Department Icon and Name */}
          <div className="flex items-center gap-6 mb-6 text-left">
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
              className="text-secondary drop-shadow-[0_0_15px_rgba(0,198,198,0.4)] bg-white/5 p-4 rounded-3xl border border-white/10 backdrop-blur-sm"
            >
              {iconMap[dept.icon]}
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, x: language === 'ar' ? 30 : -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-7xl font-black text-white drop-shadow-2xl tracking-tight leading-tight"
            >
              {name}
            </motion.h1>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[#9fc1d8] text-lg lg:text-xl font-medium max-w-2xl leading-relaxed text-left"
          >
            {desc}
          </motion.p>
        </div>
      </section>

      {/* Main Content Floor */}
      <main className="relative z-20 w-full max-w-[1400px] px-6 md:px-12 lg:px-20 mx-auto -mt-16 mb-24">
        <div className={`flex flex-col lg:flex-row gap-8 xl:gap-16 `}>
          
          {/* Left Column (Main Capabilities) */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_20px_60px_rgba(5,28,46,0.05)] border border-slate-100 relative overflow-hidden mb-8">
              {/* Decorative Watermark */}
              <div className="absolute -bottom-10 -right-10 text-slate-50 opacity-50 scale-150 pointer-events-none">
                {iconMap[dept.icon]}
              </div>

              {/* Dynamic Image Gallery Slider */}
              <div className="relative w-full aspect-video md:h-[450px] rounded-[1.5rem] overflow-hidden mb-12 group shadow-[0_15px_40px_rgb(0,0,0,0.1)]">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={currentSlide}
                    src={gallery[currentSlide]}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 w-full h-full object-cover"
                    alt={`${name} gallery`}
                  />
                </AnimatePresence>
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent group-hover:from-black/60 transition-all duration-300" />
                
                {/* Slider Controls */}
                <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button onClick={prevSlide} className={`bg-white/95 text-primary hover:bg-white hover:text-secondary p-3 rounded-full shadow-lg backdrop-blur-sm transform transition-all hover:scale-110 active:scale-95 ${language === 'ar' ? 'order-1' : ''}`}>
                    <ChevronLeft size={24} />
                  </button>
                  <button onClick={nextSlide} className={`bg-white/95 text-primary hover:bg-white hover:text-secondary p-3 rounded-full shadow-lg backdrop-blur-sm transform transition-all hover:scale-110 active:scale-95 ${language === 'ar' ? '-order-1' : ''}`}>
                    <ChevronRight size={24} />
                  </button>
                </div>
                
                {/* Indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
                  {gallery.map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-2 rounded-full transition-all duration-500 ease-in-out cursor-pointer ${currentSlide === i ? 'w-8 bg-white shadow-md' : 'w-2 bg-white/50 hover:bg-white/80'}`}
                      onClick={() => setCurrentSlide(i)}
                    />
                  ))}
                </div>
              </div>

              {/* In-Depth Detailed Content */}
              <div className="mb-12 relative">
                <h2 className={`text-2xl font-black text-[#051c2e] mb-6 flex items-center gap-3 justify-start`}>
                  <span className="w-8 h-1 bg-secondary rounded-full inline-block"></span>
                  {language === 'ar' ? 'نبذة عن التخصص :' : 'À propos de la spécialité :'}
                </h2>
                <div className={`space-y-6 text-[#475569] leading-loose text-lg font-medium drop-shadow-sm text-left`}>
                  {detailedText && detailedText.map((paragraph: string, i: number) => (
                    <motion.p 
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      key={i}
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>
              </div>

              {/* Equipments Section */}
              {dept.equipments_fr && (
                <div className="mb-12 pt-10 border-t border-slate-100 relative">
                  <h2 className={`text-2xl font-black text-[#051c2e] mb-8 flex items-center gap-3 justify-start`}>
                    <span className="w-8 h-1 bg-secondary rounded-full inline-block"></span>
                    {language === 'ar' ? 'معداتنا في هذا التخصص :' : `Nos équipements en ${name.split(' ')[0]} :`}
                  </h2>
                  <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 text-left`}>
                    {(language === 'ar' ? dept.equipments_ar : dept.equipments_fr).map((eq: string, idx: number) => (
                      <motion.div 
                        initial={{ opacity: 0, x: language === 'ar' ? 20 : -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + (idx * 0.05) }}
                        key={idx} 
                        className={`flex items-start gap-3 `}
                      >
                        <div className="w-2 h-2 rounded-full bg-secondary mt-2 shrink-0"></div>
                        <span className="text-slate-700 font-bold">{eq}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              <div className={`flex items-center gap-4 mb-8 pt-8 border-t border-slate-100 `}>
                <div className="bg-primary/10 text-primary p-3 rounded-2xl">
                  <Activity size={32} />
                </div>
                <h2 className={`text-3xl font-black text-primary text-left`}>
                  {language === 'ar' ? 'الخدمات والإجراءات الطبية' : 'Services et interventions'}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + (idx * 0.1) }}
                    key={idx} 
                    className={`bg-slate-50 border border-slate-100 p-5 rounded-2xl flex items-center gap-4 group hover:bg-[#051c2e] hover:border-[#051c2e] transition-all duration-300 shadow-sm `}
                  >
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors duration-300 shrink-0">
                      <Stethoscope size={18} />
                    </div>
                    <span className={`font-bold text-slate-700 group-hover:text-white transition-colors duration-300 text-left`}>
                      {service}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (Sidebar Action) */}
          <div className="w-full lg:w-1/3">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="sticky top-24 bg-gradient-to-br from-[#051c2e] to-[#0a2e46] rounded-[2rem] p-8 text-white shadow-[0_20px_50px_rgba(5,28,46,0.2)] border-t border-white/10"
            >
              <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                <ShieldCheck className="text-secondary" size={28} />
                {language === 'ar' ? 'عيادة متخصصة' : 'Clinique Spécialisée'}
              </h3>
              
              <p className={`text-[#9fc1d8] font-medium mb-8 leading-relaxed text-left`}>
                {language === 'ar' ? 'فريقنا الطبي متاح لتقديم أفضل الاستشارات والرعاية الصحية المتقدمة لك ولعائلتك.' : 'Notre équipe médicale est disponible pour vous offrir les meilleures consultations et soins de santé avancés.'}
              </p>

              <div className="space-y-4 mb-8">
                <div className={`flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5 `}>
                  <Clock size={24} className="text-secondary" />
                  <div className="text-left">
                    <p className="text-white font-bold">{language === 'ar' ? 'متاح 24/7' : 'Disponible 24/7'}</p>
                    <p className="text-white/60 text-sm">{language === 'ar' ? 'للحالات الطارئة' : 'Pour les urgences'}</p>
                  </div>
                </div>
              </div>

              <button className="w-full bg-secondary hover:bg-white text-white hover:text-[#051c2e] py-4 rounded-xl font-black uppercase tracking-widest shadow-[0_10px_20px_rgba(0,198,198,0.2)] hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group">
                {t("doctors.book")} <CalendarPlus size={20} className="group-hover:scale-110 transition-transform" />
              </button>
            </motion.div>
          </div>

        </div>

        {/* Attached Doctors Section (Separated entirely) */}
        {attachedDoctors.length > 0 && (
          <div className="mt-20">
            <div className="flex flex-col gap-4 mb-12 items-start">
              <h2 className={`text-3xl md:text-4xl font-black text-[#051c2e] text-left`}>
                {language === 'ar' ? 'أطباء القسم المعتمدين' : 'Médecins du département'}
              </h2>
              <div className="w-32 h-1 bg-secondary rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {attachedDoctors.map((doc, idx) => (
                <Link href={`/doctors/${doc.id}`} key={doc.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.6, type: "spring", stiffness: 100 }}
                    className="bg-white rounded-3xl overflow-hidden shadow-[0_15px_40px_rgb(0,0,0,0.06)] hover:shadow-[0_25px_60px_rgba(0,168,168,0.15)] border border-slate-100 group relative transform hover:-translate-y-2 transition-all duration-500 h-full flex flex-col"
                  >
                    <div className="h-64 overflow-hidden relative">
                      <div 
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-1000"
                        style={{ backgroundImage: `url(${doc.image})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#051c2e]/90 via-[#051c2e]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-1 border border-white/20">
                        <Star size={12} className="text-secondary fill-secondary" />
                        <span className="text-white text-xs font-bold font-mono">5.0</span>
                      </div>
                      
                      <div className={`absolute bottom-0 p-6 w-full text-left`}>
                        <span className="text-secondary font-bold text-[10px] uppercase tracking-widest mb-1 block">
                          {language === 'ar' ? doc.specialty_ar : doc.specialty_fr}
                        </span>
                        <h3 className="text-xl font-black text-white drop-shadow-md">
                          {language === 'ar' ? doc.name_ar : doc.name_fr}
                        </h3>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-white shrink-0 flex-grow flex flex-col">
                      <div className="flex flex-wrap items-center gap-2 mb-6">
                        <UserRound size={16} className="text-slate-400" />
                        {doc.expertise_fr.slice(0, 2).map((exp: string, i: number) => (
                          <span key={i} className="bg-slate-50 text-slate-500 text-[10px] font-bold uppercase py-1 px-3 rounded-md border border-slate-200">
                            {language === 'ar' ? doc.expertise_ar[i] : exp}
                          </span>
                        ))}
                      </div>
                      
                      <div className="mt-auto">
                        <button className={`w-full bg-[#051c2e] hover:bg-secondary text-white text-sm font-bold py-2.5 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-[0_8px_15px_rgba(5,28,46,0.15)] hover:shadow-[0_10px_20px_rgba(0,198,198,0.3)]`}>
                          {t("doctors.book_long")} 
                          <ArrowRight size={16} className={`duration-300 ${language === 'ar' ? 'rotate-180 group-hover/btn:-translate-x-1' : 'group-hover/btn:translate-x-1'}`} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Paramedical & Technician Team */}
        {dept.team && dept.team.length > 0 && (
          <div className="mt-24 mb-10 w-full relative">
            
            <div className="flex items-center gap-4 mb-12">
              <span className="w-12 h-1.5 bg-secondary rounded-full"></span>
              <h2 className="text-3xl md:text-4xl font-black text-[#051c2e] uppercase tracking-wide">
                {language === 'ar' ? 'الفريق شبه الطبي' : 'Équipe Paramédicale'}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {dept.team.map((member: { name_fr: string; name_ar: string; role_fr: string; role_ar: string; image: string }, idx: number) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, duration: 0.6, type: "spring" }}
                  key={idx}
                  className="bg-white rounded-3xl overflow-hidden shadow-[0_15px_40px_rgb(0,0,0,0.06)] hover:shadow-[0_25px_60px_rgba(0,168,168,0.15)] border border-slate-100 group relative transform hover:-translate-y-2 transition-all duration-500 h-full flex flex-col"
                >
                  {/* Top Image Section (Like Doctors) */}
                  <div className="h-64 overflow-hidden relative">
                    <div 
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-1000"
                      style={{ backgroundImage: `url(${member.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#051c2e]/90 via-[#051c2e]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-1 border border-white/20">
                      <Star size={12} className="text-secondary fill-secondary" />
                      <span className="text-white text-xs font-bold font-mono">5.0</span>
                    </div>

                    {/* Decorative Grid Lines */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                    
                    {/* Role & Name */}
                    <div className={`absolute bottom-0 p-6 w-full text-left`}>
                      <span className="text-secondary font-bold text-[10px] uppercase tracking-widest mb-1 block drop-shadow-md">
                        {language === 'ar' ? member.role_ar : member.role_fr}
                      </span>
                      <h3 className="text-xl font-black text-white drop-shadow-lg transform transition-transform duration-500 group-hover:-translate-y-1">
                        {language === 'ar' ? member.name_ar : member.name_fr}
                      </h3>
                    </div>
                  </div>

                  {/* Bottom White Section */}
                  <div className="p-6 bg-white shrink-0 flex-grow flex flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-2">
                      <UserRound size={16} className="text-slate-400" />
                      <span className="bg-slate-50 text-slate-500 text-[10px] font-bold uppercase py-1 px-3 rounded-md border border-slate-200">
                        {language === 'ar' ? 'فريق الدعم' : 'Support Team'}
                      </span>
                      <span className="bg-slate-50 text-slate-500 text-[10px] font-bold uppercase py-1 px-3 rounded-md border border-slate-200">
                        {language === 'ar' ? 'معتمد' : 'Certifié'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Animated Bottom Laser Border */}
                  <div className="absolute bottom-0 left-0 h-1.5 bg-gradient-to-r from-transparent via-[#00c6c6] to-transparent w-0 group-hover:w-full transition-all duration-[600ms] ease-out z-20 shadow-[0_0_15px_3px_rgba(0,198,198,0.8)]"></div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
