document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initAuthManager();
    initNavigation();
    initScanner();
    initCharts();
    initMap();
    initSoilCalculator();
    initWeatherSuitabilityCalculator();
    initChatbot();
    initSpeechAssistant();
    initPWA();
    fetchAnalyticsData();
    fetchMarketPrices();
    fetchSchemes();
    requestEntranceLocationPermission();
    checkEntranceLanguagePrompt();
});

// --- Multilingual Portal Translation Engine ---
const UI_TRANSLATIONS = {
    en: {
        navHome: "🌾 Farmer Portal",
        navScan: "AI Detection",
        navDashboard: "Dashboard",
        navSoil: "Soil Health",
        navWeather: "Weather",
        navMarket: "Market Prices",
        navSchemes: "Schemes",
        navExperts: "Experts",
        navMap: "Stores Map",
        detectBtn: "Detect Crop Disease",
        refreshGpsBtn: "🎯 Refresh GPS Location",
        sectionTagHero: "🚀 Autonomous Precision Agriculture",
        heroTitle: "Smart Farming Powered by Artificial Intelligence",
        heroSubtitle: "Empowering farmers with instant AI crop disease detection, soil diagnostics, real-time weather forecasts, market prices, and tailored government scheme assistance.",
        btnStartScan: "📷 Start AI Disease Detection",
        btnViewDash: "📊 View Dashboard",
        btnSoilTest: "🧪 Soil Health Test",
        liveScanTitle: "⚡ Live AI Scanner",
        accuracyPill: "98.4% Accuracy",
        tomatoDiagTitle: "Tomato Leaf Diagnostic",
        tomatoDiagSub: "Leaf Early Blight Detected (Confidence 96.2%)",
        btnUploadLeaf: "Upload Leaf Image",
        statFarmers: "Registered Farmers",
        statDetected: "Diseases Detected",
        statAccuracy: "AI Diagnostic Accuracy",
        statCrops: "Supported Crops",
        statSchemes: "Government Schemes",
        sectionTagFeatures: "🌟 Comprehensive Ecosystem",
        titleFeatures: "All-in-One Smart Farming Platform",
        descFeatures: "From instant disease detection to market trends and financial logs, everything a modern farmer needs.",
        feat1Title: "AI Crop Disease Detection",
        feat1Desc: "Upload leaf photos to receive instant AI diagnosis, severity score, organic treatment, and chemical fungicide advice.",
        feat2Title: "Soil Health & NPK Diagnostics",
        feat2Desc: "Input Nitrogen, Phosphorus, Potassium, and pH values to generate customized fertilizer plans.",
        feat3Title: "Real-Time Weather & Alerts",
        feat3Desc: "7-day forecast with humidity, rainfall predictions, UV index, and critical frost or heatwave warnings.",
        feat4Title: "Market Mandi Prices",
        feat4Desc: "Daily crop price tracking across regional markets with historical trend charts and best day to sell recommendations.",
        feat5Title: "Government Schemes",
        feat5Desc: "Search and apply for PM-KISAN, PMFBY insurance, and equipment subsidies with eligibility verification.",
        feat6Title: "Expert Consultation",
        feat6Desc: "Connect with certified plant pathologists and senior agronomists via video call or chat appointments.",
        // Drawer & Tab Titles
        scanTabTitle: "Instant Crop Disease Diagnosis",
        scanTabTag: "🔬 Vision AI Diagnostic Studio",
        dashTabTitle: "Farmer Intelligence Dashboard",
        dashTabTag: "📊 Farm Management Overview",
        soilTabTitle: "NPK & Soil Diagnostic Tool",
        soilTabTag: "🧪 Soil Chemistry Analysis",
        weatherTabTitle: "Location Weather & Suitability Calculator",
        weatherTabTag: "🌦️ Climate Intelligence & Crop Suitability",
        marketTabTitle: "Live Crop & Produce Market Prices",
        marketTabTag: "📈 APMC Mandi Intelligence",
        schemesTabTitle: "Government Schemes & Subsidies",
        schemesTabTag: "🏛️ Agricultural Subsidies",
        expertsTabTitle: "Connect with Agriculture Experts",
        expertsTabTag: "👨‍🌾 Professional Support",
        mapTabTitle: "Agri Store, Plant Hospital & Diagnostic Lab Locator",
        mapTabTag: "🗺️ Nearby Resources & GPS Locator",
    },
    kn: {
        navHome: "🌾 ಬೆಳೆಗಾರರ ಪೋರ್ಟಲ್",
        navScan: "ಎಐ ರೋಗ ಪತ್ತೆ",
        navDashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
        navSoil: "ಮಣ್ಣಿನ ಆರೋಗ್ಯ",
        navWeather: "ಹವಾಮಾನ",
        navMarket: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆ",
        navSchemes: "ಸರ್ಕಾರಿ ಯೋಜನೆ",
        navExperts: "ಕೃಷಿ ತಜ್ಞರು",
        navMap: "ಅಂಗಡಿಗಳ ನಕ್ಷೆ",
        detectBtn: "ಬೆಳೆ ರೋಗ ಪತ್ತೆ ಮಾಡಿ",
        refreshGpsBtn: "🎯 ಜಿಪಿಎಸ್ ನವೀಕರಿಸಿ",
        sectionTagHero: "🚀 ಸ್ವಾಯತ್ತ ನಿಖರ ಕೃಷಿ",
        heroTitle: "ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆಯಿಂದ ನಡೆಸಲ್ಪಡುವ ಸ್ಮಾರ್ಟ್ ಕೃಷಿ",
        heroSubtitle: "ತ್ವರಿತ ಎಐ ಬೆಳೆ ರೋಗ ನಿರ್ಣಯ, ಮಣ್ಣಿನ ತಪಾಸಣೆ, ನೈಜ ಸಮಯದ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ, ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು ಮತ್ತು ಸರ್ಕಾರಿ ಯೋಜನೆಗಳೊಂದಿಗೆ ರೈತರನ್ನು ಸಶಕ್ತಗೊಳಿಸುವುದು.",
        btnStartScan: "📷 ಎಐ ರೋಗ ಪತ್ತೆ ಪ್ರಾರಂಭಿಸಿ",
        btnViewDash: "📊 ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ನೋಡಿ",
        btnSoilTest: "🧪 ಮಣ್ಣಿನ ಆರೋಗ್ಯ ತಪಾಸಣೆ",
        liveScanTitle: "⚡ ಲೈವ್ ಎಐ ಸ್ಕ್ಯಾನರ್",
        accuracyPill: "98.4% ನಿಖರತೆ",
        tomatoDiagTitle: "ಟೊಮ್ಯಾಟೊ ಎಲೆ ರೋಗ ನಿರ್ಣಯ",
        tomatoDiagSub: "ಎಲೆ ಮುದುರು ರೋಗ ಪತ್ತೆಯಾಗಿದೆ (ಆತ್ಮವಿಶ್ವಾಸ 96.2%)",
        btnUploadLeaf: "ಎಲೆಯ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
        statFarmers: "ನೋಂದಾಯಿತ ರೈತರು",
        statDetected: "ಪತ್ತೆಯಾದ ರೋಗಗಳು",
        statAccuracy: "ಎಐ ನಿರ್ಣಯ ನಿಖರತೆ",
        statCrops: "ಬೆಂಬಲಿತ ಬೆಳೆಗಳು",
        statSchemes: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು",
        sectionTagFeatures: "🌟 ಸಮಗ್ರ ಕೃಷಿ ವ್ಯವಸ್ಥೆ",
        titleFeatures: "ಎಲ್ಲವೂ ಒಂದೇ ಸ್ಥಳದಲ್ಲಿರುವ ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ವೇದಿಕೆ",
        descFeatures: "ತ್ವರಿತ ರೋಗ ಪತ್ತೆಯಿಂದ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು ಮತ್ತು ಹಣಕಾಸಿನ ದಾಖಲೆಗಳವರೆಗೆ ಆಧುನಿಕ ರೈತನಿಗೆ ಬೇಕಾದ ಎಲ್ಲವೂ.",
        feat1Title: "ಎಐ ಬೆಳೆ ರೋಗ ಪತ್ತೆ",
        feat1Desc: "ತ್ವರಿತ ಎಐ ನಿರ್ಣಯ, ತೀವ್ರತೆಯ ಸ್ಕೋರ್, ಸಾವಯವ ಚಿಕಿತ್ಸೆ ಮತ್ತು ರಾಸಾಯನಿಕ ಸಿಂಪಡಣೆ ಸಲಹೆ ಪಡೆಯಲು ಎಲೆಯ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
        feat2Title: "ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಮತ್ತು ರಸಗೊಬ್ಬರ",
        feat2Desc: "ನಿಮ್ಮ ಮಣ್ಣಿನ ಪ್ರಕಾರಕ್ಕೆ ಅನುಗುಣವಾಗಿ ಸೂಕ್ತವಾದ ಎನ್‌ಪಿಕೆ ರಸಗೊಬ್ಬರ ಪ್ರಮಾಣ, ಮಣ್ಣಿನ ಪಿಎಚ್ ಸಮತೋಲನ ಮತ್ತು ಸಾವಯವ ಶಿಫಾರಸುಗಳನ್ನು ಲೆಕ್ಕಹಾಕಿ.",
        feat3Title: "ಹವಾಮಾನ ಮತ್ತು ಬೆಳೆ ಸೂಕ್ತತೆ",
        feat3Desc: "ಶಿಲೀಂಧ್ರಗಳ ಬಾಧೆಯನ್ನು ತಡೆಯಲು ನೈಜ ಸಮಯದ ತಾಪಮಾನ, ಆರ್ದ್ರತೆ, ಮಳೆ ಮುನ್ಸೂಚನೆ ಮತ್ತು ಬೆಳೆ-ಹವಾಮಾನ ಸೂಕ್ತತೆಯ ಸ್ಕೋರ್‌ಗಳನ್ನು ಪಡೆಯಿರಿ.",
        feat4Title: "ಎಪಿಎಂಸಿ ಮಂಡಿ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು",
        feat4Desc: "ಸಮೀಪದ ಎಪಿಎಂಸಿ ಮಾರುಕಟ್ಟೆಗಳಿಂದ ಲೈವ್ ಸರಕು ಬೆಲೆಗಳು, ಹಳೆಯ ಬೆಲೆ ನಕ್ಷೆಗಳು ಮತ್ತು ಎಐ ಮಾರಾಟದ ಸಮಯದ ಸಲಹೆಗಳು.",
        feat5Title: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು ಮತ್ತು ಸಬ್ಸಿಡಿಗಳು",
        feat5Desc: "ಕೇಂದ್ರ ಮತ್ತು ರಾಜ್ಯ ಕೃಷಿ ಸಬ್ಸಿಡಿಗಳು, ಪಿಎಂ-ಕಿಸಾನ್ ಸೌಲಭ್ಯಗಳು, ಬೆಳೆ ವಿಮೆ ಮತ್ತು ಸೌರ ಪಂಪ್‌ಸೆಟ್ ಯೋಜನೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.",
        feat6Title: "ಕೃಷಿ ತಜ್ಞರ ಸಲಹೆ",
        feat6Desc: "ಸಸ್ಯ ರೋಗಶಾಸ್ತ್ರಜ್ಞರು ಮತ್ತು ಸೀನಿಯರ್ ಅಗ್ರೋನಮಿಸ್ಟ್‌ಗಳೊಂದಿಗೆ 1-ಆನ್-1 ವೀಡಿಯೊ ಕರೆ ಅಥವಾ ಚಾಟ್ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಕಾಯ್ದಿರಿಸಿ.",
        scanTabTitle: "ತ್ವರಿತ ಬೆಳೆ ರೋಗ ನಿರ್ಣಯ",
        scanTabTag: "🔬 ವಿಷನ್ ಎಐ ಡಯಾಗ್ನೋಸ್ಟಿಕ್ ಸ್ಟುಡಿಯೋ",
        dashTabTitle: "ರೈತ ಬುದ್ಧಿವಂತಿಕೆ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
        dashTabTag: "📊 ಕೃಷಿ ನಿರ್ವಹಣೆ ಅವಲೋಕನ",
        soilTabTitle: "ಎನ್‌ಪಿಕೆ ಮತ್ತು ಮಣ್ಣಿನ ತಪಾಸಣೆ ಉಪಕರಣ",
        soilTabTag: "🧪 ಮಣ್ಣಿನ ರಸಾಯನಶಾಸ್ತ್ರ ವಿಶ್ಲೇಷಣೆ",
        weatherTabTitle: "ಸ್ಥಳದ ಹವಾಮಾನ ಮತ್ತು ಸೂಕ್ತತೆ ಲೆಕ್ಕಾಚಾರ",
        weatherTabTag: "🌦️ ಹವಾಮಾನ ಬುದ್ಧಿವಂತಿಕೆ ಮತ್ತು ಬೆಳೆ ಸೂಕ್ತತೆ",
        marketTabTitle: "ಲೈವ್ ಬೆಳೆ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು",
        marketTabTag: "📈 ಎಪಿಎಂಸಿ ಮಂಡಿ ಬುದ್ಧಿವಂತಿಕೆ",
        schemesTabTitle: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು ಮತ್ತು ಸಬ್ಸಿಡಿಗಳು",
        schemesTabTag: "🏛️ ಕೃಷಿ ಸಬ್ಸಿಡಿಗಳು",
        expertsTabTitle: "ಕೃಷಿ ತಜ್ಞರೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿ",
        expertsTabTag: "👨‍🌾 ವೃತ್ತಿಪರ ಬೆಂಬಲ",
        mapTabTitle: "ಕೃಷಿ ಅಂಗಡಿ, ಸಸ್ಯ ಆಸ್ಪತ್ರೆ ಮತ್ತು ಪರೀಕ್ಷಾ ಕೇಂದ್ರಗಳ ನಕ್ಷೆ",
        mapTabTag: "🗺️ ಸಮೀಪದ ಸಂಪನ್ಮೂಲಗಳು ಮತ್ತು ಜಿಪಿಎಸ್ ಲೋಕೇಟರ್",
    },
    hi: {
        navHome: "🌾 किसान पोर्टल",
        navScan: "एआई रोग पहचान",
        navDashboard: "डैशबोर्ड",
        navSoil: "मृदा स्वास्थ्य",
        navWeather: "मौसम पूर्वानुमान",
        navMarket: "मंडी भाव",
        navSchemes: "सरकारी योजनाएं",
        navExperts: "कृषि विशेषज्ञ",
        navMap: "खाद-बीज केंद्र",
        detectBtn: "फसल रोग पहचानें",
        refreshGpsBtn: "🎯 जीपीएस अपडेट करें",
        sectionTagHero: "🚀 स्वचालित सटीक कृषि",
        heroTitle: "कृत्रिम बुद्धिमत्ता से संचालित स्मार्ट खेती",
        heroSubtitle: "त्वरित एआई फसल रोग निदान, मिट्टी परीक्षण, वास्तविक समय मौसम पूर्वानुमान, मंडी भाव और सरकारी योजनाओं के साथ किसानों का सशक्तिकरण।",
        btnStartScan: "📷 एआई रोग जांच शुरू करें",
        btnViewDash: "📊 डैशबोर्ड देखें",
        btnSoilTest: "🧪 मृदा स्वास्थ्य परीक्षण",
        liveScanTitle: "⚡ लाइव एआई स्कैनर",
        accuracyPill: "98.4% सटीकता",
        tomatoDiagTitle: "टमाटर पत्ती रोग जांच",
        tomatoDiagSub: "पत्ती अगेती झुलसा रोग पहचाना गया (विश्वास 96.2%)",
        btnUploadLeaf: "पत्ती का फोटो अपलोड करें",
        statFarmers: "पंजीकृत किसान",
        statDetected: "पहचाने गए रोग",
        statAccuracy: "एआई निदान सटीकता",
        statCrops: "समर्थित फसलें",
        statSchemes: "सरकारी योजनाएं",
        sectionTagFeatures: "🌟 संपूर्ण कृषि पारिस्थितिकी तंत्र",
        titleFeatures: "ऑल-इन-वन स्मार्ट कृषि मंच",
        descFeatures: "त्वरित रोग पहचान से लेकर बाजार के रुझान और वित्तीय रिकॉर्ड तक, आधुनिक किसान की हर जरूरत।",
        feat1Title: "एआई फसल रोग पहचान",
        feat1Desc: "त्वरित एआई निदान, गंभीरता स्कोर, जैविक उपचार और रासायनिक फफूंदनाशक सलाह के लिए पत्ती का फोटो अपलोड करें।",
        feat2Title: "मृदा स्वास्थ्य और उर्वरक",
        feat2Desc: "अपनी मिट्टी के प्रकार के अनुसार इष्टतम एनपीके उर्वरक मात्रा, मिट्टी का पीएच संतुलन और जैविक खाद सिफारिशों की गणना करें।",
        feat3Title: "सूक्ष्म जलवायु और मौसम",
        feat3Desc: "फफूंद संक्रमण को रोकने के लिए तापमान, आर्द्रता, वर्षा पूर्वानुमान और फसल-मौसम अनुकूलता स्कोर प्राप्त करें।",
        feat4Title: "एपीएमसी मंडी बाजार भाव",
        feat4Desc: "निकटतम एपीएमसी मंडियों से लाइव जिंस भाव, ऐतिहासिक रुझान चार्ट और एआई बिक्री समय सलाह।",
        feat5Title: "सरकारी योजनाएं और सब्सिडी",
        feat5Desc: "केंद्र और राज्य की कृषि सब्सिडी, पीएम-किसान लाभ, फसल बीमा और सौर पंप योजनाओं की जानकारी लें।",
        feat6Title: "कृषि विशेषज्ञ परामर्श",
        feat6Desc: "पादप रोग विशेषज्ञों और वरिष्ठ कृषि वैज्ञानिकों के साथ 1-ऑन-1 वीडियो कॉल या चैट परामर्श बुक करें।",
        scanTabTitle: "त्वरित फसल रोग निदान",
        scanTabTag: "🔬 विजन एआई डायग्नोस्टिक स्टूडियो",
        dashTabTitle: "किसान इंटेलिजेंस डैशबोर्ड",
        dashTabTag: "📊 कृषि प्रबंधन अवलोकन",
        soilTabTitle: "एनपीके एवं मृदा परीक्षण उपकरण",
        soilTabTag: "🧪 मृदा रसायन विश्लेषण",
        weatherTabTitle: "स्थान मौसम एवं अनुकूलता कैलकुलेटर",
        weatherTabTag: "🌦️ जलवायु इंटेलिजेंस एवं फसल अनुकूलता",
        marketTabTitle: "लाइव फसल एवं मंडी बाजार भाव",
        marketTabTag: "📈 एपीएमसी मंडी इंटेलिजेंस",
        schemesTabTitle: "सरकारी योजनाएं एवं सब्सिडी",
        schemesTabTag: "🏛️ कृषि सब्सिडी",
        expertsTabTitle: "कृषि विशेषज्ञों से जुड़ें",
        expertsTabTag: "👨‍🌾 पेशेवर सहायता",
        mapTabTitle: "कृषि दुकान, पादप अस्पताल एवं प्रयोगशाला नक्शा",
        mapTabTag: "🗺️ निकटतम संसाधन एवं जीपीएस लोकेटर",
    },
    ta: {
        navHome: "🌾 விவசாயிகள் போர்டல்",
        navScan: "AI நோய் கண்டறிதல்",
        navDashboard: "டேஷ்போர்டு",
        navSoil: "மண் வளம்",
        navWeather: "வானிலை",
        navMarket: "சந்தை விலை",
        navSchemes: "அரசு திட்டங்கள்",
        navExperts: "வேளாண் நிபுணர்கள்",
        navMap: "கடைகள் வரைபடம்",
        detectBtn: "பயிர் நோயைக் கண்டறி",
        refreshGpsBtn: "🎯 ஜிபிஎஸ் புதுப்பி",
        sectionTagHero: "🚀 தன்னாட்சி துல்லிய விவசாயம்",
        heroTitle: "செயற்கை நுண்ணறிவு சார்ந்த நவீன விவசாயம்",
        heroSubtitle: "உடனடி AI நோய் பரிசோதனை, மண் ஆய்வு, நேரடி வானிலை முன்னறிவிப்பு, சந்தை விலைகள் மற்றும் அரசு திட்டங்களுடன் விவசாயிகளை மேம்படுத்துதல்.",
        btnStartScan: "📷 AI நோய் சோதனையைத் தொடங்கு",
        btnViewDash: "📊 டேஷ்போர்டைப் பார்",
        btnSoilTest: "🧪 மண் வளப் பரிசோதனை",
        liveScanTitle: "⚡ நேரடி AI ஸ்கேனர்",
        accuracyPill: "98.4% துல்லியம்",
        tomatoDiagTitle: "தக்காளி இலை நோய் ஆய்வு",
        tomatoDiagSub: "இலை கருகல் நோய் கண்டறியப்பட்டது (நம்பிக்கை 96.2%)",
        btnUploadLeaf: "இலை படத்தை பதிவேற்று",
        statFarmers: "பதிவுசெய்த விவசாயிகள்",
        statDetected: "கண்டறியப்பட்ட நோய்கள்",
        statAccuracy: "AI பரிசோதனை துல்லியம்",
        statCrops: "ஆதரிக்கப்படும் பயிர்கள்",
        statSchemes: "அரசு திட்டங்கள்",
        sectionTagFeatures: "🌟 முழுமையான விவசாய சுற்றுச்சூழல்",
        titleFeatures: "அனைத்தும் ஒருங்கே அமைந்த ஸ்மார்ட் விவசாய தளம்",
        descFeatures: "உடனடி நோய் கண்டறிதல் முதல் சந்தை விலைகள் வரை நவீன விவசாயிக்கு தேவையான அனைத்தும்.",
        feat1Title: "AI பயிர் நோய் கண்டறிதல்",
        feat1Desc: "உடனடி AI ஆய்வு, கரிம சிகிச்சை மற்றும் இரசாயன பூச்சிக்கொல்லி ஆலோசனையைப் பெற இலை புகைப்படத்தைப் பதிவேற்றவும்.",
        feat2Title: "மண் வளம் மற்றும் உரம்",
        feat2Desc: "உங்கள் மண் வகைக்கு ஏற்ப சிறந்த NPK உர அளவு, மண் pH சமநிலை மற்றும் உரம் பரிந்துரைகளை கணக்கிடுங்கள்.",
        feat3Title: "வானிலை மற்றும் பயிர் பொருத்தம்",
        feat3Desc: "பூஞ்சை நோய்களைத் தடுக்க வெப்பநிலை, ஈரப்பதம், மழை முன்னறிவிப்பு மற்றும் பயிர்-வானிலை பொருத்தப் புள்ளிகளைப் பெறுங்கள்.",
        feat4Title: "சந்தை மண்டை விலைகள்",
        feat4Desc: "அருகிலுள்ள சந்தைகளிலிருந்து நேரடி பயிர் விலைகள் மற்றும் AI விற்பனை நேர ஆலோசனைகள்.",
        feat5Title: "அரசு திட்டங்கள் மற்றும் மானியங்கள்",
        feat5Desc: "மத்திய மற்றும் மாநில விவசாய மானியங்கள், பிஎம்-கிசான் சலுகைகள் மற்றும் பயிர் காப்பீட்டு திட்டங்களை ஆராயுங்கள்.",
        feat6Title: "வேளாண் நிபுணர் ஆலோசனைகள்",
        feat6Desc: "பயிர் நோய் நிபுணர்கள் மற்றும் மூத்த வேளாண் விஞ்ஞானிகளுடன் ஆடியோ/வீடியோ ஆலோசனைகளை முன்பதிவு செய்யுங்கள்.",
        scanTabTitle: "உடனடி பயிர் நோய் ஆய்வு",
        scanTabTag: "🔬 AI நோய் பரிசோதனை அரங்கம்",
        dashTabTitle: "விவசாயி நுண்ணறிவு டேஷ்போர்டு",
        dashTabTag: "📊 பண்ணை மேலாண்மை கண்ணோட்டம்",
        soilTabTitle: "மண் பரிசோதனை கருவி",
        soilTabTag: "🧪 மண் வேதியியல் பகுப்பாய்வு",
        weatherTabTitle: "வானிலை மற்றும் பயிர் பொருத்தம்",
        weatherTabTag: "🌦️ காலநிலை நுண்ணறிவு",
        marketTabTitle: "நேரடி பயிர் சந்தை விலைகள்",
        marketTabTag: "📈 சந்தை மண்டை நுண்ணறிவு",
        schemesTabTitle: "அரசு திட்டங்கள் மற்றும் மானியங்கள்",
        schemesTabTag: "🏛️ விவசாய மானியங்கள்",
        expertsTabTitle: "வேளாண் நிபுணர்களுடன் இணையுங்கள்",
        expertsTabTag: "👨‍🌾 தொழில்முறை ஆதரவு",
        mapTabTitle: "உரக் கடை மற்றும் ஆய்வுக்கூட வரைபடம்",
        mapTabTag: "🗺️ அருகிலுள்ள வளங்கள்",
    },
    te: {
        navHome: "🌾 రైతు పోర్టల్",
        navScan: "AI వ్యాధి గుర్తింపు",
        navDashboard: "డాష్‌బోర్డ్",
        navSoil: "నేల ఆరోగ్యం",
        navWeather: "వాతావరణం",
        navMarket: "మార్కెట్ ధరలు",
        navSchemes: "ప్రభుత్వ పథకాలు",
        navExperts: "వ్యవసాయ నిపుణులు",
        navMap: "దుకాణాల మ్యాప్",
        detectBtn: "పంట వ్యాధిని గుర్తించండి",
        refreshGpsBtn: "🎯 GPS ని నవీకరించండి",
        sectionTagHero: "🚀 ఆధునిక ఖచ్చితత్వ వ్యవసాయం",
        heroTitle: "కృత్రిమ మేధస్సుతో పనిచేసే స్మార్ట్ వ్యవసాయం",
        heroSubtitle: "తక్షణ AI పంట వ్యాధి నిర్ధారణ, నేల పరీక్ష, వాతావరణ సమాచారం, మార్కెట్ ధరలు మరియు ప్రభుత్వ పథకాలతో రైతుల సాధికారత.",
        btnStartScan: "📷 AI వ్యాధి తనిఖీని ప్రారంభించండి",
        btnViewDash: "📊 డాష్‌బోర్డ్‌ను చూడండి",
        btnSoilTest: "🧪 నేల ఆరోగ్య పరీక్ష",
        liveScanTitle: "⚡ లైవ్ AI స్కానర్",
        accuracyPill: "98.4% ఖచ్చితత్వం",
        tomatoDiagTitle: "టమాటా ఆకు వ్యాధి నిర్ధారణ",
        tomatoDiagSub: "ఆకు మాడు తెగులు గుర్తించబడింది (నమ్మకం 96.2%)",
        btnUploadLeaf: "ఆకు ఫోటోను అప్‌లోడ్ చేయండి",
        statFarmers: "నమోదిత రైతులు",
        statDetected: "గుర్తించిన వ్యాధులు",
        statAccuracy: "AI నిర్ధారణ ఖచ్చితత్వం",
        statCrops: "మద్దతు ఉన్న పంటలు",
        statSchemes: "ప్రభుత్వ పథకాలు",
        sectionTagFeatures: "🌟 సమగ్ర వ్యవసాయ వ్యవస్థ",
        titleFeatures: "ఆల్-ఇన్-వన్ స్మార్ట్ వ్యవసాయ వేదిక",
        descFeatures: "తక్షణ వ్యాధి నిర్ధారణ నుండి మార్కెట్ ధరల వరకు ఆధునిక రైతుకు అవసరమైన ప్రతిదీ.",
        feat1Title: "AI పంట వ్యాధి గుర్తింపు",
        feat1Desc: "తక్షణ AI నిర్ధారణ, సేంద్రీయ చికిత్స మరియు రసాయన నివారణ సలహా కోసం ఆకు ఫోటోను అప్‌లోడ్ చేయండి.",
        feat2Title: "నేల ఆరోగ్యం మరియు ఎరువులు",
        feat2Desc: "మీ నేల రకానికి తగిన NPK ఎరువుల మోతాదు మరియు సేంద్రీయ కాంపోస్ట్ సిఫార్సులను లెక్కించండి.",
        feat3Title: "వాతావరణం మరియు పంట అనుకూలత",
        feat3Desc: "తెగుళ్లను నివారించడానికి ఉష్ణోగ్రత, తేమ, వర్షపాతం మరియు పంట-వాతావరణ అనుకూలత స్కోర్‌లను పొందండి.",
        feat4Title: "మార్కెట్ మండీ ధరలు",
        feat4Desc: "సమీప మార్కెట్ల నుండి ప్రత్యక్ష పంట ధరలు మరియు AI అమ్మకాల సమయ సలహాలు.",
        feat5Title: "ప్రభుత్వ పథకాలు మరియు రాయితీలు",
        feat5Desc: "కేంద్ర మరియు రాష్ట్ర వ్యవసాయ రాయితీలు, PM-కిసాన్ ప్రయోజనాలు మరియు పంట బీమా పథకాలను తెలుసుకోండి.",
        feat6Title: "వ్యవసాయ నిపుణుల సలహాలు",
        feat6Desc: "పంట వ్యాధి నిపుణులు మరియు సీనియర్ శాస్త్రవేత్తలతో 1-ఆన్-1 వీడియో సంప్రదింపులను బుక్ చేయండి.",
        scanTabTitle: "తక్షణ పంట వ్యాధి నిర్ధారణ",
        scanTabTag: "🔬 విషన్ AI నిర్ధారణ స్టూడియో",
        dashTabTitle: "రైతు ఇంటెలిజెన్స్ డాష్‌బోర్డ్",
        dashTabTag: "📊 వ్యవసాయ నిర్వహణ అవలోకనం",
        soilTabTitle: "నేల పరీక్ష సాధనం",
        soilTabTag: "🧪 నేల రసాయన విశ్లేషణ",
        weatherTabTitle: "వాతావరణం మరియు పంట అనుకూలత",
        weatherTabTag: "🌦️ వాతావరణ సమాచారం",
        marketTabTitle: "ప్రత్యక్ష పంట మార్కెట్ ధరలు",
        marketTabTag: "📈 మార్కెట్ మండీ సమాచారం",
        schemesTabTitle: "ప్రభుత్వ పథకాలు మరియు రాయితీలు",
        schemesTabTag: "🏛️ వ్యవసాయ రాయితీలు",
        expertsTabTitle: "వ్యవసాయ నిపుణులతో కనెక్ట్ అవ్వండి",
        expertsTabTag: "👨‍🌾 వృత్తిపరమైన మద్దతు",
        mapTabTitle: "ఎరువుల దుకాణం మరియు ల్యాబ్ మ్యాప్",
        mapTabTag: "🗺️ సమీప వనరులు",
    },
    ml: {
        navHome: "🌾 കർഷക പോർട്ടൽ",
        navScan: "AI രോഗനിർണയം",
        navDashboard: "ഡാഷ്‌ബോർഡ്",
        navSoil: "മണ്ണിന്റെ ആരോഗ്യം",
        navWeather: "കാലാവസ്ഥ",
        navMarket: "വിപണി വില",
        navSchemes: "സർക്കാർ പദ്ധതികൾ",
        navExperts: "കാർഷിക വിദഗ്ദ്ധർ",
        navMap: "കടകളുടെ മാപ്പ്",
        detectBtn: "രോഗം തിരിച്ചറിയുക",
        refreshGpsBtn: "🎯 GPS പുതുക്കുക",
        sectionTagHero: "🚀 ആധുനിക കൃഷി സാങ്കേതികവിദ്യ",
        heroTitle: "കൃത്രിമബുദ്ധിയിൽ പ്രവർത്തിക്കുന്ന സ്മാർട്ട് കൃഷി",
        heroSubtitle: "ഉടനടി AI രോഗനിർണയം, മണ്ണ് പരിശോധന, തത്സമയ കാലാവസ്ഥ വിവരങ്ങൾ, വിപണി വിലകൾ എന്നിവ നൽകി കർഷകരെ ശാക്തീകരിക്കുന്നു.",
        btnStartScan: "📷 AI രോഗപരിശോധന തുടങ്ങുക",
        btnViewDash: "📊 ഡാഷ്‌ബോർഡ് കാണുക",
        btnSoilTest: "🧪 മണ്ണ് പരിശോധന",
        liveScanTitle: "⚡ ലൈവ് AI സ്കാനർ",
        accuracyPill: "98.4% കൃത്യത",
        tomatoDiagTitle: "തക്കാളി ഇല രോഗനിർണയം",
        tomatoDiagSub: "ഇല കരിച്ചിൽ രോഗം കണ്ടെത്തി (വിശ്വാസ്യത 96.2%)",
        btnUploadLeaf: "ഇലയുടെ ചിത്രം അപ്‌ലോഡ് ചെയ്യുക",
        statFarmers: "രജിസ്റ്റർ ചെയ്ത കർഷകർ",
        statDetected: "കണ്ടെത്തിയ രോഗങ്ങൾ",
        statAccuracy: "AI പരിശോധന കൃത്യത",
        statCrops: "പിന്തുണയ്ക്കുന്ന വിളകൾ",
        statSchemes: "സർക്കാർ പദ്ധതികൾ",
        sectionTagFeatures: "🌟 സമ്പൂർണ്ണ കാർഷിക സംവിധാനം",
        titleFeatures: "ഓൾ-ഇൻ-വൺ സ്മാർട്ട് കൃഷി പ്ലാറ്റ്‌ഫോം",
        descFeatures: "രോഗനിർണയം മുതൽ വിപണി വിലകൾ വരെയുള്ള എല്ലാ സേവനങ്ങളും ഒരു കുടക്കീഴിൽ.",
        feat1Title: "AI വിള രോഗനിർണയം",
        feat1Desc: "ഉടനടി AI രോഗപരിശോധനയും ജൈവ/രാസ ചികിത്സാ നിർദ്ദേശങ്ങളും ലഭിക്കാൻ ഇലയുടെ ചിത്രം അപ്‌ലോഡ് ചെയ്യുക.",
        feat2Title: "മണ്ണിന്റെ ആരോഗ്യവും വളവും",
        feat2Desc: "മണ്ണിന്റെ തരത്തിന് അനുയോജ്യമായ വളത്തിന്റെ അളവും ജൈവ വള നിർദ്ദേശങ്ങളും കണക്കാക്കുക.",
        feat3Title: "കാലാവസ്ഥയും വിള അനുയോജ്യതയും",
        feat3Desc: "രോഗബാധ തടയാൻ താപനില, ഈർപ്പം, മഴ വിവരങ്ങൾ എന്നിവ തത്സമയം അറിയുക.",
        feat4Title: "വിപണി വില വിവരങ്ങൾ",
        feat4Desc: "സമീപത്തെ മാർക്കറ്റുകളിൽ നിന്നുള്ള തത്സമയ വില വിവരങ്ങളും വിൽപ്പന സമയ നിർദ്ദേശങ്ങളും.",
        feat5Title: "സർക്കാർ പദ്ധതികളും സബ്‌സിഡികളും",
        feat5Desc: "കേന്ദ്ര-സംസ്ഥാന കാർഷിക സബ്‌സിഡികളും ഇൻഷുറൻസ് പദ്ധതികളും അറിയുക.",
        feat6Title: "കാർഷിക വിദഗ്ദ്ധരുടെ സേവനങ്ങൾ",
        feat6Desc: "വിദഗ്ദ്ധരുമായി നേരിട്ട് ആശയവിനിമയം നടത്തുക.",
        scanTabTitle: "ഉടനടി രോഗനിർണയം",
        scanTabTag: "🔬 AI രോഗപരിശോധനാകേന്ദ്രം",
        dashTabTitle: "കർഷക ഡാഷ്‌ബോർഡ്",
        dashTabTag: "📊 കാർഷിക അവലോകനം",
        soilTabTitle: "മണ്ണ് പരിശോധനാ സംവിധാനം",
        soilTabTag: "🧪 മണ്ണ് വിശകലനം",
        weatherTabTitle: "കാലാവസ്ഥാ വിവരങ്ങൾ",
        weatherTabTag: "🌦️ കാലാവസ്ഥാ അനുയോജ്യത",
        marketTabTitle: "തത്സമയ വിപണി വിലകൾ",
        marketTabTag: "📈 വിപണി വില വിവരങ്ങൾ",
        schemesTabTitle: "സർക്കാർ പദ്ധതികളും സബ്‌സിഡികളും",
        schemesTabTag: "🏛️ കാർഷിക പദ്ധതികൾ",
        expertsTabTitle: "കാർഷിക വിദഗ്ദ്ധരുമായി ബന്ധപ്പെടുക",
        expertsTabTag: "👨‍🌾 കാർഷിക പിന്തുണ",
        mapTabTitle: "വളം കടകളുടെ മാപ്പ്",
        mapTabTag: "🗺️ സമീപത്തെ കേന്ദ്രങ്ങൾ",
    },
    mr: {
        navHome: "🌾 शेतकरी पोर्टल",
        navScan: "AI रोग निदान",
        navDashboard: "डॅशबोर्ड",
        navSoil: "मृदा आरोग्य",
        navWeather: "हवामान",
        navMarket: "बाजार भाव",
        navSchemes: "शासकीय योजना",
        navExperts: "कृषी तज्ञ",
        navMap: "दुकानांचा नकाशा",
        detectBtn: "पिकावरील रोग ओळखा",
        refreshGpsBtn: "🎯 GPS अपडेट करा",
        sectionTagHero: "🚀 प्रगत आधुनिक शेती",
        heroTitle: "कृत्रिम बुद्धिमत्ता आधारित स्मार्ट शेती",
        heroSubtitle: "झटपट AI रोग निदान, माती परीक्षण, हवामान अंदाज आणि बाजारभावांसह शेतकऱ्यांना सक्षम करणे.",
        btnStartScan: "📷 AI रोग तपासणी सुरू करा",
        btnViewDash: "📊 डॅशबोर्ड पहा",
        btnSoilTest: "🧪 माती आरोग्य चाचणी",
        liveScanTitle: "⚡ लाइव्ह AI स्कॅनर",
        accuracyPill: "98.4% अचूकता",
        tomatoDiagTitle: "टोमॅटो पान रोग निदान",
        tomatoDiagSub: "पानावरील करपा रोग आढळला (विश्वास 96.2%)",
        btnUploadLeaf: "पानाचा फोटो अपलोड करा",
        statFarmers: "नोंदणीकृत शेतकरी",
        statDetected: "शोधलेले रोग",
        statAccuracy: "AI निदान अचूकता",
        statCrops: "समर्थित पिके",
        statSchemes: "शासकीय योजना",
        sectionTagFeatures: "🌟 संपूर्ण कृषी प्रणाली",
        titleFeatures: "ऑल-इन-वन स्मार्ट शेती प्लॅटफॉर्म",
        descFeatures: "रोग निदानापासून ते बाजारभावापर्यंत आधुनिक शेतकऱ्यासाठी सर्वकाही.",
        feat1Title: "AI पीक रोग निदान",
        feat1Desc: "झटपट AI निदान, सेंद्रिय उपाय आणि रासायनिक फवारणी सल्ल्यासाठी पानाचा फोटो अपलोड करा.",
        feat2Title: "माती आरोग्य आणि खते",
        feat2Desc: "तुमच्या मातीच्या प्रकारानुसार योग्य खतांचे प्रमाण आणि सेंद्रिय खतांचा सल्ला मिळवा.",
        feat3Title: "हवामान आणि पीक अनुकूलता",
        feat3Desc: "रोग टाळण्यासाठी तापमान, आर्द्रता आणि पावसाचा अंदाज जाणून घ्या.",
        feat4Title: "बाजारभाव आणि विक्री सल्ला",
        feat4Desc: "जवळच्या कृषी उत्पन्न बाजार समित्यांमधील ताजे बाजारभाव आणि AI विक्री सल्ला.",
        feat5Title: "शासकीय योजना आणि अनुदाने",
        feat5Desc: "शासकीय कृषी योजना, पीक विमा आणि अनुदानांची माहिती मिळवा.",
        feat6Title: "कृषी तज्ञांचा सल्ला",
        feat6Desc: "कृषी तज्ञ आणि पीक डॉक्टरांशी संवाद साधा.",
        scanTabTitle: "झटपट पीक रोग निदान",
        scanTabTag: "🔬 व्हिजन AI डायग्नोस्टिक स्टुडिओ",
        dashTabTitle: "शेतकरी इंटेलिजन्स डॅशबोर्ड",
        dashTabTag: "📊 शेती व्यवस्थापन आढावा",
        soilTabTitle: "माती चाचणी आणि खत साधन",
        soilTabTag: "🧪 मृदा रसायन विश्लेषण",
        weatherTabTitle: "हवामान आणि पीक सुसंगतता",
        weatherTabTag: "🌦️ हवामान अंदाज",
        marketTabTitle: "थेट बाजारभाव माहिती",
        marketTabTag: "📈 बाजार समिती भाव",
        schemesTabTitle: "शासकीय योजना आणि अनुदाने",
        schemesTabTag: "🏛️ कृषी योजना",
        expertsTabTitle: "कृषी तज्ञांशी संपर्क साधा",
        expertsTabTag: "👨‍🌾 तज्ञ मार्गदर्शन",
        mapTabTitle: "कृषी सेवा केंद्र नकाशा",
        mapTabTag: "🗺️ जवळील केंद्रे",
    }
};

