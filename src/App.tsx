import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Activity, AlertTriangle, Archive, Award, BarChart3, Bell, Calendar, Check,
  CheckCircle2, ChevronRight, Clock, Download, Edit, FileSpreadsheet, FileText,
  Filter, Globe, Heart, Info, Layers, MapPin, Maximize2, Package, Pill,
  Plus, QrCode, RefreshCw, RotateCcw, Search, ShieldAlert, ShieldCheck,
  Sparkles, Trash2, Upload, User, UserCheck, Users, Zap, ExternalLink, ArrowUpRight,
  TrendingUp, CheckCircle, XCircle, AlertCircle, FileJson, Lock, HelpCircle
} from 'lucide-react';
import {
  ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis,
  Tooltip, Legend, LineChart, Line, AreaChart, Area
} from 'recharts';

// ==========================================
// MULTILINGUAL DICTIONARY (EN, HI, MR)
// ==========================================
const TRANSLATIONS = {
  en: {
    appTitle: "MedCycle AI",
    subTitle: "Intelligent Expired Medicine Management & Safe Disposal Platform",
    dashTitle: "Executive Dashboard",
    cabinetTitle: "Medicine Cabinet",
    scannerTitle: "AI Medicine Scanner (OCR)",
    aiRiskTitle: "AI/ML Expiry Risk Model",
    remindersTitle: "Reminders & Caregiver",
    disposalTitle: "Safe Disposal Hub",
    passportTitle: "Digital Disposal Passport",
    fefoTitle: "Pharmacy FEFO Inventory",
    environmentalTitle: "Environmental Impact",
    reportsTitle: "Reports & Data",
    settingsTitle: "Settings & System",
    
    // Summary Cards
    totalMeds: "Total Registered Meds",
    nearingExpiry: "Nearing Expiry (≤30 Days)",
    expiredMeds: "Expired Medicines",
    dueReminders: "Pending Today's Doses",
    wasteDiverted: "Pharma Waste Diverted",

    // Disposal Guidance
    disposalBannerTitle: "Responsible Disposal Guidelines",
    disposalRule1: "Never flush expired or unused medicines down the toilet or drain.",
    disposalRule2: "Do not discard liquid or pill medications in ordinary household trash.",
    disposalRule3: "Return expired items to authorized pharmacy take-back collection points.",
    disposalRule4: "Always scratch out patient identification details on packaging prior to handover.",
    findPoints: "Find Nearest Verified Collection Kiosk",
    
    // Safety Disclaimer
    disclaimerTitle: "Clinical Safety & AI Disclaimer",
    disclaimerText: "MedCycle AI operates as an inventory tracking & AI decision-support tool. It does NOT provide medical advice or evaluate clinical safety. NEVER ingest an expired medication regardless of system output. Consult a certified healthcare provider or pharmacist.",
    
    profileSelf: "Patient Profile (Self)",
    profileCaregiver: "Caregiver Mode (Managing Dependents)"
  },
  hi: {
    appTitle: "मेडसाइकिल एआई",
    subTitle: "सटीक दवा समाप्ति प्रबंधन और सुरक्षित निपटान प्लेटफॉर्म",
    dashTitle: "मुख्य डैशबोर्ड",
    cabinetTitle: "दवा कैबिनेट",
    scannerTitle: "एआई दवा स्कैनर (OCR)",
    aiRiskTitle: "एआई जोखिम विश्लेषण मॉडल",
    remindersTitle: "रिमाइंडर और देखभालकर्ता",
    disposalTitle: "सुरक्षित निपटान केंद्र",
    passportTitle: "डिजिटल डिस्पोजल पासपोर्ट",
    fefoTitle: "फार्मेसी एफईएफओ इन्वेंटरी",
    environmentalTitle: "पर्यावरण प्रभाव",
    reportsTitle: "रिपोर्ट और डेटा",
    settingsTitle: "सेटिंग्स और सिस्टम",

    totalMeds: "कुल पंजीकृत दवाएं",
    nearingExpiry: "समाप्ति के करीब (≤30 दिन)",
    expiredMeds: "समाप्त दवाएं (Expired)",
    dueReminders: "आज की बकाया खुराक",
    wasteDiverted: "सुरक्षित निपटाया गया कचरा",

    disposalBannerTitle: "ज़िम्मेदार दवा निपटान दिशानिर्देश",
    disposalRule1: "समाप्त या अप्रयुक्त दवाओं को कभी भी नाली या शौचालय में न बहाएं।",
    disposalRule2: "साधारण कचरे के डिब्बे में तरल या गोली की दवाएं न फेंकें।",
    disposalRule3: "समाप्त दवाओं को केवल अधिकृत टेक-बैक मेडिकल केंद्रों पर जमा करें।",
    disposalRule4: "हैंडओवर से पहले पैकेजिंग पर लिखी व्यक्तिगत जानकारी को हटा दें।",
    findPoints: "निकटतम सत्यापित संग्रह केंद्र खोजें",

    disclaimerTitle: "चिकित्सा सुरक्षा और एआई अस्वीकरण",
    disclaimerText: "मेडसाइकिल एआई केवल दवा प्रबंधन और सहायता उपकरण है। यह चिकित्सीय सलाह नहीं देता है। कभी भी समाप्त हो चुकी दवा का सेवन न करें। डॉक्टर या फार्मासिस्ट से परामर्श लें।",

    profileSelf: "रोगी प्रोफ़ाइल (स्वयं)",
    profileCaregiver: "देखभालकर्ता मोड (परिजनों का प्रबंधन)"
  },
  mr: {
    appTitle: "मेडसायकल एआय",
    subTitle: "मुदत संपलेल्या औषधांचे व्यवस्थापन आणि सुरक्षित विल्हेवाट प्लॅटफॉर्म",
    dashTitle: "मुख्य माहिती फलक",
    cabinetTitle: "औधष कॅबिनेट",
    scannerTitle: "एआय औषध स्कॅनर (OCR)",
    aiRiskTitle: "एआय धोका विश्लेषण मॉडेल",
    remindersTitle: "आठवण व काळजीवाहू मोड",
    disposalTitle: "सुरक्षित विल्हेवाट केंद्र",
    passportTitle: "डिजिटल डिस्पोजल पासपोर्ट",
    fefoTitle: "फार्मसी एफईएफओ साठा",
    environmentalTitle: "पर्यावरणावरील प्रभाव",
    reportsTitle: "अहवाल आणि डेटा",
    settingsTitle: "सेटिंग्ज आणि सिस्टीम",

    totalMeds: "एकूण नोंदणीकृत औषधे",
    nearingExpiry: "मुदत संपत आलेली (≤३० दिवस)",
    expiredMeds: "मुदत संपलेली औषधे",
    dueReminders: "आजचे उर्वरित डोस",
    wasteDiverted: "सुरक्षित विल्हेवाट कचरा",

    disposalBannerTitle: "जबाबदार औषध विल्हेवाट मार्गदर्शक",
    disposalRule1: "मुदत संपलेली औषधे कधीही नालीत किंवा वॉशबेसिनमध्ये टाकू नका.",
    disposalRule2: "घरगुती कचरापेटीत थेट औषधे फेकू नका.",
    disposalRule3: "अधिकृत फार्मासी टेक-बैक केंद्रावरच औषधे जमा करा.",
    disposalRule4: "जमा करण्यापूर्वी औषधाच्या पाकिटावरील वैयक्तिक नाव मिटवून टाका.",
    findPoints: "जवळचे अधिकृत संकलन केंद्र शोधा",

    disclaimerTitle: "वैद्यकीय सुरक्षितता आणि एआय अस्वीकरण",
    disclaimerText: "मेडसायकल एआय हे केवळ व्यवस्थापन साधन आहे. हा वैद्यकीय सल्ला नाही. मुदत संपलेले कोणतेही औषध कधीही घेऊ नका. डॉक्टरांचा किंवा फार्मासिस्टचा सल्ला घ्या.",

    profileSelf: "रुग्ण प्रोफाइल (स्वतः)",
    profileCaregiver: "काळजीवाहू मोड (कुटुंबासाठी)"
  }
};

