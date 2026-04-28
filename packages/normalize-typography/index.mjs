#!/usr/bin/env node

import { glob } from 'glob';
import console from 'node:console';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const REPLACEMENTS = [
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

function getIgnorePatterns() {
  const ignorePath = path.resolve(rootDir, '.prettierignore');
  const patterns = ['.git/**', 'node_modules/**'];

  if (fs.existsSync(ignorePath)) {
    const content = fs.readFileSync(ignorePath, 'utf8');
    const lines = content
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#'));

    for (const line of lines) {
      if (line.endsWith('/')) {
        patterns.push(`${line}**`, line.slice(0, -1));
      } else {
        patterns.push(line, `${line}/**`);
      }
    }
  }
  return patterns;
}

const ignorePatterns = getIgnorePatterns();

async function processFile(filePath) {
  const absolutePath = path.isAbsolute(filePath) ? filePath : path.resolve(rootDir, filePath);

  if (!fs.existsSync(absolutePath)) {
    return;
  }
  try {
    if (fs.lstatSync(absolutePath).isDirectory()) return;
  } catch {
    return;
  }

  const relativePath = path.relative(rootDir, absolutePath).replaceAll('\\', '/');

  try {
    const content = fs.readFileSync(absolutePath, 'utf8');
    let newContent = content;
    let hasChanges = false;

    for (const { regex, replace } of REPLACEMENTS) {
      if (regex.test(newContent)) {
        newContent = newContent.replaceAll(regex, replace);
        hasChanges = true;
      }
    }

    if (!hasChanges) {
      return;
    }
    if (isCheckMode) {
      console.error(`❌ Error: Non-standard typography found in "${relativePath}".`);
      process.exitCode = 1;
    } else {
      fs.writeFileSync(absolutePath, newContent, 'utf8');
      console.log(`✔ Fixed: ${relativePath}`);
    }
  } catch {
    // Skip binary files
  }
}

async function run() {
  if (args.length > 0) {
    for (const file of args) {
      await processFile(file);
    }
  } else {
    console.log('Searching for non-standard typography (dashes, smart quotes)...');
    const files = await glob('**/*', {
      absolute: true,
      dot: true,
      ignore: ignorePatterns,
      nodir: true,
    });

    for (const file of files) {
      await processFile(file);
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
