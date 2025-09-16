# Skolapp v2.0 Development Instructions

**ALWAYS follow these instructions first and fallback to additional search and context gathering only if the information here is incomplete or found to be in error.**

## Project Overview
Skolapp is a Swedish school quiz application built as a React TypeScript PWA (Progressive Web App) with role-based access for Teachers and Students. The app features offline capability, dark/light themes, accessibility compliance, and local quiz management.

## Technology Stack
- **Frontend**: React 18.3.1 + TypeScript + Vite 5.4.20
- **Testing**: Vitest 1.5.0 + @testing-library/react + jsdom
- **Linting**: ESLint 8.57.0 + @typescript-eslint + jsx-a11y plugin
- **Routing**: React Router DOM 6.27.0
- **Styling**: CSS-in-JS with CSS variables for theming
- **PWA**: Service Worker + Web App Manifest
- **Node.js**: 18.x or 20.x (verified working with 20.19.5)

## Project Structure
```
skolapp-v2.0/
├── app/                           # Main React application
│   ├── src/
│   │   ├── components/           # Reusable UI components (Button, Card, Field)
│   │   ├── routes/              # Page components (Home, TeacherDashboard, StudentDashboard)
│   │   ├── auth/                # Role context and authentication logic
│   │   ├── theme/               # Theme context (light/dark mode)
│   │   ├── hooks/               # Custom React hooks (useQuizzes, useLocalQuizzes)
│   │   ├── styles.css           # Global styles and CSS variables
│   │   ├── App.tsx              # Main app component
│   │   └── main.tsx            # Application entry point
│   ├── public/                  # Static assets
│   │   ├── manifest.webmanifest # PWA manifest
│   │   ├── sw.js               # Service worker
│   │   └── quizzes.json        # Mock quiz data
│   ├── package.json            # Dependencies and scripts
│   ├── vite.config.ts          # Vite build configuration
│   ├── vitest.config.ts        # Test configuration
│   └── .eslintrc.cjs           # ESLint configuration
├── .github/
│   └── workflows/ci.yml        # GitHub Actions CI/CD
├── .specify/                   # Project management and templates
└── specs/                      # Feature specifications
```

## Bootstrap Commands (NEVER CANCEL - Wait for completion)

### 1. Install Dependencies
```bash
cd skolapp-2.0/app
npm install
```
**Time**: ~7 seconds. NEVER CANCEL. Set timeout to 60+ seconds.

### 2. Install Missing TypeScript ESLint Dependencies (if needed)
```bash
cd skolapp-2.0/app
npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin
```
**Time**: ~7 seconds. Only needed if linting fails with missing parser errors.

## Build and Development Commands

### Development Server
```bash
cd skolapp-2.0/app
npm run dev
```
**Time**: Starts in ~1 second. Runs on http://localhost:5173
**NEVER CANCEL**: This runs indefinitely. Use Ctrl+C to stop when done.

### Build Application
```bash
cd skolapp-2.0/app
npm run build
```
**Time**: ~3 seconds. NEVER CANCEL. Set timeout to 60+ seconds.
**Output**: Generates `dist/` directory with production assets.

### Preview Production Build
```bash
cd skolapp-2.0/app
npm run preview
```
**Time**: Starts in ~1 second. Runs on http://localhost:4173
**Usage**: Only after running `npm run build`.

## Testing Commands

### Run All Tests
```bash
cd skolapp-2.0/app
npm test
```
**Time**: ~4 seconds for 25 tests. NEVER CANCEL. Set timeout to 30+ seconds.
**Expected**: All 25 tests should pass. Some React warnings in stderr are normal.

### Run Tests in Watch Mode
```bash
cd skolapp-2.0/app
npm run test:watch
```
**Time**: Starts in ~2 seconds, then watches for changes.

## Linting and Code Quality

### Run Linting
```bash
cd skolapp-2.0/app
npm run lint
```
**Time**: ~5 seconds. NEVER CANCEL. Set timeout to 30+ seconds.
**Current Status**: Has 23 linting errors (unused vars, empty blocks, test globals). These are known issues - focus on not introducing NEW errors.

## Manual Validation Scenarios

ALWAYS test these complete user scenarios after making changes:

### 1. Role Switching Validation
1. Start dev server: `npm run dev`
2. Navigate to http://localhost:5173
3. Test role switching:
   - Click "Teacher" button → verify "Roll: teacher" displayed
   - Click "Student" button → verify "Roll: student" displayed
   - Click "Guest" button → verify "Roll: guest" displayed

### 2. Teacher Dashboard Workflow
1. Set role to Teacher
2. Navigate to /teacher
3. Fill in quiz creation form:
   - Enter title: "Test Quiz"
   - Enter question: "What is 2+2?"
   - Verify "Skapa" button becomes enabled
   - Click "Skapa" button
   - Verify quiz appears in "Quiz-lista" with "(lokal)" status
   - Verify form resets after submission