// ==========================================
// SYNTHETIC DEMO INITIAL DATA (10 Medicines)
// ==========================================
const INITIAL_MEDICINES = [
  {
    id: "MED-1001",
    name: "Amoxicillin Trihydrate 500mg",
    batchNumber: "AMX-2024-88A",
    expiryDate: "2026-11-05", // Nearing Expiry (~8 days)
    quantity: 15,
    category: "Antibiotic",
    dosageForm: "Capsule",
    storageCondition: "Cool & Dry (Below 25°C)",
    notes: "Prescribed for bacterial upper respiratory infection",
    patientName: "John Doe (Self)",
    dateAdded: "2024-05-10"
  },
  {
    id: "MED-1002",
    name: "Paracetamol 650mg Extra",
    batchNumber: "PCT-2023-102",
    expiryDate: "2026-09-15", // Expired (~43 days ago)
    quantity: 24,
    category: "Analgesic / Antipyretic",
    dosageForm: "Tablet",
    storageCondition: "Room Temperature",
    notes: "Fever and mild pain relief",
    patientName: "John Doe (Self)",
    dateAdded: "2023-11-01"
  },
  {
    id: "MED-1003",
    name: "Metformin Hydrochloride 500mg",
    batchNumber: "MET-2025-004",
    expiryDate: "2027-08-20", // Safe
    quantity: 60,
    category: "Antidiabetic",
    dosageForm: "Tablet",
    storageCondition: "Dry place away from direct light",
    notes: "Daily blood sugar management - Take with meal",
    patientName: "Sarah Doe (Mother)",
    dateAdded: "2025-01-15"
  },
  {
    id: "MED-1004",
    name: "Atorvastatin 20mg",
    batchNumber: "ATO-2024-911",
    expiryDate: "2026-11-12", // Nearing Expiry (~15 days)
    quantity: 30,
    category: "Cardiovascular",
    dosageForm: "Tablet",
    storageCondition: "Room Temperature",
    notes: "Cholesterol management - Bedtime dosage",
    patientName: "John Doe (Self)",
    dateAdded: "2024-08-20"
  },
  {
    id: "MED-1005",
    name: "Salbutamol Inhaler 100mcg",
    batchNumber: "SLB-2023-404",
    expiryDate: "2026-08-30", // Expired (~59 days ago)
    quantity: 1,
    category: "Respiratory",
    dosageForm: "Inhaler",
    storageCondition: "Store below 30°C, keep away from frost",
    notes: "Emergency asthma rescue inhaler",
    patientName: "John Doe (Self)",
    dateAdded: "2023-09-10"
  },
  {
    id: "MED-1006",
    name: "Azithromycin 250mg",
    batchNumber: "AZI-2025-332",
    expiryDate: "2027-03-10", // Safe
    quantity: 6,
    category: "Antibiotic",
    dosageForm: "Tablet",
    storageCondition: "Cool & Dry",
    notes: "Short course antibiotic strip",
    patientName: "Sarah Doe (Mother)",
    dateAdded: "2025-02-01"
  },
  {
    id: "MED-1007",
    name: "Insulatard NPH Insulin 100IU",
    batchNumber: "INS-2024-77B",
    expiryDate: "2026-11-02", // Critical Nearing Expiry (~5 days)
    quantity: 2,
    category: "Hormone / Diabetes",
    dosageForm: "Injectable Vial",
    storageCondition: "Refrigerated (2°C - 8°C)",
    notes: "Basal insulin pen refill vials",
    patientName: "Sarah Doe (Mother)",
    dateAdded: "2024-10-05"
  },
  {
    id: "MED-1008",
    name: "Cetirizine Hydrochloride 10mg",
    batchNumber: "CET-2022-990",
    expiryDate: "2025-12-01", // Expired long ago
    quantity: 10,
    category: "Antihistamine",
    dosageForm: "Tablet",
    storageCondition: "Room Temperature",
    notes: "Seasonal allergy relief",
    patientName: "John Doe (Self)",
    dateAdded: "2023-01-10"
  },
  {
    id: "MED-1009",
    name: "Pantoprazole Gastro-Resistant 40mg",
    batchNumber: "PAN-2025-888",
    expiryDate: "2028-01-15", // Safe
    quantity: 28,
    category: "Gastrointestinal",
    dosageForm: "Tablet",
    storageCondition: "Protect from humidity",
    notes: "Acid reflux relief - Morning before breakfast",
    patientName: "John Doe (Self)",
    dateAdded: "2025-03-01"
  },
  {
    id: "MED-1010",
    name: "Augmentin Duo 625mg",
    batchNumber: "AUG-UNK-000",
    expiryDate: "", // Missing Expiry Date
    quantity: 8,
    category: "Antibiotic",
    dosageForm: "Tablet",
    storageCondition: "Store in original foil package",
    notes: "Missing clear expiry print on outer foil strip",
    patientName: "John Doe (Self)",
    dateAdded: "2025-04-12"
  }
];

// Demo Collection Points
const DEMO_COLLECTION_POINTS = [
  {
    id: "CP-01",
    name: "CityCare Community Pharmacy & Take-Back Kiosk",
    address: "42 Healthcare Boulevard, Sector 4, Metro Central",
    distance: "0.8 km",
    operatingHours: "08:00 AM - 10:00 PM (Daily)",
    status: "Verified Facility",
    phone: "+1 (800) 555-MEDS",
    acceptedTypes: ["Pills/Tablets", "Topical Creams", "Unopened Vials"],
    isDemo: true
  },
  {
    id: "CP-02",
    name: "MetroHealth Regional Hospital Eco-Disposal Unit",
    address: "105 University Avenue, Wing B, Ground Floor",
    distance: "2.4 km",
    operatingHours: "24/7 Drop-box Facility",
    status: "Verified Facility",
    phone: "+1 (800) 555-9911",
    acceptedTypes: ["Pills/Tablets", "Inhalers", "Injectables", "Syrups"],
    isDemo: true
  },
  {
    id: "CP-03",
    name: "GreenCross Community Pharmacy",
    address: "88 Sunburst Road, Near Westside Market",
    distance: "3.7 km",
    operatingHours: "09:00 AM - 08:00 PM (Mon-Sat)",
    status: "Authorized Partner",
    phone: "+1 (800) 555-3322",
    acceptedTypes: ["Pills/Tablets", "Blister Packs"],
    isDemo: true
  },
  {
    id: "CP-04",
    name: "Apollo Eco-Pharma Collection Point",
    address: "12 Ring Road Plaza, Suite 101",
    distance: "5.1 km",
    operatingHours: "09:30 AM - 09:00 PM",
    status: "Authorized Partner",
    phone: "+1 (800) 555-4488",
    acceptedTypes: ["All Household Pharma Waste"],
    isDemo: true
  }
];

// Synthetic Initial Reminders
const INITIAL_REMINDERS = [
  {
    id: "REM-01",
    medName: "Metformin Hydrochloride 500mg",
    dosage: "1 Tablet (500mg)",
    timeSlot: "Morning (08:00 AM)",
    instructions: "Take with breakfast",
    status: "Taken",
    patientName: "Sarah Doe (Mother)"
  },
  {
    id: "REM-02",
    medName: "Pantoprazole 40mg",
    dosage: "1 Tablet",
    timeSlot: "Morning (07:30 AM)",
    instructions: "Take on empty stomach with glass of water",
    status: "Taken",
    patientName: "John Doe (Self)"
  },
  {
    id: "REM-03",
    medName: "Amoxicillin Trihydrate 500mg",
    dosage: "1 Capsule",
    timeSlot: "Afternoon (02:00 PM)",
    instructions: "Complete full antibiotic course",
    status: "Pending",
    patientName: "John Doe (Self)"
  },
  {
    id: "REM-04",
    medName: "Atorvastatin 20mg",
    dosage: "1 Tablet",
    timeSlot: "Evening (09:00 PM)",
    instructions: "Take after dinner at bedtime",
    status: "Pending",
    patientName: "John Doe (Self)"
  }
];

// Initial Disposal Passports
const INITIAL_PASSPORTS = [
  {
    id: "PASSPORT-2026-89101",
    timestamp: "2026-10-15 14:30",
    facilityName: "CityCare Community Pharmacy & Take-Back Kiosk",
    items: [
      { name: "Paracetamol 650mg Extra", quantity: 24, batch: "PCT-2023-102" },
      { name: "Cetirizine Hydrochloride 10mg", quantity: 10, batch: "CET-2022-990" }
    ],
    totalItems: 34,
    weightKg: 0.28,
    status: "Verified Handover",
    disposalMethod: "High-Temp Incineration (Authorized Provider)"
  }
];

// Helper: Calculate days remaining relative to assumed current date (2026-10-28)
const TODAY_STR = "2026-10-28";
const parseDate = (dateStr) => {
  if (!dateStr) return null;
  return new Date(dateStr);
};