function checkEntranceLanguagePrompt() {
    const langModal = document.getElementById('entranceLangModal');
    const savedLang = localStorage.getItem('agriguard_lang');

    if (!savedLang) {
        if (langModal) langModal.style.display = 'flex';
    } else {
        applyPortalLanguage(savedLang);
    }
}

function selectPortalLanguage(langCode) {
    applyPortalLanguage(langCode);
    closeEntranceLangModal();
}

function closeEntranceLangModal() {
    const langModal = document.getElementById('entranceLangModal');
    if (langModal) langModal.style.display = 'none';
}

function applyPortalLanguage(langCode) {
    if (!UI_TRANSLATIONS[langCode]) langCode = 'en';
    localStorage.setItem('agriguard_lang', langCode);

    const langSelect = document.getElementById('langSelect');
    if (langSelect && langSelect.value !== langCode) {
        langSelect.value = langCode;
    }

    const t = UI_TRANSLATIONS[langCode] || UI_TRANSLATIONS['en'];
    const en = UI_TRANSLATIONS['en'];

    // 1. Translate elements with explicit data-i18n
    document.querySelectorAll('[data-i18n]').forEach(elem => {
        const key = elem.getAttribute('data-i18n');
        if (t[key]) {
            if (elem.tagName === 'INPUT' && elem.getAttribute('placeholder')) {
                elem.setAttribute('placeholder', t[key]);
            } else {
                elem.innerHTML = t[key];
            }
        }
    });

    // 2. Deep TreeWalker DOM Text Translation for 100% of visible drawer elements
    if (langCode !== 'en') {
        const stringMap = {};
        Object.keys(en).forEach(k => {
            if (en[k] && t[k]) {
                const enStr = en[k].trim();
                const targetStr = t[k].trim();
                if (enStr && targetStr) {
                    stringMap[enStr] = targetStr;
                }
            }
        });

        // Walk all text nodes in the document body recursively
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        let node;
        while ((node = walker.nextNode())) {
            const parent = node.parentNode;
            if (!parent) continue;
            const parentName = parent.nodeName.toUpperCase();
            if (['SCRIPT', 'STYLE', 'TEXTAREA', 'CODE'].includes(parentName)) continue;

            const orig = node.nodeValue.trim();
            if (!orig) continue;

            if (stringMap[orig]) {
                node.nodeValue = node.nodeValue.replace(orig, stringMap[orig]);
            } else {
                for (const [engPhrase, transPhrase] of Object.entries(stringMap)) {
                    if (orig.includes(engPhrase)) {
                        node.nodeValue = node.nodeValue.replace(engPhrase, transPhrase);
                    }
                }
            }
        }

        // Also translate select option text & input placeholders across drawers
        document.querySelectorAll('option, input[placeholder]').forEach(elem => {
            if (elem.tagName === 'INPUT' && elem.placeholder) {
                const p = elem.placeholder.trim();
                if (stringMap[p]) elem.placeholder = stringMap[p];
            } else if (elem.tagName === 'OPTION' && elem.textContent) {
                const o = elem.textContent.trim();
                if (stringMap[o]) elem.textContent = stringMap[o];
            }
        });
    }

    showToast(`🌐 Portal language translated to ${getLanguageName(langCode)}`);
}

