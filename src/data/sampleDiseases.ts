export interface SampleDiseaseCase {
  id: string;
  cropNameEn: string;
  cropNameTe: string;
  diseaseEn: string;
  diseaseTe: string;
  imageThumbnail: string; // SVG data URI or crisp preview
  badgeColor: string;
  hint: string;
  symptomsNote: string;
}

export const SAMPLE_DISEASE_CASES: SampleDiseaseCase[] = [
  {
    id: "case-rice-blast",
    cropNameEn: "Rice / Paddy",
    cropNameTe: "వరి (Paddy)",
    diseaseEn: "Rice Blast (Spindle spots on leaves)",
    diseaseTe: "వరి అగ్గి తెగులు (కంటి ఆకారపు మచ్చలు)",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
    imageThumbnail: "🌾",
    hint: "Rice",
    symptomsNote: "Spindle shaped lesions with brown margins, grey center on leaves. High humidity conditions.",
  },
  {
    id: "case-cotton-bollworm",
    cropNameEn: "Cotton",
    cropNameTe: "పత్తి (Cotton)",
    diseaseEn: "Pink Bollworm & Rosette Flowers",
    diseaseTe: "పత్తి గులాబీ రంగు పురుగు",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-300",
    imageThumbnail: "🌸",
    hint: "Cotton",
    symptomsNote: "Rosette flowers twisted shut, small larval entry holes on green developing bolls.",
  },
  {
    id: "case-chilli-curl",
    cropNameEn: "Chilli / Mirchi",
    cropNameTe: "మిర్చి (Chilli)",
    diseaseEn: "Leaf Curl Virus & Thrips Infestation",
    diseaseTe: "మిర్చి బొబ్బర రోగం & తామర పురుగులు",
    badgeColor: "bg-red-100 text-red-800 border-red-300",
    imageThumbnail: "🌶️",
    hint: "Chilli",
    symptomsNote: "Upward boat shaped curling, puckered leaves, silvering underneath, stunted top canopy.",
  },
  {
    id: "case-groundnut-tikka",
    cropNameEn: "Groundnut",
    cropNameTe: "వేరుశనగ (Groundnut)",
    diseaseEn: "Tikka Leaf Spot (Cercospora)",
    diseaseTe: "వేరుశనగ తిక్కా ఆకుమచ్చ తెగులు",
    badgeColor: "bg-orange-100 text-orange-800 border-orange-300",
    imageThumbnail: "🥜",
    hint: "Groundnut",
    symptomsNote: "Dark circular spots with prominent yellow halos on foliage, premature leaf dropping.",
  },
  {
    id: "case-healthy-crop",
    cropNameEn: "Healthy Field",
    cropNameTe: "ఆరోగ్యకరమైన పంట",
    diseaseEn: "Healthy Vegetation Check",
    diseaseTe: "ఆరోగ్యకరమైన పంట స్థితి",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    imageThumbnail: "🌱",
    hint: "Healthy Crop",
    symptomsNote: "Vibrant green leaves, uniform growth, no visible lesions, checking preventive booster dose.",
  },
];
