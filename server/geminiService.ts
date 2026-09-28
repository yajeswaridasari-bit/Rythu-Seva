import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Server-side initialization of GoogleGenAI SDK with telemetry header
const apiKey = process.env.GEMINI_API_KEY || "";
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

export interface DiagnosisResult {
  cropName: { en: string; te: string };
  diseaseName: { en: string; te: string };
  scientificName?: string;
  isHealthy: boolean;
  severity: "mild" | "moderate" | "severe" | "healthy";
  confidenceScore: number;
  affectedPart: string;
  symptoms: {
    en: string[];
    te: string[];
  };
  organicRemedies: {
    en: string[];
    te: string[];
  };
  chemicalRemedies: {
    en: string[];
    te: string[];
    dosageEn: string;
    dosageTe: string;
  };
  preventiveMeasures: {
    en: string[];
    te: string[];
  };
  sprayAdvisory: {
    en: string;
    te: string;
  };
  audioSummary: {
    en: string;
    te: string;
  };
}

// Helper to run promise with timeout
function withTimeout<T>(promise: Promise<T>, ms: number = 8000, errorMsg: string = "AI request timed out"): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error(errorMsg)), ms)),
  ]);
}

export async function diagnoseCropWithGemini(params: {
  imageBase64?: string;
  mimeType?: string;
  cropHint?: string;
  symptomsText?: string;
  language?: "te" | "en";
}): Promise<DiagnosisResult> {
  const { imageBase64, mimeType = "image/jpeg", cropHint, symptomsText } = params;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured on the server");
  }

  const prompt = `You are a world-class senior agricultural pathologist and crop expert specializing in South Asian / Indian crops (especially Telangana and Andhra Pradesh crops like Paddy/Rice, Cotton, Chilli, Groundnut, Maize, Tomato, Red Gram, Turmeric, Sugarcane, Mango).

Analyze this crop ${imageBase64 ? "image" : "symptom description"} carefully.
${cropHint ? `Crop indicated by farmer: ${cropHint}.` : ""}
${symptomsText ? `Farmer symptoms note: ${symptomsText}.` : ""}

Determine:
1. Identified crop name in English and Telugu (తెలుగు).
2. Primary disease or pest infestation (or if healthy, specify healthy). Give both English and Telugu names (e.g. Rice Blast / అగ్గి తెగులు, Cotton Pink Bollworm / పత్తి గులాబీ రంగు పురుగు, Chilli Leaf Curl / మిర్చి ఆకు ముడత, Sheath Blight / కాండం కుళ్ళు తెగులు).
3. Scientific name of pathogen/pest if applicable.
4. Severity: 'mild', 'moderate', 'severe', or 'healthy'.
5. Confidence percentage (50 to 99).
6. Affected plant parts (Leaves, Stem, Pod/Fruit, Roots, Flower).
7. List 3 key visible symptoms in English and Telugu.
8. Organic / biological / natural remedies (e.g., Neem oil / వేప నూనె, Jeevamrutham / జీవామృతం, Trichoderma viride / ట్రైకోడెర్మా విరిడి, Pseudomonas fluorescens) with clear instructions in English and Telugu.
9. Chemical remedies with specific recommended agrochemical name, active ingredient, and exact safe dosage per 15-liter knapsack sprayer pump (e.g., Carbendazim 50% WP @ 20-25g per 15L pump or 1-1.5g per Liter water, Mancozeb, Hexaconazole, Chlorantraniliprole, etc.) in English and Telugu.
10. 3 long-term preventive measures in English and Telugu.
11. Weather/spray advisory (e.g. best time to spray, do not spray if rain is expected within 4 hours).
12. Short voice summary (2 sentences suitable for text-to-speech) in English and in Telugu.

Return the response strictly adhering to the JSON schema.`;

  const contents: any[] = [];

  // Only pass actual raster image data (JPEG, PNG, WEBP), skip SVG strings
  if (
    imageBase64 &&
    !imageBase64.startsWith("data:image/svg") &&
    !imageBase64.includes("<svg") &&
    !imageBase64.includes("%3Csvg")
  ) {
    contents.push({
      inlineData: {
        data: imageBase64.replace(/^data:image\/\w+;base64,/, ""),
        mimeType: mimeType.startsWith("image/svg") ? "image/jpeg" : mimeType,
      },
    });
  }

  contents.push({
    text: prompt,
  });

  const apiCall = ai.models.generateContent({
    model: "gemini-3.8-flash",
    contents,
    config: {
      systemInstruction:
        "You are RythuSeva AI, an empathetic agricultural scientist dedicated to empowering Indian farmers with accurate, safe, scientific, and organic/chemical crop disease solutions in both Telugu and English.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          cropName: {
            type: Type.OBJECT,
            properties: {
              en: { type: Type.STRING },
              te: { type: Type.STRING },
            },
            required: ["en", "te"],
          },
          diseaseName: {
            type: Type.OBJECT,
            properties: {
              en: { type: Type.STRING },
              te: { type: Type.STRING },
            },
            required: ["en", "te"],
          },
          scientificName: { type: Type.STRING },
          isHealthy: { type: Type.BOOLEAN },
          severity: {
            type: Type.STRING,
            description: "Must be one of: mild, moderate, severe, healthy",
          },
          confidenceScore: { type: Type.NUMBER },
          affectedPart: { type: Type.STRING },
          symptoms: {
            type: Type.OBJECT,
            properties: {
              en: { type: Type.ARRAY, items: { type: Type.STRING } },
              te: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["en", "te"],
          },
          organicRemedies: {
            type: Type.OBJECT,
            properties: {
              en: { type: Type.ARRAY, items: { type: Type.STRING } },
              te: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["en", "te"],
          },
          chemicalRemedies: {
            type: Type.OBJECT,
            properties: {
              en: { type: Type.ARRAY, items: { type: Type.STRING } },
              te: { type: Type.ARRAY, items: { type: Type.STRING } },
              dosageEn: { type: Type.STRING },
              dosageTe: { type: Type.STRING },
            },
            required: ["en", "te", "dosageEn", "dosageTe"],
          },
          preventiveMeasures: {
            type: Type.OBJECT,
            properties: {
              en: { type: Type.ARRAY, items: { type: Type.STRING } },
              te: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["en", "te"],
          },
          sprayAdvisory: {
            type: Type.OBJECT,
            properties: {
              en: { type: Type.STRING },
              te: { type: Type.STRING },
            },
            required: ["en", "te"],
          },
          audioSummary: {
            type: Type.OBJECT,
            properties: {
              en: { type: Type.STRING },
              te: { type: Type.STRING },
            },
            required: ["en", "te"],
          },
        },
        required: [
          "cropName",
          "diseaseName",
          "isHealthy",
          "severity",
          "confidenceScore",
          "affectedPart",
          "symptoms",
          "organicRemedies",
          "chemicalRemedies",
          "preventiveMeasures",
          "sprayAdvisory",
          "audioSummary",
        ],
      },
    },
  });

  const response = await withTimeout(apiCall, 8500, "Gemini diagnosis timed out");

  const text = response.text || "{}";
  const parsed = JSON.parse(text);

  // Normalize severity
  const severityVal = ["mild", "moderate", "severe", "healthy"].includes(
    parsed.severity?.toLowerCase()
  )
    ? (parsed.severity.toLowerCase() as any)
    : "moderate";

  return {
    ...parsed,
    severity: severityVal,
    confidenceScore: Math.min(Math.max(parsed.confidenceScore || 85, 50), 99),
  };
}

