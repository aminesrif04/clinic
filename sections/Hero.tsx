"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import Link from "next/link";

export const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const { language, t } = useLanguage();

  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000",
      headline: t("hero.slide1_headline"),
      subline: t("hero.slide1_subline"),
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=2000",
      headline: t("hero.slide2_headline"),
      subline: t("hero.slide2_subline"),
    }
  ];

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? (language === 'ar' ? '-10%' : '10%') : (language === 'ar' ? '10%' : '-10%'),
      opacity: 0,
      scale: 1.05
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? (language === 'ar' ? '-10%' : '10%') : (language === 'ar' ? '10%' : '-10%'),
      opacity: 0,
      scale: 1.05
    })
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-[85vh] min-h-[700px] w-full bg-[#041B2D] overflow-hidden group/hero">
      <AnimatePresence initial={false} custom={direction} mode="sync">
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 100, damping: 30 },
            opacity: { duration: 0.8 },
            scale: { duration: 8, ease: "linear" } // Slow dramatic zoom (Ken Burns style)
          }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image with Cinematic Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[current].image})` }}
          >
            {/* Multi-layered gradient for perfect text contrast and mood. Flipped dynamically for RTL. */}
            <div className={`absolute inset-0 ${language === 'ar' ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-[#041B2D]/95 via-[#0A2E46]/80 to-transparent`} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#041B2D] via-transparent to-black/30 opacity-80" />
            <div className="absolute inset-0 bg-black/20" /> {/* Uniform dimming */}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Content */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="h-full w-full px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto flex flex-col justify-center pb-20">
          <div className="max-w-3xl text-white pointer-events-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${current}`}
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="h-1 w-12 bg-secondary rounded-full" />
                  <h2 className="text-sm md:text-base font-bold uppercase tracking-[0.3em] text-secondary-light">
                    {slides[current].headline}
                  </h2>
                </div>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-10 leading-[1.1] drop-shadow-xl text-white">
                  {slides[current].subline}
                </h1>
                
                <div className="flex flex-wrap gap-5">
                  <Link href="/doctors" className="bg-secondary text-white px-8 py-4 rounded-full font-bold transition-all duration-300 shadow-[0_10px_30px_rgba(0,168,168,0.4)] hover:shadow-[0_15px_40px_rgba(0,168,168,0.6)] hover:-translate-y-1 flex items-center gap-2 group/btn">
                    {t("hero.find_doctor")}
                    <ArrowRight size={18} className={`group-hover/btn:translate-x-1 transition-transform ${language === 'ar' ? 'rotate-180 group-hover/btn:-translate-x-1' : ''}`} />
                  </Link>
                  <Link href="/about" className="bg-white/10 hover:bg-white border hover:border-white border-white/20 hover:text-primary text-white backdrop-blur-md px-8 py-4 rounded-full font-bold transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    {t("hero.about_us")}
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation Controls (Floating Modern Buttons) */}
      <div className={`absolute bottom-[30%] -translate-y-1/2 flex flex-col gap-4 z-30 opacity-0 group-hover/hero:opacity-100 transition-opacity duration-500 ${language === 'ar' ? 'left-6 md:left-12 lg:left-20' : 'right-6 md:right-12 lg:right-20'}`}>
        <button
          onClick={language === 'ar' ? nextSlide : prevSlide}
          className="w-14 h-14 flex items-center justify-center bg-white/10 hover:bg-white text-white hover:text-primary backdrop-blur-md rounded-full shadow-lg transition-all duration-300 border border-white/20"
          aria-label="Previous slide"
        >
          {language === 'ar' ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </button>
        <button
          onClick={language === 'ar' ? prevSlide : nextSlide}
          className="w-14 h-14 flex items-center justify-center bg-secondary/80 hover:bg-secondary text-white backdrop-blur-md rounded-full shadow-lg transition-all duration-300 border border-secondary"
          aria-label="Next slide"
        >
          {language === 'ar' ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>
      </div>

      {/* Sleek Progress Indicators */}
      <div className={`absolute bottom-32 flex gap-4 z-30 items-center ${language === 'ar' ? 'right-6 md:right-12 lg:right-20' : 'left-6 md:left-12 lg:left-20'}`}>
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className="group/dot relative flex items-center justify-center h-8"
            aria-label={`Go to slide ${idx + 1}`}
          >
            <span className={`h-1 transition-all duration-500 rounded-full ${
              idx === current ? "w-12 bg-secondary" : "w-6 bg-white/30 group-hover/dot:bg-white/60"
            }`} />
          </button>
        ))}
        <div className="text-white/50 text-xs font-bold tracking-widest mx-4" dir="ltr">
          0{current + 1} <span className="mx-1">/</span> 0{slides.length}
        </div>
      </div>
    </section>
  );
};
