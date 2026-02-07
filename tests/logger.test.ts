import { describe, test, expect, spyOn, beforeEach, afterEach } from "bun:test";
import {
  logSlideDone,
  logSlideFail,
  logAssembleDone,
  logAssembleFail,
} from "../src/lib/logger";

describe("logger", () => {
  let logSpy: ReturnType<typeof spyOn>;
  let errorSpy: ReturnType<typeof spyOn>;

  beforeEach(() => {
    logSpy = spyOn(console, "log").mockImplementation(() => {});
    errorSpy = spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
    errorSpy.mockRestore();
  });

  describe("logSlideDone", () => {
    test("text format", () => {
      logSlideDone("text", "./slides/01.png", 3800);
      expect(logSpy).toHaveBeenCalledWith("done: ./slides/01.png (3.8s)");
    });

    test("json format", () => {
      logSlideDone("json", "./slides/01.png", 3800);
      const output = logSpy.mock.calls[0][0];
      const parsed = JSON.parse(output);
      expect(parsed).toEqual({
        status: "done",
        image: "./slides/01.png",
        ms: 3800,
      });
    });
  });

  describe("logSlideFail", () => {
    test("text format", () => {
      logSlideFail("text", "API error", 2100);
      expect(errorSpy).toHaveBeenCalledWith("fail: API error");
    });

    test("json format", () => {
      logSlideFail("json", "API error", 2100);
      const output = errorSpy.mock.calls[0][0];
      const parsed = JSON.parse(output);
      expect(parsed).toEqual({
        status: "fail",
        error: "API error",
        ms: 2100,
      });
    });
  });

  describe("logAssembleDone", () => {
    test("text format", () => {
      logAssembleDone("text", "./deck.pptx", 10, 2_516_582);
      expect(logSpy).toHaveBeenCalledWith(
        "done: ./deck.pptx (10 slides, 2.5 MB)",
      );
    });

    test("text format singular slide", () => {
      logAssembleDone("text", "./deck.pptx", 1, 500_000);
      expect(logSpy).toHaveBeenCalledWith(
        "done: ./deck.pptx (1 slide, 0.5 MB)",
      );
    });

    test("json format", () => {
      logAssembleDone("json", "./deck.pptx", 10, 2_516_582);
      const output = logSpy.mock.calls[0][0];
      const parsed = JSON.parse(output);
      expect(parsed).toEqual({
        status: "done",
        output: "./deck.pptx",
        slides: 10,
        bytes: 2_516_582,
      });
    });
  });

  describe("logAssembleFail", () => {
    test("text format", () => {
      logAssembleFail("text", "No images found");
      expect(errorSpy).toHaveBeenCalledWith("fail: No images found");
    });

    test("json format", () => {
      logAssembleFail("json", "No images found");
      const output = errorSpy.mock.calls[0][0];
      const parsed = JSON.parse(output);
      expect(parsed).toEqual({
        status: "fail",
        error: "No images found",
      });
    });
  });
});