export async function askAgriAdvisorWithGemini(params: {
  question: string;
  cropContext?: string;
  language?: "te" | "en";
  chatHistory?: Array<{ role: "user" | "model"; text: string }>;
}): Promise<{ answerEn: string; answerTe: string; tips: string[] }> {
  const { question, cropContext, chatHistory = [] } = params;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured on the server");
  }

  const prompt = `Farmer query: "${question}"
${cropContext ? `Related crop: ${cropContext}` : ""}

Provide a very clear, supportive, and practical agricultural response for an Indian farmer.
Provide:
1. answerEn: Comprehensive advice in simple, practical English. Include dosages, timing, organic and chemical options if applicable.
2. answerTe: The exact same comprehensive advice translated into fluent, natural Telugu (స్పష్టమైన తెలుగులో వివరణ).
3. tips: 3 concise bullet tips for the farmer.

Output in strict JSON format.`;

  const contents: any[] = [];
  chatHistory.slice(-4).forEach((h) => {
    contents.push({
      role: h.role === "user" ? "user" : "model",
      parts: [{ text: h.text }],
    });
  });
  contents.push({
    role: "user",
    parts: [{ text: prompt }],
  });

  const apiCall = ai.models.generateContent({
    model: "gemini-3.8-flash",
    contents,
    config: {
      systemInstruction:
        "You are Rythu Mitra (రైతు మిత్ర), an expert agricultural scientist advising farmers in Andhra Pradesh and Telangana. You provide precise, non-commercial, scientifically approved advice adhering to ICAR and PJTSAU / ANGRAU universities guidelines.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          answerEn: { type: Type.STRING },
          answerTe: { type: Type.STRING },
          tips: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
        },
        required: ["answerEn", "answerTe", "tips"],
      },
    },
  });

  const response = await withTimeout(apiCall, 8500, "Gemini advisor timed out");
  const text = response.text || "{}";
  return JSON.parse(text);
}
