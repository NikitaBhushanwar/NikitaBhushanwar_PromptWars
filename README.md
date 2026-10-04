# THE BLIND SPOT

> **"The AI does not make the decision. It makes the thinking better."**  
> *"You decide. We help you see more clearly."*

**The Blind Spot** is an AI-powered critical-thinking and decision-reasoning application. Rather than telling users what to choose or assigning arbitrary decision-quality scores, the system examines the user's reasoning to illuminate hidden assumptions, potential blind spots, overlooked factors, reasoning tensions, and critical information gaps.

---

## Implementation Progress

- **Phase 1 (Completed)**: Clean production-quality React/Vite architecture, design system, full user journey UI shells, session state persistence, responsive layouts, accessibility foundations, and Zod data contracts.
- **Phase 2 (Completed)**: Secure server-side Vercel serverless integration (`POST /api/analyze`) calling the Google Gemini reasoning engine (`@google/genai`), strict Zod input/output validation, non-directive system prompt calibration, complete Results UI wiring, and robust error/retry handling.
- **Phase 3 (Scheduled)**: Multi-turn dialogue, counterfactual simulations, and interactive challenge synthesis.
- **Phase 4**: Exportable decision briefs, longitudinal reflection tracking, and collaborative audits.

---

## Product Principles

The application adheres strictly to non-directive reasoning assistance:
- **No Option Recommendations**: The AI will never recommend or choose Option A over Option B.
- **No Option Ranking**: Alternatives are examined for trade-offs, not ranked on a linear scale.
- **No Decision Scores**: There is no synthetic "decision quality score" or judgment of good vs. bad.
- **Epistemic Clarity**: Distinguishes between what is *Known* (empirical), *Assumed* (untested), and *Unknown* (active information gaps).
- **Human Sovereignty**: The user remains the sole decision authority.

---

## Tech Stack

- **Framework**: React 19 + Vite 8
- **Language**: JavaScript / JSX (Clean ES modules, no TypeScript)
- **Styling**: Tailwind CSS v4 + Vanilla CSS Design Tokens
- **Routing**: React Router DOM v7
- **Motion**: Framer Motion
- **Icons**: Lucide React
- **Data Validation & Contract Schemas**: Zod
- **Utilities**: `clsx`, `tailwind-merge`

---

## Design System

- **Background**: `#08090C`
- **Primary Surface**: `#101218`
- **Elevated Surface**: `#161922`
- **Border**: `#262A34`
- **Primary Text**: `#F4F5F7`
- **Secondary Text**: `#9A9EAA`
- **Primary Accent**: `#7C6CF5` (Reasoning clarity)
- **Secondary Accent**: `#63D5E8` (Empirical knowledge)
- **Blind-Spot Accent**: `#E8B86A` (Inquiry zones & overlooked factors)
- **Typography**: Manrope (Modern geometric sans-serif)

---

## Routes

| Route | View | Description |
|---|---|---|
| `/` | Landing Page | Hero visual metaphor, 4-step workflow, philosophy, trust tenets, and CTA |
| `/onboarding` | Personalization | Lightweight profile & context capture to calibrate future analysis |
| `/decision` | Decision Setup | Semantic 4-step form: Decision, Options, Context, and Reasoning |
| `/review` | Review | Alignment summary to verify inputs before audit |
| `/analyze` | Analysis Experience | High-level animated progress stages & Phase 2 transition hook |
| `/results` | Decision Audit | Complete 22-module decision audit shell ready for structured AI injection |
| `/challenge` | Challenge My Reasoning | Interactive stress-testing crucible to defend or revise premises |
| `/reflection` | Final Reflection | Shift capture, unconsidered insights, next steps, and "You Decide" climax |

---

## Project Structure

```
the-blind-spot/
├── api/                       # Phase 2 backend & Gemini integration specs
│   └── README.md
├── public/                    # Static assets
├── src/
│   ├── components/
│   │   ├── common/            # Container, PageHeader, SectionHeader
│   │   ├── layout/            # Navbar, Footer
│   │   ├── results/           # 15 modular result cards for the Decision Audit
│   │   ├── ui/                # Button, Card, Badge, Input, Textarea, Progress
│   │   └── visuals/           # ReasoningLayersVisual, BlindSpotMap
│   ├── context/
│   │   └── SessionContext.jsx # React context + sessionStorage persistence
│   ├── hooks/
│   │   └── useSession.js      # Session hook
│   ├── layouts/
│   │   └── RootLayout.jsx     # Root layout with top-scroll and sticky header
│   ├── lib/
│   │   └── utils.js           # Class name merging utility (cn)
│   ├── pages/                 # Full route pages
│   ├── schemas/
│   │   ├── analysisSchema.js  # Zod schema contract for future Gemini output
│   │   └── decisionSchema.js  # Zod schemas for user inputs and reflection
│   ├── services/
│   │   └── analysisService.js # Phase 1 structural shell & Phase 2 API hook
│   ├── App.jsx                # Router configuration
│   ├── index.css              # Tailwind theme definitions & global resets
│   └── main.jsx               # React DOM entrypoint
├── .env.example
├── .gitignore
├── package.json
└── vite.config.js
```

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```
