import { describe, test, expect } from "bun:test";
import { defaultModelForProvider, inferImageProvider } from "../src/lib/image";

describe("image provider selection", () => {
  test("keeps Gemini as the default provider", () => {
    expect(inferImageProvider("gemini-3-pro-image-preview")).toBe("gemini");
    expect(defaultModelForProvider("gemini")).toBe("gemini-3-pro-image-preview");
  });

  test("infers OpenAI for OpenAI image models", () => {
    expect(inferImageProvider("gpt-image-2")).toBe("openai");
    expect(inferImageProvider("dall-e-3")).toBe("openai");
    expect(defaultModelForProvider("openai")).toBe("gpt-image-2");
  });

  test("explicit provider wins over model inference", () => {
    expect(inferImageProvider("gpt-image-2", "gemini")).toBe("gemini");
    expect(inferImageProvider("gemini-3-pro-image-preview", "openai")).toBe("openai");
  });
});
