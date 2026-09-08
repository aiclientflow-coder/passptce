# PassPTCE

PTCE exam prep MVP. Not affiliated with PTCB.

See content/EXAM_BLUEPRINT.md and content/REVIEW.md.

Install deps from package.json, then run scripts: test, dev, build.

## Blueprint (diagnostic = 100)

| Domain | Questions |
|--------|----------:|
| Medications | 35 |
| Federal Requirements | 19 |
| Patient Safety and Quality Assurance | 24 |
| Order Entry and Processing | 22 |

## Study Tutor

- UI: `/tutor` page + floating chat on `/study`
- API: `POST /api/tutor` with `{ "message": "..." }`
- Scoped to PTCE pharmacy-technician topics only; refuses coding help, unrelated homework, and patient-specific medical advice
- RAG over original notes in `content/tutor/` plus question rationales (no copyrighted PTCB/vendor textbooks)
- Free users: 5 messages/day (`localStorage`); unlocked / `?demo=1`: unlimited
- If `OPENAI_API_KEY` or `ANTHROPIC_API_KEY` is set, answers use the model + retrieved context; otherwise a high-quality retrieval fallback

## Local run

1. Install Node dependencies from package.json
2. Run script `test` (alias `lint:content`) for bank integrity
3. Run script `dev` and open http://localhost:3000
4. Production: scripts `build` then `start`

## Env

Copy `.env.example` to `.env.local`. Stripe and LLM keys are optional.

## Stubbed

- Stripe Checkout/webhook when env present; else UI stub
- Unlock via localStorage `passptce_unlocked` or `?demo=1`
- Diagnostic progress in browser localStorage

## QC

High-priority clinical flags: `content/REVIEW.md`
