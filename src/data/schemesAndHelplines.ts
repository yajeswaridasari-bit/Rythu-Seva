import { GovScheme } from "../types";

export const GOV_SCHEMES: GovScheme[] = [
  {
    id: "pm-kisan",
    title: {
      en: "PM-KISAN Samman Nidhi",
      te: "పీఎం-కిసాన్ సమ్మాన్ నిధి (PM-KISAN)",
    },
    department: {
      en: "Ministry of Agriculture & Farmers Welfare, Govt of India",
      te: "కేంద్ర వ్యవసాయ & రైతు సంక్షేమ మంత్రిత్వ శాఖ",
    },
    benefit: {
      en: "₹6,000 per year directly credited in 3 equal instalments of ₹2,000 to bank account via DBT.",
      te: "రైతు బ్యాంకు ఖాతాలో నేరుగా ఏటా ₹6,000 మూడు విడతల్లో (విడతకు ₹2,000 చొప్పున) జమ అవుతాయి.",
    },
    eligibility: {
      en: [
        "All landholding farmer families with cultivable land in their names.",
        "Aadhaar card linked to active bank account with e-KYC completed.",
        "Institutional landholders and high income taxpayers are excluded.",
      ],
      te: [
        "తమ పేరు మీద సాగుభూమి ఉన్న రైతుల కుటుంబాలందరికీ వర్తిస్తుంది.",
        "బ్యాంకు ఖాతాకు ఆధార్ కార్డు అనుసంధానమై e-KYC పూర్తి చేసి ఉండాలి.",
        "సంస్థాగత భూస్వాములు, ప్రభుత్వ ఉద్యోగులు మినహాయింపు.",
      ],
    },
    howToApply: {
      en: "Apply online at pmkisan.gov.in or visit your local Rythu Seva Kendram (RSK) / MeeSeva with land passbook, Aadhaar, and bank passbook.",
      te: "pmkisan.gov.in పోర్టల్ ద్వారా లేదా రైతు సేవా కేంద్రం (RSK) / మీసేవా కేంద్రంలో ఆధార్, పట్టాదారు పాస్‌బుక్‌తో దరఖాస్తు చేసుకోవచ్చు.",
    },
    link: "https://pmkisan.gov.in",
    badge: { en: "Direct Cash Benefit", te: "నేరుగా నగదు జమ" },
  },
  {
    id: "rythu-bharosa",
    title: {
      en: "Rythu Bharosa / Rythu Bandhu (State Support)",
      te: "రైతు భరోసా / రైతు బంధు (రాష్ట్ర ప్రభుత్వ పథకం)",
    },
    department: {
      en: "State Agriculture Departments (Andhra Pradesh & Telangana)",
      te: "వ్యవసాయ శాఖ (ఆంధ్రప్రదేశ్ & తెలంగాణ)",
    },
    benefit: {
      en: "Investment support of ₹10,000 - ₹13,500 per year per acre / beneficiary to meet input expenses (seeds, fertilizer).",
      te: "సాగు ఖర్చులు, విత్తనాలు, ఎరువుల కొనుగోలు కొరకు ఎకరానికి / లబ్ధిదారునికి ఏటా ₹10,000 - ₹13,500 పెట్టుబడి సాయం.",
    },
    eligibility: {
      en: [
        "Land-owning farmers and registered tenant farmers (ROFR forest patta holders and CCRC cards).",
        "Valid digital 1B / Pattadar Passbook registered on Dharani or Meebhoomi portal.",
      ],
      te: [
        "పట్టాదారు పాస్‌బుక్ కలిగిన రైతులు మరియు సిసిఆర్‌సి గుర్తింపు కార్డు పొందిన కౌలు రైతులు.",
        "ధరణి లేదా మీభూమి పోర్టల్‌లో నమోదైన భూయజమానులు.",
      ],
    },
    howToApply: {
      en: "Enrollment handled through Village Agriculture Assistants (VAA) at Rythu Seva Kendram or Agriculture Extension Officers (AEO).",
      te: "గ్రామ వ్యవసాయ సహాయకుడు (VAA) లేదా వ్యవసాయ విస్తరణ అధికారి (AEO) వద్ద వివరాలు నమోదు చేయించుకోవాలి.",
    },
    link: "https://ysrrythubharosa.ap.gov.in",
    badge: { en: "Investment Support", te: "పెట్టుబడి సాయం" },
  },
  {
    id: "pm-fasal-bima",
    title: {
      en: "PM Fasal Bima Yojana (PMFBY Crop Insurance)",
      te: "ప్రధాన మంత్రి ఫసల్ బీమా యోజన (పంటల బీమా)",
    },
    department: {
      en: "National Crop Insurance Portal (Govt of India)",
      te: "జాతీయ పంటల బీమా సంస్థ",
    },
    benefit: {
      en: "Comprehensive crop loss protection against drought, floods, cyclonic rains, and pest epidemics. Nominal premium (1.5% Rabi, 2% Kharif).",
      te: "కరువు, తుఫానులు, వరదలు మరియు పురుగుల వల్ల జరిగే పంట నష్టానికి పూర్తి పరిహారం. నామమాత్రపు ప్రీమియం (ఖరీఫ్‌కు 2%, రబీకి 1.5%).",
    },
    eligibility: {
      en: [
        "All farmers growing notified crops in notified areas (both loanee and non-loanee).",
        "Crop booking / e-Crop registration in respective state portals mandatory.",
      ],
      te: [
        "ప్రభుత్వం ప్రకటించిన పంటలు సాగుచేసే రైతులందరికీ వర్తిస్తుంది.",
        "ఈ-పంట (e-Crop) నమోదు తప్పనిసరిగా చేయించుకోవాలి.",
      ],
    },
    howToApply: {
      en: "Auto-enrolled through bank crop loans or apply via pmfby.gov.in or CSC before sowing cut-off date.",
      te: "బ్యాంకు పంట రుణం ఉన్నవారికి ఆటోమేటిక్‌గా నమోదు అవుతుంది; మిగిలిన వారు పోర్టల్ లేదా మీసేవాలో దరఖాస్తు చేసుకోవచ్చు.",
    },
    link: "https://pmfby.gov.in",
    badge: { en: "Risk Insurance", te: "పంట నష్ట పరిహారం" },
  },
  {
    id: "kisan-credit-card",
    title: {
      en: "Kisan Credit Card (KCC - Subsidized Agri Loan)",
      te: "కిసాన్ క్రెడిట్ కార్డు (తక్కువ వడ్డీ పంట రుణం)",
    },
    department: {
      en: "Reserve Bank of India & NABARD",
      te: "రిజర్వ్ బ్యాంక్ ఆఫ్ ఇండియా & నాబార్డ్",
    },
    benefit: {
      en: "Crop loan up to ₹3,00,000 at concessional 4% interest rate (with 3% prompt repayment incentive).",
      te: "సకాలంలో చెల్లిస్తే కేవలం 4% రాయితీ వడ్డీకే ₹3,00,000 వరకు సులభమైన పంట రుణం.",
    },
    eligibility: {
      en: [
        "Small & marginal farmers, tenant farmers, self-help groups, and dairy/fishery farmers.",
        "Satisfactory credit history and title verification.",
      ],
      te: [
        "చిన్న, సన్నకారు రైతులు, కౌలు రైతులు, పాడి రైతులు మరియు మత్స్యకారులు.",
        "పట్టాదారు పాస్‌బుక్ మరియు భూమి రికార్డులు కలిగి ఉండాలి.",
      ],
    },
    howToApply: {
      en: "Submit 1-page simplified KCC form at any Nationalized or Regional Rural Bank (e.g. APGVB, TGB, SBI, Union Bank) with land documents.",
      te: "మీ గ్రామీణ లేదా జాతీయ బ్యాంకు శాఖలో ఆధార్, పట్టాదారు పాస్‌బుక్‌తో 1-పేజీ దరఖాస్తు సమర్పించాలి.",
    },
    link: "https://www.myscheme.gov.in/schemes/kcc",
    badge: { en: "4% Low Interest Loan", te: "4% తక్కువ వడ్డీ రుణం" },
  },
  {
    id: "micro-irrigation",
    title: {
      en: "Micro-Irrigation Subsidy (Drip & Sprinkler)",
      te: "బిందు & తుంపర సేద్యం రాయితీ (Drip & Sprinkler)",
    },
    department: {
      en: "APMIP / TSMIP (State Micro Irrigation Project)",
      te: "సూక్ష్మ నీటిపారుదల ప్రాజెక్ట్ (APMIP / TSMIP)",
    },
    benefit: {
      en: "Up to 90% subsidy for SC/ST farmers and up to 70-80% for small/marginal farmers for installing ISI drip/sprinkler systems.",
      te: "ఎస్సీ/ఎస్టీ రైతులకు 90% వరకు రాయితీ; చిన్న, సన్నకారు రైతులకు 70-80% వరకు డ్రిప్ పరికరాలపై రాయితీ.",
    },
    eligibility: {
      en: [
        "Farmers having minimum 0.5 acre to 5 acres land with assured irrigation water source (borewell/canal/well).",
      ],
      te: [
        "బోరుబావి లేదా బావి వంటి నికరమైన నీటి వనరు ఉన్న 0.5 నుండి 5 ఎకరాల వరకు గల రైతులు.",
      ],
    },
    howToApply: {
      en: "Register at APMIP or TSMIP portal or through the Assistant Director of Horticulture (ADH) at mandal office.",
      te: "ఉద్యానవన శాఖ కార్యాలయంలో లేదా APMIP / TSMIP పోర్టల్‌లో దరఖాస్తు చేసుకోవాలి.",
    },
    link: "https://horticulture.tg.nic.in",
    badge: { en: "70-90% Subsidy", te: "70-90% రాయితీ" },
  },
];

