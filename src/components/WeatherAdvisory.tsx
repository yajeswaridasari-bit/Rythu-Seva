import React, { useState, useEffect } from "react";
import {
  CloudSun,
  Droplets,
  Wind,
  Thermometer,
  ShieldCheck,
  ShieldX,
  AlertTriangle,
  Calendar,
  Compass,
  MapPin,
} from "lucide-react";
import { Language, DistrictWeather } from "../types";
import { TRANSLATIONS } from "../data/translations";

interface WeatherAdvisoryProps {
  lang: Language;
}

export const WeatherAdvisory: React.FC<WeatherAdvisoryProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [selectedDistrict, setSelectedDistrict] = useState("Guntur");
  const [weatherData, setWeatherData] = useState<DistrictWeather | null>(null);
  const [loading, setLoading] = useState(false);

  const districts = [
    { id: "Guntur", nameEn: "Guntur (Chilli & Cotton Belt)", nameTe: "గుంటూరు (మిర్చి & పత్తి)" },
    { id: "Warangal", nameEn: "Warangal (Paddy & Cotton APMC)", nameTe: "వరంగల్ (వరి & పత్తి)" },
    { id: "Kurnool", nameEn: "Kurnool (Groundnut & Onion)", nameTe: "కర్నూలు (వేరుశనగ & ఉల్లి)" },
    { id: "Khammam", nameEn: "Khammam (Chilli & Maize)", nameTe: "ఖమ్మం (మిర్చి & మొక్కజొన్న)" },
  ];

  useEffect(() => {
    fetchWeather(selectedDistrict);
  }, [selectedDistrict]);

  const fetchWeather = async (district: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/weather?district=${district}`);
      const json = await res.json();
      if (json.data) {
        setWeatherData(json.data);
      }
    } catch (err) {
      console.error("Failed to fetch weather:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold mb-3 border border-blue-200">
          <CloudSun className="w-3.5 h-3.5 text-blue-600" />
          <span>Agricultural Meteorological Advisory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-serif">
          {t.weather.title}
        </h1>
        <p className="mt-2 text-stone-600 text-sm sm:text-base leading-relaxed">
          {t.weather.subtitle}
        </p>

        {/* District Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {districts.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDistrict(d.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                selectedDistrict === d.id
                  ? "bg-emerald-700 text-white shadow-md shadow-emerald-700/20"
                  : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-50"
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{lang === "te" ? d.nameTe : d.nameEn}</span>
            </button>
          ))}
        </div>
      </div>

      {loading || !weatherData ? (
        <div className="p-12 text-center">
          <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-stone-500 font-semibold">Loading farm weather data...</p>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Main Weather Card */}
          <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-stone-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedDistrict} Agri-Station Forecast</span>
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="text-5xl sm:text-6xl font-extrabold tracking-tighter">
                    {weatherData.temp}°C
                  </span>
                  <div className="text-stone-300 text-xs sm:text-sm">
                    <div>
                      {lang === "te" ? weatherData.conditionTe : weatherData.condition}
                    </div>
                    <div>
                      Min: {weatherData.tempMin}°C | Max: {weatherData.tempMax}°C
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 Farm Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-300">
                    <Droplets className="w-3.5 h-3.5" />
                    <span>{t.weather.humidity}</span>
                  </div>
                  <div className="text-base font-bold mt-1">{weatherData.humidity}%</div>
                </div>

                <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-300">
                    <Wind className="w-3.5 h-3.5" />
                    <span>{t.weather.wind}</span>
                  </div>
                  <div className="text-base font-bold mt-1">{weatherData.windSpeed} km/h</div>
                </div>

                <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-300">
                    <CloudSun className="w-3.5 h-3.5" />
                    <span>{t.weather.rainChance}</span>
                  </div>
                  <div className="text-base font-bold mt-1">{weatherData.rainChance}%</div>
                </div>

                <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-300">
                    <Compass className="w-3.5 h-3.5" />
                    <span>{t.weather.soilMoisture}</span>
                  </div>
                  <div className="text-xs font-bold mt-1 line-clamp-1">
                    {lang === "te" ? weatherData.soilMoistureTe : weatherData.soilMoisture}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Actionable Farmer Decision Advisories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* 1. Spray Safety Window */}
            <div
              className={`p-6 rounded-2xl border transition space-y-3 ${
                weatherData.canSpray
                  ? "bg-emerald-50/80 border-emerald-300/80 text-emerald-950"
                  : "bg-rose-50/80 border-rose-300/80 text-rose-950"
              }`}
            >
              <div className="flex items-center gap-2">
                {weatherData.canSpray ? (
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                ) : (
                  <ShieldX className="w-5 h-5 text-rose-600" />
                )}
                <h3 className="font-extrabold text-sm uppercase tracking-wide">
                  {t.weather.sprayStatus}
                </h3>
              </div>

              <div
                className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                  weatherData.canSpray
                    ? "bg-emerald-200 text-emerald-900"
                    : "bg-rose-200 text-rose-900"
                }`}
              >
                {weatherData.canSpray ? t.weather.spraySafe : t.weather.sprayUnsafe}
              </div>

              <p className="text-xs leading-relaxed font-medium">
                {lang === "te" ? weatherData.sprayWindowTe : weatherData.sprayWindow}
              </p>
            </div>

            {/* 2. Irrigation Advisory */}
            <div className="p-6 rounded-2xl bg-blue-50/80 border border-blue-200 text-blue-950 space-y-3">
              <div className="flex items-center gap-2 text-blue-900">
                <Droplets className="w-5 h-5 text-blue-600" />
                <h3 className="font-extrabold text-sm uppercase tracking-wide">
                  {t.weather.irrigationAdvisory}
                </h3>
              </div>

              <p className="text-xs leading-relaxed font-medium text-blue-900">
                {lang === "te"
                  ? weatherData.irrigationAdvisoryTe
                  : weatherData.irrigationAdvisory}
              </p>
            </div>

            {/* 3. Micro-climate Disease Risk Alert */}
            <div className="p-6 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 space-y-3">
              <div className="flex items-center gap-2 text-amber-900">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <h3 className="font-extrabold text-sm uppercase tracking-wide">
                  {t.weather.pestRiskAlert}
                </h3>
              </div>

              <p className="text-xs leading-relaxed font-medium text-amber-900">
                {lang === "te" ? weatherData.pestWarningTe : weatherData.pestWarning}
              </p>
            </div>
          </div>

          {/* 5-Day Agro Forecast Table */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-700" />
              <span>{t.weather.fiveDayForecast}</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {weatherData.forecast?.map((day, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-center space-y-1"
                >
                  <div className="text-xs font-bold text-stone-800">
                    {lang === "te" ? day.dayTe : day.day}
                  </div>
                  <div className="text-sm font-extrabold text-emerald-800">
                    {day.temp}
                  </div>
                  <div className="text-[11px] text-stone-500 font-medium">
                    {lang === "te" ? day.condTe : day.cond}
                  </div>
                  <div className="text-[10px] font-semibold text-blue-600">
                    ☔ {day.rain}% rain
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
