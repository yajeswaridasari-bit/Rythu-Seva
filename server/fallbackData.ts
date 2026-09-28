import { DiagnosisResult } from "./geminiService";

export const FALLBACK_DISEASE_DB: Record<string, DiagnosisResult> = {
  rice_blast: {
    cropName: { en: "Paddy / Rice", te: "వరి (Paddy)" },
    diseaseName: { en: "Rice Blast (Pyricularia oryzae)", te: "వరి అగ్గి తెగులు (బ్లాస్ట్)" },
    scientificName: "Magnaporthe oryzae (Pyricularia oryzae)",
    isHealthy: false,
    severity: "severe",
    confidenceScore: 94,
    affectedPart: "Leaves, Collar, Neck, Node",
    symptoms: {
      en: [
        "Spindle-shaped or eye-shaped lesions with brown borders and grey/ash-white centers on leaves.",
        "Blackening and rotting of neck node leading to complete grain sterility (Neck Blast).",
        "Rapid spread during high humidity (>90%) and cool night temperatures (20-24°C).",
      ],
      te: [
        "ఆకులపై కంటి లేదా నూలు కండె ఆకారపు మచ్చలు ఏర్పడి, అంచులు గోధుమ రంగులో మధ్య భాగం బూడిద రంగులో ఉండటం.",
        "వెన్ను మెడ నల్లబడి కుళ్ళిపోవడం వల్ల గింజలు ఏర్పడకపోవడం (మెడ విరుపు లేదా మెడ బ్లాస్ట్).",
        "రాత్రి పూట చల్లని వాతావరణం, ఉదయం పొగమంచు మరియు అధిక తేమ ఉన్నప్పుడు వ్యాధి వేగంగా వ్యాపిస్తుంది.",
      ],
    },
    organicRemedies: {
      en: [
        "Spray 5% Neem Seed Kernel Extract (NSKE) or Neem oil @ 5ml per liter water with soap nut solution.",
        "Foliar spray of cow urine (10%) mixed with asafoetida (hing) solution at initial leaf spotting stage.",
        "Seed treatment with Trichoderma viride @ 10g/kg or Pseudomonas fluorescens @ 10g/kg seed before sowing.",
      ],
      te: [
        "5% వేప గింజల కషాయం (NSKE) లేదా వేప నూనె 5 మి.లీ లీటరు నీటికి కలిపి పిచికారీ చేయాలి.",
        "గోమూత్రం (10%) లో ఇంగువ కలిపిన ద్రావణాన్ని ప్రాథమిక దశలో పిచికారీ చేయాలి.",
        "విత్తేముందు ట్రైకోడెర్మా విరిడి 10 గ్రాములు లేదా సూడోమోనాస్ ఫ్లోరోసెన్స్ 10 గ్రాములు కిలో విత్తనానికి పట్టించి విత్తన శుద్ధి చేయాలి.",
      ],
    },
    chemicalRemedies: {
      en: [
        "Spray Tricyclazole 75% WP @ 0.6g/L (9g per 15-liter pump) OR Isoprothiolane 40% EC @ 1.5ml/L.",
        "For severe neck blast, apply Kasugamycin 3% SL @ 2ml/L or Tebuconazole + Trifloxystrobin @ 0.4g/L.",
      ],
      te: [
        "ట్రైసైక్లాజోల్ 75% WP ను 0.6 గ్రాములు లీటరు నీటికి (15 లీటర్ల ట్యాంకుకు 9 గ్రాములు) లేదా ఐసోప్రోథియోలేన్ 40% EC 1.5 మి.లీ పిచికారీ చేయాలి.",
        "తీవ్రమైన మెడ బ్లాస్ట్ కొరకు కాసుగామైసిన్ 3% SL 2 మి.లీ లేదా టెబుకొనజోల్ + ట్రైఫ్లాక్సీస్ట్రోబిన్ 0.4 గ్రా. పిచికారీ చేయాలి.",
      ],
      dosageEn: "Tricyclazole 75% WP: 9-10 grams per 15-liter backpack pump (120g per acre in 200L water)",
      dosageTe: "ట్రైసైక్లాజోల్ 75% WP: 15 లీటర్ల బ్యాక్‌ప్యాక్ పంపుకు 9-10 గ్రాములు (ఎకరానికి 120 గ్రాములు 200 లీటర్ల నీటిలో)",
    },
    preventiveMeasures: {
      en: [
        "Avoid excessive basal or top-dressing nitrogen (Urea) applications during foggy or cloudy weather.",
        "Use resistant / tolerant paddy varieties like RNR 15048 (Telangana Sona), MTU 1061, or BPT 5204 (with care).",
        "Maintain balanced potash (MOP) application to strengthen leaf epidermal silica layers.",
      ],
      te: [
        "మబ్బులు, పొగమంచు ఉన్న వాతావరణంలో యూరియా (నత్రజని) అధికంగా వేయడం నివారించాలి.",
        "బ్లాస్ట్ తట్టుకునే ఆర్ఎన్ఆర్ 15048 (తెలంగాణ సోనా), ఎంటీయూ 1061 వంటి రకాలను ఎంపిక చేసుకోవాలి.",
        "ఆకులపై సిలికా కవచం బలపడటానికి సిఫార్సు చేసిన పొటాష్ ఎరువులను సమతుల్యంగా వేయాలి.",
      ],
    },
    sprayAdvisory: {
      en: "Best sprayed in the afternoon (3 PM to 5 PM) on calm clear days. Do not spray if rain is expected within 3 hours.",
      te: "మధ్యాహ్నం 3 నుండి సాయంత్రం 5 గంటల మధ్య గాలి నెమ్మదిగా ఉన్నప్పుడు పిచికారీ చేయండి. రాబోయే 3 గంటల్లో వర్షం పడే అవకాశం ఉంటే పిచికారీ చేయకండి.",
    },
    audioSummary: {
      en: "Rice Blast detected. Apply Tricyclazole at 9 grams per 15-liter pump immediately to prevent neck blast grain loss, and reduce urea top dressing.",
      te: "వరి పంటలో అగ్గి తెగులు గుర్తించబడింది. వెన్ను విరుపును అరికట్టడానికి 15 లీటర్ల పంపుకు 9 గ్రాముల ట్రైసైక్లాజోల్ పిచికారీ చేయండి మరియు యూరియా తగ్గించండి.",
    },
  },

  cotton_pink_bollworm: {
    cropName: { en: "Cotton", te: "పత్తి (Cotton)" },
    diseaseName: { en: "Pink Bollworm (Pectinophora gossypiella)", te: "పత్తి గులాబీ రంగు పురుగు" },
    scientificName: "Pectinophora gossypiella",
    isHealthy: false,
    severity: "severe",
    confidenceScore: 92,
    affectedPart: "Squares, Flowers (Rosette appearance), Bolls, Lint",
    symptoms: {
      en: [
        "Rosette flowers: Petals twisted and sealed together by larval webbing.",
        "Small exit holes on developing green bolls with staining inside.",
        "Premature opening of bolls with stained, unmarketable lint and destroyed seeds.",
      ],
      te: [
        "పూత దశలో పువ్వులు ముడుచుకుపోయి గులాబీ పువ్వు ఆకారంలో (రోసెట్ పూలు) మారడం.",
        "కాయలపై చిన్న రంధ్రాలు పడి, కాయ లోపల తెగులు చేరి గింజలను పాడుచేయడం.",
        "పత్తి కాయలు సరిగ్గా విచ్చుకోక రంగు మారి నాణ్యత లేని దూదిగా మారడం.",
      ],
    },
    organicRemedies: {
      en: [
        "Install 4-5 Pheromone traps per acre for pest monitoring; increase to 8-10 traps per acre for mass trapping.",
        "Release Trichogramma bactrae egg parasitoids @ 60,000 per acre at weekly intervals (3-4 times).",
        "Spray 5% NSKE (Neem seed kernel extract) during early square formation stage to deter moth egg laying.",
      ],
      te: [
        "ఎకరానికి 4-5 లింగాకర్షక బుట్టలు (ఫెరమోన్ ట్రాప్స్) ఏర్పాటు చేసి పురుగుల ఉధృతిని గమనించాలి.",
        "ట్రైకోగ్రామా బ్రాక్టే పరాన్నజీవులను ఎకరానికి 60,000 చొప్పున వారం వ్యవధిలో 3-4 సార్లు పొలంలో విడుదల చేయాలి.",
        "తల్లి రెక్కల పురుగులు గుడ్లు పెట్టకుండా 5% వేప గింజల కషాయం పిచికారీ చేయాలి.",
      ],
    },
    chemicalRemedies: {
      en: [
        "When ETL crosses (8 moths/trap/day for 3 consecutive days or 10% rosette flowers), spray Chlorpyriphos 20% EC @ 2.5ml/L or Profenofos 50% EC @ 2ml/L.",
        "For boll stage penetration, spray Emamectin Benzoate 5% SG @ 0.5g/L (7.5g per 15L pump) or Spinetoram 11.7% SC @ 1ml/L.",
      ],
      te: [
        "ఆర్థిక నష్ట పరిమితి (రోజుకు ట్రాప్‌లో 8 పురుగులు లేదా 10% రోసెట్ పూలు) దాటినప్పుడు క్లోరిపైరిఫాస్ 2.5 మి.లీ లేదా ప్రోఫెనోఫాస్ 2 మి.లీ పిచికారీ చేయాలి.",
        "కాయ దశలో ఎమామెక్టిన్ బెంజోయేట్ 5% SG 0.5 గ్రాములు (15 లీటర్ల ట్యాంకుకు 7.5 గ్రాములు) లేదా స్పినెటోరమ్ 1 మి.లీ పిచికారీ చేయాలి.",
      ],
      dosageEn: "Emamectin Benzoate 5% SG: 7.5-8g per 15L pump (100g per acre in 200L water)",
      dosageTe: "ఎమామెక్టిన్ బెంజోయేట్ 5% SG: 15 లీటర్ల పంపుకు 7.5-8 గ్రాములు (ఎకరానికి 100 గ్రాములు 200 లీటర్ల నీటిలో)",
    },
    preventiveMeasures: {
      en: [
        "Strictly avoid extending cotton crop beyond 150-160 days (no ratooning).",
        "Deep summer ploughing to expose pupae in soil to scorching sunlight and birds.",
        "Destroy crop residues and do not stack dry cotton stalks near cultivation fields.",
      ],
      te: [
        "పత్తి పంటను 150-160 రోజులకు మించి పొడిగించరాదు (కత్తెర తోటలు లేదా పునరుత్పత్తి ఉంచవద్దు).",
        "వేసవిలో లోతు దుక్కులు చేసి కోశస్థ దశలో ఉన్న పురుగులను ఎండకు మరియు పక్షులకు గురిచేయాలి.",
        "పంట పూర్తయిన వెంటనే పత్తి కట్టెను కాల్చి లేదా రోటావేటర్‌తో భూమిలో కలియదున్నాలి.",
      ],
    },
    sprayAdvisory: {
      en: "Spray in late evening (after 4 PM) as pink bollworm moths are nocturnal and active at twilight.",
      te: "సాయంత్రం 4 గంటల తర్వాత పిచికారీ చేయండి, గులాబీ రంగు రెక్కల పురుగులు చీకటి పడే సమయంలో చురుకుగా ఉంటాయి.",
    },
    audioSummary: {
      en: "Pink Bollworm warning for Cotton. Install pheromone traps and spray Emamectin Benzoate at 8 grams per 15-liter pump in late evening.",
      te: "పత్తిలో గులాబీ రంగు పురుగు గమనించబడింది. లింగాకర్షక బుట్టలు ఏర్పాటు చేయండి మరియు సాయంత్రం వేళ ఎమామెక్టిన్ బెంజోయేట్ 8 గ్రాములు పంపుకు కలిపి పిచికారీ చేయండి.",
    },
  },

  chilli_leaf_curl: {
    cropName: { en: "Chilli / Mirchi", te: "మిర్చి (Chilli)" },
    diseaseName: { en: "Chilli Leaf Curl & Geminivirus / Thrips", te: "మిర్చి బొబ్బర / ఆకు ముడత (తామర పురుగులు & తెల్లదోమ)" },
    scientificName: "Chilli leaf curl virus (transmitted by Bemisia tabaci) / Scirtothrips dorsalis",
    isHealthy: false,
    severity: "severe",
    confidenceScore: 91,
    affectedPart: "Top Leaves, Shoots, Flower Buds",
    symptoms: {
      en: [
        "Upward leaf curling (boat-shaped) caused by thrips feeding; downward curling caused by mites.",
        "Thickening, puckering, and reduction in leaf size resembling a crinkled cluster.",
        "Stunted crop growth and severe reduction in flowering and fruit set.",
      ],
      te: [
        "ఆకులు పైకి దోనె ఆకారంలో ముడుచుకుపోవడం (తామర పురుగుల వల్ల); కిందికి ముడుచుకుపోవడం (నల్లి వల్ల).",
        "ఆకులు చిన్నవిగా మారి ముడతలు పడి గిడసబారిపోవడం (బొబ్బర రోగం).",
        "మొక్కల పెరుగుదల ఆగిపోయి పూత, కాయ రాలిపోవడం.",
      ],
    },
    organicRemedies: {
      en: [
        "Install 20-30 Yellow and Blue sticky traps per acre (Blue for thrips, Yellow for whiteflies).",
        "Foliar spray of 10,000 ppm Neem oil @ 2ml/L + Pongamia oil @ 2ml/L with mild surfactant.",
        "Spray Agniastra or Dashaparni Kashayam @ 20ml per liter water at 7-day intervals.",
      ],
      te: [
        "ఎకరానికి 20-30 పసుపు మరియు నీలి రంగు జిగురు అట్టలు అమర్చాలి (నీలి రంగు తామర పురుగులకు, పసుపు రంగు తెల్లదోమకు).",
        "వేప నూనె (10,000 ppm) 2 మి.లీ మరియు కానుగ నూనె 2 మి.లీ లీటరు నీటికి కలిపి పిచికారీ చేయాలి.",
        "అగ్నిఅస్త్రం లేదా దశపర్ణి కషాయం 20 మి.లీ లీటరు నీటికి కలిపి వారం వ్యవధిలో పిచికారీ చేయాలి.",
      ],
    },
    chemicalRemedies: {
      en: [
        "For Thrips control: Fipronil 5% SC @ 2ml/L OR Spinetoram 11.7% SC @ 1ml/L OR Tolfenpyrad 15% EC @ 1.5ml/L.",
        "For Mites (downward curl): Diafenthiuron 50% WP @ 1.25g/L or Spiromesifen 22.9% SC @ 1ml/L.",
        "For Whitefly vector: Acetamiprid 20% SP @ 0.2g/L or Pyriproxyfen 10% EC @ 2ml/L.",
      ],
      te: [
        "తామర పురుగుల నివారణకు: ఫిప్రోనిల్ 5% SC 2 మి.లీ లేదా స్పినెటోరమ్ 11.7% SC 1 మి.లీ లేదా టోల్ఫెన్‌పైరాడ్ 1.5 మి.లీ పిచికారీ చేయాలి.",
        "నల్లి నివారణకు (కింది ముడత): డయాఫెంథియురాన్ 1.25 గ్రాములు లేదా స్పైరోమెసిఫెన్ 1 మి.లీ పిచికారీ చేయాలి.",
        "తెల్లదోమ నివారణకు: ఎసిటామిప్రిడ్ 0.2 గ్రాములు లేదా పైరిప్రాక్సిఫెన్ 2 మి.లీ లీటరు నీటికి కలపాలి.",
      ],
      dosageEn: "Diafenthiuron 50% WP: 18-20 grams per 15L pump (150-200g per acre)",
      dosageTe: "డయాఫెంథియురాన్ 50% WP: 15 లీటర్ల ట్యాంకుకు 18-20 గ్రాములు (ఎకరానికి 150-200 గ్రాములు)",
    },
    preventiveMeasures: {
      en: [
        "Grow 2-3 border rows of Maize / Jowar / Bajra around the chilli plot to act as barrier crops against sucking pests.",
        "Avoid indiscriminate synthetic pyrethroid sprays that eliminate natural predators (ladybird beetles, chrysoperla).",
        "Provide optimum potassium and boron nutrition to enhance leaf toughness.",
      ],
      te: [
        "రసం పీల్చే పురుగులను నిరోధించడానికి మిర్చి పొలం చుట్టూ 2-3 వరుసల జొన్న లేదా మొక్కజొన్నను రక్షణ పంటగా వేయాలి.",
        "మిత్ర పురుగులను నశింపజేసే సింథటిక్ పైరెథ్రాయిడ్ మందులను విచక్షణారహితంగా వాడకూడదు.",
        "ఆకులు గట్టిపడటానికి అవసరమైన పొటాష్ మరియు బోరాన్ పోషకాలను సరైన సమయంలో అందించాలి.",
      ],
    },
    sprayAdvisory: {
      en: "Spray thoroughly covering the underside of leaves during morning hours (7 AM - 10 AM) or late afternoon.",
      te: "ఉదయం 7 నుండి 10 గంటల మధ్య లేదా సాయంత్రం వేళ ఆకుల అడుగు భాగాన బాగా తడిసేలా పిచికారీ చేయాలి.",
    },
    audioSummary: {
      en: "Chilli leaf curl and thrips detected. Install blue and yellow sticky traps, and spray Diafenthiuron or Fipronil with thorough underside leaf coverage.",
      te: "మిర్చిలో ఆకు ముడత మరియు తామర పురుగులు ఉన్నాయి. జిగురు అట్టలు కట్టండి మరియు డయాఫెంథియురాన్ లేదా ఫిప్రోనిల్ ఆకుల అడుగున తడిసేలా పిచికారీ చేయండి.",
    },
  },

  groundnut_tikka: {
    cropName: { en: "Groundnut", te: "వేరుశనగ (Groundnut)" },
    diseaseName: { en: "Tikka Disease / Leaf Spot (Cercospora)", te: "వేరుశనగ తిక్కా తెగులు / ఆకుమచ్చ తెగులు" },
    scientificName: "Cercospora personata / Cercospora arachidicola",
    isHealthy: false,
    severity: "moderate",
    confidenceScore: 90,
    affectedPart: "Lower Leaves, Upper Foliage, Pegs",
    symptoms: {
      en: [
        "Early leaf spot: Circular reddish-brown spots with prominent bright yellow halos.",
        "Late leaf spot: Dark brown or black circular spots mostly on lower leaf surface without prominent halos.",
        "Premature severe defoliation resulting in poorly filled pods and reduced oil content.",
      ],
      te: [
        "ఆకులపై గుండ్రటి ముదురు గోధుమ లేదా నల్లటి మచ్చలు ఏర్పడి చుట్టూ పసుపు రంగు వలయం ఉండటం.",
        "ఆకులు పసుపుబారి రాలిపోవడం వలన మొక్కలు మోడుబారి కాయ ఊరకపోవడం.",
        "తీవ్రమైన దశలో కాయల బరువు మరియు నూనె శాతం గణనీయంగా తగ్గడం.",
      ],
    },
    organicRemedies: {
      en: [
        "Spray 5% Neem leaf extract or 5ml Neem oil/L at the first appearance of leaf spots.",
        "Apply fermented cow urine (10%) mixed with Panchagavya (3%) as a foliar immunity booster.",
        "Seed treatment with Trichoderma harzianum @ 8g per kg seed at sowing.",
      ],
      te: [
        "మొదటిసారి మచ్చలు కనిపించగానే 5% వేప ఆకుల కషాయం లేదా వేప నూనె 5 మి.లీ లీటరు నీటికి పిచికారీ చేయాలి.",
        "పంచగవ్య (3%) లేదా పులిసిన గోమూత్రం ద్రావణం పిచికారీ చేసి మొక్క రోగనిరోధక శక్తిని పెంచాలి.",
        "విత్తేముందు ట్రైకోడెర్మా హార్జియానమ్ 8 గ్రాములు కిలో విత్తనానికి పట్టించాలి.",
      ],
    },
    chemicalRemedies: {
      en: [
        "Spray Mancozeb 75% WP @ 2.5g/L OR Chlorothalonil 75% WP @ 2g/L at initial stage.",
        "For combined Tikka and Rust control: Spray Tebuconazole 25.9% EC @ 1ml/L OR Hexaconazole 5% EC @ 2ml/L.",
      ],
      te: [
        "ప్రారంభ దశలో మాంకోజెబ్ 75% WP 2.5 గ్రాములు లేదా క్లోరోథలోనిల్ 2 గ్రాములు లీటరు నీటికి పిచికారీ చేయాలి.",
        "తిక్కా మరియు తుప్పు తెగులు రెండూ ఉంటే: టెబుకొనజోల్ 1 మి.లీ లేదా హెక్సాకొనజోల్ 5% EC 2 మి.లీ లీటరు నీటికి కలపాలి.",
      ],
      dosageEn: "Tebuconazole 25.9% EC: 15ml per 15L pump (200ml per acre in 200L water)",
      dosageTe: "టెబుకొనజోల్ 25.9% EC: 15 లీటర్ల ట్యాంకుకు 15 మి.లీ (ఎకరానికి 200 మి.లీ 200 లీటర్ల నీటిలో)",
    },
    preventiveMeasures: {
      en: [
        "Practice crop rotation with Maize, Jowar, or Bajra instead of continuous groundnut cropping.",
        "Collect and destroy crop debris immediately after harvest to eliminate fungal overwintering.",
        "Maintain appropriate plant spacing (30cm x 10cm) for adequate aeration in the crop canopy.",
      ],
      te: [
        "నిరంతరం వేరుశనగ వేయకుండా మొక్కజొన్న లేదా జొన్నతో పంట మార్పిడి చేయాలి.",
        "పంట కోసిన వెంటనే మిగిలిన వ్యర్థాలను కాల్చి లేదా భూమిలో కలియదున్ని శిలీంధ్రాలను నివారించాలి.",
        "మొక్కల మధ్య సరైన దూరం (30 సెం.మీ x 10 సెం.మీ) పాటించి గాలి, వెలుతురు సోకేలా చూడాలి.",
      ],
    },
    sprayAdvisory: {
      en: "Spray when foliage is dry after morning dew evaporates, around 10 AM to 12 PM or 3 PM to 5 PM.",
      te: "ఉదయం మంచు ఆరిపోయిన తర్వాత (ఉదయం 10 నుండి 12 వరకు లేదా మధ్యాహ్నం 3 నుండి 5 వరకు) పిచికారీ చేయండి.",
    },
    audioSummary: {
      en: "Groundnut Tikka leaf spot detected. Spray Tebuconazole at 15ml per 15-liter pump and ensure good aeration between plants.",
      te: "వేరుశనగలో తిక్కా ఆకుమచ్చ తెగులు ఉంది. 15 లీటర్ల పంపుకు 15 మి.లీ టెబుకొనజోల్ కలిపి పిచికారీ చేయండి.",
    },
  },

  healthy_crop: {
    cropName: { en: "Field Crop", te: "పంట క్షేత్రం" },
    diseaseName: { en: "Healthy Crop - No Major Disease Detected", te: "ఆరోగ్యకరమైన పంట - ఎటువంటి తెగుళ్లు లేవు" },
    scientificName: "Healthy vegetation status",
    isHealthy: true,
    severity: "healthy",
    confidenceScore: 97,
    affectedPart: "None",
    symptoms: {
      en: [
        "Vibrant green leaf pigmentation with uniform chloroplast development.",
        "Clean stems and foliage with no visible fungal lesions, insect boring, or chlorosis.",
        "Active apical vegetative and reproductive growth.",
      ],
      te: [
        "సహజసిద్ధమైన పచ్చదనంతో ఆరోగ్యంగా ఉన్న ఆకులు.",
        "ఎటువంటి మచ్చలు, రంధ్రాలు లేదా ముడతలు లేని కాండం మరియు ఆకులు.",
        "మొక్క ఆరోగ్యకరంగా ఎదుగుతూ పిలకలు / పూత దశలో ఉంది.",
      ],
    },
    organicRemedies: {
      en: [
        "Continue preventive Jeevamrutham application @ 200 liters per acre with irrigation water every 15 days.",
        "Spray 1% Panchagavya or 3% seaweed extract as a growth booster during flowering transition.",
      ],
      te: [
        "ప్రతి 15 రోజులకు ఒకసారి నీటితో పాటు ఎకరానికి 200 లీటర్ల జీవామృతం అందించండి.",
        "పూత దశలో 1% పంచగవ్య లేదా సీవీడ్ ఎక్స్‌ట్రాక్ట్ పిచికారీ చేసి దిగుబడిని పెంచండి.",
      ],
    },
    chemicalRemedies: {
      en: [
        "No chemical spray required at this stage. Avoid prophylactic pesticide applications to conserve beneficial predators.",
        "Apply recommended top-dress fertilizer (e.g. Potash or Micronutrient Zinc/Boron) as per scheduled stage.",
      ],
      te: [
        "ప్రస్తుతం ఎటువంటి రసాయన మందులు పిచికారీ చేయవలసిన అవసరం లేదు.",
        "షెడ్యూల్ ప్రకారం అవసరమైన సూక్ష్మ పోషకాలు (జింక్ లేదా బోరాన్) లేదా పొటాష్ ఎరువులు మాత్రమే వేయండి.",
      ],
      dosageEn: "None required - save input costs",
      dosageTe: "రసాయన పిచికారీ అవసరం లేదు - ఖర్చు ఆదా చేసుకోండి",
    },
    preventiveMeasures: {
      en: [
        "Monitor the crop regularly (twice a week) by walking along field diagonals.",
        "Maintain optimal soil moisture - avoid both waterlogging and extreme moisture stress.",
        "Keep bunds weed-free to deny alternate shelter to sucking pests.",
      ],
      te: [
        "వారానికి రెండుసార్లు పొలం చుట్టూ తిరిగి పంటను గమనించండి.",
        "నీరు నిల్వ ఉండకుండా మరియు బెట్టకు గురికాకుండా తేమను సరిగ్గా నిర్వహించండి.",
        "గట్లపై కలుపు మొక్కలు లేకుండా శుభ్రంగా ఉంచండి.",
      ],
    },
    sprayAdvisory: {
      en: "Favorable conditions. Continue routine field monitoring.",
      te: "వాతావరణం అనుకూలంగా ఉంది. క్రమం తప్పకుండా పొలాన్ని పరిశీలించండి.",
    },
    audioSummary: {
      en: "Great news! Your crop is healthy with no significant disease detected. Keep up balanced nutrition and routine field monitoring.",
      te: "శుభవార్త! మీ పంట ఎటువంటి తెగుళ్లు లేకుండా ఆరోగ్యంగా ఉంది. రసాయన పిచికారీ అవసరం లేదు, జీవామృతం అందిస్తూ ఉండండి.",
    },
  },
};
