## Packages
framer-motion | Complex animations for quiz transitions and results
recharts | Visualization of the result breakdown
canvas-confetti | Celebration effect on results page
@types/canvas-confetti | Types for confetti
clsx | Class name utility (already installed but good to note)
tailwind-merge | Class merging (already installed but good to note)

## Notes
Tailwind Config - extend fontFamily:
fontFamily: {
  display: ["var(--font-display)"],
  body: ["var(--font-body)"],
}
- Quiz questions are hardcoded in client/src/lib/questions.ts for this implementation.
- API endpoints used: POST /api/quiz/submit, GET /api/quiz/stats
