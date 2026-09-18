global.window={};
require('../app/src/main/assets/hardware-data.js');
const db=window.HW_DB||[];
const src=window.HW_SOURCES||{};
const errors=[];
const ids=new Set();
for(const x of db){
  if(!x.id)errors.push(`missing id: ${x.name}`);
  if(ids.has(x.id))errors.push(`duplicate id: ${x.id}`); else ids.add(x.id);
  if(!x.cat||!['cpu','board','gpu','ram','ssd','psu','cooler','case'].includes(x.cat))errors.push(`invalid cat: ${x.name}`);
  if(!x.name||!x.brand)errors.push(`missing name/brand: ${x.id}`);
  for(const s of (x.sourceIds||[]))if(!src[s])errors.push(`missing source ${s}: ${x.name}`);
  if(x.catalogVerified&&!(x.sourceIds||[]).length)errors.push(`catalogVerified without source: ${x.name}`);
  if(x.priceVerified){
    if(typeof x.price!=='number'||x.price<=0)errors.push(`bad verified price: ${x.name}`);
    if(!x.priceDate)errors.push(`verified price missing date: ${x.name}`);
    if(!(x.sourceIds||[]).length)errors.push(`verified price missing source: ${x.name}`);
  }
}
const byCat={};const brands=new Set();for(const x of db){byCat[x.cat]=(byCat[x.cat]||0)+1;brands.add(x.brand)}
console.log('SmartPCBuilder database validation');
console.log('records=',db.length,'brands=',brands.size,'official=',db.filter(x=>x.catalogVerified).length,'priced=',db.filter(x=>x.priceVerified).length);
console.log('byCategory=',JSON.stringify(byCat));
if(db.length<200)errors.push(`catalog unexpectedly small: ${db.length}`);
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log('DATA VALIDATION PASSED');
