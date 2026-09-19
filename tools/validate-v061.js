const fs=require('fs');
const vm=require('vm');
const path=require('path');
const root=path.join(__dirname,'..');
const files=[
 'app/src/main/assets/hardware-data.js',
 'app/src/main/assets/catalog-extra-v061.js',
 'app/src/main/assets/catalog-domestic-v061.js',
 'app/src/main/assets/market-prices-v061.js',
 'app/src/main/assets/market-domestic-v061.js'
];
const context={window:{},console};
vm.createContext(context);
for(const f of files){
 const code=fs.readFileSync(path.join(root,f),'utf8');
 vm.runInContext(code,context,{filename:f});
}
const DB=context.window.HW_DB||[];
const SRC=context.window.HW_SOURCES||{};
let errors=[];
const seen=new Set();
for(const x of DB){
 if(!x.id)errors.push(`missing id: ${x.name}`);
 else if(seen.has(x.id))errors.push(`duplicate id: ${x.id}`); else seen.add(x.id);
 if(!x.cat||!['cpu','board','gpu','ram','ssd','psu','cooler','case'].includes(x.cat))errors.push(`invalid cat: ${x.name}`);
 if(!x.brand||!x.name)errors.push(`missing brand/name: ${x.id}`);
 for(const sid of x.sourceIds||[])if(!SRC[sid])errors.push(`missing source ${sid}: ${x.name}`);
 if(x.priceVerified){
  if(!(typeof x.price==='number'&&Number.isFinite(x.price)&&x.price>0))errors.push(`verified price invalid: ${x.name}`);
  if(!x.priceDate)errors.push(`verified price missing collection date: ${x.name}`);
  if(!(x.sourceIds&&x.sourceIds.length))errors.push(`verified price missing source: ${x.name}`);
  const marketSources=(x.sourceIds||[]).map(id=>SRC[id]).filter(s=>s&&/^market/.test(s.kind||''));
  if(!marketSources.length)errors.push(`verified price lacks market evidence: ${x.name}`);
 }
 if(x.priceStatus==='conflict'){
  if(x.priceVerified)errors.push(`conflict cannot be verified single price: ${x.name}`);
  if(!Array.isArray(x.priceRange)||x.priceRange.length!==2)errors.push(`conflict missing range: ${x.name}`);
 }
 if(x.catalogVerified&&!((x.sourceIds||[]).map(id=>SRC[id]).some(s=>s&&s.kind==='official'))){
  errors.push(`catalogVerified lacks official source: ${x.name}`);
 }
}
const ids=Object.keys(SRC);
for(const id of ids){const s=SRC[id];if(!s.title||!s.url||!s.date||!s.kind)errors.push(`incomplete source: ${id}`);}
const brands=new Set(DB.map(x=>x.brand));
const byCategory={};for(const x of DB)byCategory[x.cat]=(byCategory[x.cat]||0)+1;
const priced=DB.filter(x=>x.priceVerified&&x.price!=null);
const high=priced.filter(x=>x.priceConfidence==='high');
const marketCatalog=DB.filter(x=>x.marketCatalogVerified);
const official=DB.filter(x=>x.catalogVerified);
const conflicts=DB.filter(x=>x.priceStatus==='conflict');
console.log('SmartPCBuilder v0.6.1 full validation');
console.log('records=',DB.length,'brands=',brands.size,'official=',official.length,'marketCatalog=',marketCatalog.length,'priced=',priced.length,'highPrice=',high.length,'conflicts=',conflicts.length);
console.log('byCategory=',JSON.stringify(byCategory));
if(context.window.HW_PRICE_PACK)console.log('basePricePack=',JSON.stringify({attempted:context.window.HW_PRICE_PACK.attempted,applied:context.window.HW_PRICE_PACK.applied}));
if(context.window.HW_PRICE_PACK&&context.window.HW_PRICE_PACK.applied!==context.window.HW_PRICE_PACK.attempted){errors.push(`base price pack only applied ${context.window.HW_PRICE_PACK.applied}/${context.window.HW_PRICE_PACK.attempted}`);}
if(DB.length<480)errors.push(`catalog expansion unexpectedly small: ${DB.length}`);
if(priced.length<35)errors.push(`price coverage unexpectedly small: ${priced.length}`);
if(errors.length){console.error('VALIDATION FAILED');errors.slice(0,100).forEach(e=>console.error('-',e));process.exit(1);}else console.log('VALIDATION PASSED');
