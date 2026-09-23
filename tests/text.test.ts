import { describe, expect, test, afterAll } from "bun:test";
import { mkdir, rm, writeFile, readFile } from "fs/promises";
import { join } from "path";
import { assembleSlides } from "../src/lib/assembler";
import { generateSlideImage } from "../src/lib/image";
import { getStyle } from "../src/lib/styles";
import { parseSlideText } from "../src/lib/text";

const DIR = join(import.meta.dir, "__text_images__");
const OUT = join(import.meta.dir, "__text_output__.pptx");
const PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==",
  "base64",
);

afterAll(async () => {
  await rm(DIR, { recursive: true, force: true });
  await rm(OUT, { force: true });
});

describe("slide text", () => {
  test("assemble sets a sidecar's words as real text in the deck", async () => {
    await mkdir(DIR, { recursive: true });
    await writeFile(join(DIR, "01.png"), PNG);
    await writeFile(join(DIR, "02.png"), PNG);
    await writeFile(
      join(DIR, "01.json"),
      JSON.stringify({ headline: "Triage across 3 TB of records.", sub: "About 93% accurate." }),
    );

    const result = await assembleSlides(DIR, OUT);
    expect(result.slideCount).toBe(2);
    expect(result.textSlides).toBe(1);

    // The exact figures are in the file as text, not pixels.
    const { default: JSZip } = await import("jszip");
    const zip = await JSZip.loadAsync(await readFile(OUT));
    const xml = await zip.file("ppt/slides/slide1.xml")!.async("string");
    expect(xml).toContain("Triage across 3 TB of records.");
    expect(xml).toContain("About 93% accurate.");
    expect(xml).toContain("Geist");
  });

  test("a sidecar without a headline is rejected", () => {
    expect(() => parseSlideText(JSON.stringify({ sub: "x" }))).toThrow("headline");
  });

  test("the grayhaven style is available", () => {
    const style = getStyle("grayhaven");
    expect(style?.prefix).toContain("#A48977");
    expect(style?.prefix).toContain("Geist");
  });

  test("reference images are refused on Gemini", async () => {
    await expect(
      generateSlideImage({ prompt: "x", provider: "gemini", refs: ["a.png"] }),
    ).rejects.toThrow("openai only");
  });
});