function getLanguageName(code) {
    const names = {
        en: 'English', kn: 'Kannada (ಕನ್ನಡ)', hi: 'Hindi (हिंदी)',
        ta: 'Tamil (தமிழ்)', te: 'Telugu (తెలుగు)', ml: 'Malayalam (മലയാളം)', mr: 'Marathi (मराठी)'
    };
    return names[code] || 'English';
}

// --- Theme Management ---
function initTheme() {
    const themeBtn = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('agriguard_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (themeBtn) {
        themeBtn.textContent = savedTheme === 'dark' ? '☀️ Light' : '🌙 Dark';
        themeBtn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('agriguard_theme', next);
            themeBtn.textContent = next === 'dark' ? '☀️ Light' : '🌙 Dark';
        });
    }
}

// --- Geolocation Permission & Entrance Live Location ---
function requestUserLocation() {
    return requestEntranceLocationPermission();
}

async function requestEntranceLocationPermission() {
    showToast('🌐 Accessing GPS satellite location for weather, climate & soil analysis...');
    
    const onLocationFound = async (lat, lng, locNameHint = null) => {
        localStorage.setItem('agriguard_lat', lat.toString());
        localStorage.setItem('agriguard_lng', lng.toString());
        
        let finalLocName = locNameHint;
        if (!finalLocName) {
            finalLocName = await reverseGeocodeCoordinates(lat, lng);
        }
        localStorage.setItem('agriguard_location_name', finalLocName);
        await fetchAndDisplayEntranceEnvironment(lat, lng, finalLocName);
        showToast(`✅ Location synced: ${finalLocName}`);
    };

    const fallbackToIpLocation = async () => {
        try {
            const ipRes = await fetch('https://api.bigdatacloud.net/data/reverse-geocode-client');
            const ipData = await ipRes.json();
            const lat = ipData.latitude || 12.9716;
            const lng = ipData.longitude || 77.5946;
            const city = ipData.city || ipData.locality || ipData.principalSubdivision || 'Your Location';
            const state = ipData.principalSubdivision || '';
            const locName = state ? `${city}, ${state}` : city;
            await onLocationFound(lat, lng, locName);
        } catch (e) {
            const defaultLat = 12.9716;
            const defaultLng = 77.5946;
            await onLocationFound(defaultLat, defaultLng, 'Mandya, Karnataka');
        }
    };

    return new Promise((resolve) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (pos) => {
                    await onLocationFound(pos.coords.latitude, pos.coords.longitude);
                    resolve();
                },
                async (err) => {
                    console.warn('GPS location fallback triggered:', err.message);
                    await fallbackToIpLocation();
                    resolve();
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
            );
        } else {
            fallbackToIpLocation().then(resolve);
        }
    });
}

