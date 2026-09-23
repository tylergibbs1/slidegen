/** The real words on a slide, kept beside its image as `NN.json` and set as
 * editable text by `assemble`, so figures and claims are never painted by
 * an image model. */
export interface SlideText {
  headline: string;
  sub?: string;
}

/** Appended to the prompt of any slide that has real text. */
export const TEXT_SAFE_PROMPT = `

Draw no text, letters, numbers, labels, logos or watermarks anywhere in the image. Keep the left 45% of the frame calm, light and nearly empty, because a headline will be set there afterwards; place the subject in the right half.`;

export function parseSlideText(raw: string): SlideText {
  const value = JSON.parse(raw) as Partial<SlideText>;
  if (typeof value.headline !== "string" || !value.headline.trim()) {
    throw new Error("Slide text needs a non-empty headline");
  }
  if (value.sub !== undefined && typeof value.sub !== "string") {
    throw new Error("Slide text sub must be a string");
  }
  return { headline: value.headline, ...(value.sub ? { sub: value.sub } : {}) };
}
