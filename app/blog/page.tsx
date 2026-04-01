"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import blogData from "../../data/blog.json";
import Link from "next/link";
import { Calendar, ArrowUpRight, ArrowLeft, ArrowRight, Clock, Search, BookOpen } from "lucide-react";

export default function BlogPage() {
  const { language } = useLanguage();

  const featuredPost = blogData.find(post => post.featured) || blogData[0];
  const regularPosts = blogData.filter(post => post.id !== featuredPost.id);

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7fb]">
      <Navbar />

      {/* Cinematic Hero header */}
      <section className="relative w-full pt-32 pb-24 md:pt-40 md:pb-32 flex flex-col items-center justify-center bg-[#051c2e] overflow-hidden">
        {/* Animated Background Mesh */}
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

        <div className="relative z-10 w-full max-w-[1200px] px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="w-20 h-20 bg-white/5 backdrop-blur-xl rounded-[1.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-secondary/20 border border-white/10"
          >
            <BookOpen size={36} className="text-secondary" strokeWidth={1.5} />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-black text-white drop-shadow-2xl tracking-tight mb-6"
          >
            {language === 'ar' ? 'المجلة الطبية' : 'Le Journal Médical'}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-[#9fc1d8] max-w-2xl mx-auto font-medium"
          >
            {language === 'ar' ? 'اكتشف أحدث المقالات، الاكتشافات والأخبار الصحية من مصحة تافيلالت الخاصة بنا.' : 'Découvrez les dernières actualités, innovations et conseils de prévention de notre clinique.'}
          </motion.p>
        </div>

        {/* Diagonal Cut */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
            <svg className="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M1200 120H0V0l1200 120z" fill="#f4f7fb"></path>
            </svg>
        </div>
      </section>

      <main className="relative z-30 w-full max-w-[1300px] px-6 mx-auto -mt-16 mb-24">
        
        {/* Featured Post (A la Une) */}
        <Link href={`/blog/${featuredPost.id}`} className="block w-full">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full relative rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_rgba(5,28,46,0.15)] group hover:shadow-[0_40px_70px_rgba(0,198,198,0.2)] transition-shadow duration-500 cursor-pointer h-[500px]"
          >
          {/* Zooming background image on hover */}
          <div className="absolute inset-0 overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ backgroundImage: `url(${featuredPost.image})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#051c2e] via-[#051c2e]/70 to-transparent"></div>
          </div>

          <div className={`absolute inset-0 p-8 md:p-14 flex flex-col justify-end items-start text-left`}>
            <span className="bg-secondary text-white font-bold px-4 py-1.5 rounded-full text-xs md:text-sm uppercase tracking-wider mb-4 drop-shadow-md">
              {language === 'ar' ? featuredPost.category_ar : featuredPost.category_fr}
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4 drop-shadow-xl w-full lg:w-3/4">
              {language === 'ar' ? featuredPost.title_ar : featuredPost.title_fr}
            </h2>
            <p className="text-[#9fc1d8] text-base md:text-lg mb-6 w-full lg:w-2/3 line-clamp-2 md:line-clamp-3">
              {language === 'ar' ? featuredPost.excerpt_ar : featuredPost.excerpt_fr}
            </p>
            
            <div className={`flex items-center gap-6 w-full `}>
              <div className={`flex items-center gap-2 text-slate-300 text-sm font-medium `}>
                <Calendar size={16} />
                <span>{featuredPost.date}</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-500"></div>
              <div className={`flex items-center gap-2 text-slate-300 text-sm font-medium `}>
                <Clock size={16} />
                <span>{featuredPost.readTime}</span>
              </div>

              <div className={`w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white backdrop-blur-md group-hover:bg-secondary group-hover:border-secondary transition-all duration-300 ml-auto ml-auto mt-auto`}>
                <ArrowUpRight size={24} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </div>
          </motion.div>
        </Link>

        {/* Regular Posts Grid */}
        <div className="mt-16 md:mt-24">
          <div className={`flex flex-col sm:flex-row items-center justify-between mb-10 gap-4 `}>
            <h3 className={`text-3xl font-black text-[#051c2e] flex items-center gap-3 `}>
               <span className="w-10 h-1 bg-secondary rounded-full inline-block"></span>
              {language === 'ar' ? 'أحدث المقالات المضافة' : 'Dernières parutions'}
            </h3>
            
            {/* Search Mockup */}
            <div className={`relative w-full sm:w-auto flex items-center `}>
              <input 
                type="text" 
                placeholder={language === 'ar' ? 'البحث عن مقال...' : 'Rechercher un article...'} 
                className={`w-full sm:w-64 bg-white border border-slate-200 rounded-full py-3 px-5 text-sm focus:outline-none focus:border-secondary shadow-sm pl-12 text-left`}
              />
              <Search className={`absolute text-slate-400 left-5`} size={18} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, idx) => (
              <Link href={`/blog/${post.id}`} key={post.id} className="block group">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-[2rem] overflow-hidden shadow-[0_15px_40px_rgba(5,28,46,0.04)] border border-slate-100 hover:shadow-[0_20px_50px_rgba(0,198,198,0.1)] transition-all duration-300 hover:-translate-y-2 flex flex-col cursor-pointer h-full"
                >
                {/* Thumbnail */}
                <div className="w-full h-56 relative overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                    style={{ backgroundImage: `url(${post.image})` }}
                  ></div>
                  <div className={`absolute top-4 left-4`}>
                    <span className="bg-white/90 backdrop-blur-sm text-[#051c2e] font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wide">
                      {language === 'ar' ? post.category_ar : post.category_fr}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col">
                  <h4 className={`text-xl font-black text-[#051c2e] leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2 text-left`}>
                    {language === 'ar' ? post.title_ar : post.title_fr}
                  </h4>
                  
                  <p className={`text-slate-500 font-medium text-sm leading-relaxed mb-6 line-clamp-3 w-full flex-1 text-left`}>
                    {language === 'ar' ? post.excerpt_ar : post.excerpt_fr}
                  </p>
                  
                  <div className={`flex items-center justify-between mt-auto pt-6 border-t border-slate-100 `}>
                    <div className={`flex items-center gap-1.5 text-slate-400 text-xs font-bold uppercase tracking-wider `}>
                      <Calendar size={14} />
                      {post.date}
                    </div>
                    
                    <div className={`w-8 h-8 rounded-full bg-slate-50 text-[#051c2e] group-hover:bg-secondary group-hover:text-white flex items-center justify-center transition-all duration-300 `}>
                       <ArrowRight size={16} className={`group-hover:translate-x-1 transition-transform `} />
                    </div>
                  </div>
                </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
