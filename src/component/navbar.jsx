"use client";
import Link from "next/link";
import React, { useState } from "react";

const navItems = ["Home", "Work", "About", "Contact"];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 border-b border-slate-800/45 bg-slate-950/35 backdrop-blur-xl shadow-[0_8px_20px_rgba(2,6,23,0.22)] ${
        isOpen ? "h-screen md:h-auto" : "h-[74px]"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center py-5 px-4 sm:px-6 md:px-8">
        <div className="flex items-center gap-3 relative z-[110]">
          <div className="text-slate-100 text-2xl md:text-3xl font-black tracking-tighter italic cursor-pointer">
            PLABON<span className="text-blue-400">.</span>
          </div>
          <span className="hidden md:inline-flex text-[10px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full bg-yellow-300 text-slate-900">
            Available
          </span>
        </div>

        <ul className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-semibold text-slate-300">
          {navItems.map((item) => (
            <li key={item} className="relative group">
              <Link href={item === "Home" ? "/" : `/${item.toLowerCase()}`} className="hover:text-blue-400 transition-colors duration-300">
                {item}
              </Link>
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-blue-500 to-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}
        </ul>

        <button className="md:hidden text-blue-400 z-[110] cursor-pointer" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          <div className="w-7 h-5 flex flex-col justify-between items-end relative">
            <span className={`h-[2px] bg-blue-400 transition-all duration-300 ${isOpen ? "w-7 rotate-45 translate-y-[9px]" : "w-7"}`}></span>
            <span className={`h-[2px] bg-blue-400 transition-all duration-300 ${isOpen ? "opacity-0" : "w-5"}`}></span>
            <span className={`h-[2px] bg-blue-400 transition-all duration-300 ${isOpen ? "w-7 -rotate-45 -translate-y-[9px]" : "w-3"}`}></span>
          </div>
        </button>
      </div>

      <div
        className={`md:hidden px-4 sm:px-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none"
        }`}
      >
        <div
          className={`mt-2 rounded-2xl border border-slate-800/70 bg-slate-900/75 backdrop-blur-xl shadow-[0_20px_60px_rgba(2,6,23,0.4)] p-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isOpen ? "max-h-[75vh]" : "max-h-0 overflow-hidden p-0 border-transparent"
          }`}
        >
        <ul className="flex flex-col space-y-3 mt-2 text-center">
          {navItems.map((item, index) => (
            <li
              key={item}
              className={`transform transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}`}
              style={{ transitionDelay: `${index * 80}ms` }}
              onClick={() => setIsOpen(false)}
            >
              <Link
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="block rounded-xl border border-slate-700/80 bg-slate-800/45 px-4 py-3 text-xl sm:text-2xl font-bold text-slate-100 hover:text-blue-400 hover:border-blue-500/60 hover:bg-slate-800/70 transition-all duration-300 italic"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>

        <div className={`mt-10 text-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
          <p className="text-slate-400 text-xs uppercase tracking-widest mb-2">Get in touch</p>
          <a href="mailto:hello@plabon.com" className="text-slate-100 text-base sm:text-lg font-bold hover:text-blue-400 transition-colors break-all">
            hello@plabon.com
          </a>
        </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
