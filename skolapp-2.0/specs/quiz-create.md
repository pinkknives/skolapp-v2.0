# Quiz Create
Status: implemented
Datum: 2025-09-16

## Motiv
Göra det möjligt för lärare att skapa nytt innehåll direkt i klienten utan backend för att påskynda iteration och test av pedagogiska idéer.

## Problem
Appen erbjuder endast konsumtion av statiska quiz. Ingen feedbackloop eller skapandefunktion – minskar engagemang och testbarhet av koncept.

## Mål
- Skapa nytt quiz lokalt (offline-stöd) med titel och minst en fråga.
- Direkt synlighet i lärarens lista utan reload.
- Persistens över reload via localStorage.

## Icke-mål
- Ingen server- eller multi-user synk.
- Ingen avancerad frågetyp (bara textfrågor i detta steg).
- Ingen redigering eller radering (kommer senare).

## Domän / Data
```
interface QuizLocal {
  id: string;        // uuid
  title: string;
  questions: { id: string; text: string; }[];
  createdAt: string; // ISO
  local: true;       // flagga för lokalt skapade
}
```
Sparas i localStorage under nyckeln `quizzes-local` (array).
Vid visning merges `quizzes-local` + remote/cache (`quizzes-cache`) sorterat nyast först (createdAt/updatedAt).

## User Stories
- Som Teacher vill jag skapa ett quiz så att elever kan se det direkt efter att vi synkat i framtiden.
- Som Teacher vill jag kunna arbeta offline och ändå skapa quiz, så att lektioner inte blockeras av nätproblem.

## Acceptance Criteria
- [AC1] Formulär med fält: Titel (obligatorisk), första fråga (obligatorisk). Submit disabled tills båda har värde.
- [AC2] Vid submit skapas ett QuizLocal med uuid och läggs till i UI-listan utan sidrefresh (optimistiskt).
- [AC3] Efter reload finns det skapade quizet kvar (persistens testas via localStorage mock).
- [AC4] Offline (navigator.onLine=false) hindrar inte skapande.
- [AC5] Tom titel eller fråga visar inline-felmeddelande och submit sker inte.

## Edge Cases
- Dubbel klick på submit: ska endast skapa ett quiz (disable under processing).
- Mycket lång titel (>200 tecken) trimmas eller avvisas (gräns: 120 tecken, hårt stopp med felmeddelande).
- localStorage full (quota error) → visar varning men behåller i minne för session (fallback ej persisterad).

## Risker & Antaganden
- Antagande: Låg volym quiz lokalt (<100) → enkel array OK.
- Risk: Inkonsekvent sortering om remote `updatedAt` blandas med lokala `createdAt` → lösning: normalisera till fält `sortKey` i renderfas.

## Telemetry / Mätning (framtida hook)
- Event: `quiz_created_local` med antal frågor och längd på titel.

## Teststrategi
Enhet: util för merge & validering.  
Integration: formulärflöde inkl. disable & fel.  
A11y: fält har label, felmeddelanden kopplas med aria-describedby.

## Success Metric
Minst 1 lokalt quiz skapat i 70% av lärarsessioner (när telemetry finns).

## Open Questions
- Behöver vi slug generering? (Nej, id räcker nu)
- Ska lokala quiz markeras i UI? (Ja, liten badge “(lokal)”).

## Beslutslogg / Deltan
2025-09-16: Initial draft.

## Traceability
Requirement | Källa (AC) | Test (describe/it) | Status | Kommentar
----------- | ----------- | ------------------ | ------ | ---------
R1: Form disable tills valid | AC1 | Quiz Create / "R1: submit disabled innan titel & fråga" | PASS | Disable logic + progressive enable verified
R2: Optimistisk render | AC2 | Quiz Create / "R2: optimistisk render efter submit" | PASS | Direkt listinjektion utan reload
R3: Persistens reload | AC3 | Quiz Create / "R3: quiz kvar efter reload" | PASS | Unmount/remount visar kvarstående quiz via localStorage
R4: Offline skapande | AC4 | Quiz Create / "R4: offline skapande fungerar" | PASS | navigator.onLine=false mockad; skapande fungerar
R5: Valideringsfel | AC5 | Quiz Create / "R5: valideringsfel vid tom titel" | PASS | Felmeddelande + ingen submit
R6: Dubbel submit guard | Edge | Quiz Create / "R6: dubbel submit skapar bara ett quiz" | PASS | Andra klick ignoreras (disable)
R7: Lång titel stopp | Edge | Quiz Create / "R7: lång titel stoppas" | PASS | 130 tecken -> felmeddelande (max 120)
R8: localStorage quota hantering | Edge | Quiz Create / "R8: quota-fel i localStorage hanteras med felmeddelande" | PASS | Simulerat quota-fel flagg, UI varnar

Sammanfattning: samtliga definierade krav (R1–R8) har täckande automatiserade tester i `src/routes/quiz-create.test.tsx` och passerar nuvarande testsvit.
