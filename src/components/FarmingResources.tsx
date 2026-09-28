import React, { useState } from "react";
import {
  Calculator,
  Award,
  PhoneCall,
  CheckCircle2,
  ExternalLink,
  Droplets,
  Layers,
  Sprout,
  HelpCircle,
} from "lucide-react";
import { Language } from "../types";
import { TRANSLATIONS } from "../data/translations";
import { GOV_SCHEMES, EMERGENCY_HELPLINES } from "../data/schemesAndHelplines";

interface FarmingResourcesProps {
  lang: Language;
}

export const FarmingResources: React.FC<FarmingResourcesProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [activeSubTab, setActiveSubTab] = useState<"calc" | "schemes" | "helpline">("calc");

  // Calculator 1: Fertilizer Calculator State
  const [fertCrop, setFertCrop] = useState<"paddy" | "cotton" | "chilli" | "groundnut" | "maize">("paddy");
  const [acres, setAcres] = useState<number>(2);

  // Calculator 2: Backpack Sprayer Tank Calculator State
  const [tankSize, setTankSize] = useState<number>(15); // Liters
  const [dosagePerLiter, setDosagePerLiter] = useState<number>(2); // ml or grams per liter

  // Calculator 3: Seed Rate Calculator State
  const [seedCrop, setSeedCrop] = useState<"paddy" | "cotton" | "groundnut" | "maize">("paddy");
  const [seedAcres, setSeedAcres] = useState<number>(2);

  // Calculations for Fertilizer
  const FERTILIZER_DOSES = {
    paddy: { ureaBags: 1.5, dapBags: 1.0, mopBags: 0.5 },
    cotton: { ureaBags: 2.0, dapBags: 1.0, mopBags: 0.8 },
    chilli: { ureaBags: 2.5, dapBags: 1.5, mopBags: 1.2 },
    groundnut: { ureaBags: 0.5, dapBags: 1.0, mopBags: 0.5 },
    maize: { ureaBags: 2.0, dapBags: 1.0, mopBags: 0.5 },
  };

  const calculatedFert = {
    urea: (FERTILIZER_DOSES[fertCrop].ureaBags * acres).toFixed(1),
    dap: (FERTILIZER_DOSES[fertCrop].dapBags * acres).toFixed(1),
    mop: (FERTILIZER_DOSES[fertCrop].mopBags * acres).toFixed(1),
  };

  // Calculations for Sprayer Tank
  const chemicalPerTank = (tankSize * dosagePerLiter).toFixed(1);

  // Calculations for Seed Rate
  const SEED_RATES: Record<string, { kgPerAcre: number; seedsPerAcre: string }> = {
    paddy: { kgPerAcre: 22, seedsPerAcre: "approx 1,30,000 hills" },
    cotton: { kgPerAcre: 1.8, seedsPerAcre: "approx 7,200 plants" },
    groundnut: { kgPerAcre: 45, seedsPerAcre: "approx 1,33,000 plants" },
    maize: { kgPerAcre: 7.5, seedsPerAcre: "approx 33,000 plants" },
  };

  const totalSeedsKg = (SEED_RATES[seedCrop].kgPerAcre * seedAcres).toFixed(1);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-3 border border-emerald-200">
          <Calculator className="w-3.5 h-3.5 text-emerald-600" />
          <span>Agronomic Utilities & Welfare</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-serif">
          {t.resources.title}
        </h1>
        <p className="mt-2 text-stone-600 text-sm sm:text-base leading-relaxed">
          {t.resources.subtitle}
        </p>

        {/* Sub-tab Navigation */}
        <div className="inline-flex p-1 bg-stone-200/70 rounded-xl mt-6">
          <button
            onClick={() => setActiveSubTab("calc")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer ${
              activeSubTab === "calc"
                ? "bg-white text-emerald-900 shadow-xs"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <Calculator className="w-4 h-4 text-emerald-700" />
            <span>{t.resources.tabs.calculators}</span>
          </button>

          <button
            onClick={() => setActiveSubTab("schemes")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer ${
              activeSubTab === "schemes"
                ? "bg-white text-emerald-900 shadow-xs"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <Award className="w-4 h-4 text-emerald-700" />
            <span>{t.resources.tabs.schemes}</span>
          </button>

          <button
            onClick={() => setActiveSubTab("helpline")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer ${
              activeSubTab === "helpline"
                ? "bg-white text-emerald-900 shadow-xs"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <PhoneCall className="w-4 h-4 text-emerald-700" />
            <span>{t.resources.tabs.helpline}</span>
          </button>
        </div>
      </div>

      {/* Sub-tab 1: Farm Calculators */}
      {activeSubTab === "calc" && (
        <div className="max-w-5xl mx-auto space-y-8">
          {/* 1. Fertilizer Requirement Calculator */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-stone-900">
              <Layers className="w-5 h-5 text-emerald-700" />
              <h2 className="text-xl font-bold font-serif">
                {t.resources.calcFertilizer}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  Select Crop:
                </label>
                <select
                  value={fertCrop}
                  onChange={(e) => setFertCrop(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                >
                  <option value="paddy">Paddy / Rice (వరి)</option>
                  <option value="cotton">Cotton (పత్తి)</option>
                  <option value="chilli">Chilli / Mirchi (మిర్చి)</option>
                  <option value="groundnut">Groundnut (వేరుశనగ)</option>
                  <option value="maize">Maize (మొక్కజొన్న)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  {t.resources.acresLabel}:
                </label>
                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={acres}
                  onChange={(e) => setAcres(Math.max(0.1, parseFloat(e.target.value) || 0.5))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                />
              </div>
            </div>

            {/* Calculated Fertilizer Bags Output */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-center space-y-1">
                <div className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                  {t.resources.ureaNeeded}
                </div>
                <div className="text-3xl font-black text-emerald-950">
                  {calculatedFert.urea} <span className="text-sm font-semibold">Bags (50kg)</span>
                </div>
                <div className="text-[11px] text-stone-500">
                  Split into 3 doses across vegetative stages
                </div>
              </div>

              <div className="p-4 bg-teal-50/70 border border-teal-200 rounded-2xl text-center space-y-1">
                <div className="text-xs font-bold text-teal-800 uppercase tracking-wide">
                  {t.resources.dapNeeded}
                </div>
                <div className="text-3xl font-black text-teal-950">
                  {calculatedFert.dap} <span className="text-sm font-semibold">Bags (50kg)</span>
                </div>
                <div className="text-[11px] text-stone-500">
                  Apply 100% basal dose in final ploughing
                </div>
              </div>

              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl text-center space-y-1">
                <div className="text-xs font-bold text-amber-800 uppercase tracking-wide">
                  {t.resources.mopNeeded}
                </div>
                <div className="text-3xl font-black text-amber-950">
                  {calculatedFert.mop} <span className="text-sm font-semibold">Bags (50kg)</span>
                </div>
                <div className="text-[11px] text-stone-500">
                  Essential for grain weight and pest resistance
                </div>
              </div>
            </div>
          </div>

          {/* 2. Sprayer Tank Dilution Calculator */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-stone-900">
              <Droplets className="w-5 h-5 text-rose-600" />
              <h2 className="text-xl font-bold font-serif">
                {t.resources.calcTank}
              </h2>
            </div>
            <p className="text-xs text-stone-500">
              Easily measure pesticide / fungicide dosage per backpack spray pump to prevent over-application or leaf burn.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  {t.resources.tankCapacity}:
                </label>
                <select
                  value={tankSize}
                  onChange={(e) => setTankSize(parseInt(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                >
                  <option value="15">15 Liters (Standard Backpack Pump)</option>
                  <option value="16">16 Liters</option>
                  <option value="20">20 Liters (Battery Sprayer)</option>
                  <option value="10">10 Liters (Mini Hand Pump)</option>
                  <option value="200">200 Liters (Tractor Mounted / Field Drum)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  {t.resources.chemicalDosagePerLiter}:
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={dosagePerLiter}
                  onChange={(e) => setDosagePerLiter(Math.max(0.1, parseFloat(e.target.value) || 1))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                />
              </div>
            </div>

            <div className="p-4 bg-rose-50/80 border border-rose-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-rose-900 uppercase">
                  {t.resources.calcTankResult}:
                </div>
                <div className="text-xs text-rose-700 mt-0.5">
                  Add this exact amount to your {tankSize}L sprayer tank filled with water.
                </div>
              </div>
              <div className="text-3xl font-black text-rose-950 whitespace-nowrap">
                {chemicalPerTank} <span className="text-base font-bold">ml or grams</span>
              </div>
            </div>
          </div>

          {/* 3. Seed Rate & Plant Population Calculator */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-stone-900">
              <Sprout className="w-5 h-5 text-emerald-700" />
              <h2 className="text-xl font-bold font-serif">
                {t.resources.calcSeed}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  Select Crop:
                </label>
                <select
                  value={seedCrop}
                  onChange={(e) => setSeedCrop(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                >
                  <option value="paddy">Paddy / Rice (వరి)</option>
                  <option value="cotton">Cotton (పత్తి)</option>
                  <option value="groundnut">Groundnut (వేరుశనగ)</option>
                  <option value="maize">Maize (మొక్కజొన్న)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  {t.resources.acresLabel}:
                </label>
                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={seedAcres}
                  onChange={(e) => setSeedAcres(Math.max(0.1, parseFloat(e.target.value) || 1))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                />
              </div>
            </div>

            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-emerald-900 uppercase">
                  Required Certified Seed Quantity:
                </div>
                <div className="text-xs text-stone-600 mt-0.5">
                  Expected field population: {SEED_RATES[seedCrop].seedsPerAcre}
                </div>
              </div>
              <div className="text-3xl font-black text-emerald-950 whitespace-nowrap">
                {totalSeedsKg} <span className="text-base font-bold">Kg</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sub-tab 2: Government Schemes */}
      {activeSubTab === "schemes" && (
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {GOV_SCHEMES.map((scheme) => (
              <div
                key={scheme.id}
                className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs hover:border-emerald-600 transition space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {lang === "te" ? scheme.badge.te : scheme.badge.en}
                    </span>
                    <span className="text-[11px] text-stone-400 font-medium">
                      Official Scheme
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-stone-900">
                    {lang === "te" ? scheme.title.te : scheme.title.en}
                  </h3>

                  <p className="text-xs text-stone-500">
                    {lang === "te" ? scheme.department.te : scheme.department.en}
                  </p>

                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                    <span className="font-bold text-stone-800">
                      {t.resources.benefit}:{" "}
                    </span>
                    <span className="text-stone-700">
                      {lang === "te" ? scheme.benefit.te : scheme.benefit.en}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="font-bold text-stone-800">
                      {t.resources.eligibility}:
                    </div>
                    {(lang === "te"
                      ? scheme.eligibility.te
                      : scheme.eligibility.en
                    ).map((e, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-stone-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{e}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-xs text-stone-600">
                    <span className="font-bold text-stone-800">
                      {t.resources.howToApply}:{" "}
                    </span>
                    {lang === "te" ? scheme.howToApply.te : scheme.howToApply.en}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100">
                  <a
                    href={scheme.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition"
                  >
                    <span>{t.resources.applyLink}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-tab 3: Emergency Helplines */}
      {activeSubTab === "helpline" && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {EMERGENCY_HELPLINES.map((hl, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs hover:border-emerald-600 transition space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                    {hl.badge}
                  </span>
                  <h3 className="text-base font-extrabold text-stone-900">
                    {lang === "te" ? hl.titleTe : hl.titleEn}
                  </h3>
                  <p className="text-xs text-stone-600">
                    {lang === "te" ? hl.hoursTe : hl.hoursEn}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100">
                  <a
                    href={`tel:${hl.phone}`}
                    className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Call: {hl.phone}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