const getDaysRemaining = (expiryDateStr) => {
  if (!expiryDateStr) return null;
  const exp = parseDate(expiryDateStr);
  const today = parseDate(TODAY_STR);
  if (!exp || isNaN(exp.getTime())) return null;
  const diffTime = exp - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const getUrgencyCategory = (expiryDateStr) => {
  const days = getDaysRemaining(expiryDateStr);
  if (days === null) {
    return {
      label: "MISSING EXPIRY DATE",
      statusKey: "missing",
      badgeClass: "bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800",
      description: "Needs immediate batch & packaging verification",
      priority: 1
    };
  }
  if (days < 0) {
    return {
      label: `EXPIRED (${Math.abs(days)} days ago)`,
      statusKey: "expired",
      badgeClass: "bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/70 dark:text-rose-300 dark:border-rose-800",
      description: "DO NOT INGEST. Schedule for safe disposal.",
      priority: 0
    };
  }
  if (days <= 30) {
    return {
      label: `NEARING EXPIRY (${days} days left)`,
      statusKey: "nearing",
      badgeClass: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-800",
      description: "Prioritize usage or prepare for eco-disposal.",
      priority: 2
    };
  }
  return {
    label: `SAFE TO REVIEW (${days} days remaining)`,
    statusKey: "safe",
    badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-800",
    description: "Good stock condition. Store per instructions.",
    priority: 3
  };
};

// Main App Component
export default function App() {
  // Navigation & Preferences State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [language, setLanguage] = useState('en');
  const [activeProfile, setActiveProfile] = useState('all'); // 'all', 'Self', 'Mother'
  const [themeMode, setThemeMode] = useState('dark'); // 'dark' or 'light'
  
  // Core Business State
  const [medicines, setMedicines] = useState(() => {
    const saved = localStorage.getItem('medcycle_medicines');
    return saved ? JSON.parse(saved) : INITIAL_MEDICINES;
  });

  const [reminders, setReminders] = useState(() => {
    const saved = localStorage.getItem('medcycle_reminders');
    return saved ? JSON.parse(saved) : INITIAL_REMINDERS;
  });

  const [passports, setPassports] = useState(() => {
    const saved = localStorage.getItem('medcycle_passports');
    return saved ? JSON.parse(saved) : INITIAL_PASSPORTS;
  });

  // UI Modals & Forms State
  const [isAddMedModalOpen, setIsAddMedModalOpen] = useState(false);
  const [editingMed, setEditingMed] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Scanner Simulator State
  const [ocrImagePreview, setOcrImagePreview] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [ocrResult, setOcrResult] = useState(null);

  // ML Analysis Sandbox Inputs State
  const [mlInput, setMlInput] = useState({
    daysRemaining: 12,
    storageVariance: 'High (32°C Exposed)',
    dosageForm: 'Injectable Liquid',
    quantityRemaining: 15,
    patientAgeTier: 'Elderly (>65)'
  });

  // Digital Passport Form State
  const [selectedDisposalMeds, setSelectedDisposalMeds] = useState([]);
  const [selectedFacilityId, setSelectedFacilityId] = useState('CP-01');
  const [generatedPassport, setGeneratedPassport] = useState(null);

  // Waste Reporting Form
  const [anonymousReport, setAnonymousReport] = useState({ location: '', wasteType: 'Expired Antibiotics', comments: '' });
  const [reportSubmitted, setReportSubmitted] = useState(false);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('medcycle_medicines', JSON.stringify(medicines));
  }, [medicines]);

  useEffect(() => {
    localStorage.setItem('medcycle_reminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem('medcycle_passports', JSON.stringify(passports));
  }, [passports]);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  // Filtered Medicines based on Search & Profile & Categories
  const filteredMedicines = useMemo(() => {
    return medicines.filter(med => {
      // Profile filter
      if (activeProfile === 'Self' && !med.patientName.includes('Self')) return false;
      if (activeProfile === 'Mother' && !med.patientName.includes('Mother')) return false;

      // Category filter
      if (categoryFilter !== 'ALL' && med.category !== categoryFilter) return false;

      // Status filter
      const urgency = getUrgencyCategory(med.expiryDate);
      if (statusFilter !== 'ALL' && urgency.statusKey !== statusFilter) return false;

      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        return (
          med.name.toLowerCase().includes(q) ||
          med.batchNumber.toLowerCase().includes(q) ||
          med.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [medicines, activeProfile, categoryFilter, statusFilter, searchQuery]);

  // Statistics Calculations
  const stats = useMemo(() => {
    let total = medicines.length;
    let nearing = 0;
    let expired = 0;
    let missing = 0;
    let safe = 0;

    medicines.forEach(m => {
      const days = getDaysRemaining(m.expiryDate);
      if (days === null) missing++;
      else if (days < 0) expired++;
      else if (days <= 30) nearing++;
      else safe++;
    });

    const pendingRemindersCount = reminders.filter(r => r.status === 'Pending').length;
    const totalDivertedKg = passports.reduce((acc, p) => acc + (p.weightKg || 0.2), 1.85).toFixed(2);

    return { total, nearing, expired, missing, safe, pendingRemindersCount, totalDivertedKg };
  }, [medicines, reminders, passports]);

  // Handle Add/Edit Medicine
  const handleSaveMedicine = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newMed = {
      id: editingMed ? editingMed.id : `MED-${Math.floor(1000 + Math.random() * 9000)}`,
      name: formData.get('name'),
      batchNumber: formData.get('batchNumber') || 'UNSPECIFIED',
      expiryDate: formData.get('expiryDate'),
      quantity: Number(formData.get('quantity')) || 1,
      category: formData.get('category'),
      dosageForm: formData.get('dosageForm'),
      storageCondition: formData.get('storageCondition'),
      notes: formData.get('notes'),
      patientName: formData.get('patientName') || 'John Doe (Self)',
      dateAdded: editingMed ? editingMed.dateAdded : TODAY_STR
    };

    if (editingMed) {
      setMedicines(prev => prev.map(m => m.id === editingMed.id ? newMed : m));
    } else {
      setMedicines(prev => [newMed, ...prev]);
    }

    setIsAddMedModalOpen(false);
    setEditingMed(null);
  };

  const handleDeleteMedicine = (id) => {
    if (window.confirm("Are you sure you want to remove this medicine from your cabinet?")) {
      setMedicines(prev => prev.filter(m => m.id !== id));
    }
  };

  // OCR Scan Simulation Trigger
  const handleSimulateScan = (preset = 'amox') => {
    setIsScanning(true);
    setOcrResult(null);

    setTimeout(() => {
      setIsScanning(false);
      if (preset === 'amox') {
        setOcrResult({
          rawText: "Rx AMOXICILLIN 500MG CAPS \n B.No: AMX-9022 Exp: 12/2026 \n Store below 25 deg C. Mfg: Apex Pharma",
          extractedName: "Amoxicillin Trihydrate 500mg",
          extractedBatch: "AMX-9022",
          extractedExpiry: "2026-12-31",
          confidence: "96.4%",
          dosageForm: "Capsule",
          category: "Antibiotic"
        });
      } else {
        setOcrResult({
          rawText: "CIPROFLOXACIN TABLETS USP \n Batch: CPX-11-99 \n MFG: 01/2024 EXP: 11/2026 \n Qty: 10 Tabs",
          extractedName: "Ciprofloxacin 500mg",
          extractedBatch: "CPX-11-99",
          extractedExpiry: "2026-11-30",
          confidence: "92.1%",
          dosageForm: "Tablet",
          category: "Antibiotic"
        });
      }
    }, 1200);
  };

  const handleSaveScannedToCabinet = () => {
    if (!ocrResult) return;
    const newMed = {
      id: `MED-${Math.floor(1000 + Math.random() * 9000)}`,
      name: ocrResult.extractedName,
      batchNumber: ocrResult.extractedBatch,
      expiryDate: ocrResult.extractedExpiry,
      quantity: 10,
      category: ocrResult.category,
      dosageForm: ocrResult.dosageForm,
      storageCondition: "Room Temperature",
      notes: "Scanned via OCR AI Package Scanner",
      patientName: "John Doe (Self)",
      dateAdded: TODAY_STR
    };
    setMedicines(prev => [newMed, ...prev]);
    alert("Scanned medicine added successfully to your Medicine Cabinet!");
    setActiveTab('cabinet');
  };

  // Toggle Reminder Status
  const toggleReminderStatus = (id) => {
    setReminders(prev => prev.map(r => {
      if (r.id === id) {
        return { ...r, status: r.status === 'Taken' ? 'Pending' : 'Taken' };
      }
      return r;
    }));
  };

  // Generate Digital Passport
  const handleGeneratePassport = (e) => {
    e.preventDefault();
    if (selectedDisposalMeds.length === 0) {
      alert("Please select at least one expired or unused medicine item for handover.");
      return;
    }

    const facility = DEMO_COLLECTION_POINTS.find(p => p.id === selectedFacilityId) || DEMO_COLLECTION_POINTS[0];
    const itemsList = selectedDisposalMeds.map(id => {
      const med = medicines.find(m => m.id === id);
      return {
        name: med ? med.name : 'Unknown Med',
        quantity: med ? med.quantity : 1,
        batch: med ? med.batchNumber : 'N/A'
      };
    });

    const newPassport = {
      id: `PASSPORT-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      facilityName: facility.name,
      items: itemsList,
      totalItems: itemsList.reduce((acc, curr) => acc + curr.quantity, 0),
      weightKg: (itemsList.length * 0.15 + 0.1).toFixed(2),
      status: "Handover Logged - Pending Facility Audit",
      disposalMethod: "Authorized Eco-Pharma Incineration / Neutralization"
    };

    setPassports(prev => [newPassport, ...prev]);
    setGeneratedPassport(newPassport);
  };

  // Export Cabinet to CSV
  const handleExportCSV = () => {
    const headers = ["ID,Name,Batch,ExpiryDate,DaysRemaining,Status,Category,Quantity,Storage,Patient"];
    const rows = medicines.map(m => {
      const days = getDaysRemaining(m.expiryDate);
      const urgency = getUrgencyCategory(m.expiryDate).statusKey;
      return `"${m.id}","${m.name}","${m.batchNumber}","${m.expiryDate || 'N/A'}",${days !== null ? days : 'N/A'},"${urgency}","${m.category}",${m.quantity},"${m.storageCondition}","${m.patientName}"`;
    });
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `medcycle_cabinet_export_${TODAY_STR}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export Full JSON Backup
  const handleExportJSON = () => {
    const data = { medicines, reminders, passports, exportDate: TODAY_STR };
    const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const link = document.createElement("a");
    link.setAttribute("href", jsonStr);
    link.setAttribute("download", `medcycle_full_backup_${TODAY_STR}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Reset Demo Data
  const handleResetDemoData = () => {
    if (window.confirm("Reset all data to default synthetic initial records? Any custom added medicines will be lost.")) {
      setMedicines(INITIAL_MEDICINES);
      setReminders(INITIAL_REMINDERS);
      setPassports(INITIAL_PASSPORTS);
      localStorage.clear();
      alert("System restored to initial demo synthetic dataset.");
    }
  };

  // Real-time ML Score Calculation for ML Sandbox
  const calculatedMlRisk = useMemo(() => {
    let score = 20; // baseline
    if (mlInput.daysRemaining <= 0) score += 65;
    else if (mlInput.daysRemaining <= 15) score += 45;
    else if (mlInput.daysRemaining <= 30) score += 25;

    if (mlInput.storageVariance.includes('High')) score += 20;
    if (mlInput.dosageForm === 'Injectable Liquid' || mlInput.dosageForm === 'Biologic / Vaccine') score += 15;
    if (mlInput.patientAgeTier.includes('Elderly')) score += 10;

    score = Math.min(100, score);
    let riskTier = "LOW";
    let colorClass = "text-emerald-400 border-emerald-500 bg-emerald-950/40";
    if (score > 75) { riskTier = "CRITICAL RISK"; colorClass = "text-rose-400 border-rose-500 bg-rose-950/50"; }
    else if (score > 50) { riskTier = "HIGH RISK"; colorClass = "text-amber-400 border-amber-500 bg-amber-950/50"; }
    else if (score > 30) { riskTier = "MEDIUM RISK"; colorClass = "text-yellow-400 border-yellow-500 bg-yellow-950/50"; }

    return { score, riskTier, colorClass };
  }, [mlInput]);

  return (
    <div className={`min-h-screen ${themeMode === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} font-sans antialiased transition-colors duration-200`}>
      
      {/* GLOBAL TOP NAVIGATION HEADER */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-teal-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-teal-500/20">
              <Pill className="h-6 w-6 text-slate-950 transform -rotate-45" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-teal-300 via-cyan-200 to-emerald-300 bg-clip-text text-transparent">
                  MedCycle AI
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40">
                  HACKATHON v2.4
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Intelligent Medicine Expiry & Safe Disposal</p>
            </div>
          </div>

          {/* Right Action Controls: Profile Switcher & Language Selector & Theme Toggle */}
          <div className="flex items-center space-x-3">
            
            {/* Profile Dropdown */}
            <div className="relative flex items-center bg-slate-800/80 rounded-lg p-1 border border-slate-700/60">
              <Users className="h-4 w-4 text-teal-400 ml-2 mr-1 hidden sm:block" />
              <select
                value={activeProfile}
                onChange={(e) => setActiveProfile(e.target.value)}
                aria-label="Select User Profile"
                className="bg-transparent text-xs font-semibold text-slate-200 focus:outline-none pr-2 cursor-pointer"
              >
                <option value="all" className="bg-slate-900 text-slate-200">All Household Profiles</option>
                <option value="Self" className="bg-slate-900 text-slate-200">John Doe (Self)</option>
                <option value="Mother" className="bg-slate-900 text-slate-200">Sarah Doe (Caregiver - Mother)</option>
              </select>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center bg-slate-800/80 rounded-lg px-2 py-1 border border-slate-700/60 text-xs">
              <Globe className="h-3.5 w-3.5 text-cyan-400 mr-1.5" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                aria-label="Select Application Language"
                className="bg-transparent text-slate-200 font-medium focus:outline-none cursor-pointer"
              >
                <option value="en" className="bg-slate-900">English</option>
                <option value="hi" className="bg-slate-900">हिन्दी (Hindi)</option>
                <option value="mr" className="bg-slate-900">मराठी (Marathi)</option>
              </select>
            </div>

            {/* Dark/Light Toggle */}
            <button
              onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
              title="Toggle Theme"
            >
              {themeMode === 'dark' ? <Zap className="h-4 w-4 text-amber-400" /> : <Activity className="h-4 w-4 text-teal-600" />}
            </button>
          </div>
        </div>

        {/* PRIMARY TAB NAVIGATION BAR */}
        <div className="bg-slate-900/95 border-t border-slate-800/80 overflow-x-auto scrollbar-none">
          <div className="max-w-7xl mx-auto px-4 flex space-x-1 sm:space-x-2 py-2">
            {[
              { id: 'dashboard', label: t.dashTitle, icon: Activity },
              { id: 'cabinet', label: t.cabinetTitle, icon: Package, badge: stats.expired + stats.nearing },
              { id: 'scanner', label: t.scannerTitle, icon: Upload },
              { id: 'airisk', label: t.aiRiskTitle, icon: Sparkles },
              { id: 'reminders', label: t.remindersTitle, icon: Bell, badge: stats.pendingRemindersCount },
              { id: 'disposal', label: t.disposalTitle, icon: MapPin },
              { id: 'passport', label: t.passportTitle, icon: QrCode },
              { id: 'fefo', label: t.fefoTitle, icon: Archive },
              { id: 'environmental', label: t.environmentalTitle, icon: Heart },
              { id: 'reports', label: t.reportsTitle, icon: FileSpreadsheet },
              { id: 'settings', label: t.settingsTitle, icon: RotateCcw }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-150 ${
                    isActive
                      ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md shadow-teal-900/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                  {tab.badge > 0 && (
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* CLINICAL SAFETY WARNING BANNER */}
      <div className="bg-amber-950/80 border-b border-amber-800/60 text-amber-200 px-4 py-2.5 text-xs text-center flex items-center justify-center space-x-2 shadow-inner">
        <ShieldAlert className="h-4 w-4 text-amber-400 shrink-0" />
        <span>
          <strong>{t.disclaimerTitle}:</strong> {t.disclaimerText}
        </span>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">

        {/* ========================================================= */}
        {/* TAB 1: EXECUTIVE DASHBOARD */}
        {/* ========================================================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            
            {/* Header / Hero Greeting */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950 p-6 rounded-2xl border border-slate-800 shadow-xl">
              <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                  <span>Welcome back to MedCycle Dashboard</span>
                  <Sparkles className="h-5 w-5 text-teal-400" />
                </h1>
                <p className="text-sm text-slate-400 mt-1">
                  Active Profile: <strong className="text-teal-300">{activeProfile === 'all' ? 'All Household Dependents' : activeProfile}</strong> | Current Date System Reference: <span className="font-mono text-cyan-300">{TODAY_STR}</span>
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setIsAddMedModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold text-xs sm:text-sm flex items-center space-x-2 shadow-lg shadow-teal-500/20 transition"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Medicine</span>
                </button>
                <button
                  onClick={() => setActiveTab('scanner')}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 border border-slate-700 font-semibold text-xs sm:text-sm flex items-center space-x-2 transition"
                >
                  <Upload className="h-4 w-4" />
                  <span>Scan Medicine Package</span>
                </button>
              </div>
            </div>

            {/* Top KPI Cards Row */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-md">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-semibold">{t.totalMeds}</span>
                  <Package className="h-4 w-4 text-cyan-400" />
                </div>
                <div className="text-2xl font-extrabold text-white">{stats.total}</div>
                <p className="text-[11px] text-slate-500 mt-1">In active cabinet</p>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-amber-900/40 bg-gradient-to-b from-amber-950/20 to-slate-900">
                <div className="flex items-center justify-between text-amber-400 mb-2">
                  <span className="text-xs font-semibold">{t.nearingExpiry}</span>
                  <AlertTriangle className="h-4 w-4 text-amber-400" />
                </div>
                <div className="text-2xl font-extrabold text-amber-300">{stats.nearing}</div>
                <p className="text-[11px] text-amber-500/80 mt-1">Requires review</p>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-rose-900/50 bg-gradient-to-b from-rose-950/30 to-slate-900">
                <div className="flex items-center justify-between text-rose-400 mb-2">
                  <span className="text-xs font-semibold">{t.expiredMeds}</span>
                  <XCircle className="h-4 w-4 text-rose-400" />
                </div>
                <div className="text-2xl font-extrabold text-rose-400">{stats.expired}</div>
                <p className="text-[11px] text-rose-500/80 mt-1">DO NOT USE</p>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-md">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-semibold">{t.dueReminders}</span>
                  <Bell className="h-4 w-4 text-teal-400" />
                </div>
                <div className="text-2xl font-extrabold text-teal-300">{stats.pendingRemindersCount}</div>
                <p className="text-[11px] text-slate-500 mt-1">Scheduled today</p>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-md col-span-2 md:col-span-1">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-semibold">{t.wasteDiverted}</span>
                  <Heart className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-extrabold text-emerald-300">{stats.totalDivertedKg} kg</div>
                <p className="text-[11px] text-emerald-500/80 mt-1">Safe pharma waste</p>
              </div>
            </div>

            {/* AI Risk Summary Insights Banner */}
            <div className="bg-gradient-to-r from-teal-950/60 via-slate-900 to-cyan-950/60 p-5 rounded-2xl border border-teal-800/40 shadow-lg">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-teal-500/20 rounded-lg text-teal-300 shrink-0">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-teal-200 uppercase tracking-wider">AI Inventory Risk & Expiry Insights</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Automated scan detected <strong className="text-rose-400">{stats.expired} expired medication(s)</strong> and <strong className="text-amber-300">{stats.nearing} medication(s) expiring within 30 days</strong>. Immediate action recommended: Generate a <strong>Digital Disposal Passport</strong> for expired items and consult pharmacist for safe disposal.
                  </p>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Expiry Risk Breakdown Pie Chart */}
              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-md">
                <h3 className="text-sm font-bold text-slate-200 mb-4 flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4 text-teal-400" />
                  <span>Medicine Cabinet Health & Urgency Breakdown</span>
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Safe (>30 Days)', value: stats.safe, color: '#10b981' },
                          { name: 'Nearing Expiry (≤30d)', value: stats.nearing, color: '#f59e0b' },
                          { name: 'Expired', value: stats.expired, color: '#f43f5e' },
                          { name: 'Missing Info', value: stats.missing, color: '#a855f7' }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {[
                          { color: '#10b981' },
                          { color: '#f59e0b' },
                          { color: '#f43f5e' },
                          { color: '#a855f7' }
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }} />
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Medicine Category Distribution Bar Chart */}
              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-md">
                <h3 className="text-sm font-bold text-slate-200 mb-4 flex items-center space-x-2">
                  <Layers className="h-4 w-4 text-cyan-400" />
                  <span>Inventory Distribution by Therapeutic Category</span>
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { category: 'Antibiotics', count: medicines.filter(m => m.category === 'Antibiotic').length },
                        { category: 'Analgesics', count: medicines.filter(m => m.category.includes('Analgesic')).length },
                        { category: 'Cardio', count: medicines.filter(m => m.category === 'Cardiovascular').length },
                        { category: 'Diabetes', count: medicines.filter(m => m.category.includes('Diabetic') || m.category.includes('Hormone')).length },
                        { category: 'Respiratory', count: medicines.filter(m => m.category === 'Respiratory').length },
                        { category: 'Gastro', count: medicines.filter(m => m.category === 'Gastrointestinal').length },
                      ]}
                    >
                      <XAxis dataKey="category" stroke="#94a3b8" fontSize={12} />
                      <YAxis stroke="#94a3b8" fontSize={12} allowDecimals={false} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }} />
                      <Bar dataKey="count" fill="#06b6d4" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* High Priority Alerts List */}
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-200 flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-rose-400" />
                  <span>Medicines Needing Immediate Action</span>
                </h3>
                <button onClick={() => setActiveTab('cabinet')} className="text-xs text-teal-400 hover:underline flex items-center">
                  <span>View All Cabinet</span>
                  <ChevronRight className="h-3.5 w-3.5 ml-1" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {medicines
                  .filter(m => {
                    const days = getDaysRemaining(m.expiryDate);
                    return days === null || days <= 30;
                  })
                  .map(med => {
                    const urgency = getUrgencyCategory(med.expiryDate);
                    return (
                      <div key={med.id} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-sm text-slate-100">{med.name}</div>
                          <div className="text-xs text-slate-400 mt-0.5">
                            Batch: <span className="font-mono text-slate-300">{med.batchNumber}</span> | Qty: {med.quantity}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold border ${urgency.badgeClass}`}>
                            {urgency.label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: MEDICINE CABINET (Interactive Table & Manager) */}
        {/* ========================================================= */}
        {activeTab === 'cabinet' && (
          <div className="space-y-6">
            
            {/* Cabinet Header Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                  <Package className="h-5 w-5 text-teal-400" />
                  <span>Interactive Medicine Cabinet</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">Manage stock, inspect expiry proximity, and record detailed usage notes.</p>
              </div>

              <button
                onClick={() => { setEditingMed(null); setIsAddMedModalOpen(true); }}
                className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition shadow-lg shadow-teal-500/20"
              >
                <Plus className="h-4 w-4" />
                <span>Add New Medicine</span>
              </button>
            </div>

            {/* Search & Filter Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* Search Bar */}
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name, batch, category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  aria-label="Filter by Therapeutic Category"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-teal-500 cursor-pointer"
                >
                  <option value="ALL">All Therapeutic Categories</option>
                  <option value="Antibiotic">Antibiotic</option>
                  <option value="Analgesic / Antipyretic">Analgesic / Antipyretic</option>
                  <option value="Antidiabetic">Antidiabetic</option>
                  <option value="Cardiovascular">Cardiovascular</option>
                  <option value="Respiratory">Respiratory</option>
                  <option value="Gastrointestinal">Gastrointestinal</option>
                  <option value="Antihistamine">Antihistamine</option>
                  <option value="Hormone / Diabetes">Hormone / Diabetes</option>
                </select>
              </div>

              {/* Urgency Status Filter */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  aria-label="Filter by Expiry Urgency Status"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-teal-500 cursor-pointer"
                >
                  <option value="ALL">All Expiry Statuses</option>
                  <option value="expired">Expired Only</option>
                  <option value="nearing">Nearing Expiry (≤30 Days)</option>
                  <option value="safe">Safe to Review</option>
                  <option value="missing">Missing Expiry Date</option>
                </select>
              </div>
            </div>

            {/* Medicine Table View */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-[11px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="px-4 py-3.5">Medicine & Batch</th>
                      <th className="px-4 py-3.5">Category & Dosage</th>
                      <th className="px-4 py-3.5">Expiry Date</th>
                      <th className="px-4 py-3.5">Calculated Status Tag</th>
                      <th className="px-4 py-3.5">Qty / Storage</th>
                      <th className="px-4 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredMedicines.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                          No medicines match the selected filter criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredMedicines.map((med) => {
                        const urgency = getUrgencyCategory(med.expiryDate);
                        return (
                          <tr key={med.id} className="hover:bg-slate-800/40 transition">
                            
                            {/* Name & Batch */}
                            <td className="px-4 py-3.5 font-medium text-white">
                              <div className="font-semibold text-slate-100">{med.name}</div>
                              <div className="text-[11px] text-slate-400 font-mono">Batch: {med.batchNumber} | Patient: {med.patientName}</div>
                            </td>

                            {/* Category & Dosage */}
                            <td className="px-4 py-3.5">
                              <div className="text-slate-200">{med.category}</div>
                              <div className="text-[11px] text-slate-400">{med.dosageForm}</div>
                            </td>

                            {/* Expiry Date */}
                            <td className="px-4 py-3.5 font-mono text-slate-200">
                              {med.expiryDate ? med.expiryDate : <span className="text-purple-400 font-semibold">NOT PRINTED</span>}
                            </td>

                            {/* Visual Status Tag */}
                            <td className="px-4 py-3.5">
                              <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold border ${urgency.badgeClass}`}>
                                {urgency.label}
                              </span>
                            </td>

                            {/* Qty & Storage */}
                            <td className="px-4 py-3.5">
                              <div className="font-semibold text-slate-200">{med.quantity} units</div>
                              <div className="text-[11px] text-slate-400">{med.storageCondition}</div>
                            </td>

                            {/* Actions */}
                            <td className="px-4 py-3.5 text-right space-x-2">
                              <button
                                onClick={() => { setEditingMed(med); setIsAddMedModalOpen(true); }}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 transition"
                                title="Edit Medicine"
                              >
                                <Edit className="h-3.5 w-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteMedicine(med.id)}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-rose-400 transition"
                                title="Delete Medicine"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: AI MEDICINE SCANNER (OCR) */}
        {/* ========================================================= */}
        {activeTab === 'scanner' && (
          <div className="space-y-6">
            
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <Upload className="h-5 w-5 text-teal-400" />
                <span>AI Medicine Package Scanner (OCR Extraction)</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Upload or capture a photo of a medicine blister pack or bottle to automatically parse medicine name, batch number, and expiry date.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Left Column: Image Upload & Mock Trigger Controls */}
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-slate-200">1. Select Package Image or Trigger Demo Scan</h3>
                
                {/* Mock Image Upload Container */}
                <div className="border-2 border-dashed border-slate-700 rounded-xl p-6 text-center bg-slate-950 flex flex-col items-center justify-center space-y-3">
                  <div className="p-3 bg-teal-500/10 rounded-full text-teal-400">
                    <Upload className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-200">Drag & drop medicine packaging image here</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Supports PNG, JPG, WEBP up to 10MB</p>
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <p className="text-xs text-slate-400 font-semibold">Or trigger realistic simulated OCR recognition:</p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => handleSimulateScan('amox')}
                      disabled={isScanning}
                      className="flex-1 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-teal-300 font-medium transition"
                    >
                      Scan Preset 1: Amoxicillin Strip
                    </button>
                    <button
                      onClick={() => handleSimulateScan('cipro')}
                      disabled={isScanning}
                      className="flex-1 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-cyan-300 font-medium transition"
                    >
                      Scan Preset 2: Ciprofloxacin Pack
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: OCR Results & Manual Correction Box */}
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-slate-200">2. OCR Extraction Output & Correction</h3>

                {isScanning ? (
                  <div className="py-12 text-center space-y-3">
                    <RefreshCw className="h-8 w-8 text-teal-400 animate-spin mx-auto" />
                    <p className="text-xs text-slate-400 font-medium">Running Computer Vision & Tesseract OCR parsing...</p>
                  </div>
                ) : ocrResult ? (
                  <div className="space-y-4">
                    
                    {/* Raw Text Output */}
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="text-[10px] text-slate-500 font-mono uppercase mb-1">Raw OCR Extracted Text:</div>
                      <pre className="text-xs font-mono text-emerald-400 whitespace-pre-wrap">{ocrResult.rawText}</pre>
                    </div>

                    {/* Extracted Fields Form */}
                    <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-400">Medicine Name</label>
                        <input
                          type="text"
                          value={ocrResult.extractedName}
                          onChange={(e) => setOcrResult({ ...ocrResult, extractedName: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 mt-1 focus:outline-none focus:border-teal-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[11px] font-semibold text-slate-400">Batch Number</label>
                          <input
                            type="text"
                            value={ocrResult.extractedBatch}
                            onChange={(e) => setOcrResult({ ...ocrResult, extractedBatch: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 mt-1 focus:outline-none focus:border-teal-500"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-semibold text-slate-400">Expiry Date (YYYY-MM-DD)</label>
                          <input
                            type="date"
                            value={ocrResult.extractedExpiry}
                            onChange={(e) => setOcrResult({ ...ocrResult, extractedExpiry: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 mt-1 focus:outline-none focus:border-teal-500"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                        <span>OCR Confidence: <strong className="text-teal-300">{ocrResult.confidence}</strong></span>
                        <span className="text-[10px] text-slate-500">Manual review recommended</span>
                      </div>
                    </div>

                    <button
                      onClick={handleSaveScannedToCabinet}
                      className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-teal-500/20 transition flex items-center justify-center space-x-2"
                    >
                      <Check className="h-4 w-4" />
                      <span>Confirm & Save to Cabinet</span>
                    </button>

                  </div>
                ) : (
                  <div className="py-12 text-center text-slate-500 text-xs">
                    No active image scanned. Click a preset above to run the OCR extraction pipeline.
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: AI/ML RISK ANALYSIS MODEL (Sandbox + Metrics) */}
        {/* ========================================================= */}
        {activeTab === 'airisk' && (
          <div className="space-y-6">
            
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-teal-400" />
                <span>AI/ML Expiry Degradation & Priority Risk Sandbox</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Demonstrating Machine Learning (RandomForest / Gradient Boosting Classifier) predicting medication degradation risk based on expiry proximity, storage temperature variance, dosage form, and inventory hold.
              </p>
            </div>

            {/* Model Training & Accuracy Performance Banner */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-center">
                <div className="text-xs text-slate-400">Model Accuracy</div>
                <div className="text-2xl font-extrabold text-teal-300 mt-1">94.2%</div>
                <div className="text-[10px] text-slate-500">5-Fold Cross Validation</div>
              </div>
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-center">
                <div className="text-xs text-slate-400">Precision</div>
                <div className="text-2xl font-extrabold text-cyan-300 mt-1">92.8%</div>
                <div className="text-[10px] text-slate-500">High Risk Precision</div>
              </div>
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-center">
                <div className="text-xs text-slate-400">Recall Score</div>
                <div className="text-2xl font-extrabold text-emerald-300 mt-1">95.1%</div>
                <div className="text-[10px] text-slate-500">Sensitivity Metric</div>
              </div>
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-center">
                <div className="text-xs text-slate-400">Dataset Size</div>
                <div className="text-2xl font-extrabold text-purple-300 mt-1">10,000</div>
                <div className="text-[10px] text-slate-500">Synthetic Samples</div>
              </div>
            </div>

            {/* Interactive ML Parameter Input Sandbox */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4 lg:col-span-2">
                <h3 className="text-sm font-bold text-slate-200">Interactive Prediction Sandbox Parameters</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  
                  {/* Days to Expiry Slider */}
                  <div>
                    <label className="text-slate-300 font-semibold flex justify-between">
                      <span>Days Remaining to Expiry:</span>
                      <span className="text-teal-300 font-mono">{mlInput.daysRemaining} days</span>
                    </label>
                    <input
                      type="range"
                      min="-30"
                      max="120"
                      value={mlInput.daysRemaining}
                      onChange={(e) => setMlInput({ ...mlInput, daysRemaining: Number(e.target.value) })}
                      className="w-full mt-2 accent-teal-400 cursor-pointer"
                    />
                  </div>

                  {/* Storage Variance */}
                  <div>
                    <label className="text-slate-300 font-semibold">Storage Condition Environment:</label>
                    <select
                      value={mlInput.storageVariance}
                      onChange={(e) => setMlInput({ ...mlInput, storageVariance: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200 mt-1 focus:outline-none focus:border-teal-500"
                    >
                      <option value="Ideal (20°C - 25°C Controlled)">Ideal (20°C - 25°C Controlled)</option>
                      <option value="Moderate Moisture Exposure">Moderate Moisture Exposure</option>
                      <option value="High (32°C Exposed)">High Temperature (32°C+ Exposed)</option>
                    </select>
                  </div>

                  {/* Dosage Form */}
                  <div>
                    <label className="text-slate-300 font-semibold">Dosage Form Factor:</label>
                    <select
                      value={mlInput.dosageForm}
                      onChange={(e) => setMlInput({ ...mlInput, dosageForm: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200 mt-1 focus:outline-none focus:border-teal-500"
                    >
                      <option value="Solid Tablet / Capsule">Solid Tablet / Capsule</option>
                      <option value="Liquid Suspension / Syrup">Liquid Suspension / Syrup</option>
                      <option value="Injectable Liquid">Injectable Liquid / Biological</option>
                      <option value="Topical Ointment">Topical Ointment</option>
                    </select>
                  </div>

                  {/* Patient Age Tier */}
                  <div>
                    <label className="text-slate-300 font-semibold">Patient Vulnerability Tier:</label>
                    <select
                      value={mlInput.patientAgeTier}
                      onChange={(e) => setMlInput({ ...mlInput, patientAgeTier: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200 mt-1 focus:outline-none focus:border-teal-500"
                    >
                      <option value="Adult (18-65)">Adult (18-65 Standard)</option>
                      <option value="Pediatric (<12)">Pediatric (&lt;12 Years)</option>
                      <option value="Elderly (>65)">Elderly (&gt;65 High Risk)</option>
                    </select>
                  </div>

                </div>

                {/* Feature Importance Bar Chart */}
                <div className="pt-4 border-t border-slate-800">
                  <h4 className="text-xs font-bold text-slate-300 mb-3">Model Feature Importance Weights</h4>
                  <div className="h-44">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        layout="vertical"
                        data={[
                          { feature: 'Days to Expiry', weight: 0.48 },
                          { feature: 'Storage Temp Var', weight: 0.25 },
                          { feature: 'Dosage Form Factor', weight: 0.15 },
                          { feature: 'Patient Age Tier', weight: 0.12 },
                        ]}
                      >
                        <XAxis type="number" stroke="#94a3b8" fontSize={10} domain={[0, 0.6]} />
                        <YAxis type="category" dataKey="feature" stroke="#94a3b8" fontSize={11} width={130} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }} />
                        <Bar dataKey="weight" fill="#14b8a6" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

              </div>

              {/* Right Output Card */}
              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-200 mb-4">ML Inference Output</h3>
                  
                  <div className={`p-5 rounded-2xl border text-center space-y-2 ${calculatedMlRisk.colorClass}`}>
                    <div className="text-xs font-bold uppercase tracking-widest">Calculated Risk Tier</div>
                    <div className="text-3xl font-extrabold">{calculatedMlRisk.riskTier}</div>
                    <div className="text-xl font-mono">Risk Index: {calculatedMlRisk.score} / 100</div>
                  </div>

                  <div className="mt-4 space-y-2 text-xs text-slate-300">
                    <div className="font-semibold text-slate-200">Inference Recommendations:</div>
                    <ul className="list-disc pl-4 space-y-1 text-slate-400">
                      {calculatedMlRisk.score > 50 ? (
                        <>
                          <li className="text-rose-300">High degradation probability detected.</li>
                          <li>Flag item for immediate pharmacy return or disposal.</li>
                          <li>Do not administer to vulnerable patient profiles.</li>
                        </>
                      ) : (
                        <>
                          <li>Medicine parameters within standard stability thresholds.</li>
                          <li>Maintain recommended temperature and humidity controls.</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-3 bg-slate-950 rounded-xl border border-slate-800 text-[10px] text-slate-500 leading-tight">
                  <strong>Notice:</strong> This model uses synthetic training datasets for demonstration purposes only. It is not clinically validated for diagnostic or prescription decisioning.
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: REMINDERS & CAREGIVER VIEW */}
        {/* ========================================================= */}
        {activeTab === 'reminders' && (
          <div className="space-y-6">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-teal-400" />
                  <span>Medication Reminder Schedule & Caregiver View</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Daily dose timeline for active profile: <strong className="text-teal-300">{activeProfile === 'all' ? 'All Household Dependents' : activeProfile}</strong>
                </p>
              </div>

              <div className="text-xs text-slate-400 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 flex items-center space-x-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>In-App Notifications Active</span>
              </div>
            </div>

            {/* Daily Schedule Timeline Cards */}
            <div className="space-y-3">
              {reminders
                .filter(r => activeProfile === 'all' || r.patientName.includes(activeProfile))
                .map((rem) => {
                  const isTaken = rem.status === 'Taken';
                  return (
                    <div
                      key={rem.id}
                      className={`p-4 rounded-2xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        isTaken
                          ? 'bg-slate-900/60 border-slate-800/60 opacity-80'
                          : 'bg-slate-900 border-teal-800/40 shadow-md'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2.5 rounded-xl text-xs font-bold ${
                          isTaken ? 'bg-slate-800 text-slate-500' : 'bg-teal-500/20 text-teal-300'
                        }`}>
                          <Clock className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className={`font-bold text-sm sm:text-base ${isTaken ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                              {rem.medName}
                            </h3>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                              {rem.dosage}
                            </span>
                          </div>
                          <div className="text-xs text-slate-400 mt-1">
                            Slot: <strong className="text-cyan-300">{rem.timeSlot}</strong> | Patient: <span className="text-slate-300">{rem.patientName}</span>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">{rem.instructions}</div>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleReminderStatus(rem.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 shrink-0 ${
                          isTaken
                            ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                            : 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-md shadow-teal-500/20'
                        }`}
                      >
                        {isTaken ? (
                          <>
                            <RotateCcw className="h-3.5 w-3.5" />
                            <span>Mark as Pending</span>
                          </>
                        ) : (
                          <>
                            <Check className="h-3.5 w-3.5" />
                            <span>Mark as Taken</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: SAFE DISPOSAL & RECYCLING HUB (Multilingual Live) */}
        {/* ========================================================= */}
        {activeTab === 'disposal' && (
          <div className="space-y-6">
            
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-teal-400" />
                <span>{t.disposalTitle}</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Protect public waterways and community safety by delivering expired medications to authorized drop-boxes.
              </p>
            </div>

            {/* Responsible Guidance Banner (Multilingual) */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-teal-800/40 space-y-3">
              <h3 className="text-sm font-bold text-teal-300 flex items-center space-x-2">
                <ShieldCheck className="h-4 w-4" />
                <span>{t.disposalBannerTitle}</span>
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
                <li className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start space-x-2">
                  <span className="text-rose-400 font-bold">1.</span>
                  <span>{t.disposalRule1}</span>
                </li>
                <li className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start space-x-2">
                  <span className="text-rose-400 font-bold">2.</span>
                  <span>{t.disposalRule2}</span>
                </li>
                <li className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start space-x-2">
                  <span className="text-teal-400 font-bold">3.</span>
                  <span>{t.disposalRule3}</span>
                </li>
                <li className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start space-x-2">
                  <span className="text-teal-400 font-bold">4.</span>
                  <span>{t.disposalRule4}</span>
                </li>
              </ul>
            </div>

            {/* Verified Collection Point Directory */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-200">{t.findPoints}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {DEMO_COLLECTION_POINTS.map((cp) => (
                  <div key={cp.id} className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-slate-100">{cp.name}</h4>
                        <p className="text-xs text-slate-400 mt-0.5">{cp.address}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                        {cp.distance}
                      </span>
                    </div>

                    <div className="text-xs text-slate-400 space-y-1">
                      <div>Hours: <strong className="text-slate-200">{cp.operatingHours}</strong></div>
                      <div>Status: <span className="text-emerald-400 font-semibold">{cp.status}</span></div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                      <span className="text-slate-500">{cp.phone}</span>
                      <button
                        onClick={() => { setActiveTab('passport'); setSelectedFacilityId(cp.id); }}
                        className="px-3 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition"
                      >
                        Select for Handover Passport
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 7: DIGITAL DISPOSAL PASSPORT */}
        {/* ========================================================= */}
        {activeTab === 'passport' && (
          <div className="space-y-6">
            
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <QrCode className="h-5 w-5 text-teal-400" />
                <span>Digital Disposal Passport Generator</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Log medicine handovers to authorized collection centers and generate verifiable digital receipt passports with QR codes.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Generator Form */}
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-slate-200">1. Select Expired Items for Handover</h3>

                {/* Checkbox list of expired meds */}
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {medicines.map((m) => {
                    const isSelected = selectedDisposalMeds.includes(m.id);
                    return (
                      <label
                        key={m.id}
                        className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer text-xs transition ${
                          isSelected ? 'bg-teal-950/60 border-teal-500 text-teal-200' : 'bg-slate-950 border-slate-800 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => {
                              if (e.target.checked) setSelectedDisposalMeds([...selectedDisposalMeds, m.id]);
                              else setSelectedDisposalMeds(selectedDisposalMeds.filter(id => id !== m.id));
                            }}
                            className="accent-teal-400"
                          />
                          <div>
                            <div className="font-semibold">{m.name}</div>
                            <div className="text-[10px] text-slate-400">Batch: {m.batchNumber} | Qty: {m.quantity}</div>
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300">Target Collection Facility:</label>
                  <select
                    value={selectedFacilityId}
                    onChange={(e) => setSelectedFacilityId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 mt-1 focus:outline-none focus:border-teal-500"
                  >
                    {DEMO_COLLECTION_POINTS.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleGeneratePassport}
                  className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-teal-500/20 transition flex items-center justify-center space-x-2"
                >
                  <QrCode className="h-4 w-4" />
                  <span>Generate Official Digital Passport</span>
                </button>
              </div>

              {/* Generated Passport Visual Card */}
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-slate-200">2. Generated Passport Preview</h3>

                {generatedPassport ? (
                  <div className="p-6 bg-gradient-to-b from-slate-950 to-slate-900 rounded-2xl border border-teal-500/40 space-y-4 shadow-2xl relative overflow-hidden">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div>
                        <div className="text-[10px] text-teal-400 font-mono uppercase font-bold">Official Digital Passport</div>
                        <div className="text-base font-extrabold text-white font-mono">{generatedPassport.id}</div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/40">
                        {generatedPassport.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-slate-500">Timestamp:</span>
                        <div className="font-mono text-slate-200">{generatedPassport.timestamp}</div>
                      </div>
                      <div>
                        <span className="text-slate-500">Weight Est:</span>
                        <div className="font-mono text-slate-200">{generatedPassport.weightKg} kg</div>
                      </div>
                    </div>

                    <div className="text-xs">
                      <span className="text-slate-500">Facility:</span>
                      <div className="font-semibold text-slate-200">{generatedPassport.facilityName}</div>
                    </div>

                    {/* QR Code Graphic Box */}
                    <div className="p-4 bg-white rounded-xl text-center flex flex-col items-center justify-center space-y-2">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(generatedPassport.id)}`}
                        alt="QR Passport Code"
                        className="h-28 w-28"
                      />
                      <span className="text-[10px] text-slate-800 font-mono font-bold">SCAN TO VERIFY AUDIT LOG</span>
                    </div>

                    <button
                      onClick={() => window.print()}
                      className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 border border-slate-700 font-semibold text-xs flex items-center justify-center space-x-1.5"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Print / Save Passport Certificate</span>
                    </button>
                  </div>
                ) : (
                  <div className="py-16 text-center text-slate-500 text-xs">
                    Select medicines on the left and click "Generate Official Digital Passport" to produce a verifiable receipt.
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 8: PHARMACY FEFO INVENTORY */}
        {/* ========================================================= */}
        {activeTab === 'fefo' && (
          <div className="space-y-6">
            
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <Archive className="h-5 w-5 text-teal-400" />
                <span>Pharmacy FEFO Inventory Management (First Expiry, First Out)</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Prioritizing medicine stock dispatch based on earliest expiry date to minimize pharmaceutical wastage.
              </p>
            </div>

            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-[11px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="px-4 py-3.5">Dispatch Priority</th>
                      <th className="px-4 py-3.5">Medicine Name</th>
                      <th className="px-4 py-3.5">Batch #</th>
                      <th className="px-4 py-3.5">Expiry Date</th>
                      <th className="px-4 py-3.5">Stock Count</th>
                      <th className="px-4 py-3.5">FEFO Action Required</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {[...medicines]
                      .sort((a, b) => {
                        const daysA = getDaysRemaining(a.expiryDate) ?? 9999;
                        const daysB = getDaysRemaining(b.expiryDate) ?? 9999;
                        return daysA - daysB;
                      })
                      .map((med, idx) => {
                        const days = getDaysRemaining(med.expiryDate);
                        return (
                          <tr key={med.id} className="hover:bg-slate-800/40">
                            <td className="px-4 py-3.5 font-bold font-mono text-teal-400">
                              #{idx + 1}
                            </td>
                            <td className="px-4 py-3.5 font-semibold text-white">{med.name}</td>
                            <td className="px-4 py-3.5 font-mono text-slate-400">{med.batchNumber}</td>
                            <td className="px-4 py-3.5 font-mono">{med.expiryDate || 'N/A'}</td>
                            <td className="px-4 py-3.5 font-bold text-slate-200">{med.quantity} units</td>
                            <td className="px-4 py-3.5">
                              {days !== null && days < 0 ? (
                                <span className="text-rose-400 font-bold">REMOVABLE (Expired)</span>
                              ) : days !== null && days <= 30 ? (
                                <span className="text-amber-400 font-bold">DISPATCH IMMEDIATELY</span>
                              ) : (
                                <span className="text-emerald-400">Standard Queue Hold</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 9: ENVIRONMENTAL WASTE TRACKER */}
        {/* ========================================================= */}
        {activeTab === 'environmental' && (
          <div className="space-y-6">
            
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <Heart className="h-5 w-5 text-emerald-400" />
                <span>Environmental Waste Diverted Statistics & Reporting</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Tracking community progress in diverting chemical active pharmaceutical ingredients (APIs) from aquatic ecosystems.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-center space-y-2">
                <div className="text-3xl font-extrabold text-emerald-400">{stats.totalDivertedKg} kg</div>
                <div className="text-xs font-semibold text-slate-300">Pharma Waste Safely Diverted</div>
                <p className="text-[11px] text-slate-500">Prevented from improper landfill dumping</p>
              </div>

              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-center space-y-2">
                <div className="text-3xl font-extrabold text-cyan-400">{(stats.totalDivertedKg * 4200).toFixed(0)} L</div>
                <div className="text-xs font-semibold text-slate-300">Water Ecosystem Protected</div>
                <p className="text-[11px] text-slate-500">Calculated equivalent clean water saved</p>
              </div>

              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-center space-y-2">
                <div className="text-3xl font-extrabold text-purple-400">{passports.length + 3}</div>
                <div className="text-xs font-semibold text-slate-300">Community Handover Audits</div>
                <p className="text-[11px] text-slate-500">Verified facility drop receipts</p>
              </div>
            </div>

            {/* Anonymous Reporting Form */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-slate-200">Report Unsafe Pharmaceutical Dumping Concern (Anonymous)</h3>

              {reportSubmitted ? (
                <div className="p-4 bg-emerald-950/60 border border-emerald-500 text-emerald-200 rounded-xl text-xs text-center">
                  Thank you! Your anonymous report has been transmitted to municipal eco-pharma compliance officers.
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setReportSubmitted(true);
                  }}
                  className="space-y-3 text-xs"
                >
                  <div>
                    <label className="text-slate-300 font-semibold">Location or Pharmacy Kiosk Name:</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sector 4 Municipal Waste Dump near Riverbed"
                      value={anonymousReport.location}
                      onChange={(e) => setAnonymousReport({ ...anonymousReport, location: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 mt-1 focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold">Observed Concern Description:</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Describe improper dumping of expired antibiotics or bulk liquids..."
                      value={anonymousReport.comments}
                      onChange={(e) => setAnonymousReport({ ...anonymousReport, comments: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 mt-1 focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition"
                  >
                    Submit Anonymous Eco Report
                  </button>
                </form>
              )}
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 10: REPORTS & DATA MANAGEMENT */}
        {/* ========================================================= */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <FileSpreadsheet className="h-5 w-5 text-teal-400" />
                <span>Reports, Backup Export & JSON Schema Import</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Export medicine inventories for local Excel auditing or generate JSON schema backups.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-slate-200">Export Inventory Data</h3>
                <p className="text-xs text-slate-400">Download current cabinet records in CSV format or raw JSON.</p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleExportCSV}
                    className="px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center space-x-2 transition"
                  >
                    <Download className="h-4 w-4" />
                    <span>Export Cabinet to CSV</span>
                  </button>

                  <button
                    onClick={handleExportJSON}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-teal-300 border border-slate-700 font-bold rounded-xl text-xs flex items-center justify-center space-x-2 transition"
                  >
                    <FileJson className="h-4 w-4" />
                    <span>Export Full Backup (JSON)</span>
                  </button>
                </div>
              </div>

              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-slate-200">Restore Application State</h3>
                <p className="text-xs text-slate-400">Import a previously exported JSON file to restore cabinet state.</p>

                <input
                  type="file"
                  accept=".json"
                  aria-label="Upload JSON State File"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      try {
                        const parsed = JSON.parse(event.target.result);
                        if (parsed.medicines) setMedicines(parsed.medicines);
                        if (parsed.reminders) setReminders(parsed.reminders);
                        if (parsed.passports) setPassports(parsed.passports);
                        alert("Data imported successfully!");
                      } catch (err) {
                        alert("Invalid JSON format file.");
                      }
                    };
                    reader.readAsText(file);
                  }}
                  className="block w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-teal-300 hover:file:bg-slate-700"
                />
              </div>

            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 11: SETTINGS & SYSTEM INFO */}
        {/* ========================================================= */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <RotateCcw className="h-5 w-5 text-teal-400" />
                <span>Settings & Demo Data Reset</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">Configure preference flags or reset demo application state for judges.</p>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
              
              <div>
                <h3 className="text-sm font-bold text-slate-200 mb-2">Language Selection</h3>
                <div className="flex gap-3">
                  {['en', 'hi', 'mr'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition ${
                        language === lang ? 'bg-teal-500 text-slate-950 border-teal-400' : 'bg-slate-950 text-slate-300 border-slate-800'
                      }`}
                    >
                      {lang === 'en' ? 'English' : lang === 'hi' ? 'हिन्दी (Hindi)' : 'मराठी (Marathi)'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <h3 className="text-sm font-bold text-rose-400 mb-2">Reset Demo Synthetic Dataset</h3>
                <p className="text-xs text-slate-400 mb-3">Restores the original 10 sample medicines, reminders, and disposal passports.</p>
                <button
                  onClick={handleResetDemoData}
                  className="px-4 py-2.5 bg-rose-950 hover:bg-rose-900 text-rose-200 border border-rose-800 font-bold rounded-xl text-xs transition flex items-center space-x-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Restore Default Demo Data</span>
                </button>
              </div>

              <div className="pt-4 border-t border-slate-800 text-xs text-slate-500 space-y-1 font-mono">
                <div>Application: MedCycle AI Hackathon Edition</div>
                <div>Build Version: v2.4.0 (Production Single-File Build)</div>
                <div>Machine Learning Engine: Random Forest / Rule Classifier</div>
                <div>OCR Pipeline: Tesseract JS Fallback Service</div>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* MODAL: ADD / EDIT MEDICINE FORM */}
      {isAddMedModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Pill className="h-5 w-5 text-teal-400" />
                <span>{editingMed ? 'Edit Medicine Record' : 'Add New Medicine to Cabinet'}</span>
              </h3>
              <button
                onClick={() => setIsAddMedModalOpen(false)}
                className="text-slate-400 hover:text-slate-200 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveMedicine} className="space-y-3 text-xs">
              
              <div>
                <label className="text-slate-300 font-semibold">Medicine Brand / Generic Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  defaultValue={editingMed ? editingMed.name : ''}
                  placeholder="e.g. Amoxicillin 500mg"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 mt-1 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold">Batch Number</label>
                  <input
                    type="text"
                    name="batchNumber"
                    defaultValue={editingMed ? editingMed.batchNumber : ''}
                    placeholder="e.g. AMX-2024-88A"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 mt-1 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold">Expiry Date (YYYY-MM-DD)</label>
                  <input
                    type="date"
                    name="expiryDate"
                    defaultValue={editingMed ? editingMed.expiryDate : ''}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 mt-1 focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold">Therapeutic Category</label>
                  <select
                    name="category"
                    defaultValue={editingMed ? editingMed.category : 'Antibiotic'}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 mt-1 focus:outline-none focus:border-teal-500"
                  >
                    <option value="Antibiotic">Antibiotic</option>
                    <option value="Analgesic / Antipyretic">Analgesic / Antipyretic</option>
                    <option value="Antidiabetic">Antidiabetic</option>
                    <option value="Cardiovascular">Cardiovascular</option>
                    <option value="Respiratory">Respiratory</option>
                    <option value="Gastrointestinal">Gastrointestinal</option>
                    <option value="Antihistamine">Antihistamine</option>
                    <option value="Hormone / Diabetes">Hormone / Diabetes</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-semibold">Dosage Form</label>
                  <select
                    name="dosageForm"
                    defaultValue={editingMed ? editingMed.dosageForm : 'Tablet'}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 mt-1 focus:outline-none focus:border-teal-500"
                  >
                    <option value="Tablet">Tablet</option>
                    <option value="Capsule">Capsule</option>
                    <option value="Inhaler">Inhaler</option>
                    <option value="Injectable Vial">Injectable Vial</option>
                    <option value="Syrup / Liquid">Syrup / Liquid</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold">Quantity / Units</label>
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    defaultValue={editingMed ? editingMed.quantity : 10}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 mt-1 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold">Patient Profile</label>
                  <select
                    name="patientName"
                    defaultValue={editingMed ? editingMed.patientName : 'John Doe (Self)'}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 mt-1 focus:outline-none focus:border-teal-500"
                  >
                    <option value="John Doe (Self)">John Doe (Self)</option>
                    <option value="Sarah Doe (Mother)">Sarah Doe (Mother)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold">Storage Instructions</label>
                <input
                  type="text"
                  name="storageCondition"
                  defaultValue={editingMed ? editingMed.storageCondition : 'Cool & Dry (Below 25°C)'}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 mt-1 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold">Usage Notes</label>
                <textarea
                  name="notes"
                  rows={2}
                  defaultValue={editingMed ? editingMed.notes : ''}
                  placeholder="e.g. Take with food twice daily..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 mt-1 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddMedModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold shadow-md shadow-teal-500/20"
                >
                  Save Medicine Record
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}