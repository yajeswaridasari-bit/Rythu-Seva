import { CropCareGuide } from "../types";

export const CROP_CARE_GUIDES: CropCareGuide[] = [
  {
    id: "paddy",
    name: { en: "Paddy / Rice", te: "వరి (Paddy)" },
    botanicalName: "Oryza sativa",
    season: { en: "Kharif (June-Nov) & Rabi (Nov-April)", te: "ఖరీఫ్ (జూన్-నవంబర్) & రబీ (నవంబర్-ఏప్రిల్)" },
    duration: "120 - 145 Days",
    soil: {
      en: "Clayey or heavy alluvial soils with good water-holding capacity and pH 5.5 - 7.0.",
      te: "నీటిని నిలుపుకునే బంకమట్టి, ఒండ్రు నేలలు, ఉదజని సూచిక (pH) 5.5 నుండి 7.0.",
    },
    seedRate: {
      en: "20 - 25 kg/acre for direct sowing or transplanting; 5 kg/acre for SRI method.",
      te: "సాధారణ నాట్లకు ఎకరానికి 20-25 కిలోలు; శ్రీ వరి పద్ధతికి 5 కిలోలు.",
    },
    seedTreatment: {
      en: [
        "Soak seeds in Carbendazim solution @ 2g per liter water for 24 hours to prevent seed-borne blast.",
        "For organic farming: Treat with Pseudomonas fluorescens @ 10g/kg seed or Beejamrutham.",
        "Incubate soaked seeds in moist gunny bags for 24 hours to ensure healthy uniform sprouting.",
      ],
      te: [
        "విత్తనాలకు కార్బండైజిమ్ 2 గ్రాములు లీటరు నీటికి కలిపి 24 గంటలు నానబెట్టి అగ్గి తెగులును అరికట్టాలి.",
        "సేంద్రీయ పద్ధతిలో: సూడోమోనాస్ ఫ్లోరోసెన్స్ 10 గ్రాములు కిలో విత్తనానికి పట్టించాలి లేదా బీజామృతం వాడాలి.",
        "మొలక శాతం పెరగడానికి నానబెట్టిన విత్తనాలను తడి గోనె సంచులలో 24 గంటలు ఉంచాలి.",
      ],
    },
    fertilizerSchedule: {
      basal: {
        en: "Apply 50 kg DAP + 25 kg MOP (Potash) + 10 kg Zinc Sulphate per acre during last puddling.",
        te: "ఆఖరి దుక్కిలో ఎకరానికి 50 కిలోల డీఏపీ + 25 కిలోల పొటాష్ + 10 కిలోల జింక్ సల్ఫేట్ వేయాలి.",
      },
      vegetative: {
        en: "20-25 days after transplanting (tillering): Top dress 30 kg Urea per acre.",
        te: "నాట్లు వేసిన 20-25 రోజులకు (పిలకలు పెట్టే దశ): 30 కిలోల యూరియాను వేయాలి.",
      },
      flowering: {
        en: "40-45 days (panicle initiation): Top dress 30 kg Urea + 15 kg MOP (Potash).",
        te: "40-45 రోజులకు (చిరుపొట్ట దశ): 30 కిలోల యూరియా + 15 కిలోల పొటాష్ అందించాలి.",
      },
      fruiting: {
        en: "Grain filling stage: Spray 13:0:45 (Potassium Nitrate) @ 10g/L or Panchagavya 3% for bold grains.",
        te: "గింజ పాలుపోసుకునే దశలో 13:0:45 పొటాషియం నైట్రేట్ 10 గ్రాములు లీటరు నీటికి కలిపి పిచికారీ చేయాలి.",
      },
    },
    irrigation: {
      en: "Maintain thin film of water (2 cm) for 10 days after transplanting, then 3-5 cm until grain hardening. Drain water 7-10 days before harvest.",
      te: "నాట్లు వేసిన మొదటి 10 రోజులు 2 సెం.మీ మేర పలుచటి నీరు ఉంచాలి. తర్వాత 3-5 సెం.మీ నీరు నిలపాలి. కోతకు 7-10 రోజుల ముందు నీటిని పూర్తిగా తీసివేయాలి.",
    },
    commonPestsAndDiseases: [
      {
        name: { en: "Stem Borer (Dead Heart & White Ear)", te: "కాండం తొలిచే పురుగు" },
        symptoms: {
          en: "Drying of central tiller (dead heart) during vegetative stage; white empty panicles at flowering.",
          te: "పిలకల దశలో కాండం లోపలికి తొలిచి చనిపోవడం (డెడ్ హార్ట్), వెన్ను దశలో తెల్ల కంకులు రావడం.",
        },
        solution: {
          en: "Apply Cartap Hydrochloride 4G granules @ 8kg/acre or Chlorantraniliprole 18.5% SC @ 0.3ml/L water.",
          te: "కార్టాప్ హైడ్రోక్లోరైడ్ 4G గుళికలు ఎకరానికి 8 కిలోలు లేదా క్లోరాంట్రానిలిప్రోల్ 0.3 మి.లీ పిచికారీ చేయాలి.",
        },
      },
      {
        name: { en: "Brown Plant Hopper (BPH / Hopper Burn)", te: "సుడిదోమ (బి.పి.హెచ్)" },
        symptoms: {
          en: "Circular patches of dried, golden-yellow scorched tillers resembling burnt spots in the field.",
          te: "పొలంలో గుండ్రటి వలయాలలో మొక్కలు ఎండిపోయి అగ్నితో కాలినట్లు కనిపించడం.",
        },
        solution: {
          en: "Alleyways (30cm spacing every 2 meters); Spray Triflumezopyrim 10% SC @ 0.5ml/L or Pymetrozine 50% WG @ 0.6g/L.",
          te: "పొలంలో బాటలు తీయాలి; ట్రైఫ్లూమెజోపైరిమ్ 0.5 మి.లీ లేదా పైమెట్రోజిన్ 0.6 గ్రాములు లీటరు నీటికి పిచికారీ చేయాలి.",
        },
      },
    ],
    harvestingTips: {
      en: [
        "Harvest when 80-85% of grains in the panicle turn golden yellow and straw is still slightly green.",
        "Ensure grain moisture is reduced to 13-14% by sun-drying before storing in clean silos or gunny bags.",
        "Avoid harvesting over-ripe crops to prevent heavy shattering losses.",
      ],
      te: [
        "వెన్నుల్లో 80-85% గింజలు పసుపు బంగారు రంగులోకి మారినప్పుడు పంట కోత కోయాలి.",
        "నిల్వ చేసేముందు ధాన్యాన్ని ఎండబెట్టి తేమ శాతాన్ని 13-14% కి తగ్గించాలి.",
        "పంట బాగా ముదిరిన తర్వాత కోస్తే గింజ రాలిపోయే ప్రమాదం ఉంటుంది.",
      ],
    },
  },

  {
    id: "cotton",
    name: { en: "Cotton", te: "పత్తి (Cotton)" },
    botanicalName: "Gossypium hirsutum",
    season: { en: "Kharif (June - July sowing)", te: "ఖరీఫ్ (జూన్ - జూలై)" },
    duration: "150 - 170 Days",
    soil: {
      en: "Deep black cotton soils (Vertisols) or well-drained loams with pH 6.5 - 8.0.",
      te: "లోతైన నల్లరేగడి నేలలు లేదా నీరు ఇంకే ఎర్ర గరప నేలలు (pH 6.5 - 8.0).",
    },
    seedRate: {
      en: "1.5 - 2.0 kg hybrid seeds per acre (spaced 3 ft x 3 ft or 4 ft x 1.5 ft).",
      te: "ఎకరానికి 1.5 నుండి 2 కిలోల హైబ్రిడ్ విత్తనాలు (3x3 అడుగులు లేదా 4x1.5 అడుగుల దూరం).",
    },
    seedTreatment: {
      en: [
        "Delinting with concentrated H2SO4 (100ml/kg seed) followed by cold water wash.",
        "Treat with Imidacloprid 70% WS @ 5g/kg to manage early sucking pests (jassids/thrips).",
        "Bio-inoculation with Azospirillum @ 50g/kg seed.",
      ],
      te: [
        "విత్తనాల రంపపు పీచు తొలగించడానికి గాఢ గంధకపు ఆమ్లంతో విత్తన శుద్ధి చేయాలి.",
        "రసం పీల్చే పురుగుల నివారణకు ఇమిడాక్లోప్రిడ్ 70% WS 5 గ్రాములు కిలో విత్తనానికి పట్టించాలి.",
        "అజోస్పైరిల్లమ్ 50 గ్రాములు కిలో విత్తనానికి పట్టించి జీవ ఎరువుగా వాడాలి.",
      ],
    },
    fertilizerSchedule: {
      basal: {
        en: "Apply 50 kg DAP + 25 kg MOP + 10 kg Zinc Sulphate + 5 tonnes FYM per acre at planting.",
        te: "నాటేటప్పుడు ఎకరానికి 50 కిలోల డీఏపీ + 25 కిలోల పొటాష్ + 10 కిలోల జింక్ + 5 టన్నుల పశువుల ఎరువు.",
      },
      vegetative: {
        en: "30 days after sowing: 25 kg Urea + 15 kg MOP side placement followed by earthing up.",
        te: "30 రోజులకు: 25 కిలోల యూరియా + 15 కిలోల పొటాష్ మొక్కల మొదళ్ల వద్ద వేసి మట్టి ఎగదోయాలి.",
      },
      flowering: {
        en: "60 days: 30 kg Urea + 15 kg MOP. Foliar spray 19:19:19 @ 5g/L during square formation.",
        te: "60 రోజులకు: 30 కిలోల యూరియా + 15 కిలోల పొటాష్; పూత దశలో 19:19:19 ఎరువు 5 గ్రాములు పిచికారీ చేయాలి.",
      },
      fruiting: {
        en: "90 days (boll development): Spray 1% Potassium Nitrate (13:0:45) + 0.1% Boron to stop flower/boll drop.",
        te: "90 రోజులకు: కాయల రాలడం ఆపడానికి 1% పొటాషియం నైట్రేట్ (13:0:45) మరియు 0.1% బోరాన్ పిచికారీ చేయాలి.",
      },
    },
    irrigation: {
      en: "Critical stages: Square formation, flowering, and boll development. Avoid moisture stress at flowering. Waterlogging causes severe square shedding.",
      te: "ముఖ్యమైన తడులు: పూమొగ్గ దశ, పూత దశ మరియు కాయల ఎదుగుదల దశ. నీరు నిల్వ ఉంటే పూత విపరీతంగా రాలిపోతుంది.",
    },
    commonPestsAndDiseases: [
      {
        name: { en: "Sucking Pests (Jassids & Thrips)", te: "పచ్చదోమ & తామర పురుగులు" },
        symptoms: {
          en: "Leaves curl downwards, edges turn yellow and red with hopper burn symptoms.",
          te: "ఆకుల అంచులు పసుపు మరియు ఎరుపు రంగులోకి మారి కిందికి ముడుచుకుపోవడం.",
        },
        solution: {
          en: "Spray Flonicamid 50% WG @ 0.3g/L or Diafenthiuron 50% WP @ 1.25g/L.",
          te: "ఫ్లోనికామిడ్ 0.3 గ్రాములు లేదా డయాఫెంథియురాన్ 1.25 గ్రాములు లీటరు నీటికి కలపాలి.",
        },
      },
      {
        name: { en: "Pink Bollworm", te: "గులాబీ రంగు పురుగు" },
        symptoms: {
          en: "Rosette flowers, internal feeding in green bolls, stained lint.",
          te: "రోసెట్ పూలు, పత్తి కాయలలో రంధ్రాలు మరియు దూది రంగు మారడం.",
        },
        solution: {
          en: "Install pheromone traps (5/acre); Spray Emamectin Benzoate 5% SG @ 0.5g/L water.",
          te: "ఫెరమోన్ ట్రాప్స్ అమర్చాలి; ఎమామెక్టిన్ బెంజోయేట్ 0.5 గ్రాములు పిచికారీ చేయాలి.",
        },
      },
    ],
    harvestingTips: {
      en: [
        "Pick clean, fully opened bolls in the morning hours after dew has dried up.",
        "Avoid collecting dry leaves, bracts, and trash with seed cotton to get grade A prices.",
        "Store in clean, dry rooms with adequate ventilation.",
      ],
      te: [
        "ఉదయం మంచు ఆరిన తర్వాత బాగా విచ్చుకున్న కాయల నుండి పత్తిని తీయాలి.",
        "ఆకులు, చెత్త పత్తిలో కలవకుండా జాగ్రత్తపడితే మంచి మార్కెట్ ధర లభిస్తుంది.",
        "తేమ లేని గదులలో గాలి తగిలేలా నిల్వ చేయాలి.",
      ],
    },
  },

  {
    id: "chilli",
    name: { en: "Chilli / Mirchi", te: "మిర్చి (Chilli)" },
    botanicalName: "Capsicum annuum",
    season: { en: "Kharif (July nursery, Aug transplanting)", te: "ఖరీఫ్ (జూలై నర్సరీ, ఆగస్టు నాట్లు)" },
    duration: "150 - 180 Days",
    soil: {
      en: "Rich well-drained sandy loam or clay loam with high organic matter, pH 6.0 - 7.5.",
      te: "సేంద్రీయ కర్బనం అధికంగా గల ఎర్ర గరప లేదా ఒండ్రు నేలలు (pH 6.0 - 7.5).",
    },
    seedRate: {
      en: "200 - 250 grams hybrid seeds per acre in pro-trays under shade net.",
      te: "హైబ్రిడ్ రకాలకు ఎకరానికి 200 - 250 గ్రాముల విత్తనాలు ప్రో-ట్రేలలో నర్సరీ పోసుకోవాలి.",
    },
    seedTreatment: {
      en: [
        "Seed treatment with Thiram or Captan @ 3g/kg seed against damping-off disease.",
        "Dip seedling roots in Pseudomonas fluorescens (5g/L) for 15 minutes before field transplanting.",
      ],
      te: [
        "మొక్క మొదలు కుళ్ళు నివారణకు థైరమ్ లేదా కాప్టాన్ 3 గ్రాములు కిలో విత్తనానికి పట్టించాలి.",
        "నాటేముందు నారు వేర్లను సూడోమోనాస్ ద్రావణంలో 15 నిమిషాలు ముంచాలి.",
      ],
    },
    fertilizerSchedule: {
      basal: {
        en: "Apply 10 tonnes Farmyard Manure + 50 kg DAP + 25 kg MOP + 10 kg Carbofuran granules per acre.",
        te: "ఆఖరి దుక్కిలో 10 టన్నుల పశువుల ఎరువు + 50 కిలోల డీఏపీ + 25 కిలోల పొటాష్ వేయాలి.",
      },
      vegetative: {
        en: "30 days: Top dress 25 kg Urea + 15 kg Potash. Spray 19:19:19 @ 4g/L.",
        te: "30 రోజులకు: 25 కిలోల యూరియా + 15 కిలోల పొటాష్ మొదళ్ల వద్ద వేయాలి. 19:19:19 పిచికారీ చేయాలి.",
      },
      flowering: {
        en: "60 days: 25 kg Urea + 20 kg Potash + 5 kg Magnesium Sulphate. Spray Planofix (0.25ml/L) to prevent flower drop.",
        te: "60 రోజులకు: 25 కిలోల యూరియా + 20 కిలోల పొటాష్; పూత రాలకుండా ప్లానోఫిక్స్ 0.25 మి.లీ పిచికారీ చేయాలి.",
      },
      fruiting: {
        en: "During multiple pickings: Apply 15 kg Urea + 15 kg MOP after every 2 pickings to sustain yield.",
        te: "కాయ కోతల సమయంలో ప్రతి 2 కోతలకు ఒకసారి 15 కిలోల యూరియా + 15 కిలోల పొటాష్ వేయాలి.",
      },
    },
    irrigation: {
      en: "Provide drip irrigation or furrow irrigation every 5-7 days. Water stagnation triggers severe root rot and phytophthora wilt.",
      te: "బిందు సేద్యం లేదా ప్రతి 5-7 రోజులకు ఒకసారి తేలికపాటి తడి ఇవ్వాలి. నీరు నిలిస్తే వేరుకుళ్ళు తెగులు వస్తుంది.",
    },
    commonPestsAndDiseases: [
      {
        name: { en: "Black Thrips & Leaf Curl", te: "నల్ల తామర పురుగులు & బొబ్బర" },
        symptoms: {
          en: "Upward boat-shaped curling, silvering of leaf undersides, flower shedding.",
          te: "ఆకులు పైకి దోనెలా ముడుచుకుపోవడం, పూత రాలిపోవడం.",
        },
        solution: {
          en: "Install blue sticky traps; Spray Spinetoram 11.7% SC @ 1ml/L or Tolfenpyrad 15% EC @ 1.5ml/L.",
          te: "నీలి జిగురు అట్టలు పెట్టాలి; స్పినెటోరమ్ 1 మి.లీ లేదా టోల్ఫెన్‌పైరాడ్ 1.5 మి.లీ పిచికారీ చేయాలి.",
        },
      },
      {
        name: { en: "Anthracnose / Fruit Rot (Die-back)", te: "కాయకుళ్ళు & కొమ్మ ఎండు తెగులు" },
        symptoms: {
          en: "Circular sunken necrotic spots with black concentric rings on ripe fruits; twig die-back from tips.",
          te: "పండిన కాయలపై నల్లటి గుండ్రని గుంటల మచ్చలు; కొమ్మలు పైనుండి కిందకు ఎండిపోవడం.",
        },
        solution: {
          en: "Spray Azoxystrobin + Difenoconazole @ 1ml/L or Mancozeb 75% WP @ 2.5g/L.",
          te: "అజోక్సీస్ట్రోబిన్ + డైఫెనోకొనజోల్ 1 మి.లీ లేదా మాంకోజెబ్ 2.5 గ్రాములు పిచికారీ చేయాలి.",
        },
      },
    ],
    harvestingTips: {
      en: [
        "Pick fully ripe deep red chillies for dry chilli marketing. Green chillies can be harvested continuously.",
        "Dry harvested pods immediately on clean cement drying floors or tarpaulins to avoid Aspergillus contamination.",
        "Retain moisture at 10-11% for good color and spice retention.",
      ],
      te: [
        "ఎండుమిర్చి కోసం బాగా ఎర్రగా పండిన కాయలను మాత్రమే కోయాలి.",
        "కోసిన మిరపకాయలను టార్పాలిన్ పట్టాలపై లేదా సిమెంట్ కళ్ళాలపై ఆరబెట్టాలి.",
        "మంచి రంగు మరియు ఘాటు కోసం తేమ శాతాన్ని 10-11% వరకు ఉంచాలి.",
      ],
    },
  },

  {
    id: "groundnut",
    name: { en: "Groundnut / Peanut", te: "వేరుశనగ (Groundnut)" },
    botanicalName: "Arachis hypogaea",
    season: { en: "Kharif (June-July) & Rabi (Oct-Nov)", te: "ఖరీఫ్ (జూన్-జూలై) & రబీ (అక్టోబర్-నవంబర్)" },
    duration: "105 - 120 Days",
    soil: {
      en: "Well-drained light sandy loams or red soils with calcium rich content, pH 6.0 - 7.5.",
      te: "తేలికపాటి ఇసుక నేలలు, ఎర్ర గరప నేలలు, సున్నపు శాతం గల నేలలు (pH 6.0 - 7.5).",
    },
    seedRate: {
      en: "40 - 50 kg kernels per acre (varieties: Kadiri 6, Kadiri 9, TAG 24, Dharani).",
      te: "ఎకరానికి 40 - 50 కిలోల విత్తన గుండ్లు (కదిరి 6, కదిరి 9, ధరణి రకాలు).",
    },
    seedTreatment: {
      en: [
        "Treat with Mancozeb @ 3g/kg seed or Imidacloprid 600 FS @ 2ml/kg against collar rot and white grubs.",
        "Inoculate with Rhizobium culture @ 250g per 10kg seed to enhance nitrogen fixation.",
      ],
      te: [
        "వేరుకుళ్ళు నివారణకు మాంకోజెబ్ 3 గ్రాములు లేదా ఇమిడాక్లోప్రిడ్ 2 మి.లీ కిలో విత్తనానికి పట్టించాలి.",
        "రైజోబియం కల్చర్ 250 గ్రాములు 10 కిలోల విత్తనానికి పట్టించి నత్రజని స్థిరీకరణను పెంచాలి.",
      ],
    },
    fertilizerSchedule: {
      basal: {
        en: "Apply 20 kg Urea + 50 kg SSP (Single Super Phosphate) + 20 kg MOP + 10 kg Zinc Sulphate per acre.",
        te: "ఆఖరి దుక్కిలో 20 కిలోల యూరియా + 50 కిలోల సింగిల్ సూపర్ ఫాస్ఫేట్ + 20 కిలోల పొటాష్ + 10 కిలోల జింక్.",
      },
      vegetative: {
        en: "30 days: Weeding and intercultivation; do not disturb soil after peg penetration starts.",
        te: "30 రోజులకు: కలుపు తీసి అంతరకృషి చేయాలి. ఊడలు దిగే దశలో నేలను కదపకూడదు.",
      },
      flowering: {
        en: "40-45 days: Apply 200 kg Gypsum per acre around plant base to ensure bold kernel development.",
        te: "40-45 రోజులకు: కాయలు గట్టిపడటానికి ఎకరానికి 200 కిలోల జిప్సం మొక్కల మొదళ్లలో వేసి మట్టి కప్పాలి.",
      },
      fruiting: {
        en: "Spray 19:19:19 @ 5g/L + Borax @ 1g/L at pod filling stage.",
        te: "కాయ ఊరే దశలో 19:19:19 ఎరువు 5 గ్రాములు మరియు బోరాక్స్ 1 గ్రాము లీటరు నీటికి పిచికారీ చేయాలి.",
      },
    },
    irrigation: {
      en: "Irrigate at flowering, peg penetration, and pod filling stages. Avoid severe moisture stress during peg entry.",
      te: "పూత దశ, ఊడలు దిగే దశ మరియు కాయ ఊరే దశలలో తడులు చాలా ముఖ్యం. ఊడలు దిగే సమయంలో నీటి ఎద్దడి రాకూడదు.",
    },
    commonPestsAndDiseases: [
      {
        name: { en: "Tikka Leaf Spot", te: "తిక్కా ఆకుమచ్చ తెగులు" },
        symptoms: {
          en: "Dark brown necrotic circular spots with yellow halos on leaves, premature defoliation.",
          te: "ఆకులపై పసుపు వలయంతో కూడిన నల్లటి మచ్చలు, ఆకులు రాలిపోవడం.",
        },
        solution: {
          en: "Spray Tebuconazole 25.9% EC @ 1ml/L or Mancozeb 75% WP @ 2.5g/L.",
          te: "టెబుకొనజోల్ 1 మి.లీ లేదా మాంకోజెబ్ 2.5 గ్రాములు లీటరు నీటికి పిచికారీ చేయాలి.",
        },
      },
      {
        name: { en: "Spodoptera / Leaf Miner", te: "లద్దె పురుగు / ఆకు తొలిచే పురుగు" },
        symptoms: {
          en: "Skeletonization of leaves, blotches mined into leaves.",
          te: "ఆకులను తిని జల్లెడలా మార్చడం, ఆకుల లోపల సొరంగాలు చేయడం.",
        },
        solution: {
          en: "Spray Chlorpyriphos 20% EC @ 2.5ml/L or Novaluron 10% EC @ 1.5ml/L.",
          te: "క్లోరిపైరిఫాస్ 2.5 మి.లీ లేదా నోవాల్యూరాన్ 1.5 మి.లీ లీటరు నీటికి పిచికారీ చేయాలి.",
        },
      },
    ],
    harvestingTips: {
      en: [
        "Check pod maturity: Inner pod shell turns brownish-black and kernels display true cultivar color.",
        "Harvest during adequate soil moisture so pods do not snap and remain buried in the soil.",
        "Strip pods and dry on raised mats until kernel moisture is below 8-9%.",
      ],
      te: [
        "కాయ పక్వత: కాయ లోపలి భాగం ముదురు గోధుమ/నలుపు రంగులోకి మారినప్పుడు పంటను పీకాలి.",
        "నేలలో తగినంత తేమ ఉన్నప్పుడు పీకితే కాయలు భూమిలో తెగిపోకుండా సులభంగా వస్తాయి.",
        "కాయలను ఎండబెట్టి తేమ శాతాన్ని 8-9% లోపుకి తీసుకురావాలి.",
      ],
    },
  },

  {
    id: "maize",
    name: { en: "Maize / Corn", te: "మొక్కజొన్న (Maize)" },
    botanicalName: "Zea mays",
    season: { en: "Kharif (June) & Rabi (Oct-Nov)", te: "ఖరీఫ్ & రబీ" },
    duration: "100 - 115 Days",
    soil: {
      en: "Well-drained fertile loamy to clay loams rich in organic matter with pH 6.0 - 7.5.",
      te: "మురుగునీటి సౌకర్యం గల సారవంతమైన గరప మరియు ఒండ్రు నేలలు (pH 6.0 - 7.5).",
    },
    seedRate: {
      en: "7 - 8 kg hybrid seeds per acre spaced at 60cm x 20cm.",
      te: "హైబ్రిడ్ రకాలకు ఎకరానికి 7 - 8 కిలోల విత్తనాలు (60x20 సెం.మీ దూరం).",
    },
    seedTreatment: {
      en: [
        "Treat with Cyantraniliprole 19.8% + Thiamethoxam 19.8% FS @ 4ml/kg against Fall Armyworm.",
        "Treat with Metalaxyl 35% WS @ 3g/kg seed to prevent downy mildew.",
      ],
      te: [
        "కత్తెర పురుగు నివారణకు సయాంట్రానిలిప్రోల్ + థయామిథాక్సామ్ 4 మి.లీ కిలో విత్తనానికి పట్టించాలి.",
        "బూజు తెగులు రాకుండా మెటలాక్సిల్ 3 గ్రాములు కిలో విత్తనానికి పట్టించాలి.",
      ],
    },
    fertilizerSchedule: {
      basal: {
        en: "Apply 50 kg DAP + 25 kg MOP + 10 kg Zinc Sulphate + 25 kg Urea at sowing.",
        te: "ఆఖరి దుక్కిలో 50 కిలోల డీఏపీ + 25 కిలోల పొటాష్ + 10 కిలోల జింక్ + 25 కిలోల యూరియా.",
      },
      vegetative: {
        en: "25-30 days (knee-high stage): Top dress 35 kg Urea. Earth up along rows.",
        te: "25-30 రోజులకు (మోకాలి లోతు ఎత్తు): 35 కిలోల యూరియా వేసి మొదళ్లకు మట్టి ఎగదోయాలి.",
      },
      flowering: {
        en: "45-50 days (tasseling/silking): Top dress 35 kg Urea + 15 kg MOP.",
        te: "45-50 రోజులకు (కంకి పురుష & స్త్రీ పుష్పాలు వచ్చే దశ): 35 కిలోల యూరియా + 15 కిలోల పొటాష్.",
      },
      fruiting: {
        en: "Grain development: Spray 13:0:45 @ 10g/L for heavy, uniform kernel development.",
        te: "గింజ తయారయ్యే దశలో 13:0:45 ఎరువు 10 గ్రాములు లీటరు నీటికి పిచికారీ చేయాలి.",
      },
    },
    irrigation: {
      en: "Knee-high, tasseling, silking, and milk stages are critical. Never allow water stagnation as maize is sensitive to waterlogging.",
      te: "మోకాలి లోతు దశ, కంకి వచ్చే దశ మరియు పాలుపోసుకునే దశలలో నీరు చాలా అవసరం. నీరు నిల్వ ఉండకుండా చూసుకోవాలి.",
    },
    commonPestsAndDiseases: [
      {
        name: { en: "Fall Armyworm (FAW)", te: "కత్తెర పురుగు" },
        symptoms: {
          en: "Extensive pinholes and ragged window panes on whorl leaves with sawdust-like frass.",
          te: "సుడులలో ఆకులను కత్తిరించి రంధ్రాలు చేయడం, రంపపు పొట్టు లాంటి మల విసర్జన.",
        },
        solution: {
          en: "Whorl application of Chlorantraniliprole 18.5% SC @ 0.4ml/L or Emamectin Benzoate 5% SG @ 0.5g/L.",
          te: "సుడులలో పడేలా క్లోరాంట్రానిలిప్రోల్ 0.4 మి.లీ లేదా ఎమామెక్టిన్ బెంజోయేట్ 0.5 గ్రాములు పిచికారీ చేయాలి.",
        },
      },
    ],
    harvestingTips: {
      en: [
        "Harvest when husk leaves dry and turn straw color, and a black layer forms at the base of kernels.",
        "Dry cobs on clean threshing floor until grain moisture reaches 12-14%.",
      ],
      te: [
        "కంకి పైపొరలు ఎండిపోయి గింజల మొదట్లో నల్లటి పొర కనిపించినప్పుడు కోత కోయాలి.",
        "నూర్పిడి చేసిన గింజలను ఎండబెట్టి తేమను 12-14% కి తగ్గించాలి.",
      ],
    },
  },
];
