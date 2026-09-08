import fs from "fs";
import path from "path";
import { ALL_QUESTIONS } from "@/content/questions";
import type { DomainId } from "@/content/questions/types";
import { DOMAIN_LABELS } from "@/content/questions/types";

export type TutorChunk = {
  id: string;
  source: string;
  domain: DomainId | "general";
  title: string;
  text: string;
};

const NOTE_FILES: { file: string; domain: DomainId | "general"; title: string }[] = [
  { file: "medications.md", domain: "medications", title: "Medications study notes" },
  { file: "federal-requirements.md", domain: "federal_requirements", title: "Federal Requirements study notes" },
  { file: "patient-safety.md", domain: "patient_safety", title: "Patient Safety & QA study notes" },
  { file: "order-entry.md", domain: "order_entry", title: "Order Entry & Processing study notes" },
  { file: "formulas.md", domain: "order_entry", title: "Formula sheet" },
  { file: "schedules.md", domain: "federal_requirements", title: "Controlled substance schedules" },
  { file: "brand-generic.md", domain: "medications", title: "Brand/generic drill list" },
];

function tutorDir(): string {
  return path.join(process.cwd(), "content", "tutor");
}

/** Split markdown into ~400–900 char chunks on headings / blank lines. */
export function chunkMarkdown(md: string, source: string, domain: DomainId | "general"): TutorChunk[] {
  const parts = md.split(/\n(?=#{1,3}\s)/);
  const chunks: TutorChunk[] = [];
  let n = 0;
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.length < 40) continue;
    const titleMatch = trimmed.match(/^#{1,3}\s+(.+)/);
    const title = titleMatch ? titleMatch[1].trim() : source;
    // Further split long sections
    if (trimmed.length > 1200) {
      const paras = trimmed.split(/\n\n+/);
      let buf = "";
      for (const p of paras) {
        if ((buf + "\n\n" + p).length > 900 && buf.length > 200) {
          n += 1;
          chunks.push({ id: `${source}-${n}`, source, domain, title, text: buf.trim() });
          buf = p;
        } else {
          buf = buf ? `${buf}\n\n${p}` : p;
        }
      }
      if (buf.trim().length >= 40) {
        n += 1;
        chunks.push({ id: `${source}-${n}`, source, domain, title, text: buf.trim() });
      }
    } else {
      n += 1;
      chunks.push({ id: `${source}-${n}`, source, domain, title, text: trimmed });
    }
  }
  return chunks;
}

let cachedChunks: TutorChunk[] | null = null;

export function loadTutorChunks(): TutorChunk[] {
  if (cachedChunks) return cachedChunks;
  const chunks: TutorChunk[] = [];
  for (const note of NOTE_FILES) {
    const full = path.join(tutorDir(), note.file);
    try {
      const md = fs.readFileSync(full, "utf8");
      chunks.push(...chunkMarkdown(md, note.file, note.domain));
    } catch {
      // missing file — skip
    }
  }
  // Question rationales as retrieval sources
  for (const q of ALL_QUESTIONS) {
    const text = [
      `Practice item (${DOMAIN_LABELS[q.domain]})`,
      `Stem: ${q.stem}`,
      `Correct: ${q.choices[q.correctIndex]}`,
      `Rationale: ${q.rationale}`,
      `Tags: ${q.topicTags.join(", ")}`,
    ].join("\n");
    chunks.push({
      id: `q-${q.id}`,
      source: `question:${q.id}`,
      domain: q.domain,
      title: `Rationale ${q.id}`,
      text,
    });
  }
  cachedChunks = chunks;
  return chunks;
}

export { DOMAIN_LABELS };
