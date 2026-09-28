import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Store,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { Language, MandiPriceItem } from "../types";
import { TRANSLATIONS } from "../data/translations";

interface MandiPricesProps {
  lang: Language;
}

export const MandiPrices: React.FC<MandiPricesProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [prices, setPrices] = useState<MandiPriceItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchMandiPrices();
  }, []);

  const fetchMandiPrices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/mandi-prices");
      const json = await res.json();
      if (json.prices) {
        setPrices(json.prices);
      }
    } catch (err) {
      console.error("Failed to load mandi prices:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredPrices = prices.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.commodityEn.toLowerCase().includes(q) ||
      p.commodityTe.toLowerCase().includes(q) ||
      p.marketEn.toLowerCase().includes(q) ||
      p.marketTe.toLowerCase().includes(q) ||
      p.variety.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold mb-3 border border-amber-200">
          <TrendingUp className="w-3.5 h-3.5 text-amber-700" />
          <span>APMC Market Committee Rates</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-serif">
          {t.mandi.title}
        </h1>
        <p className="mt-2 text-stone-600 text-sm sm:text-base leading-relaxed">
          {t.mandi.subtitle}
        </p>

        {/* Search */}
        <div className="max-w-md mx-auto mt-6 relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.mandi.searchPlaceholder}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white shadow-2xs"
          />
        </div>
      </div>

      {loading ? (
        <div className="p-12 text-center">
          <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-stone-500 font-semibold">Loading live market arrivals...</p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPrices.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs hover:border-emerald-600 transition space-y-4 relative"
              >
                {/* Top: Commodity & Market */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-extrabold text-stone-900">
                      {lang === "te" ? item.commodityTe : item.commodityEn}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-bold mt-0.5">
                      <Store className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{lang === "te" ? item.marketTe : item.marketEn}</span>
                    </div>
                    <div className="text-[11px] text-stone-500 italic mt-0.5">
                      {item.variety}
                    </div>
                  </div>

                  {/* Trend Indicator */}
                  <div
                    className={`px-2 py-1 rounded-lg text-xs font-extrabold flex items-center gap-1 ${
                      item.trend === "up"
                        ? "bg-emerald-100 text-emerald-800"
                        : item.trend === "down"
                        ? "bg-rose-100 text-rose-800"
                        : "bg-stone-100 text-stone-700"
                    }`}
                  >
                    {item.trend === "up" && <ArrowUpRight className="w-3.5 h-3.5" />}
                    {item.trend === "down" && <ArrowDownRight className="w-3.5 h-3.5" />}
                    {item.trend === "stable" && <Minus className="w-3.5 h-3.5" />}
                    <span>
                      {item.trend === "up"
                        ? t.mandi.trendUp
                        : item.trend === "down"
                        ? t.mandi.trendDown
                        : t.mandi.trendStable}
                    </span>
                  </div>
                </div>

                {/* Modal Price Highlight */}
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200/80 flex items-baseline justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wide">
                      {t.mandi.modalPrice}
                    </div>
                    <div className="text-2xl font-black text-stone-900 mt-0.5">
                      ₹{item.modalPrice.toLocaleString("en-IN")}
                    </div>
                  </div>
                  <div className="text-right text-xs text-stone-500 font-medium">
                    {item.unit}
                  </div>
                </div>

                {/* Min, Max, MSP Stats */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-stone-100">
                  <div>
                    <span className="text-stone-500">Min - Max: </span>
                    <span className="font-bold text-stone-800">
                      ₹{item.minPrice} - ₹{item.maxPrice}
                    </span>
                  </div>
                  {item.mspPrice ? (
                    <div className="text-right">
                      <span className="text-stone-500">MSP: </span>
                      <span className="font-bold text-emerald-700">
                        ₹{item.mspPrice}
                      </span>
                    </div>
                  ) : (
                    <div className="text-right text-stone-400">Commercial</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-stone-500 text-center pt-4">
            {t.mandi.disclaimer}
          </p>
        </div>
      )}
    </div>
  );
};
