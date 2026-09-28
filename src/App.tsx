import React, { useState } from "react";
import {
  ScanEye,
  BookOpen,
  CloudSun,
  TrendingUp,
  Calculator,
  MessageSquareText,
  PhoneCall,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Language } from "./types";
import { TRANSLATIONS } from "./data/translations";
import { Navbar } from "./components/Navbar";
import { DiseaseIdentifier } from "./components/DiseaseIdentifier";
import { CropCareHub } from "./components/CropCareHub";
import { WeatherAdvisory } from "./components/WeatherAdvisory";
import { MandiPrices } from "./components/MandiPrices";
import { FarmingResources } from "./components/FarmingResources";
import { AgriChatModal } from "./components/AgriChatModal";
import { N8nChatView } from "./components/N8nChatView";
import { Workflow } from "lucide-react";

export default function App() {
  // Default to English as per request, with one-tap toggle to Telugu available
  const [lang, setLang] = useState<Language>("en");
  const [activeTab, setActiveTab] = useState<string>("disease");
  const [isAdvisorOpen, setIsAdvisorOpen] = useState<boolean>(false);

  const t = TRANSLATIONS[lang];

  return (
    <div className="min-h-screen bg-stone-100/70 text-stone-900 flex flex-col font-sans selection:bg-emerald-600 selection:text-white pb-16 lg:pb-0">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
      />

      {/* Hero Welcome Ribbon for fast farmer context */}
      <section className="bg-gradient-to-b from-emerald-900 to-emerald-950 text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8 border-b border-emerald-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Bilingual Agro-AI • Telugu (తెలుగు) & English</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-serif text-white">
              {t.hero.title}
            </h1>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              {t.hero.subtitle}
            </p>
          </div>

          {/* Quick CTA Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab("disease")}
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-amber-950 font-extrabold text-sm transition shadow-md shadow-amber-500/20 flex items-center gap-2 cursor-pointer"
            >
              <ScanEye className="w-4 h-4" />
              <span>{t.hero.diagnoseBtn}</span>
            </button>
            <button
              onClick={() => setActiveTab("chatbot")}
              className="px-5 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-sm transition border border-emerald-600 shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Workflow className="w-4 h-4 text-emerald-300" />
              <span>{lang === "te" ? "n8n చాట్‌బాట్" : "n8n AI Chatbot"}</span>
            </button>
            <button
              onClick={() => setActiveTab("cropCare")}
              className="px-5 py-3 rounded-xl bg-emerald-950/60 hover:bg-emerald-900 text-stone-200 hover:text-white font-bold text-sm transition border border-emerald-800 flex items-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>{t.hero.cropCareBtn}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeTab === "disease" && <DiseaseIdentifier lang={lang} />}
        {activeTab === "chatbot" && <N8nChatView lang={lang} />}
        {activeTab === "cropCare" && <CropCareHub lang={lang} />}
        {activeTab === "weather" && <WeatherAdvisory lang={lang} />}
        {activeTab === "mandi" && <MandiPrices lang={lang} />}
        {activeTab === "resources" && <FarmingResources lang={lang} />}
      </main>

      {/* Floating AI Agri-Advisor / n8n Chatbot Button */}
      <div className="fixed bottom-20 lg:bottom-6 right-6 z-40">
        <button
          onClick={() => setIsAdvisorOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-800 to-teal-800 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-xl shadow-emerald-950/30 transition-all transform hover:scale-105 cursor-pointer border border-emerald-600"
          title="Open n8n Chatbot"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-700 text-emerald-200 border border-emerald-500/50 flex items-center justify-center font-black">
            <Workflow className="w-4 h-4" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs leading-none font-extrabold">n8n Chatbot</span>
            <span className="text-[10px] text-emerald-300 leading-tight">Agri Assistant</span>
          </div>
        </button>
      </div>

      {/* Interactive AI Chat Modal */}
      <AgriChatModal
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        lang={lang}
      />

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 text-xs border-t border-stone-800 mt-12 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <div className="text-white font-extrabold text-lg font-serif">
              {t.appName}
            </div>
            <p className="text-stone-400 text-xs leading-relaxed">
              Empowering farmers across Telangana and Andhra Pradesh with AI disease diagnostics, scientific package of practices, and agro-weather advisories in English and Telugu.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Direct Helplines
            </h4>
            <ul className="space-y-2 text-stone-300">
              <li>Kisan Call Centre: 1800-180-1551 (Toll-Free)</li>
              <li>AP RSK Helpline: 155251</li>
              <li>PJTSAU Toll-Free: 1800-425-3502</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Key Agricultural Portals
            </h4>
            <ul className="space-y-2 text-stone-300">
              <li>
                <a href="https://pmkisan.gov.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition">
                  PM-KISAN Samman Nidhi
                </a>
              </li>
              <li>
                <a href="https://pmfby.gov.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition">
                  PM Fasal Bima (Crop Insurance)
                </a>
              </li>
              <li>
                <a href="https://agmarknet.gov.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition">
                  Agmarknet Daily Mandi Prices
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Agricultural Universities
            </h4>
            <p className="text-stone-400 text-xs leading-relaxed">
              Scientific practices aligned with Professor Jayashankar Telangana State Agricultural University (PJTSAU) and Acharya N.G. Ranga Agricultural University (ANGRAU).
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} RythuSeva Platform. Dedicated to India's farming community.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              Verified Agricultural Guidelines
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
