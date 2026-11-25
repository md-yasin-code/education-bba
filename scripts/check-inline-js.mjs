import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)]
  .map(match => match[1].trim())
  .filter(Boolean);

if (scripts.length === 0) throw new Error('No inline JavaScript found in index.html');
for (let i = 0; i < scripts.length; i += 1) {
  new vm.Script(scripts[i], { filename: 'index.html:inline-script-' + (i + 1) });
}
console.log('JavaScript syntax check passed (' + scripts.length + ' inline scripts).');
