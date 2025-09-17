---
name: Feature Request
about: Suggest a new feature for Skolapp
title: "[FEATURE] "
labels: ["feature", "needs-review"]
assignees: []
---

## Feature Description
**Brief description of the feature**

*Clearly describe what you want to implement*

## Design System Compliance ✅
**This feature will follow Skolapp design system requirements:**

- [ ] **Uses Skolapp design system tokens & components** (colors, spacing, typography from `design-tokens.ts`)
- [ ] **No inline styles** - All styling through CSS classes or design tokens  
- [ ] **No direct hex values** - Uses color tokens instead of hardcoded colors
- [ ] **No ad-hoc fonts** - Uses typography tokens from the design system
- [ ] **WCAG AA compliant** - Meets accessibility standards (4.5:1 text contrast, 3:1 for large text)
- [ ] **Responsive design** - Works on desktop, tablet, and mobile
- [ ] **Theme support** - Works in both light and dark themes

## Requirements
**What should this feature accomplish?**

*List the functional requirements*

## Acceptance Criteria
**How will we know this feature is complete?**

- [ ] Feature works as described
- [ ] Follows design system guidelines
- [ ] Passes accessibility tests
- [ ] Works across all supported devices
- [ ] Has appropriate tests
- [ ] Documentation is updated

## Design Considerations
**How should this feature look and behave?**

*Include mockups, wireframes, or references to existing components*

## Technical Notes
**Implementation details or constraints**

*Any technical considerations, API changes, or dependencies*

## Additional Context
**Anything else relevant to this feature**

*Screenshots, links, or other context*

---

### ⚠️ Design System Requirements
All features **must** use the Skolapp design system. Features that bypass the design system will be rejected. See `DESIGN_SYSTEM.md` for full guidelines.

### 📚 Resources
- [Design System Documentation](./DESIGN_SYSTEM.md)
- [Design Tokens](./skolapp-2.0/app/src/design-tokens.ts) 
- [Component Examples](./skolapp-2.0/app/src/components/)