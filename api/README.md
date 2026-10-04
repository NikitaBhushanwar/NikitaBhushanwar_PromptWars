# Backend API Specifications (Scheduled for Phase 2)

This directory is reserved for the Phase 2 Google Gemini backend service.

## Architectural Boundary

Per project principles:
1. **Phase 1** establishes the complete frontend user journey, design system, interactive state, and Zod data contracts.
2. **Phase 2** connects the live Gemini 1.5 Pro / 2.0 Flash reasoning engine via a secure serverless endpoint or Express/Cloud Functions microservice.

## Planned Endpoints

### `POST /api/analyze`
Receives:
```json
{
  "userProfile": { ... },
  "decisionData": { ... }
}
```

Returns:
Strict JSON matching `src/schemas/analysisSchema.js`:
- `decisionSummary`
- `facts`
- `priorities`
- `knownAssumedUnknown`
- `assumptions`
- `blindSpots`
- `overlookedFactors`
- `reasoningTensions`
- `informationGaps`
- `perspectives`
- `challenge`
- `whatWouldChangeMyMind`
- `preMortem`
- `reversibility`
- `timeline`
- `summary`
- `considerations`
- `reflection`

## Core Constraint
The Gemini system prompt must enforce:
- "The AI does not make the decision. It makes the thinking better."
- No ranking, no scoring, no choosing between options, no evaluation of decision "goodness".
