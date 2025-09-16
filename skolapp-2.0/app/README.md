# Skolapp Frontend (Lean Start)

Detta är en minimal start för Skolapp med React + Vite + TypeScript.

## Innehåll
- React-bas med rollväxling (Teacher/Student/Guest)
- PWA: manifest + enkel service worker (shell cache)
- Grundläggande tillgänglig fokus-stil
- ESLint + a11y-plugin
- Rollcontext och dashboardskelett

## Köra lokalt
Installera och starta:

```
npm install
npm run dev
```

Öppna sedan http://localhost:5173

## Lean Spec Workflow
För varje ny funktion skapa en sektion i `docs/lean-spec.md` (skapa fil om den saknas) med:
1. Mål
2. Roller involverade
3. 3–5 acceptansfall
4. Data (nya entiteter/attribut)
5. Risk / Öppet / Frågor

Därefter: implementera → skriv minst ett test → manuell a11y-kontroll (tangentbord) → commit.

## Nästa steg (förslag)
- Lägg till riktig routing (React Router)
- Mockad quizlista + offline caching
- Test setup (Vitest) + första testfil
- CI workflow (GitHub Actions)
- AI-suggestions modul (feature-flag först)

## Licens
Intern utvecklingsbasis.
