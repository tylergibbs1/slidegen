import { DEFAULT_GEMINI_MODEL, generateSlideImage as generateGeminiImage } from "./gemini";
import { DEFAULT_OPENAI_IMAGE_MODEL, generateOpenAIImage } from "./openai";
import type { ImageProvider } from "./types";

interface GenerateSlideImageOptions {
  prompt: string;
  model?: string;
  provider?: ImageProvider;
  size?: string;
  refs?: string[];
}

interface GenerateImageResult {
  imageData: Buffer;
  mimeType: string;
  text?: string;
}

export function inferImageProvider(model: string, provider?: ImageProvider): ImageProvider {
  if (provider) {
    return provider;
  }

  if (model.startsWith("gpt-image-") || model.startsWith("dall-e-")) {
    return "openai";
  }

  return "gemini";
}

export function defaultModelForProvider(provider: ImageProvider): string {
  return provider === "openai" ? DEFAULT_OPENAI_IMAGE_MODEL : DEFAULT_GEMINI_MODEL;
}

export async function generateSlideImage({
  prompt,
  model,
  provider,
  size,
  refs,
}: GenerateSlideImageOptions): Promise<GenerateImageResult> {
  const resolvedProvider = inferImageProvider(model ?? DEFAULT_GEMINI_MODEL, provider);

  if (resolvedProvider === "openai") {
    return generateOpenAIImage({ prompt, model: model ?? DEFAULT_OPENAI_IMAGE_MODEL, size, refs });
  }

  if (refs?.length) {
    throw new Error("Reference images (--ref) are supported with --provider openai only");
  }

  return generateGeminiImage(prompt, model ?? DEFAULT_GEMINI_MODEL);
}
