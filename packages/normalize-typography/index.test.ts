import assert from 'node:assert';
import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const binPath = path.resolve(__dirname, 'index.ts');
const tempDir = path.resolve(__dirname, 'temp_test');

// eslint-disable-next-line max-lines-per-function
await test('normalize-typography', async (t) => {
  if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true });
  fs.mkdirSync(tempDir);

  const testFilePath = path.join(tempDir, 'test.txt');

  await t.test('should replace dashes', () => {
    fs.writeFileSync(testFilePath, 'Hello\u2014World', 'utf8');
    execSync(`npx tsx ${binPath} ${testFilePath}`);
    assert.strictEqual(fs.readFileSync(testFilePath, 'utf8'), 'Hello-World');
  });

  await t.test('should replace double smart quotes', () => {
    fs.writeFileSync(testFilePath, '\u201Cquote\u201D', 'utf8');
    execSync(`npx tsx ${binPath} ${testFilePath}`);
    assert.strictEqual(fs.readFileSync(testFilePath, 'utf8'), '"quote"');
  });

  await t.test('should replace guillemets', () => {
    fs.writeFileSync(testFilePath, '\u00ABquote\u00BB', 'utf8');
    execSync(`npx tsx ${binPath} ${testFilePath}`);
    assert.strictEqual(fs.readFileSync(testFilePath, 'utf8'), '"quote"');
  });

  await t.test('should replace german double quotes', () => {
    fs.writeFileSync(testFilePath, '\u201Equote\u201C', 'utf8');
    execSync(`npx tsx ${binPath} ${testFilePath}`);
    assert.strictEqual(fs.readFileSync(testFilePath, 'utf8'), '"quote"');
  });

  await t.test('should replace french single quotes', () => {
    fs.writeFileSync(testFilePath, '\u2039single\u203A', 'utf8');
    execSync(`npx tsx ${binPath} ${testFilePath}`);
    assert.strictEqual(fs.readFileSync(testFilePath, 'utf8'), "'single'");
  });

  await t.test('should replace ellipsis', () => {
    fs.writeFileSync(testFilePath, 'text\u2026', 'utf8');
    execSync(`npx tsx ${binPath} ${testFilePath}`);
    assert.strictEqual(fs.readFileSync(testFilePath, 'utf8'), 'text...');
  });

  await t.test('should replace multiplication sign', () => {
    fs.writeFileSync(testFilePath, '2\u00D72', 'utf8');
    execSync(`npx tsx ${binPath} ${testFilePath}`);
    assert.strictEqual(fs.readFileSync(testFilePath, 'utf8'), '2*2');
  });

  await t.test('should replace single smart quotes', () => {
    fs.writeFileSync(testFilePath, '\u2018single\u2019', 'utf8');
    execSync(`npx tsx ${binPath} ${testFilePath}`);
    assert.strictEqual(fs.readFileSync(testFilePath, 'utf8'), "'single'");
  });

  await t.test('check mode functionality', () => {
    fs.writeFileSync(testFilePath, '\u201Cbad\u201D', 'utf8');
    assert.throws(() => {
      execSync(`npx tsx ${binPath} --check ${testFilePath}`, { stdio: 'pipe' });
    });
  });

  fs.rmSync(tempDir, { recursive: true });
});
