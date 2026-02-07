import PptxGenJS from "pptxgenjs";
import { readdir, stat } from "fs/promises";
import { join, extname } from "path";

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp"]);

interface AssembleResult {
  slideCount: number;
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
  }

  await pptx.writeFile({ fileName: outputPath });

  const fileStats = await stat(outputPath);

  return {
    slideCount: imageFiles.length,
    bytes: fileStats.size,
  };
}
