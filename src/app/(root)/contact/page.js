"use client";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

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

  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
    });
  }, []);

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
        <div className="mb-12 md:mb-14" data-aos="fade-up">
          <h2 className="text-blue-400 font-bold tracking-[0.24em] sm:tracking-[0.4em] uppercase text-[11px] sm:text-sm mb-4 italic">03. Get In Touch</h2>
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-black uppercase tracking-tighter italic leading-[0.95]">
            LET US <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-slate-100 to-yellow-400">TALK.</span>
          </h1>
          <div className="h-[3px] w-44 bg-gradient-to-r from-blue-400 to-yellow-400 mt-6 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-start">
          <div className="space-y-8" data-aos="fade-right">
            <p className="text-slate-300 text-lg leading-relaxed max-w-xl">
              Share your idea, timeline, and project goals. I design and build fast, clean, modern digital experiences with strong visual identity.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-slate-700 bg-slate-900/65 backdrop-blur-sm shadow-sm p-6 flex flex-col">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-blue-400/40 bg-blue-500/15 text-blue-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v12H4z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4 8 8 6 8-6" />
                  </svg>
                </div>
                <a href="mailto:pbon99449@gmail.com" className="font-bold text-slate-100 hover:text-blue-400 break-all transition-colors">
                  pbon99449@gmail.com
                </a>
              </div>

              <div className="rounded-2xl border border-slate-700 bg-slate-900/65 backdrop-blur-sm shadow-sm p-6 flex flex-col">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-blue-400/40 bg-blue-500/15 text-blue-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10Z" />
                    <circle cx="12" cy="11" r="2.2" />
                  </svg>
                </div>
                <p className="font-bold text-slate-200">Barishal, Bangladesh</p>
              </div>

              <div className="sm:col-span-2 rounded-2xl border border-slate-700 bg-slate-900/65 backdrop-blur-sm shadow-sm p-6 flex flex-col">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-blue-400/40 bg-blue-500/15 text-blue-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.9v2a2 2 0 0 1-2.2 2 19.7 19.7 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6 19.7 19.7 0 0 1-3.1-8.7A2 2 0 0 1 4 1h2a2 2 0 0 1 2 1.7c.1.8.3 1.6.6 2.4a2 2 0 0 1-.5 2.1L7 8.3a16 16 0 0 0 6.7 6.7l1.1-1.1a2 2 0 0 1 2.1-.5c.8.3 1.6.5 2.4.6A2 2 0 0 1 22 16.9Z" />
                  </svg>
                </div>
                <a href="tel:+8801679796976" className="font-bold text-slate-100 hover:text-blue-400 transition-colors">
                  01679796976
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-gradient-to-r from-blue-500 to-slate-800 text-white p-6 shadow-md">
              <p className="text-[11px] uppercase tracking-[0.2em] text-blue-100 mb-2">Response Time</p>
              <p className="text-2xl font-black">Within 24 Hours</p>
            </div>
          </div>

          <div className="rounded-2xl p-[1px] bg-gradient-to-br from-blue-500 via-slate-300 to-yellow-400" data-aos="zoom-in-left">
            <div className="bg-slate-900/75 rounded-2xl p-5 sm:p-6 md:p-10 border border-slate-700">
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="group">
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-2 group-focus-within:text-blue-400 transition-colors">
                    Your Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full rounded-[10px] bg-slate-950 border border-slate-700 text-slate-100 px-4 py-3 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-900/40 transition-all placeholder:text-slate-500"
                  />
                </div>

                <div className="group">
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-2 group-focus-within:text-blue-400 transition-colors">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full rounded-[10px] bg-slate-950 border border-slate-700 text-slate-100 px-4 py-3 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-900/40 transition-all placeholder:text-slate-500"
                  />
                </div>

                <div className="group">
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-2 group-focus-within:text-blue-400 transition-colors">
                    Phone Number
                  </label>
                  <input
                    required
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]{8,15}"
                    placeholder="+8801XXXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => {
                      const digitsOnly = e.target.value.replace(/\D/g, "");
                      setFormData((prev) => ({ ...prev, phone: digitsOnly }));
                    }}
                    className="w-full rounded-[10px] bg-slate-950 border border-slate-700 text-slate-100 px-4 py-3 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-900/40 transition-all placeholder:text-slate-500"
                  />
                </div>

                <div className="group">
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-2 group-focus-within:text-blue-400 transition-colors">
                    Message
                  </label>
                  <textarea
                    required
                    rows="5"
                    placeholder="Tell me about your project"
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                    className="w-full rounded-[10px] bg-slate-950 border border-slate-700 text-slate-100 px-4 py-3 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-900/40 transition-all placeholder:text-slate-500 resize-none"
                  ></textarea>
                </div>

                {submitError && <p className="text-red-600 text-sm font-semibold">{submitError}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-[10px] w-full bg-yellow-400 hover:bg-blue-600 hover:text-white disabled:bg-slate-300 disabled:text-slate-600 disabled:cursor-not-allowed text-slate-900 font-black uppercase tracking-[0.2em] py-4 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] mt-2 group flex items-center justify-center gap-2"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <span className="group-hover:translate-x-2 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">→</span>
                </button>
              </form>
            </div>
          </div>
        </div>
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
            <button onClick={() => setShowPopup(false)} className="w-full rounded-[10px] bg-slate-100 text-slate-900 font-bold py-3 uppercase tracking-widest hover:bg-yellow-400 hover:text-slate-900 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
