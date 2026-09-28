import React, { useState } from "react";
import {
  Search,
  BookOpen,
  Calendar,
  Layers,
  Sprout,
  Droplets,
  ShieldAlert,
  Archive,
  Volume2,
  VolumeX,
  CheckCircle2,
} from "lucide-react";
import { Language, CropCareGuide } from "../types";
import { TRANSLATIONS } from "../data/translations";
import { CROP_CARE_GUIDES } from "../data/cropCareData";
import { speakText, stopSpeaking, isSpeaking } from "../utils/speech";

interface CropCareHubProps {
  lang: Language;
}

export const CropCareHub: React.FC<CropCareHubProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCrop, setSelectedCrop] = useState<CropCareGuide>(CROP_CARE_GUIDES[0]);
  const [activeStage, setActiveStage] = useState<
    "sowing" | "fertilizer" | "irrigation" | "pests" | "harvest"
  >("sowing");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Filter crops
  const filteredCrops = CROP_CARE_GUIDES.filter((crop) => {
    const q = searchQuery.toLowerCase();
    return (
      crop.name.en.toLowerCase().includes(q) ||
      crop.name.te.toLowerCase().includes(q) ||
      crop.botanicalName.toLowerCase().includes(q)
    );
  });

  const toggleGuideAudio = () => {
    if (isPlayingAudio || isSpeaking()) {
      stopSpeaking();
      setIsPlayingAudio(false);
    } else {
      const cropTitle = lang === "te" ? selectedCrop.name.te : selectedCrop.name.en;
      let textToRead = `${cropTitle}. `;

      if (activeStage === "sowing") {
        textToRead += `${lang === "te" ? "నేల" : "Soil"}: ${
          lang === "te" ? selectedCrop.soil.te : selectedCrop.soil.en
        }. ${lang === "te" ? "విత్తన మోతాదు" : "Seed Rate"}: ${
          lang === "te" ? selectedCrop.seedRate.te : selectedCrop.seedRate.en
        }.`;
      } else if (activeStage === "fertilizer") {
        textToRead += `${lang === "te" ? "ఆఖరి దుక్కిలో" : "Basal Dose"}: ${
          lang === "te"
            ? selectedCrop.fertilizerSchedule.basal.te
            : selectedCrop.fertilizerSchedule.basal.en
        }. ${lang === "te" ? "పిలకల దశలో" : "Vegetative Stage"}: ${
          lang === "te"
            ? selectedCrop.fertilizerSchedule.vegetative.te
            : selectedCrop.fertilizerSchedule.vegetative.en
        }.`;
      } else if (activeStage === "irrigation") {
        textToRead += lang === "te" ? selectedCrop.irrigation.te : selectedCrop.irrigation.en;
      } else if (activeStage === "pests") {
        const pest = selectedCrop.commonPestsAndDiseases[0];
        if (pest) {
          textToRead += `${lang === "te" ? pest.name.te : pest.name.en}: ${
            lang === "te" ? pest.solution.te : pest.solution.en
          }`;
        }
      } else {
        textToRead += (lang === "te"
          ? selectedCrop.harvestingTips.te
          : selectedCrop.harvestingTips.en
        ).join(". ");
      }

      const started = speakText(
        textToRead,
        lang,
        () => setIsPlayingAudio(false),
        () => setIsPlayingAudio(false)
      );
      if (started) setIsPlayingAudio(true);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-3 border border-emerald-200">
          <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
          <span>ICAR & Agri University Verified</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-serif">
          {t.cropCare.title}
        </h1>
        <p className="mt-2 text-stone-600 text-sm sm:text-base leading-relaxed">
          {t.cropCare.subtitle}
        </p>
      </div>

      {/* Main Grid: Crop Selector on Left, Guide on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Crop List */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.cropCare.searchPlaceholder}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-stone-50/50"
            />
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {filteredCrops.map((crop) => {
              const isSelected = selectedCrop.id === crop.id;
              return (
                <button
                  key={crop.id}
                  onClick={() => {
                    setSelectedCrop(crop);
                    stopSpeaking();
                    setIsPlayingAudio(false);
                  }}
                  className={`w-full p-3.5 rounded-xl border text-left cursor-pointer transition flex items-center justify-between ${
                    isSelected
                      ? "border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-xs"
                      : "border-stone-200 bg-white text-stone-700 hover:bg-stone-50 font-medium"
                  }`}
                >
                  <div>
                    <div className="text-sm font-bold">
                      {lang === "te" ? crop.name.te : crop.name.en}
                    </div>
                    <div className="text-xs text-stone-500 italic mt-0.5">
                      {crop.botanicalName}
                    </div>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
                    {crop.duration}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Crop Detail Card */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
          {/* Top Title Bar with Audio Readout */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-200">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-md">
                  {selectedCrop.duration}
                </span>
                <span className="text-xs text-stone-500 italic">
                  {selectedCrop.botanicalName}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
                {lang === "te" ? selectedCrop.name.te : selectedCrop.name.en}
              </h2>
            </div>

            <button
              onClick={toggleGuideAudio}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition self-start cursor-pointer ${
                isPlayingAudio
                  ? "bg-amber-500 text-white animate-pulse"
                  : "bg-emerald-100 hover:bg-emerald-200 text-emerald-900"
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span>{t.disease.stopAudio}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span>{t.cropCare.listenGuide}</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <div className="text-[11px] text-stone-500 font-semibold uppercase">
                {t.cropCare.season}
              </div>
              <div className="text-xs font-bold text-stone-800 mt-0.5">
                {lang === "te" ? selectedCrop.season.te : selectedCrop.season.en}
              </div>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <div className="text-[11px] text-stone-500 font-semibold uppercase">
                {t.cropCare.seedRate}
              </div>
              <div className="text-xs font-bold text-stone-800 mt-0.5">
                {lang === "te" ? selectedCrop.seedRate.te : selectedCrop.seedRate.en}
              </div>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <div className="text-[11px] text-stone-500 font-semibold uppercase">
                {t.cropCare.duration}
              </div>
              <div className="text-xs font-bold text-stone-800 mt-0.5">
                {selectedCrop.duration}
              </div>
            </div>
          </div>

          {/* Stage Tabs */}
          <div className="border-b border-stone-200 flex flex-wrap gap-2">
            {[
              { id: "sowing", label: t.cropCare.stages.soilSowing, icon: Sprout },
              { id: "fertilizer", label: t.cropCare.stages.fertilizer, icon: Layers },
              { id: "irrigation", label: t.cropCare.stages.irrigation, icon: Droplets },
              { id: "pests", label: t.cropCare.stages.pests, icon: ShieldAlert },
              { id: "harvest", label: t.cropCare.stages.harvest, icon: Archive },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeStage === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveStage(tab.id as any);
                    stopSpeaking();
                    setIsPlayingAudio(false);
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer ${
                    isActive
                      ? "border-emerald-600 text-emerald-900 bg-emerald-50/50 rounded-t-lg"
                      : "border-transparent text-stone-500 hover:text-stone-900"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Content */}
          <div className="space-y-4 text-stone-800">
            {activeStage === "sowing" && (
              <div className="space-y-5">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                    {t.cropCare.soilType}
                  </h4>
                  <p className="text-sm font-medium text-stone-800 p-3 bg-stone-50 rounded-xl border border-stone-200">
                    {lang === "te" ? selectedCrop.soil.te : selectedCrop.soil.en}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                    {t.cropCare.seedTreatment}
                  </h4>
                  <div className="space-y-2">
                    {(lang === "te"
                      ? selectedCrop.seedTreatment.te
                      : selectedCrop.seedTreatment.en
                    ).map((st, i) => (
                      <div
                        key={i}
                        className="p-3 bg-emerald-50/50 border border-emerald-200/60 rounded-xl flex items-start gap-2.5 text-xs sm:text-sm"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                        <span>{st}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeStage === "fertilizer" && (
              <div className="space-y-4">
                <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs font-bold text-emerald-900">
                  {t.cropCare.fertilizerSchedule}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-1 shadow-2xs">
                    <div className="font-bold text-emerald-800 text-xs uppercase tracking-wide">
                      1. {t.cropCare.basalDose}
                    </div>
                    <div className="text-stone-700">
                      {lang === "te"
                        ? selectedCrop.fertilizerSchedule.basal.te
                        : selectedCrop.fertilizerSchedule.basal.en}
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-1 shadow-2xs">
                    <div className="font-bold text-emerald-800 text-xs uppercase tracking-wide">
                      2. {t.cropCare.vegetativeDose}
                    </div>
                    <div className="text-stone-700">
                      {lang === "te"
                        ? selectedCrop.fertilizerSchedule.vegetative.te
                        : selectedCrop.fertilizerSchedule.vegetative.en}
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-1 shadow-2xs">
                    <div className="font-bold text-emerald-800 text-xs uppercase tracking-wide">
                      3. {t.cropCare.floweringDose}
                    </div>
                    <div className="text-stone-700">
                      {lang === "te"
                        ? selectedCrop.fertilizerSchedule.flowering.te
                        : selectedCrop.fertilizerSchedule.flowering.en}
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-1 shadow-2xs">
                    <div className="font-bold text-emerald-800 text-xs uppercase tracking-wide">
                      4. {t.cropCare.fruitingDose}
                    </div>
                    <div className="text-stone-700">
                      {lang === "te"
                        ? selectedCrop.fertilizerSchedule.fruiting.te
                        : selectedCrop.fertilizerSchedule.fruiting.en}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeStage === "irrigation" && (
              <div className="p-5 bg-blue-50/50 border border-blue-200 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                  <Droplets className="w-4 h-4 text-blue-600" />
                  <span>{t.cropCare.irrigationTips}</span>
                </div>
                <p className="text-sm leading-relaxed text-blue-950 font-medium">
                  {lang === "te"
                    ? selectedCrop.irrigation.te
                    : selectedCrop.irrigation.en}
                </p>
              </div>
            )}

            {activeStage === "pests" && (
              <div className="space-y-4">
                {selectedCrop.commonPestsAndDiseases.map((pest, i) => (
                  <div
                    key={i}
                    className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-3"
                  >
                    <div className="font-bold text-sm text-stone-900 flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-rose-600" />
                      <span>{lang === "te" ? pest.name.te : pest.name.en}</span>
                    </div>

                    <div className="text-xs text-stone-600">
                      <span className="font-bold text-stone-800">
                        {lang === "te" ? "లక్షణాలు:" : "Symptoms:"}{" "}
                      </span>
                      {lang === "te" ? pest.symptoms.te : pest.symptoms.en}
                    </div>

                    <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-emerald-950">
                      <span className="font-bold text-emerald-800">
                        {lang === "te" ? "పరిష్కారం & మందు:" : "Recommended Remedy:"}{" "}
                      </span>
                      {lang === "te" ? pest.solution.te : pest.solution.en}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeStage === "harvest" && (
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase text-stone-500">
                  {t.cropCare.harvestTips}
                </div>
                {(lang === "te"
                  ? selectedCrop.harvestingTips.te
                  : selectedCrop.harvestingTips.en
                ).map((tip, i) => (
                  <div
                    key={i}
                    className="p-3.5 bg-amber-50/50 border border-amber-200 rounded-xl text-xs sm:text-sm text-amber-950 flex items-start gap-2.5 font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
