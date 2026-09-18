/* SmartPCBuilder v0.6.1 extra local catalog
 * This file only adds records backed by an official manufacturer page or a clearly identified market catalog page.
 * catalogVerified=true means the exact product/series is confirmed by a manufacturer source.
 * marketCatalogVerified=true means a concrete market catalog page confirms the SKU, but manufacturer-level confirmation is not yet attached.
 */
(function(){
  const DB=window.HW_DB=window.HW_DB||[];
  const SRC=window.HW_SOURCES=window.HW_SOURCES||{};
  Object.assign(SRC,{
    lexarRamOfficial:{title:'Lexar 雷克沙 DDR5 内存官方产品页',url:'https://www.lexar.com/zh-hans/products/Lexar-ARES-DDR5-OC-Desktop-Memory/',date:'2026-09-19',kind:'official',note:'雷克沙官方 ARES DDR5 台式机内存页面，确认系列及32GB(16GB×2)等容量存在。'},
    klevvOfficial:{title:'KLEVV 科赋内存/SSD 官方目录',url:'https://www.klevv.com/kcn/product/memory',date:'2026-09-19',kind:'official',note:'KLEVV 官方目录列出 URBANE V RGB、CRAS V RGB、BOLT V、FIT V 及多款 SSD 系列。'},
    kioxiaOfficial:{title:'KIOXIA 消费级 SSD 官方目录',url:'https://www.kioxia.com/ja-jp/personal/ssd.html',date:'2026-09-19',kind:'official',note:'KIOXIA 官方消费级 SSD 页面列出 EXCERIA PRO 与 EXCERIA PLUS G4 等容量和规格。'},
    solidigmP44:{title:'Solidigm P44 Pro 官方产品资料',url:'https://news.solidigm.com/en-WW/219296-solidigm-introduces-the-p44-pro-the-world-s-premier-enthusiast-solid-state-drive-ssd/',date:'2026-09-19',kind:'official',note:'Solidigm 官方资料确认 P44 Pro 512GB/1TB/2TB。'},
    adataSsdOfficial:{title:'ADATA/XPG SSD 官方目录',url:'https://www.adata.com/sg/consumer/category/11/',date:'2026-09-19',kind:'official',note:'ADATA 官方目录列出 LEGEND 960 MAX、LEGEND 960、GAMMIX S70 BLADE 等容量。'},
    teamMp44s:{title:'TEAMGROUP MP44S 2TB 官方产品页',url:'https://www.teamgroupinc.com/en/product-detail/ssd/TEAMGROUP/mp44s/mp44s-TM5FF3002T0C101/',date:'2026-09-19',kind:'official',note:'TEAMGROUP 官方 MP44S M.2 PCIe 4.0 SSD 2TB 产品页。'},
    fspRetail:{title:'FSP 全汉零售电源官方目录',url:'https://www.fsp-group.com/download/catalog/retail.pdf',date:'2026-09-19',kind:'official',note:'FSP 官方零售目录，确认 Hydro G PRO / Hydro GT PRO 等 ATX 3.1 电源系列与功率。'},
    deepcoolCh560:{title:'DeepCool CH560 官方产品页',url:'https://global.deepcool.com/products/Cases/CH560-New-Generation-of-Airflow-Case/2023/17101.shtml',date:'2026-09-19',kind:'official',note:'DeepCool 官方给出 CH560 尺寸、GPU 380mm 限长、CPU 散热 175mm 限高及冷排支持。'},
    zolRamLexar:{title:'ZOL 雷克沙 DDR5 型号目录',url:'https://detail.zol.com.cn/memory/lexar/s5974/new_pic.html',date:'2026-09-19',kind:'market-catalog',note:'采集时列出 ARES 6000 C28 等具体套装型号。'},
    zolRamGloway:{title:'ZOL 光威/佰维 DDR5 型号目录',url:'https://detail.zol.com.cn/memory/biwinsemicon_gloway_vaseky_fjeek/pic.html',date:'2026-09-19',kind:'market-catalog',note:'采集时列出光威天策/龙武与佰维 DW100 等具体型号。'},
    zolRamGskill:{title:'ZOL 芝奇焰锋戟 DDR5 型号目录',url:'https://detail.zol.com.cn/series/3/10854718_1.html',date:'2026-09-19',kind:'market-catalog',note:'采集时列出 DDR5-6000 32GB(2×16GB) C30/C36 等型号。'},
    zolRamKingston:{title:'ZOL 金士顿 FURY Beast DDR5 6000 型号页',url:'https://detail.zol.com.cn/memory/index1416323.shtml',date:'2026-09-19',kind:'market-catalog',note:'页面确认 KF560C40BBK2-32 32GB(2×16GB) 型号。'},
    zolCoolerTR:{title:'ZOL 利民风冷型号目录',url:'https://detail.zol.com.cn/cooling_product/thermalright/s1272/huzhou/good_pic.html',date:'2026-09-19',kind:'market-catalog',note:'采集时列出 Phantom Spirit 120 SE BLACK、PA120 SE ARGB 等具体型号。'},
    zolCoolerDeepcool:{title:'ZOL 九州风神 AK620 G2 型号页',url:'https://detail.zol.com.cn/cooling_product/index2153300.shtml',date:'2026-09-19',kind:'market-catalog',note:'采集时确认 AK620 G2 数显版本型号。'}
  });
  let seq=0;
  const slug=s=>String(s).toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g,'-').replace(/^-|-$/g,'').slice(0,72);
  function add(cat,brand,name,sourceIds,opt={}){
    if(DB.some(x=>x.cat===cat&&String(x.name).toLowerCase()===String(name).toLowerCase())) return;
    DB.push(Object.assign({
      id:'extra-'+cat+'-'+slug(brand)+'-'+slug(name)+'-'+(++seq),cat,brand,name,aliases:[],price:null,priceVerified:false,priceDate:null,
      sourceIds:sourceIds||[],catalogVerified:!!opt.catalogVerified,marketCatalogVerified:!!opt.marketCatalogVerified,
      verifiedSpecs:!!opt.verifiedSpecs,confidence:opt.catalogVerified?'high':opt.marketCatalogVerified?'medium':'pending',recordLevel:opt.recordLevel||'sku',market:opt.catalogVerified?'官方目录已确认':opt.marketCatalogVerified?'市场目录已确认':'待核验'
    },opt));
  }
  function addMany(cat,brand,names,src,opt={}){names.forEach(n=>add(cat,brand,n,[src],Object.assign({catalogVerified:true},opt)));}

  // Lexar exact/current families and concrete China-market SKUs.
  addMany('ram','雷克沙 Lexar',['Lexar ARES RGB 2nd Gen DDR5','Lexar ARES RGB DDR5','Lexar ARES DDR5','Lexar THOR OC DDR5','Lexar THOR 2nd Gen DDR5','Lexar THOR RGB 2nd Gen DDR5','Lexar DDR5 UDIMM Desktop Memory'],'lexarRamOfficial',{memory:'DDR5',verifiedSpecs:true,recordLevel:'series',tier:4});
  add('ram','雷克沙 Lexar','雷克沙 ARES 战神之翼 DDR5 6000 32GB(16GB×2) C28 黑色',['zolRamLexar'],{memory:'DDR5',marketCatalogVerified:true,verifiedSpecs:true,tier:5,aliases:['lexar ares 6000 c28 32g black']});
  add('ram','雷克沙 Lexar','雷克沙 ARES 战神之翼 DDR5 6000 32GB(16GB×2) C28 银色',['zolRamLexar'],{memory:'DDR5',marketCatalogVerified:true,verifiedSpecs:true,tier:5,aliases:['lexar ares 6000 c28 32g silver']});
  add('ram','雷克沙 Lexar','雷克沙 THOR 雷神之锤 DDR5 6000 32GB(16GB×2) CL30 黑色',['zolRamLexar'],{memory:'DDR5',marketCatalogVerified:true,verifiedSpecs:true,tier:4});
  add('ram','雷克沙 Lexar','雷克沙 THOR 雷神之锤 DDR5 6000 32GB(16GB×2) CL30 白色',['zolRamLexar'],{memory:'DDR5',marketCatalogVerified:true,verifiedSpecs:true,tier:4});

  // KLEVV official families.
  addMany('ram','科赋 KLEVV',['KLEVV URBANE V RGB DDR5','KLEVV CRAS V RGB DDR5','KLEVV CRAS V RGB ROG DDR5','KLEVV BOLT V DDR5','KLEVV FIT V DDR5','KLEVV Standard DDR5 UDIMM','KLEVV BOLT X DDR4'],'klevvOfficial',{memory:'DDR5',verifiedSpecs:true,recordLevel:'series',tier:4});
  addMany('ssd','科赋 KLEVV',['KLEVV GENUINE G560','KLEVV CRAS C930','KLEVV CRAS C925G','KLEVV CRAS C910G','KLEVV CRAS C715','KLEVV NEO N410+','KLEVV NEO N400'],'klevvOfficial',{recordLevel:'series',tier:5});

  // More concrete Chinese-market memory SKUs. Market-catalog confirmed, not mislabeled as manufacturer-confirmed.
  add('ram','芝奇 G.SKILL','芝奇 焰锋戟 DDR5 6000 32GB(2×16GB) C30',['zolRamGskill'],{memory:'DDR5',marketCatalogVerified:true,verifiedSpecs:true,tier:5});
  add('ram','芝奇 G.SKILL','芝奇 焰锋戟 DDR5 6000 32GB(2×16GB) C36',['zolRamGskill'],{memory:'DDR5',marketCatalogVerified:true,verifiedSpecs:true,tier:4});
  add('ram','金士顿 Kingston','金士顿 FURY Beast 32GB(2×16GB) DDR5 6000 KF560C40BBK2-32',['zolRamKingston'],{memory:'DDR5',marketCatalogVerified:true,verifiedSpecs:true,tier:4});
  add('ram','光威 GLOWAY','光威 天策 DDR5 6000 32GB(16GB×2)',['zolRamGloway'],{memory:'DDR5',marketCatalogVerified:true,verifiedSpecs:true,tier:4});
  add('ram','光威 GLOWAY','光威 龙武 DDR5 6000 32GB(16GB×2) C30',['zolRamGloway'],{memory:'DDR5',marketCatalogVerified:true,verifiedSpecs:true,tier:5});
  add('ram','佰维 BIWIN','佰维 DW100 时空行者 DDR5 6000 C28 48GB(2×24GB) 黑色',['zolRamGloway'],{memory:'DDR5',marketCatalogVerified:true,verifiedSpecs:true,tier:5});

  // SSDs — exact capacities where official sources explicitly enumerate them.
  addMany('ssd','铠侠 KIOXIA',['KIOXIA EXCERIA PRO 1TB','KIOXIA EXCERIA PRO 2TB','KIOXIA EXCERIA PLUS G4 1TB','KIOXIA EXCERIA PLUS G4 2TB'],'kioxiaOfficial',{verifiedSpecs:true,recordLevel:'sku',tier:6});
  addMany('ssd','Solidigm',['Solidigm P44 Pro 512GB','Solidigm P44 Pro 1TB','Solidigm P44 Pro 2TB'],'solidigmP44',{verifiedSpecs:true,recordLevel:'sku',tier:6});
  addMany('ssd','威刚 ADATA',['ADATA LEGEND 960 MAX 1TB','ADATA LEGEND 960 MAX 2TB','ADATA LEGEND 960 MAX 4TB','ADATA LEGEND 960 1TB','ADATA LEGEND 960 2TB','ADATA XPG GAMMIX S70 BLADE 1TB','ADATA XPG GAMMIX S70 BLADE 2TB','ADATA XPG GAMMIX S70 BLADE 4TB'],'adataSsdOfficial',{verifiedSpecs:true,recordLevel:'sku',tier:5});
  addMany('ssd','十铨 TEAMGROUP',['TEAMGROUP MP44S 2TB'],'teamMp44s',{verifiedSpecs:true,recordLevel:'sku',tier:4});
  add('ssd','三星 Samsung','Samsung 990 PRO 2TB',['samsungSsd'],{catalogVerified:true,recordLevel:'sku',tier:6});
  add('ssd','西部数据 WD','WD_BLACK SN850X 2TB',['wdSsd'],{catalogVerified:true,recordLevel:'sku',tier:6});

  // FSP official ATX 3.1 families.
  ['FSP VITA GM 650W','FSP VITA GM 750W','FSP VITA GM 850W','FSP VITA GM 1000W','FSP Hydro G PRO 850W','FSP Hydro G PRO 1000W','FSP Hydro G PRO 1200W','FSP Hydro GT PRO 850W','FSP Hydro GT PRO 1000W','FSP Hydro Ti PRO 850W','FSP Hydro Ti PRO 1000W','FSP Hydro PTM PRO 1350W','FSP Hydro PTM PRO 1650W'].forEach(n=>{const m=n.match(/(\d{3,4})W/);add('psu','全汉 FSP',n,['fspRetail'],{catalogVerified:true,verifiedSpecs:true,watts:m?+m[1]:null,recordLevel:'sku',tier:m?Math.max(3,Math.min(9,Math.round(+m[1]/150))):4});});

  // DeepCool case exact specs improve real compatibility checking.
  add('case','九州风神 DeepCool','DeepCool CH560',['deepcoolCh560'],{catalogVerified:true,verifiedSpecs:true,gpuClearance:380,coolerHeight:175,recordLevel:'sku',tier:4});
  add('case','九州风神 DeepCool','DeepCool CH560 WH',['deepcoolCh560'],{catalogVerified:true,verifiedSpecs:true,gpuClearance:380,coolerHeight:175,recordLevel:'sku',tier:4});
  add('case','九州风神 DeepCool','DeepCool CH560 DIGITAL',['deepcoolCh560'],{catalogVerified:true,verifiedSpecs:true,gpuClearance:380,coolerHeight:175,recordLevel:'sku',tier:5});
  add('case','九州风神 DeepCool','DeepCool CH560 DIGITAL WH',['deepcoolCh560'],{catalogVerified:true,verifiedSpecs:true,gpuClearance:380,coolerHeight:175,recordLevel:'sku',tier:5});

  // Exact cooler variants visible in current China-market catalog snapshots.
  add('cooler','利民 Thermalright','Thermalright Phantom Spirit 120 SE BLACK',['zolCoolerTR'],{marketCatalogVerified:true,verifiedSpecs:true,height:154,recordLevel:'sku',tier:5});
  add('cooler','利民 Thermalright','Thermalright PA120 SE ARGB',['zolCoolerTR'],{marketCatalogVerified:true,verifiedSpecs:true,height:157,recordLevel:'sku',tier:5});
  add('cooler','九州风神 DeepCool','DeepCool AK620 DIGITAL G2',['zolCoolerDeepcool'],{marketCatalogVerified:true,recordLevel:'sku',tier:6});
  add('cooler','九州风神 DeepCool','DeepCool AK620 G2',['zolCoolerDeepcool'],{marketCatalogVerified:true,recordLevel:'sku',tier:6});

  // Search aliases.
  DB.forEach(x=>{if(!Array.isArray(x.aliases))x.aliases=[];const simple=(x.name+' '+x.brand).toLowerCase().replace(/[™®]/g,'').replace(/\s+/g,' ').trim();if(!x.aliases.includes(simple))x.aliases.push(simple);});
  if(window.HW_META){window.HW_META.version='0.6.1';window.HW_META.extraCatalog='catalog-extra-v061.js';}
})();
