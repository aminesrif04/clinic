"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import faqData from "../../data/faq.json";
import { MessageCircleQuestion, Plus, Minus, PhoneCall } from "lucide-react";

export default function FAQPage() {
  const { language, t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7fb]">
      <Navbar />

      {/* Cinematic Hero Section */}
      <section className="relative w-full py-24 md:py-32 flex flex-col items-center justify-center bg-[#051c2e] overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[120%] bg-secondary/10 blur-[150px] rounded-full mix-blend-screen" />
          <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[100%] bg-primary/20 blur-[150px] rounded-full mix-blend-screen" />
        </div>
        
        {/* Abstract Floating Shapes (Framer Motion) */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-[15%] opacity-20 text-white"
        >
          <MessageCircleQuestion size={120} strokeWidth={0.5} />
        </motion.div>

        <div className="relative z-10 w-full max-w-[1200px] px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="w-20 h-20 bg-secondary/20 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(0,198,198,0.3)] border border-secondary/30"
          >
            <MessageCircleQuestion size={36} className="text-secondary" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white drop-shadow-2xl tracking-tight mb-6"
          >
            {language === 'ar' ? 'الأسئلة الشائعة' : 'Questions Fréquentes'}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-[#9fc1d8] max-w-2xl mx-auto font-medium leading-relaxed"
          >
            {language === 'ar' 
              ? 'تجدون هنا الإجابات على أسئلتكم الأكثر شيوعاً حول الإجراءات، المواعيد، وخدمات مصحتنا.' 
              : 'Retrouvez ici les réponses à vos questions les plus courantes sur les procédures, les rendez-vous et nos services.'}
          </motion.p>
        </div>
      </section>

      {/* FAQ Accordion Content */}
      <main className="relative z-20 w-full max-w-[900px] px-6 md:px-12 mx-auto -mt-12 mb-24">
        
        {/* The Card Container */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white rounded-[2rem] p-6 md:p-12 shadow-[0_30px_60px_rgba(5,28,46,0.06)] border border-slate-100"
        >
          <div className="space-y-4">
            {faqData.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={faq.id} 
                  className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-primary/30 shadow-lg shadow-primary/5 bg-slate-50/50' : 'border-slate-100 hover:border-slate-300 bg-white'}`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className={`w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none transition-colors duration-300 `}
                  >
                    <h3 className={`text-lg md:text-xl font-bold pr-4 transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-slate-700'}`}>
                      {language === 'ar' ? faq.q_ar : faq.q_fr}
                    </h3>
                    <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-primary text-white rotate-180' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
                      {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                      >
                        <div className={`px-6 md:px-8 pb-8 text-slate-600 font-medium leading-relaxed border-t border-slate-100/50 pt-4 text-left`}>
                          {language === 'ar' ? faq.a_ar : faq.a_fr}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Quick Contact Footer inside the card */}
          <div className={`mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-6 `}>
            <div className={`flex items-center gap-4 `}>
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                <PhoneCall size={24} />
              </div>
              <div className={language === 'ar' ? 'text-right' : 'text-left'}>
                <p className="text-slate-500 font-medium">{language === 'ar' ? 'هل لديك سؤال آخر؟ اتصل بنا' : 'Une autre question ? Appelez-nous'}</p>
                <p className="text-[#051c2e] font-black text-xl">05 35 52 55 25</p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
