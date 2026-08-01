---
name: Asy-Syifa Panua Design System
colors:
  surface: '#fbf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae8e7'
  surface-container-highest: '#e4e2e1'
  on-surface: '#1b1c1c'
  on-surface-variant: '#3d4a3d'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0f0'
  outline: '#6d7b6c'
  outline-variant: '#bccbb9'
  surface-tint: '#006e2f'
  primary: '#006e2f'
  on-primary: '#ffffff'
  primary-container: '#00b050'
  on-primary-container: '#003a15'
  inverse-primary: '#52e079'
  secondary: '#006d32'
  on-secondary: '#ffffff'
  secondary-container: '#92f9a7'
  on-secondary-container: '#007435'
  tertiary: '#006e25'
  on-tertiary: '#ffffff'
  tertiary-container: '#31ae4b'
  on-tertiary-container: '#00390f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#71fe93'
  primary-fixed-dim: '#52e079'
  on-primary-fixed: '#002109'
  on-primary-fixed-variant: '#005322'
  secondary-fixed: '#92f9a7'
  secondary-fixed-dim: '#76dc8d'
  on-secondary-fixed: '#00210a'
  on-secondary-fixed-variant: '#005224'
  tertiary-fixed: '#83fc8e'
  tertiary-fixed-dim: '#66df75'
  on-tertiary-fixed: '#002106'
  on-tertiary-fixed-variant: '#00531a'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e1'
typography:
  display-financial:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  financial-table:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 16px
  margin-mobile: 20px
---

## Brand & Style

The design system is engineered for **Asy-Syifa Panua**, a platform bridging the gap between industrial fishery supply chains and rigorous financial management. The brand personality is rooted in **Professionalism, Trust, and Vitality**. Given the dual nature of the app—handling physical commodities (fish) and digital assets (finance)—the UI must feel both grounded and precise.

The chosen style is **Corporate Modern with High-Contrast Utility**. It prioritizes clarity and efficiency, utilizing a white-label aesthetic that places financial data at the forefront. The visual language avoids unnecessary decoration, opting instead for a systematic approach to information density that ensures fishermen and financial administrators can navigate complex logistics with ease.

The emotional response should be one of **reliability and growth**. By using a "Vibrant Green" against a sterile white backdrop, the interface feels fresh and active, while the dark typography ensures an authoritative presence.

## Colors

The palette is dominated by a spectrum of greens to symbolize the "Syifa" (healing/well-being) and the natural abundance of the fishery industry.

- **Primary Green (#00B050):** Used for primary actions, branding, and active states. It represents growth and vitality.
- **Secondary Dark Green (#007D3A):** Reserved for headers, deep-navigation elements, and emphasized text to provide a grounded contrast to the vibrant primary green.
- **Neutral/Text (#333333):** A high-contrast charcoal for maximum legibility of financial figures and logistical data.
- **Background (#FFFFFF):** A pure white base to ensure the UI feels expansive and clean.
- **Status Colors:** These follow industry standards but are calibrated for high visibility. **Debt/Danger** uses a sharp Red to trigger immediate attention in financial ledgers.

## Typography

This design system utilizes **Hanken Grotesk** exclusively. Its contemporary grotesque construction offers exceptional legibility in tabular data and financial interfaces.

- **Financial Display:** For large balance amounts and total equity, use `display-financial` with tight letter spacing to create a high-impact, professional look.
- **Tabular Data:** Use `financial-table` which should be implemented with **tabular numerals (tnum)** to ensure columns of numbers align vertically for easier scanning of price lists and quantities.
- **Readability:** All body text maintains a minimum contrast ratio of 7:1 against the white background to support use in high-glare outdoor environments (e.g., at the docks).

## Layout & Spacing

The layout follows a **fluid grid system** tailored for mobile-first utility. 

- **Grid Model:** A 4-column grid for mobile with 16px gutters and 20px side margins.
- **Spacing Rhythm:** Based on a 4px baseline. Most components should utilize `16px (md)` padding for internal contents to ensure touch targets remain accessible.
- **Financial Groups:** Vertical spacing between distinct financial cards should be `24px (lg)` to provide a clear mental break between different data sets (e.g., separating "Accounts Receivable" from "Inventory Status").

## Elevation & Depth

To maintain a "Clean & Professional" look, the design system utilizes **Low-Contrast Outlines** and **Tonal Layers** rather than heavy shadows.

- **Level 0 (Base):** Pure white background (#FFFFFF).
- **Level 1 (Cards/Containers):** A thin 1px border using a very light gray (#E0E0E0) to define edges. No shadow is required.
- **Level 2 (Active Modals):** A soft, diffused ambient shadow (Color: #333333, Opacity: 8%, Blur: 12px) is used only when an element sits physically above the primary interface.
- **Zebra Striping:** For data-heavy tables, an alternating fill of #F9F9F9 is used to provide horizontal depth without adding visual noise.

## Shapes

The design system employs a **Rounded (0.5rem)** logic to soften the professional tone, making the app feel more approachable for daily use.

- **Standard Components:** Buttons, Input Fields, and Financial Cards use a 8px (0.5rem) corner radius.
- **Small Elements:** Chips and Status Tags use a 4px (0.25rem) radius for a tighter look.
- **Large Sections:** Bottom sheets and large dashboard containers use `rounded-xl` (1.5rem / 24px) on the top corners to create a distinct "layering" effect.

## Components

### Buttons
Primary buttons are **Vibrant Green (#00B050)** with **Bold White Text**. They use the `rounded` (8px) shape. Secondary buttons use a transparent background with a Primary Green border and text.

### Zebra-Striped Tables
Data rows for fishery logs or transactions must alternate background colors (#FFFFFF and #F9F9F9). Headers should be sticky, using **Darker Green (#007D3A)** text with a solid 2px bottom border in Primary Green.

### Financial Highlights
Key metrics (Total Revenue, Debt, etc.) must be housed in full-width cards. Use `display-financial` typography for the value. If the value is a "Debt/Danger" status, the text color switches to Red (#DC3545).

### Input Fields
Inputs use a white background, 1px light gray border, and a 16px internal padding. When focused, the border transitions to **Primary Green (#00B050)** with a 2px stroke.

### Status Chips
- **Paid/Success:** Light Green background (#E8F5E9) with Dark Green text (#28A745).
- **Pending:** Light Gray background (#F0F0F0) with Gray text (#6C757D).
- **Debt/Danger:** Light Red background (#FDEDEC) with Red text (#DC3545).

### Cards
Cards are the primary layout unit. They should have a 1px border (#E0E0E0), 16px padding, and no shadow. Use them to group related fishery batches or financial transaction groups.