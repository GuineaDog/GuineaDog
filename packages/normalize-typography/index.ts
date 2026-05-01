#!/usr/bin/env node

import walk from 'ignore-walk';
import * as console from 'node:console';
import { existsSync, lstatSync } from 'node:fs';
import * as fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

interface Replacement {
  regex: RegExp;
  replace: string;
}

const REPLACEMENTS: Replacement[] = [
  // Dashes
  { regex: /[\u2014\u2013\u2012\u2015]/g, replace: '-' },
  // Double quotes
  { regex: /[\u201C\u201D]/g, replace: '"' },
  // Single quotes / Apostrophes
  { regex: /[\u2018\u2019]/g, replace: "'" },
];

const isCheckMode = process.argv.includes('--check');
const args = process.argv.slice(2).filter((arg) => !arg.startsWith('--'));
const rootDir = process.cwd();

/**
 * Reads, normalizes, and updates the file content if needed.
 *
 * @param absolutePath - The absolute path to the file.
 * @param relativePath - The relative path for logging.
 */
async function handleFileContent(absolutePath: string, relativePath: string): Promise<void> {
  try {
    const content = await fs.readFile(absolutePath, 'utf8');
    const { hasChanges, newContent } = normalizeContent(content);

    if (!hasChanges) {
      return;
    }

    if (isCheckMode) {
      console.error(`❌ Error: Non-standard typography found in "${relativePath}".`);
      process.exitCode = 1;
    } else {
      await fs.writeFile(absolutePath, newContent, 'utf8');
      console.log(`✅ Fixed: ${relativePath}`);
    }
  } catch {
    // Skip binary files or permission issues
  }
}

/**
 * Normalizes the typography in the given content.
 *
 * @param content - The original content.
 * @returns An object containing the normalized content and a flag indicating if changes were made.
 */
function normalizeContent(content: string): { hasChanges: boolean; newContent: string } {
  let newContent = content;
  let hasChanges = false;

  for (const { regex, replace } of REPLACEMENTS) {
    if (regex.test(newContent)) {
      newContent = newContent.replaceAll(regex, replace);
      hasChanges = true;
    }
  }

  return { hasChanges, newContent };
}

/**
 * Processes a single file.
 *
 * @param filePath - The path to the file to process.
 * @returns A promise that resolves when the file is processed.
 */
async function processFile(filePath: string): Promise<void> {
  const absolutePath = path.isAbsolute(filePath) ? filePath : path.resolve(rootDir, filePath);

  if (!existsSync(absolutePath)) return;

  try {
    const stats = lstatSync(absolutePath);
    if (stats.isDirectory()) return;
  } catch {
    return;
  }

  const relativePath = path.relative(rootDir, absolutePath).replaceAll('\\', '/');
  await handleFileContent(absolutePath, relativePath);
}

/**
 * Main function to run the typography normalization tool.
 *
 * @returns A promise that resolves when all files are processed.
 */
async function run(): Promise<void> {
  if (args.length > 0) {
    for (const file of args) {
      await processFile(file);
    }
  } else {
    console.log('🔍 Searching for non-standard typography (dashes, smart quotes)...');

    try {
      const files = await walk({
        ignoreFiles: ['.gitignore', '.prettierignore'],
        includeEmpty: false,
        path: rootDir,
      });

      for (const file of files) {
        const fullPath = path.join(rootDir, file);
        await processFile(fullPath);
      }
    } catch (error) {
      console.error('❌ Failed to read directory:', error);
    }

    if (process.exitCode === 1) {
      console.log('\n❌ Check failed. Use "npx normalize-typography" to auto-fix.');
    } else {
      console.log('\n✅ Done!');
    }
  }
}

try {
  await run();
} catch (error) {
  console.error(error);
  process.exit(1);
}
