# Field Guidelines (Skolapp)
Status: draft
Datum: 2025-09-16

## Syfte
Definiera enhetliga formfält (input, textarea, select) som är robusta, tillgängliga och lätta att tematisera för både dark/light samt fungerar offline utan visuella regressions.

## Principer
1. Alltid explicit label (ingen placeholder som label-ersättning).
2. Felmeddelanden knyts med `aria-describedby` och blir först i läsordning visuellt under fältet.
3. Focus-ring konsekvent mellan komponenter (samma stil som buttons/cards).
4. Minimal krom: endast 1px border + tydlig focus, inte dubbla outlines.
5. Intolerant mot osäker state: visa fel direkt efter blur eller submit-touch.

## Anatomielement
| Del | Beskrivning | Valfri |
|-----|-------------|--------|
| Wrapper (.field) | Layoutcontainer | Nej |
| Label (.field__label) | Beskrivande text | Nej |
| Control (.field__control) | Själva `<input>`/`<textarea>`/`<select>` | Nej |
| Help (.field__help) | Hjälptext före fel | Ja |
| Error (.field__error) | Felmeddelande | Ja |
| Icon (.field__icon) | Dekorativ eller status-ikon | Ja |

## Tokens / Variabler
```css
:root {
  --field-border: var(--border);
  --field-border-focus: var(--primary);
  --field-border-error: #dc2626;
  --field-bg: #ffffff;
  --field-bg-disabled: #f1f5f9;
  --field-fg: var(--fg);
  --field-placeholder: #94a3b8;
  --field-radius: 4px;
  --field-padding-y: .55rem;
  --field-padding-x: .75rem;
  --field-font-size: .9rem;
  --field-help-fg: #64748b;
  --field-error-fg: #dc2626;
}
html[data-theme='dark'] {
  --field-bg: #1e293b;
  --field-bg-disabled: #243549;
  --field-placeholder: #64748b;
}
```

## Bas CSS (skiss)
```css
.field { display:flex; flex-direction:column; gap:.35rem; }
.field__label { font-size:.8rem; font-weight:600; }
.field__control { 
  font: inherit; font-size: var(--field-font-size); 
  padding: var(--field-padding-y) var(--field-padding-x);
  border:1px solid var(--field-border); border-radius: var(--field-radius);
  background: var(--field-bg); color: var(--field-fg);
  transition: border-color .15s ease, background .15s ease, box-shadow .15s ease;
}
.field__control::placeholder { color: var(--field-placeholder); }
.field__control:focus { outline:2px solid var(--accent); outline-offset:2px; }
.field__control[aria-invalid='true'] { border-color: var(--field-border-error); }
.field__help { font-size:.7rem; color: var(--field-help-fg); }
.field__error { font-size:.7rem; color: var(--field-error-fg); }
.field--error .field__label { color: var(--field-error-fg); }
.field--disabled .field__control { background: var(--field-bg-disabled); opacity:.7; cursor:not-allowed; }
.field--with-icon { position: relative; }
.field--with-icon .field__icon { position:absolute; left:8px; top:50%; transform:translateY(-50%); pointer-events:none; }
.field--with-icon .field__control { padding-left: 2rem; }
```

## Validator-feedback
- `aria-invalid="true"` endast när fältet är berört (blur eller submit) och har fel.
- Lista flera fel? Primärt regel: visa första; sekundära kan samlas i tooltip eller expand.

## A11y
- Label for/id koppling eller `<label><input/></label>` wrap.
- Felmeddelande id kopplas via `aria-describedby` när det finns.
- Hjälptext (help) ska komma före fel för rätt prioritet.
- Minimera användning av placeholder för annat än exempel.
- Sätt `required` på native kontroll + visuellt indikera med * om nödvändigt.

## API (planerad Field-komponent)
```ts
interface FieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  help?: string;
  error?: string; // första fel
  required?: boolean;
  disabled?: boolean;
  type?: string; // text, email etc
  icon?: React.ReactNode;
  autoComplete?: string;
  onBlur?: () => void;
}
```

## Exempel HTML
```html
<div class="field">
  <label class="field__label" for="quiz-title">Titel</label>
  <input id="quiz-title" class="field__control" required />
  <div class="field__error" id="quiz-title-error">Titel krävs</div>
</div>

<div class="field field--with-icon">
  <label class="field__label" for="search">Sök</label>
  <span class="field__icon" aria-hidden="true">🔍</span>
  <input id="search" class="field__control" placeholder="Sök quiz" />
</div>
```

## Testkriterier (kommande)
1. Error visas bara när prop error finns och aria-invalid sätts.
2. Ikon flyttar textens start (padding-left justeras).
3. Label koppling for/id fungerar (getByLabelText når kontrollen).
4. Disabled fält får rätt klass och attribut.
5. Help + error simultant: båda renderas i ordning (help först).

## Nästa steg
- Implementera `Field` komponent.
- Migrera formulär i TeacherDashboard.
- Lägga till tester för felhantering och ikon.
