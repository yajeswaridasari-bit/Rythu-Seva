import React, { useState, useRef } from "react";
import {
  Upload,
  Camera,
  AlertTriangle,
  CheckCircle2,
  Volume2,
  VolumeX,
  Sparkles,
  ShieldAlert,
  Leaf,
  Bug,
  Droplets,
  RotateCcw,
  Clock,
  ThermometerSun,
  FileCheck,
  HelpCircle,
} from "lucide-react";
import { Language, DiagnosisData } from "../types";
import { TRANSLATIONS } from "../data/translations";
import { SAMPLE_DISEASE_CASES, SampleDiseaseCase } from "../data/sampleDiseases";
import { speakText, stopSpeaking, isSpeaking } from "../utils/speech";

interface DiseaseIdentifierProps {
  lang: Language;
}

export const DiseaseIdentifier: React.FC<DiseaseIdentifierProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  const [activeMode, setActiveMode] = useState<"photo" | "symptoms">("photo");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [cropHint, setCropHint] = useState<string>("");
  const [symptomsNote, setSymptomsNote] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // Symptom Wizard states
  const [wizardCrop, setWizardCrop] = useState<string>("Rice");
  const [wizardPart, setWizardPart] = useState<string>("Leaves");
  const [wizardSymptom, setWizardSymptom] = useState<string>("Spindle shaped brown lesions");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Handle image upload from computer or gallery
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
      setDiagnosisResult(null);
      setErrorMsg(null);
    };
    reader.readAsDataURL(file);
  };

  // Run AI Diagnosis via server-side endpoint
  const runDiagnosis = async (
    customImage?: string,
    customCrop?: string,
    customSymptoms?: string
  ) => {
    setIsAnalyzing(true);
    setErrorMsg(null);
    stopSpeaking();
    setIsPlayingAudio(false);

    const imageToSend = customImage !== undefined ? customImage : selectedImage;
    const cropToSend = customCrop !== undefined ? customCrop : cropHint;
    const symptomsToSend = customSymptoms !== undefined ? customSymptoms : symptomsNote;

    try {
      const response = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: imageToSend || undefined,
          cropHint: cropToSend || undefined,
          symptomsText: symptomsToSend || undefined,
          language: lang,
        }),
      });

      const json = await response.json();
      if (!response.ok || !json.success) {
        throw new Error(json.error || "Failed to analyze crop image");
      }

      setDiagnosisResult(json.data);
    } catch (err: any) {
      console.error("Diagnosis error:", err);
      setErrorMsg(
        lang === "en"
          ? "Analysis failed. Please check your image or internet connection and retry."
          : "విశ్లేషణ విఫలమైంది. దయచేసి సరైన ఫోటోను ఎంచుకుని తిరిగి ప్రయత్నించండి."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Quick 1-Click test with pre-configured realistic agricultural cases
  const handleSampleClick = (sample: SampleDiseaseCase) => {
    setCropHint(sample.hint);
    setSymptomsNote(sample.symptomsNote);
    // Use an identifiable SVG placeholder for the sample
    const svgThumbnail = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23ecfdf5"/><text x="50%25" y="40%25" dominant-baseline="middle" text-anchor="middle" font-size="64">${encodeURIComponent(
      sample.imageThumbnail
    )}</text><text x="50%25" y="70%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="bold" fill="%23064e3b">${encodeURIComponent(
      sample.cropNameEn
    )}</text><text x="50%25" y="85%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%23047857">${encodeURIComponent(
      sample.diseaseEn
    )}</text></svg>`;

    setSelectedImage(svgThumbnail);
    runDiagnosis(svgThumbnail, sample.hint, sample.symptomsNote);
  };

  // Symptom Wizard submit
  const handleWizardSubmit = () => {
    const combinedSymptoms = `Crop: ${wizardCrop}. Affected Part: ${wizardPart}. Symptoms: ${wizardSymptom}.`;
    runDiagnosis(undefined, wizardCrop, combinedSymptoms);
  };

  // Toggle Audio Readout
  const toggleAudio = () => {
    if (isPlayingAudio || isSpeaking()) {
      stopSpeaking();
      setIsPlayingAudio(false);
    } else if (diagnosisResult) {
      const summary =
        lang === "te"
          ? diagnosisResult.audioSummary?.te || diagnosisResult.diseaseName?.te
          : diagnosisResult.audioSummary?.en || diagnosisResult.diseaseName?.en;

      const fullSpeech = `${summary}. ${
        lang === "te"
          ? `సిఫార్సు చేసిన మందు: ${diagnosisResult.chemicalRemedies?.dosageTe || ""}. సేంద్రీయ పరిష్కారం: ${diagnosisResult.organicRemedies?.te?.[0] || ""}`
          : `Recommended Spray: ${diagnosisResult.chemicalRemedies?.dosageEn || ""}. Organic Solution: ${diagnosisResult.organicRemedies?.en?.[0] || ""}`
      }`;

      const started = speakText(
        fullSpeech,
        lang,
        () => setIsPlayingAudio(false),
        () => setIsPlayingAudio(false)
      );
      if (started) setIsPlayingAudio(true);
    }
  };

  // Reset diagnosis
  const handleReset = () => {
    setSelectedImage(null);
    setCropHint("");
    setSymptomsNote("");
    setDiagnosisResult(null);
    setErrorMsg(null);
    stopSpeaking();
    setIsPlayingAudio(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  };

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-3 border border-emerald-200">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Multimodal Agri-Vision AI</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-serif">
          {t.disease.title}
        </h1>
        <p className="mt-2 text-stone-600 text-sm sm:text-base leading-relaxed">
          {t.disease.subtitle}
        </p>

        {/* Diagnosis Mode Switcher */}
        <div className="inline-flex p-1 bg-stone-200/70 rounded-xl mt-6">
          <button
            onClick={() => setActiveMode("photo")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition cursor-pointer ${
              activeMode === "photo"
                ? "bg-white text-emerald-900 shadow-xs"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <Camera className="w-4 h-4 text-emerald-700" />
            <span>{t.disease.tabPhoto}</span>
          </button>
          <button
            onClick={() => setActiveMode("symptoms")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition cursor-pointer ${
              activeMode === "symptoms"
                ? "bg-white text-emerald-900 shadow-xs"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <HelpCircle className="w-4 h-4 text-emerald-700" />
            <span>{t.disease.tabSymptoms}</span>
          </button>
        </div>
      </div>

      {/* Main Diagnostic Area */}
      {!diagnosisResult ? (
        <div className="max-w-4xl mx-auto space-y-6">
          {activeMode === "photo" ? (
            /* Mode 1: Photo Upload / Camera */
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
              {/* Drop / Preview Area */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition flex flex-col items-center justify-center min-h-[260px] ${
                  selectedImage
                    ? "border-emerald-500 bg-emerald-50/40"
                    : "border-stone-300 hover:border-emerald-600 hover:bg-stone-50"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {selectedImage ? (
                  <div className="space-y-4">
                    <img
                      src={selectedImage}
                      alt="Uploaded crop leaf"
                      className="max-h-64 mx-auto rounded-xl object-contain shadow-xs border border-emerald-200"
                    />
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                        Photo Ready
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImage(null);
                        }}
                        className="text-xs text-rose-600 hover:underline font-semibold"
                      >
                        Change Photo
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-100/80 text-emerald-800 flex items-center justify-center mx-auto shadow-inner">
                      <Upload className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-stone-800">
                        {t.disease.uploadTitle}
                      </h3>
                      <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                        {t.disease.dragDrop}
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          fileInputRef.current?.click();
                        }}
                        className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-2"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        Browse Gallery
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          cameraInputRef.current?.click();
                        }}
                        className="px-4 py-2 bg-stone-800 hover:bg-stone-900 text-white rounded-xl text-xs font-bold transition flex items-center gap-2"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        Take Camera Photo
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Optional Crop Hint & Symptoms Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    {t.disease.cropTypeLabel}
                  </label>
                  <input
                    type="text"
                    value={cropHint}
                    onChange={(e) => setCropHint(e.target.value)}
                    placeholder={t.disease.cropTypePlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    {t.disease.symptomsNoteLabel}
                  </label>
                  <input
                    type="text"
                    value={symptomsNote}
                    onChange={(e) => setSymptomsNote(e.target.value)}
                    placeholder={t.disease.symptomsNotePlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                  />
                </div>
              </div>

              {/* Action Button */}
              <div>
                <button
                  type="button"
                  disabled={!selectedImage || isAnalyzing}
                  onClick={() => runDiagnosis()}
                  className={`w-full py-3.5 px-6 rounded-xl font-bold text-base transition flex items-center justify-center gap-3 cursor-pointer shadow-md ${
                    !selectedImage || isAnalyzing
                      ? "bg-stone-200 text-stone-400 cursor-not-allowed"
                      : "bg-emerald-700 hover:bg-emerald-800 text-white shadow-emerald-700/20"
                  }`}
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{t.disease.analyzing}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>{t.disease.diagnoseAction}</span>
                    </>
                  )}
                </button>
              </div>

              {/* 1-Click Test Samples */}
              <div className="pt-4 border-t border-stone-200">
                <p className="text-xs font-bold text-stone-600 mb-3 flex items-center gap-1.5">
                  <Leaf className="w-3.5 h-3.5 text-emerald-700" />
                  {t.disease.orTrySample}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                  {SAMPLE_DISEASE_CASES.map((sample) => (
                    <button
                      key={sample.id}
                      type="button"
                      onClick={() => handleSampleClick(sample)}
                      className="p-2.5 rounded-xl border border-stone-200 hover:border-emerald-600 hover:bg-emerald-50/50 bg-stone-50/80 transition text-left cursor-pointer group"
                    >
                      <div className="text-2xl mb-1 group-hover:scale-110 transition">
                        {sample.imageThumbnail}
                      </div>
                      <div className="text-xs font-bold text-stone-800 truncate">
                        {lang === "te" ? sample.cropNameTe : sample.cropNameEn}
                      </div>
                      <div className="text-[11px] text-stone-500 truncate mt-0.5">
                        {lang === "te" ? sample.diseaseTe : sample.diseaseEn}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Mode 2: Symptom Wizard */
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-stone-800 mb-2">
                    1. {t.disease.selectCropFirst}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {["Rice", "Cotton", "Chilli", "Groundnut", "Maize", "Tomato"].map(
                      (crop) => (
                        <button
                          key={crop}
                          type="button"
                          onClick={() => setWizardCrop(crop)}
                          className={`p-3 rounded-xl border text-sm font-bold text-center cursor-pointer transition ${
                            wizardCrop === crop
                              ? "border-emerald-600 bg-emerald-50 text-emerald-900 shadow-xs"
                              : "border-stone-200 bg-white text-stone-700 hover:bg-stone-50"
                          }`}
                        >
                          {crop === "Rice" && (lang === "te" ? "వరి (Rice)" : "Rice / Paddy")}
                          {crop === "Cotton" && (lang === "te" ? "పత్తి (Cotton)" : "Cotton")}
                          {crop === "Chilli" && (lang === "te" ? "మిర్చి (Chilli)" : "Chilli / Mirchi")}
                          {crop === "Groundnut" && (lang === "te" ? "వేరుశనగ" : "Groundnut")}
                          {crop === "Maize" && (lang === "te" ? "మొక్కజొన్న" : "Maize")}
                          {crop === "Tomato" && (lang === "te" ? "టమోటా" : "Tomato")}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-stone-800 mb-2">
                    2. {t.disease.selectPart}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { en: "Leaves", te: "ఆకులు" },
                      { en: "Stem / Collar", te: "కాండం / మొదలు" },
                      { en: "Flower / Buds", te: "పూత / మొగ్గలు" },
                      { en: "Fruit / Bolls / Grain", te: "కాయలు / వెన్ను" },
                    ].map((part) => (
                      <button
                        key={part.en}
                        type="button"
                        onClick={() => setWizardPart(part.en)}
                        className={`p-3 rounded-xl border text-sm font-semibold text-center cursor-pointer transition ${
                          wizardPart === part.en
                            ? "border-emerald-600 bg-emerald-50 text-emerald-900 shadow-xs"
                            : "border-stone-200 bg-white text-stone-700 hover:bg-stone-50"
                        }`}
                      >
                        {lang === "te" ? part.te : part.en}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-stone-800 mb-2">
                    3. {t.disease.selectVisualSymptom}
                  </label>
                  <div className="space-y-2">
                    {[
                      {
                        en: "Spindle or eye-shaped brown lesions with ash-grey center",
                        te: "కంటి ఆకారపు గోధుమ రంగు మచ్చలు, బూడిద రంగు కేంద్రం",
                      },
                      {
                        en: "Upward or downward leaf curling, puckering, stunted canopy",
                        te: "ఆకులు పైకి లేదా కిందికి ముడుచుకుపోవడం, గిడసబారడం",
                      },
                      {
                        en: "Rosette twisted flowers or small exit holes on pods/bolls",
                        te: "పూలు ముడుచుకుపోవడం లేదా కాయలపై రంధ్రాలు పడటం",
                      },
                      {
                        en: "Circular dark brown spots with prominent bright yellow halos",
                        te: "పసుపు వలయంతో కూడిన నల్లటి గుండ్రని మచ్చలు",
                      },
                      {
                        en: "Sudden wilting and vascular browning of stem",
                        te: "మొక్క అకస్మాత్తుగా వాడిపోవడం, మొదలు కుళ్ళడం",
                      },
                    ].map((symptom) => (
                      <button
                        key={symptom.en}
                        type="button"
                        onClick={() => setWizardSymptom(symptom.en)}
                        className={`w-full p-3.5 rounded-xl border text-sm text-left cursor-pointer transition flex items-center gap-3 ${
                          wizardSymptom === symptom.en
                            ? "border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-xs"
                            : "border-stone-200 bg-white text-stone-700 hover:bg-stone-50 font-medium"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                            wizardSymptom === symptom.en
                              ? "border-emerald-700 bg-emerald-700"
                              : "border-stone-300"
                          }`}
                        >
                          {wizardSymptom === symptom.en && (
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                        </div>
                        <span>{lang === "te" ? symptom.te : symptom.en}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="button"
                disabled={isAnalyzing}
                onClick={handleWizardSubmit}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-base bg-emerald-700 hover:bg-emerald-800 text-white transition flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-700/20"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{t.disease.analyzing}</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>{t.disease.checkSymptomsBtn}</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Error Message */}
          {errorMsg && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>
      ) : (
        /* Diagnosis Result Card */
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-lg space-y-6">
            {/* Top Bar with Disease Name, Severity Badge, and Listen Audio */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-stone-200">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-md">
                    {lang === "te"
                      ? diagnosisResult.cropName?.te
                      : diagnosisResult.cropName?.en}
                  </span>
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-md border ${
                      diagnosisResult.severity === "severe"
                        ? "bg-rose-100 text-rose-800 border-rose-200"
                        : diagnosisResult.severity === "moderate"
                        ? "bg-amber-100 text-amber-800 border-amber-200"
                        : diagnosisResult.severity === "mild"
                        ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                        : "bg-emerald-100 text-emerald-800 border-emerald-200"
                    }`}
                  >
                    {t.disease[diagnosisResult.severity] || diagnosisResult.severity}
                  </span>
                  <span className="text-xs text-stone-500 font-medium">
                    {t.disease.confidence}: {diagnosisResult.confidenceScore}%
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
                  {lang === "te"
                    ? diagnosisResult.diseaseName?.te
                    : diagnosisResult.diseaseName?.en}
                </h2>
                {diagnosisResult.scientificName && (
                  <p className="text-xs italic text-stone-500">
                    Pathogen: {diagnosisResult.scientificName}
                  </p>
                )}
              </div>

              {/* Action Buttons: Audio Listen & Reset */}
              <div className="flex items-center gap-2 self-start">
                <button
                  type="button"
                  onClick={toggleAudio}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition ${
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
                      <span>{t.disease.listenAudio}</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 transition cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.disease.clearBtn}</span>
                </button>
              </div>
            </div>

            {/* Weather / Spray Safety Advisory Alert */}
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3">
              <ThermometerSun className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                  {t.disease.sprayAdvisoryTitle}
                </h4>
                <p className="text-sm text-amber-950 mt-0.5 font-medium">
                  {lang === "te"
                    ? diagnosisResult.sprayAdvisory?.te
                    : diagnosisResult.sprayAdvisory?.en}
                </p>
              </div>
            </div>

            {/* Observed Symptoms */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-stone-800 flex items-center gap-2">
                <Bug className="w-4 h-4 text-emerald-700" />
                <span>{t.disease.symptomsTitle}</span>
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-stone-700">
                {(lang === "te"
                  ? diagnosisResult.symptoms?.te
                  : diagnosisResult.symptoms?.en
                )?.map((sym, idx) => (
                  <li
                    key={idx}
                    className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-2"
                  >
                    <span className="text-emerald-700 font-bold">•</span>
                    <span>{sym}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Treatment Options: Two Columns (Chemical vs Organic) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Chemical Spray & Exact Tank Dosage */}
              <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200/70 space-y-3">
                <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
                  <Droplets className="w-4 h-4 text-rose-600" />
                  <span>{t.disease.chemicalTitle}</span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-rose-200/90 shadow-2xs">
                  <div className="text-xs text-rose-800 font-semibold mb-1">
                    Exact Backpack Tank Dosage:
                  </div>
                  <div className="text-sm font-extrabold text-rose-950">
                    {lang === "te"
                      ? diagnosisResult.chemicalRemedies?.dosageTe
                      : diagnosisResult.chemicalRemedies?.dosageEn}
                  </div>
                </div>

                <ul className="space-y-1.5 text-xs text-stone-800">
                  {(lang === "te"
                    ? diagnosisResult.chemicalRemedies?.te
                    : diagnosisResult.chemicalRemedies?.en
                  )?.map((chem, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-rose-600 font-bold">•</span>
                      <span>{chem}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-[11px] text-stone-500 italic pt-1">
                  ⚠️ {t.disease.chemicalNote}
                </p>
              </div>

              {/* Organic & Biological Remedies */}
              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-3">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                  <Leaf className="w-4 h-4 text-emerald-700" />
                  <span>{t.disease.organicTitle}</span>
                </div>

                <ul className="space-y-2 text-xs text-stone-800">
                  {(lang === "te"
                    ? diagnosisResult.organicRemedies?.te
                    : diagnosisResult.organicRemedies?.en
                  )?.map((org, idx) => (
                    <li
                      key={idx}
                      className="p-2.5 rounded-xl bg-white border border-emerald-200/60 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{org}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Long-term Preventive Measures */}
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                <ShieldAlert className="w-4 h-4 text-emerald-700" />
                <span>{t.disease.preventiveTitle}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-stone-700">
                {(lang === "te"
                  ? diagnosisResult.preventiveMeasures?.te
                  : diagnosisResult.preventiveMeasures?.en
                )?.map((prev, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white rounded-xl border border-stone-200"
                  >
                    <div className="font-bold text-emerald-800 mb-1">
                      Step {idx + 1}
                    </div>
                    <div>{prev}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-stone-200">
              <div className="text-xs text-stone-500">
                Kisan Helpline: Call 1800-180-1551 for free scientist consultation.
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-sm transition cursor-pointer"
              >
                {t.disease.clearBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
