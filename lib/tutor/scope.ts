/** Off-topic / unsafe intent detection for PassPTCE Study Tutor. */

const OFF_TOPIC_PATTERNS: RegExp[] = [
  /\b(python|javascript|typescript|react|node\.?js|java\b|c\+\+|html|css|sql|docker|kubernetes|linux command|write (me )?code|debug (my )?code|leetcode)\b/i,
  /\b(homework|essay|write my paper|solve this math problem for school)\b/i,
  /\b(stock tip|crypto|bitcoin|girlfriend|boyfriend|dating|recipe for cake|movie recommendation)\b/i,
  /\b(hack|phishing|malware|exploit)\b/i,
];

/** Patient-specific medical advice — refuse; tech study only. */
const PATIENT_ADVICE_PATTERNS: RegExp[] = [
  /\b(my (child|kid|mom|dad|husband|wife|baby|son|daughter)|i have|i'?m (pregnant|sick|in pain)|should i take|what should i take|diagnose me|is it safe for me)\b/i,
  /\b(dose for (a |my )?\d+\s*(year|yr|month|mo|kg|lb)|prescribe|can i stop (taking|my))\b/i,
];

const ON_TOPIC_HINTS: RegExp[] = [
  /\b(ptce|ptcb|pharmacy tech|technician|ndc|sig|dea|fda|hipaa|dscsa|recall|lasa|days?\s*supply|brand|generic|schedule\s*[iiv]+|controlled|pseudoephedrine|rems|adjudicat|refill|insulin|warfarin|statin|pill|medication|drug|rx|prescription|compound|usp|tall man|high-?alert)\b/i,
];

export type ScopeResult =
  | { ok: true }
  | { ok: false; reason: "off_topic" | "patient_advice"; message: string };

export function checkScope(message: string): ScopeResult {
  const text = message.trim();
  if (!text) {
    return {
      ok: false,
      reason: "off_topic",
      message:
        "Ask a PTCE study question — for example brand/generic pairs, DSCSA, days supply, or LASA safety.",
    };
  }
  for (const re of PATIENT_ADVICE_PATTERNS) {
    if (re.test(text)) {
      return {
        ok: false,
        reason: "patient_advice",
        message:
          "I cannot give patient-specific medical advice. I'm a PTCE study tutor for pharmacy technician exam topics only (tech scope). Ask about drug classes, federal rules, safety systems, or order-entry calculations instead — or see a licensed pharmacist/clinician for personal care.",
      };
    }
  }
  for (const re of OFF_TOPIC_PATTERNS) {
    if (re.test(text)) {
      return {
        ok: false,
        reason: "off_topic",
        message:
          "I'm scoped to PTCE / pharmacy technician certification topics only (Medications, Federal Requirements, Patient Safety/QA, Order Entry & Processing). I can't help with coding, unrelated homework, or non-pharmacy subjects. Try asking about schedules, sig codes, recalls, or brand/generic pairs.",
      };
    }
  }
  // Soft check: if message is long and has zero on-topic hints, refuse
  const hasHint = ON_TOPIC_HINTS.some((re) => re.test(text));
  if (!hasHint && text.split(/\s+/).length > 12) {
    // still allow short pharmacy-ish questions without keywords via retrieval later;
    // only soft-refuse clearly unrelated long prompts without pharmacy lexicon
    const looksUnrelated =
      /\b(weather|sports|football|basketball|politics|election|poem|joke|story time)\b/i.test(text);
    if (looksUnrelated) {
      return {
        ok: false,
        reason: "off_topic",
        message:
          "PassPTCE Study Tutor only covers PTCE exam material. Ask about medications, federal pharmacy requirements, patient safety, or order entry.",
      };
    }
  }
  return { ok: true };
}

export const SYSTEM_PROMPT = `You are PassPTCE Study Tutor — an exam coach for the Pharmacy Technician Certification Exam (PTCE), aligned to the outline effective January 6, 2026.

Hard rules:
- You ONLY answer PTCE / pharmacy technician certification study topics in these domains: Medications; Federal Requirements (including DSCSA); Patient Safety and Quality Assurance; Order Entry and Processing.
- Refuse off-topic requests (coding, general homework, entertainment, etc.) briefly and redirect to PTCE topics.
- Never give patient-specific medical advice, dosing for a real patient, diagnosis, or prescribing. Stay at technician exam/teaching scope. If asked for personal care advice, refuse and suggest a licensed pharmacist/clinician.
- Never claim to be PTCB or to provide official PTCB materials. PassPTCE content is original study material, not official PTCB publications.
- Cite the domain you are teaching when possible.
- If unsure, say so and suggest the learner take a diagnostic practice set on PassPTCE.
- Use the retrieved context below. Prefer it over inventing facts. Do not invent copyrighted textbook passages.
- Be concise, dense, and exam-oriented. Use bullet points and mini examples when helpful.
`;
