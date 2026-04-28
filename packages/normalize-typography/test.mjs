import assert from 'node:assert';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const binPath = path.resolve(__dirname, 'index.mjs');
const tempDir = path.resolve(__dirname, 'temp_test');

test('normalize-typography', async (t) => {
  if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true });
  fs.mkdirSync(tempDir);

  const testFilePath = path.join(tempDir, 'test.txt');

  await t.test('should replace dashes', () => {
    fs.writeFileSync(testFilePath, 'Hello\u2014World', 'utf8');
    execSync(`node ${binPath} ${testFilePath}`);
    assert.strictEqual(fs.readFileSync(testFilePath, 'utf8'), 'Hello-World');
  });

  await t.test('should replace double smart quotes', () => {
    fs.writeFileSync(testFilePath, '\u201Cquote\u201D', 'utf8');
    execSync(`node ${binPath} ${testFilePath}`);
    assert.strictEqual(fs.readFileSync(testFilePath, 'utf8'), '"quote"');
  });

  await t.test('should replace single smart quotes', () => {
    fs.writeFileSync(testFilePath, '\u2018single\u2019', 'utf8');
    execSync(`node ${binPath} ${testFilePath}`);
    assert.strictEqual(fs.readFileSync(testFilePath, 'utf8'), "'single'");
  });

  await t.test('check mode functionality', () => {
    fs.writeFileSync(testFilePath, '\u201Cbad\u201D', 'utf8');
    assert.throws(() => {
      execSync(`node ${binPath} --check ${testFilePath}`, { stdio: 'pipe' });
    });
  });

  fs.rmSync(tempDir, { recursive: true });
});
