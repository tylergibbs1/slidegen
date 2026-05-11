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
}

export interface AssembleOptions {
  imagesDir: string;
  output: string;
  format: OutputFormat;
}
