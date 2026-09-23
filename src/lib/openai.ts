export const DEFAULT_OPENAI_IMAGE_MODEL = "gpt-image-2";
export const DEFAULT_OPENAI_IMAGE_SIZE = "1536x864";

const OPENAI_IMAGES_URL = "https://api.openai.com/v1/images/generations";
const OPENAI_EDITS_URL = "https://api.openai.com/v1/images/edits";

interface GenerateImageResult {
  imageData: Buffer;
  mimeType: string;
}

interface GenerateOpenAIImageOptions {
  prompt: string;
  model?: string;
  size?: string;
  /** Style references: sent to the edits endpoint, so every slide of a
   * deck shares one technique instead of drifting. */
  refs?: string[];
}

interface OpenAIImageResponse {
  data?: Array<{
    b64_json?: string;
    url?: string;
    revised_prompt?: string;
  }>;
  error?: {
    message?: string;
  };
}

export async function generateOpenAIImage({
  prompt,
  model,
  size,
  refs = [],
}: GenerateOpenAIImageOptions): Promise<GenerateImageResult> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY environment variable is not set");
  }

  const fields = {
    model: model ?? DEFAULT_OPENAI_IMAGE_MODEL,
    prompt,
    size: size ?? DEFAULT_OPENAI_IMAGE_SIZE,
  };
  let response: Response;
  if (refs.length) {
    const form = new FormData();
    for (const [key, value] of Object.entries(fields)) form.append(key, value);
    for (const ref of refs) {
      const file = Bun.file(ref);
      if (!(await file.exists())) throw new Error(`Reference image not found: ${ref}`);
      form.append("image[]", file, ref.split("/").pop());
    }
    response = await fetch(OPENAI_EDITS_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}` },
      body: form,
    });
  } else {
    response = await fetch(OPENAI_IMAGES_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });
  }

  const json = (await response.json()) as OpenAIImageResponse;

  if (!response.ok) {
    throw new Error(json.error?.message ?? `OpenAI image generation failed (${response.status})`);
  }

  const image = json.data?.[0];
  if (!image?.b64_json) {
    throw new Error(
      "OpenAI did not return base64 image data" +
        (image?.url ? `; received URL instead: ${image.url}` : ""),
    );
  }

  return {
    imageData: Buffer.from(image.b64_json, "base64"),
    mimeType: "image/png",
  };
}
