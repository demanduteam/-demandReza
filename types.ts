export type Language = 'en' | 'nl';

export interface Article {
  id?: string;
  category: string;
  status: 'Published' | 'Draft';
  created_at?: string;
  read_time: string;
  author?: string;
  source: string;
  title_en: string;
  title_nl: string;
  desc_en: string;
  desc_nl: string;
  content_en: string;
  content_nl: string;
}

export interface SubsidyData {
  hasEH3: boolean | null;
  recentPurchase: boolean | null;
  categories: string[];
  invoiceValue: boolean | null;
  isElectricVehicle: boolean | null;
  isHeavyVehicle: boolean | null;
  smallStaff: boolean | null;
}

export interface VsmeData {
  isListed: 'yes' | 'no';
  reportPurpose: 'basic' | 'partner';
  hasPolicies: 'yes' | 'no';
  
  // General (B1-B2)
  b1_name: string;
  b1_basis: string;
  b1_legal_form: string;
  b1_nace: string;
  b1_turnover: string;
  b1_employees: string;
  b2_practices: string;

  // Environment (B3-B7)
  b3_energy_total: string;
  b3_energy_ren: string;
  b3_scope1: string;
  b3_scope2: string;
  b4_pollution: string;
  b6_water: string;
  b7_waste_haz: string;
  b7_waste_recycled: string;

  // Social (B8-B11)
  b8_perm: string;
  b8_female: string;
  b9_accidents: string;
  b10_minwage: string;
  b11_convictions: string;
  b11_fines: string;

  // Business Partner (P1-P2)
  bp_code: string;
  bp_grievance: string;
  bp_payment: string;
  bp_excluded_rev: string;
  bp_scope3_status: string;
  bp_climate_risks: string;

  // Comprehensive (C1+)
  c1_strategy: string;
  c3_targets: string;
}

export type UserRole = 'garage_owner' | 'advisor' | 'mechanic' | 'warehouse' | 'financial' | null;

export interface ViewProps {
  lang: Language;
  setLang: (l: Language) => void;
  navigate: (view: string) => void;
}