export const EMERGENCY_HELPLINES = [
  {
    titleEn: "Kisan Call Centre (Govt of India)",
    titleTe: "కిసాన్ కాల్ సెంటర్ (కేంద్ర ప్రభుత్వం)",
    phone: "1800-180-1551",
    hoursEn: "Toll-Free, 6:00 AM - 10:00 PM (All 365 Days, English, Telugu & Local Languages)",
    hoursTe: "ఉచిత కాల్, ఉదయం 6 నుండి రాత్రి 10 వరకు (తెలుగు మరియు అన్ని భాషలలో సమాచారం)",
    badge: "National Toll-Free",
    icon: "phone-call",
  },
  {
    titleEn: "Andhra Pradesh Agri Helpline (RSK)",
    titleTe: "ఆంధ్రప్రదేశ్ వ్యవసాయ సమాచార కేంద్రం",
    phone: "155251",
    hoursEn: "24x7 Rythu Seva Kendram state helpline for seed, fertilizer, and procurement support.",
    hoursTe: "24 గంటలు విత్తనాలు, ఎరువులు, పంట కొనుగోలు సేవల హెల్ప్‌లైన్.",
    badge: "AP State",
    icon: "headset",
  },
  {
    titleEn: "Telangana Agri Advisory Service (PJTSAU)",
    titleTe: "తెలంగాణ అగ్రికల్చర్ యూనివర్సిటీ కిసాన్ కాల్ సెంటర్",
    phone: "1800-425-3502",
    hoursEn: "Direct advice from Agricultural University Scientists on pest control and weather.",
    hoursTe: "వ్యవసాయ శాస్త్రవేత్తలతో నేరుగా మాట్లాడి తెగుళ్ల నివారణ సలహాలు పొందండి.",
    badge: "Telangana State",
    icon: "graduation-cap",
  },
  {
    titleEn: "National Soil Health Testing Support",
    titleTe: "భూసార పరీక్ష కేంద్రాల సమాచారం",
    phone: "011-23381012",
    hoursEn: "Guidelines for testing N-P-K, micronutrients and organic carbon status.",
    hoursTe: "భూసార పరీక్ష చేసి సాయిల్ హెల్త్ కార్డు పొందడం కొరకు.",
    badge: "Soil Health",
    icon: "flask-conical",
  },
];
