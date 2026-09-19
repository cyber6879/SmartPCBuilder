/* SmartPCBuilder v0.6.1 domestic-brand market snapshot pack */
(function(){
 const DB=window.HW_DB=window.HW_DB||[],SRC=window.HW_SOURCES=window.HW_SOURCES||{};
 Object.assign(SRC,{
  pAsgard6000:{title:'ZOL 阿斯加特博拉琪Ⅱ代 DDR5 6000 32GB',url:'https://detail.zol.com.cn/2116/2115760/price.shtml',date:'2026-09-11',kind:'market-reference',note:'页面列出博拉琪Ⅱ代 DDR5 6000 32GB(2×16GB) 参考价 ¥859；仅1家商家报价，按市场参考处理。'},
  pAsgard5600:{title:'ZOL 阿斯加特 DDR5 型号目录',url:'https://detail.zol.com.cn/memory/asgardasgard/s5974_s11120_s11120/new_pic.html',date:'2026-09-11',kind:'market-reference',note:'页面列出海拉 DDR5 5600 C46 32GB(2×16GB) 参考价 ¥1199。'},
  pAsgard6800:{title:'ZOL 阿斯加特 DDR5 型号目录',url:'https://detail.zol.com.cn/memory/asgardasgard/s5974_s11120_s11120/new_pic.html',date:'2026-09-11',kind:'market-reference',note:'页面列出博拉琪Ⅱ代 DDR5 6800 32GB(2×16GB) 参考价 ¥899。'},
  pAsgard7200:{title:'ZOL 阿斯加特 DDR5 型号目录',url:'https://detail.zol.com.cn/memory/asgardasgard/s5974_s11120_s11120/new_pic.html',date:'2026-09-11',kind:'market-reference',note:'页面列出博拉琪Ⅱ代 DDR5 7200 32GB(2×16GB) 参考价 ¥999。'},
  pNetacNv7000t:{title:'ZOL 朗科绝影 NV7000-t 2TB 比价',url:'https://detail.zol.com.cn/1949/1948033/price.shtml',date:'2026-09-19',kind:'market-snapshot',note:'页面显示朗科京东自营官方旗舰店 ¥1999；当地参考价 ¥2499，两者差异较大，程序保存京东平台快照并显示来源。'},
  pSamaXp850:{title:'ZOL 先马 XP850 悟空版',url:'https://detail.zol.com.cn/power/sama/300_p39161_s3765/new_pic.html',date:'2026-09-12',kind:'market-snapshot',note:'页面显示京东在售 ¥499，页面参考价 ¥529；程序采用明确标注的京东平台快照。'},
  pSamaXp1000:{title:'ZOL 先马 XP1000 悟空版',url:'https://detail.zol.com.cn/power/sama/300_p39161_s3765/new_pic.html',date:'2026-09-12',kind:'market-snapshot',note:'页面显示京东在售 ¥549，页面参考价 ¥569；程序采用明确标注的京东平台快照。'},
  pJonsboTk2:{title:'ZOL 乔思伯 TK-2',url:'https://detail.zol.com.cn/case/index1981742.shtml',date:'2026-09-19',kind:'market-snapshot',note:'页面显示参考报价 ¥749，京东 ¥749、天猫 ¥772。程序保存京东 ¥749 平台快照。'},
  pJonsboZ20:{title:'ZOL 乔思伯 Z20',url:'https://detail.zol.com.cn/case/index1970858.shtml',date:'2026-09-19',kind:'market-snapshot',note:'页面显示京东 ¥379、天猫 ¥419，参考区间 ¥379-419。程序保存京东 ¥379 平台快照并保留区间。'},
  pCmLegacy750:{title:'ZOL 酷冷至尊 750W 电源目录',url:'https://detail.zol.com.cn/power/coolermaster/p19386/cheap_pic.html',date:'2026-09-11',kind:'market-catalog',note:'页面列出 V750 Gold、V750 Gold V2、SFX Gold V750 等旧/不同代产品；不用于给当前 ATX3.1 V SFX Gold 750 强行套价。'}
 });
 let seq=0;const slug=s=>String(s).toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g,'-').replace(/^-|-$/g,'').slice(0,60);
 function marketSku(cat,brand,name,src,opt={}){let x=DB.find(v=>v.cat===cat&&v.name===name);if(x)return x;x=Object.assign({id:'market-'+cat+'-'+slug(name)+'-'+(++seq),cat,brand,name,aliases:[],price:null,priceVerified:false,priceDate:null,sourceIds:[src],catalogVerified:false,marketCatalogVerified:true,verifiedSpecs:!!opt.verifiedSpecs,confidence:'medium',recordLevel:'sku',market:'市场目录已确认'},opt);DB.push(x);return x;}
 function price(x,amount,src,platform,type='市场参考价',confidence='medium',sourceDate=null,range=null){if(!x)return;x.price=amount;x.priceVerified=true;x.priceDate='2026-09-19';x.priceSourceDate=sourceDate;x.pricePlatform=platform;x.priceType=type;x.priceConfidence=confidence;x.sourceIds=[...new Set([...(x.sourceIds||[]),src])];if(range)x.priceRange=range;}

 let x;
 x=marketSku('ram','阿斯加特 Asgard','阿斯加特 博拉琪Ⅱ代 DDR5 6000 32GB(2×16GB)',['pAsgard6000'][0],{memory:'DDR5',verifiedSpecs:true,tier:5});price(x,859,'pAsgard6000','ZOL','市场参考价','medium','2026-09-11');
 x=marketSku('ram','阿斯加特 Asgard','阿斯加特 海拉 DDR5 5600 C46 32GB(2×16GB)','pAsgard5600',{memory:'DDR5',verifiedSpecs:true,tier:4});price(x,1199,'pAsgard5600','ZOL','市场参考价','medium','2026-09-11');
 x=marketSku('ram','阿斯加特 Asgard','阿斯加特 博拉琪Ⅱ代 DDR5 6800 32GB(2×16GB)','pAsgard6800',{memory:'DDR5',verifiedSpecs:true,tier:5});price(x,899,'pAsgard6800','ZOL','市场参考价','medium','2026-09-11');
 x=marketSku('ram','阿斯加特 Asgard','阿斯加特 博拉琪Ⅱ代 DDR5 7200 32GB(2×16GB)','pAsgard7200',{memory:'DDR5',verifiedSpecs:true,tier:6});price(x,999,'pAsgard7200','ZOL','市场参考价','medium','2026-09-11');
 x=marketSku('ssd','朗科 Netac','朗科 绝影 NV7000-t 2TB','pNetacNv7000t',{tier:5});price(x,1999,'pNetacNv7000t','京东自营','平台快照','high','2026-09-19');

 x=DB.find(v=>v.name==='先马 XP850悟空版 850W');price(x,499,'pSamaXp850','京东','平台快照','high','2026-09-12');
 x=DB.find(v=>v.name==='先马 XP1000悟空版 1000W');price(x,549,'pSamaXp1000','京东','平台快照','high','2026-09-12');
 x=DB.find(v=>v.name==='乔思伯 TK-2');price(x,749,'pJonsboTk2','京东','平台快照','high','2026-09-19',[749,772]);
 x=DB.find(v=>v.name==='乔思伯 Z20');price(x,379,'pJonsboZ20','京东','平台快照','high','2026-09-19',[379,419]);

 // Deliberately do not apply pCmLegacy750 to the current ATX 3.1 V SFX model because generation is ambiguous.
 if(window.HW_META){window.HW_META.marketDomestic='market-domestic-v061.js';}
})();
