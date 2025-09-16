# AI Quiz Drafts
Status: implemented
Datum: 2025-01-16

## Motiv
Hjälpa lärare att snabbt generera quizförslag baserat på ämne/tema med AI-stöd från säkra kunskapsbaser, vilket påskyndar skapandet av undervisningsmaterial.

## Problem
Lärare behöver tid och inspiration för att skapa quizfrågor. Manuell process för att komma på relevanta frågor inom ett ämne kan vara tidskrävande.

## Mål
- Lärare kan mata in ett ämne/tema och få AI-genererade quizförslag
- Minst 5 frågor genereras per tema
- Allt AI-innehåll markeras tydligt som utkast
- GDPR-säker - ingen elevdata skickas till AI
- Dokumentation av kunskapskällor som använts

## Icke-mål
- Ingen direkt integration med externa AI-tjänster i första versionen (använder mock)
- Ingen automatisk publicering - allt kräver lärargranskning
- Ingen avancerad AI-konfiguration eller träning

## Domän / Data

### AIQuizDraft
- `id: string` - Unik identifierare för utkastet
- `title: string` - Titel med "AI-utkast:" prefix
- `topic: string` - Ämne/tema som angavs
- `questions: AIGeneratedQuestion[]` - Array av genererade frågor
- `isAIDraft: true` - Flagga som markerar AI-innehåll
- `generatedAt: string` - ISO tidsstämpel för generering
- `sources: string[]` - Lista över kunskapskällor som använts

### AIGeneratedQuestion
- `id: string` - Unik fråge-ID
- `text: string` - Frågetexten
- `correctAnswer: string` - Korrekt svar
- `options: string[]` - Svarsalternativ (4 st)
- `source?: string` - Källa för frågan

## User Stories

**Som lärare** vill jag kunna mata in ett ämne och få AI-genererade quizförslag så att jag snabbare kan skapa relevant undervisningsmaterial.

**Som lärare** vill jag kunna granska och redigera AI-förslag innan jag godkänner dem så att jag behåller kontroll över innehållets kvalitet.

**Som lärare** vill jag se tydligt vilka quiz som är AI-genererade så att jag vet vilka som behöver extra granskning.

## Acceptance Criteria

**AC1: AI Quiz Generator UI**
- GIVEN en lärare på Teacher Dashboard
- WHEN de ser AI Quiz Generator-sektionen
- THEN ska de kunna mata in ämne/tema och välja antal frågor (5, 8, 10)

**AC2: Quiz Generation**
- GIVEN ett giltigt ämne (minst 3 tecken)
- WHEN läraren klickar "Generera utkast"
- THEN ska minst 5 relevanta frågor genereras inom 5 sekunder

**AC3: AI Content Labeling**
- GIVEN ett genererat AI-utkast
- WHEN det visas för läraren
- THEN ska det tydligt markeras som "AI-UTKAST" med varningstext

**AC4: Review and Edit**
- GIVEN ett AI-utkast
- WHEN läraren visar frågorna
- THEN ska de kunna redigera varje fråga innan godkännande

**AC5: Acceptance Flow**
- GIVEN ett AI-utkast
- WHEN läraren klickar "Godkänn och spara"
- THEN ska det bli ett vanligt quiz utan AI-märkning

**AC6: GDPR Compliance**
- GIVEN AI-genereringen
- WHEN data skickas till AI-tjänsten
- THEN ska endast ämne/tema skickas, ingen elevdata

## Edge Cases

**E1: Invalid Input**
- Tomt ämne → Felmeddelande "Ämne/tema krävs"
- För kort ämne (< 3 tecken) → Felmeddelande "Minst 3 tecken"

**E2: Generation Failure**
- API fel → Felmeddelande "Kunde inte generera quiz. Försök igen."
- Network error → Fallback till offline-meddelande

**E3: Multiple Drafts**
- Lärare kan ha flera AI-utkast samtidigt
- Varje utkast hanteras separat

## Risker & Antaganden

**Risker:**
- AI kan generera felaktigt innehåll → Lösning: Obligatorisk lärargranskning
- Mock-data kanske inte representerar verklig AI → Lösning: Realistiska exempel

**Antaganden:**
- Lärare vill granska AI-innehåll innan användning
- 5 frågor är tillräckligt för initial version
- Svenska språket räcker för första versionen

## Implementation Notes

**Frontend:**
- `AIQuizGenerator` komponent för input
- `AIQuizDraftViewer` för granskning och redigering
- Integration i `TeacherDashboard`

**Backend:**
- Mock AI-service som simulerar OpenAI-stil API
- GDPR-säker - endast topic skickas till AI
- Strukturerad response med questions och sources

**State Management:**
- AI-utkast hanteras lokalt i TeacherDashboard state
- Integration med `useLocalQuizzes` för persistens
- Separate handling av drafts vs accepted quizzes

## Telemetry / Mätning

*Framtida implementering:*
- Antal AI-utkast genererade per lärare
- Acceptansgrad för AI-förslag
- Vanligaste ämnen för AI-generering
- Tid från generering till godkännande

## Teststrategi

**Enhet:**
- `useAIQuizGeneration` hook
- `AIQuizGenerator` och `AIQuizDraftViewer` komponenter
- Validation och error handling

**Integration:**
- Fullständigt flöde från input till accepted quiz
- LocalStorage persistering av AI-utkast
- Error scenarios och edge cases

**A11y:**
- Form labels och ARIA attributes
- Keyboard navigation genom AI-utkast
- Screen reader support för AI-varningar

## Success Metric

Minst 50% av lärare som använder systemet testar AI-genereringen inom första månaden.

## Open Questions

- Vilka verkliga AI-tjänster ska integreras? (OpenAI, Azure AI, etc.)
- Ska vi stödja andra språk än svenska?
- Behövs mer avancerade AI-inställningar (temperatur, model, etc.)?

## Beslutslogg / Deltan

2025-01-16: Initial implementation med mock AI-service
- Valde att börja med mock för att testa UX först
- Implementerade full review-workflow
- Lagt till tydlig AI-märkning enligt GDPR-krav

## Traceability

Requirement | Källa (AC) | Test (describe/it) | Status | Kommentar
----------- | ----------- | ------------------ | ------ | ---------
AI Generator UI | AC1 | AIQuizGenerator / "renders AI quiz generator form" | PASS | Form med topic input och question count
Quiz Generation | AC2 | useAIQuizGeneration / "should generate AI quiz with valid topic" | PASS | Genererar 5+ frågor inom timeout
AI Content Labeling | AC3 | AIQuizDraftViewer / "shows AI warning and badges" | PASS | Tydlig "AI-UTKAST" märkning
Review and Edit | AC4 | AIQuizDraftViewer / "allows editing questions" | PASS | Textarea för varje fråga
Acceptance Flow | AC5 | TeacherDashboard / "AI draft acceptance removes from drafts" | PASS | Blir vanligt quiz efter godkännande
GDPR Compliance | AC6 | useAIQuizGeneration / "should respect GDPR" | PASS | Endast topic skickas till AI
Invalid Input | E1 | AIQuizGenerator / "disables submit button when topic is too short" | PASS | Validation och felmeddelanden
Multiple Drafts | E3 | TeacherDashboard / "handles multiple AI drafts" | PASS | Array av utkast i state