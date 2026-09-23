import PptxGenJS from "pptxgenjs";
import { readFile, readdir, stat } from "fs/promises";
import { basename, join, extname } from "path";
import { parseSlideText, type SlideText } from "./text";

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp"]);

interface AssembleResult {
  slideCount: number;
  /** Slides that carried real text from a sidecar file. */
  textSlides: number;
  bytes: number;
}

export async function assembleSlides(
  imagesDir: string,
  outputPath: string,
): Promise<AssembleResult> {
  const entries = await readdir(imagesDir);

  const imageFiles = entries
    .filter((f) => IMAGE_EXTENSIONS.has(extname(f).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  if (imageFiles.length === 0) {
    throw new Error(`No image files found in ${imagesDir}`);
  }

  let textSlides = 0;
  const pptx = new PptxGenJS();
  pptx.layout = "LAYOUT_WIDE"; // 13.33" x 7.5" (16:9)

  for (const file of imageFiles) {
    const filePath = join(imagesDir, file);
    const slide = pptx.addSlide();
    slide.addImage({
      path: filePath,
      x: 0,
      y: 0,
      w: "100%",
      h: "100%",
    });
    const text = await readSlideText(join(imagesDir, `${basename(file, extname(file))}.json`));
    if (text) addSlideText(slide, text);
    if (text) textSlides++;
  }

  await pptx.writeFile({ fileName: outputPath });

  const fileStats = await stat(outputPath);

  return {
    slideCount: imageFiles.length,
    textSlides,
    bytes: fileStats.size,
  };
}

async function readSlideText(path: string): Promise<SlideText | undefined> {
  let raw: string;
  try {
    raw = await readFile(path, "utf-8");
  } catch {
    return undefined;
  }
  return parseSlideText(raw);
}

/* Real, editable text over the left of the art (13.33" x 7.5" slide).
 * Geist first; PowerPoint falls back if it is not installed. */
function addSlideText(slide: PptxGenJS.Slide, text: SlideText): void {
  slide.addText(text.headline, {
    x: 0.7,
    y: 2.2,
    w: 5.6,
    h: 1.8,
    fontFace: "Geist",
    fontSize: 40,
    bold: false,
    color: "161411",
    valign: "bottom",
    fit: "shrink",
  });
  if (text.sub) {
    slide.addText(text.sub, {
      x: 0.7,
      y: 4.1,
      w: 5.2,
      h: 1.2,
      fontFace: "Geist",
      fontSize: 18,
      color: "605A50",
      valign: "top",
      fit: "shrink",
    });
  }
}
