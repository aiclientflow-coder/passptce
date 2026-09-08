import type { DomainId } from "@/content/questions/types";
import { loadTutorChunks, type TutorChunk } from "./content";

const STOP = new Set([
  "a","an","the","is","are","was","were","be","been","being","to","of","in","for","on","with","as","by","at","from","or","and","but","if","then","so","that","this","these","those","it","its","i","you","we","they","what","which","who","how","do","does","did","can","could","should","would","will","may","might","about","into","over","under","than","too","very","just","not","no","yes","please","tell","me","my","your","our","explain","help","study","ptce","exam",
]);

const DOMAIN_KEYWORDS: Record<DomainId, string[]> = {
  medications: [
    "brand","generic","drug","medication","statin","insulin","antibiotic","schedule","controlled","rems","dose form","counsel","side effect","class","therapeutic","high-alert","opioid","benzodiazepine","ssri","ppi","ace","arb",
  ],
  federal_requirements: [
    "dea","fda","hipaa","dscsa","recall","pseudoephedrine","pse","cmea","controlled substance","form 222","form 106","phi","suspect","illegitimate","combat meth",
  ],
  patient_safety: [
    "lasa","look-alike","sound-alike","tall man","error","near miss","high-alert","qa","quality","barcode","infection","sterile","usp","medwatch","double-check","abbreviation",
  ],
  order_entry: [
    "sig","days supply","day supply","ndc","refill","transfer","insurance","adjudication","reject","daw","calculate","calculation","mg/kg","dilution","aux","label","workflow",
  ],
};

function tokenize(q: string): string[] {
  return q
    .toLowerCase()
    .replace(/[^a-z0-9%./\-]+/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP.has(t));
}

function scoreChunk(tokens: string[], chunk: TutorChunk, domainBoost: DomainId | null): number {
  const hay = `${chunk.title}\n${chunk.text}`.toLowerCase();
  let score = 0;
  for (const t of tokens) {
    if (hay.includes(t)) score += t.length > 5 ? 2.5 : 1.5;
    // light stem: trailing s
    if (t.endsWith("s") && hay.includes(t.slice(0, -1))) score += 0.5;
  }
  if (domainBoost && chunk.domain === domainBoost) score += 3;
  if (chunk.source.endsWith(".md")) score += 0.4; // prefer notes slightly over single rationales
  return score;
}

export function inferDomain(query: string): DomainId | null {
  const q = query.toLowerCase();
  let best: DomainId | null = null;
  let bestScore = 0;
  for (const [domain, kws] of Object.entries(DOMAIN_KEYWORDS) as [DomainId, string[]][]) {
    let s = 0;
    for (const kw of kws) if (q.includes(kw)) s += 1;
    if (s > bestScore) {
      bestScore = s;
      best = domain;
    }
  }
  return bestScore > 0 ? best : null;
}

export type RetrievalResult = {
  chunks: TutorChunk[];
  domain: DomainId | null;
};

export function retrieve(query: string, topK = 5): RetrievalResult {
  const tokens = tokenize(query);
  const domain = inferDomain(query);
  const all = loadTutorChunks();
  const ranked = all
    .map((c) => ({ c, s: scoreChunk(tokens, c, domain) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, topK)
    .map((x) => x.c);
  // If nothing matched, return intro chunks from each domain note
  if (ranked.length === 0) {
    const fallback = all.filter((c) => c.source.endsWith(".md")).slice(0, topK);
    return { chunks: fallback, domain };
  }
  return { chunks: ranked, domain };
}

export function formatContext(chunks: TutorChunk[]): string {
  return chunks
    .map((c, i) => `[${i + 1}] (${c.domain}) ${c.title}\n${c.text}`)
    .join("\n\n---\n\n");
}
