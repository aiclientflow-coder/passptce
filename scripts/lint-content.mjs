#!/usr/bin/env nodejs
/** PassPTCE content integrity checks. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const all = JSON.parse(
  fs.readFileSync(path.join(root, "content/questions/bank.json"), "utf8")
);

const DIAGNOSTIC_COUNTS = {
  medications: 35,
  federal_requirements: 19,
  patient_safety: 24,
  order_entry: 22,
};

const errors = [];
const ids = new Set();

for (const q of all) {
  if (!q.id || ids.has(q.id)) errors.push(`Duplicate or missing id: ${q.id}`);
  ids.add(q.id);
  if (!Array.isArray(q.choices) || q.choices.length !== 4) {
    errors.push(`${q.id}: expected 4 choices`);
  }
  if (![0, 1, 2, 3].includes(q.correctIndex)) {
    errors.push(`${q.id}: correctIndex out of range`);
  }
  if (!q.stem || !q.rationale) errors.push(`${q.id}: missing stem/rationale`);
  if (!Array.isArray(q.topicTags) || q.topicTags.length < 1) {
    errors.push(`${q.id}: need topicTags`);
  }
  if (!Object.keys(DIAGNOSTIC_COUNTS).includes(q.domain)) {
    errors.push(`${q.id}: unknown domain ${q.domain}`);
  }
}

const diag = all.filter((q) => !q.paidOnly);
const paid = all.filter((q) => q.paidOnly);

for (const [domain, count] of Object.entries(DIAGNOSTIC_COUNTS)) {
  const n = diag.filter((q) => q.domain === domain).length;
  if (n < count) errors.push(`Diagnostic ${domain}: have ${n}, need >= ${count}`);
}
if (diag.length < 100) errors.push(`Diagnostic total ${diag.length} < 100`);
if (paid.length < 100) errors.push(`Paid total ${paid.length} < 100`);

const calcChecks = [
  { id: "ord-002", expect: 15, fn: () => 30 / 2 },
  { id: "ord-005", expect: 150, fn: () => 5 * 3 * 10 },
  { id: "ord-007", expect: 120, fn: () => (24 / 6) * 30 },
  { id: "ord-012", expect: 2, fn: () => 500 / 250 },
  { id: "ord-013", expect: 250, fn: () => 100 * 2.5 },
  { id: "ord-015", expect: 30, fn: () => 90 / 3 },
  { id: "ord-020", expect: 200, fn: () => 10 * 20 },
  { id: "ord-022", expect: 56, fn: () => (20 / 5) * 14 },
  { id: "ord-p02", expect: 12, fn: () => 120 / 10 },
  { id: "ord-p05", expect: 2, fn: () => 40 / 20 },
  { id: "ord-p10", expect: 10, fn: () => (5 / 100) * 200 },
  { id: "ord-p12", expect: 0.1, fn: () => (1 / 1000) * 100 },
  { id: "ord-p15", expect: 125, fn: () => 1000 / 8 },
  { id: "ord-p17", expect: 50, fn: () => 200 / 4 },
  { id: "ord-p19", expect: 500, fn: () => 0.5 * 1000 },
  { id: "ord-p21", expect: 3, fn: () => 7.5 / 2.5 },
  { id: "ord-p23", expect: 10, fn: () => (250 / 125) * 5 },
];

for (const c of calcChecks) {
  const got = c.fn();
  if (Math.abs(got - c.expect) > 1e-9) {
    errors.push(`Calc check ${c.id}: got ${got}, expected ${c.expect}`);
  }
  if (!ids.has(c.id)) errors.push(`Calc check references missing question ${c.id}`);
}

if (errors.length) {
  console.error("CONTENT INTEGRITY FAILED:");
  for (const e of errors) console.error(" -", e);
  process.exit(1);
}

console.log("CONTENT INTEGRITY OK");
console.log(`Total questions: ${all.length}`);
console.log(
  `Diagnostic: ${diag.length} (med ${diag.filter((q) => q.domain === "medications").length}, fed ${diag.filter((q) => q.domain === "federal_requirements").length}, safety ${diag.filter((q) => q.domain === "patient_safety").length}, order ${diag.filter((q) => q.domain === "order_entry").length})`
);
console.log(`Paid-only: ${paid.length}`);
console.log(`needsReview flags: ${all.filter((q) => q.needsReview).length}`);
