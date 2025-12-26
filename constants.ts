import { Language } from './types';

export const CONTENT = {
  en: {
    nav: { solutions: "Solutions", news: "News", subsidy_guide: "Subsidy Roadmap", contact: "Contact", login: "Dashboard Login" },
    hero: {
      title: "Move Your Garage From the Paper Age to the Smart Age",
      subtitle: "The platform that empowers every role in your garage. From mechanic to owner, we convert chaos into profit.",
      cta: "Calculate Lost Revenue",
    },
    roles: {
      garage_owner: "Garage Owner",
      advisor: "Service Advisor",
      mechanic: "Mechanic",
      warehouse: "Warehouse Mgr.",
      financial: "Accountant",
    },
    dashboard: {
      welcome: "Welcome back,",
      subsidy_title: "Subsidy Finder",
      subsidy_desc: "Check eligibility for SEBA, MIA, and Vamil grants.",
      vsme_title: "VSME Report",
      vsme_desc: "Generate bank-ready ESG reports (EFRAG Standard).",
      btn_scan: "Start Scan",
      btn_create: "Create Report"
    }
  },
  nl: {
    nav: { solutions: "Oplossingen", news: "Nieuws", subsidy_guide: "Subsidie Route", contact: "Contact", login: "Inloggen" },
    hero: {
      title: "Breng uw garage van het papiertijdperk naar het slimme tijdperk",
      subtitle: "Het platform dat elke rol in uw garage versterkt. Van monteur tot eigenaar, wij zetten chaos om in winst.",
      cta: "Bereken Gederfde Inkomsten",
    },
    roles: {
      garage_owner: "Garagehouder",
      advisor: "Service Adviseur",
      mechanic: "Monteur",
      warehouse: "Magazijn Manager",
      financial: "Boekhouder",
    },
    dashboard: {
      welcome: "Welkom terug,",
      subsidy_title: "Subsidie Zoeker",
      subsidy_desc: "Check geschiktheid voor SEBA, MIA en Vamil.",
      vsme_title: "VSME Rapportage",
      vsme_desc: "Genereer bank-klare ESG rapporten (EFRAG Standaard).",
      btn_scan: "Start Scan",
      btn_create: "Maak Rapport"
    }
  }
};

export const INITIAL_VSME_DATA = {
  isListed: 'no' as const,
  reportPurpose: 'basic' as const,
  hasPolicies: 'no' as const,
  b1_name: 'AutoParts NL B.V.',
  b1_basis: 'Individual basis',
  b1_legal_form: 'B.V.',
  b1_nace: '45.31',
  b1_turnover: '12500000',
  b1_employees: '45',
  b2_practices: 'Installation of LED lighting and consolidation of shipments to reduce CO2 per delivery.',
  b3_energy_total: '480',
  b3_energy_ren: '480',
  b3_scope1: '48.5',
  b3_scope2: '0',
  b4_pollution: 'None (Minimal non-hazardous vehicle maintenance fluids)',
  b6_water: '450',
  b7_waste_haz: '0',
  b7_waste_recycled: '12',
  b8_perm: '35',
  b8_female: '16',
  b9_accidents: '1',
  b10_minwage: 'Yes',
  b11_convictions: '0',
  b11_fines: '0',
  bp_code: 'Yes (covers human rights/environment)',
  bp_grievance: 'Yes (accessible mechanism exists)',
  bp_payment: '30 days (average)',
  bp_excluded_rev: '0%',
  bp_scope3_status: 'Estimated',
  bp_climate_risks: 'Physical risk: Increased extreme heat affecting warehouse cooling (Low). Transition risk: None identified.',
  c1_strategy: 'Aim to reduce scope 1 emissions by 10% by 2027.',
  c3_targets: '100% renewable energy sourcing achieved.',
};