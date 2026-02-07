import type { OutputFormat } from "./types";

export function logSlideDone(
  format: OutputFormat,
  imagePath: string,
  elapsedMs: number,
): void {
  if (format === "json") {
    console.log(
      JSON.stringify({ status: "done", image: imagePath, ms: elapsedMs }),
    );
  } else {
    const seconds = (elapsedMs / 1000).toFixed(1);
    console.log(`done: ${imagePath} (${seconds}s)`);
  }
}

export function logSlideFail(
  format: OutputFormat,
  message: string,
  elapsedMs: number,
): void {
  if (format === "json") {
    console.error(
      JSON.stringify({ status: "fail", error: message, ms: elapsedMs }),
    );
  } else {
    console.error(`fail: ${message}`);
  }
}

export function logAssembleDone(
  format: OutputFormat,
  outputPath: string,
  slideCount: number,
  bytes: number,
): void {
  if (format === "json") {
    console.log(
      JSON.stringify({
        status: "done",
        output: outputPath,
        slides: slideCount,
        bytes,
      }),
    );
  } else {
    const mb = (bytes / 1_000_000).toFixed(1);
    console.log(
      `done: ${outputPath} (${slideCount} slide${slideCount === 1 ? "" : "s"}, ${mb} MB)`,
    );
  }
}

export function logAssembleFail(
  format: OutputFormat,
  message: string,
): void {
  if (format === "json") {
    console.error(JSON.stringify({ status: "fail", error: message }));
  } else {
    console.error(`fail: ${message}`);
  }
}
