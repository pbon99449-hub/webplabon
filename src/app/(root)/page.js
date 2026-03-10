"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import vvimg from "../../../public/image/vv.png";
import ppimg from "../../../public/image/pp.png";
import HeroScene from "@/component/HeroScene";
import ScrollReveal from "@/component/ScrollReveal";
import TiltCard from "@/component/TiltCard";
import MagneticButton from "@/component/MagneticButton";

const metrics = [
  { label: "Projects Delivered", value: "24+" },
  { label: "Happy Clients", value: "12+" },
  { label: "Avg. Launch Time", value: "3.2 Weeks" },
];

const valuePoints = [
  { title: "Strategy-led design", desc: "Each screen is mapped to a clear conversion outcome before pixels are placed." },
  { title: "Performance first", desc: "I build with speed budgets, clean architecture, and lightweight interactions." },
  { title: "Premium micro-details", desc: "Spacing, type rhythm, motion timing, and states are tuned for quality feel." },
];

const processSteps = [
  { id: "01", title: "Discovery", desc: "Business goals, audience, and success metrics are aligned." },
  { id: "02", title: "Design Direction", desc: "Moodboard, typography, palette, and UI language are finalized." },
  { id: "03", title: "Build & Motion", desc: "Responsive front-end with modern animation and clean code quality." },
  { id: "04", title: "Launch & Iterate", desc: "Analytics check, polish pass, and rollout support after deployment." },
];

const partners = ["AURORA STUDIO", "NOVA FINTECH", "MOTION LAB", "LUXE HOMES", "VERTEX AGENCY"];

