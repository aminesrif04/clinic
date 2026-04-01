"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import { Heart, Star, Send, MessageSquare, CheckCircle2, ThumbsUp } from "lucide-react";

export default function FeedbackPage() {
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Rating states
  const [ratings, setRatings] = useState({
    overall: 0,
    medical: 0,
    cleanliness: 0,
    reception: 0
  });

  const [hoveredRatings, setHoveredRatings] = useState({
    overall: 0,
    medical: 0,
    cleanliness: 0,
    reception: 0
  });

  // Content Dictionaries
  const content = {
    heroTitle: {
      fr: "Votre Avis Compte",
      ar: "رأيك يهمنا"
    },
    heroSubtitle: {
      fr: "Votre opinion est indispensable pour nous permettre d’améliorer au quotidien la qualité de nos soins et vos conditions de séjour.",
      ar: "إن رأيك ضروري لمساعدتنا في تحسين جودة رعايتنا وظروف إقامتك بشكل يومي."
    },
    criteria: {
      overall: { fr: "Expérience Globale", ar: "التجربة العامة" },
      medical: { fr: "Équipe Médicale & Soins", ar: "الفريق الطبي والرعاية" },
      cleanliness: { fr: "Propreté & Hygiène", ar: "النظافة والتعقيم" },
      reception: { fr: "Accueil & Administration", ar: "الاستقبال والإدارة" }
    },
    form: {
      name: { fr: "Votre Nom (Optionnel)", ar: "اسمك (اختياري)" },
      email: { fr: "Email ou Téléphone", ar: "البريد الإلكتروني أو الهاتف" },
      message: { fr: "Racontez-nous votre expérience en détail...", ar: "أخبرنا عن تجربتك بالتفصيل..." },
      submit: { fr: "Envoyer mon avis", ar: "إرسال تقييمي" },
      sending: { fr: "Envoi en cours...", ar: "جاري الإرسال..." },
      successTitle: { fr: "Merci infiniment !", ar: "شكرا جزيلا!" },
      successDesc: { fr: "Votre retour d'expérience a été transmis à notre direction.", ar: "تم نقل تقييمك إلى إدارتنا." }
    }
  };

  const handleRating = (criterion: keyof typeof ratings, value: number) => {
    setRatings(prev => ({ ...prev, [criterion]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  const renderStars = (criterion: keyof typeof ratings) => {
    return (
      <div className={`flex items-center gap-1 `}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="focus:outline-none transition-transform hover:scale-125"
            onMouseEnter={() => setHoveredRatings(prev => ({ ...prev, [criterion]: star }))}
            onMouseLeave={() => setHoveredRatings(prev => ({ ...prev, [criterion]: 0 }))}
            onClick={() => handleRating(criterion, star)}
          >
            <Star 
              size={28} 
              className={`transition-colors duration-200 ${(hoveredRatings[criterion] || ratings[criterion]) >= star ? 'fill-amber-400 text-amber-400' : 'fill-slate-100 text-slate-300'}`} 
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7fb]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full pt-32 pb-24 md:pt-40 md:pb-32 flex flex-col items-center justify-center bg-[#051c2e] overflow-hidden">
        {/* Animated Background Hearts & Stars */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }} 
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-1/4 -right-1/4 w-[70vw] h-[70vw] bg-secondary/20 blur-[130px] rounded-full mix-blend-screen" 
          />
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.15, 0.1] }} 
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-0 -left-1/4 w-[60vw] h-[60vw] bg-primary/30 blur-[150px] rounded-full mix-blend-screen" 
          />
        </div>

        <div className="relative z-10 w-full max-w-[1000px] px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="w-20 h-20 bg-gradient-to-br from-secondary to-teal-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(0,198,198,0.4)]"
          >
            <Heart size={36} className="text-white fill-white" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-black text-white drop-shadow-2xl tracking-tight mb-6"
          >
            {language === 'ar' ? content.heroTitle.ar : content.heroTitle.fr}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-[#9fc1d8] max-w-3xl mx-auto font-medium"
          >
            {language === 'ar' ? content.heroSubtitle.ar : content.heroSubtitle.fr}
          </motion.p>
        </div>

        {/* Diagonal Cut */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
            <svg className="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M1200 120H0V0l1200 120z" fill="#f4f7fb"></path>
            </svg>
        </div>
      </section>

      {/* Questionnaire Form */}
      <main className="relative z-30 w-full max-w-[800px] px-6 mx-auto -mt-16 mb-24">
        
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div 
              key="form"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_30px_60px_rgba(5,28,46,0.06)] border border-slate-100"
            >
              <form onSubmit={handleSubmit} className="space-y-10">
                
                {/* Visual Ratings Grid */}
                <div>
                  <h3 className={`text-xl font-bold text-[#051c2e] mb-6 flex items-center gap-3 justify-start`}>
                    <span className="w-8 h-1 bg-secondary rounded-full inline-block"></span>
                    {language === 'ar' ? 'تقييم جودة خدماتنا' : 'Évaluez la qualité de nos services'}
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                    {(Object.keys(content.criteria) as Array<keyof typeof ratings>).map((criterion, idx) => (
                      <div key={idx} className={`bg-slate-50 border border-slate-100 p-5 rounded-2xl flex flex-col gap-3 items-start text-left`}>
                        <span className="text-slate-700 font-bold">
                          {language === 'ar' ? content.criteria[criterion].ar : content.criteria[criterion].fr}
                        </span>
                        {renderStars(criterion)}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full h-px bg-slate-100"></div>

                {/* Text Comments */}
                <div>
                  <h3 className={`text-xl font-bold text-[#051c2e] mb-6 flex items-center gap-3 justify-start`}>
                    <span className="w-8 h-1 bg-secondary rounded-full inline-block"></span>
                    {language === 'ar' ? 'اترك انطباعك' : 'Laissez votre impression'}
                  </h3>

                  <div className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <input 
                        type="text" 
                        placeholder={language === 'ar' ? content.form.name.ar : content.form.name.fr} 
                        className={`w-full bg-slate-50 border border-slate-200 text-slate-700 px-5 py-4 rounded-2xl focus:outline-none focus:border-secondary focus:bg-white transition-all text-left`}
                      />
                      <input 
                        type="text" 
                        placeholder={language === 'ar' ? content.form.email.ar : content.form.email.fr} 
                        className={`w-full bg-slate-50 border border-slate-200 text-slate-700 px-5 py-4 rounded-2xl focus:outline-none focus:border-secondary focus:bg-white transition-all text-left`}
                      />
                    </div>
                    
                    <div className="relative">
                      <MessageSquare className={`absolute top-5 left-5 text-slate-400`} size={20} />
                      <textarea 
                        required
                        rows={5}
                        placeholder={language === 'ar' ? content.form.message.ar : content.form.message.fr} 
                        className={`w-full bg-slate-50 border border-slate-200 text-slate-700 py-4 rounded-2xl focus:outline-none focus:border-secondary focus:bg-white transition-all resize-none pl-14 pr-5 text-left`}
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-5 px-8 rounded-2xl bg-[#051c2e] hover:bg-secondary text-white font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_15px_30px_rgba(5,28,46,0.15)] hover:shadow-[0_20px_40px_rgba(0,198,198,0.25)] group `}
                >
                  {isSubmitting ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                      <ThumbsUp size={24} />
                    </motion.div>
                  ) : (
                    <Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  )}
                  <span>{isSubmitting ? (language === 'ar' ? content.form.sending.ar : content.form.sending.fr) : (language === 'ar' ? content.form.submit.ar : content.form.submit.fr)}</span>
                </button>
              </form>
            </motion.div>
          ) : (
            // Success State Component
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="bg-white rounded-[2.5rem] p-12 md:p-20 shadow-[0_30px_60px_rgba(5,28,46,0.06)] border border-slate-100 flex flex-col items-center justify-center text-center"
            >
              <div className="w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center mb-8">
                <CheckCircle2 size={50} className="text-teal-500" />
              </div>
              <h2 className="text-4xl font-black text-[#051c2e] mb-4">
                {language === 'ar' ? content.form.successTitle.ar : content.form.successTitle.fr}
              </h2>
              <p className="text-xl text-slate-500 font-medium">
                {language === 'ar' ? content.form.successDesc.ar : content.form.successDesc.fr}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
