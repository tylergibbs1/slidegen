# slidegen

An agent-first CLI for generating PowerPoint presentations. Give it prompts, get slides.

Built for AI agents (Claude Code, Cursor, Codex, etc.) to create decks as part of automated workflows. Two commands, structured JSON output, stdin support, zero config beyond an API key.

## How it works

1. **`slide`** — sends a text prompt to Google Gemini's image generation model, saves the result as an image
2. **`assemble`** — takes a directory of images and packs them into a 16:9 full-bleed `.pptx`

That's it. Generate slides in parallel, assemble when done.

```
slidegen slide "Title slide: ACME Corp Q4 Results" -d ./slides
slidegen slide "Revenue chart showing 40% YoY growth" -d ./slides
slidegen slide "Thank you / Q&A slide" -d ./slides
slidegen assemble ./slides -o deck.pptx
```

## Install

Requires [Bun](https://bun.sh).

```bash
git clone https://github.com/tylergibbs1/slidegen.git
cd slidegen
bun install
```

Set your Gemini API key:

```bash
export GEMINI_API_KEY=your_key_here
```

## Usage

### Generate a slide

```bash
# From a prompt argument
slidegen slide "A clean dark infographic about cloud architecture"

# From stdin (agent-friendly)
echo "A minimalist title slide reading HELLO WORLD" | slidegen slide

# With options
slidegen slide "Your prompt" -d ./slides -n 01 -m gemini-3-pro-image-preview
```

### Assemble into PowerPoint

```bash
slidegen assemble ./slides -o presentation.pptx
```

### JSON output for agents

Both commands support `-f json` for structured, machine-readable output:

```bash
$ slidegen slide "A dark slide" -f json
{"status":"done","image":"./slides/01.png","ms":8200}

$ slidegen assemble ./slides -f json
{"status":"done","output":"./deck.pptx","slides":5,"bytes":2516582}
```

## Commands

### `slide`

```
slidegen slide <prompt> [options]

Options:
  -d, --dir <path>     Output directory (default: ./slides)
  -n, --name <name>    File name without extension (default: auto-increment)
  -m, --model <model>  Gemini model (default: gemini-3-pro-image-preview)
  -f, --format <fmt>   Output format: text or json (default: text)
```

### `assemble`

```
slidegen assemble <images_dir> [options]

Options:
  -o, --output <path>  Output file path (default: ./deck.pptx)
  -f, --format <fmt>   Output format: text or json (default: text)
```

## Why agent-first

- **Structured output** — JSON mode for easy parsing by agents
- **stdin support** — pipe prompts directly from agent workflows
- **Auto-increment naming** — agents don't need to track slide numbers
- **Predictable exit codes** — 0 success, 1 generation failure, 2 input error
- **No interactivity** — no prompts, no confirmators, no TUI. Just input and output
- **Parallel generation** — run multiple `slide` commands concurrently, assemble once

## Example

See [`examples/breadcrumb.pptx`](examples/breadcrumb.pptx) for a 10-slide deck generated entirely by an AI agent using slidegen.

## Exit codes

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | Generation or assembly failure |
| 2 | Input error (missing prompt, bad arguments) |

## License

MIT
