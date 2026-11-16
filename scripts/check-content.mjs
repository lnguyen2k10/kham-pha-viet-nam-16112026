import assert from 'node:assert/strict';
import ts from 'typescript';
import fs from 'node:fs';
import { createRequire } from 'node:module';
const source = fs.readFileSync(new URL('../lib/data.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true } }).outputText;
const module = { exports: {} };
// Compile only our checked-in, trusted data module. Never run uploaded/user content.
new Function('exports', 'module', 'require', compiled)(module.exports, module, createRequire(new URL('../lib/data.ts', import.meta.url)));
const { provinces, communes, businesses, places } = module.exports;
for (const [name, records] of Object.entries({ provinces, businesses, places })) {
  const slugs = records.map(r => r.slug);
  assert.equal(new Set(slugs).size, slugs.length, `Duplicate ${name} slug`);
  for (const slug of slugs) assert.match(slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
}
assert.equal(new Set(communes.map(c => `${c.province}/${c.slug}`)).size, communes.length);
const provinceSlugs = new Set(provinces.map(p => p.slug));
const expectedProvinceSlugs = 'ha-noi cao-bang dien-bien lai-chau lang-son son-la lao-cai tuyen-quang thai-nguyen phu-tho bac-ninh hai-phong quang-ninh hung-yen ninh-binh thanh-hoa nghe-an ha-tinh quang-tri hue da-nang quang-ngai gia-lai dak-lak khanh-hoa lam-dong ho-chi-minh dong-nai tay-ninh dong-thap vinh-long can-tho an-giang ca-mau'.split(' ');
assert.deepEqual([...provinceSlugs].sort(), expectedProvinceSlugs.sort(), 'The nationwide catalogue must contain all 34 current localities');
for (const province of provinces) {
  assert.equal(province.highlights.length, 3, `${province.slug}: missing destination content`);
  assert.equal(province.foods.length, 3, `${province.slug}: missing food content`);
  assert(province.imageCaption, `${province.slug}: missing real-location image caption`);
  assert(province.sources.length >= 2, `${province.slug}: missing editorial sources`);
}
for (const record of [...communes, ...businesses, ...places]) assert(provinceSlugs.has(record.province), `Unknown province: ${record.slug}`);
for (const b of businesses) if (b.commune) assert(communes.some(c => c.province === b.province && c.slug === b.commune), `Unknown commune: ${b.slug}`);
for (const record of [...provinces, ...communes, ...businesses, ...places]) {
  assert(record.image.startsWith('/images/'));
  assert(fs.existsSync(new URL(`../public${record.image}`, import.meta.url)), `Missing image: ${record.image}`);
}
console.log(`Content checks passed: ${provinces.length} localities, ${communes.length} communes, ${places.length} destinations, ${businesses.length} ${module.exports.isDemoMode ? 'sample' : 'public'} businesses.`);

const publicRecords = JSON.parse(fs.readFileSync(new URL('../content/public-businesses.json', import.meta.url),'utf8'));
const { validatePublicRecords } = await import('./business-records.mjs');
validatePublicRecords(publicRecords.map(b=>({...b,services:b.services.join('|'),approved:'yes',consent:'yes',rights:'yes'})),{provinces,communes,categories:module.exports.categories,imageExists:image=>fs.existsSync(new URL(`../public${image}`,import.meta.url))});
for(const b of publicRecords) assert.equal(b.isSample,false,'Sample record in public feed');
console.log(`Public feed: ${publicRecords.length} reviewed records. Content mode: ${module.exports.isDemoMode?'demo':'public'}.`);