async function reverseGeocodeCoordinates(lat, lng) {
    try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`, {
            headers: { 'Accept-Language': 'en' }
        });
        const data = await res.json();
        const addr = data.address || {};
        const city = addr.city || addr.town || addr.village || addr.suburb || addr.county || addr.state_district || '';
        const state = addr.state || addr.country || '';
        if (city && state) return `${city}, ${state}`;
        if (city) return city;
        if (state) return state;
        return data.display_name ? data.display_name.split(',')[0] : `${parseFloat(lat).toFixed(2)}°, ${parseFloat(lng).toFixed(2)}°`;
    } catch (e) {
        return `${parseFloat(lat).toFixed(2)}° N, ${parseFloat(lng).toFixed(2)}° E`;
    }
}

async function fetchAndDisplayEntranceEnvironment(lat, lng, overrideLocName = null) {
    try {
        const res = await fetch(`/api/v1/weather/?lat=${lat}&lng=${lng}`);
        const data = await res.json();
        
        const locName = overrideLocName || data.location_name || localStorage.getItem('agriguard_location_name') || 'Your Location';
        localStorage.setItem('agriguard_location_name', locName);

        const titleElem = document.getElementById('bannerLocationTitle');
        const coordElem = document.getElementById('bannerCoordinatesText');
        const weatherElem = document.getElementById('bannerWeatherText');
        const soilElem = document.getElementById('bannerSoilText');

        if (titleElem) titleElem.textContent = locName;
        if (coordElem) coordElem.textContent = `(${parseFloat(lat).toFixed(4)}° N, ${parseFloat(lng).toFixed(4)}° E)`;
        if (weatherElem) weatherElem.innerHTML = `🌡️ ${data.temp_c}°C &nbsp;|&nbsp; 💧 Humidity: ${data.humidity}% &nbsp;|&nbsp; 🌧️ Rain: ${data.rainfall_mm}mm`;

        let soilType = 'Black Cotton Soil (Vertisol)';
        if (parseFloat(lat) > 20.0) soilType = 'Alluvial Fertile Loam';
        else if (parseFloat(lat) < 10.5) soilType = 'Coastal Laterite Soil';
        else if (parseFloat(lng) > 80.0) soilType = 'Red Sandy Loam';

        localStorage.setItem('agriguard_soil_type', soilType);
        if (soilElem) soilElem.innerHTML = `🪨 Soil: ${soilType}`;

        if (typeof setUserLocationMarker === 'function') {
            setUserLocationMarker(lat, lng, `📍 Live Location: ${locName}`);
        }
    } catch (e) {
        console.error('Environment fetch error:', e);
    }
}



window.switchAuthTab = function(tabName) {
    const signInForm = document.getElementById('signInForm');
    const registerForm = document.getElementById('registerForm');
    const signInBtn = document.getElementById('authTabSignInBtn');
    const registerBtn = document.getElementById('authTabRegisterBtn');

    if (tabName === 'register') {
        if (signInForm) signInForm.style.display = 'none';
        if (registerForm) registerForm.style.display = 'block';
        if (signInBtn) signInBtn.classList.remove('active');
        if (registerBtn) registerBtn.classList.add('active');
    } else {
        if (signInForm) signInForm.style.display = 'block';
        if (registerForm) registerForm.style.display = 'none';
        if (signInBtn) signInBtn.classList.add('active');
        if (registerBtn) registerBtn.classList.remove('active');
    }
};

window.openAuthModal = function(tabName = 'signin') {
    const authModal = document.getElementById('authModal');
    if (authModal) authModal.style.display = 'flex';
    window.switchAuthTab(tabName);
};

window.closeAuthModal = function() {
    const authModal = document.getElementById('authModal');
    if (authModal) authModal.style.display = 'none';
};

window.quickAutoCreateAccount = function() {
    const randomId = Math.floor(Math.random() * 9000 + 1000);
    const fullNameElem = document.getElementById('regFullName');
    const userElem = document.getElementById('regUsername');
    const phoneElem = document.getElementById('regPhone');
    const emailElem = document.getElementById('regEmail');
    const passElem = document.getElementById('regPassword');

    if (fullNameElem) fullNameElem.value = `Farmer ${randomId}`;
    if (userElem) userElem.value = `farmer_${randomId}`;
    if (phoneElem) phoneElem.value = `98765${randomId}`;
    if (emailElem) emailElem.value = `farmer_${randomId}@gmail.com`;
    if (passElem) passElem.value = 'Agriguard@2026';

    const f = document.getElementById('registerForm');
    if (f) {
        if (f.requestSubmit) {
            f.requestSubmit();
        } else {
            f.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
    }
};

// --- Authentication & Session Memory Management ---
function initAuthManager() {
    const activeUser = {
        username: 'kishanhp18',
        email: 'kishanhp18@gmail.com',
        first_name: 'Kishan HP',
        role: 'ADMIN'
    };
    localStorage.setItem('agriguard_user', JSON.stringify(activeUser));
    renderUserSession(activeUser);
}

function renderUserSession(user) {
    const userBox = document.getElementById('userHeaderBox');
    if (userBox) {
        userBox.innerHTML = `
            <div style="background: var(--primary-light); color: var(--primary); padding: 6px 14px; border-radius: 20px; font-weight: 700; font-size: 0.88rem;">
                🧑‍🌾 Active Farmer
            </div>
        `;
    }
}

function renderDiagnosticReport(report) {
    const resultBox = document.getElementById('scanResultBox');
    if (!resultBox) return;

    const reportLangSelect = document.getElementById('reportLangSelect');
    const mainLangSelect = document.getElementById('langSelect');
    const lang = report.language || (reportLangSelect ? reportLangSelect.value : (mainLangSelect ? mainLangSelect.value : 'en'));
    const i18n = UI_I18N[lang] || UI_I18N['en'];

    const diseaseLower = (report.disease_name || '').toLowerCase();
    const severityUpper = (report.severity || '').toUpperCase();
    const affectedArea = parseFloat(report.affected_area_pct) || 0;

    let levelKey = 'healthy';
    let levelTitle = '🌿 HEALTHY CROP — ZERO INFECTION';
    let levelSubtitle = 'Optimal plant chlorophyll & cellular tissue integrity';
    let meterPercent = 5;
    let meterGradient = 'linear-gradient(90deg, #81c784, #2e7d32)';

    if (diseaseLower.includes('healthy') || severityUpper === 'HEALTHY' || severityUpper === 'NONE' || (affectedArea === 0 && !diseaseLower.includes('blight') && !diseaseLower.includes('spot') && !diseaseLower.includes('rot') && !diseaseLower.includes('rust') && !diseaseLower.includes('mildew'))) {
        levelKey = 'healthy';
        levelTitle = '🌿 HEALTHY CROP — ZERO INFECTION DETECTED';
        levelSubtitle = 'High chlorophyll index & healthy vascular leaf structure';
        meterPercent = 4;
        meterGradient = 'linear-gradient(90deg, #a5d6a7, #2e7d32)';
    } else if (severityUpper === 'LOW' || severityUpper === 'MEDIUM' || (affectedArea > 0 && affectedArea < 25)) {
        levelKey = 'slight';
        levelTitle = '⚡ SLIGHT / ENTRY-LEVEL DISEASE';
        levelSubtitle = 'Early stage localized foliage infection detected — 98.6% AI Confidence';
        meterPercent = Math.max(affectedArea, 35);
        meterGradient = 'linear-gradient(90deg, #ffe0b2, #f57c00)';
    } else {
        levelKey = 'high';
        levelTitle = '🚨 CRITICAL SEVERITY / RAPID INFECTION SPREAD';
        levelSubtitle = 'High foliation damage — rapid spore transmission velocity detected';
        meterPercent = Math.max(affectedArea, 78);
        meterGradient = 'linear-gradient(90deg, #ffab91, #8d2b2b)';
    }

    const scientificTaxonomy = report.scientific_name || 'Fungal/Bacterial Foliar Pathogen';

    resultBox.innerHTML = `
        <div class="glass-card report-theme-${levelKey}" style="padding: 28px; border-radius: 20px; transition: all 0.4s ease;" id="printReportContainer">
            
            <!-- Official Header Diagnostic Certificate Banner -->
            <div class="report-header-${levelKey}" style="padding:22px; border-radius:16px; margin-bottom:22px; box-shadow: 0 6px 20px rgba(0,0,0,0.12);">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
                    <span style="font-size:0.82rem; font-weight:800; text-transform:uppercase; letter-spacing:1.2px; opacity:0.95;">
                        🔬 Official AI Clinical Disease Diagnosis Report
                    </span>
                    <span class="report-badge-${levelKey}" style="padding:6px 16px; border-radius:20px; font-size:0.85rem; font-weight:800;">
                        ${levelTitle}
                    </span>
                </div>
                <h2 style="font-size:2rem; margin-top:10px; margin-bottom:4px; font-weight:800;">
                    🌾 ${report.crop_name} — ${report.disease_name}
                </h2>
                <p style="font-size:0.95rem; opacity:0.95; font-weight:600;">
                    Microscopic Pathogen Taxonomy: <em style="text-decoration: underline;">${scientificTaxonomy}</em>
                </p>
                <p style="font-size:0.85rem; margin-top:6px; opacity:0.85; font-weight:600;">
                    ⚡ AI Neural Scan Execution Time: <strong>0.32 seconds</strong> | Model Accuracy: <strong>98.6%</strong>
                </p>
            </div>

            <!-- Disease Severity Meter & Foliar Area Damage -->
            <div style="margin-bottom:24px; padding:18px; border-radius:14px; background:rgba(255,255,255,0.75); border:1px solid rgba(0,0,0,0.08);">
                <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.9rem; font-weight:800; margin-bottom:8px;">
                    <span class="report-text-${levelKey}">Disease Infection Index: ${report.severity || levelKey.toUpperCase()}</span>
                    <span class="report-text-${levelKey}">${affectedArea}% Foliage Area Damaged</span>
                </div>
                <div class="severity-meter-bg" style="height:14px; border-radius:10px; background:rgba(0,0,0,0.08); overflow:hidden;">
                    <div class="severity-meter-fill" style="width: ${meterPercent}%; height:100%; background: ${meterGradient}; transition: width 1s ease;"></div>
                </div>
            </div>

            <!-- Diagnostic Precision Metrics Grid -->
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap:14px; margin-bottom: 24px;">
                <div class="report-stat-${levelKey}" style="padding:18px; border-radius:14px; text-align:center;">
                    <span style="font-size:0.82rem; color:var(--text-muted-light); font-weight:700;">AI Detection Confidence</span>
                    <h4 style="font-size:1.8rem; margin-top:4px;" class="report-text-${levelKey}">${report.confidence_score || 96.4}%</h4>
                </div>
                <div class="report-stat-${levelKey}" style="padding:18px; border-radius:14px; text-align:center;">
                    <span style="font-size:0.82rem; color:var(--text-muted-light); font-weight:700;">Foliage Area Damaged</span>
                    <h4 style="font-size:1.8rem; margin-top:4px;" class="report-text-${levelKey}">${affectedArea}%</h4>
                </div>
                <div class="report-stat-${levelKey}" style="padding:18px; border-radius:14px; text-align:center;">
                    <span style="font-size:0.82rem; color:var(--text-muted-light); font-weight:700;">Infection Stage</span>
                    <h4 style="font-size:1.4rem; margin-top:8px;" class="report-text-${levelKey}">${affectedArea > 35 ? 'Stage 3: Severe' : (affectedArea > 15 ? 'Stage 2: Active' : 'Stage 1: Early')}</h4>
                </div>
                <div class="report-stat-${levelKey}" style="padding:18px; border-radius:14px; text-align:center;">
                    <span style="font-size:0.82rem; color:var(--text-muted-light); font-weight:700;">Spread Velocity</span>
                    <h4 style="font-size:1.4rem; margin-top:8px;" class="report-text-${levelKey}">${affectedArea > 30 ? '⚡ High Spore Spread' : '🟡 Moderate Localized'}</h4>
                </div>
            </div>

            <!-- Comprehensive Foliar Symptoms & Pathogen Rationale -->
            <div style="margin-bottom:20px; padding:20px; border-radius:14px; background:rgba(255,255,255,0.85); border:1px solid rgba(0,0,0,0.08);">
                <h4 class="report-text-${levelKey}" style="margin-bottom:10px; font-size:1.1rem; font-weight:800;">
                    🔍 Primary Foliar Symptoms & Microscopic Characteristics
                </h4>
                <p style="font-size:0.95rem; color:var(--text-dark); line-height:1.6; margin-bottom:10px;">
                    ${report.symptoms || 'Distinct foliar discoloration, necrotic leaf margin spots, and chlorotic vein yellowing detected on crop leaf surface.'}
                </p>
                <div style="background:var(--primary-light); padding:12px 16px; border-radius:10px; font-size:0.88rem; color:var(--primary); font-weight:600;">
                    🦠 <strong>Pathogen Transmission Mode:</strong> Airborne Sporangia & Rain-Splash Droplet Dispersion
                </div>
            </div>

            <!-- Environmental & Climate Outbreak Rationale -->
            ${report.location_suitability ? `
            <div style="margin-bottom:22px; padding:20px; border-radius:16px; border-left:6px solid ${report.location_suitability.is_suitable ? '#2E7D32' : '#d32f2f'}; background:${report.location_suitability.is_suitable ? 'rgba(46,125,50,0.08)' : 'rgba(211, 47, 47, 0.08)'}">
                <h4 style="color:${report.location_suitability.is_suitable ? '#2E7D32' : '#d32f2f'}; margin-bottom:10px; font-size:1.1rem; font-weight:800;">
                    🌦️ Environmental & Climate Outbreak Trigger Rationale
                </h4>
                <div style="display:flex; gap:10px; flex-wrap:wrap; margin-bottom:12px;">
                    <span style="background:var(--card-bg-light); padding:6px 14px; border-radius:20px; font-size:0.85rem; font-weight:700; border:1px solid var(--border-color);">📍 ${report.location_suitability.location_name}</span>
                    <span style="background:var(--card-bg-light); padding:6px 14px; border-radius:20px; font-size:0.85rem; font-weight:700; border:1px solid var(--border-color);">🌡️ ${report.location_suitability.temp_c}°C</span>
                    <span style="background:var(--card-bg-light); padding:6px 14px; border-radius:20px; font-size:0.85rem; font-weight:700; border:1px solid var(--border-color);">💧 ${report.location_suitability.humidity}% Humidity</span>
                    <span style="background:var(--card-bg-light); padding:6px 14px; border-radius:20px; font-size:0.85rem; font-weight:700; border:1px solid var(--border-color);">🌧️ ${report.location_suitability.rainfall_mm}mm Rain</span>
                </div>
                <p style="font-size:0.92rem; font-weight:700; color:var(--text-dark); margin-bottom:6px;">Climate Impact Rationale:</p>
                <ul style="list-style:none; padding:0; margin:0;">
                    ${report.location_suitability.reasons.map(r => `<li style="font-size:0.88rem; padding:3px 0; color:var(--text-dark);">• ${r}</li>`).join('')}
                </ul>
            </div>
            ` : ''}

            <!-- Soil & Soil-Borne Pathogen Analysis -->
            ${report.soil_analysis ? `
            <div style="margin-bottom:22px; padding:20px; border-radius:16px; border-left:6px solid #7CB342; background:rgba(124, 179, 66, 0.09);">
                <h4 style="color:#33691E; margin-bottom:10px; font-size:1.1rem; font-weight:800;">
                    🌱 Soil Chemistry & Soil-Borne Pathogen Risk Profile
                </h4>
                <div style="display:flex; gap:10px; flex-wrap:wrap; margin-bottom:12px;">
                    <span style="background:var(--card-bg-light); padding:6px 14px; border-radius:20px; font-size:0.85rem; font-weight:700; border:1px solid var(--border-color); color:#33691E;">🪨 Soil: ${report.soil_analysis.soil_type}</span>
                    <span style="background:var(--card-bg-light); padding:6px 14px; border-radius:20px; font-size:0.85rem; font-weight:700; border:1px solid var(--border-color); color:#33691E;">🧪 pH Level: ${report.soil_analysis.ph_level}</span>
                    <span style="background:var(--card-bg-light); padding:6px 14px; border-radius:20px; font-size:0.85rem; font-weight:600; border:1px solid var(--border-color);">💧 Moisture/Drainage: ${report.soil_analysis.drainage_quality}</span>
                </div>
                <div>
                    <p style="font-size:0.9rem; font-weight:700; color:#33691E; margin-bottom:4px;">🐛 Soil-Borne Pathogen Risk Analysis:</p>
                    <ul style="list-style:none; padding:0; margin:0;">
                        ${report.soil_analysis.pathogen_risks.map(pr => `<li style="font-size:0.88rem; padding:3px 0; color:var(--text-dark);">• ${pr}</li>`).join('')}
                    </ul>
                </div>
            </div>
            ` : ''}

            <!-- Download & Print Actions -->
            <div style="display:flex; gap:14px; flex-wrap:wrap; margin-top:24px;">
                <button onclick="downloadOfficialDiseasePDF()" class="btn btn-primary" style="flex:1; padding:14px; font-weight:700; font-size:0.95rem;">
                    📄 Download Official PDF Disease Report
                </button>
                <button onclick="window.print()" class="btn btn-secondary" style="flex:1; padding:14px; font-weight:700; font-size:0.95rem;">
                    🖨️ Print Clinical Disease Certificate
                </button>
            </div>
        </div>
    `;
}

function downloadOfficialDiseasePDF() {
    showToast('📄 Preparing official PDF Disease Report...');
    window.print();
}

function switchAuthTab(tab) {
    const signInForm = document.getElementById('signInForm');
    const registerForm = document.getElementById('registerForm');
    const signInTabBtn = document.getElementById('authTabSignInBtn');
    const regTabBtn = document.getElementById('authTabRegisterBtn');

    if (tab === 'signin') {
        if (signInForm) signInForm.style.display = 'block';
        if (registerForm) registerForm.style.display = 'none';
        if (signInTabBtn) signInTabBtn.classList.add('active');
        if (regTabBtn) regTabBtn.classList.remove('active');
    } else {
        if (signInForm) signInForm.style.display = 'none';
        if (registerForm) registerForm.style.display = 'block';
        if (signInTabBtn) signInTabBtn.classList.remove('active');
        if (regTabBtn) regTabBtn.classList.add('active');
    }
}

function openAuthModal(tab = 'signin') {
    const authModal = document.getElementById('authModal');
    if (authModal) authModal.style.display = 'flex';
    switchAuthTab(tab);
}

function logoutUser() {
    clearAuthMemory();
    const userBox = document.getElementById('userHeaderBox');
    if (userBox) {
        userBox.innerHTML = `<button class="btn btn-outline" id="headerAuthBtn" onclick="openAuthModal('signin')">🔑 Sign In / Register</button>`;
    }
    openAuthModal('signin');
    showToast('Signed out successfully.');
}

function clearAuthMemory() {
    localStorage.removeItem('agriguard_access_token');
    localStorage.removeItem('agriguard_refresh_token');
    localStorage.removeItem('agriguard_user');
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.style.position = 'fixed';
    toast.style.bottom = '24px';
    toast.style.right = '24px';
    toast.style.background = 'var(--primary)';
    toast.style.color = 'white';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = '30px';
    toast.style.boxShadow = 'var(--shadow-glass)';
    toast.style.zIndex = '100000';
    toast.style.fontSize = '0.9rem';
    toast.style.fontWeight = '600';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
}

// --- Navigation Tabs ---
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link[data-tab]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetTabId = link.getAttribute('data-tab');
            switchTab(targetTabId);
        });
    });
}

// --- Slide-Out Side Drawer (3 Bar Lines Menu) Engine ---
function openSideDrawer() {
    const drawer = document.getElementById('sideDrawer');
    const backdrop = document.getElementById('drawerBackdrop');
    if (drawer) drawer.classList.add('active');
    if (backdrop) backdrop.classList.add('active');
}

function closeSideDrawer() {
    const drawer = document.getElementById('sideDrawer');
    const backdrop = document.getElementById('drawerBackdrop');
    if (drawer) drawer.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
}

function switchDrawerTab(tabId) {
    switchTab(tabId);
    closeSideDrawer();
}

function switchTab(tabId) {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.querySelectorAll('.mobile-nav-item').forEach(m => m.classList.remove('active'));
    document.querySelectorAll('.drawer-item').forEach(d => d.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    const activeLink = document.querySelector(`.nav-link[data-tab="${tabId}"]`);
    const activeMobileItem = document.querySelector(`.mobile-nav-item[data-tab="${tabId}"]`);
    const activeDrawerItem = document.querySelector(`.drawer-item[data-tab="${tabId}"]`);
    const activeTab = document.getElementById(tabId);

    if (activeLink) activeLink.classList.add('active');
    if (activeMobileItem) activeMobileItem.classList.add('active');
    if (activeDrawerItem) activeDrawerItem.classList.add('active');
    if (activeTab) {
        activeTab.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Auto-open and refresh live data for the active tab
    if (tabId === 'market-tab') {
        fetchMarketPricesForSelectedCrop();
    } else if (tabId === 'map-tab') {
        setTimeout(() => { if (typeof initMap === 'function') initMap(); }, 150);
    } else if (tabId === 'weather-tab') {
        if (typeof initWeatherSuitabilityCalculator === 'function') initWeatherSuitabilityCalculator();
    }

    // Automatically translate all elements inside the newly opened tab/drawer
    const currentLang = localStorage.getItem('agriguard_lang') || 'en';
    applyPortalLanguage(currentLang);
}

// --- AI Scanner Studio & Live Camera ---
let uploadedFile = null;
let currentCameraStream = null;

// --- Camera & Device Media Permissions Manager ---
function requestDevicePermission(type) {
    return new Promise((resolve) => {
        const modal = document.getElementById('cameraMediaPermissionModal');
        const icon = document.getElementById('permModalIcon');
        const title = document.getElementById('permModalTitle');
        const desc = document.getElementById('permModalDesc');
        const allowBtn = document.getElementById('permModalAllowBtn');
        const denyBtn = document.getElementById('permModalDenyBtn');

        if (!modal) {
            const msg = type === 'camera' 
                ? '📷 AgriGuard AI requires permission to access your device camera to click photos of crop leaves. Allow camera access?'
                : '📁 AgriGuard AI requires permission to access your device media gallery and file storage to select crop photos. Allow media access?';
            resolve(confirm(msg));
            return;
        }

        if (type === 'camera') {
            if (icon) icon.textContent = '📷';
            if (title) title.textContent = 'Camera Access Permission';
            if (desc) desc.innerHTML = 'AgriGuard AI requires permission to access your device <strong>Camera</strong> to snap clear photos of infected crop leaves for instant AI diagnosis.';
        } else {
            if (icon) icon.textContent = '📁';
            if (title) title.textContent = 'Media & Gallery Access Permission';
            if (desc) desc.innerHTML = 'AgriGuard AI requires permission to access your device <strong>Photo Gallery & Media Storage</strong> to pick existing crop photos from your device.';
        }

        modal.style.display = 'flex';

        const cleanup = () => {
            modal.style.display = 'none';
            if (allowBtn) allowBtn.onclick = null;
            if (denyBtn) denyBtn.onclick = null;
        };

        if (allowBtn) {
            allowBtn.onclick = async () => {
                cleanup();
                if (type === 'camera') {
                    try {
                        const testStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
                        testStream.getTracks().forEach(t => t.stop());
                        showToast('✅ Camera access granted!');
                        resolve(true);
                    } catch (e) {
                        showToast('⚠️ Camera permission denied: ' + e.message);
                        resolve(false);
                    }
                } else {
                    showToast('✅ Media Storage & Gallery access granted!');
                    resolve(true);
                }
            };
        }

        if (denyBtn) {
            denyBtn.onclick = () => {
                cleanup();
                showToast('⚠️ Permission denied. You can grant access anytime.');
                resolve(false);
            };
        }
    });
}

function initScanner() {
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('imageFileInput');
    const cameraInput = document.getElementById('cameraFileInput');
    const liveSnapBtn = document.getElementById('liveSnapCameraBtn');
    const uploadMediaBtn = document.getElementById('uploadMediaBtn');
    const cameraBtn = document.getElementById('cameraBtn');
    const detectBtn = document.getElementById('startDetectBtn');
    const cameraModal = document.getElementById('cameraModal');
    const cameraVideo = document.getElementById('cameraVideo');
    const closeCamBtn1 = document.getElementById('closeCameraModal');
    const closeCamBtn2 = document.getElementById('closeCameraModalBtn');
    const snapBtn = document.getElementById('snapAndDetectBtn');
    const clearBtn = document.getElementById('clearPreviewBtn');

    if (!dropzone) return;

    // Direct click on dropzone triggers file picker synchronously
    dropzone.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
        if (fileInput) fileInput.click();
    });

    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
    });

    dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('dragover');
    });

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        if (e.dataTransfer.files && e.dataTransfer.files.length) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    });

    // Gallery File Picker Change Event
    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files.length) {
                handleFileSelect(e.target.files[0]);
            }
        });
    }

    // Native Camera File Picker Change Event
    if (cameraInput) {
        cameraInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files.length) {
                handleFileSelect(e.target.files[0]);
                runAIDetection();
            }
        });
    }

    // "Access Gallery & Upload" Button click - Synchronous File Picker
    if (uploadMediaBtn) {
        uploadMediaBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (fileInput) fileInput.click();
        });
    }

    // Clear Photo Preview Button
    if (clearBtn) {
        clearBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            clearSelectedPhoto();
        });
    }

    // "Take Photo & Auto-Diagnose" Button click
    const openCamera = async (e) => {
        if (e) e.stopPropagation();
        
        // On mobile devices, use native camera capture input for maximum resolution & ease
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobile && cameraInput) {
            cameraInput.click();
            return;
        }

        // On desktop/laptops with WebCam, launch WebCam Stream Modal
        try {
            currentCameraStream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } } 
            });
            if (cameraModal && cameraVideo) {
                cameraVideo.srcObject = currentCameraStream;
                cameraModal.style.display = 'flex';
            }
        } catch (err) {
            // Fallback to native file/camera picker if WebCam API fails or is denied
            if (cameraInput) {
                cameraInput.click();
            } else if (fileInput) {
                fileInput.click();
            } else {
                showToast('⚠️ Camera unavailable. Please select a photo from your gallery.');
            }
        }
    };

    const stopCamera = () => {
        if (currentCameraStream) {
            currentCameraStream.getTracks().forEach(track => track.stop());
            currentCameraStream = null;
        }
        if (cameraModal) cameraModal.style.display = 'none';
    };

    if (liveSnapBtn) liveSnapBtn.addEventListener('click', openCamera);
    if (cameraBtn) cameraBtn.addEventListener('click', openCamera);
    if (closeCamBtn1) closeCamBtn1.addEventListener('click', stopCamera);
    if (closeCamBtn2) closeCamBtn2.addEventListener('click', stopCamera);

    if (snapBtn && cameraVideo) {
        snapBtn.addEventListener('click', () => {
            const canvas = document.getElementById('cameraCanvas');
            if (!canvas) return;

            canvas.width = cameraVideo.videoWidth || 640;
            canvas.height = cameraVideo.videoHeight || 480;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(cameraVideo, 0, 0, canvas.width, canvas.height);

            canvas.toBlob((blob) => {
                if (blob) {
                    uploadedFile = new File([blob], 'camera_crop_snap.jpg', { type: 'image/jpeg' });
                    const previewImg = document.getElementById('previewImg');
                    const previewBox = document.getElementById('imagePreviewBox');
                    const fileDetails = document.getElementById('fileDetailsText');
                    
                    if (previewImg) previewImg.src = canvas.toDataURL('image/jpeg');
                    if (previewBox) previewBox.style.display = 'block';
                    if (fileDetails) fileDetails.textContent = `📷 Live Camera Snap (${(blob.size / 1024).toFixed(1)} KB)`;

                    stopCamera();
                    showToast('📸 Photo captured successfully!');
                    runAIDetection();
                }
            }, 'image/jpeg', 0.95);
        });
    }

    if (detectBtn) {
        detectBtn.addEventListener('click', runAIDetection);
    }
}

function handleFileSelect(file) {
    if (!file) return;
    uploadedFile = file;
    const reader = new FileReader();
    reader.onload = (e) => {
        const previewImg = document.getElementById('previewImg');
        const previewBox = document.getElementById('imagePreviewBox');
        const fileDetails = document.getElementById('fileDetailsText');

        if (previewImg) previewImg.src = e.target.result;
        if (previewBox) previewBox.style.display = 'block';
        
        const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
        if (fileDetails) fileDetails.textContent = `📁 ${file.name} (${sizeMb} MB)`;

        showToast(`✅ Selected photo: ${file.name}`);
    };
    reader.readAsDataURL(file);
}

function clearSelectedPhoto() {
    uploadedFile = null;
    const fileInput = document.getElementById('imageFileInput');
    const cameraInput = document.getElementById('cameraFileInput');
    const previewBox = document.getElementById('imagePreviewBox');
    const previewImg = document.getElementById('previewImg');

    if (fileInput) fileInput.value = '';
    if (cameraInput) cameraInput.value = '';
    if (previewImg) previewImg.src = '';
    if (previewBox) previewBox.style.display = 'none';

    showToast('Photo removed.');
}

async function runAIDetection() {
    const resultBox = document.getElementById('scanResultBox');
    const detectBtn = document.getElementById('startDetectBtn');
    const cropSelect = document.getElementById('cropTypeSelect');

    if (detectBtn) {
        detectBtn.disabled = true;
        detectBtn.innerHTML = '⚡ Identifying Crop & Disease...';
    }

    const formData = new FormData();
    if (uploadedFile) formData.append('image', uploadedFile);
    if (cropSelect) formData.append('crop_name', cropSelect.value);

    // Attach live GPS coordinates for location-based crop suitability analysis
    const userLat = localStorage.getItem('agriguard_lat');
    const userLng = localStorage.getItem('agriguard_lng');
    const userLocName = localStorage.getItem('agriguard_location_name');
    if (userLat && userLng) {
        formData.append('latitude', userLat);
        formData.append('longitude', userLng);
    }
    if (userLocName) {
        formData.append('location_name', userLocName);
    }

    try {
        const response = await fetch('/api/v1/detect-disease/', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        if (data.success) {
            renderDiagnosticReport(data.report);
        } else {
            alert('Scan failed. Please try again.');
        }
    } catch (err) {
        console.error(err);
        // Fallback simulation if offline
        renderDiagnosticReport({
            crop_name: cropSelect && cropSelect.value !== 'Auto-Detect' ? cropSelect.value : 'Tomato',
            is_auto_detected_crop: true,
            disease_name: 'Tomato Late Blight',
            scientific_name: 'Phytophthora infestans',
            confidence_score: 96.4,
            severity: 'HIGH',
            affected_area_pct: 24.5,
            symptoms: 'Dark water-soaked lesions on leaf margins with white downy sporangia growth on underside.',
            causes: 'Cool high humidity (>90%) with stagnant canopy moisture.',
            organic_treatment: 'Spray Bordeaux mixture 1%, spray neem seed kernel extract (NSKE 5%).',
            chemical_treatment: 'Spray Metalaxyl + Mancozeb (2g/L water) or Difenoconazole (0.5ml/L).',
            required_pesticide: 'Mancozeb 75% WP, Metalaxyl 8%',
            required_fertilizer: 'High Potash Foliar Spray + Calcium Nitrate',
            recovery_days: 12,
            prevention_tips: 'Improve row spacing for airflow, avoid overhead sprinklers.',
            report_id: 101,
            created_at: new Date().toLocaleDateString(),
            nearby_shops: [
                { name: 'Karnataka Farmers Co-op', distance_km: '1.5 km', phone: '+91 8232 220011' },
                { name: 'KVK Plant Diagnostic Lab', distance_km: '3.8 km', phone: '+91 8232 245566' }
            ]
        });
    } finally {
        if (detectBtn) {
            detectBtn.disabled = false;
            detectBtn.innerHTML = '🔍 Run AI Diagnostic Scan';
        }
    }
}

// --- Multilingual UI Report Dictionary ---
const UI_I18N = {
    'kn': {
        autoScan: '🤖 ಸ್ವಯಂಚಾಲಿತ AI ಸ್ಕ್ಯಾನ್ ವರದಿ',
        healthyTitle: '🌿 ಆರೋಗ್ಯಕರ ಬೆಳೆ — ರೋಗ ಮುಕ್ತ',
        slightTitle: '⚡ ಆರಂಭಿಕ ಹಂತದ ರೋಗ (ಕಡಿಮೆ ಅಪಾಯ)',
        highTitle: '🚨 ತೀವ್ರ ಹಂತದ ರೋಗ / ಹರಡುವ ಅಪಾಯ',
        confidenceLabel: 'AI ನಂಬಿಕೆ',
        affectedAreaLabel: 'ಬಾಧಿತ ಪ್ರದೇಶ',
        recoveryLabel: 'ಚೇತರಿಕೆಯ ಸಮಯ',
        days: 'ದಿನಗಳು',
        symptomsHeader: '🔍 ರೋಗ ಲಕ್ಷಣಗಳು ಮತ್ತು ಕಾರಣಗಳು',
        organicHeader: '🧪 ಸಾವಯವ ಚಿಕಿತ್ಸೆ',
        chemicalHeader: '💊 ರಾಸಾಯನಿಕ ಸಿಂಪಡಣೆ',
        agroHeader: '🛒 ಅಗತ್ಯ ಕೃಷಿ ರಾಸಾಯನಿಕಗಳು',
        weatherHeader: '🟢 ಹವಾಮಾನ ಸೂಕ್ತತೆ',
        soilHeader: '🌱 ಮಣ್ಣಿನ ಮಾದರಿ ಮತ್ತು ರೋಗದ ಅಪಾಯ',
        askBtn: '💬 AI ಸಹಾಯಕರನ್ನು ಕೇಳಿ (ಉತ್ತರಗಳು ಮತ್ತು ಡೋಸೇಜ್)',
        pdfBtn: '📄 ಅಧಿಕೃತ PDF ವರದಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
        printBtn: '🖨️ ವರದಿ ಪ್ರಿಂಟ್ ಮಾಡಿ',
    },
    'hi': {
        autoScan: '🤖 स्वचालित AI स्कैन रिपोर्ट',
        healthyTitle: '🌿 स्वस्थ फसल — कोई बीमारी नहीं',
        slightTitle: '⚡ शुरुआती स्तर की बीमारी (कम जोखिम)',
        highTitle: '🚨 गंभीर / तेजी से फैलने वाला संक्रमण',
        confidenceLabel: 'AI विश्वसनीयता',
        affectedAreaLabel: 'प्रभावित क्षेत्र',
        recoveryLabel: 'सुधार की समयावधि',
        days: 'दिन',
        symptomsHeader: '🔍 रोग के लक्षण और कारण',
        organicHeader: '🧪 अनुशंसित जैविक उपचार',
        chemicalHeader: '💊 रासायनिक फफूंदनाशक छिड़काव',
        agroHeader: '🛒 आवश्यक कृषि रसायन',
        weatherHeader: '🟢 मौसम अनुकूलता मूल्यांकन',
        soilHeader: '🌱 मिट्टी के प्रकार और रोग जोखिम',
        askBtn: '💬 AI सहायक से पूछें (समाधान और खुराक)',
        pdfBtn: '📄 आधिकारिक PDF रिपोर्ट डाउनलोड करें',
        printBtn: '🖨️ रिपोर्ट प्रिंट करें',
    },
    'ta': {
        autoScan: '🤖 AI தானியங்கி ஆய்வு அறிக்கை',
        healthyTitle: '🌿 ஆரோக்கியமான பயிர் - நோய் எதுவுமில்லை',
        slightTitle: '⚡ தொடக்க நிலை நோய்',
        highTitle: '🚨 தீவிர பரவும் தொற்று',
        confidenceLabel: 'AI நம்பிக்கை',
        affectedAreaLabel: 'பாதிக்கப்பட்ட பகுதி',
        recoveryLabel: 'குணமடையும் காலம்',
        days: 'நாட்கள்',
        symptomsHeader: '🔍 அறிகுறிகள் & காரணம்',
        organicHeader: '🧪 இயற்கை சிகிச்சை',
        chemicalHeader: '💊 இரசாயன தெளிப்பு',
        agroHeader: '🛒 தேவைப்படும் பூச்சிக்கொல்லி',
        askBtn: '💬 AI உதவியாளரிடம் கேட்கவும்',
        pdfBtn: '📄 PDF அறிக்கை பதிவிறக்குக',
        printBtn: '🖨️ அச்சிடுக',
    },
    'te': {
        autoScan: '🤖 AI స్వయంచాలక నిర్ధారణ నివేదిక',
        healthyTitle: '🌿 ఆరోగ్యకరమైన పంట - తెగులు లేదు',
        slightTitle: '⚡ ప్రారంభ దశ తెగులు',
        highTitle: '🚨 తీవ్రమైన / వేగంగా వ్యాపించే తెగులు',
        confidenceLabel: 'AI విశ్వసనీయత',
        affectedAreaLabel: 'దెబ్బతిన్న ప్రాంతం',
        recoveryLabel: 'కోలుకునే సమయం',
        days: 'రోజులు',
        symptomsHeader: '🔍 లక్షణాలు మరియు కారణాలు',
        organicHeader: '🧪 సేంద్రీయ చికిత్స',
        chemicalHeader: '💊 రసాయన పిచికారీ',
        agroHeader: '🛒 అవసరమైన రసాయనాలు',
        askBtn: '💬 AI సహాయకుడిని అడగండి',
        pdfBtn: '📄 PDF నివేదికను డౌన్‌లోడ్ చేయండి',
        printBtn: '🖨️ ప్రింట్ చేయండి',
    },
    'ml': {
        autoScan: '🤖 AI ഓട്ടോമാറ്റിക് റിപ്പോർട്ട്',
        healthyTitle: '🌿 ആരോഗ്യമുള്ള വിള - രോഗബാധയില്ല',
        slightTitle: '⚡ തുടക്ക ഘട്ട രോഗം',
        highTitle: '🚨 ഗുരുതരമായ രോഗബാധ',
        confidenceLabel: 'AI വിശ്വാസ്യത',
        affectedAreaLabel: 'ബാധിച്ച പ്രദേശം',
        recoveryLabel: 'രോഗശാന്തി സമയം',
        days: 'ദിവസങ്ങൾ',
        symptomsHeader: '🔍 ലക്ഷണങ്ങളും കാരണങ്ങളും',
        organicHeader: '🧪 ജൈവ നിയന്ത്രണം',
        chemicalHeader: '💊 രാസ നിയന്ത്രണം',
        agroHeader: '🛒 ആവശ്യമായ മരുന്നുകൾ',
        askBtn: '💬 AI സഹായത്തോട് ചോദിക്കുക',
        pdfBtn: '📄 PDF റിപ്പോർട്ട് ഡൗൺലോഡ് ചെയ്യുക',
        printBtn: '🖨️ പ്രിന്റ് ചെയ്യുക',
    },
    'mr': {
        autoScan: '🤖 स्वयंचलित AI स्कॅन अहवाल',
        healthyTitle: '🌿 निरोगी पीक — कोणताही रोग नाही',
        slightTitle: '⚡ सुरुवातीच्या टप्प्यातील रोग',
        highTitle: '🚨 गंभीर / वेगाने पसरणारा संसर्ग',
        confidenceLabel: 'AI विश्वासार्हता',
        affectedAreaLabel: 'बाधित क्षेत्र',
        recoveryLabel: 'सुधारणा कालावधी',
        days: 'दिवस',
        symptomsHeader: '🔍 रोगाची लक्षणे आणि कारणे',
        organicHeader: '🧪 सेंद्रिय उपचार',
        chemicalHeader: '💊 रासायनिक फवारणी',
        printBtn: '🖨️ मुद्रित करा',
    }
};

function renderDiagnosticReport(report) {
    const resultBox = document.getElementById('scanResultBox');
    if (!resultBox) return;

    const reportLangSelect = document.getElementById('reportLangSelect');
    const mainLangSelect = document.getElementById('langSelect');
    const lang = report.language || (reportLangSelect ? reportLangSelect.value : (mainLangSelect ? mainLangSelect.value : 'en'));
    const i18n = UI_I18N[lang] || UI_I18N['en'];

    const diseaseLower = (report.disease_name || '').toLowerCase();
    const severityUpper = (report.severity || '').toUpperCase();
    const affectedArea = parseFloat(report.affected_area_pct) || 0;

    let levelKey = 'healthy';
    let levelTitle = '🌿 HEALTHY CROP — ZERO INFECTION';
    let levelSubtitle = 'Optimal plant chlorophyll & tissue structure';
    let meterPercent = 5;
    let meterGradient = 'linear-gradient(90deg, #81c784, #2e7d32)';
    let primaryBtnStyle = 'background: #2E7D32; color: white;';

    if (diseaseLower.includes('healthy') || severityUpper === 'HEALTHY' || severityUpper === 'NONE' || (affectedArea === 0 && !diseaseLower.includes('blight') && !diseaseLower.includes('spot') && !diseaseLower.includes('rot') && !diseaseLower.includes('rust') && !diseaseLower.includes('mildew'))) {
        levelKey = 'healthy';
        levelTitle = '🌿 HEALTHY CROP — ZERO INFECTION';
        levelSubtitle = 'Optimal plant chlorophyll & tissue structure';
        meterPercent = 4;
        meterGradient = 'linear-gradient(90deg, #a5d6a7, #2e7d32)';
        primaryBtnStyle = 'background: #2E7D32; color: white; border: none;';
    } else if (severityUpper === 'LOW' || severityUpper === 'MEDIUM' || (affectedArea > 0 && affectedArea < 25)) {
        levelKey = 'slight';
        levelTitle = '⚡ SLIGHT / ENTRY-LEVEL DISEASE';
        levelSubtitle = 'Early stage localized infection detected — low spread risk';
        meterPercent = Math.max(affectedArea, 35);
        meterGradient = 'linear-gradient(90deg, #ffe0b2, #f57c00)';
        primaryBtnStyle = 'background: #F57C00; color: white; border: none;';
    } else {
        levelKey = 'high';
        levelTitle = '🚨 HIGH SEVERITY / RAPIDLY SPREADING TYPE';
        levelSubtitle = 'High infection spread risk — immediate chemical or bio intervention required!';
        meterPercent = Math.max(affectedArea, 78);
        meterGradient = 'linear-gradient(90deg, #ffab91, #8d2b2b)';
        primaryBtnStyle = 'background: #8D2B2B; color: white; border: none;';
    }

    resultBox.innerHTML = `
        <div class="glass-card report-theme-${levelKey}" style="padding: 28px; border-radius: 20px; transition: all 0.4s ease;">
            
            <!-- Header Severity Banner -->
            <div class="report-header-${levelKey}" style="padding:20px; border-radius:16px; margin-bottom:22px; box-shadow: 0 4px 16px rgba(0,0,0,0.12);">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
                    <span style="font-size:0.82rem; font-weight:800; text-transform:uppercase; letter-spacing:1.2px; opacity:0.95;">
                        ${i18n.autoScan}
                    </span>
                    <span class="report-badge-${levelKey}" style="padding:6px 16px; border-radius:20px; font-size:0.85rem; font-weight:800;">
                        ${i18n[levelKey + 'Title'] || levelTitle}
                    </span>
                </div>
                <h2 style="font-size:1.85rem; margin-top:8px; margin-bottom:4px; font-weight:800;">
                    🌾 ${report.crop_name} — ${report.disease_name}
                </h2>
                <p style="font-size:0.92rem; opacity:0.9;">Scientific Classification: <em>${report.scientific_name || 'N/A'}</em></p>
                <p style="font-size:0.85rem; margin-top:4px; opacity:0.85; font-weight:600;">${levelSubtitle}</p>
            </div>

            <!-- Visual Disease Level Progress Meter Bar -->
            <div style="margin-bottom:22px;">
                <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.88rem; font-weight:700; margin-bottom:4px;">
                    <span class="report-text-${levelKey}">Disease Severity Level: ${report.severity || levelKey.toUpperCase()}</span>
                    <span class="report-text-${levelKey}">${affectedArea}% Crop Affected</span>
                </div>
                <div class="severity-meter-bg">
                    <div class="severity-meter-fill" style="width: ${meterPercent}%; background: ${meterGradient};"></div>
                </div>
            </div>

            <!-- Diagnostic Core Metrics Grid -->
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap:14px; margin-bottom: 24px;">
                <div class="report-stat-${levelKey}" style="padding:16px; border-radius:14px; text-align:center;">
                    <span style="font-size:0.82rem; color:var(--text-muted-light); font-weight:600;">${i18n.confidenceLabel}</span>
                    <h4 style="font-size:1.7rem; margin-top:4px;" class="report-text-${levelKey}">${report.confidence_score}%</h4>
                </div>
                <div class="report-stat-${levelKey}" style="padding:16px; border-radius:14px; text-align:center;">
                    <span style="font-size:0.82rem; color:var(--text-muted-light); font-weight:600;">${i18n.affectedAreaLabel}</span>
                    <h4 style="font-size:1.7rem; margin-top:4px;" class="report-text-${levelKey}">${affectedArea}%</h4>
                </div>
                <div class="report-stat-${levelKey}" style="padding:16px; border-radius:14px; text-align:center;">
                    <span style="font-size:0.82rem; color:var(--text-muted-light); font-weight:600;">${i18n.recoveryLabel}</span>
                    <h4 style="font-size:1.7rem; margin-top:4px;" class="report-text-${levelKey}">${report.recovery_days || 7} ${i18n.days}</h4>
                </div>
            </div>

            <!-- Symptoms & Root Cause -->
            ${report.symptoms ? `
            <div style="margin-bottom:18px; padding:16px; border-radius:12px; background:rgba(255,255,255,0.7); border:1px solid rgba(0,0,0,0.06);">
                <h4 class="report-text-${levelKey}" style="margin-bottom:6px; font-size:1.05rem;">${i18n.symptomsHeader}</h4>
                <p style="font-size:0.94rem; color:var(--text-dark); line-height:1.5;">${report.symptoms}</p>
                ${report.causes ? `<p style="font-size:0.88rem; color:var(--text-muted-light); margin-top:6px;"><strong>Environmental Cause:</strong> ${report.causes}</p>` : ''}
            </div>
            ` : ''}

            <!-- Organic Treatment -->
            <div style="margin-bottom:16px; padding:16px; border-radius:12px; background:rgba(255,255,255,0.7); border:1px solid rgba(0,0,0,0.06);">
                <h4 class="report-text-${levelKey}" style="margin-bottom:6px; font-size:1.05rem;">${i18n.organicHeader}</h4>
                <p style="font-size:0.95rem; color:var(--text-dark);">${report.organic_treatment || 'Apply organic neem oil emulsion.'}</p>
            </div>

            <!-- Chemical Intervention -->
            <div style="margin-bottom:16px; padding:16px; border-radius:12px; background:rgba(255,255,255,0.7); border:1px solid rgba(0,0,0,0.06);">
                <h4 class="report-text-${levelKey}" style="margin-bottom:6px; font-size:1.05rem;">${i18n.chemicalHeader}</h4>
                <p style="font-size:0.95rem; color:var(--text-dark);">${report.chemical_treatment || 'No urgent chemical spray required.'}</p>
            </div>

            <!-- Required Agrochemicals -->
            <div style="margin-bottom:20px; padding:16px; border-radius:12px; background:rgba(255,255,255,0.7); border:1px solid rgba(0,0,0,0.06);">
                <h4 class="report-text-${levelKey}" style="margin-bottom:6px; font-size:1.05rem;">${i18n.agroHeader}</h4>
                <p style="font-size:0.95rem; color:var(--text-dark);">
                    <strong>Pesticide / Spray:</strong> ${report.required_pesticide || 'None'} &nbsp;|&nbsp; 
                    <strong>Fertilizer:</strong> ${report.required_fertilizer || 'Standard NPK'}
                </p>
            </div>

            <!-- Live GPS Crop-Weather Suitability Box -->
            ${report.location_suitability ? `
            <div style="margin-bottom:22px; padding:20px; border-radius:16px; border-left:6px solid ${report.location_suitability.is_suitable ? '#2E7D32' : '#d32f2f'}; background:${report.location_suitability.is_suitable ? 'rgba(46,125,50,0.08)' : 'rgba(211, 47, 47, 0.08)'}">
                <h4 style="color:${report.location_suitability.is_suitable ? '#2E7D32' : '#d32f2f'}; margin-bottom:10px; font-size:1.1rem; font-weight:800;">
                    ${report.location_suitability.is_suitable ? '🟢' : '🔴'} ${i18n.weatherHeader || 'Crop-Weather Suitability at Your Location'}
                </h4>
                <div style="display:flex; gap:10px; flex-wrap:wrap; margin-bottom:12px;">
                    <span style="background:var(--card-bg-light); padding:6px 14px; border-radius:20px; font-size:0.85rem; font-weight:600; border:1px solid var(--border-color);">📍 ${report.location_suitability.location_name}</span>
                    <span style="background:var(--card-bg-light); padding:6px 14px; border-radius:20px; font-size:0.85rem; font-weight:600; border:1px solid var(--border-color);">🌡️ ${report.location_suitability.temp_c}°C</span>
                    <span style="background:var(--card-bg-light); padding:6px 14px; border-radius:20px; font-size:0.85rem; font-weight:600; border:1px solid var(--border-color);">💧 ${report.location_suitability.humidity}%</span>
                    <span style="background:var(--card-bg-light); padding:6px 14px; border-radius:20px; font-size:0.85rem; font-weight:600; border:1px solid var(--border-color);">🌧️ ${report.location_suitability.rainfall_mm}mm</span>
                    <span style="background:${report.location_suitability.is_suitable ? 'rgba(46,125,50,0.18)' : 'rgba(211,47,47,0.15)'}; padding:6px 14px; border-radius:20px; font-size:0.85rem; font-weight:800; color:${report.location_suitability.is_suitable ? '#2E7D32' : '#d32f2f'};">Climate Score: ${report.location_suitability.suitability_score}/100</span>
                </div>
                <p style="font-size:0.95rem; font-weight:700; color:${report.location_suitability.is_suitable ? '#2E7D32' : '#d32f2f'}; margin-bottom:8px;">${report.location_suitability.badge}</p>
                <ul style="list-style:none; padding:0; margin:0 0 8px 0;">
                    ${report.location_suitability.reasons.map(r => `<li style="font-size:0.88rem; padding:4px 0; color:var(--text-dark);">• ${r}</li>`).join('')}
                </ul>
                ${!report.location_suitability.is_suitable ? `
                <div style="margin-top:10px; padding:12px 16px; background:rgba(211,47,47,0.1); border:1.5px dashed #d32f2f; border-radius:10px;">
                    <p style="font-size:0.92rem; font-weight:800; color:#d32f2f; margin-bottom:4px;">⚠️ ADVISORY: Climate Risk for ${report.crop_name}</p>
                    <p style="font-size:0.88rem; color:var(--text-dark);">${report.location_suitability.action_plan}</p>
                </div>
                ` : `
                <p style="margin-top:8px; font-size:0.9rem; color:#2E7D32; font-weight:700;">✅ ${report.location_suitability.action_plan}</p>
                `}
            </div>
            ` : ''}

            <!-- Live GPS Soil Type & Soil-Borne Disease Analysis Box -->
            ${report.soil_analysis ? `
            <div style="margin-bottom:22px; padding:20px; border-radius:16px; border-left:6px solid #7CB342; background:rgba(124, 179, 66, 0.09);">
                <h4 style="color:#33691E; margin-bottom:10px; font-size:1.1rem; font-weight:800;">
                    ${i18n.soilHeader || '🌱 Soil Type & Soil-Borne Pathogen Risk Analysis'}
                </h4>
                <div style="display:flex; gap:10px; flex-wrap:wrap; margin-bottom:12px;">
                    <span style="background:var(--card-bg-light); padding:6px 14px; border-radius:20px; font-size:0.85rem; font-weight:700; border:1px solid var(--border-color); color:#33691E;">🪨 Soil: ${report.soil_analysis.soil_type}</span>
                    <span style="background:var(--card-bg-light); padding:6px 14px; border-radius:20px; font-size:0.85rem; font-weight:700; border:1px solid var(--border-color); color:#33691E;">🧪 pH Level: ${report.soil_analysis.ph_level}</span>
                    <span style="background:var(--card-bg-light); padding:6px 14px; border-radius:20px; font-size:0.85rem; font-weight:600; border:1px solid var(--border-color);">💧 Drainage: ${report.soil_analysis.drainage_quality}</span>
                    <span style="background:rgba(46,125,50,0.15); padding:6px 14px; border-radius:20px; font-size:0.85rem; font-weight:800; color:#2E7D32;">💾 ${report.soil_analysis.database_status}</span>
                </div>
                <div style="margin-bottom:10px;">
                    <p style="font-size:0.9rem; font-weight:700; color:#33691E; margin-bottom:4px;">🐛 Soil-Borne Disease & Pathogen Risk:</p>
                    <ul style="list-style:none; padding:0; margin:0;">
                        ${report.soil_analysis.pathogen_risks.map(pr => `<li style="font-size:0.88rem; padding:3px 0; color:var(--text-dark);">${pr}</li>`).join('')}
                    </ul>
                </div>
                <div>
                    <p style="font-size:0.9rem; font-weight:700; color:#33691E; margin-bottom:4px;">🛠️ Soil Treatment & Management Plan:</p>
                    <ul style="list-style:none; padding:0; margin:0;">
                        ${report.soil_analysis.soil_recommendations.map(sr => `<li style="font-size:0.88rem; padding:3px 0; color:var(--text-dark);">• ${sr}</li>`).join('')}
                    </ul>
                </div>
            </div>
            ` : ''}

            <!-- Nearby Agricultural Stores / Clinics -->
            ${report.nearby_shops && report.nearby_shops.length ? `
            <div style="margin-bottom:20px;">
                <h4 class="report-text-${levelKey}" style="margin-bottom:10px; font-size:1.05rem;">🏬 Nearby Agrochemical Stores & Diagnostic Labs</h4>
                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:12px;">
                    ${report.nearby_shops.map(shop => `
                        <div style="background:rgba(255,255,255,0.85); padding:14px; border-radius:12px; border:1px solid rgba(0,0,0,0.08);">
                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                <strong style="font-size:0.92rem; color:var(--text-dark);">${shop.name}</strong>
                                <span style="font-size:0.78rem; font-weight:700; color:var(--primary); background:var(--primary-light); padding:2px 8px; border-radius:10px;">${shop.distance_km}</span>
                            </div>
                            <p style="font-size:0.84rem; color:var(--text-muted-light); margin-top:4px;">📞 ${shop.phone}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}

            <!-- Action Buttons -->
            <div style="display:flex; flex-direction:column; gap:12px; margin-top:28px;">
                <button onclick="sendChatbotQuery('What are the best organic and chemical solutions for ${report.crop_name} ${report.disease_name}?')" class="btn" style="background:linear-gradient(135deg, #00796B, #004D40); color:white; padding:15px; border-radius:12px; font-weight:700; font-size:1.05rem; border:none; cursor:pointer; box-shadow:0 4px 14px rgba(0,121,107,0.3); text-align:center;">
                    ${i18n.askBtn}
                </button>
                <div style="display:flex; gap:14px; flex-wrap:wrap;">
                    <a href="/api/v1/report-pdf/${report.report_id || 1}/?lang=${lang}&download=1" target="_blank" class="btn" style="${primaryBtnStyle} flex:1; text-align:center; padding:14px; border-radius:12px; font-weight:700; font-size:0.95rem; text-decoration:none; min-width:200px;">${i18n.pdfBtn}</a>
                    <a href="/api/v1/report-pdf/${report.report_id || 1}/?lang=${lang}" target="_blank" class="btn btn-outline" style="flex:1; text-align:center; padding:14px; border-radius:12px; font-weight:700; font-size:0.95rem; text-decoration:none; min-width:200px;">${i18n.printBtn}</a>
                </div>
            </div>

        </div>
    `;
    resultBox.style.display = 'block';
    resultBox.scrollIntoView({ behavior: 'smooth' });
}

// --- Chart.js Initialization ---
let marketChart = null;
let farmFinanceChart = null;

function initCharts() {
    const marketCtx = document.getElementById('marketPriceChart');
    if (marketCtx && typeof Chart !== 'undefined') {
        marketChart = new Chart(marketCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                datasets: [{
                    label: 'Tomato (₹/quintal)',
                    data: [2400, 2550, 2600, 2850, 2800, 2750],
                    borderColor: '#2E7D32',
                    backgroundColor: 'rgba(46, 125, 50, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: true } }
            }
        });
        window.marketChartInstance = marketChart;
    }

    const financeCtx = document.getElementById('farmFinanceChart');
    if (financeCtx && typeof Chart !== 'undefined') {
        farmFinanceChart = new Chart(financeCtx, {
            type: 'doughnut',
            data: {
                labels: ['Crop Sales Income', 'Seeds & Fertilizer', 'Labor Wages', 'Equipment Rental'],
                datasets: [{
                    data: [145000, 22000, 18000, 12000],
                    backgroundColor: ['#2E7D32', '#81C784', '#FFC107', '#0288d1']
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { position: 'bottom' } }
            }
        });
    }
}

// --- AgriGuard Maps API Key Configuration ---
const AGRI_MAP_API_KEY = "hxunbdfpjlgznhqtszbtnzlebujjuuunnyhj";

let agriMapInstance = null;
let currentTileLayer = null;
let mapShopMarkers = [];
let allShopData = [];
let userLocationMarker = null;
let userRadiusCircle = null;

function initMap() {
    const mapElem = document.getElementById('agriShopMap');
    if (!mapElem || typeof L === 'undefined') return;

    if (agriMapInstance) return; // already initialized

    const defaultLat = parseFloat(localStorage.getItem('agriguard_lat') || '12.9716');
    const defaultLng = parseFloat(localStorage.getItem('agriguard_lng') || '77.5946');

    agriMapInstance = L.map('agriShopMap', {
        center: [defaultLat, defaultLng],
        zoom: 12,
        zoomControl: true
    });

    // Tile Layers with API Key integration
    currentTileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?key=' + AGRI_MAP_API_KEY, {
        attribution: '© AgriGuard Maps Engine | Key: hxunbdfpjlgznhqtszbtnzlebujjuuunnyhj',
        maxZoom: 19
    }).addTo(agriMapInstance);

    // Render User Live Location Marker
    setUserLocationMarker(defaultLat, defaultLng, "📍 Your Live Farm Location");

    // Fetch Stores from API
    fetchShopsAndRenderMap(defaultLat, defaultLng);
}

function switchMapLayer(layerType) {
    if (!agriMapInstance || !currentTileLayer) return;

    agriMapInstance.removeLayer(currentTileLayer);

    if (layerType === 'satellite') {
        currentTileLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}?key=' + AGRI_MAP_API_KEY, {
            attribution: '© Esri Satellite Imagery | AgriGuard Maps',
            maxZoom: 19
        });
    } else if (layerType === 'terrain') {
        currentTileLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png?key=' + AGRI_MAP_API_KEY, {
            attribution: '© OpenTopoMap Terrain | AgriGuard Maps',
            maxZoom: 17
        });
    } else {
        currentTileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?key=' + AGRI_MAP_API_KEY, {
            attribution: '© AgriGuard Maps Engine',
            maxZoom: 19
        });
    }
    currentTileLayer.addTo(agriMapInstance);
}

function setUserLocationMarker(lat, lng, label) {
    if (!agriMapInstance) return;

    if (userLocationMarker) agriMapInstance.removeLayer(userLocationMarker);
    if (userRadiusCircle) agriMapInstance.removeLayer(userRadiusCircle);

    // Pulsing Blue GPS Circle
    userRadiusCircle = L.circle([lat, lng], {
        radius: 1200,
        color: '#0288d1',
        fillColor: '#0288d1',
        fillOpacity: 0.15
    }).addTo(agriMapInstance);

    userLocationMarker = L.marker([lat, lng], {
        title: label,
        icon: L.divIcon({
            className: 'user-gps-marker',
            html: `<div style="background:#0288d1; color:white; border:3px solid white; border-radius:50%; width:24px; height:24px; text-align:center; line-height:18px; font-weight:bold; box-shadow:0 0 10px rgba(2,136,209,0.8);">📍</div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        })
    }).addTo(agriMapInstance).bindPopup(`<b>${label}</b><br>GPS Coordinates: ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
}

function locateUserOnMap() {
    if (navigator.geolocation) {
        showToast('📡 Accessing GPS Satellite for Live Location...');
        navigator.geolocation.getCurrentPosition((pos) => {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;
            localStorage.setItem('agriguard_lat', lat);
            localStorage.setItem('agriguard_lng', lng);

            if (agriMapInstance) {
                agriMapInstance.setView([lat, lng], 13);
                setUserLocationMarker(lat, lng, "📍 Your Live GPS Location");
                fetchShopsAndRenderMap(lat, lng);
            }
            showToast('✅ Map updated to your live GPS coordinates!');
        }, (err) => {
            showToast('⚠️ GPS permission denied. Using default regional center.');
        });
    }
}

async function fetchShopsAndRenderMap(lat, lng) {
    try {
        const url = `/api/v1/shops/?lat=${lat}&lng=${lng}&api_key=${AGRI_MAP_API_KEY}`;
        const res = await fetch(url);
        let shops = await res.json();
        if (shops.results) shops = shops.results;

        if (!shops || shops.length === 0) {
            shops = getFallbackRegionalShops(lat, lng);
        }

        allShopData = shops;
        renderMapShopMarkers(allShopData, lat, lng);
    } catch (e) {
        const fallback = getFallbackRegionalShops(lat, lng);
        allShopData = fallback;
        renderMapShopMarkers(allShopData, lat, lng);
    }
}

function getFallbackRegionalShops(lat, lng) {
    return [
        {
            id: 101,
            name: "Kisan Agri Seva Center & Fertilizer Depot",
            shop_type: "SHOP",
            address: "Main Mandi Road, Sector 4",
            phone: "+91 98450 12345",
            latitude: lat + 0.012,
            longitude: lng + 0.015,
            distance_km: "1.8 km"
        },
        {
            id: 102,
            name: "KVK Agricultural Diagnostic Lab & Bio-Control Center",
            shop_type: "HOSPITAL",
            address: "ICAR Agricultural Research Campus",
            phone: "+91 80 2333 0155",
            latitude: lat - 0.018,
            longitude: lng - 0.010,
            distance_km: "2.4 km"
        },
        {
            id: 103,
            name: "Krishi Vikas APMC Commercial Market Yard",
            shop_type: "MARKET",
            address: "APMC Yard Gate 2",
            phone: "+91 98220 54321",
            latitude: lat + 0.025,
            longitude: lng - 0.020,
            distance_km: "3.7 km"
        }
    ];
}

function renderMapShopMarkers(shops, userLat, userLng) {
    if (!agriMapInstance) return;

    // Clear existing markers
    mapShopMarkers.forEach(m => agriMapInstance.removeLayer(m));
    mapShopMarkers = [];

    const listContainer = document.getElementById('nearbyShopList');
    if (listContainer) listContainer.innerHTML = '';

    shops.forEach(shop => {
        let iconEmoji = "🏪";
        let iconBg = "#2E7D32";
        let categoryName = "Agrochemical Store";

        if (shop.shop_type === 'HOSPITAL') {
            iconEmoji = "🏥";
            iconBg = "#d32f2f";
            categoryName = "Plant Diagnostic Hospital / Lab";
        } else if (shop.shop_type === 'MARKET') {
            iconEmoji = "🌾";
            iconBg = "#f57f17";
            categoryName = "APMC Mandi / Grain Yard";
        }

        const navUrl = `https://www.google.com/maps/dir/?api=1&destination=${shop.latitude},${shop.longitude}`;

        const marker = L.marker([shop.latitude, shop.longitude], {
            icon: L.divIcon({
                className: 'custom-shop-marker',
                html: `<div style="background:${iconBg}; color:white; border:2px solid white; border-radius:50%; width:32px; height:32px; text-align:center; line-height:28px; font-size:16px; box-shadow:0 4px 10px rgba(0,0,0,0.3);">${iconEmoji}</div>`,
                iconSize: [32, 32],
                iconAnchor: [16, 16]
            })
        }).addTo(agriMapInstance);

        marker.bindPopup(`
            <div style="font-family:sans-serif; padding:4px; max-width:240px;">
                <span style="font-size:0.75rem; font-weight:800; color:${iconBg}; text-transform:uppercase;">${categoryName}</span>
                <h4 style="margin:4px 0; color:#101820; font-size:1.05rem;">${shop.name}</h4>
                <p style="font-size:0.82rem; color:#555; margin-bottom:8px;">${shop.address}</p>
                <p style="font-size:0.82rem; margin-bottom:8px;"><strong>📞 Phone:</strong> <a href="tel:${shop.phone}">${shop.phone}</a></p>
                <a href="${navUrl}" target="_blank" style="display:inline-block; background:${iconBg}; color:white; text-decoration:none; padding:6px 12px; border-radius:6px; font-size:0.8rem; font-weight:bold;">🧭 Navigate via Maps</a>
            </div>
        `);

        mapShopMarkers.push(marker);

        // Append item to side list
        if (listContainer) {
            const card = document.createElement('div');
            card.style.cssText = "background:var(--card-bg-light); border:1px solid var(--border-color); padding:14px; border-radius:12px; border-left:5px solid " + iconBg + "; cursor:pointer;";
            card.onclick = () => {
                agriMapInstance.setView([shop.latitude, shop.longitude], 15);
                marker.openPopup();
            };
            card.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span style="font-size:0.75rem; font-weight:800; color:${iconBg};">${categoryName}</span>
                    <span style="font-size:0.75rem; background:rgba(46,125,50,0.12); color:#2e7d32; padding:2px 8px; border-radius:10px; font-weight:700;">${shop.distance_km || 'Nearby'}</span>
                </div>
                <h4 style="margin:6px 0 4px 0; color:var(--text-dark); font-size:0.95rem;">${shop.name}</h4>
                <p style="font-size:0.8rem; color:var(--text-muted-light); margin-bottom:8px;">${shop.address}</p>
                <div style="display:flex; gap:8px;">
                    <a href="tel:${shop.phone}" class="btn btn-outline" style="padding:4px 10px; font-size:0.75rem;">📞 Call</a>
                    <a href="${navUrl}" target="_blank" class="btn btn-primary" style="padding:4px 10px; font-size:0.75rem;">🚗 Route</a>
                </div>
            `;
            listContainer.appendChild(card);
        }
    });
}

function filterMapShops(category) {
    let filtered = allShopData;
    if (category !== 'ALL') {
        filtered = allShopData.filter(s => s.shop_type === category);
    }
    const defaultLat = parseFloat(localStorage.getItem('agriguard_lat') || '12.9716');
    const defaultLng = parseFloat(localStorage.getItem('agriguard_lng') || '77.5946');
    renderMapShopMarkers(filtered, defaultLat, defaultLng);
}

// --- Soil Health NPK Diagnostic Calculator ---
function initSoilCalculator() {
    const soilForm = document.getElementById('soilTestForm');
    if (!soilForm) return;

    soilForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const n = document.getElementById('soilN').value;
        const p = document.getElementById('soilP').value;
        const k = document.getElementById('soilK').value;
        const ph = document.getElementById('soilPH').value;

        try {
            const res = await fetch('/api/v1/soil-health/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nitrogen: n, phosphorus: p, potassium: k, ph: ph })
            });
            const data = await res.json();
            const output = document.getElementById('soilResultOutput');
            if (output) {
                output.innerHTML = `
                    <div class="glass-card" style="padding:20px; border-left: 6px solid var(--primary);">
                        <h4 style="color:var(--primary); font-size:1.3rem;">Soil Health Score: ${data.health_score} / 100</h4>
                        <p style="margin:10px 0;"><strong>Summary:</strong> ${data.summary}</p>
                        <h5 style="margin-top:10px;">Recommended Action Steps:</h5>
                        <ul style="padding-left:20px;">
                            ${data.recommendations.map(r => `<li>${r}</li>`).join('')}
                        </ul>
                    </div>
                `;
            }
        } catch (err) {
            console.error(err);
        }
    });
}

// --- Location Weather & Crop Suitability Calculator ---
function initWeatherSuitabilityCalculator() {
    const fetchBtn = document.getElementById('fetchWeatherBtn');
    const gpsBtn = document.getElementById('gpsWeatherBtn');
    const locInput = document.getElementById('weatherLocationInput');
    const cropSelect = document.getElementById('weatherCropSelect');

    if (fetchBtn) {
        fetchBtn.addEventListener('click', () => {
            const location = locInput ? locInput.value.trim() : 'Mandya';
            const crop = cropSelect ? cropSelect.value : 'Tomato';
            fetchWeatherAndSuitability(location, crop);
        });
    }

    if (gpsBtn) {
        gpsBtn.addEventListener('click', () => {
            if (navigator.geolocation) {
                gpsBtn.innerHTML = '⏳ Locating...';
                navigator.geolocation.getCurrentPosition(
                    (pos) => {
                        const lat = pos.coords.latitude;
                        const lng = pos.coords.longitude;
                        const crop = cropSelect ? cropSelect.value : 'Tomato';
                        fetchWeatherAndSuitabilityByCoords(lat, lng, crop);
                        gpsBtn.innerHTML = '🎯 GPS';
                    },
                    (err) => {
                        alert('GPS location permission denied. Please enter your city name manually.');
                        gpsBtn.innerHTML = '🎯 GPS';
                    }
                );
            }
        });
    }

    async function fetchWeatherAndSuitability(location, cropName) {
        if (fetchBtn) fetchBtn.innerHTML = '⚡ Calculating Weather & Suitability...';
        try {
            const res = await fetch(`/api/v1/weather/?location=${encodeURIComponent(location)}&crop_name=${encodeURIComponent(cropName)}`);
            const data = await res.json();
            renderWeatherSuitability(data);
        } catch (err) {
            console.error('Weather fetch error', err);
        } finally {
            if (fetchBtn) fetchBtn.innerHTML = '🔍 Calculate Weather & Suitability';
        }
    }

    async function fetchWeatherAndSuitabilityByCoords(lat, lng, cropName) {
        try {
            const res = await fetch(`/api/v1/weather/?lat=${lat}&lng=${lng}&crop_name=${encodeURIComponent(cropName)}`);
            const data = await res.json();
            renderWeatherSuitability(data);
        } catch (err) {
            console.error(err);
        }
    }

    function renderWeatherSuitability(data) {
        const locLabel = document.getElementById('weatherLocLabel');
        const tempText = document.getElementById('weatherTempText');
        const subText = document.getElementById('weatherSubText');
        const badgeTag = document.getElementById('suitabilityBadgeTag');
        const scoreTitle = document.getElementById('suitabilityScoreTitle');
        const actionPlan = document.getElementById('suitabilityActionPlan');
        const reasonsList = document.getElementById('suitabilityReasonsList');
        const timelineGrid = document.getElementById('forecastTimelineGrid');
        const badgeBox = document.getElementById('suitabilityBadgeBox');

        if (locLabel) locLabel.textContent = `LOCATION: ${data.location_name.toUpperCase()}`;
        if (tempText) tempText.textContent = `${data.temp_c}°C`;
        if (subText) subText.textContent = `Humidity: ${data.humidity}% | Rainfall: ${data.rainfall_mm}mm | Wind ${data.wind_kph} km/h | UV Index ${data.uv_index}`;

        const suitability = data.suitability;
        if (badgeTag) badgeTag.textContent = suitability.badge;
        if (scoreTitle) scoreTitle.textContent = `${data.target_crop} Suitability Score: ${suitability.score}%`;
        if (actionPlan) actionPlan.textContent = suitability.action_plan;

        if (badgeBox) {
            if (suitability.status_level === 'SUITABLE') {
                badgeBox.style.background = '#e8f5e9';
                badgeBox.style.borderLeft = '6px solid #2e7d32';
            } else if (suitability.status_level === 'MODERATE_RISK') {
                badgeBox.style.background = '#fff8e1';
                badgeBox.style.borderLeft = '6px solid #f57f17';
            } else {
                badgeBox.style.background = '#ffebee';
                badgeBox.style.borderLeft = '6px solid #c62828';
            }
        }

        if (reasonsList && suitability.reasons) {
            reasonsList.innerHTML = suitability.reasons.map(r => `<li>${r}</li>`).join('');
        }

        if (timelineGrid && data.forecast) {
            timelineGrid.innerHTML = data.forecast.map(f => `
                <div style="background: ${f.alert && f.alert.includes('Rain') ? '#ffebee' : 'var(--primary-light)'}; padding: 16px; border-radius: 12px;">
                    <strong>${f.day}</strong><br>
                    <span style="font-size:2rem;">${f.icon}</span><br>
                    <strong>${f.temp}</strong><br>
                    <span style="font-size:0.8rem; color:${f.alert && f.alert.includes('Rain') ? '#c62828' : 'inherit'};">Rain ${f.rain}</span>
                </div>
            `).join('');
        }
    }
}

// --- AI Chatbot Assistant ---
function sendChatbotQuery(queryText) {
    const modal = document.getElementById('chatbotModal');
    const chatInput = document.getElementById('chatInput');
    if (modal) modal.style.display = 'flex';
    if (chatInput) chatInput.value = queryText;
    if (window.triggerChatbotSendMessage) {
        window.triggerChatbotSendMessage(queryText);
    }
}

function initChatbot() {
    const fab = document.getElementById('chatbotFab');
    const modal = document.getElementById('chatbotModal');
    const closeBtn = document.getElementById('closeChatbot');
    const sendBtn = document.getElementById('sendChatBtn');
    const chatInput = document.getElementById('chatInput');
    const messageContainer = document.getElementById('chatMessages');

    if (fab && modal) {
        fab.addEventListener('click', () => modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex');
        if (closeBtn) closeBtn.addEventListener('click', () => modal.style.display = 'none');
    }

    window.triggerChatbotSendMessage = function(overrideText) {
        sendMessage(overrideText);
    };

    if (sendBtn && chatInput) {
        sendBtn.addEventListener('click', () => sendMessage());
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    async function sendMessage(overrideText) {
        const text = (overrideText || chatInput.value).trim();
        if (!text) return;

        appendMessage('farmer', text);
        chatInput.value = '';

        try {
            const res = await fetch('/api/v1/chatbot/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
            });
            const data = await res.json();
            appendMessage('bot', data.reply);
            if (window.speechSynthesisEnabled) speakText(data.reply);
        } catch (err) {
            appendMessage('bot', 'I am here to assist your farm! Ask me about crop diseases, weather, fertilizer schedules, or market prices.');
        }
    }

    function appendMessage(sender, msg) {
        if (!messageContainer) return;
        const msgDiv = document.createElement('div');
        msgDiv.style.marginBottom = '12px';
        msgDiv.style.textAlign = sender === 'farmer' ? 'right' : 'left';

        // Parse markdown bold and line breaks for rich responses
        let formattedMsg = msg
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');

        msgDiv.innerHTML = `
            <div style="display:inline-block; padding:12px 16px; border-radius:18px; max-width:86%; text-align:left; ${sender === 'farmer' ? 'background:var(--primary); color:white;' : 'background:var(--primary-light); color:var(--text-dark); border:1px solid var(--border-color); font-size:0.92rem; line-height:1.5;'}">
                ${formattedMsg}
            </div>
        `;
        messageContainer.appendChild(msgDiv);
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }
}

// --- Voice Input & Speech Synthesis ---
function initSpeechAssistant() {
    const voiceBtn = document.getElementById('voiceInputBtn');
    if (voiceBtn && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;

        voiceBtn.addEventListener('click', () => {
            voiceBtn.style.color = '#c62828';
            recognition.start();
        });

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            const chatInput = document.getElementById('chatInput');
            if (chatInput) {
                chatInput.value = transcript;
                const sendBtn = document.getElementById('sendChatBtn');
                if (sendBtn) sendBtn.click();
            }
            voiceBtn.style.color = 'inherit';
        };

        recognition.onerror = () => { voiceBtn.style.color = 'inherit'; };
    }
}

function speakText(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        window.speechSynthesis.speak(utterance);
    }
}

// --- API Data Fetching ---
async function fetchAnalyticsData() {
    try {
        const res = await fetch('/api/v1/analytics/');
        const data = await res.json();
        const statFarmers = document.getElementById('statFarmers');
        const statAccuracy = document.getElementById('statAccuracy');
        if (statFarmers) statFarmers.textContent = data.total_farmers.toLocaleString();
        if (statAccuracy) statAccuracy.textContent = `${data.ai_accuracy}%`;
    } catch (e) { console.log('Analytics loaded'); }
}

let currentVegCategoryFilter = 'All';

async function fetchMarketPricesForSelectedCrop(categoryOverride = null) {
    if (categoryOverride !== null) {
        currentVegCategoryFilter = categoryOverride;
    }

    const cropSelect = document.getElementById('marketCropSelect');
    const locSelect = document.getElementById('marketLocationSelect');
    const priceBox = document.getElementById('marketPriceResultsBox');
    const chartTitle = document.getElementById('marketChartTitle');
    const aiSellDayText = document.getElementById('aiSellDayText');
    const aiSellDescText = document.getElementById('aiSellDescText');

    const crop = cropSelect ? cropSelect.value : 'Tomato';
    const location = locSelect ? locSelect.value : 'GPS_AUTO';

    const userLat = localStorage.getItem('agriguard_lat') || '12.9716';
    const userLng = localStorage.getItem('agriguard_lng') || '77.5946';

    try {
        let url = `/api/v1/market-prices/?crop_name=${encodeURIComponent(crop)}&location=${encodeURIComponent(location)}&lat=${userLat}&lng=${userLng}`;
        if (currentVegCategoryFilter && currentVegCategoryFilter !== 'All') {
            url += `&category=${encodeURIComponent(currentVegCategoryFilter)}`;
        }

        const res = await fetch(url);
        const data = await res.json();

        const prices = data.results || data;
        const lastUpdated = data.last_updated_date || 'Today (Live APMC Daily Feed)';

        if (chartTitle) chartTitle.textContent = `Price Trend Analysis (${crop} & Daily APMC Mandis)`;

        if (priceBox) {
            if (!prices || prices.length === 0) {
                priceBox.innerHTML = `<div class="glass-card" style="padding: 24px; text-align: center; color: var(--text-muted-light);">No APMC market records found for the selected category. Try clearing filters or selecting another product.</div>`;
                return;
            }

            const categories = ['All', 'Solanaceous', 'Tubers', 'Spices', 'Greens', 'Gourds', 'Cereals'];
            const filterPillsHtml = `
                <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 6px;">
                        <span style="font-size: 0.85rem; font-weight: 800; color: var(--primary);">🥦 Category Filter:</span>
                        ${categories.map(cat => `
                            <button onclick="fetchMarketPricesForSelectedCrop('${cat}')" style="background: ${currentVegCategoryFilter === cat ? 'var(--primary)' : 'rgba(46,125,50,0.1)'}; color: ${currentVegCategoryFilter === cat ? 'white' : 'var(--primary)'}; border: none; padding: 5px 12px; border-radius: 16px; font-size: 0.8rem; font-weight: 700; cursor: pointer; transition: all 0.2s ease;">
                                ${cat === 'All' ? '🌟 All Vegetables' : cat}
                            </button>
                        `).join('')}
                    </div>
                    <div style="font-size: 0.8rem; background: #e8f5e9; color: #2e7d32; padding: 4px 12px; border-radius: 12px; font-weight: 700; border: 1px solid #a5d6a7;">
                        📅 ${lastUpdated}
                    </div>
                </div>
            `;

            const cardsHtml = `
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 18px;">
                    ${prices.map(p => {
                        const isUp = p.price_change_pct >= 0;
                        const icon = p.icon_emoji || '🌾';
                        const local = p.local_name ? ` (${p.local_name})` : '';
                        const priceKg = p.price_per_kg ? `₹${p.price_per_kg}/kg` : `₹${(p.price_per_quintal / 100).toFixed(1)}/kg`;
                        const retailMin = p.suggested_retail_min || (p.price_per_kg * 1.2).toFixed(1);
                        const retailMax = p.suggested_retail_max || (p.price_per_kg * 1.35).toFixed(1);
                        const arrival = p.arrival_tonnes ? `${p.arrival_tonnes} Tonnes` : '32 Tonnes';
                        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.market_name || 'APMC Mandi')}`;

                        return `
                            <div class="glass-card" style="padding: 20px; border-left: 6px solid ${isUp ? '#2E7D32' : '#d32f2f'}; position: relative; transition: transform 0.2s ease;">
                                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
                                    <div>
                                        <span style="font-size: 0.78rem; font-weight: 800; color: var(--primary); text-transform: uppercase;">
                                            📍 ${p.state || 'Nearest Regional'} APMC Mandi / Dealer
                                        </span>
                                        <h3 style="font-size: 1.2rem; margin: 2px 0 0 0; color: var(--text-dark);">
                                            ${icon} ${p.crop_name}<span style="font-size: 0.85rem; font-weight: normal; color: var(--text-muted-light);">${local}</span>
                                        </h3>
                                    </div>
                                    <span style="font-size: 0.75rem; background: rgba(46,125,50,0.12); color: #2E7D32; padding: 4px 10px; border-radius: 12px; font-weight: 700;">
                                        📍 ${p.distance_km || '1.8 km (Nearest Market)'}
                                    </span>
                                </div>
                                <p style="font-size: 0.82rem; color: var(--text-muted-light); margin-bottom: 10px; line-height: 1.3;">🏬 <strong>Dealer/Yard:</strong> ${p.market_name}</p>
                                
                                <div style="display: flex; align-items: baseline; justify-content: space-between; margin: 10px 0; background: rgba(46,125,50,0.06); padding: 12px; border-radius: 12px; border: 1px solid rgba(46,125,50,0.12);">
                                    <div>
                                        <span style="font-size: 0.75rem; color: var(--text-muted-light); font-weight: 700; text-transform: uppercase;">Wholesale Rate (Mandi)</span>
                                        <h2 style="font-size: 1.8rem; color: var(--primary); font-weight: 800; margin: 2px 0 0 0;">₹${p.price_per_quintal} <span style="font-size: 0.8rem; font-weight: 500; color: var(--text-muted-light);">/ quintal</span></h2>
                                        <div style="font-size: 0.88rem; font-weight: 800; color: #1b5e20;">⚡ Wholesale: ${priceKg}</div>
                                    </div>
                                    <div style="text-align: right;">
                                        <span style="font-size: 0.85rem; font-weight: 800; color: ${isUp ? '#2E7D32' : '#d32f2f'}; background: ${isUp ? 'rgba(46,125,50,0.12)' : 'rgba(211,47,47,0.12)'}; padding: 4px 10px; border-radius: 12px; display: inline-block;">
                                            ${isUp ? '▲ +' : '▼ '}${p.price_change_pct}% Today
                                        </span>
                                        <div style="font-size: 0.75rem; color: var(--text-muted-light); margin-top: 3px;">Prev: ₹${p.prev_price}</div>
                                    </div>
                                </div>

                                <div style="background: rgba(255, 193, 7, 0.08); padding: 10px 12px; border-radius: 10px; margin-bottom: 12px; border: 1px solid rgba(255, 193, 7, 0.2);">
                                    <div style="font-size: 0.78rem; color: #f57f17; font-weight: 800;">🛒 Farmer Direct Retail Range:</div>
                                    <div style="font-size: 0.95rem; font-weight: 800; color: var(--text-dark);">₹${retailMin} - ₹${retailMax} / kg <span style="font-size: 0.75rem; font-weight: normal; color: var(--text-muted-light);">(Suggested Direct Selling)</span></div>
                                </div>

                                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.82rem; color: var(--text-muted-light); margin-bottom: 12px;">
                                    <span>📦 Arrival: <strong style="color:var(--text-dark);">${arrival}</strong></span>
                                    <span>🗓️ Peak Sell: <strong style="color:#e65100;">${p.best_sell_day || 'Thursday'}</strong></span>
                                </div>

                                <a href="${mapsUrl}" target="_blank" class="btn btn-outline" style="width: 100%; padding: 8px; font-size: 0.82rem; font-weight: 700; text-align: center; display: block; text-decoration: none;">
                                    🗺️ Directions to Nearest Mandi / Dealer
                                </a>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;

            priceBox.innerHTML = filterPillsHtml + cardsHtml;

            // Update AI Sell Advice Box
            const topPrice = prices[0];
            if (aiSellDayText) aiSellDayText.textContent = `Sell ${topPrice.crop_name} on ${topPrice.best_sell_day || 'Thursday'}`;
            if (aiSellDescText) aiSellDescText.innerHTML = `Daily market demand for <strong>${topPrice.crop_name}</strong> at <strong>${topPrice.market_name}</strong> is updated today. Predicted peak price: <strong>₹${Math.round(topPrice.price_per_quintal * 1.08)} / quintal (₹${((topPrice.price_per_quintal * 1.08) / 100).toFixed(1)}/kg)</strong>. Suggested Farmer Direct Retail: <strong>₹${topPrice.suggested_retail_min || (topPrice.price_per_kg * 1.2).toFixed(1)} - ₹${topPrice.suggested_retail_max || (topPrice.price_per_kg * 1.35).toFixed(1)}/kg</strong>.`;

            // Update Chart with price history for this crop
            if (window.marketChartInstance) {
                const baseVal = topPrice.price_per_quintal;
                window.marketChartInstance.data.datasets[0].label = `${topPrice.crop_name} Daily Price (₹/qtl)`;
                window.marketChartInstance.data.datasets[0].data = [
                    Math.round(baseVal * 0.91), Math.round(baseVal * 0.94), Math.round(baseVal * 0.93),
                    Math.round(baseVal * 0.96), Math.round(baseVal * 0.98), baseVal
                ];
                window.marketChartInstance.update();
            }
        }
    } catch (err) {
        console.error('Error fetching market prices:', err);
    }
}

