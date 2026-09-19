/* SmartPCBuilder v0.6.1 China-market price snapshot pack
 * Collected: 2026-09-19.
 * A price is attached only to an exact local SKU/name. Single-source platform prices are labeled as snapshots,
 * not as a universal real-time market average. Conflicting current sources are stored as conflicts instead of a fake single price.
 */
(function(){
  const DB=window.HW_DB||[];
  const SRC=window.HW_SOURCES=window.HW_SOURCES||{};
  const S={
    p12400f:['ZOL i5-12400F 比价','https://detail.zol.com.cn/1339/1338644/price.shtml','京东自营旗舰店采集价 ¥989。'],
    p14400f:['ZOL i5-14400F 比价','https://detail.zol.com.cn/1973/1972500/price.shtml','京东自营旗舰店采集价 ¥1179。'],
    p14600kf:['ZOL i5-14600KF 比价','https://detail.zol.com.cn/1930/1929615/price.shtml','英特尔京东自营旗舰店采集价 ¥1619。'],
    p14700kf:['ZOL i7-14700KF 比价','https://detail.zol.com.cn/1930/1929613/price.shtml','英特尔京东自营旗舰店采集价 ¥2419。'],
    p245k:['ZOL Core Ultra 5 245K 列表','https://detail.zol.com.cn/cpu/500_s8125/new_pic.html','采集时显示京东在售 ¥1469。'],
    p245kf:['ZOL Core Ultra 5 245KF 列表','https://detail.zol.com.cn/cpu/1600_s6219_s10569_s10583/cheap_pic.html','采集时显示京东在售 ¥1399。'],
    p265k:['ZOL Core Ultra 7 265K 比价','https://detail.zol.com.cn/2111/2110067/price_2.shtml','英特尔京东自营旗舰店采集价 ¥1969。'],
    p265kf:['ZOL Core Ultra 7 265KF 列表','https://detail.zol.com.cn/cpu/500_s8125/new_pic.html','采集时显示京东在售 ¥1869。'],
    p7800x3d:['ZOL Ryzen 7 7800X3D 全网比价','https://wap.zol.com.cn/1441/1440585/pk_price.html','采集时显示京东商城 ¥2069。'],
    p9900x:['ZOL Ryzen 9 9900X 比价','https://detail.zol.com.cn/2019/2018965/price.shtml?via=touch-bottom','AMD京东自营旗舰店采集价 ¥2899。'],
    p9950x:['ZOL Ryzen 9 9950X 比价','https://detail.zol.com.cn/2019/2018964/price.shtml?via=touch-bottom','AMD京东自营旗舰店采集价 ¥3699。'],
    pMsiB650Mortar:['ZOL 微星 MAG B650M MORTAR WIFI','https://detail.zol.com.cn/motherboard/index1430732.shtml','采集时显示京东 ¥1099。'],
    pAsusB650Tuf:['ZOL 华硕 TUF GAMING B650M-PLUS WIFI','https://detail.zol.com.cn/motherboard/index1430243.shtml','采集时显示淘宝 ¥730；单平台快照，非市场均价。'],
    pGigabyteB650Conflict:['ZOL 技嘉 B650M AORUS ELITE AX','https://wap.zol.com.cn/1431/1430317/index.html','当前不同 ZOL 页面出现约 ¥729.6 与 ¥1149 两个报价，标记冲突而不生成单一价格。'],
    pColorful5070:['ZOL 七彩虹 RTX 5070 型号目录','https://detail.zol.com.cn/vga/colorful/4_s11071_s10756/pic.html','采集日期附近列出多款七彩虹 RTX 5070 的市场参考价。'],
    pGskill6000:['ZOL 芝奇焰锋戟 DDR5 6000','https://detail.zol.com.cn/series/3/10854718_1.html','采集时 32GB(2×16GB) C30/C36 市场参考价均为 ¥999。'],
    pLexarD5:['ZOL 雷克沙 DDR5 型号目录','https://detail.zol.com.cn/memory/lexar/s5974/new_pic.html','采集时 ARES 6000 C28 32GB 为 ¥799。'],
    pLexarThor:['ZOL 雷克沙内存专区','https://memory.zol.com.cn/manu_1253.shtml','采集时 THOR 雷神之锤 DDR5 6000 32GB CL30 为 ¥659。'],
    pGloway:['ZOL 光威/佰维 DDR5 型号目录','https://detail.zol.com.cn/memory/biwinsemicon_gloway_vaseky_fjeek/pic.html','采集时光威天策 32GB ¥649、龙武 32GB ¥689、佰维 DW100 48GB ¥1189。'],
    pKingston6000:['ZOL 金士顿 FURY Beast 6000 32GB','https://wap.zol.com.cn/1417/1416323/price.html','采集时页面到手参考价 ¥1398；与其他渠道报价差异较大，因此可信度标为中。'],
    p990pro2t:['ZOL Samsung 990 PRO 2TB','https://detail.zol.com.cn/1426/1425886/price.shtml','采集时当地参考价 ¥1119；电商展示价差异明显，因此仅作为市场参考。'],
    pSn850x2t:['ZOL WD_BLACK SN850X 2TB','https://detail.zol.com.cn/1428/1427477/price_1.shtml','采集时当地参考价 ¥999；电商展示价差异明显，因此仅作为市场参考。'],
    pSeasonic750:['ZOL 海韵 FOCUS GX-750','https://detail.zol.com.cn/power/index1379618.shtml','采集时京东 ¥783。'],
    pSeasonic850:['ZOL 海韵 FOCUS GX-850 列表','https://detail.zol.com.cn/power/seasonic/s6568/nanyang/new_pic.html','采集时市场参考价 ¥1079。'],
    pCorsair850e:['ZOL 海盗船 RM850e','https://wap.zol.com.cn/1915/1914231/index.html','采集时京东 ¥949。'],
    pTrCooler:['ZOL 利民风冷目录','https://detail.zol.com.cn/cooling_product/thermalright/s1272/huzhou/good_pic.html','采集时 PA120 SE ARGB 京东 ¥169、Phantom Spirit 120 SE BLACK 京东 ¥199。'],
    pAk620DigitalG2:['ZOL 九州风神 AK620 数显 G2','https://detail.zol.com.cn/cooling_product/index2153300.shtml','采集时京东 ¥404。'],
    pAk620G2:['ZOL 九州风神 AK620 G2 暗夜','https://detail.zol.com.cn/cooling_product/index2153301.shtml','采集时京东 ¥354。'],
    pCh560:['ZOL 九州风神 CH560 机箱目录','https://detail.zol.com.cn/case/deepcool/ziyang/pic.html','采集时 CH560 市场参考价 ¥624。'],
    pNzxtH5:['ZOL NZXT H5 FLOW','https://wap.zol.com.cn/2105/2104917/index.html','采集时京东 ¥459。']
  };
  Object.entries(S).forEach(([id,v])=>SRC[id]={title:v[0],url:v[1],date:'2026-09-19',kind:'market-snapshot',note:v[2]});

  const P=[
    ['Intel Core i5-12400F',989,'p12400f','京东自营','平台快照','high'],
    ['Intel Core i5-14400F',1179,'p14400f','京东自营','平台快照','high'],
    ['Intel Core i5-14600KF',1619,'p14600kf','京东自营','平台快照','high'],
    ['Intel Core i7-14700KF',2419,'p14700kf','京东自营','平台快照','high'],
    ['Intel Core Ultra 5 245K',1469,'p245k','京东','平台快照','high'],
    ['Intel Core Ultra 5 245KF',1399,'p245kf','京东','平台快照','high'],
    ['Intel Core Ultra 7 265K',1969,'p265k','京东自营','平台快照','high'],
    ['Intel Core Ultra 7 265KF',1869,'p265kf','京东','平台快照','high'],
    ['AMD Ryzen 7 7800X3D',2069,'p7800x3d','京东','平台快照','high'],
    ['AMD Ryzen 9 9900X',2899,'p9900x','京东自营','平台快照','high'],
    ['AMD Ryzen 9 9950X',3699,'p9950x','京东自营','平台快照','high'],
    ['MAG B650M MORTAR WIFI',1099,'pMsiB650Mortar','京东','平台快照','high'],
    ['TUF GAMING B650M-PLUS WIFI',730,'pAsusB650Tuf','淘宝','单平台快照','medium'],
    ['Battle-AX GeForce RTX 5070 豪华版 12GB',6149,'pColorful5070','ZOL','市场参考价','medium'],
    ['Battle-AX GeForce RTX 5070 豪华版 V2 12GB',5549,'pColorful5070','ZOL','市场参考价','medium'],
    ['iGame GeForce RTX 5070 Ultra W OC 12GB',6499,'pColorful5070','ZOL','市场参考价','medium'],
    ['iGame GeForce RTX 5070 Vulcan X OC 12GB',7099,'pColorful5070','ZOL','市场参考价','medium'],
    ['芝奇 焰锋戟 DDR5 6000 32GB(2×16GB) C30',999,'pGskill6000','ZOL','市场参考价','medium'],
    ['芝奇 焰锋戟 DDR5 6000 32GB(2×16GB) C36',999,'pGskill6000','ZOL','市场参考价','medium'],
    ['雷克沙 ARES 战神之翼 DDR5 6000 32GB(16GB×2) C28 黑色',799,'pLexarD5','ZOL','市场参考价','medium'],
    ['雷克沙 ARES 战神之翼 DDR5 6000 32GB(16GB×2) C28 银色',799,'pLexarD5','ZOL','市场参考价','medium'],
    ['雷克沙 THOR 雷神之锤 DDR5 6000 32GB(16GB×2) CL30 黑色',659,'pLexarThor','ZOL','市场参考价','medium'],
    ['雷克沙 THOR 雷神之锤 DDR5 6000 32GB(16GB×2) CL30 白色',659,'pLexarThor','ZOL','市场参考价','medium'],
    ['光威 天策 DDR5 6000 32GB(16GB×2)',649,'pGloway','ZOL','市场参考价','medium'],
    ['光威 龙武 DDR5 6000 32GB(16GB×2) C30',689,'pGloway','ZOL','市场参考价','medium'],
    ['佰维 DW100 时空行者 DDR5 6000 C28 48GB(2×24GB) 黑色',1189,'pGloway','ZOL','市场参考价','medium'],
    ['金士顿 FURY Beast 32GB(2×16GB) DDR5 6000 KF560C40BBK2-32',1398,'pKingston6000','ZOL','市场参考价','medium'],
    ['Samsung 990 PRO 2TB',1119,'p990pro2t','ZOL','市场参考价','medium'],
    ['WD_BLACK SN850X 2TB',999,'pSn850x2t','ZOL','市场参考价','medium'],
    ['Seasonic FOCUS GX-750 750W',783,'pSeasonic750','京东','平台快照','high'],
    ['Seasonic FOCUS GX-850 850W',1079,'pSeasonic850','ZOL','市场参考价','medium'],
    ['CORSAIR RM850e 850W',949,'pCorsair850e','京东','平台快照','high'],
    ['Thermalright Phantom Spirit 120 SE BLACK',199,'pTrCooler','京东','平台快照','high'],
    ['Thermalright PA120 SE ARGB',169,'pTrCooler','京东','平台快照','high'],
    ['DeepCool AK620 DIGITAL G2',404,'pAk620DigitalG2','京东','平台快照','high'],
    ['DeepCool AK620 G2',354,'pAk620G2','京东','平台快照','high'],
    ['DeepCool CH560',624,'pCh560','ZOL','市场参考价','medium'],
    ['NZXT H5 Flow',459,'pNzxtH5','京东','平台快照','high']
  ];
  const applied=[];
  P.forEach(([name,price,src,platform,type,confidence])=>{
    const hits=DB.filter(x=>x.name===name);
    if(hits.length===1){const x=hits[0];x.price=price;x.priceVerified=true;x.priceDate='2026-09-19';x.pricePlatform=platform;x.priceType=type;x.priceConfidence=confidence;x.sourceIds=[...new Set([...(x.sourceIds||[]),src])];applied.push(name);}
  });

  // Store current-source conflicts instead of choosing whichever number looks nicer.
  const conflict=DB.find(x=>x.name==='B650M AORUS ELITE AX');
  if(conflict){conflict.price=null;conflict.priceVerified=false;conflict.priceStatus='conflict';conflict.priceRange=[730,1149];conflict.priceDate='2026-09-19';conflict.sourceIds=[...new Set([...(conflict.sourceIds||[]),'pGigabyteB650Conflict'])];}

  window.HW_PRICE_PACK={version:'0.6.1',date:'2026-09-19',attempted:P.length,applied:applied.length,appliedNames:applied};
})();
