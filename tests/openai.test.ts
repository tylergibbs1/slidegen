import { afterEach, describe, expect, test } from "bun:test";
import { generateOpenAIImage } from "../src/lib/openai";

const TEST_PNG_BASE64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==";

const originalApiKey = process.env.OPENAI_API_KEY;
const originalFetch = globalThis.fetch;

describe("generateOpenAIImage", () => {
  afterEach(() => {
    process.env.OPENAI_API_KEY = originalApiKey;
    globalThis.fetch = originalFetch;
  });

  test("calls the OpenAI image endpoint with gpt-image-2 defaults", async () => {
    process.env.OPENAI_API_KEY = "test-key";
    let requestBody: unknown;

    globalThis.fetch = (async (url, init) => {
      expect(url).toBe("https://api.openai.com/v1/images/generations");
      expect(init?.method).toBe("POST");
      expect((init?.headers as Record<string, string>).Authorization).toBe(
        "Bearer test-key",
      );
      requestBody = JSON.parse(init?.body as string);

      return new Response(JSON.stringify({ data: [{ b64_json: TEST_PNG_BASE64 }] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }) as typeof fetch;

    const result = await generateOpenAIImage({ prompt: "A 16:9 title slide" });

    expect(requestBody).toEqual({
      model: "gpt-image-2",
      prompt: "A 16:9 title slide",
      size: "1536x864",
    });
    expect(result.mimeType).toBe("image/png");
    expect(result.imageData.length).toBeGreaterThan(0);
  });

  test("surfaces OpenAI API errors", async () => {
    process.env.OPENAI_API_KEY = "test-key";
    globalThis.fetch = (async () =>
      new Response(JSON.stringify({ error: { message: "bad request" } }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })) as unknown as typeof fetch;

    expect(generateOpenAIImage({ prompt: "bad" })).rejects.toThrow("bad request");
  });
});
