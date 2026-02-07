#!/usr/bin/env bun

import { runSlide } from "./commands/slide";
import { runAssemble } from "./commands/assemble";
import type { OutputFormat } from "./lib/types";
import { EXIT_INPUT_ERROR } from "./lib/types";

const HELP = `slidegen — generate slide images and assemble PowerPoint decks

Workflow:
  slidegen slide "Your prompt here"     Generate a slide image
  slidegen assemble ./slides            Assemble images into a .pptx

Commands:
  slide    Generate a single slide image from a text prompt
  assemble Combine a directory of images into a PowerPoint file

Environment:
  GEMINI_API_KEY   Google Gemini API key (required for slide command)

Exit codes:
  0  Success
  1  Generation / assembly failure
  2  Input error (missing prompt, bad arguments)`;

const SLIDE_HELP = `slidegen slide — generate a slide image from a text prompt

Usage:
  slidegen slide <prompt> [options]
  echo "prompt" | slidegen slide [options]

Options:
  -d, --dir <path>     Output directory (default: ./slides)
  -n, --name <name>    File name without extension (default: auto-increment)
  -m, --model <model>  Gemini model to use
  -f, --format <fmt>   Output format: text or json (default: text)
  -h, --help           Show this help`;

const ASSEMBLE_HELP = `slidegen assemble — combine images into a PowerPoint file

Usage:
  slidegen assemble <images_dir> [options]

Options:
  -o, --output <path>  Output file path (default: ./deck.pptx)
  -f, --format <fmt>   Output format: text or json (default: text)
  -h, --help           Show this help`;

function parseFlag(args: string[], short: string, long: string): string | undefined {
  for (let i = 0; i < args.length; i++) {
    if (args[i] === short || args[i] === long) {
      const val = args[i + 1];
      args.splice(i, 2);
      return val;
    }
  }
  return undefined;
}

function hasFlag(args: string[], short: string, long: string): boolean {
  const idx = args.findIndex((a) => a === short || a === long);
  if (idx >= 0) {
    args.splice(idx, 1);
    return true;
  }
  return false;
}

async function readStdin(): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString("utf-8").trim();
}

async function main(): Promise<number> {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === "-h" || args[0] === "--help") {
    console.log(HELP);
    return 0;
  }

  const command = args.shift();

  if (command === "slide") {
    if (hasFlag(args, "-h", "--help")) {
      console.log(SLIDE_HELP);
      return 0;
    }

    const dir = parseFlag(args, "-d", "--dir") ?? "./slides";
    const name = parseFlag(args, "-n", "--name");
    const model = parseFlag(args, "-m", "--model") ?? "gemini-3-pro-image-preview";
    const format = (parseFlag(args, "-f", "--format") ?? "text") as OutputFormat;

    let prompt = args.join(" ");
    if (!prompt && !process.stdin.isTTY) {
      prompt = await readStdin();
    }

    if (!prompt) {
      console.error("Error: No prompt provided. Pass as argument or pipe via stdin.");
      console.error('Usage: slidegen slide "Your prompt here"');
      return EXIT_INPUT_ERROR;
    }

    return runSlide({ prompt, dir, name, model, format });
  }

  if (command === "assemble") {
    if (hasFlag(args, "-h", "--help")) {
      console.log(ASSEMBLE_HELP);
      return 0;
    }

    const output = parseFlag(args, "-o", "--output") ?? "./deck.pptx";
    const format = (parseFlag(args, "-f", "--format") ?? "text") as OutputFormat;
    const imagesDir = args[0] ?? "";

    if (!imagesDir) {
      console.error("Error: No images directory provided.");
      console.error("Usage: slidegen assemble <images_dir>");
      return EXIT_INPUT_ERROR;
    }

    return runAssemble({ imagesDir, output, format });
  }

  console.error(`Unknown command: ${command}`);
  console.error("Run 'slidegen --help' for usage.");
  return EXIT_INPUT_ERROR;
}

main().then((code) => process.exit(code));
