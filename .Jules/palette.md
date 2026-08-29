## 2024-11-20 - Adding Accessible Labels for Icon-only Buttons
**Learning:** Icon-only buttons often lack meaning for screen readers, and standard focus outlines might not fit custom styled buttons well. Applying aria-labels and custom `focus-visible` outlines improves both accessibility and visual consistency across modals and tools.
**Action:** Always verify if an icon-only button contains meaningful inner text; if not, apply an appropriate `aria-label` and consider custom `focus-visible` styles (`focus-visible:ring-2 focus-visible:ring-gold`) tailored to the apps design system.
