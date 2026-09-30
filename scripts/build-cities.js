const fs = require('fs');
const path = require('path');

const outPath = path.join(__dirname, '..', 'src', 'data', 'india-cities.json');

let pkgPath;
try {
  pkgPath = require.resolve('cities.json');
} catch {
  if (fs.existsSync(outPath)) {
    console.log(`Using committed city data at ${outPath}`);
    process.exit(0);
  }
  throw new Error('cities.json is required when src/data/india-cities.json is missing.');
}

const all = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

const allowedIntl = ['US', 'UK', 'CA', 'AU', 'DE', 'FR', 'SG', 'AE', 'JP'];

const trimmed = all.filter(city => {
  if (city.country === 'IN') return true;
  if (allowedIntl.includes(city.country) && Number(city.population) > 5000000) return true;
  return false;
}).map(city => ({
  name: city.name,
  subcountry: city.subcountry || null,
  country: city.country,
  population: city.population ? Number(city.population) : 0,
}));

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(trimmed));

console.log(`Wrote ${trimmed.length} cities to ${outPath}`);
console.log(`File size: ${(fs.statSync(outPath).size / 1024).toFixed(1)} KB`);
