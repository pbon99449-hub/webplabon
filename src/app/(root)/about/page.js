"use client";
import React, { useEffect } from "react";
import plabonimage from "../../../../public/image/plabon.png";
import Image from "next/image";

const skills = ["React.js", "JavaScript", "Tailwind CSS", "Next.js", "HTML5", "CSS3", "Framer Motion", "Figma"];

const About = () => {
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.2 }
    );

    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-transparent min-h-screen text-slate-100 pt-28 pb-14 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 reveal">
          <h2 className="text-blue-600 font-bold tracking-[0.24em] sm:tracking-[0.4em] uppercase text-[11px] sm:text-sm mb-4 italic">01. Who I Am</h2>
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-black uppercase tracking-tighter italic leading-[0.95]">
            ABOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-yellow-500">PLABON.</span>
          </h1>
          <div className="h-[3px] w-44 bg-gradient-to-r from-blue-600 to-yellow-500 mt-6 rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
          <div className="relative group reveal">
            <div className="absolute -inset-3 rounded-2xl border-2 border-blue-900/60 group-hover:border-blue-500 transition-colors duration-500"></div>
            <div className="relative rounded-2xl bg-slate-900/65 aspect-[4/5] overflow-hidden border border-slate-700">
              <Image src={plabonimage} alt="Plabon" className="object-cover w-full h-full" />
            </div>

            <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-slate-900 rounded-xl px-5 py-4 hidden md:block shadow-lg">
              <span className="text-3xl font-black block">02+</span>
              <span className="text-[10px] uppercase tracking-widest font-bold">Years of Experience</span>
            </div>
          </div>

          <div className="space-y-8 reveal">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black italic uppercase leading-snug">
              I build <span className="text-blue-600">high-performance interfaces</span> with bold visual direction and product-focused execution.
            </h3>

            <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
              Every project I ship is built around clarity, speed, and conversion goals. I blend UI strategy, strong front-end architecture, and polished motion to create digital products that feel premium.
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-slate-700 p-5 bg-slate-900/65 backdrop-blur-sm">
                <p className="text-2xl font-black">40+</p>
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400 mt-1">Delivered Screens</p>
              </div>
              <div className="rounded-2xl border border-slate-700 p-5 bg-slate-900/65 backdrop-blur-sm">
                <p className="text-2xl font-black">25+</p>
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400 mt-1">Happy Clients</p>
              </div>
              <div className="rounded-2xl border border-slate-700 p-5 bg-slate-900/65 backdrop-blur-sm">
                <p className="text-2xl font-black">99%</p>
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400 mt-1">On-time Delivery</p>
              </div>
            </div>

            <div className="pt-4">
              <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 mb-5 italic">My Expertise</h4>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <span key={skill} className="rounded-[10px] px-5 py-2 border border-slate-700 hover:border-blue-500 hover:text-blue-400 transition-all duration-300 text-xs font-bold uppercase tracking-widest bg-slate-900/70 text-slate-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 p-6 sm:p-8 md:p-12 border border-slate-700 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-800 relative overflow-hidden reveal">
          <div className="absolute -top-10 -right-10 w-36 h-36 bg-blue-200/60 rounded-full blur-3xl"></div>
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h4 className="text-blue-600 text-4xl sm:text-5xl md:text-6xl font-black opacity-10 absolute -top-8 left-0 w-full select-none">VISION</h4>
            <p className="text-lg sm:text-xl md:text-2xl italic font-medium leading-relaxed">
              Design is not just about what people see. It is about what they feel and how effectively they move through your product.
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .reveal {
          opacity: 0;
          transform: translateY(80px);
          transition: all 0.9s ease;
        }
        .reveal.active {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default About;
