"use client";

import React, { useMemo, useEffect, useState } from "react";
import { useLanguage } from "../../../context/LanguageContext";
import blogData from "../../../data/blog.json";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, Calendar, Clock, Share2, Bookmark, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function BlogPost() {
  const params = useParams();
  const id = params?.id as string;
  const { language } = useLanguage();

  const post = useMemo(() => blogData.find(b => b.id.toString() === id), [id]);
  const relatedPosts = useMemo(() => blogData.filter(b => b.id.toString() !== id).slice(0, 3), [id]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center bg-slate-50 text-slate-500 font-bold">
          Article Not Found.
        </div>
        <Footer />
      </div>
    );
  }

  const title = language === 'ar' ? post.title_ar : post.title_fr;
  const excerpt = language === 'ar' ? post.excerpt_ar : post.excerpt_fr;
  const category = language === 'ar' ? post.category_ar : post.category_fr;
  
  const content = language === 'ar' ? post.content_ar : post.content_fr;
  const quote = language === 'ar' ? post.quote_ar : post.quote_fr;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      {/* Cinematic Hero */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-end justify-center bg-[#051c2e] overflow-hidden pt-32 pb-16">
        {/* Main Hero Background */}
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
          style={{ backgroundImage: `url(${post.image})` }}
        />
        
        {/* Layered Cinematic Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#051c2e] via-[#051c2e]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#051c2e]/80 via-transparent to-[#051c2e]/80 opacity-50" />

        <div className="relative z-10 w-full max-w-[1000px] px-6 mx-auto">
          {/* Breadcrumb Layer */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`font-bold text-sm flex items-center gap-3 text-secondary-light mb-6 ${language === 'ar' ? 'flex-row-reverse justify-start' : 'justify-start'}`}
          >
            <Link href="/blog" className="hover:text-white transition-colors flex items-center gap-1">
              {language === 'ar' ? <ChevronRight size={16} /> : <ArrowLeft size={16} />}
              {language === 'ar' ? 'المدونة الطبية' : 'Le Blog Médical'}
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-secondary tracking-widest uppercase text-xs">{category}</span>
          </motion.div>

          {/* Title Matrix */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={language === 'ar' ? 'text-right' : 'text-left'}
          >
            <div className={`flex flex-wrap gap-4 mb-6 text-white/70 font-medium text-sm items-center ${language === 'ar' ? 'justify-end' : 'justify-start'}`}>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-secondary" />
                <span>{post.date}</span>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-secondary" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white drop-shadow-2xl tracking-tight leading-[1.15] mb-6">
              {title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area with Sidebar */}
      <main className="relative z-20 w-full max-w-[1200px] px-6 mx-auto -mt-10 mb-24 flex flex-col lg:flex-row gap-8 xl:gap-16">
        
        {/* Floating Social Action Bar (Desktop sticky, Mobile inline) */}
        <div className={`hidden lg:block w-16 shrink-0 relative ${language === 'ar' ? 'order-last' : 'order-first'}`}>
          <div className="sticky top-40 flex flex-col items-center gap-4">
            <div className="w-px h-16 bg-slate-200 mb-2"></div>
            
            <button className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-secondary hover:shadow-lg hover:-translate-y-1 transition-all group">
              <Share2 size={16} className="group-hover:scale-110 transition-transform" />
            </button>
            
            <button className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:shadow-lg hover:-translate-y-1 transition-all group">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="group-hover:scale-110 transition-transform"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </button>
            
            <button className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-sky-500 hover:shadow-lg hover:-translate-y-1 transition-all group">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </button>
            
            <button className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-800 hover:shadow-lg hover:-translate-y-1 transition-all group">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </button>

            <button className="w-10 h-10 rounded-full bg-[#051c2e] border border-[#051c2e] flex items-center justify-center text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all group mt-4">
              <Bookmark size={16} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        {/* Article Body */}
        <article className="w-full max-w-[800px] bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(5,28,46,0.06)] border border-slate-100">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-xl md:text-2xl text-[#051c2e] font-medium leading-relaxed mb-10 pb-10 border-b border-slate-100 ${language === 'ar' ? 'text-right' : 'text-left'}`}
          >
            {excerpt}
          </motion.div>

          {/* Premium Typography Body */}
          <div className={`prose prose-lg max-w-none text-slate-600 font-medium leading-[2.2] space-y-8 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className={`first-letter:text-6xl first-letter:font-black first-letter:text-secondary first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8] ${language === 'ar' ? 'first-letter:float-right first-letter:ml-3 first-letter:mr-0' : ''}`}
            >
              {content[0]}
            </motion.p>
            
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
               {content[1]}
            </motion.p>

            {/* Accent Blockquote */}
            {quote && (
              <motion.blockquote 
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 className={`my-12 p-8 md:p-10 bg-[#f8fafc] rounded-3xl border-l-[6px] border-secondary shadow-[inset_0_0_20px_rgba(0,198,198,0.05)] relative overflow-hidden ${language === 'ar' ? 'border-l-0 border-r-[6px]' : ''}`}
              >
                 <div className={`absolute top-0 opacity-[0.03] text-[150px] font-serif leading-none pointer-events-none ${language === 'ar' ? 'right-4' : 'left-4'}`}>&quot;</div>
                 <p className="text-xl md:text-2xl font-black text-[#051c2e] leading-relaxed italic relative z-10 m-0">
                   {quote}
                 </p>
              </motion.blockquote>
            )}

            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
               {content[2]}
            </motion.p>

          </div>
        </article>
      </main>

      {/* Suggested Articles Section */}
      <section className="bg-[#f4f7fb] py-20 px-6">
        <div className="max-w-[1300px] mx-auto">
          <div className={`flex flex-col md:flex-row justify-between items-center gap-6 mb-12 ${language === 'ar' ? 'md:flex-row-reverse' : ''}`}>
             <h2 className="text-3xl font-black text-[#051c2e] flex items-center gap-3">
               <span className="w-8 h-1 bg-secondary rounded-full inline-block"></span>
               {language === 'ar' ? 'مقالات ذات صلة' : 'Articles Similaires'}
             </h2>
             <Link href="/blog">
               <button className="text-secondary font-bold hover:text-[#051c2e] transition-colors flex items-center gap-2 group">
                 {language === 'ar' ? 'كل المقالات' : 'Tous les articles'} 
                 <ArrowRight size={16} className={language === 'ar' ? 'rotate-180 group-hover:-translate-x-1 transition-transform' : 'group-hover:translate-x-1 transition-transform'} />
               </button>
             </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {relatedPosts.map((rPost, idx) => (
                <Link href={`/blog/${rPost.id}`} key={rPost.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white rounded-[2rem] overflow-hidden shadow-[0_10px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_20px_40px_rgba(0,168,168,0.15)] hover:-translate-y-2 transition-all duration-300 group"
                  >
                   <div className="h-48 overflow-hidden relative">
                     <div 
                       className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                       style={{ backgroundImage: `url(${rPost.image})` }}
                     />
                     <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-[#051c2e] shadow-sm">
                       {language === 'ar' ? rPost.category_ar : rPost.category_fr}
                     </div>
                   </div>
                   <div className={`p-6 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                      <h3 className="text-lg font-black text-[#051c2e] leading-snug mb-3 group-hover:text-secondary transition-colors">
                        {language === 'ar' ? rPost.title_ar : rPost.title_fr}
                      </h3>
                      <div className={`flex items-center gap-2 text-slate-400 text-xs font-medium ${language === 'ar' ? 'justify-end' : 'justify-start'}`}>
                        <Calendar size={14} /> <span>{rPost.date}</span>
                        <span className="mx-1">•</span>
                        <Clock size={14} /> <span>{post.readTime}</span>
                      </div>
                   </div>
                  </motion.div>
                </Link>
             ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
