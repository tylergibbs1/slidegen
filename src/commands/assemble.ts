import { assembleSlides } from "../lib/assembler";
import { logAssembleDone, logAssembleFail } from "../lib/logger";
import type { AssembleOptions } from "../lib/types";
import { EXIT_SUCCESS, EXIT_GENERATION_FAIL, EXIT_INPUT_ERROR } from "../lib/types";

export async function runAssemble(opts: AssembleOptions): Promise<number> {
  const { imagesDir, output, format } = opts;

  if (!imagesDir) {
    logAssembleFail(format, "No images directory provided");
    return EXIT_INPUT_ERROR;
  }

  try {
    const result = await assembleSlides(imagesDir, output);
    logAssembleDone(format, output, result.slideCount, result.bytes);
    return EXIT_SUCCESS;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    logAssembleFail(format, message);
    return EXIT_GENERATION_FAIL;
  }
}
