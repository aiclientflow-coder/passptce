import { SYSTEM_PROMPT } from "./scope";

export type LlmResult = {
  answer: string;
  provider: "openai" | "anthropic" | "fallback";
};

export async function generateTutorAnswer(opts: {
  userMessage: string;
  context: string;
  domainLabel: string | null;
}): Promise<LlmResult> {
  const { userMessage, context, domainLabel } = opts;
  const openaiKey = process.env.OPENAI_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;

  const userBlock = [
    domainLabel ? `Likely domain: ${domainLabel}` : null,
    "Retrieved PassPTCE notes / rationales:",
    context || "(no chunks)",
    "",
    `Student question: ${userMessage}`,
  ]
    .filter(Boolean)
    .join("\n");

  if (openaiKey) {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openaiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: process.env.OPENAI_TUTOR_MODEL || "gpt-4o-mini",
          temperature: 0.2,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userBlock },
          ],
        }),
      });
      if (res.ok) {
        const data = (await res.json()) as {
          choices?: { message?: { content?: string } }[];
        };
        const answer = data.choices?.[0]?.message?.content?.trim();
        if (answer) return { answer, provider: "openai" };
      }
    } catch {
      // fall through
    }
  }

  if (anthropicKey) {
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": anthropicKey,
          "anthropic-version": "2023-06-01",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: process.env.ANTHROPIC_TUTOR_MODEL || "claude-3-5-haiku-latest",
          max_tokens: 1024,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: userBlock }],
        }),
      });
      if (res.ok) {
        const data = (await res.json()) as {
          content?: { type: string; text?: string }[];
        };
        const answer = data.content?.find((c) => c.type === "text")?.text?.trim();
        if (answer) return { answer, provider: "anthropic" };
      }
    } catch {
      // fall through
    }
  }

  return { answer: fallbackAnswer(userMessage, context, domainLabel), provider: "fallback" };
}

function fallbackAnswer(userMessage: string, context: string, domainLabel: string | null): string {
  const domainLine = domainLabel
    ? `**Domain focus:** ${domainLabel}`
    : "**Domain focus:** general PTCE study (inferred from notes)";

  const snippets = context
    .split(/\n---\n/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 3)
    .map((s) => {
      const body = s.replace(/^\[\d+\]\s*/, "").trim();
      // keep each snippet readable
      return body.length > 700 ? `${body.slice(0, 700)}…` : body;
    });

  if (snippets.length === 0) {
    return [
      "I'm PassPTCE Study Tutor (fallback mode — no LLM API key configured).",
      domainLine,
      "",
      "I couldn't find strong matches in the original notes for that wording. Try asking about a specific topic such as DSCSA suspect products, PSE limits, days supply, LASA pairs, or a brand/generic pair.",
      "If you're unsure where to start, take the free diagnostic and study your weak domain.",
      "",
      "_Scoped to PTCE study topics. Original PassPTCE notes, not official PTCB publications._",
    ].join("\n");
  }

  return [
    "I'm PassPTCE Study Tutor (retrieval fallback — answering from original PassPTCE notes/rationales only).",
    domainLine,
    "",
    `You asked: “${userMessage.trim()}”`,
    "",
    "Here is the most relevant study material I retrieved:",
    "",
    ...snippets.map((s, i) => `### Source ${i + 1}\n${s}`),
    "",
    "Use these notes for exam prep. If this doesn't fully answer you, rephrase with a drug name, sig code, law acronym (DEA/HIPAA/DSCSA), or calculation type. For gaps, run diagnostic practice.",
    "",
    "_Scoped to PTCE study topics. Original PassPTCE notes, not official PTCB publications. Never patient-specific medical advice._",
  ].join("\n");
}
