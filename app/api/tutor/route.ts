import { NextRequest, NextResponse } from "next/server";
import { checkScope } from "@/lib/tutor/scope";
import { retrieve, formatContext } from "@/lib/tutor/retrieve";
import { generateTutorAnswer } from "@/lib/tutor/llm";
import { DOMAIN_LABELS } from "@/content/questions/types";

export const runtime = "nodejs";

type Body = {
  message?: string;
  unlocked?: boolean;
};

export async function POST(req: NextRequest) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const message = (body.message || "").trim();
  if (!message || message.length > 2000) {
    return NextResponse.json({ error: "Message required (max 2000 chars)." }, { status: 400 });
  }

  const scope = checkScope(message);
  if (!scope.ok) {
    return NextResponse.json({
      answer: scope.message,
      refused: true,
      reason: scope.reason,
      domain: null,
      citations: [],
      provider: "scope",
    });
  }

  const { chunks, domain } = retrieve(message, 5);
  const context = formatContext(chunks);
  const domainLabel = domain ? DOMAIN_LABELS[domain] : null;

  const { answer, provider } = await generateTutorAnswer({
    userMessage: message,
    context,
    domainLabel,
  });

  return NextResponse.json({
    answer,
    refused: false,
    domain,
    domainLabel,
    citations: chunks.map((c) => ({
      id: c.id,
      source: c.source,
      title: c.title,
      domain: c.domain,
    })),
    provider,
  });
}
