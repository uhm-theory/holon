#!/usr/bin/env bun
/**
 * build-paper.ts — Build the UHM paper PDF from LaTeX sources
 *
 * Runs the full LaTeX build pipeline:
 *   pdflatex → bibtex → pdflatex → pdflatex
 * (4 passes for cross-references, bibliography, and table of contents)
 *
 * Usage:
 *   bun scripts/build-paper.ts
 *
 * Output: paper/uhm-paper.pdf
 */

import { $ } from "bun";
import { existsSync } from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dir, "..");
const PAPER_DIR = path.join(ROOT, "paper");
const MAIN_TEX = "main.tex";
const OUTPUT_NAME = "uhm-paper";

async function run(cmd: string, label: string): Promise<boolean> {
  console.log(`  ⏳ ${label}...`);
  const start = performance.now();
  const result = await $`cd ${PAPER_DIR} && ${cmd.split(" ")}`.quiet().nothrow();
  const elapsed = ((performance.now() - start) / 1000).toFixed(1);

  if (result.exitCode !== 0) {
    // pdflatex returns non-zero on warnings too — check for actual errors
    const stderr = result.stderr.toString();
    const stdout = result.stdout.toString();
    const hasFatalError = stderr.includes("Fatal error") ||
                          stdout.includes("No pages of output") ||
                          stdout.includes("Emergency stop");
    if (hasFatalError) {
      console.error(`  ❌ ${label} failed (${elapsed}s)`);
      console.error(stderr.slice(0, 500));
      return false;
    }
  }

  console.log(`  ✅ ${label} (${elapsed}s)`);
  return true;
}

async function main() {
  console.log("\n📄 Building UHM paper\n");
  console.log(`  Source: ${PAPER_DIR}/${MAIN_TEX}`);
  console.log(`  Output: ${PAPER_DIR}/${OUTPUT_NAME}.pdf\n`);

  // Check prerequisites
  if (!existsSync(path.join(PAPER_DIR, MAIN_TEX))) {
    console.error(`❌ ${MAIN_TEX} not found in ${PAPER_DIR}`);
    process.exit(1);
  }

  // Check pdflatex is available
  const which = await $`which pdflatex`.quiet().nothrow();
  if (which.exitCode !== 0) {
    console.error("❌ pdflatex not found. Install TeX Live: brew install --cask mactex");
    process.exit(1);
  }

  const pdflatex = `pdflatex -interaction=nonstopmode -jobname=${OUTPUT_NAME} ${MAIN_TEX}`;
  const bibtex = `bibtex ${OUTPUT_NAME}`;

  // Pass 1: Generate .aux for bibtex
  if (!await run(pdflatex, "Pass 1/4 (aux generation)")) process.exit(1);

  // BibTeX: Resolve references
  if (!await run(bibtex, "BibTeX (bibliography)")) {
    console.log("  ⚠️  BibTeX warnings (non-fatal, continuing)");
  }

  // Pass 2: Incorporate bibliography
  if (!await run(pdflatex, "Pass 2/4 (bibliography)")) process.exit(1);

  // Pass 3: Resolve cross-references
  if (!await run(pdflatex, "Pass 3/4 (cross-references)")) process.exit(1);

  // Verify output
  const pdfPath = path.join(PAPER_DIR, `${OUTPUT_NAME}.pdf`);
  if (!existsSync(pdfPath)) {
    console.error("\n❌ PDF not generated");
    process.exit(1);
  }

  const stat = Bun.file(pdfPath);
  const size = await stat.size;
  const pages = await countPages(pdfPath);

  console.log(`\n✅ Paper built successfully`);
  console.log(`   📄 ${pdfPath}`);
  console.log(`   📐 ${pages} pages, ${(size / 1024 / 1024).toFixed(1)} MB`);

  // Clean auxiliary files
  await cleanup();
}

async function countPages(pdfPath: string): Promise<number> {
  // Quick page count from PDF trailer
  const file = Bun.file(pdfPath);
  const buffer = await file.arrayBuffer();
  const text = new TextDecoder("latin1").decode(buffer.slice(-2048));
  const match = text.match(/\/Count\s+(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

async function cleanup() {
  const extensions = [
    "aux", "log", "out", "toc", "lof", "lot",
    "bbl", "blg", "bcf", "run.xml", "fls", "fdb_latexmk",
    "synctex.gz", "nav", "snm", "vrb"
  ];

  let cleaned = 0;
  for (const ext of extensions) {
    const file = path.join(PAPER_DIR, `uhm-paper.${ext}`);
    if (existsSync(file)) {
      await $`rm ${file}`.quiet().nothrow();
      cleaned++;
    }
    // Also clean main.* artifacts
    const mainFile = path.join(PAPER_DIR, `main.${ext}`);
    if (existsSync(mainFile)) {
      await $`rm ${mainFile}`.quiet().nothrow();
      cleaned++;
    }
  }

  if (cleaned > 0) {
    console.log(`   🧹 Cleaned ${cleaned} auxiliary files`);
  }
}

main().catch((err) => {
  console.error("❌ Unexpected error:", err);
  process.exit(1);
});
