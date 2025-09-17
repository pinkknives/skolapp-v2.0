---
name: Bug Report
about: Report a bug in Skolapp
title: "[BUG] "
labels: ["bug", "needs-triage"]
assignees: []
---

## Bug Description
**Brief description of the bug**

*What went wrong?*

## Steps to Reproduce
**How can we reproduce this issue?**

1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected Behavior
**What should have happened?**

*Describe the expected outcome*

## Actual Behavior
**What actually happened?**

*Describe what you observed instead*

## Design System Impact ⚠️
**Does this bug affect design system compliance?**

- [ ] **Visual inconsistency** - Components don't match design system
- [ ] **Accessibility issue** - WCAG compliance broken
- [ ] **Theme problem** - Light/dark theme not working correctly  
- [ ] **Responsive issue** - Layout broken on mobile/tablet
- [ ] **Design tokens** - Hardcoded values instead of tokens
- [ ] **Component behavior** - Design system component not working as expected

## Environment
**Where did this occur?**

- **Device**: [e.g. iPhone 12, Desktop]
- **OS**: [e.g. iOS 15, Windows 11, macOS 12]
- **Browser**: [e.g. Chrome 96, Safari 15, Firefox 94]
- **Screen size**: [e.g. 1920x1080, Mobile 375x812]
- **Theme**: [Light/Dark]

## Screenshots/Videos
**Visual evidence of the issue**

*Attach screenshots or screen recordings showing the problem*

## Additional Context
**Anything else about this bug?**

*Error messages, console logs, related issues, etc.*

## Severity
**How critical is this issue?**

- [ ] **Critical** - Breaks core functionality
- [ ] **High** - Significantly impacts user experience  
- [ ] **Medium** - Noticeable but not blocking
- [ ] **Low** - Minor cosmetic issue

---

### 🎨 Design System Notes
If this bug involves design system components or styling, please:

1. Check if the issue is resolved by using design system components
2. Verify that design tokens are being used correctly
3. Test in both light and dark themes
4. Confirm accessibility isn't compromised

### 📚 Resources
- [Design System Documentation](./DESIGN_SYSTEM.md)
- [Component Library](./skolapp-2.0/app/src/components/)
- [Design Tokens](./skolapp-2.0/app/src/design-tokens.ts)