const Page = () => {
  return (
    <div className="bg-transparent text-slate-100 min-h-screen relative overflow-x-hidden">
      <div className="pointer-events-none absolute -top-28 -left-16 w-72 h-72 bg-blue-200/50 rounded-full blur-3xl"></div>
      <div className="pointer-events-none absolute top-[28%] -right-20 w-80 h-80 bg-yellow-200/60 rounded-full blur-3xl"></div>

      <ScrollReveal delay={0.1}>
        <motion.section 
          className="max-w-7xl mx-auto pt-24 md:pt-28 pb-10 md:pb-12 px-4 sm:px-6 md:px-8"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
            <div>
              <h2 className="text-blue-600 font-bold mb-4 tracking-[0.24em] sm:tracking-[0.4em] uppercase text-[11px] sm:text-sm">Available for Freelance</h2>

              <h1 className="luxury-title inline-block text-4xl sm:text-5xl md:text-7xl xl:text-8xl font-black leading-[1.02] italic tracking-tight pr-3 md:pr-6 pb-2">
                CRAFTING
                <br />
                <span className="inline-block pr-2 md:pr-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-slate-100 to-yellow-400">DIGITAL ART</span>
              </h1>

              <p className="mt-8 text-slate-300 max-w-xl text-lg leading-relaxed">
                I design immersive websites with performance-first code, bold visual direction, and modern interaction patterns tailored for premium brands.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a href="/contact" className="luxury-interactive w-full sm:w-auto rounded-[12px] text-center relative group overflow-hidden bg-yellow-400 text-slate-900 px-8 sm:px-10 py-4 font-black uppercase tracking-[0.2em] text-xs border border-yellow-400 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03]">
                  <span className="relative z-10 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-white">Start Project</span>
                  <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"></div>
                </a>
                <a href="/work" className="luxury-interactive w-full sm:w-auto text-center rounded-[12px] px-8 sm:px-10 py-4 font-black uppercase tracking-[0.2em] text-xs border border-slate-600 text-slate-200 hover:border-amber-300 hover:text-amber-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                  View Work
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.18em] font-bold text-slate-400">
                <span className="rounded-full border border-slate-700 bg-slate-900/65 px-4 py-2">Fast Delivery</span>
                <span className="rounded-full border border-slate-700 bg-slate-900/65 px-4 py-2">Mobile First</span>
                <span className="rounded-full border border-slate-700 bg-slate-900/65 px-4 py-2">SEO Ready</span>
              </div>
            </div>

            <div className="space-y-4">
              <HeroScene />
<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {metrics.map((item) => (
                  <TiltCard key={item.label} className="luxury-golden rounded-2xl p-5 cursor-pointer">
                    {item.value === "3.2 Weeks" ? (
                      <p className="font-black text-slate-100 leading-none whitespace-nowrap text-[1.3rem] sm:text-[1.45rem] md:text-[1.6rem]">
                        3.2 <span className="text-[0.72em] font-extrabold">Weeks</span>
                      </p>
                    ) : (
                      <p className="font-black text-slate-100 leading-none whitespace-nowrap text-[1.65rem] sm:text-[1.75rem] md:text-[1.9rem]">{item.value}</p>
                    )}
                    <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400 mt-1">{item.label}</p>
                  </TiltCard>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <motion.section 
          className="max-w-7xl mx-auto pb-10 md:pb-14 px-4 sm:px-6 md:px-8 reveal"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="luxury-panel rounded-2xl p-5 sm:p-7 overflow-hidden">
            <p className="text-[10px] uppercase tracking-[0.24em] text-slate-400 mb-4">Trusted by teams building ambitious products</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {partners.map((name) => (
                <div key={name} className="rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-center text-[11px] font-bold tracking-[0.12em] text-slate-300">
                  {name}
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      </ScrollReveal>

      <ScrollReveal delay={0.3}>
        <motion.section
          className="max-w-7xl mx-auto pb-8 md:pb-12 px-4 sm:px-6 md:px-8"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
        >
<div className="grid md:grid-cols-3 gap-4">
            {valuePoints.map((item) => (
              <TiltCard key={item.title} className="luxury-glow rounded-2xl p-6 cursor-pointer">
                <h3 className="text-lg font-black tracking-tight">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mt-3">{item.desc}</p>
              </TiltCard>
            ))}
          </div>
        </motion.section>
      </ScrollReveal>

      <ScrollReveal delay={0.4}>
        <motion.section 
          className="max-w-7xl mx-auto py-12 md:py-14 px-4 sm:px-6 md:px-8"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="flex justify-between items-end mb-12 border-b border-slate-700 pb-6">
            <div>
              <h3 className="luxury-title text-3xl sm:text-4xl md:text-5xl font-black uppercase italic tracking-tighter">
                Selected <span className="gold-shine">Work</span>
              </h3>
              <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-yellow-500 mt-4"></div>
            </div>
            <p className="text-slate-400 hidden md:block font-mono tracking-widest uppercase">02 / 2026</p>
          </div>

<div className="grid md:grid-cols-2 gap-10">
            {[{ image: vvimg, title: "Luxury Real Estate App", tag: "React / UI Design", desc: "Modern UI for high-end properties." }, { image: ppimg, title: "Fashion Brand Store", tag: "E-commerce Store", desc: "A premium product browsing experience." }].map((project) => (
              <TiltCard key={project.title} className="group cursor-pointer">
                <div className="rounded-2xl relative overflow-hidden aspect-video bg-slate-900/55 border border-slate-700 group-hover:border-blue-400 transition-all duration-500 shadow-sm luxury-image-zoom">
                  <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-blue-600/20 transition-all duration-500 z-10"></div>
                  <Image src={project.image} alt={project.title} className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute bottom-5 left-5 z-20 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <span className="bg-yellow-400 text-slate-900 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] rounded-md shadow-xl">{project.tag}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6">
                  <div>
                    <h4 className="text-2xl font-black uppercase tracking-tighter group-hover:text-blue-600 transition-colors duration-300">{project.title}</h4>
                    <p className="text-slate-400 text-sm mt-2 uppercase tracking-widest">{project.desc}</p>
                  </div>
                  <span className="text-blue-600 text-3xl group-hover:translate-x-3 transition-transform duration-300">{"->"}</span>
                </div>
              </TiltCard>
            ))}
          </div>
        </motion.section>
      </ScrollReveal>

      <ScrollReveal delay={0.5}>
        <motion.section 
          className="max-w-7xl mx-auto py-12 md:py-14 px-4 sm:px-6 md:px-8"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <p className="text-blue-500 font-bold tracking-[0.24em] uppercase text-[11px]">Process</p>
              <h3 className="luxury-title text-3xl sm:text-4xl md:text-5xl font-black uppercase italic tracking-tighter mt-2">
                How We Build <span className="text-yellow-400">Premium</span>
              </h3>
            </div>
            <p className="text-slate-400 text-sm max-w-md">From idea to launch, each phase is optimized for visual quality, clarity, and measurable results.</p>
          </div>

<div className="grid md:grid-cols-2 gap-4">
            {processSteps.map((step) => (
              <TiltCard key={step.id} className="luxury-pulse-ring rounded-2xl p-6 flex gap-5 cursor-pointer">
                <span className="text-2xl font-black text-blue-400">{step.id}</span>
                <div>
                  <h4 className="text-xl font-black uppercase tracking-tight">{step.title}</h4>
                  <p className="text-slate-400 text-sm mt-2 leading-relaxed">{step.desc}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </motion.section>
      </ScrollReveal>

      <ScrollReveal delay={0.6}>
        <motion.section 
          className="max-w-7xl mx-auto py-16 md:py-20 px-4 sm:px-6 md:px-8 text-center relative"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-blue-600 to-yellow-500 absolute top-0 left-0"></div>
          <h2 className="text-6xl md:text-[10rem] font-black uppercase tracking-[0.1em] text-slate-100/[0.05] absolute inset-x-0 top-1/2 -translate-y-1/2 italic">PLABON</h2>

          <div className="relative z-10">
            <p className="text-blue-600 font-black tracking-[0.35em] sm:tracking-[0.6em] uppercase mb-6 text-[11px] sm:text-xs">Start a conversation</p>
            <a href="mailto:pbon99449@gmail.com" className="text-xl sm:text-3xl md:text-6xl break-all font-black hover:text-blue-400 transition-colors duration-500 border-b-2 border-slate-600 hover:border-yellow-500 pb-4 italic tracking-tighter">
              pbon99449@gmail.com
            </a>
            <div className="mt-8">
              <a href="/contact" className="luxury-interactive inline-block rounded-[12px] px-8 py-4 font-black uppercase tracking-[0.2em] text-xs border border-amber-300/60 text-amber-100 hover:bg-amber-300 hover:text-slate-950 transition-all duration-300">
                Book Free Consultation
              </a>
            </div>
          </div>
        </motion.section>
      </ScrollReveal>
    </div>
  );
};

export default Page;