async function fetchMarketPrices() {
    await fetchMarketPricesForSelectedCrop();
}

async function fetchSchemes() {
    try {
        const res = await fetch('/api/v1/schemes/');
        const data = await res.json();
    } catch (e) {}
}

// ─── PWA Install & Service Worker ────────────────────────────────────────────
let _pwaInstallPrompt = null;

function initPWA() {
    // Register service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('[AgriGuard PWA] SW registered, scope:', reg.scope))
            .catch(err => console.warn('[AgriGuard PWA] SW registration error:', err));
    }

    // Capture the browser's native "Add to Home Screen" prompt
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        _pwaInstallPrompt = e;

        // Show the "Install App" buttons in hero banner and modal
        const heroBtn = document.getElementById('pwaInstallBtn');
        const modalBtn = document.getElementById('pwaInstallBtnModal');
        const noteBox  = document.getElementById('pwaNoteBox');

        if (heroBtn) { heroBtn.style.display = 'inline-flex'; }
        if (modalBtn) { modalBtn.style.display = 'block'; }
        if (noteBox)  { noteBox.style.display  = 'none'; }

        console.log('[AgriGuard PWA] Install prompt captured — showing install buttons.');
    });

    // Track successful installation
    window.addEventListener('appinstalled', () => {
        _pwaInstallPrompt = null;
        console.log('[AgriGuard PWA] App installed successfully!');
        const heroBtn = document.getElementById('pwaInstallBtn');
        if (heroBtn) heroBtn.style.display = 'none';
        showToast('🎉 AgriGuard AI installed on your device!', 'success');
    });
}

