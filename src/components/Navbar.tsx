import React from "react";
import {
  Sprout,
  ScanEye,
  BookOpen,
  CloudSun,
  TrendingUp,
  Calculator,
  MessageSquareText,
  PhoneCall,
  Languages,
} from "lucide-react";
import { Language } from "../types";
import { TRANSLATIONS } from "../data/translations";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  onOpenAdvisor: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  lang,
  setLang,
  onOpenAdvisor,
}) => {
  const t = TRANSLATIONS[lang];

  const navItems = [
    { id: "disease", label: t.nav.diseaseId, icon: ScanEye },
    { id: "cropCare", label: t.nav.cropCare, icon: BookOpen },
    { id: "weather", label: t.nav.weather, icon: CloudSun },
    { id: "mandi", label: t.nav.mandi, icon: TrendingUp },
    { id: "resources", label: t.nav.resources, icon: Calculator },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-900/10 shadow-xs">
      {/* Top Banner with Helpline and Language Switcher */}
      <div className="bg-emerald-900 text-emerald-100 text-xs px-4 py-1.5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <PhoneCall className="w-3.5 h-3.5 text-emerald-300" />
          <span className="font-medium hidden sm:inline">{t.hero.kisanHelpline}</span>
          <span className="font-medium sm:hidden">Kisan Helpline: 1800-180-1551</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "en" ? "te" : "en")}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-800 hover:bg-emerald-700 text-white font-medium transition cursor-pointer border border-emerald-700/60"
            title={lang === "en" ? "తెలుగులోకి మార్చండి" : "Switch to English"}
          >
            <Languages className="w-3.5 h-3.5" />
            <span>{lang === "en" ? "తెలుగు (Telugu)" : "English"}</span>
          </button>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            onClick={() => setActiveTab("disease")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-emerald-950 font-serif">
                  {t.appName}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold uppercase tracking-wider">
                  AgriHub
                </span>
              </div>
              <p className="text-xs text-stone-500 hidden md:block">
                {t.appTagline}
              </p>
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition cursor-pointer ${
                    isActive
                      ? "bg-emerald-700 text-white shadow-xs"
                      : "text-stone-700 hover:bg-stone-100 hover:text-emerald-900"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-emerald-700"}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action: Ask AI Advisor */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenAdvisor}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold text-sm shadow-sm transition transform hover:-translate-y-0.5 cursor-pointer"
            >
              <MessageSquareText className="w-4 h-4 animate-bounce" />
              <span className="hidden sm:inline">{t.nav.aiAdvisor}</span>
              <span className="sm:hidden">Rythu Mitra</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub-navigation bar for Mobile / Tablets */}
      <div className="lg:hidden border-t border-stone-200/80 bg-stone-50/90 overflow-x-auto scrollbar-none py-1.5 px-3 flex gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition ${
                isActive
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "bg-white text-stone-700 border border-stone-200"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-emerald-700"}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
