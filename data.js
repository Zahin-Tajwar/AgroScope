/* ===== Agroscope · sample field dataset ===== */
window.DATA = {
  field: {
    name: { en: "Selected field", bn: "নির্বাচিত মাঠ" },
    coord: "",
    area: 1.8,
    unit: "ha",
    soilType: { en: "Clay loam", bn: "ক্লে লোম" }
  },

  /* ---- Bangladesh · 8 divisions, 64 districts (labels + map coordinates) ---- */
  bd: {
    divisions: [
      { n:{en:"Dhaka",bn:"ঢাকা"},           pos:[24.30, 90.10] },
      { n:{en:"Chattogram",bn:"চট্টগ্রাম"},   pos:[22.85, 91.45] },
      { n:{en:"Rajshahi",bn:"রাজশাহী"},      pos:[24.55, 88.30] },
      { n:{en:"Khulna",bn:"খুলনা"},          pos:[23.30, 89.15] },
      { n:{en:"Barishal",bn:"বরিশাল"},        pos:[22.20, 90.55] },
      { n:{en:"Sylhet",bn:"সিলেট"},          pos:[24.35, 92.05] },
      { n:{en:"Rangpur",bn:"রংপুর"},         pos:[25.50, 89.85] },
      { n:{en:"Mymensingh",bn:"ময়মনসিংহ"},   pos:[24.40, 90.05] }
    ],
    districts: [
      /* 0 · Dhaka */
      { d:0, n:{en:"Dhaka",bn:"ঢাকা"},             pos:[23.8103, 90.4125] },
      { d:0, n:{en:"Faridpur",bn:"ফরিদপুর"},        pos:[23.6031, 89.8414] },
      { d:0, n:{en:"Gazipur",bn:"গাজীপুর"},         pos:[23.9998, 90.4203] },
      { d:0, n:{en:"Gopalganj",bn:"গোপালগঞ্জ"},     pos:[23.0050, 89.8266] },
      { d:0, n:{en:"Kishoreganj",bn:"কিশোরগঞ্জ"},   pos:[24.4442, 90.7766] },
      { d:0, n:{en:"Madaripur",bn:"মাদারীপুর"},     pos:[23.1634, 90.1987] },
      { d:0, n:{en:"Manikganj",bn:"মানিকগঞ্জ"},     pos:[23.8617, 90.0000] },
      { d:0, n:{en:"Munshiganj",bn:"মুন্সিগঞ্জ"},   pos:[23.5422, 90.5305] },
      { d:0, n:{en:"Narayanganj",bn:"নারায়ণগঞ্জ"}, pos:[23.6227, 90.5000] },
      { d:0, n:{en:"Narsingdi",bn:"নরসিংদী"},       pos:[23.9320, 90.7150] },
      { d:0, n:{en:"Rajbari",bn:"রাজবাড়ী"},        pos:[23.7574, 89.6408] },
      { d:0, n:{en:"Shariatpur",bn:"শরীয়তপুর"},    pos:[23.2060, 90.3500] },
      { d:0, n:{en:"Tangail",bn:"টাঙ্গাইল"},        pos:[24.2513, 89.9167] },
      /* 1 · Chattogram */
      { d:1, n:{en:"Brahmanbaria",bn:"ব্রাহ্মণবাড়িয়া"}, pos:[23.9608, 91.1116] },
      { d:1, n:{en:"Chandpur",bn:"চাঁদপুর"},        pos:[23.2333, 90.6700] },
      { d:1, n:{en:"Chattogram",bn:"চট্টগ্রাম"},    pos:[22.3569, 91.7832] },
      { d:1, n:{en:"Cumilla",bn:"কুমিল্লা"},        pos:[23.4579, 91.1870] },
      { d:1, n:{en:"Cox's Bazar",bn:"কক্সবাজার"},   pos:[21.4370, 91.9770] },
      { d:1, n:{en:"Feni",bn:"ফেনী"},               pos:[23.0146, 91.4000] },
      { d:1, n:{en:"Khagrachhari",bn:"খাগড়াছড়ি"},  pos:[23.1193, 91.9846] },
      { d:1, n:{en:"Lakshmipur",bn:"লক্ষ্মীপুর"},   pos:[22.9427, 90.8410] },
      { d:1, n:{en:"Noakhali",bn:"নোয়াখালী"},      pos:[22.8610, 91.0970] },
      { d:1, n:{en:"Rangamati",bn:"রাঙ্গামাটি"},    pos:[22.6549, 92.1764] },
      { d:1, n:{en:"Bandarban",bn:"বান্দরবান"},     pos:[22.1952, 92.2196] },
      /* 2 · Rajshahi */
      { d:2, n:{en:"Bogura",bn:"বগুড়া"},           pos:[24.8481, 89.3730] },
      { d:2, n:{en:"Chapainawabganj",bn:"চাঁপাইনবাবগঞ্জ"}, pos:[24.5965, 88.2770] },
      { d:2, n:{en:"Joypurhat",bn:"জয়পুরহাট"},     pos:[25.0968, 89.0277] },
      { d:2, n:{en:"Naogaon",bn:"নওগাঁ"},           pos:[24.8043, 88.9431] },
      { d:2, n:{en:"Natore",bn:"নাটোর"},            pos:[24.4130, 88.9830] },
      { d:2, n:{en:"Pabna",bn:"পাবনা"},             pos:[24.0064, 89.2373] },
      { d:2, n:{en:"Rajshahi",bn:"রাজশাহী"},       pos:[24.3745, 88.6042] },
      { d:2, n:{en:"Sirajganj",bn:"সিরাজগঞ্জ"},     pos:[24.4539, 89.7000] },
      /* 3 · Khulna */
      { d:3, n:{en:"Bagerhat",bn:"বাগেরহাট"},       pos:[22.6604, 89.7870] },
      { d:3, n:{en:"Chuadanga",bn:"চুয়াডাঙ্গা"},   pos:[23.6402, 88.8419] },
      { d:3, n:{en:"Jashore",bn:"যশোর"},            pos:[23.1634, 89.2182] },
      { d:3, n:{en:"Jhenaidah",bn:"ঝিনাইদহ"},       pos:[23.5450, 89.1710] },
      { d:3, n:{en:"Khulna",bn:"খুলনা"},           pos:[22.8170, 89.5650] },
      { d:3, n:{en:"Kushtia",bn:"কুষ্টিয়া"},       pos:[23.9013, 89.1206] },
      { d:3, n:{en:"Magura",bn:"মাগুরা"},           pos:[23.4875, 89.4190] },
      { d:3, n:{en:"Meherpur",bn:"মেহেরপুর"},       pos:[23.7625, 88.6318] },
      { d:3, n:{en:"Narail",bn:"নড়াইল"},           pos:[23.1657, 89.5000] },
      { d:3, n:{en:"Satkhira",bn:"সাতক্ষীরা"},      pos:[22.7100, 89.0960] },
      /* 4 · Barishal */
      { d:4, n:{en:"Barguna",bn:"বরগুনা"},          pos:[22.1546, 90.1260] },
      { d:4, n:{en:"Barishal",bn:"বরিশাল"},         pos:[22.7010, 90.3535] },
      { d:4, n:{en:"Bhola",bn:"ভোলা"},              pos:[22.6859, 90.6610] },
      { d:4, n:{en:"Jhalokathi",bn:"ঝালকাঠি"},      pos:[22.6414, 90.1994] },
      { d:4, n:{en:"Patuakhali",bn:"পটুয়াখালী"},   pos:[22.3587, 90.3290] },
      { d:4, n:{en:"Pirojpur",bn:"পিরোজপুর"},       pos:[22.5764, 89.9770] },
      /* 5 · Sylhet */
      { d:5, n:{en:"Habiganj",bn:"হবিগঞ্জ"},        pos:[24.3740, 91.4180] },
      { d:5, n:{en:"Moulvibazar",bn:"মৌলভীবাজার"},  pos:[24.4840, 91.7740] },
      { d:5, n:{en:"Sunamganj",bn:"সুনামগঞ্জ"},     pos:[25.0646, 91.3980] },
      { d:5, n:{en:"Sylhet",bn:"সিলেট"},            pos:[24.8949, 91.8687] },
      /* 6 · Rangpur */
      { d:6, n:{en:"Dinajpur",bn:"দিনাজপুর"},       pos:[25.6280, 88.6420] },
      { d:6, n:{en:"Gaibandha",bn:"গাইবান্ধা"},     pos:[25.3288, 89.5430] },
      { d:6, n:{en:"Kurigram",bn:"কুড়িগ্রাম"},     pos:[25.8060, 89.6360] },
      { d:6, n:{en:"Lalmonirhat",bn:"লালমনিরহাট"},  pos:[25.9180, 89.4640] },
      { d:6, n:{en:"Nilphamari",bn:"নীলফামারী"},    pos:[25.9317, 88.8560] },
      { d:6, n:{en:"Panchagarh",bn:"পঞ্চগড়"},       pos:[26.3333, 88.5500] },
      { d:6, n:{en:"Rangpur",bn:"রংপুর"},           pos:[25.7439, 89.2752] },
      { d:6, n:{en:"Thakurgaon",bn:"ঠাকুরগাঁও"},    pos:[26.0336, 88.4616] },
      /* 7 · Mymensingh */
      { d:7, n:{en:"Jamalpur",bn:"জামালপুর"},       pos:[24.9375, 89.9370] },
      { d:7, n:{en:"Mymensingh",bn:"ময়মনসিংহ"},    pos:[24.7471, 90.4036] },
      { d:7, n:{en:"Netrokona",bn:"নেত্রকোণা"},     pos:[24.8825, 90.7250] },
      { d:7, n:{en:"Sherpur",bn:"শেরপুর"},          pos:[25.0200, 90.0150] }
    ]
  },

  /* ---- map pointers (click one on the 3D map) ---- */
  mapPins: [
    { c:"#4d8fa8", pos:[25.6218, 88.6272],
      name:{ en:"Irrigation canal", bn:"সেচ খাল" },
      info:{ en:"Teesta feeder canal · 420 m west · pump depth 4–6 m", bn:"তিস্তা খাল · ৪২০ মি. পশ্চিমে · পাম্পের গভীরতা ৪–৬ মি." } },
    { c:"#c9a227", pos:[25.6318, 88.6432],
      name:{ en:"Soil sample point", bn:"মাটির নমুনা বিন্দু" },
      info:{ en:"Clay loam · pH 6.4 · organic matter 1.9% · Jan 2026", bn:"ক্লে লোম · পিএইচ ৬.৪ · জৈব পদার্থ ১.৯% · জানু ২০২৬" } },
    { c:"#5f9e6a", pos:[25.6372, 88.6468],
      name:{ en:"Agro weather station", bn:"কৃষি আবহাওয়া কেন্দ্র" },
      info:{ en:"Rain · temp · humidity logger · 1.1 km NE", bn:"বৃষ্টি · তাপমাত্রা · আর্দ্রতা · ১.১ কি.মি. উত্তর-পূর্বে" } },
    { c:"#b4552a", pos:[25.6192, 88.6372],
      name:{ en:"Flood-risk lowland", bn:"বন্যা-ঝুঁকির নিচু জমি" },
      info:{ en:"Waterlogging Jul–Sep · keep drainage open", bn:"জুলাই–সেপ্টে পানিবদ্ধতা · নিকাশি খোলা রাখুন" } },
    { c:"#a8823c", pos:[25.6348, 88.6578],
      name:{ en:"Local market (hat)", bn:"স্থানীয় বাজার (হাট)" },
      info:{ en:"Tue & Fri · 2.4 km · buyers for potato & lentil", bn:"মঙ্গল ও শুক্র · ২.৪ কি.মি. · আলু-মসুরের ক্রেতা" } },
    { c:"#7d8f57", pos:[25.6262, 88.6521],
      name:{ en:"Farm input dealer", bn:"কৃষি ইনপুট বিক্রেতা" },
      info:{ en:"Seed · fertiliser · pesticide · 1.6 km east", bn:"বীজ · সার · কীটনাশক · ১.৬ কি.মি. পূর্বে" } }
  ],

  /* ---- place names on the map (k = zoom band it appears in) ---- */
  mapLabels: [
    { k:"local", pos:[25.6205, 88.6310], name:{ en:"Barwaisa", bn:"বড়বৈশ্যা" } },
    { k:"local", pos:[25.6398, 88.6242], name:{ en:"Ramnagar", bn:"রামনগর" } },
    { k:"local", pos:[25.6326, 88.6354], name:{ en:"Ghashipa", bn:"ঘাসিপা" } },
    { k:"local", pos:[25.6256, 88.6498], name:{ en:"Dhap", bn:"ঢাপ" } },
    { k:"local", pos:[25.6136, 88.6432], name:{ en:"Nossanagar", bn:"নস্সানগর" } },
    { k:"local", pos:[25.6046, 88.6556], name:{ en:"Taherpur", bn:"তাহেরপুর" } },
    { k:"local", pos:[25.6482, 88.6586], name:{ en:"Sultanpur", bn:"সুলতানপুর" } },
    { k:"local", pos:[25.6568, 88.6078], name:{ en:"Punarbhaba river", bn:"পুনর্ভবা নদী" } },
    { k:"local", pos:[25.6158, 88.6132], name:{ en:"Kulik canal", bn:"কুলিক খাল" } },
    { k:"country",pos:[23.8000, 90.3500], name:{ en:"Bangladesh", bn:"বাংলাদেশ" } }
  ],

  /* ---- NASA Earth observation metrics ---- */
  eo: [
    { k:"NDVI", name:{en:"Vegetation greenness",bn:"গাছপালার সবুজতা"}, v:0.68, u:"", d:2, color:"#4d7c2f",
      s:[.31,.38,.46,.55,.62,.66,.69,.71,.68,.6,.5,.38], up:4 },
    { k:"EVI", name:{en:"Enhanced greenness",bn:"সংবর্ধিত সবুজতা"}, v:0.52, u:"", d:2, color:"#6a9a3d",
      s:[.24,.3,.37,.44,.5,.54,.56,.58,.55,.49,.41,.3], up:3 },
    { k:"NPWI", name:{en:"Surface water index",bn:"পৃষ্ঠের পানি সূচক"}, v:0.34, u:"", d:2, color:"#3f7768",
      s:[.18,.16,.14,.12,.15,.26,.38,.42,.4,.33,.26,.21], up:6 },
    { k:"LAI", name:{en:"Leaf area index",bn:"পাতার ক্ষেত্রফল"}, v:3.8, u:"m²/m²", d:1, color:"#5f8fa0",
      s:[1.4,1.7,2.2,2.7,3.2,3.6,3.9,4.1,3.8,3.2,2.4,1.7], up:2 },
    { k:"ET", name:{en:"Evapotranspiration",bn:"বাষ্পোত্সর্জন"}, v:4.2, u:"mm/d", d:1, color:"#7d8f57",
      s:[2.1,2.6,3.2,3.9,4.6,5.1,5.4,5.2,4.5,3.6,2.8,2.2], up:-1 },
    { k:"LST", name:{en:"Surface temperature",bn:"ভূপৃষ্ঠ তাপমাত্রা"}, v:31.4, u:"°C", d:1, color:"#c07a3e",
      s:[19,22,27,32,36,38,37,36,34,31,26,21], up:5 },
    { k:"SM", name:{en:"Soil moisture",bn:"মাটির আর্দ্রতা"}, v:0.27, u:"m³/m³", d:2, color:"#5b7f9a",
      s:[.3,.28,.24,.19,.16,.18,.29,.34,.32,.3,.27,.31], up:8 }
  ],

  /* ---- climate ---- */
  months: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
  monthsBn: ["জানু","ফেব্রু","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগস্ট","সেপ্ট","অক্টো","নভে","ডিসে"],
  climate: {
    temp: [21,24,29,33,34,33,32,32,31,29,25,22],
    hum:  [62,58,55,58,66,76,84,85,83,78,70,64],
    rain: [8,15,32,68,142,268,341,298,224,96,21,6],
    readout: { max:38.6, min:9.4, annual:1519, humMean:70 }
  },
  hazard: {
    rows: [
      { k:"Flood / waterlogging", bn:"বন্যা/পানিবদ্ধতা", v:[0,0,0,1,2,4,4,3,2,1,0,0] },
      { k:"Drought",              bn:"খরা",              v:[1,1,2,3,4,3,1,1,1,1,1,1] },
      { k:"Heat stress",          bn:"তাপ চাপ",          v:[0,1,2,4,4,3,2,2,1,0,0,0] },
      { k:"Storm / hail",         bn:"ঝড়/বৃষ্টি",        v:[1,2,3,2,1,1,1,1,1,2,2,1] }
    ]
  },

  /* ---- soil report ---- */
  soil: {
    profile: [
      { d:0,  h:26, c:"#5b4a33", lbl:{en:"Topsoil · 0–20 cm",bn:"উপরি মাটি · ০–২০ সেমি"} },
      { d:20, h:40, c:"#6d5a3f", lbl:{en:"Root zone · 20–50 cm",bn:"শিক্ষক্ষেত্র · ২০–৫০ সেমি"} },
      { d:50, h:52, c:"#7d6a4c", lbl:{en:"Subsoil · 50–90 cm",bn:"নিচের স্তর · ৫০–৯০ সেমি"} },
      { d:90, h:42, c:"#8e7f60", lbl:{en:"Parent material",bn:"মূল উপাদান"} }
    ],
    bars: [
      { k:{en:"Organic matter",bn:"জৈব পদার্থ"}, v:1.9, max:5, u:"%", pct:38, target:60, note:{en:"Below the 2.5% target",bn:"২.৫% লক্ষ্যের নিচে"}, s:"warn" },
      { k:{en:"Organic carbon",bn:"জৈব কার্বন"}, v:0.74, max:3, u:"%", pct:31, target:55, note:{en:"Moderate",bn:"মাঝারি"}, s:"warn" },
      { k:{en:"Salinity",bn:"লবণাক্ততা"}, v:0.8, max:4, u:"dS/m", pct:20, target:45, note:{en:"Non-saline",bn:"লবণ রহিত"}, s:"ok" },
      { k:{en:"pH",bn:"পিএইচ"}, v:6.4, max:9, u:"", pct:64, target:70, targetZone:[60,78], note:{en:"Slightly acidic · good",bn:"সামান্য অম্লীয় · ভালো"}, s:"ok" },
      { k:{en:"Water holding",bn:"পানি ধারণক্ষমতা"}, v:62, max:100, u:"%", pct:62, target:70, note:{en:"Field capacity 62%",bn:"ক্ষেত ধারণক্ষমতা ৬২%"}, s:"ok" },
      { k:{en:"Drainage",bn:"পরিস্রাবণ"}, v:55, max:100, u:"idx", pct:55, target:65, note:{en:"Moderate — ponding risk in monsoon",bn:"মাঝারি — বর্ষায় পানি থাকার ঝুঁকি"}, s:"warn" },
      { k:{en:"Effective depth",bn:"কার্যকর গভীরতা"}, v:90, max:120, u:"cm", pct:75, target:70, note:{en:"Deep enough for rice & maize",bn:"ধান ও ভুট্টার জন্য যথেষ্ট"}, s:"ok" }
    ],
    dials: [
      { k:"N", name:{en:"Nitrogen",bn:"নাইট্রোজেন"}, v:64, u:"idx" },
      { k:"P", name:{en:"Phosphorus",bn:"ফসফরাস"}, v:48, u:"idx" },
      { k:"K", name:{en:"Potassium",bn:"পটাশিয়াম"}, v:71, u:"idx" }
    ]
  },

  /* ---- crop suitability ---- */
  crops: [
    { id:"boro", name:{en:"Boro rice",bn:"বোরো ধান"}, sc:88, season:{en:"Dec – May",bn:"ডিসে – মে"},
      why:{en:"Warm, irrigated and high sunlight suit this field; NDVI shows a strong mid-season peak.",
           bn:"উষ্ণ, সেচযুক্ত ও উজ্জ্বল রোদ — এই জমির জন্য উপযুক্ত; NDVI মৌসুমের মাঝামাঝি ভালো বৃদ্ধি দেখাচ্ছে।"},
      f:[92,84,90,86,72,64,88,70],
      pro:{en:["Highest grain yield per season","Proven local market and seed supply","Uses the wet season fully"],bn:["প্রতি মৌসুমে সর্বোচ্চ শস্য উৎপাদন","পরিচিত বাজার ও বীজ সহজে পাওয়া যায়","বর্ষা ঋতু পুরোপুরি ব্যবহার হয়"]},
      con:{en:["Heavy water and pump cost","Compacts the soil over time","Sensitive to early floods"],bn:["পানি ও পাম্প খরচ বেশি","সময়ের সঙ্গে মাটি চেপে যায়","বন্যা হলে ক্ষতি বেশি"]} },
    { id:"mung", name:{en:"Mung bean",bn:"মুগ ডাল"}, sc:86, season:{en:"May – Jul",bn:"মে – জুলাই"},
      why:{en:"Short duration, low water, and it returns nitrogen to the soil after the boro crop.",
           bn:"স্বল্প সময়ে ফসল, অল্প পানি, আর বোরোর পর মাটিতে নাইট্রোজেন ফেরায়।"},
      f:[78,94,86,70,88,92,95,76],
      pro:{en:["Fixes 60–90 kg N/ha for the next crop","Very short 60–70 day cycle","Sells well as pulse"],bn:["পরের ফসলের জন্য ৬০–৯০ কেজি নাইট্রোজেন তৈরি","৬০–৭০ দিনের ছোট মৌসুম","ডাল হিসেবে ভালো দাম"]},
      con:{en:["Lower return than maize","Pods split if rain arrives late","Needs careful harvesting"],bn:["ভুট্টার চেয়ে আয় কম","বৃষ্টি দেরি হলে শুঁটকি ফেটে","কাটার সময় সতর্ক থাকতে হয়"]} },
    { id:"maize", name:{en:"Maize",bn:"ভুট্টা"}, sc:84, season:{en:"Jan – Apr",bn:"জানু – এপ্রিল"},
      why:{en:"High biomass and deep roots lift organic matter; the market for feed grain is expanding.",
           bn:"বেশি গাছপালা ও গভীর শিক্ষা জৈব পদার্থ বাড়ায়; খাদ্য শস্যের বাজারও বাড়ছে।"},
      f:[80,88,82,76,64,80,90,84],
      pro:{en:["Adds 8–12 t/ha of organic biomass","Breaks the rice-only cycle","Good feed and food price"],bn:["৮–১২ টন/হেক্টর জৈব পদার্থ যোগ হয়","শুধু ধানের চক্র ভাঙে","পশুখাদ্যে ভালো দাম"]},
      con:{en:["Needs more nitrogen fertiliser","Storage needs to stay dry","Bird damage near maturity"],bn:["নাইট্রোজেন সার বেশি লাগে","সংরক্ষণ শুকনো রাখতে হয়","পাকার সময় পাখির ক্ষতি"]} },
    { id:"mustard", name:{en:"Mustard",bn:"সরিষা"}, sc:79, season:{en:"Nov – Feb",bn:"নভে – ফেব্রু"},
      why:{en:"Cool dry months suit it, and it costs little to raise compared with potato.",
           bn:"শীতে শুকনো সময় উপযুক্ত; আলুর তুলনায় উৎপাদন খরচ অনেক কম।"},
      f:[74,82,88,72,90,70,84,68],
      pro:{en:["Low input cost and low water","Oilseed sells locally","Lightens the field workload"],bn:["কম খরচ, কম পানি","তেলবীজ স্থানীয় বাজারে বিক্রি হয়","কাজের চাপ কমে"]},
      con:{en:["Yield drops in a foggy January","Aphids can build up","Short storage life"],bn:["কুয়াশাচ্ছন্ন জানুয়ারিতে উৎপাদন কমে","পোকা বাড়তে পারে","সংরক্ষণ সময় কম"]} },
    { id:"wheat", name:{en:"Wheat",bn:"গম"}, sc:71, season:{en:"Nov – Mar",bn:"নভে – মার্চ"},
      why:{en:"Fits the dry window, but night temperatures in March push grain filling down.",
           bn:"শুকনো সময়ে বসে, তবে মার্চের রাতের উষ্ণতায় দানা ভরা কমে যায়।"},
      f:[66,74,62,80,78,60,72,86],
      pro:{en:["Uses the fallow Rabi window","Storable grain for six months","Good rotation partner for rice"],bn:["পড়ে থাকা রবি সময় ব্যবহার হয়","ছয় মাস সংরক্ষণযোগ্য","ধানের সঙ্গে ভালো জোড়া"]},
      con:{en:["Heat in March shrinks grain","Needs a frost-free window","Rust risk in humid spells"],bn:["মার্চের তাপে দানা ছোট হয়","রুতুহীন সময় লাগে","আর্দ্রতায় পাতা রোগ"]} },
    { id:"potato", name:{en:"Potato",bn:"আলু"}, sc:74, season:{en:"Dec – Mar",bn:"ডিসে – মার্চ"},
      why:{en:"Strong profit per hectare, but this field's drainage holds water a little too long.",
           bn:"প্রতি হেক্টরে লাভ ভালো, তবে এই জমিতে পানি একটু বেশি সময় থেকে যায়।"},
      f:[70,66,78,94,52,84,58,92],
      pro:{en:["Highest profit per hectare","Quick 90-day turnover","Strong winter demand"],bn:["প্রতি হেক্টরে সর্বোচ্চ লাভ","৯০ দিনে দ্রুত ফেরত","শীতে চাহিদা বেশি"]},
      con:{en:["Seed cost is high","Needs ridges and careful drainage","Late blight in a wet year"],bn:["বীজ খরচ বেশি","আলন্দা ও পরিস্রাবণ লাগে","বছরে পানি বেশিলে গোলাবালি রোগ"]} }
  ],
  factorLabels: [
    {en:"Water fit",bn:"পানির মিল"},{en:"Soil fit",bn:"মাটির মিল"},{en:"Climate fit",bn:"জলবায়ুর মিল"},
    {en:"Market",bn:"বাজার"},{en:"Low cost",bn:"কম খরচ"},{en:"Short duration",bn:"স্বল্প সময়"},
    {en:"Soil gain",bn:"মাটি উন্নতি"},{en:"Profit",bn:"লাভ"}
  ],

  /* ---- risk ---- */
  risk: {
    domains: [
      { k:"climate", name:{en:"Climate",bn:"জলবায়ু"}, lv:68, say:{en:"Flood in Jul–Aug, heat spike in Apr–May",bn:"জুলাই–আগস্টে বন্যা, এপ্রিল–মেয়ে তাপপ্রবাহ"},
        m:[1,1,2,4,4,3,4,3,2,1,1,1] },
      { k:"bio", name:{en:"Biological",bn:"জীববৈচিত্র্য"}, lv:54, say:{en:"Stem borer peaks Jun, blight in humid weeks",bn:"লাতা পোকা জুনে, আর্দ্রতায় পাতা রোগ"},
        m:[1,1,1,2,3,4,3,3,4,3,2,1] },
      { k:"soil", name:{en:"Soil",bn:"মাটি"}, lv:47, say:{en:"Organic matter low, drainage slows after rain",bn:"জৈব পদার্থ কম, বৃষ্টির পর পরিস্রাবণ ধীর"},
        m:[2,2,2,3,3,4,4,3,2,2,2,2] },
      { k:"water", name:{en:"Water",bn:"পানি"}, lv:61, say:{en:"Pump cost rises Apr–May as the aquifer drops",bn:"এপ্রিল–মে ভূগর্ভস্থ পানি কমে পাম্প খরচ বাড়ে"},
        m:[2,2,3,4,4,3,1,1,1,2,2,2] }
    ],
    threats: [
      { k:{en:"Flash flood",bn:"আকস্মিক বন্যা"}, when:{en:"Jul – Aug",bn:"জুলাই – আগস্ট"}, sev:"high",
        d:{en:"The Gur river backs up in heavy rain; low corners hold water for 3–5 days.",
           bn:"ভারী বৃষ্টিতে গুর নদী পশ্চাদপসরণ করে; নিচু কোণে ৩–৫ দিন পানি থাকে।"} },
      { k:{en:"Rice stem borer",bn:"ধানের লাতা পোকা"}, when:{en:"Jun – Sep",bn:"জুন – সেপ্ট"}, sev:"mid",
        d:{en:"Trap counts are already above threshold in the neighbouring plot.",
           bn:"পাশের জমিতে ফাঁদ গণনা সীমার উপরে গেছে।"} },
      { k:{en:"Dry-spell pumping cost",bn:"শুকনো সময়ে পাম্প খরচ"}, when:{en:"Apr – May",bn:"এপ্রিল – মে"}, sev:"high",
        d:{en:"Rainfall drops under 20 mm a month while the crop peaks its demand.",
           bn:"চাহিদা সর্বোচ্চ থাকা অবস্থায় মাসে বৃষ্টি ২০ মিমির নেমে যায়।"} },
      { k:{en:"Salinity creep",bn:"লবণাক্ততা বৃদ্ধি"}, when:{en:"Nov – Jan",bn:"নভে – জানু"}, sev:"low",
        d:{en:"Irrigation water conductivity rises in the dry months; keep leaching.",
           bn:"শুকনো মাসে সেচের পানির বৈদ্যুতিক প্রবাহ বাড়ে; লবণ কাটতে থাকুন।"} },
      { k:{en:"Leaf blast",bn:"পাতা গলা রোগ"}, when:{en:"Aug – Sep",bn:"আগস্ট – সেপ্ট"}, sev:"mid",
        d:{en:"Three humid weeks with dense canopy raise infection odds.",
           bn:"ঘন গাছপালায় টানা তিন সপ্তাহ আর্দ্রতায় সংক্রমণের সম্ভাবনা বাড়ে।"} },
      { k:{en:"Hail & storm",bn:"বাতাস ও শিলাবৃষ্টি"}, when:{en:"Mar – Apr",bn:"মার্চ – এপ্রিল"}, sev:"mid",
        d:{en:"Nor'wester storms can lodge a tall crop in a single evening.",
           bn:"নৌবায়ু ঝড়ে এক সন্ধ্যায় লম্বা ফসল ডগমাগ হতে পারে।"} }
    ]
  },
  /* ---- rotations ---- */
  rotations: [
    { id:"r1", name:{en:"Rice – Mung – Rice",bn:"ধান – মুগ – ধান"}, tag:{en:"Current practice + mung",bn:"বর্তমান চর্চা + মুগ"},
      seq:[{en:"Boro rice",bn:"বোরো ধান"},{en:"Mung bean",bn:"মুগ ডাল"},{en:"Aman rice",bn:"অমন ধান"}],
      sustain:84, risk:34, profit:196, cost:92, yield:7.4, change:12,
      scores:{disaster:62,yield:82,pest:70,water:58,cost:78,early:70,soil:85,profit:78,longer:72},
      cal:[{c:{en:"Boro rice",bn:"বোরো ধান"},s:0,e:4,col:"#7d9a3f"},{c:{en:"Mung bean",bn:"মুগ ডাল"},s:5,e:6,col:"#c07a3e"},
           {c:{en:"Aman rice",bn:"অমন ধান"},s:7,e:11,col:"#4d7c2f"}],
      pro:{en:["Mung adds nitrogen for the aman crop","Keeps income every quarter","Lowest pump cost of the four"],bn:["মুগ অমনের জন্য নাইট্রোজেন দেয়","প্রতি প্রান্তিকে আয় থাকে","চারটির মধ্যে সবচেয়ে কম পাম্প খরচ"]},
      con:{en:["Rice twice still compacts the soil","Mung price swings after June","Tied to irrigation for boro"],bn:["বছরে দুইবার ধানে মাটি চেপে যায়","জুনের পর মুগের দাম ওঠানামা করে","বোরোর জন্য সেচের ওপর নির্ভরশীল"]},
      why:{en:"Safest step from where you are now: one extra crop, no new machinery, clear soil gain.",
           bn:"এখনকার অবস্থা থেকে সবচেয়ে সহজ ধাপ: একটি অতিরিক্ত ফসল, নতুন যন্ত্র নয়, মাটি পরিষ্কার উপকার।"} },
    { id:"r2", name:{en:"Rice – Mustard – Rice",bn:"ধান – সরিষা – ধান"}, tag:{en:"Low water winter",bn:"কম পানির শীত"},
      seq:[{en:"Boro rice",bn:"বোরো ধান"},{en:"Mustard",bn:"সরিষা"},{en:"Aman rice",bn:"অমন ধান"}],
      sustain:76, risk:38, profit:184, cost:84, yield:7.1, change:7,
      scores:{disaster:66,yield:80,pest:68,water:60,cost:72,early:66,soil:76,profit:75,longer:70},
      cal:[{c:{en:"Boro rice",bn:"বোরো ধান"},s:0,e:4,col:"#7d9a3f"},{c:{en:"Mustard",bn:"সরিষা"},s:5,e:7,col:"#d8a447"},
           {c:{en:"Aman rice",bn:"অমন ধান"},s:8,e:11,col:"#4d7c2f"}],
      pro:{en:["Cheap to raise, little irrigation","Oilseed can be stored and sold later","Shortens the field labour peak"],bn:["উৎপাদন সস্তা, সেচ কম লাগে","তেলবীজ জমিয়ে পরে বিক্রি করা যায়","কাজের চাপ কমে"]},
      con:{en:["Fog can hold back January sowing","Aphid sprays may be needed","Yield ceiling lower than maize"],bn:["কুয়াশায় জানুয়ারির বীজ বপন আটকে","পোকার ওষুধ লাগতে পারে","উৎপাদন ভুট্টার চেয়ে কম"]},
      why:{en:"If water bills worry you more than yield, this cuts pumping across the dry months.",
           bn:"উৎপাদনের চেয়ে পানির খরচ যদি বেশি চিন্তা হয়, এই ঘূর্ণনে শুকনো মাসে পাম্প কমে।"} },
    { id:"r3", name:{en:"Maize – Mung – Rice",bn:"ভুট্টা – মুগ – ধান"}, tag:{en:"Soil builder",bn:"মাটি উন্নয়ন"},
      seq:[{en:"Maize",bn:"ভুট্টা"},{en:"Mung bean",bn:"মুগ ডাল"},{en:"Aman rice",bn:"অমন ধান"}],
      sustain:92, risk:30, profit:214, cost:104, yield:7.9, change:19,
      scores:{disaster:70,yield:86,pest:76,water:74,cost:66,early:74,soil:90,profit:84,longer:80},
      cal:[{c:{en:"Maize",bn:"ভুট্টা"},s:0,e:3,col:"#b8862f"},{c:{en:"Mung bean",bn:"মুগ ডাল"},s:4,e:5,col:"#c07a3e"},
           {c:{en:"Aman rice",bn:"অমন ধান"},s:6,e:11,col:"#4d7c2f"}],
      pro:{en:["8–12 t/ha biomass returns to the soil","Breaks rice-only pest cycles","Best long-run organic matter gain"],bn:["৮–১২ টন/হেক্টর গাছপালা মাটিতে ফেরে","শুধু ধানের পোকার চক্র ভাঙে","দীর্ঘমেয়াদে জৈব পদার্থ সবচেয়ে বেশি বাড়ে"]},
      con:{en:["Needs extra nitrogen and a planter","Seed and fertiliser paid up front","Feed market must be within reach"],bn:["অতিরিক্ত নাইট্রোজেন ও প্ল্যান্টার লাগে","বীজ ও সার আগেই খরচ হয়","পশুখাদ্য বাজার কাছে থাকতে হবে"]},
      why:{en:"The strongest soil-first answer here — organic matter climbs fastest with maize residue.",
           bn:"মাটিকে আগে রাখলে সবচেয়ে ভালো উত্তর — ভুট্টার অবশিষ্টাংশে জৈব পদার্থ দ্রুত বাড়ে।"} },
    { id:"r4", name:{en:"Potato – Aus rice – Mung",bn:"আলু – অউস ধান – মুগ"}, tag:{en:"Highest income",bn:"সর্বোচ্চ আয়"},
      seq:[{en:"Potato",bn:"আলু"},{en:"Aus rice",bn:"অউস ধান"},{en:"Mung bean",bn:"মুগ ডাল"}],
      sustain:64, risk:56, profit:246, cost:138, yield:8.2, change:31,
      scores:{disaster:54,yield:90,pest:58,water:48,cost:52,early:80,soil:62,profit:90,longer:58},
      cal:[{c:{en:"Potato",bn:"আলু"},s:0,e:2,col:"#8a6d3b"},{c:{en:"Aus rice",bn:"অউস ধান"},s:3,e:7,col:"#93a862"},
           {c:{en:"Mung bean",bn:"মুগ ডাল"},s:8,e:9,col:"#c07a3e"}],
      pro:{en:["Largest profit per hectare","Three harvests in twelve months","Early potato reaches a premium market"],bn:["প্রতি হেক্টরে সর্বোচ্চ লাভ","বারো মাসে তিনটি ফসল","তাড়াতাড়ি আলুর ভালো দাম"]},
      con:{en:["Highest seed and fertiliser outlay","Drainage must be fixed first","Rain during harvest cuts grade"],bn:["বীজ ও সারের খরচ সবচেয়ে বেশি","আগে পরিস্রাবণ ঠিক করতে হবে","কাটার সময় বৃষ্টিতে মান নামে"]},
      why:{en:"Income first — but only if the drainage work and seed budget are already in place.",
           bn:"আগে আয় — তবে পরিস্রাবণ ও বীজের ব্যবস্থা থাকলে যাই।"} }
  ],

  /* ---- recommendations ---- */
  reco: {
    main:{ id:"r3", tag:{en:"Recommended",bn:"সুপারিশকৃত"}, fit:92, riskLv:{en:"Low–moderate",bn:"কম–মাঝারি"},
      why:{en:"Matches soil quality, profit and low water need at once, and keeps the monsoon flood exposure below 35.",
           bn:"মাটির গুণ, লাভ ও কম পানির চাহিদা একসঙ্গে পূরণ করে, আর বর্ষার বন্যার ঝুঁকি ৩৫-এর নিচে রাখে।"} },
    alt1:{ id:"r1", k:{en:"Best for balance",bn:"ভারসাম্যের জন্য"}, s:{en:"Low cost, familiar work",bn:"কম খরচ, পরিচিত কাজ"},
      q:{en:"Safest if you want no new inputs.",bn:"নতুন কিছু না চাইলে সবচেয়ে নিরাপদ।"} },
    alt2:{ id:"r4", k:{en:"Highest return",bn:"সর্বোচ্চ ফল"}, s:{en:"৳246k/ha profit potential",bn:"৳২.৪৬ লাখ/হেক্টর লাভের সম্ভাবনা"},
      q:{en:"Worth it once drainage is fixed.",bn:"পরিস্রাবণ ঠিক হলে উপযুক্ত।"} }
  },

  /* ---- help ---- */
  help: {
    water: { need:412, save:18, note:{en:"of crop water need met by rain",bn:"চাহিদার অংশ বৃষ্টিতে পূরণ হয়"} },
    irr: [
      {m:0,v:18},{m:1,v:24},{m:2,v:46},{m:3,v:74},{m:4,v:88},{m:5,v:52},
      {m:6,v:12},{m:7,v:8},{m:8,v:14},{m:9,v:36},{m:10,v:28},{m:11,v:16}
    ],
    soilTips:[
      {t:{en:"Add 2 t/ha compost before transplanting",bn:"রোপণের আগে ২ টন/হেক্টর কম্পোস্ট"}, d:{en:"Lifts organic matter from 1.9% toward 2.5% in two seasons.",bn:"দুই মৌসুমে জৈব পদার্থ ১.৯% থেকে ২.৫% এর দিকে যাবে।"} },
      {t:{en:"Keep stubble, burn nothing",bn:"তৃণ মাড়ান, পোড়াবেন না"}, d:{en:"Residue cover protects the surface from crusting and runoff.",bn:"অবশিষ্টাংশ মাটির উপর আবরণ হয়ে আর্দ্রতা ধরে রাখে।"} },
      {t:{en:"Open drainage furrows before July",bn:"জুলাইয়ের আগে পরিস্রাবণ খাল খুলুন"}, d:{en:"Clears standing water within 48 hours and cuts root rot.",bn:"৪৮ ঘণ্টার মধ্যে পানি নেমে যায়, শিক্ষা পচা কমে।"} },
      {t:{en:"Split nitrogen into three doses",bn:"নাইট্রোজেন তিন ভাগে দিন"}, d:{en:"Keeps the LST and NDVI curve steady instead of one spike.",bn:"NDVI-এর হঠাৎ চাপ না বাড়িয়ে সমান রাখে।"} }
    ],
    genTips:[
      {t:{en:"Scout with a light trap from June",bn:"জুন থেকে আলোর ফাঁদ দিয়ে পর্যবেক্ষণ"}, d:{en:"Two catches a week are enough to time spraying.",bn:"সপ্তাহে দুটি ধরা যথেষ্ট ওষুধের সময় ঠিক করতে।"} },
      {t:{en:"Irrigate at 50% available depletion",bn:"পানির ৫০% শেষ হলেই সেচ"}, d:{en:"Cuts pumping by about a fifth for the same yield.",bn:"একই উৎপাদনে পাম্পিং প্রায় এক-পঞ্চমাংশ কমে।"} },
      {t:{en:"Dry the grain to 12% before storage",bn:"সংরক্ষণের আগে দানা ১২% শুকান"}, d:{en:"Avoids storage loss through the humid months.",bn:"আর্দ্র মাসে সংরক্ষণের ক্ষতি এড়ায়।"} },
      {t:{en:"Check the hazard grid each April and July",bn:"প্রতি এপ্রিল ও জুলাইয়ে বিপদ দেখুন"}, d:{en:"Both months show the highest combined severity.",bn:"দুই মাসেই মোট তীব্রতা সর্বোচ্চ।"} }
    ]
  }
};
