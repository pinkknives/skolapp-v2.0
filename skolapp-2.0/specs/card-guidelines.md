# Card Guidelines (Skolapp)
Status: draft
Datum: 2025-09-16

## Syfte
Standardisera "card"-mönster för att visa sammanhållen information (quiz, elevstatus, uppgifter) med konsekvent spacing, hierarki och interaktivitet utan att överbelasta UI:t.

## Principer
1. Lätta, låg krom – innehållet ska dominera.
2. Klickbar zon tydlig (hela card eller definierade action-ytor, inte mittemellan).
3. Anpassningsbar densitet (compact vs comfortable) med en token.
4. Skalbar till lista/grid utan ägarlogik i komponenten.
5. Fungerar i dark/light utan separata overrides (variabler används).

## Anatomielement
| Del | Beskrivning | Valfri |
|-----|-------------|--------|
| Container | Yttre wrapper med bakgrund & border/shadow | Nej |
| Header | Titel + sekundär metadata | Ja |
| Body | Primärt innehåll (text/children) | Nej |
| Footer | Actions (buttons, länkar) | Ja |
| Badge | Status / typ-indikator | Ja |

## Tokens / Variabler
```css
:root {
  --card-bg: #fff;
  --card-bg-hover: #f8fafc;
  --card-border: var(--border);
  --card-radius: 6px;
  --card-shadow: 0 1px 2px rgba(0,0,0,0.05);
  --card-padding: 1rem;
  --card-gap: .75rem;
  --card-density-multiplier: 1; /* 0.75 = compact, 1.25 = spacious */
}
html[data-theme='dark'] {
  --card-bg: #1e293b;
  --card-bg-hover: #243249;
  --card-border: #334155;
  --card-shadow: 0 1px 2px rgba(0,0,0,0.4);
}
```

## Bas CSS (skiss)
```css
.card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--card-radius);
  padding: calc(var(--card-padding) * var(--card-density-multiplier));
  display: flex;
  flex-direction: column;
  gap: var(--card-gap);
  box-shadow: var(--card-shadow);
  position: relative;
}
.card--interactive { cursor: pointer; transition: background .15s ease, box-shadow .15s ease; }
.card--interactive:hover { background: var(--card-bg-hover); }
.card--interactive:focus-visible { outline:2px solid var(--accent); outline-offset:2px; }
.card__header { display:flex; align-items: flex-start; gap:.5rem; justify-content: space-between; }
.card__title { font-size:1rem; font-weight:600; margin:0; }
.card__meta { font-size:.75rem; opacity:.75; }
.card__body { font-size:.875rem; line-height:1.4; }
.card__footer { margin-top:auto; display:flex; gap:.5rem; flex-wrap:wrap; }
.card__badge { font-size:.625rem; text-transform:uppercase; letter-spacing:.05em; background: var(--accent); color:#000; padding:.2rem .4rem; border-radius: 2px; }
.card--compact { --card-density-multiplier: 0.75; }
.card--spacious { --card-density-multiplier: 1.25; }
```

## Interaktionstyper
| Typ | Beskrivning | Exempel |
|-----|-------------|---------|
| Static | Informationsenhet utan klick | Statuspanel |
| Interactive (whole) | Hela kortet är klickbar (button/anchor semantics) | Navigera till quiz-detalj |
| Interactive (split) | Innehåll + separata actions i footer | Lista med primär + sekundära actions |

## A11y
- Om hela card är klickbart: använd `<button class="card card--interactive">` eller `<a role="button">` beroende på navigation vs action.
- Undvik nested interaktiva element (button i button) – vid behov: gör endast delar klickbara (split pattern).
- Rubrik i header bör vara ett korrekt heading-element (h3/h4) när det hjälper struktur.
- Focus-visible måste vara tydlig (outline), särskilt för keyboard navigation.

## API (planerad React-Card)
```ts
interface CardProps {
  interactive?: boolean;
  as?: 'div' | 'button' | 'a';
  href?: string; // när as='a'
  density?: 'default' | 'compact' | 'spacious';
  title?: string | React.ReactNode;
  meta?: React.ReactNode;
  badge?: React.ReactNode;
  footer?: React.ReactNode;
  onClick?: () => void;
  children?: React.ReactNode;
}
```

## Exempel HTML
```html
<div class="card">
  <div class="card__header">
    <h3 class="card__title">Geografi Quiz</h3>
    <span class="card__meta">3 frågor</span>
  </div>
  <div class="card__body">Snabb repetition av huvudstäder.</div>
  <div class="card__footer">
    <button class="btn btn--link">Öppna</button>
  </div>
</div>

<button class="card card--interactive">
  <div class="card__header">
    <h3 class="card__title">Engelska Glosor</h3>
    <span class="card__badge">Lokalt</span>
  </div>
  <div class="card__body">5 nya ord från denna vecka.</div>
</button>
```

## Testkriterier (kommande)
1. Interactive card får role=button och kan aktiveras via Enter/Space.
2. Density modifier ändrar padding (snapshot eller computed style).
3. Badge renderas endast när prop finns.
4. Focus-visible outline på tangentbordsfokus.
5. Ingen dubbel-klickbar area (inga nested interaktiva element) i interaktiv variant.

## Nästa steg
- Implementera `Card` komponent.
- Lägga in kort i quiz-lista i stället för `<li>`.
- Tester för interaktiva states.
