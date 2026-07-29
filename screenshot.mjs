/**
 * screenshot.mjs — capture a URL to ./temporary screenshots/screenshot-N[-label].png
 * Usage: node screenshot.mjs <url> [label]
 * Example: node screenshot.mjs http://localhost:3000 hero
 */
import { execSync, spawnSync } from 'child_process';
import { existsSync, readdirSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dir, 'temporary screenshots');
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

const url   = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';

// Auto-increment N
const existing = readdirSync(outDir).filter(f => f.startsWith('screenshot-') && f.endsWith('.png'));
const nums = existing.map(f => parseInt(f.match(/^screenshot-(\d+)/)?.[1] ?? '0')).filter(n => !isNaN(n));
const next = (nums.length ? Math.max(...nums) : 0) + 1;
const name = label ? `screenshot-${next}-${label}.png` : `screenshot-${next}.png`;
const out  = join(outDir, name);

const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const result = spawnSync(chrome, [
  '--headless=new',
  '--screenshot=' + out,
  '--window-size=1440,900',
  '--no-sandbox',
  '--disable-gpu',
  '--virtual-time-budget=3000',
  url,
], { stdio: 'pipe' });

if (existsSync(out)) {
  console.log('Screenshot saved →', out.replace(__dir + '/', ''));
} else {
  console.error('Screenshot failed. Chrome exit:', result.status);
  process.exit(1);
}
