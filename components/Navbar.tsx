"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Globe, Menu, X, CalendarPlus, ChevronDown, Check, ArrowRight, Activity, HeartPulse, Brain, Microscope, Syringe, Baby, Droplet, Radiation, Ear, Smile, Heart, Bone, HelpCircle, BookOpen, Briefcase, Mail, MessageSquare, Phone, MapPin, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import React from "react";
import departmentsData from "../data/departments.json";

const iconMap: Record<string, React.ElementType> = {
  Radiation, Baby, Microscope, Syringe, Bone, 
  Droplet, Brain, Ear, Smile, HeartPulse, Heart,
  HelpCircle, BookOpen, Briefcase, Mail, MessageSquare, ClipboardList
};

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);
  const { language, toggleLanguage, t } = useLanguage();

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setTimeout(() => setExpandedMobileMenu(null), 300);
  };

  // Scroll Progress (Global Premium Visual)
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const departmentLinks = departmentsData.map((dept) => ({
    name: language === 'ar' ? dept.name_ar : dept.name_fr,
    href: `/departments/${dept.id}`,
    icon: dept.icon
  }));

  const navLinks = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.about"), href: "/about" },
    { 
      name: t("nav.services"), 
      subLinks: departmentLinks
    },
    { name: t("nav.doctors"), href: "/doctors" },
    { 
      name: t("nav.more"), 
      subLinks: [
        { name: t("nav.admission"), href: "/#admissions", icon: "ClipboardList" },
        { name: t("nav.blog"), href: "/blog", icon: "BookOpen" },
        { name: language === 'ar' ? 'الأسئلة الشائعة' : 'FAQ', href: "/faq", icon: "HelpCircle" },
        { name: language === 'ar' ? 'التوظيف' : 'Carrières', href: "/recrutement", icon: "Briefcase" },
        { name: language === 'ar' ? 'تواصل معنا' : 'Contact', href: "/contact", icon: "Mail" },
        { name: language === 'ar' ? 'رأيك يهمنا' : 'Avis & Retour', href: "/feedback", icon: "MessageSquare" }
      ]
    }
  ];

  return (
    <>
      {/* Top Bar - Ultra Premium Slim Line */}
      <div className="bg-[#051c2e] text-white/80 text-[11px] py-2 px-6 flex justify-between items-center z-50 relative font-medium uppercase tracking-widest border-b border-white/5">
        <div className="flex gap-8">
          <span className="hidden md:flex items-center gap-2 hover:text-white transition-colors cursor-pointer group/contact" dir="ltr">
            <Mail size={12} className="text-secondary group-hover/contact:text-white transition-colors" /> {t("nav.email")}
          </span>
          <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group/contact" dir="ltr">
            <Phone size={12} className="text-secondary group-hover/contact:animate-pulse" /> {t("nav.phone")}
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span className="hidden sm:flex items-center gap-2 hover:text-white transition-colors cursor-pointer group/loc">
            <MapPin size={12} className="text-secondary group-hover/loc:-translate-y-0.5 transition-transform" /> {t("nav.address")}
          </span>
          <button 
            onClick={toggleLanguage} 
            className="flex items-center gap-2 bg-white/5 hover:bg-secondary/20 px-3 py-1.5 rounded-full transition-all duration-300 font-bold text-white border border-white/10"
          >
            <Globe size={12} /> {language === 'fr' ? 'العربية' : 'Français'}
          </button>
        </div>
      </div>

      {/* Premium Laser Scanning Animated Border - Core Visual Effect */}
      <div className="w-full h-1.5 overflow-hidden z-[45] relative bg-[#051c2e]">
        <div className="absolute inset-0 bg-secondary/20" />
        <motion.div 
          animate={{ x: ["-100%", "100%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="w-full h-full bg-gradient-to-r from-transparent via-[#00c6c6] to-transparent shadow-[0_0_15px_4px_rgba(0,198,198,1)] opacity-100 relative z-10"
        />
      </div>

      {/* Main Navbar - Glassmorphic */}
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-500",
          isScrolled 
            ? "bg-white/95 backdrop-blur-xl shadow-[0_15px_40px_rgba(5,28,46,0.08)] py-3 border-b border-slate-100" 
            : "bg-white/90 backdrop-blur-3xl py-5 shadow-[0_25px_50px_-12px_rgba(5,28,46,0.12)] relative z-30 rounded-b-3xl border border-white/50 mx-auto"
        )}
      >
        <div className="w-full px-6 md:px-12 lg:px-20 mx-auto max-w-[1800px] flex justify-between items-center">
          {/* Logo Premium Redesign */}
          <Link href="/" className="flex items-center gap-3 tracking-tight group">
            {/* Logo Mark: Glowing Medical Box */}
            <div className="relative hidden sm:flex items-center justify-center w-10 h-10 rounded-[10px] bg-gradient-to-br from-[#051c2e] to-[#0a2e46] shadow-[0_5px_15px_rgba(5,28,46,0.2)] group-hover:shadow-[0_8px_20px_rgba(0,198,198,0.4)] transition-all duration-500 overflow-hidden transform group-hover:scale-105">
               <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4px_4px] opacity-20 pointer-events-none"></div>
               <Activity size={20} className="text-secondary group-hover:scale-110 transition-transform duration-500 relative z-10" strokeWidth={2.5} />
            </div>

            {/* Logo Text (Reduced Size) */}
            <div className="flex flex-col">
              <h1 className="text-lg lg:text-xl font-black text-primary leading-none group-hover:text-secondary transition-colors duration-300 tracking-tight" dir="ltr">
                POLYCLINIQUE <span className="font-light">TAFILALET</span>
              </h1>
              <span className="text-secondary text-[8.5px] lg:text-[9.5px] uppercase font-bold tracking-[0.2em] mt-1 opacity-80 group-hover:opacity-100 transition-opacity">
                {t("nav.member")}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isMega = link.name === t("nav.services");
              return (
              <div key={link.name} className="relative group">
                {link.subLinks ? (
                  <>
                    <button className={`font-bold text-primary hover:text-secondary transition-colors flex items-center gap-1.5 py-2 ${language === 'ar' ? 'text-[15px]' : 'text-[13px] uppercase'}`}>
                       {link.name} <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                    </button>
                    <div className={`absolute top-full mt-4 bg-white/95 backdrop-blur-2xl shadow-[0_40px_80px_rgba(5,28,46,0.15)] rounded-[2rem] border border-white/60 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 z-50 origin-top transform group-hover:translate-y-0 translate-y-4 ${
                       isMega 
                         ? 'w-[800px] left-1/2 -translate-x-1/2 grid grid-cols-3 gap-2 p-5 before:absolute before:-top-2 before:left-1/2 before:-translate-x-1/2 before:w-4 before:h-4 before:bg-white/95 before:rotate-45'
                         : 'w-[320px] left-1/2 -translate-x-1/2 xl:-left-10 xl:translate-x-0 rtl:xl:-right-10 rtl:xl:translate-x-0 flex flex-col gap-1.5 p-2 before:absolute before:-top-2 before:left-1/2 before:-translate-x-1/2 xl:before:left-14 xl:before:translate-x-0 rtl:xl:before:right-14 rtl:xl:before:translate-x-0 before:w-4 before:h-4 before:bg-white/95 before:rotate-45'
                    }`}>
                      {link.subLinks.map(sub => {
                         const Icon = sub.icon ? iconMap[sub.icon] || Activity : Activity;
                         return (
                         <Link key={sub.name} href={sub.href} className="group/sub flex items-center justify-between py-2.5 px-3 rounded-2xl hover:bg-[#051c2e] hover:shadow-2xl transition-all duration-300 relative overflow-hidden bg-transparent">
                           <div className="flex items-center gap-3 relative z-10 w-full">
                              <div className="w-10 h-10 rounded-xl bg-slate-100/80 group-hover/sub:bg-secondary/20 flex items-center justify-center text-secondary transition-colors shrink-0">
                                <Icon size={18} className="group-hover/sub:scale-110 transition-transform" />
                              </div>
                              <span className={`font-bold text-[#051c2e] group-hover/sub:text-white transition-colors leading-tight line-clamp-2 ${language === 'ar' ? 'text-[14px]' : 'text-[13px]'}`}>
                                {sub.name}
                              </span>
                           </div>
                           <ArrowRight size={16} className={`shrink-0 duration-300 relative z-10 opacity-0 text-secondary ${language === 'ar' ? 'rotate-180 translate-x-4 group-hover/sub:translate-x-0' : '-translate-x-4 group-hover/sub:translate-x-0'} group-hover/sub:opacity-100`} />
                         </Link>
                         );
                      })}
                    </div>
                  </>
                ) : (
                  <Link href={link.href!} className={`font-bold text-primary hover:text-secondary transition-colors relative py-2 group/link ${language === 'ar' ? 'text-[15px]' : 'text-[13px] uppercase'}`}>
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-secondary transition-all duration-300 group-hover/link:w-full rounded-full"></span>
                  </Link>
                )}
              </div>
              );
            })}
            
            <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
              <Link href="/contact" className="bg-gradient-to-r from-primary to-[#0f4466] text-white px-6 py-3 rounded-full hover:shadow-[0_10px_20px_rgba(11,60,93,0.3)] transition-all duration-300 flex items-center gap-2 text-[13px] font-bold uppercase tracking-wide hover:-translate-y-0.5 group">
                <CalendarPlus size={16} className="text-secondary group-hover:scale-110 transition-transform" />
                {t("nav.appointment")}
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden w-12 h-12 rounded-xl flex items-center justify-center bg-slate-50 text-primary hover:bg-primary hover:text-white transition-all"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Global Reading Progress Bar - Pinned to bottom of Navbar */}
        <motion.div
           className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#051c2e] via-[#00c6c6] to-[#00f2f2] origin-left shadow-[0_0_15px_rgba(0,198,198,0.8)] z-50 pointer-events-none"
           style={{ scaleX }}
        />
      </header>

      {/* Mobile Drawer (Ultra Modern) */}
      <div className={cn(
        "fixed inset-0 bg-[#041B2D]/98 backdrop-blur-2xl z-50 flex flex-col p-6 lg:hidden transition-all duration-500 overflow-y-auto",
        mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        <div className={cn(
          "flex justify-between items-center text-white mb-16 transition-all duration-500 delay-100",
          mobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        )}>
          <Link href="/" className="flex flex-col tracking-tight" onClick={closeMobileMenu}>
            <h1 className="text-lg font-black leading-none tracking-tight" dir="ltr">POLYCLINIQUE TAFILALET</h1>
            <span className="text-secondary text-[10px] uppercase font-bold tracking-widest mt-1">{t("nav.member")}</span>
          </Link>
          <button onClick={closeMobileMenu} className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <nav className="flex flex-col gap-6 text-white text-xl font-medium w-full max-w-sm mx-auto">
          {navLinks.map((link, idx) => {
            const isExpanded = expandedMobileMenu === link.name;
            return link.subLinks ? (
              <div 
                key={link.name} 
                className={cn("flex flex-col border-b border-white/10 pb-6 transition-all duration-500", mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0")}
                style={{ transitionDelay: `${150 + idx * 50}ms` }}
              >
                <div 
                  className="flex justify-between items-center cursor-pointer group/mob"
                  onClick={() => setExpandedMobileMenu(isExpanded ? null : link.name)}
                >
                  <span className={cn("tracking-wide uppercase text-xl font-bold transition-colors duration-300", isExpanded ? "text-secondary" : "text-white group-hover/mob:text-secondary/70")}>{link.name}</span>
                  <ChevronDown className={cn("transition-transform duration-300", isExpanded ? "rotate-180 text-secondary" : "text-white/50")} size={20} />
                </div>
                
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      className="flex flex-col gap-4 pl-4 overflow-hidden"
                    >
                      {link.subLinks.map(sub => (
                        <Link key={sub.name} href={sub.href} className="hover:text-secondary text-lg transition-colors flex items-center gap-3 text-white/80 py-1" onClick={closeMobileMenu}>
                          <Check size={18} className="text-secondary/50" /> {sub.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link 
                key={link.name} 
                href={link.href!} 
                className={cn("hover:text-secondary transition-colors uppercase border-b border-white/10 pb-6 font-bold transition-all duration-500", mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0")}
                style={{ transitionDelay: `${150 + idx * 50}ms` }}
                onClick={closeMobileMenu}
              >
                {link.name}
              </Link>
            )
          })}
          
          <button 
            className={cn("bg-secondary text-white w-full py-4 mt-8 rounded-xl text-center font-bold tracking-wide uppercase shadow-[0_10px_20px_rgba(0,168,168,0.3)] hover:scale-[1.02] transition-all duration-300", mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0")}
            style={{ transitionDelay: `${150 + navLinks.length * 50}ms` }}
          >
            {t("nav.appointment")}
          </button>
        </nav>
      </div>
    </>
  );
};