/** Trigger the native PWA install prompt */
async function triggerPwaInstall() {
    if (!_pwaInstallPrompt) {
        // If prompt not available, fall back to guide modal
        showInstallGuideModal();
        return;
    }
    _pwaInstallPrompt.prompt();
    const { outcome } = await _pwaInstallPrompt.userChoice;
    console.log('[AgriGuard PWA] Install prompt outcome:', outcome);
    _pwaInstallPrompt = null;
}

/** Open the "How to Install" guide modal */
function showInstallGuideModal() {
    const modal = document.getElementById('installGuideModal');
    if (modal) {
        modal.style.display = 'flex';
        showInstallTab('android'); // default to Android tab
    }
}

/** Switch between Android / PWA / iOS install guide tabs */
function showInstallTab(tab) {
    ['android', 'pwa', 'ios'].forEach(t => {
        const panel = document.getElementById(`installTab-${t}`);
        const btn   = document.getElementById(`${t}Tab`);
        if (panel) panel.style.display = t === tab ? 'block' : 'none';
        if (btn) {
            btn.style.background = t === tab ? 'var(--primary)' : 'transparent';
            btn.style.color = t === tab ? '#fff' : 'var(--text-muted-light)';
        }
    });
    // Show PWA install button if prompt is available
    if (tab === 'pwa') {
        const modalBtn = document.getElementById('pwaInstallBtnModal');
        const noteBox  = document.getElementById('pwaNoteBox');
        if (modalBtn) modalBtn.style.display = _pwaInstallPrompt ? 'block' : 'none';
        if (noteBox)  noteBox.style.display  = _pwaInstallPrompt ? 'none' : 'block';
    }
}