### 3. Student Dashboard Workflow
1. Set role to Student
2. Navigate to /student
3. Verify "Mina Quiz" list displays available quizzes
4. Verify "Senast synkad" timestamp is shown

### 4. Accessibility Testing
1. Use Tab key to navigate through interactive elements
2. Verify focus indicators are visible
3. Test with screen reader considerations (semantic HTML)
4. Verify skip link ("Hoppa till innehåll") works

### 5. Theme Toggle Testing
1. Click "Byt tema" button
2. Verify icon changes between 🌞 (light) and 🌙 (dark)
3. Verify visual theme change occurs

### 6. PWA Functionality
1. Check that manifest.webmanifest loads correctly
2. Verify service worker registration (check browser dev tools)
3. Test offline capability (network throttling in dev tools)

## Key Files and Their Purpose

### Core Application Files
- `src/App.tsx`: Main app component with routing setup
- `src/main.tsx`: Application entry point with React.StrictMode
- `src/auth/role-context.tsx`: Role management (Guest/Teacher/Student)
- `src/theme/theme-context.tsx`: Theme state management
- `src/routes/TeacherDashboard.tsx`: Quiz creation and management interface
- `src/routes/StudentDashboard.tsx`: Student quiz viewing interface

### Component Library
- `src/components/Button.tsx`: Reusable button component with variants
- `src/components/Card.tsx`: Container component for content sections
- `src/components/Field.tsx`: Form input component with labels

### Data Management
- `src/hooks/useQuizzes.ts`: Quiz data fetching and state management
- `src/hooks/useLocalQuizzes.ts`: Local storage for offline quiz creation
- `public/quizzes.json`: Mock quiz data for development

### PWA Assets
- `public/manifest.webmanifest`: PWA manifest with app metadata
- `public/sw.js`: Service worker for offline functionality
- `src/register-sw.ts`: Service worker registration logic

## Common Development Tasks

### Adding New Components
1. Create component in `src/components/` 
2. Follow existing patterns (TypeScript interfaces, CSS classes)
3. Add corresponding test file `.test.tsx`
4. Export from component for reuse

### Modifying Styles
- Global styles: Edit `src/styles.css`
- Component styles: Use CSS classes with the component
- Theme variables: Modify CSS custom properties in `:root`

### Adding New Routes
1. Create route component in `src/routes/`
2. Add route to `src/App.tsx` in the `<Routes>` section
3. Add navigation link if needed
4. Consider role-based access requirements

### Working with Tests
- Test files use `.test.tsx` or `.test.ts` extension
- Tests use Vitest + React Testing Library
- Run specific test: `npm test -- ComponentName.test.tsx`
- Test setup in `vitest.setup.ts`

## CI/CD Pipeline

The `.github/workflows/ci.yml` runs on every push and PR:
1. **Install**: `npm ci || npm install`
2. **Lint**: `npm run lint --if-present`
3. **Test**: `npm test -- --reporter=default`
4. **Build**: `npm run build`
5. **Artifact**: Uploads dist/ directory

**Matrix**: Tests on Node.js 18.x and 20.x
**Timeout**: 15 minutes total

## Troubleshooting

### ESLint Parser Errors
**Problem**: `Failed to load parser '@typescript-eslint/parser'`
**Solution**: Run `npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin`

### Build Failures
**Check**: Ensure TypeScript compilation passes: `npx tsc --noEmit`
**Check**: Verify no TypeScript errors in VSCode/editor

### Test Failures
**Common**: React warnings in stderr are normal and don't fail tests
**Debug**: Run single test file: `npm test -- ComponentName.test.tsx`

### Development Server Issues
**Port conflicts**: Vite uses port 5173 by default
**HMR issues**: Check browser console for hot reload errors

## Performance Expectations

- **Development server start**: ~1 second
- **Build time**: ~3 seconds  
- **Test suite**: ~4 seconds (25 tests)
- **Lint check**: ~5 seconds
- **Bundle size**: ~174KB JS + ~5KB CSS (gzipped: ~57KB total)

## NEVER CANCEL Operations

Set explicit timeouts for these commands:
- `npm install`: 60+ seconds timeout
- `npm run build`: 60+ seconds timeout  
- `npm test`: 30+ seconds timeout
- `npm run lint`: 30+ seconds timeout

Wait for ALL operations to complete. These timing expectations are normal for this project size.

## Validation Checklist for Changes

Before committing changes, ALWAYS:
- [ ] `npm run build` succeeds
- [ ] `npm test` passes (25/25 tests)
- [ ] Test manual user scenarios (role switching, quiz creation)
- [ ] Check for new linting errors: `npm run lint`
- [ ] Verify accessibility: Tab navigation works
- [ ] Test theme toggle functionality
- [ ] Check PWA features still work (offline mode)

Fixes #18.