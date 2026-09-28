export type Language = "te" | "en";

export interface LocalizedString {
  en: string;
  te: string;
}

export interface LocalizedArray {
  en: string[];
  te: string[];
}

export interface DiagnosisData {
  cropName: LocalizedString;
  diseaseName: LocalizedString;
  scientificName?: string;
  isHealthy: boolean;
  severity: "mild" | "moderate" | "severe" | "healthy";
  confidenceScore: number;
  affectedPart: string;
  symptoms: LocalizedArray;
  organicRemedies: LocalizedArray;
  chemicalRemedies: {
    en: string[];
    te: string[];
    dosageEn: string;
    dosageTe: string;
  };
  preventiveMeasures: LocalizedArray;
  sprayAdvisory: LocalizedString;
  audioSummary: LocalizedString;
}

export interface CropCareGuide {
  id: string;
  name: LocalizedString;
  botanicalName: string;
  season: LocalizedString;
  duration: string;
  soil: LocalizedString;
  seedRate: LocalizedString;
  seedTreatment: LocalizedArray;
  fertilizerSchedule: {
    basal: LocalizedString;
    vegetative: LocalizedString;
    flowering: LocalizedString;
    fruiting: LocalizedString;
  };
  irrigation: LocalizedString;
  commonPestsAndDiseases: Array<{
    name: LocalizedString;
    symptoms: LocalizedString;
    solution: LocalizedString;
  }>;
  harvestingTips: LocalizedArray;
}

export interface WeatherForecastDay {
  day: string;
  dayTe: string;
  temp: string;
  rain: number;
  cond: string;
  condTe: string;
}

export interface DistrictWeather {
  temp: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  conditionTe: string;
  icon: string;
  rainChance: number;
  soilMoisture: string;
  soilMoistureTe: string;
  sprayWindow: string;
  sprayWindowTe: string;
  canSpray: boolean;
  irrigationAdvisory: string;
  irrigationAdvisoryTe: string;
  pestWarning: string;
  pestWarningTe: string;
  forecast: WeatherForecastDay[];
}

export interface MandiPriceItem {
  id: string;
  commodityEn: string;
  commodityTe: string;
  marketEn: string;
  marketTe: string;
  variety: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  mspPrice: number | null;
  unit: string;
  trend: "up" | "down" | "stable";
  date: string;
}

export interface GovScheme {
  id: string;
  title: LocalizedString;
  department: LocalizedString;
  benefit: LocalizedString;
  eligibility: LocalizedArray;
  howToApply: LocalizedString;
  link: string;
  badge: LocalizedString;
}