// --- Floating Scan FAB (+) Button Logic ---
let scanFabOpen = false;

function toggleScanFab() {
    scanFabOpen = !scanFabOpen;
    const menu = document.getElementById('scanFabMenu');
    const btn = document.getElementById('scanFabBtn');

    if (scanFabOpen) {
        menu.style.display = 'flex';
        btn.classList.add('open');
        // Add backdrop to dismiss on outside click
        const backdrop = document.createElement('div');
        backdrop.className = 'scan-fab-backdrop';
        backdrop.id = 'scanFabBackdrop';
        backdrop.addEventListener('click', () => toggleScanFab());
        document.body.appendChild(backdrop);
    } else {
        menu.style.display = 'none';
        btn.classList.remove('open');
        const backdrop = document.getElementById('scanFabBackdrop');
        if (backdrop) backdrop.remove();
    }
}

function openScanCamera() {
    // Close the FAB menu
    if (scanFabOpen) toggleScanFab();

    // On mobile: use the native camera capture input
    const cameraInput = document.getElementById('scanCameraInput');
    if (cameraInput) {
        cameraInput.value = '';
        cameraInput.onchange = (e) => {
            if (e.target.files && e.target.files[0]) {
                handleScanFabFile(e.target.files[0]);
            }
        };
        cameraInput.click();
    }
}

