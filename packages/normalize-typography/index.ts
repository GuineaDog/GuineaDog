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
 * Compares two file paths such that directories come before files at each level,
 * maintaining hierarchical and alphabetical order.
 *
 * @param a - The first path.
 * @param b - The second path.
 * @returns A number indicating the sort order.
 */
function comparePaths(a: string, b: string): number {
  const partsA = a.split('/');
  const partsB = b.split('/');
  const len = Math.min(partsA.length, partsB.length);

  for (let i = 0; i < len; i++) {
    if (partsA[i] !== partsB[i]) {
      const isDirA = i < partsA.length - 1;
      const isDirB = i < partsB.length - 1;
      if (isDirA !== isDirB) {
        return isDirA ? -1 : 1;
      }
      return partsA[i].localeCompare(partsB[i]);
    }
  }

  return partsA.length - partsB.length;
}

/**
 * Scans the directory for files to process.
 *
 * @returns A promise that resolves to a sorted array of file paths.
 */
async function getFilesFromDirectory(): Promise<string[]> {
  console.log('🔍 Searching for non-standard typography (dashes, smart quotes)...');
  try {
    const files = await walk({
      ignoreFiles: ['.gitignore', '.prettierignore'],
      includeEmpty: false,
      path: rootDir,
    });
    files.sort(comparePaths);
    if (files.length === 0) {
      console.log('None');
    }
    return files.map((file) => path.join(rootDir, file));
  } catch (error) {
    console.error('❌ Failed to read directory:', error);
    return [];
  }
}

/**
 * Reads, normalizes, and updates the file content if needed.
 *
 * @param absolutePath - The absolute path to the file.
 * @param relativePath - The relative path for logging.
 * @returns The relative path if the file was modified or needs modification, otherwise null.
 */
async function handleFileContent(absolutePath: string, relativePath: string): Promise<null | string> {
  try {
    const content = await fs.readFile(absolutePath, 'utf8');
    const { hasChanges, newContent } = normalizeContent(content);

    if (!hasChanges) {
      console.log(relativePath);
      return null;
    }

    if (isCheckMode) {
      console.error(`${relativePath} \t ❗ Warning: Non-standard typography found.`);
      process.exitCode = 1;
    } else {
      await fs.writeFile(absolutePath, newContent, 'utf8');
      console.log(`${relativePath} \t ✅ Fixed`);
    }
    return relativePath;
  } catch {
    // Skip binary files or permission issues
    return null;
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
 * @returns The relative path if the file was modified, otherwise null.
 */
async function processFile(filePath: string): Promise<null | string> {
  const absolutePath = path.isAbsolute(filePath) ? filePath : path.resolve(rootDir, filePath);

  if (!existsSync(absolutePath)) return null;

  try {
    const stats = lstatSync(absolutePath);
    if (stats.isDirectory()) return null;
  } catch {
    return null;
  }

  const relativePath = path.relative(rootDir, absolutePath).replaceAll('\\', '/');
  return await handleFileContent(absolutePath, relativePath);
}

/**
 * Prints the final report based on the processed files.
 *
 * @param fixedFiles - Array of paths that were modified or need modification.
 */
function reportResults(fixedFiles: string[]): void {
  if (fixedFiles.length > 0) {
    console.log(
      `\n${
        isCheckMode ?
          '❗ Warning: Non-standard typography found. Use "npx normalize-typography" to auto-fix it'
        : '✅ Fixed'
      }:`,
    );
    for (const file of fixedFiles) {
      console.log(file);
    }
  } else {
    console.log('\n✅ Done!');
  }
}

/**
 * Main function to run the typography normalization tool.
 *
 * @returns A promise that resolves when all files are processed.
 */
async function run(): Promise<void> {
  const fixedFiles: string[] = [];
  const filesToProcess = args.length > 0 ? args : await getFilesFromDirectory();

  for (const file of filesToProcess) {
    const fixed = await processFile(file);
    if (fixed) {
      fixedFiles.push(fixed);
    }
  }

  reportResults(fixedFiles);
}

try {
  await run();
} catch (error) {
  console.error(error);
  process.exit(1);
}
