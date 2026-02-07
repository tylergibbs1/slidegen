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
    prefix: `A slide designed in Apple's signature keynote presentation style, guided by the Human Interface Guidelines' three pillars: Clarity (every element legible at a glance), Deference (the interface gets out of the way — content is the star, not the chrome), and Depth (visual layers and subtle motion convey hierarchy). Aspect ratio: 16:9.
Background: Pure white (#FFFFFF) or very soft warm gray (#F5F5F7), perfectly clean, no texture, no grain, no gradients. The background defers completely to the content.
Typography:
- Headline in SF Pro Display (used at 20pt and above), rendered in near-black (#1D1D1F), large and confident with generous letter spacing. Weights range from Ultralight to Black — use Semibold or Bold for headlines
- Supporting text in SF Pro Text (optimized for smaller sizes below 20pt) in lighter gray (#86868B), noticeably smaller than the headline, never competing for attention
- Numbers use proportional widths by default for natural, harmonious spacing within data
- Maximum two levels of text hierarchy, nothing more
- All text must be crisp, perfectly anti-aliased, and legible at any scale — the system automatically optimizes letter spacing, apertures, and details per size
Color:
- Predominantly monochrome with vast white space
- Color is functional first, decorative second: a single accent in Apple blue (#0071E3) used sparingly for primary actions or one key data highlight
- Red (#FF3B30) reserved only for destructive or warning signals
- System colors that feel native: they adapt, they belong, they never fight the content
- No other colors unless absolutely essential — every color must earn its place
Visual style:
- If illustrations or icons are present, they should be thin-line, geometric, and perfectly balanced
- Product-style renders are welcome: layered soft shadows and subtle reflections create depth without heaviness, no harsh edges
- Photography (if any) should be high-contrast, editorial quality, with shallow depth of field
- Subtle translucency or frosted-glass effects on UI elements are acceptable — inspired by Liquid Glass, where controls sit as a distinct layer above content and give way to what's underneath
- No clip art, no stock illustration style, no busy graphics
- Every detail is considered: optical alignment, concentric rounded corners (child radius smaller than parent so curves nest), smooth transitions that feel natural and physical
Layout:
- Extreme negative space is mandatory. The slide should breathe
- Center-weighted or left-aligned composition, never cluttered
- One idea per slide, one focal point, instant comprehension
- No borders, no boxes, no dividers unless they serve a clear structural purpose
- Controls and elements fit concentric with rounded corners of the frame — hardware and software in harmony
- The overall impression should be: calm, premium, effortless clarity. The interface disappears and the idea shines through

`,
  },

  vercel: {
    name: "vercel",
    description: "Dark, sharp Vercel/Next.js developer aesthetic",
    prefix: `A slide designed in Vercel's Geist design system aesthetic, rooted in Swiss design principles: simplicity, minimalism, precision, clarity, and functionality. Aspect ratio: 16:9.
Background: Pure black (#000000), completely flat, no texture, no noise, no subtle gradients. Absolute black. Terminal-inspired precision — the void is the canvas, and the content floats on it with authority.
Typography:
- Headline in Geist Sans, pure white (#EDEDED), large, tight letter-spacing, bold weight (700–900), Title Case
- Supporting text in muted gray (#888888), clean and understated, lighter weight
- Code snippets or technical labels in Geist Mono, slightly smaller, in a dimmer white (#A1A1A1)
- Strict two-level hierarchy: one dominant headline and supporting details, nothing else
- All text razor-sharp and perfectly legible at any scale
- Use tabular/monospace figures (font-variant-numeric: tabular-nums) for any numbers or data so columns align perfectly
- Separate numbers from units with a visible space (10 MB, not 10MB)
- Use real typographic characters: curly quotes ("\u201C" "\u201D"), proper ellipsis (\u2026), em dashes (\u2014)
Color (exact Geist dark-mode tokens):
- Background: #000000. Card surfaces: #090909. Popover/elevated surfaces: #121212
- Secondary fills: #222222. Muted backgrounds: #1D1D1D. Accent/input: #333333
- Borders: #242424. Stronger borders where needed: #333333
- Primary text: #FFFFFF. Muted/secondary text: #A4A4A4. Ring/focus: #A4A4A4
- Destructive: #FF5B5B
- Chart palette when data visualization is needed: amber #FFAE04, blue #2671F4, gray #747474, dim #525252, light #E4E4E4
- No gradients. No glow effects. No colored fills beyond the token system. Purely flat, solid colors
- The accent color for emphasis is pure white (#FFFFFF) — never orange, never warm colors. When the prompt says "accent," use white or bright white against the black/dark gray background
- Horizontal rules or dividers should be white or light gray (#A4A4A4), never orange or colored
- Monochrome foundation: white text on black, with the gray token scale for layering. The entire slide should feel cold, precise, monochrome — no warm tones anywhere
Visual style:
- Swiss grid underpins everything: structured columns and rows bring order and rhythm, the grid is itself part of the aesthetic
- If diagrams are present: thin white lines, sharp corners, no rounded edges, minimal nodes connected by clean straight or right-angle lines
- Terminal or code UI elements are welcome: monospace text in #090909 cards with a thin 1px border in #242424. Crisp borders: combine borders and subtle layered shadows for edge clarity
- Layered shadows when depth is needed: small offsets with low opacity black (e.g., 0px 1px 2px hsl(0 0% 0% / 0.18)), never a single harsh drop shadow
- No glow effects, no gradients, no neon — the aesthetic is flat, precise, and monochrome
- No illustrations, no icons unless geometric and minimal, no imagery that feels soft or friendly
- Everything should feel engineered, precise, and slightly futuristic
- Optical alignment: adjust \u00B11px when perception beats geometry. Every element aligns deliberately to a grid, baseline, or edge
- Nested radii: if a rounded element sits inside another, the child radius is smaller so curves stay concentric
Layout:
- Generous black space surrounding every element — the slide should breathe
- Grid-aligned with visible rhythm, nothing feels arbitrarily placed
- One concept per slide, one immediate takeaway
- No decorative elements, no ornamental lines
- Deliberate alignment: every element aligns with something intentionally, no accidental positioning
- Balance contrast in lockups: when text and icons sit side by side, adjust weight so they don't clash
- The overall impression should be: restraint, developer focus, trustworthy, fast
Copy:
- Active voice, concise, action-oriented
- Use & over "and"
- Use numerals for counts (8 deployments, not eight)
- Frame messages positively even for problems — guide toward a fix, don't just state what's wrong
- No ambiguity: every label is clear and specific

`,
  },
};

export function getStyle(name: string): Style | undefined {
  return STYLES[name.toLowerCase()];
}

export function listStyles(): string[] {
  return Object.keys(STYLES);
}
