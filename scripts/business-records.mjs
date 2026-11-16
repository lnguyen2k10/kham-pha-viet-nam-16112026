import assert from 'node:assert/strict';

export function parseCSV(text) {
  const rows = []; let row = [], field = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '"') { if (quoted && text[i + 1] === '"') { field += '"'; i++; } else { assert(quoted || field === '', 'Unexpected quote'); quoted = !quoted; } }
    else if (!quoted && (char === ',' || char === '\n' || char === '\r')) {
      row.push(field); field = '';
      if (char !== ',') { if (row.some(v => v.trim())) rows.push(row); row = []; if (char === '\r' && text[i + 1] === '\n') i++; }
    } else field += char;
  }
  assert(!quoted, 'Unclosed CSV quote');
  row.push(field); if (row.some(v => v.trim())) rows.push(row);
  const headers = rows.shift()?.map(h => h.replace(/^\uFEFF/, '').trim());
  assert(headers?.length && new Set(headers).size === headers.length, 'Missing/duplicate CSV headers');
  return rows.map((values, i) => { assert.equal(values.length, headers.length, `CSV row ${i + 2}: invalid number of columns`); return Object.fromEntries(headers.map((h, j) => [h, values[j].trim()])); });
}
export function validatePublicRecords(rows, { provinces, communes, categories, imageExists }) {
  assert(Array.isArray(rows) && rows.length <= 10000, 'Invalid business list');
  const slugs = new Set();
  const text = (row, key, min, max) => { assert(typeof row[key] === 'string' && row[key].trim().length >= min && row[key].length <= max, `Invalid ${key}`); assert(!/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(row[key]), `Invalid control characters in ${key}`); return row[key].trim(); };
  return rows.map((row, index) => {
    try {
      const slug = text(row, 'slug', 2, 100); assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) && !slugs.has(slug), 'Invalid/duplicate slug'); slugs.add(slug);
      assert.equal(row.approved, 'yes', 'Editorial approval required'); assert.equal(row.consent, 'yes', 'Publication consent required'); assert.equal(row.rights, 'yes', 'Image rights confirmation required');
      const province = text(row, 'province', 2, 100); assert(provinces.some(p => p.slug === province), 'Unknown province');
      const commune = row.commune || ''; assert(!commune || communes.some(c => c.slug === commune && c.province === province), 'Unknown commune/province pair');
      const category = text(row, 'category', 2, 100); assert(categories.includes(category) && category !== 'Tất cả', 'Invalid category');
      const image = text(row, 'image', 10, 200); assert(/^\/images\/(?:[a-zA-Z0-9_-]+\/)*[a-zA-Z0-9_-]+\.(jpg|jpeg|png|webp)$/.test(image) && imageExists(image), 'Image missing or invalid path');
      const phone = row.phone || null, zalo = row.zalo || null, website = row.website || null;
      assert(!phone || /^[+0-9 ()-]{9,20}$/.test(phone), 'Invalid public phone');
      assert(!zalo || /^(0\d{9}|84\d{9})$/.test(zalo), 'Invalid public Zalo number');
      if (website) { const url = new URL(website); assert(url.protocol === 'https:' && !url.username && !url.password, 'Website must use HTTPS without embedded credentials'); assert(website.length <= 300, 'Website too long'); }
      assert(phone || zalo || website, 'At least one owner-approved public contact required');
      const services = text(row, 'services', 2, 500).split('|').map(s => s.trim()).filter(Boolean); assert(services.length >= 1 && services.length <= 6, '1–6 services required');
      assert(['area','business'].includes(row.imageKind), 'Image kind must be area or business');
      return { slug, name: text(row,'name',2,120), province, commune, category, image, tagline:text(row,'tagline',5,160), description:text(row,'description',40,3000), address:text(row,'address',5,300), services, phone, zalo, website, imageKind:row.imageKind, isSample:false };
    } catch (error) { throw new Error(`Record ${index + 1} (${row.slug || 'unknown'}): ${error.message}`); }
  });
}
