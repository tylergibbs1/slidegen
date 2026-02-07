import { mkdir, readdir, writeFile } from "fs/promises";
import { join, extname } from "path";
import { generateSlideImage } from "../lib/gemini";
import { logSlideDone, logSlideFail } from "../lib/logger";
import { getStyle } from "../lib/styles";
import type { SlideOptions } from "../lib/types";
import { EXIT_SUCCESS, EXIT_GENERATION_FAIL, EXIT_INPUT_ERROR } from "../lib/types";

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp"]);

function mimeToExt(mimeType: string): string {
  const map: Record<string, string> = {
    "image/png": ".png",
    "image/jpeg": ".jpg",
    "image/webp": ".webp",
  };
  return map[mimeType] ?? ".png";
}

async function getNextName(dir: string): Promise<string> {
  let entries: string[];
  try {
    entries = await readdir(dir);
  } catch {
    return "01";
  }

  const numbers = entries
    .filter((f) => IMAGE_EXTENSIONS.has(extname(f).toLowerCase()))
    .map((f) => {
      const match = f.match(/^(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    })
    .filter((n) => n > 0);

  const next = numbers.length > 0 ? Math.max(...numbers) + 1 : 1;
  return String(next).padStart(2, "0");
}

export async function runSlide(opts: SlideOptions): Promise<number> {
  const { dir, model, format } = opts;
  let { prompt } = opts;

  if (!prompt.trim()) {
    logSlideFail(format, "No prompt provided", 0);
    return EXIT_INPUT_ERROR;
  }

  if (opts.style) {
    const style = getStyle(opts.style);
    if (!style) {
      logSlideFail(format, `Unknown style: ${opts.style}. Available: engineer, apple, vercel`, 0);
      return EXIT_INPUT_ERROR;
    }
    prompt = style.prefix + prompt;
  }

  const start = performance.now();

  try {
    await mkdir(dir, { recursive: true });

    const name = opts.name ?? (await getNextName(dir));
    const result = await generateSlideImage(prompt, model);
    const ext = mimeToExt(result.mimeType);
    const filename = `${name}${ext}`;
    const filePath = join(dir, filename);

    await writeFile(filePath, result.imageData);

    const elapsed = Math.round(performance.now() - start);
    logSlideDone(format, filePath, elapsed);
    return EXIT_SUCCESS;
  } catch (err) {
    const elapsed = Math.round(performance.now() - start);
    const message = err instanceof Error ? err.message : String(err);
    logSlideFail(format, message, elapsed);
    return EXIT_GENERATION_FAIL;
  }
}
