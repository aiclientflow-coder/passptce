export type DomainId =
  | "medications"
  | "federal_requirements"
  | "patient_safety"
  | "order_entry";

export interface Question {
  id: string;
  domain: DomainId;
  stem: string;
  choices: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  rationale: string;
  topicTags: string[];
  /** If true, excluded from free diagnostic pool */
  paidOnly?: boolean;
  /** Flag for pharmacist QC when clinical nuance is uncertain */
  needsReview?: boolean;
}

export const DOMAIN_LABELS: Record<DomainId, string> = {
  medications: "Medications",
  federal_requirements: "Federal Requirements",
  patient_safety: "Patient Safety and Quality Assurance",
  order_entry: "Order Entry and Processing",
};

/** PTCE v1.4 diagnostic distribution (effective Jan 6, 2026) */
export const DIAGNOSTIC_COUNTS: Record<DomainId, number> = {
  medications: 35,
  federal_requirements: 19,
  patient_safety: 24,
  order_entry: 22,
};

export const DIAGNOSTIC_TOTAL = 100;
export const DIAGNOSTIC_TIME_MINUTES = 105;
