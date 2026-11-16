import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { createRequire } from 'node:module';
import { parseCSV, validatePublicRecords } from './business-records.mjs';
const input = process.argv[2];
if (!input) { console.error('Usage: npm run import:businesses -- /path/to/reviewed-businesses.csv'); process.exit(1); }
const root = path.resolve(import.meta.dirname,'..');
const module = { exports: {} };
const compiled = ts.transpileModule(fs.readFileSync(path.join(root,'lib/data.ts'),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,esModuleInterop:true}}).outputText;
new Function('exports','module','require',compiled)(module.exports,module,createRequire(import.meta.url));
const { provinces, communes, categories } = module.exports;
try {
  const rows = parseCSV(fs.readFileSync(input,'utf8'));
  if (!rows.length) throw new Error('Empty import rejected; refusing to erase published data.');
  const output = validatePublicRecords(rows,{provinces,communes,categories,imageExists:image=>fs.existsSync(path.join(root,'public',image))});
  const target = path.join(root,'content/public-businesses.json');
  fs.writeFileSync(target+'.tmp',JSON.stringify(output,null,2)+'\n',{mode:0o600});
  fs.renameSync(target+'.tmp',target);
  console.log(`Prepared ${output.length} approved public records. Review git diff before deploying. Import replaces the public list; use a complete, reviewed export. It does not switch the site out of demo mode or take payments.`);
} catch(error) { console.error(error.message); process.exit(1); }
