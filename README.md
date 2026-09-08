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

## Local run

1. Install Node dependencies from package.json
2. Run script `test` (alias `lint:content`) for bank integrity
3. Run script `dev` and open http://localhost:3000
4. Production: scripts `build` then `start`

## Env

Copy `.env.example` to `.env.local`. Stripe is optional. Without keys, pricing shows Checkout coming soon; use Demo unlock or `/study?demo=1`.

## Stubbed

- Stripe Checkout/webhook when env present; else UI stub
- Unlock via localStorage `passptce_unlocked` or `?demo=1`
- Diagnostic progress in browser localStorage

## QC

High-priority clinical flags: `content/REVIEW.md`
