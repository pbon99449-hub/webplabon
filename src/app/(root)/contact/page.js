"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "@/component/ScrollReveal";
import TiltCard from "@/component/TiltCard";

const packages = [
  {
    name: "Landing Page",
    time: "3-5 Days",
    details: "High-converting, mobile-first premium landing page.",
  },
  {
    name: "Business Website",
    time: "1-2 Weeks",
    details: "Multi-page website with polished branding and interactions.",
  },
  {
    name: "Product UI",
    time: "2-4 Weeks",
    details: "Modern app dashboard and full UI system implementation.",
  },
];

const faqs = [
  {
    q: "How fast can you start?",
    a: "Usually within 24-48 hours after scope confirmation.",
  },
  {
    q: "Do you support revisions?",
    a: "Yes, every project includes structured revision rounds.",
  },
  {
    q: "Can you work with existing design?",
    a: "Yes, I can improve and scale your current design system.",
  },
];

const Contact = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        let errorMessage = `Request failed (${response.status})`;
        try {
          const data = await response.json();
          if (typeof data?.detail === "string" && data.detail.trim()) {
            errorMessage = data.detail;
          } else if (Array.isArray(data?.detail) && data.detail.length > 0) {
            const firstIssue = data.detail[0];
            if (firstIssue?.msg) {
              errorMessage = firstIssue.msg;
            }
          } else if (typeof data?.error === "string" && data.error.trim()) {
            errorMessage = data.error;
          }
        } catch {
          // Response was not JSON; keep the HTTP status-based fallback message.
        }
        throw new Error(errorMessage);
      }

      setShowPopup(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setShowPopup(false), 5000);
    } catch (error) {
      const isNetworkError = error instanceof TypeError;
      const fallback = "Cannot send message right now. Please try again.";
      setSubmitError(isNetworkError ? fallback : error.message || "Message send failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-transparent min-h-screen text-slate-100 pt-28 pb-14 px-4 sm:px-6 md:px-20 overflow-x-hidden relative">
      <div className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 bg-blue-200/50 rounded-full blur-3xl"></div>
      <div className="pointer-events-none absolute top-1/3 -right-24 w-80 h-80 bg-yellow-200/60 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <ScrollReveal delay={0.1}>
          <motion.div 
            className="mb-12 md:mb-14"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-blue-400 font-bold tracking-[0.24em] sm:tracking-[0.4em] uppercase text-[11px] sm:text-sm mb-4 italic">03. Get In Touch</h2>
            <h1 className="luxury-title text-4xl sm:text-5xl md:text-8xl font-black uppercase tracking-tighter italic leading-[0.95]">
              LET US <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-slate-100 to-yellow-400">TALK.</span>
            </h1>
            <div className="h-[3px] w-44 bg-gradient-to-r from-blue-400 to-yellow-400 mt-6 rounded-full"></div>
          </motion.div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-start">
          <ScrollReveal delay={0.2}>
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <p className="text-slate-300 text-lg leading-relaxed max-w-xl">
                Share your idea, timeline, and project goals. I design and build fast, clean, modern digital experiences with strong visual identity.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="luxury-surface rounded-2xl p-6 flex flex-col">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-blue-400/40 bg-blue-500/15 text-blue-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v12H4z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4 8 8 6 8-6" />
                    </svg>
                  </div>
                  <a href="mailto:pbon99449@gmail.com" className="font-bold text-slate-100 hover:text-amber-100 break-all transition-colors">
                    pbon99449@gmail.com
                  </a>
                </div>

                <div className="luxury-surface rounded-2xl p-6 flex flex-col">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-blue-400/40 bg-blue-500/15 text-blue-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10Z" />
                      <circle cx="12" cy="11" r="2.2" />
                    </svg>
                  </div>
                  <p className="font-bold text-slate-200">Barishal, Bangladesh</p>
                </div>

                <div className="sm:col-span-2 luxury-surface rounded-2xl p-6 flex flex-col">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-blue-400/40 bg-blue-500/15 text-blue-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.9v2a2 2 0 0 1-2.2 2 19.7 19.7 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6 19.7 19.7 0 0 1-3.1-8.7A2 2 0 0 1 4 1h2a2 2 0 0 1 2 1.7c.1.8.3 1.6.6 2.4a2 2 0 0 1-.5 2.1L7 8.3a16 16 0 0 0 6.7 6.7l1.1-1.1a2 2 0 0 1 2.1-.5c.8.3 1.6.5 2.4.6A2 2 0 0 1 22 16.9Z" />
                    </svg>
                  </div>
                  <a href="tel:+8801679796976" className="font-bold text-slate-100 hover:text-amber-100 transition-colors">
                    01679796976
                  </a>
                </div>
              </div>

              <div className="luxury-panel rounded-2xl text-white p-6 shadow-md">
                <p className="text-[11px] uppercase tracking-[0.2em] text-blue-100 mb-2">Response Time</p>
                <p className="text-2xl font-black">Within 24 Hours</p>
              </div>

              <ScrollReveal delay={0.3}>
                <motion.div 
                  className="grid sm:grid-cols-3 gap-3"
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                {packages.map((item) => (
                    <TiltCard key={item.name} className="luxury-glow rounded-2xl p-4 cursor-pointer">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-blue-400">{item.time}</p>
                      <p className="mt-2 text-sm font-black uppercase tracking-tight">{item.name}</p>
                      <p className="mt-2 text-xs text-slate-400 leading-relaxed">{item.details}</p>
                    </TiltCard>
                  ))}
                </motion.div>
              </ScrollReveal>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <motion.div 
              className="rounded-2xl p-[1px] bg-gradient-to-br from-blue-500 via-slate-300 to-yellow-400"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="bg-slate-900/75 rounded-2xl p-5 sm:p-6 md:p-10 border border-slate-700">
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="relative">
                    <input
                      required
                      type="text"
                      placeholder=" "
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      className="peer w-full rounded-[10px] bg-slate-950 border border-sky-300/50 text-slate-100 px-4 pt-5 pb-3 focus:outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-400/30 transition-all"
                    />
                    <label className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 bg-transparent px-0 py-0 rounded-none text-[10px] uppercase tracking-[0.2em] text-slate-400 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-sky-100 peer-focus:scale-95 peer-focus:bg-blue-500 peer-focus:px-2 peer-focus:py-[3px] peer-focus:rounded-md peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0 peer-placeholder-shown:py-0 peer-placeholder-shown:rounded-none peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:scale-95 peer-[:not(:placeholder-shown)]:text-sky-100 peer-[:not(:placeholder-shown)]:bg-blue-500 peer-[:not(:placeholder-shown)]:px-2 peer-[:not(:placeholder-shown)]:py-[3px] peer-[:not(:placeholder-shown)]:rounded-md origin-left">
                      Your Name
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      required
                      type="email"
                      placeholder=" "
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className="peer w-full rounded-[10px] bg-slate-950 border border-sky-300/50 text-slate-100 px-4 pt-5 pb-3 focus:outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-400/30 transition-all"
                    />
                    <label className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 bg-transparent px-0 py-0 rounded-none text-[10px] uppercase tracking-[0.2em] text-slate-400 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-sky-100 peer-focus:scale-95 peer-focus:bg-blue-500 peer-focus:px-2 peer-focus:py-[3px] peer-focus:rounded-md peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0 peer-placeholder-shown:py-0 peer-placeholder-shown:rounded-none peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:scale-95 peer-[:not(:placeholder-shown)]:text-sky-100 peer-[:not(:placeholder-shown)]:bg-blue-500 peer-[:not(:placeholder-shown)]:px-2 peer-[:not(:placeholder-shown)]:py-[3px] peer-[:not(:placeholder-shown)]:rounded-md origin-left">
                      Email Address
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      required
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]{8,15}"
                      placeholder=" "
                      value={formData.phone}
                      onChange={(e) => {
                        const digitsOnly = e.target.value.replace(/\D/g, "");
                        setFormData((prev) => ({ ...prev, phone: digitsOnly }));
                      }}
                      className="peer w-full rounded-[10px] bg-slate-950 border border-sky-300/50 text-slate-100 px-4 pt-5 pb-3 focus:outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-400/30 transition-all"
                    />
                    <label className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 bg-transparent px-0 py-0 rounded-none text-[10px] uppercase tracking-[0.2em] text-slate-400 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-sky-100 peer-focus:scale-95 peer-focus:bg-blue-500 peer-focus:px-2 peer-focus:py-[3px] peer-focus:rounded-md peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0 peer-placeholder-shown:py-0 peer-placeholder-shown:rounded-none peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:scale-95 peer-[:not(:placeholder-shown)]:text-sky-100 peer-[:not(:placeholder-shown)]:bg-blue-500 peer-[:not(:placeholder-shown)]:px-2 peer-[:not(:placeholder-shown)]:py-[3px] peer-[:not(:placeholder-shown)]:rounded-md origin-left">
                      Phone Number
                    </label>
                  </div>

                  <div className="relative">
                    <textarea
                      required
                      rows="5"
                      placeholder=" "
                      value={formData.message}
                      onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                      className="peer w-full rounded-[10px] bg-slate-950 border border-sky-300/50 text-slate-100 px-4 pt-6 pb-3 focus:outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-400/30 transition-all resize-none"
                    ></textarea>
                    <label className="pointer-events-none absolute left-3 top-5 -translate-y-1/2 bg-transparent px-0 py-0 rounded-none text-[10px] uppercase tracking-[0.2em] text-slate-400 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-sky-100 peer-focus:scale-95 peer-focus:bg-blue-500 peer-focus:px-2 peer-focus:py-[3px] peer-focus:rounded-md peer-placeholder-shown:top-5 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0 peer-placeholder-shown:py-0 peer-placeholder-shown:rounded-none peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:scale-95 peer-[:not(:placeholder-shown)]:text-sky-100 peer-[:not(:placeholder-shown)]:bg-blue-500 peer-[:not(:placeholder-shown)]:px-2 peer-[:not(:placeholder-shown)]:py-[3px] peer-[:not(:placeholder-shown)]:rounded-md origin-left">
                      Message
                    </label>
                  </div>

                  {submitError && <p className="text-red-600 text-sm font-semibold">{submitError}</p>}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="luxury-interactive rounded-[10px] w-full bg-yellow-400 hover:bg-amber-300 hover:text-slate-950 disabled:bg-slate-300 disabled:text-slate-600 disabled:cursor-not-allowed text-slate-900 font-black uppercase tracking-[0.2em] py-4 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] mt-2 group flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <span className="group-hover:translate-x-2 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">{"->"}</span>
                  </button>
                </form>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.4}>
          <motion.div 
            className="mt-12 grid md:grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {faqs.map((item) => (
              <div key={item.q} className="luxury-surface rounded-2xl p-6">
                <h3 className="text-sm font-black uppercase tracking-[0.12em] text-slate-100">{item.q}</h3>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </motion.div>
        </ScrollReveal>
      </div>

      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-slate-900/45 backdrop-blur-sm" onClick={() => setShowPopup(false)}></div>

          <div className="bg-slate-900 border border-blue-900/60 rounded-2xl p-6 sm:p-8 md:p-10 max-w-sm w-full relative z-10 text-center shadow-[0_16px_60px_rgba(37,99,235,0.2)]" data-aos="zoom-in" data-aos-duration="250">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_24px_rgba(37,99,235,0.5)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-black uppercase italic mb-2 text-slate-100">Success</h3>
            <p className="text-slate-300 mb-7">Your message has been sent successfully. I will get back to you soon.</p>
            <button onClick={() => setShowPopup(false)} className="luxury-interactive w-full rounded-[10px] bg-slate-100 text-slate-900 font-bold py-3 uppercase tracking-widest hover:bg-amber-300 hover:text-slate-900 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;

