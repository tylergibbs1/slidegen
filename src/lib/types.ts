export type OutputFormat = "text" | "json";

export const EXIT_SUCCESS = 0;
export const EXIT_GENERATION_FAIL = 1;
export const EXIT_INPUT_ERROR = 2;

export type ImageProvider = "gemini" | "openai";

export interface SlideOptions {
  prompt: string;
  dir: string;
  name?: string;
  model: string;
  provider?: ImageProvider;
  format: OutputFormat;
  style?: string;
  size?: string;
  /** Images sent as style references (OpenAI only). */
  refs?: string[];
  /** Real text for the slide, laid over the art by `assemble`. */
  headline?: string;
  sub?: string;
}

export interface AssembleOptions {
  imagesDir: string;
  output: string;
  format: OutputFormat;
}
