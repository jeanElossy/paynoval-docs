// Node 18+ (fetch disponible)
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const specsDir = path.join(__dirname, '..', 'specs');
fs.mkdirSync(specsDir, { recursive: true });

// ✅ Remplace automatiquement si des variables d'env sont fournies
const GATEWAY_SPEC_URL  =
  process.env.GATEWAY_SPEC_URL
  || 'https://raw.githubusercontent.com/jeanElossy/api-gateway/main/api-gateway/docs/openapi.yaml';

const INTERNAL_SPEC_URL =
  process.env.INTERNAL_SPEC_URL
  || 'https://raw.githubusercontent.com/jeanElossy/api-paynoval/main/docs/openapi.yaml';

async function download(url, outPath) {
  console.log(`➡️  Fetch ${url}`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const text = await res.text();
  fs.writeFileSync(outPath, text, 'utf8');
  console.log(`✅  Saved ${outPath} (${text.split('\n').length} lines)`);
}

(async () => {
  try {
    await download(GATEWAY_SPEC_URL,  path.join(specsDir, 'gateway.yaml'));
    await download(INTERNAL_SPEC_URL, path.join(specsDir, 'internal.yaml'));
  } catch (err) {
    console.error('❌ Error fetching specs:', err.message);
    process.exit(1);
  }
})();
