# Button Guidelines (Skolapp)
Status: draft
Datum: 2025-09-16

## Syfte
Skapa konsekvent, tillgänglig och lättanvänd knappstandard som täcker vanliga behov (primär action, sekundär, destruktiv, tysta/länkliknande samt ikonknappar) med fokus på enkelhet, offline-first och tydlig affordance i både ljus och mörk design.

## Designprinciper
1. Prioritet: En primär call-to-action per vy.
2. Kontrast: Minst WCAG AA (4.5:1 text mot bakgrund; 3:1 för grafiska element i large text). 
3. Tillstånd ska vara tydliga: default, hover, active, focus-visible, disabled, loading.
4. Hit-area: minst 40px höjd och 44px beröringsyta (touch-target).
5. Respons: Snabb visuell feedback <100ms.
6. Ikonknappar alltid med aria-label om ingen synlig text.
7. Följsamma: Bredd deterministisk (inline) men kan prop-styras till full width.

## Varianter
| Variant | Användning | Exempeltext |
|---------|------------|-------------|
| primary | Primär positiv handling | Spara, Skapa |
| secondary | Sekundära uppgifter / stöd | Avbryt, Tillbaka |
| danger | Destruktiva handlingar | Radera |
| ghost | Låg vikt, minimalistisk | Visa mer |
| link | Navigering utan `<a>` semantics där knapp behövs logiskt | Hantera |
| icon | Endast ikon (kvadratisk) | (t.ex. ✎) |

## States
| Tillstånd | Beskrivning | Visuell signal |
|-----------|-------------|----------------|
| default | Normal | Fylld (primary), kant (secondary), text (link) |
| hover | Pekare över | Ljusare eller mörkare beroende på variant |
| active | Nedtryckt | 2px inre skugga eller nedtonad färg |
| focus-visible | Tangentbordsfokus | 2px outline (accent) + offset 2px |
| disabled | Ej interaktiv | 50% opacitet, ingen hover/active |
| loading | Action pågår | Spinner + text halvtransparent + aria-busy |

## A11y
- Alla knappar är `button` element (inte div/span) för korrekt semantics.
- Icon-only: kräver `aria-label` eller `title`.
- Loading: `aria-disabled="true"` + `aria-busy="true"` och blockera ytterligare klick.
- Disabled: attribut `disabled` (för nativa semantics) och exkludera från tab-fokus.
- Fokus: använd CSS `:focus-visible` och tydlig kontrast mot bakgrund.

## Tokens & CSS-variabler (exempel)
```css
:root {
  --btn-radius: 4px;
  --btn-font-weight: 600;
  --btn-padding-y: 0.6rem;
  --btn-padding-x: 1rem;
  --btn-focus-outline: 2px solid var(--accent, #2563eb);
  --btn-focus-outline-offset: 2px;
  /* Primär */
  --btn-primary-bg: #2563eb;
  --btn-primary-bg-hover: #1d4ed8;
  --btn-primary-bg-active: #1e40af;
  --btn-primary-fg: #fff;
  /* Sekundär */
  --btn-secondary-border: #475569;
  --btn-secondary-border-hover: #334155;
  --btn-secondary-fg: #1e293b;
  /* Danger */
  --btn-danger-bg: #dc2626;
  --btn-danger-bg-hover: #b91c1c;
  --btn-danger-bg-active: #991b1b;
  --btn-danger-fg: #fff;
}

[data-theme="dark"] {
  --btn-primary-bg: #3b82f6;
  --btn-primary-bg-hover: #2563eb;
  --btn-primary-bg-active: #1d4ed8;
  --btn-secondary-border: #64748b;
  --btn-secondary-border-hover: #94a3b8;
  --btn-secondary-fg: #e2e8f0;
  --btn-danger-bg: #ef4444;
  --btn-danger-bg-hover: #dc2626;
  --btn-danger-bg-active: #b91c1c;
}
```

## Klassnamn / BEM (förslag)
`btn`, `btn--primary`, `btn--secondary`, `btn--danger`, `btn--ghost`, `btn--link`, `btn--icon`, `is-loading`.

## Interaktionslogik
- Klick ignoreras om `disabled || loading`.
- `onKeyDown` Space/Enter triggar klick (native button hanterar detta redan).
- Loading spinner inline före eller efter text enligt prop.

## API (planerad React-komponent)
```ts
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'link' | 'icon';
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode; // prefix-icon
  iconRight?: React.ReactNode; // suffix-icon
  srLabel?: string; // krävs om variant icon utan text
}
```

## Exempel HTML
```html
<button class="btn btn--primary">Spara</button>
<button class="btn btn--secondary">Avbryt</button>
<button class="btn btn--danger" disabled>Radera</button>
<button class="btn btn--ghost">Visa mer</button>
<button class="btn btn--link">Hantera</button>
<button class="btn btn--icon" aria-label="Redigera">✎</button>
<button class="btn btn--primary is-loading" aria-disabled="true" aria-busy="true">
  <span class="btn__spinner" aria-hidden="true"></span>
  <span class="btn__label">Sparar…</span>
</button>
```

## Testkriterier (kommande)
1. Variant rendering (snapshot eller klasskontroll).
2. Disabled hindrar onClick.
3. Loading sätter aria-attribut och hindrar onClick.
4. Icon-only utan srLabel → varna i dev (console.warn).
5. Focus-visible outline finns vid tangentbordsnavigering.

## Nästa steg
- Implementera komponent + basstil.
- Lägga till tester.
- Ersätta ad-hoc knappar i befintlig kod.
