import { GoogleGenAI } from "@google/genai";

const DEFAULT_MODEL = "gemini-3-pro-image-preview";

interface GenerateImageResult {
  imageData: Buffer;
  mimeType: string;
  text?: string;
}

export async function generateSlideImage(
  prompt: string,
  model?: string,
): Promise<GenerateImageResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not set");
  }

  const ai = new GoogleGenAI({ apiKey });

  const response = await ai.models.generateContent({
    model: model ?? DEFAULT_MODEL,
    contents: prompt,
    config: {
      responseModalities: ["IMAGE", "TEXT"],
      imageConfig: {
        aspectRatio: "16:9",
      },
    },
  });

  let imageData: Buffer | undefined;
  let mimeType = "image/png";
  let text: string | undefined;

  if (response.candidates?.[0]?.content?.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        imageData = Buffer.from(part.inlineData.data!, "base64");
        mimeType = part.inlineData.mimeType ?? "image/png";
      }
      if (part.text) {
        text = part.text;
      }
    }
  }

  if (!imageData) {
    throw new Error(
      "Gemini did not return an image. Response text: " + (text ?? "(none)"),
    );
  }

  return { imageData, mimeType, text };
}