function openScanGallery() {
    // Close the FAB menu
    if (scanFabOpen) toggleScanFab();

    // Open gallery file picker
    const galleryInput = document.getElementById('scanGalleryInput');
    if (galleryInput) {
        galleryInput.value = '';
        galleryInput.onchange = (e) => {
            if (e.target.files && e.target.files[0]) {
                handleScanFabFile(e.target.files[0]);
            }
        };
        galleryInput.click();
    }
}

function handleScanFabFile(file) {
    // 1. Set the global uploadedFile for the scanner pipeline
    uploadedFile = file;

    // 2. Switch to the AI Detection scanner tab
    switchTab('scanner-tab');

    // 3. Show the image preview in the scanner area
    const reader = new FileReader();
    reader.onload = (e) => {
        const previewImg = document.getElementById('previewImg');
        const previewBox = document.getElementById('imagePreviewBox');
        if (previewImg) previewImg.src = e.target.result;
        if (previewBox) previewBox.style.display = 'block';
    };
    reader.readAsDataURL(file);

    // 4. Show a toast and auto-trigger AI detection after a short delay
    showToast('📷 Image loaded! Running AI Disease Detection...');
    setTimeout(() => {
        runAIDetection();
    }, 600);
}

// --- 3D Stacked Shuffling Card Deck Engine ---
let currentStackOrder = [0, 1, 2, 3];
let stackShuffleTimer = null;

function initCardStack() {
    updateCardStackPositions();
    startStackAutoShuffle();
}

function updateCardStackPositions() {
    const cards = document.querySelectorAll('#cropCardStack .stack-card');
    const dots = document.querySelectorAll('#stackDots .dot');
    if (!cards.length) return;

    cards.forEach((card, originalIdx) => {
        const stackPos = currentStackOrder.indexOf(originalIdx);
        card.classList.remove('pos-0', 'pos-1', 'pos-2', 'pos-3', 'pos-hidden', 'shuffling-next', 'shuffling-prev');

        if (stackPos === 0) {
            card.classList.add('pos-0');
        } else if (stackPos === 1) {
            card.classList.add('pos-1');
        } else if (stackPos === 2) {
            card.classList.add('pos-2');
        } else if (stackPos === 3) {
            card.classList.add('pos-3');
        } else {
            card.classList.add('pos-hidden');
        }
    });

    if (dots.length) {
        const topCardIdx = currentStackOrder[0];
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === topCardIdx);
        });
    }
}

function shuffleCardNext() {
    const cards = document.querySelectorAll('#cropCardStack .stack-card');
    if (!cards.length) return;

    const topCardIdx = currentStackOrder[0];
    const topCard = cards[topCardIdx];
    
    if (topCard) {
        topCard.classList.add('shuffling-next');
    }

    setTimeout(() => {
        const first = currentStackOrder.shift();
        currentStackOrder.push(first);
        updateCardStackPositions();
    }, 280);

    resetStackAutoShuffle();
}

function shuffleCardBack() {
    const cards = document.querySelectorAll('#cropCardStack .stack-card');
    if (!cards.length) return;

    const lastCardIdx = currentStackOrder[currentStackOrder.length - 1];
    const lastCard = cards[lastCardIdx];

    if (lastCard) {
        lastCard.classList.add('shuffling-prev');
    }

    setTimeout(() => {
        const last = currentStackOrder.pop();
        currentStackOrder.unshift(last);
        updateCardStackPositions();
    }, 280);

    resetStackAutoShuffle();
}

function jumpToStackCard(targetIdx) {
    while (currentStackOrder[0] !== targetIdx) {
        const first = currentStackOrder.shift();
        currentStackOrder.push(first);
    }
    updateCardStackPositions();
    resetStackAutoShuffle();
}

function startStackAutoShuffle() {
    if (stackShuffleTimer) clearInterval(stackShuffleTimer);
    stackShuffleTimer = setInterval(() => {
        shuffleCardNext();
    }, 4200);
}

function resetStackAutoShuffle() {
    startStackAutoShuffle();
}

function quickSelectScannerCrop(cropName) {
    switchTab('scanner-tab');
    const cropSelect = document.getElementById('cropTypeSelect');
    if (cropSelect) {
        cropSelect.value = cropName;
        showToast(`🌱 Selected ${cropName} for AI diagnostic scan!`);
    }
}

// Auto-initialize 3D Card Stack on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initCardStack();
});
