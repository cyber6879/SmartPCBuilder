/* Normalize evidence flags so market catalog evidence is never mislabeled as manufacturer confirmation. */
(function(){
 const DB=window.HW_DB||[],SRC=window.HW_SOURCES||{};
 DB.forEach(x=>{
   const sources=(x.sourceIds||[]).map(id=>SRC[id]).filter(Boolean);
   const hasOfficial=sources.some(s=>s.kind==='official');
   const hasMarketCatalog=sources.some(s=>s.kind==='market-catalog');
   if(x.catalogVerified&&!hasOfficial)x.catalogVerified=false;
   if(hasOfficial)x.catalogVerified=true;
   if(hasMarketCatalog&&!hasOfficial)x.marketCatalogVerified=true;
   if(x.catalogVerified)x.confidence=x.verifiedSpecs?'high':'medium';
   else if(x.marketCatalogVerified&&x.confidence!=='high')x.confidence='medium';
 });
})();
