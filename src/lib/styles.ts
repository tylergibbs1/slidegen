export interface Style {
  name: string;
  description: string;
  prefix: string;
}

export const STYLES: Record<string, Style> = {
  engineer: {
    name: "engineer",
    description: "Dark engineering notebook with orange accents",
    prefix: `Minimal, precision-crafted infographic on a pure black (#000) background, no exceptions. No white backgrounds, no gray backgrounds, no patterns, textures, grids, or motifs. The black is the canvas and it stays untouched.
Fine white and soft gray line work that feels deliberate and human, like an engineer's careful pen sketches on dark paper. Lines are clean but carry subtle imperfection, never sterile. No fills, no gradients, no dimensionality, no 3D effects. Confident strokes at a weight that stays visible even when scaled down.
A single accent color, orange (#F97316), used with extreme restraint:
- 1 to 2 key metrics or data points only
- A thin underline near the title
- Small highlight marks where the eye should land first
- Nothing more
Typography:
- Main text: Inter or SF Pro, clean, modern, white on black, sized large enough to read without effort
- Use a strict 2-level text hierarchy: one dominant headline and supporting data points, nothing else
- No small text, no fine print, no dense body copy, no captions that require squinting
- All text must be legible at a glance, even at reduced scale
- Labels kept to small uppercase monospace only where absolutely essential
Layout and structure:
- Pure black background is mandatory and non-negotiable
- Sharp corners everywhere, no rounded edges, no shadows, no ornamentation
- Clear visual hierarchy: the key data point is largest, everything else supports it
- Single focal point per infographic, one dominant takeaway the viewer locks onto immediately
- Generous negative space (black space) surrounding every element, nothing feels crowded
- Every element earns its place, if removing it changes nothing, it shouldn't be there
- Harmony between all elements, nothing feels disconnected or arbitrary
- The entire infographic should read as one unified composition, not separate pieces arranged on a page
- Main takeaway graspable in seconds, treat it like a billboard
- Aspect ratio: 16:9

`,
  },

  apple: {
    name: "apple",
    description: "Clean, minimal Apple keynote aesthetic",
    prefix: `A slide designed in Apple's signature keynote presentation style. Aspect ratio: 16:9.
Background: Pure white (#FFFFFF) or very soft warm gray (#F5F5F7), perfectly clean, no texture, no grain, no gradients.
Typography:
- Headline in SF Pro Display or a similar clean sans-serif, rendered in near-black (#1D1D1F), large and confident with generous letter spacing
- Supporting text in a lighter gray (#86868B), noticeably smaller than the headline, never competing for attention
- Maximum two levels of text hierarchy, nothing more
- All text must be crisp, perfectly anti-aliased, and legible at any scale
Color:
- Predominantly monochrome with vast white space
- A single accent in Apple blue (#0071E3) used sparingly: one key word, one small UI element, or one data highlight
- No other colors unless absolutely essential to the content
Visual style:
- If illustrations or icons are present, they should be thin-line, geometric, and perfectly balanced
- Product-style renders are welcome: soft shadows, subtle reflections, no harsh edges
- Photography (if any) should be high-contrast, editorial quality, with shallow depth of field
- No clip art, no stock illustration style, no busy graphics
Layout:
- Extreme negative space is mandatory. The slide should breathe
- Center-weighted or left-aligned composition, never cluttered
- One idea per slide, one focal point, instant comprehension
- No borders, no boxes, no dividers unless they serve a clear structural purpose
- The overall impression should be: calm, premium, effortless clarity

`,
  },

  vercel: {
    name: "vercel",
    description: "Dark, sharp Vercel/Next.js developer aesthetic",
    prefix: `A slide designed in Vercel's signature dark developer aesthetic. Aspect ratio: 16:9.
Background: Pure black (#000000), completely flat, no texture, no noise, no subtle gradients. Absolute black.
Typography:
- Headline in Geist Sans or Inter, pure white (#EDEDED), large, tight letter-spacing, bold weight
- Supporting text in muted gray (#888888), clean and understated
- Code snippets or technical labels in Geist Mono, slightly smaller, in a dimmer white (#A1A1A1)
- Strict two-level hierarchy: one dominant headline and supporting details, nothing else
- All text razor-sharp and perfectly legible
Color:
- Monochrome foundation: white text on black, with grays for secondary elements
- Accent: a single use of Vercel's gradient or a bright white glow effect on one key element
- Subtle colored accents are acceptable only for syntax highlighting in code: blue (#0070F3), cyan (#00DFD8), pink (#FF0080)
- No background colors, no colored sections, no fills
Visual style:
- If diagrams are present: thin white lines, sharp corners, no rounded edges, minimal nodes connected by clean straight or right-angle lines
- Terminal or code UI elements are welcome: monospace text in dark gray (#111111) cards with a thin 1px border (#333333)
- Subtle glow effects on key elements are acceptable but restrained
- No illustrations, no icons unless geometric and minimal, no imagery that feels soft or friendly
- Everything should feel engineered, precise, and slightly futuristic
Layout:
- Generous black space surrounding every element
- Grid-aligned, nothing feels arbitrarily placed
- One concept per slide, one immediate takeaway
- No decorative elements, no ornamental lines, no drop shadows
- The overall impression should be: fast, technical, developer-native, cutting-edge

`,
  },
};

export function getStyle(name: string): Style | undefined {
  return STYLES[name.toLowerCase()];
}

export function listStyles(): string[] {
  return Object.keys(STYLES);
}
