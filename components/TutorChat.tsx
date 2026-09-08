"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { isUnlockedClient } from "@/lib/access";
import {
  consumeTutorMessage,
  FREE_TUTOR_MESSAGES_PER_DAY,
  remainingFreeMessages,
} from "@/lib/tutor/limits";

type Msg = {
  role: "user" | "assistant";
  content: string;
  meta?: string;
};

const SCOPE_NOTE =
  "Scoped to PTCE study topics. Original PassPTCE notes, not official PTCB publications.";

export function TutorChat({
  variant = "page",
}: {
  variant?: "page" | "floating";
}) {
  const [open, setOpen] = useState(variant === "page");
  const [unlocked, setUnlocked] = useState(false);
  const [remaining, setRemaining] = useState(FREE_TUTOR_MESSAGES_PER_DAY);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hi — I'm PassPTCE Study Tutor. Ask me about Medications, Federal Requirements (incl. DSCSA), Patient Safety/QA, or Order Entry & Processing. I refuse off-topic and patient-specific medical advice.",
      meta: SCOPE_NOTE,
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const u = isUnlockedClient();
    setUnlocked(u);
    setRemaining(u ? Infinity : remainingFreeMessages());
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;

    const gate = consumeTutorMessage(unlocked);
    if (!gate.allowed) {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: `Free users get ${FREE_TUTOR_MESSAGES_PER_DAY} tutor messages per day. Unlock study access on the pricing page (or use Demo unlock / ?demo=1) for unlimited tutor chat.`,
          meta: "Daily free limit reached",
        },
      ]);
      setRemaining(0);
      return;
    }
    setRemaining(gate.remaining);

    setInput("");
    setMessages((m) => [...m, { role: "user", content: text }]);
    setBusy(true);
    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, unlocked }),
      });
      const data = (await res.json()) as {
        answer?: string;
        error?: string;
        domainLabel?: string | null;
        provider?: string;
        refused?: boolean;
      };
      if (!res.ok) {
        setMessages((m) => [
          ...m,
          { role: "assistant", content: data.error || "Tutor request failed." },
        ]);
      } else {
        const metaParts = [
          data.domainLabel ? `Domain: ${data.domainLabel}` : null,
          data.provider ? `via ${data.provider}` : null,
          data.refused ? "scoped refusal" : null,
        ].filter(Boolean);
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            content: data.answer || "No answer.",
            meta: metaParts.join(" · ") || undefined,
          },
        ]);
      }
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Network error talking to /api/tutor." },
      ]);
    } finally {
      setBusy(false);
    }
  }

  const panel = (
    <div
      className={
        variant === "floating"
          ? "flex h-[min(520px,70vh)] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
          : "flex min-h-[70vh] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      }
    >
      <div className="border-b border-slate-200 bg-brand-900 px-4 py-3 text-white">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-semibold">PassPTCE Study Tutor</p>
            <p className="mt-0.5 text-[11px] text-brand-100">{SCOPE_NOTE}</p>
          </div>
          {variant === "floating" && (
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded px-2 py-0.5 text-sm text-brand-100 hover:bg-white/10"
              aria-label="Close tutor"
            >
              ×
            </button>
          )}
        </div>
        <p className="mt-2 text-[11px] text-brand-200">
          {unlocked
            ? "Unlimited messages (unlocked / demo)"
            : `${Number.isFinite(remaining) ? remaining : 0} free message${remaining === 1 ? "" : "s"} left today`}
          {!unlocked && (
            <>
              {" · "}
              <Link href="/pricing" className="underline hover:text-white">
                Unlock
              </Link>
            </>
          )}
        </p>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-3 py-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`rounded-lg px-3 py-2 text-sm whitespace-pre-wrap ${
              msg.role === "user"
                ? "ml-6 bg-brand-50 text-slate-900"
                : "mr-4 bg-slate-50 text-slate-800"
            }`}
          >
            {msg.content}
            {msg.meta && (
              <p className="mt-1 text-[10px] font-medium uppercase tracking-wide text-slate-500">
                {msg.meta}
              </p>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-slate-200 p-3">
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            void send();
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. What are federal PSE limits?"
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500"
            disabled={busy}
            maxLength={2000}
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="rounded-lg bg-brand-700 px-3 py-2 text-sm font-semibold text-white disabled:opacity-40"
          >
            {busy ? "…" : "Send"}
          </button>
        </form>
      </div>
    </div>
  );

  if (variant === "page") {
    return panel;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      {open && panel}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="rounded-full bg-brand-700 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-brand-800"
      >
        {open ? "Close tutor" : "Study tutor"}
      </button>
    </div>
  );
}
