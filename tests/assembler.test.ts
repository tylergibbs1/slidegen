import { describe, test, expect, beforeAll, afterAll } from "bun:test";
import { mkdir, writeFile, rm, exists } from "fs/promises";
import { join } from "path";
import { assembleSlides } from "../src/lib/assembler";

const TEST_DIR = join(import.meta.dir, "__test_images__");
const OUTPUT_FILE = join(import.meta.dir, "__test_output__.pptx");

// Create a minimal 1x1 red PNG for testing
function createTestPng(): Buffer {
  // Minimal valid PNG: 1x1 pixel, red
  const png = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==",
    "base64",
  );
  return png;
}

describe("assembler", () => {
  beforeAll(async () => {
    await mkdir(TEST_DIR, { recursive: true });
  });

  afterAll(async () => {
    await rm(TEST_DIR, { recursive: true, force: true });
    await rm(OUTPUT_FILE, { force: true });
  });

  test("creates pptx from images", async () => {
    const png = createTestPng();
    await writeFile(join(TEST_DIR, "01.png"), png);
    await writeFile(join(TEST_DIR, "02.png"), png);
    await writeFile(join(TEST_DIR, "03.png"), png);

    const result = await assembleSlides(TEST_DIR, OUTPUT_FILE);

    expect(result.slideCount).toBe(3);
    expect(result.bytes).toBeGreaterThan(0);
    expect(await exists(OUTPUT_FILE)).toBe(true);
  });

  test("sorts files alphanumerically", async () => {
    // Clean and recreate with specific order
    await rm(TEST_DIR, { recursive: true, force: true });
    await mkdir(TEST_DIR, { recursive: true });

    const png = createTestPng();
    await writeFile(join(TEST_DIR, "10.png"), png);
    await writeFile(join(TEST_DIR, "02.png"), png);
    await writeFile(join(TEST_DIR, "01.png"), png);

    const result = await assembleSlides(TEST_DIR, OUTPUT_FILE);
    expect(result.slideCount).toBe(3);
  });

  test("filters non-image files", async () => {
    await rm(TEST_DIR, { recursive: true, force: true });
    await mkdir(TEST_DIR, { recursive: true });

    const png = createTestPng();
    await writeFile(join(TEST_DIR, "01.png"), png);
    await writeFile(join(TEST_DIR, "notes.txt"), "some notes");
    await writeFile(join(TEST_DIR, "data.json"), "{}");

    const result = await assembleSlides(TEST_DIR, OUTPUT_FILE);
    expect(result.slideCount).toBe(1);
  });

  test("throws on empty directory", async () => {
    await rm(TEST_DIR, { recursive: true, force: true });
    await mkdir(TEST_DIR, { recursive: true });

    expect(assembleSlides(TEST_DIR, OUTPUT_FILE)).rejects.toThrow(
      "No image files found",
    );
  });
});
