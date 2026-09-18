/* SmartPCBuilder v0.6 local catalog
 * Rule: model existence/spec fields come from the cited manufacturer/catalog source.
 * price=null means NO reliable China-market price snapshot has been attached yet.
 * Never convert catalog existence into a price/review claim.
 */
window.HW_SOURCES={
  amd9000:{title:'AMD Ryzen 9000 官方产品资料',url:'https://www.amd.com/en/products/processors/desktops/ryzen.html',date:'2026-09-19',kind:'official',note:'AMD 官方处理器产品资料。'},
  amd7000:{title:'AMD Ryzen 7000 官方产品资料',url:'https://www.amd.com/en/products/processors/desktops/ryzen.html',date:'2026-09-19',kind:'official',note:'AMD 官方处理器产品资料。'},
  amdAM4:{title:'AMD Ryzen AM4 官方产品资料',url:'https://www.amd.com/en/products/processors/desktops/ryzen.html',date:'2026-09-19',kind:'official',note:'AMD 官方处理器产品资料。'},
  intel200:{title:'Intel Core Ultra Desktop Series 2 官方支持资料',url:'https://www.intel.com/content/www/us/en/support/articles/000099656/processors.html',date:'2026-09-19',kind:'official',note:'Intel 官方列出 Core Ultra Desktop Series 2 / LGA1851。'},
  intelCore:{title:'Intel Core Desktop Processor 官方产品库',url:'https://www.intel.com/content/www/us/en/products/details/processors/core.html',date:'2026-09-19',kind:'official',note:'Intel 官方桌面处理器目录。'},
  price5600:{title:'ZOL Ryzen 5 5600 页面',url:'https://detail.zol.com.cn/cpu/amd/600_s8180_s8126/pic.html',date:'2026-09-19',kind:'market-reference',note:'页面抓取时显示京东在售参考价 ¥769。'},
  price7500f:{title:'ZOL Ryzen 5 7500F 页面',url:'https://detail.zol.com.cn/cpu/amd/600_s6219_s8126_s10588_s10593/pic.html',date:'2026-09-19',kind:'market-reference',note:'页面抓取时显示京东在售参考价 ¥849。'},
  price9600x:{title:'ZOL Ryzen 5 9600X 页面',url:'https://detail.zol.com.cn/cpu/amd/s6219_s10577_s8126_s10588/pic.html',date:'2026-09-19',kind:'market-reference',note:'页面抓取时显示京东在售参考价 ¥1169。'},
  price9800x3d:{title:'ZOL Ryzen 7 9800X3D 页面',url:'https://detail.zol.com.cn/cpu/amd/s6219_s10577_s8126_s10588/pic.html',date:'2026-09-19',kind:'market-reference',note:'页面抓取时显示京东在售参考价 ¥3299。'},

  asusGpu:{title:'ASUS GeForce RTX 50 官方显卡目录',url:'https://www.asus.com/motherboards-components/graphics-cards/all-series/filter?SubSpec=354388',date:'2026-09-19',kind:'official',note:'ASUS 官方目录，确认具体显卡型号存在。'},
  msiGpu:{title:'MSI Graphics Cards 官方目录',url:'https://www.msi.com/Graphics-Cards',date:'2026-09-19',kind:'official',note:'MSI 官方显卡目录。'},
  gigabyteGpu:{title:'GIGABYTE Graphics Card 官方目录',url:'https://www.gigabyte.com/Graphics-Card',date:'2026-09-19',kind:'official',note:'技嘉官方显卡目录。'},
  colorful:{title:'Colorful 七彩虹官方产品站',url:'https://en.colorful.cn/',date:'2026-09-19',kind:'official',note:'七彩虹官方产品资料；仅用于确认产品/系列存在。'},
  zotac:{title:'ZOTAC Graphics Cards 官方目录',url:'https://www.zotac.com/us/product/graphics_card/all',date:'2026-09-19',kind:'official',note:'索泰官方显卡目录。'},
  pny:{title:'PNY GeForce 官方产品目录',url:'https://www.pny.com/geforce-rtx-50-series',date:'2026-09-19',kind:'official',note:'PNY 官方 RTX 50 系列资料。'},
  inno3d:{title:'INNO3D 官方产品站',url:'https://www.inno3d.com/',date:'2026-09-19',kind:'official',note:'映众官方显卡资料。'},
  galax:{title:'GALAX 官方显卡站',url:'https://www.galax.com/en/graphics-card.html',date:'2026-09-19',kind:'official',note:'影驰官方显卡资料。'},
  asrockGpu:{title:'ASRock 官方显卡目录',url:'https://www.asrock.com/Graphics-Card/',date:'2026-09-19',kind:'official',note:'华擎官方显卡目录。'},
  powercolor:{title:'PowerColor 官方产品站',url:'https://www.powercolor.com/',date:'2026-09-19',kind:'official',note:'撼讯官方 Radeon 产品资料。'},
  xfx:{title:'XFX 官方产品站',url:'https://www.xfxforce.com/',date:'2026-09-19',kind:'official',note:'讯景官方 Radeon 产品资料。'},
  sapphire:{title:'SAPPHIRE 官方产品站',url:'https://www.sapphiretech.com/en/consumer',date:'2026-09-19',kind:'official',note:'蓝宝石官方 Radeon 产品资料。'},

  asusBoard:{title:'ASUS Motherboards 官方目录',url:'https://www.asus.com/motherboards-components/motherboards/all-series/',date:'2026-09-19',kind:'official',note:'华硕官方主板目录。'},
  msiBoard:{title:'MSI Motherboards 官方目录',url:'https://www.msi.com/Motherboards',date:'2026-09-19',kind:'official',note:'微星官方主板目录。'},
  gigabyteB850:{title:'GIGABYTE B850 官方目录',url:'https://www.gigabyte.com/Motherboard/AMD--Chipset-AMD-B850',date:'2026-09-19',kind:'official',note:'页面明确列出 AM5 / DDR5 及多个 B850 型号。'},
  gigabyteB650:{title:'GIGABYTE B650 官方目录',url:'https://www.gigabyte.com/Motherboard/AMD--Chipset-AMD-B650',date:'2026-09-19',kind:'official',note:'页面明确列出 AM5 / DDR5 B650 型号。'},
  asrockB850:{title:'ASRock B850 官方专题',url:'https://www.asrock.com/microsite/AMDB850/',date:'2026-09-19',kind:'official',note:'华擎官方 B850 型号与规格。'},
  asrockBoard:{title:'ASRock Motherboards 官方目录',url:'https://www.asrock.com/mb/',date:'2026-09-19',kind:'official',note:'华擎官方主板目录。'},
  maxsunBoard:{title:'铭瑄主板官方驱动/产品资料',url:'https://www.maxsun.com.cn/down/mb/',date:'2026-09-19',kind:'official',note:'铭瑄官方页面列出当前及历史主板型号。'},
  maxsunProduct:{title:'铭瑄官方产品目录',url:'https://www.maxsun.com.cn/product/',date:'2026-09-19',kind:'official',note:'铭瑄官方显卡/主板/SSD/内存产品入口。'},

  kingstonRam:{title:'Kingston FURY 官方内存目录',url:'https://www.kingston.com/en/memory/gaming',date:'2026-09-19',kind:'official',note:'金士顿官方 FURY 内存产品线。'},
  gskillRam:{title:'G.SKILL 官方内存目录',url:'https://www.gskill.com/products/1/165/Desktop-Memory',date:'2026-09-19',kind:'official',note:'芝奇官方桌面内存目录。'},
  corsairRam:{title:'CORSAIR DDR5 官方目录',url:'https://www.corsair.com/ww/en/c/memory/ddr5-ram',date:'2026-09-19',kind:'official',note:'海盗船官方 DDR5 内存目录。'},
  teamRam:{title:'TEAMGROUP T-FORCE 官方内存目录',url:'https://www.teamgroupinc.com/en/product-brand/memory/T-FORCE/',date:'2026-09-19',kind:'official',note:'十铨官方 T-FORCE 产品目录。'},
  crucialRam:{title:'Crucial 官方内存目录',url:'https://www.crucial.com/catalog/memory',date:'2026-09-19',kind:'official',note:'英睿达官方内存目录。'},
  adataRam:{title:'ADATA/XPG 官方产品站',url:'https://www.xpg.com/us/xpg/dram-modules',date:'2026-09-19',kind:'official',note:'XPG 官方桌面内存目录。'},

  samsungSsd:{title:'Samsung Consumer SSD 官方目录',url:'https://semiconductor.samsung.com/consumer-storage/internal-ssd/',date:'2026-09-19',kind:'official',note:'三星官方消费级 SSD 产品资料。'},
  kingstonSsd:{title:'Kingston SSD 官方目录',url:'https://www.kingston.com/en/ssd',date:'2026-09-19',kind:'official',note:'金士顿官方 SSD 产品线。'},
  skhynixSsd:{title:'SK hynix SSD 官方站',url:'https://ssd.skhynix.com/',date:'2026-09-19',kind:'official',note:'SK hynix 官方 SSD 产品资料。'},
  lexarSsd:{title:'Lexar 官方 SSD 产品站',url:'https://www.lexar.com/products/',date:'2026-09-19',kind:'official',note:'雷克沙官方产品目录。'},
  crucialSsd:{title:'Crucial SSD 官方目录',url:'https://www.crucial.com/catalog/ssd',date:'2026-09-19',kind:'official',note:'英睿达官方 SSD 目录。'},
  wdSsd:{title:'Western Digital SSD 官方目录',url:'https://www.westerndigital.com/products/internal-drives',date:'2026-09-19',kind:'official',note:'西部数据官方内置存储产品目录。'},

  asusPsu:{title:'ASUS Power Supply 官方目录',url:'https://www.asus.com/motherboards-components/power-supply-units/all-series/',date:'2026-09-19',kind:'official',note:'华硕官方电源目录。'},
  msiPsu:{title:'MSI Power Supply 官方目录',url:'https://www.msi.com/Power-Supply',date:'2026-09-19',kind:'official',note:'微星官方电源目录。'},
  corsairPsu:{title:'CORSAIR Power Supply 官方目录',url:'https://www.corsair.com/ww/en/c/psu',date:'2026-09-19',kind:'official',note:'海盗船官方电源目录。'},
  seasonicPsu:{title:'Seasonic 官方电源目录',url:'https://seasonic.com/power-supplies/',date:'2026-09-19',kind:'official',note:'海韵官方电源产品目录。'},
  superflowerPsu:{title:'Super Flower 官方产品站',url:'https://www.super-flower.com.tw/en/products/power-supply',date:'2026-09-19',kind:'official',note:'振华官方电源产品目录。'},

  deepcool:{title:'DeepCool 官方散热产品目录',url:'https://www.deepcool.com/products/Cooling/cpuaircoolers/',date:'2026-09-19',kind:'official',note:'九州风神官方 CPU 散热器目录。'},
  thermalright:{title:'Thermalright 官方散热器目录',url:'https://www.thermalright.com/product-category/heatsink/',date:'2026-09-19',kind:'official',note:'利民官方散热器目录。'},
  noctua:{title:'Noctua 官方 CPU 散热器目录',url:'https://noctua.at/en/products/cpu-cooler-retail',date:'2026-09-19',kind:'official',note:'猫头鹰官方 CPU 散热器目录。'},
  arctic:{title:'ARCTIC 官方 CPU Cooler 目录',url:'https://www.arctic.de/en/products/cooling/cpu-cooler/',date:'2026-09-19',kind:'official',note:'ARCTIC 官方 CPU 散热产品。'},

  nzxtCase:{title:'NZXT Cases 官方目录',url:'https://nzxt.com/collection/cases',date:'2026-09-19',kind:'official',note:'NZXT 官方机箱目录。'},
  fractalCase:{title:'Fractal Design Cases 官方目录',url:'https://www.fractal-design.com/products/cases/',date:'2026-09-19',kind:'official',note:'Fractal Design 官方机箱目录。'},
  lianliCase:{title:'LIAN LI 官方机箱目录',url:'https://lian-li.com/product-category/cases/',date:'2026-09-19',kind:'official',note:'联力官方机箱目录。'},
  corsairCase:{title:'CORSAIR Cases 官方目录',url:'https://www.corsair.com/ww/en/c/pc-cases',date:'2026-09-19',kind:'official',note:'海盗船官方机箱目录。'}
};

const DB=[];
let seq=0;
function slug(s){return String(s).toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g,'-').replace(/^-|-$/g,'').slice(0,72)}
function add(cat,brand,name,src,opt={}){
  const x={id:opt.id||(`${cat}-${slug(brand)}-${slug(name)}-${++seq}`),cat,brand,name,aliases:opt.aliases||[],price:null,priceVerified:false,priceDate:null,sourceIds:src?[src]:[],catalogVerified:!!src,verifiedSpecs:!!opt.verifiedSpecs,confidence:src?(opt.verifiedSpecs?'high':'medium'):'pending',recordLevel:opt.recordLevel||'sku',market:opt.market||'官方目录已确认'};
  Object.assign(x,opt); DB.push(x); return x;
}
function addMany(cat,brand,src,names,opt={}){names.forEach(n=>add(cat,brand,n,src,{...opt}));}
function boardMany(brand,src,socket,memory,names){names.forEach(n=>add('board',brand,n,src,{socket,memory,verifiedSpecs:true,tier:/X870E|Z890|GODLIKE|TAICHI|MASTER/i.test(n)?7:/X870|B850|B860/i.test(n)?5:4}));}
function ramMany(brand,src,memory,names){names.forEach(n=>add('ram',brand,n,src,{memory,verifiedSpecs:true,recordLevel:'series',tier:/Royal|Titanium|Renegade|Trident|XTREEM/i.test(n)?6:4}));}
function psuMany(brand,src,names){names.forEach(n=>{const m=n.match(/(\d{3,4})W/i);add('psu',brand,n,src,{watts:m?+m[1]:null,verifiedSpecs:!!m,tier:m?Math.max(3,Math.min(8,Math.round(+m[1]/150))):4});});}

// CPU — official model existence + platform fields where verified by manufacturer family/product documentation.
[
 ['AMD Ryzen 5 5500GT','amdAM4','AM4','DDR4',65,2],['AMD Ryzen 5 5600','amdAM4','AM4','DDR4',65,2],['AMD Ryzen 5 5600GT','amdAM4','AM4','DDR4',65,2],['AMD Ryzen 7 5700','amdAM4','AM4','DDR4',65,3],['AMD Ryzen 7 5700X3D','amdAM4','AM4','DDR4',105,4],['AMD Ryzen 7 5800X3D','amdAM4','AM4','DDR4',105,5],
 ['AMD Ryzen 5 7500F','amd7000','AM5','DDR5',65,3],['AMD Ryzen 5 7600','amd7000','AM5','DDR5',65,3],['AMD Ryzen 5 7600X','amd7000','AM5','DDR5',105,4],['AMD Ryzen 7 7700','amd7000','AM5','DDR5',65,4],['AMD Ryzen 7 7700X','amd7000','AM5','DDR5',105,5],['AMD Ryzen 7 7800X3D','amd7000','AM5','DDR5',120,6],['AMD Ryzen 9 7900','amd7000','AM5','DDR5',65,5],['AMD Ryzen 9 7900X','amd7000','AM5','DDR5',170,6],['AMD Ryzen 9 7900X3D','amd7000','AM5','DDR5',120,7],['AMD Ryzen 9 7950X','amd7000','AM5','DDR5',170,7],['AMD Ryzen 9 7950X3D','amd7000','AM5','DDR5',120,8],
 ['AMD Ryzen 5 9600','amd9000','AM5','DDR5',65,4],['AMD Ryzen 5 9600X','amd9000','AM5','DDR5',65,4],['AMD Ryzen 7 9700X','amd9000','AM5','DDR5',65,5],['AMD Ryzen 7 9800X3D','amd9000','AM5','DDR5',120,7],['AMD Ryzen 9 9900X','amd9000','AM5','DDR5',120,7],['AMD Ryzen 9 9950X','amd9000','AM5','DDR5',170,8]
].forEach(([name,src,socket,memory,power,tier])=>add('cpu','AMD',name,src,{socket,memory,power,tier,verifiedSpecs:true,aliases:[name.replace('AMD Ryzen ','').toLowerCase()]}));
[
 'Intel Core i5-12400F','Intel Core i5-12600KF','Intel Core i7-12700KF','Intel Core i5-13400F','Intel Core i5-13600KF','Intel Core i7-13700KF','Intel Core i9-13900K','Intel Core i5-14400F','Intel Core i5-14600KF','Intel Core i7-14700KF','Intel Core i9-14900K'
].forEach((name,i)=>add('cpu','Intel',name,'intelCore',{socket:'LGA1700',memory:'DDR4/DDR5',verifiedSpecs:true,tier:[3,4,5,3,5,6,8,3,5,6,8][i]}));
['Intel Core Ultra 5 245K','Intel Core Ultra 5 245KF','Intel Core Ultra 7 265K','Intel Core Ultra 7 265KF','Intel Core Ultra 9 285K','Intel Core Ultra 5 250K Plus','Intel Core Ultra 7 270K Plus'].forEach((name,i)=>add('cpu','Intel',name,'intel200',{socket:'LGA1851',memory:'DDR5',verifiedSpecs:true,tier:[5,5,6,6,8,5,7][i]}));

// Attach the few market prices currently re-verified. These are NOT generalized to sibling SKUs.
const priceFix={
 'AMD Ryzen 5 5600':[769,'price5600'],
 'AMD Ryzen 5 7500F':[849,'price7500f'],
 'AMD Ryzen 5 9600X':[1169,'price9600x'],
 'AMD Ryzen 7 9800X3D':[3299,'price9800x3d']
};
DB.forEach(x=>{if(priceFix[x.name]){x.price=priceFix[x.name][0];x.priceVerified=true;x.priceDate='2026-09-19';x.sourceIds.push(priceFix[x.name][1]);}});

// Motherboards — broad, official-catalog-backed coverage.
boardMany('华硕 ASUS','asusBoard','AM5','DDR5',[
 'ROG CROSSHAIR X870E HERO','ROG STRIX X870E-E GAMING WIFI','ROG STRIX X870-F GAMING WIFI','ROG STRIX X870-A GAMING WIFI','TUF GAMING X870-PLUS WIFI','PRIME X870-P WIFI','TUF GAMING B850-PLUS WIFI','TUF GAMING B850M-PLUS WIFI','PRIME B850-PLUS WIFI','PRIME B850M-A WIFI','B850M AYW GAMING WIFI','B850M-E AYW GAMING WIFI-CSM','B850 MAX GAMING WIFI-CSM','EX-B850M-V9-CSM','EX-B850M-V7-CSM','TUF GAMING B650M-PLUS WIFI','PRIME B650M-A WIFI II','PRIME B650EM-A WIFI-CSM'
]);
boardMany('华硕 ASUS','asusBoard','LGA1851','DDR5',['ROG MAXIMUS Z890 EXTREME','ROG STRIX Z890-E GAMING WIFI','TUF GAMING Z890-PRO WIFI','TUF GAMING Z890-PLUS WIFI','PRIME Z890-P WIFI','PRIME Z890M-PLUS WIFI','TUF GAMING B860-PLUS WIFI','TUF GAMING B860M-PLUS WIFI','PRIME B860M-A WIFI-CSM','PRIME H810M-E-CSM']);
boardMany('微星 MSI','msiBoard','AM5','DDR5',[
 'MEG X870E GODLIKE','MEG X870E GODLIKE X EDITION','MEG X870E ACE','MPG X870E CARBON WIFI','MPG X870E EDGE TI WIFI','MAG X870E TOMAHAWK WIFI','MAG X870 TOMAHAWK WIFI','MAG B850 TOMAHAWK MAX WIFI','MAG B850 GAMING PLUS MAX WIFI','MAG B850M MORTAR WIFI','PRO B850-P WIFI','MAG B650 TOMAHAWK WIFI','MAG B650M MORTAR WIFI','PRO B650M-A WIFI'
]);
boardMany('微星 MSI','msiBoard','LGA1851','DDR5',['MEG Z890 GODLIKE','MEG Z890 ACE','MPG Z890 CARBON WIFI','MPG Z890 EDGE TI WIFI','MAG Z890 TOMAHAWK WIFI','MAG B860 TOMAHAWK WIFI','MAG B860M MORTAR WIFI','PRO B860-P WIFI','PRO B860M-A WIFI']);
boardMany('技嘉 GIGABYTE','gigabyteB850','AM5','DDR5',[
 'B850 AORUS ELITE-P ICE','B850 AI TOP','B850M AORUS PRO WIFI7','B850 AORUS ELITE X3D','B850M AORUS STEALTH ICE','B850M AORUS STEALTH','B850 AORUS STEALTH ICE','B850M EAGLE WIFI7','B850M DS3H','B850M EAGLE WIFI6E ICE','B850M EAGLE WIFI6E','B850M DS3H ICE'
]);
boardMany('技嘉 GIGABYTE','gigabyteB650','AM5','DDR5',['B650E EAGLE','B650E EAGLE WIFI6E','B650 GAMING X AX V2','B650M AORUS ELITE AX','B650I AORUS ULTRA','B650M GAMING WIFI','B650M S2H','B650M H','B650EM FORCE WIFI6E','B650EM DS3H WIFI6E']);
boardMany('华擎 ASRock','asrockB850','AM5','DDR5',['B850 Steel Legend WiFi','B850 LiveMixer WiFi','B850 Pro RS WiFi','B850 Pro RS','B850M Steel Legend WiFi','B850M Pro RS WiFi','B850M Pro RS']);
boardMany('华擎 ASRock','asrockBoard','AM5','DDR5',['X870E Taichi','X870E Nova WiFi','X870 Steel Legend WiFi','X870 Pro RS WiFi','B650E PG-ITX WiFi','B650I Lightning WiFi','B650M Pro RS WiFi','B650M-HDV/M.2']);
boardMany('华擎 ASRock','asrockBoard','LGA1851','DDR5',['Z890 Taichi AQUA','Z890 Taichi OCF','Z890 Nova WiFi','Z890 Steel Legend WiFi','B860M Steel Legend WiFi','B860M Pro RS WiFi','B860M Lightning WiFi']);
boardMany('铭瑄 MAXSUN','maxsunBoard','AM5','DDR5',['MS-B850M I-CAFE II','MS-Challenger B850M-P WIFI','MS-B850M I-CAFE','MS-eSport B850ITX WIFI ICE','MS-eSport B650ITX WIFI ICE','MS-Terminator B650M WIFI6','MS-Terminator B650M','MS-Challenger B650M-K']);
boardMany('铭瑄 MAXSUN','maxsunBoard','LGA1851','DDR5',['MS-H810M ECO X2','MS-H810M ECO X1']);
boardMany('铭瑄 MAXSUN','maxsunBoard','LGA1700','DDR4',['MS-B760M ECO X1','MS-H610M ECO X1','MS-Challenger H610M WIFI','MS-Challenger H610M-VH']);

// Graphics cards — exact board-partner model names where official catalogs/pages confirm existence.
addMany('gpu','华硕 ASUS','asusGpu',[
 'ASUS T1 GeForce RTX 5070 12GB GDDR7 OC Edition','ASUS Dual GeForce RTX 5070 EVO OC Edition 12GB GDDR7','ASUS Dual GeForce RTX 5070 EVO 12GB GDDR7','ASUS PRIME GeForce RTX 5070 White OC Edition 12GB GDDR7','ROG Strix GeForce RTX 5070 12GB GDDR7','ROG Strix GeForce RTX 5070 12GB GDDR7 OC Edition','ASUS Dual GeForce RTX 5070 12GB GDDR7','ASUS Dual GeForce RTX 5070 12GB GDDR7 OC Edition','ASUS TUF Gaming GeForce RTX 5070 12GB GDDR7','ASUS TUF Gaming GeForce RTX 5070 12GB GDDR7 OC Edition','ASUS PRIME GeForce RTX 5070 12GB GDDR7','ASUS PRIME GeForce RTX 5070 12GB GDDR7 OC Edition','ProArt GeForce RTX 5070 Ti 16GB GDDR7','ASUS PRIME GeForce RTX 5070 Ti 16GB GDDR7'
],{tier:5});
addMany('gpu','微星 MSI','msiGpu',['MSI GeForce RTX 5070 12G GAMING TRIO OC','MSI GeForce RTX 5070 12G VENTUS 3X OC','MSI GeForce RTX 5070 12G SHADOW 3X OC','MSI GeForce RTX 5070 12G GAMING DUKE 3X OC','MSI GeForce RTX 5070 Ti 16G GAMING TRIO OC','MSI GeForce RTX 5070 Ti 16G VENTUS 3X OC','MSI GeForce RTX 5060 Ti 16G GAMING OC','MSI GeForce RTX 5060 8G VENTUS 2X OC'],{tier:5});
addMany('gpu','技嘉 GIGABYTE','gigabyteGpu',['AORUS GeForce RTX 5070 MASTER 12G','GeForce RTX 5070 GAMING OC 12G','GeForce RTX 5070 WINDFORCE OC 12G','GeForce RTX 5070 AERO OC 12G','AORUS GeForce RTX 5070 Ti MASTER 16G','GeForce RTX 5070 Ti GAMING OC 16G','GeForce RTX 5060 Ti GAMING OC 16G','GeForce RTX 5060 WINDFORCE OC 8G'],{tier:5});
addMany('gpu','七彩虹 COLORFUL','colorful',['iGame GeForce RTX 5070 Vulcan X OC 12GB','iGame GeForce RTX 5070 Vulcan OC 12GB','iGame GeForce RTX 5070 Vulcan 12GB','iGame GeForce RTX 5070 Ultra W OC 12GB','iGame GeForce RTX 5070 Ultra W 12GB','Battle-AX GeForce RTX 5070 豪华版 12GB','Battle-AX GeForce RTX 5070 豪华版 V2 12GB'],{tier:5});
addMany('gpu','索泰 ZOTAC','zotac',['ZOTAC GAMING GeForce RTX 5070 Twin Edge','ZOTAC GAMING GeForce RTX 5070 Twin Edge OC','ZOTAC GAMING GeForce RTX 5070 Twin Edge OC White Edition','ZOTAC GAMING GeForce RTX 5070 AMP White Edition','ZOTAC GAMING GeForce RTX 5070 SOLID','ZOTAC GAMING GeForce RTX 5070 SOLID OC'],{tier:5});
addMany('gpu','PNY','pny',['PNY GeForce RTX 5070 12GB ARGB EPIC-X RGB OC Triple Fan','PNY GeForce RTX 5070 12GB ARGB EPIC-X RGB Triple Fan','PNY GeForce RTX 5070 12GB Overclocked Triple Fan','PNY GeForce RTX 5070 12GB Triple Fan'],{tier:5});
addMany('gpu','映众 INNO3D','inno3d',['INNO3D GeForce RTX 5070 TWIN X2','INNO3D GeForce RTX 5070 TWIN X2 OC'],{tier:5});
addMany('gpu','影驰 GALAX','galax',['GALAX GeForce RTX 5070 EX Gamer 1-Click OC'],{tier:5});
addMany('gpu','华擎 ASRock','asrockGpu',['AMD Radeon RX 9070 XT Taichi 16GB OC','AMD Radeon RX 9070 XT Steel Legend 16GB','AMD Radeon RX 9070 XT Steel Legend Dark 16GB','AMD Radeon RX 9070 XT Challenger 16GB','AMD Radeon RX 9070 Challenger 16GB','AMD Radeon RX 9060 XT Steel Legend 16GB OC','AMD Radeon RX 9060 XT Steel Legend 8GB OC','AMD Radeon RX 9060 XT Challenger 16GB OC','Intel Arc B580 Steel Legend 12GB OC','Intel Arc B580 Challenger 12GB OC','Intel Arc B570 Challenger 10GB OC'],{tier:5});
addMany('gpu','撼讯 PowerColor','powercolor',['PowerColor Red Devil Radeon RX 9070 XT','PowerColor Red Devil Radeon RX 9070 XT Limited Edition','PowerColor Red Devil Radeon RX 9070 XT Spectral White','PowerColor Hellhound Radeon RX 9070 XT','PowerColor Reaper Radeon RX 9070 XT','PowerColor Hellhound Radeon RX 9070','PowerColor Reaper Radeon RX 9070','PowerColor Hellhound Radeon RX 9060 XT 16GB','PowerColor Reaper Radeon RX 9060 XT 16GB'],{tier:6});
addMany('gpu','讯景 XFX','xfx',['XFX Mercury Radeon RX 9070 XT','XFX Quicksilver Radeon RX 9070 XT','XFX Swift Radeon RX 9070 XT','XFX Quicksilver Radeon RX 9070','XFX Swift Radeon RX 9070','XFX Swift Radeon RX 9060 XT 16GB'],{tier:6});
addMany('gpu','蓝宝石 SAPPHIRE','sapphire',['SAPPHIRE NITRO+ Radeon RX 9070 XT','SAPPHIRE PURE Radeon RX 9070 XT','SAPPHIRE PULSE Radeon RX 9070 XT','SAPPHIRE NITRO+ Radeon RX 9070','SAPPHIRE PURE Radeon RX 9070','SAPPHIRE PULSE Radeon RX 9070','SAPPHIRE PULSE Radeon RX 9060 XT 16GB'],{tier:6});
// chip-level fallbacks used when user searches a GPU family rather than a board-partner SKU.
[['GeForce RTX 5060 8GB',3],['GeForce RTX 5060 Ti 16GB',4],['GeForce RTX 5070 12GB',5],['GeForce RTX 5070 Ti 16GB',6],['GeForce RTX 5080 16GB',8],['Radeon RX 9060 XT 16GB',4],['Radeon RX 9070 16GB',5],['Radeon RX 9070 XT 16GB',6],['Intel Arc B580 12GB',4]].forEach(([n,t])=>add('gpu','芯片级参考',n,null,{tier:t,recordLevel:'chip',market:'芯片级占位；请选择具体品牌型号',confidence:'pending'}));

// Memory — series level. Exact frequency/capacity remains part of user search or future SKU expansion.
ramMany('金士顿 Kingston','kingstonRam','DDR5',['Kingston FURY Beast DDR5','Kingston FURY Beast RGB DDR5','Kingston FURY Renegade DDR5','Kingston FURY Renegade RGB DDR5','Kingston FURY Renegade Pro DDR5 RDIMM','Kingston FURY Impact DDR5']);
ramMany('芝奇 G.SKILL','gskillRam','DDR5',['G.SKILL Trident Z5 RGB','G.SKILL Trident Z5 Neo RGB','G.SKILL Trident Z5 Royal','G.SKILL Trident Z5 Royal Neo','G.SKILL Ripjaws M5 RGB','G.SKILL Ripjaws M5 Neo RGB','G.SKILL Flare X5','G.SKILL Ripjaws S5']);
ramMany('海盗船 CORSAIR','corsairRam','DDR5',['CORSAIR VENGEANCE DDR5','CORSAIR VENGEANCE RGB DDR5','CORSAIR DOMINATOR TITANIUM RGB DDR5']);
ramMany('十铨 TEAMGROUP','teamRam','DDR5',['T-FORCE DELTA RGB DDR5','T-FORCE DELTA Alpha RGB DDR5','T-FORCE DELTA RGB CKD DDR5','T-FORCE VULCAN DDR5','T-FORCE VULCAN Alpha DDR5','T-FORCE XTREEM DDR5','T-FORCE XTREEM ARGB DDR5']);
ramMany('英睿达 Crucial','crucialRam','DDR5',['Crucial DDR5 Pro','Crucial Pro Overclocking DDR5']);
ramMany('威刚 XPG','adataRam','DDR5',['XPG LANCER DDR5','XPG LANCER RGB DDR5','XPG LANCER BLADE DDR5','XPG LANCER BLADE RGB DDR5']);
ramMany('铭瑄 MAXSUN','maxsunProduct','DDR5',['MAXSUN Taichi DDR5','MAXSUN Terminator DDR5','MAXSUN Avenger DDR5']);
ramMany('金士顿 Kingston','kingstonRam','DDR4',['Kingston FURY Beast DDR4','Kingston FURY Beast RGB DDR4','Kingston FURY Renegade DDR4']);
ramMany('十铨 TEAMGROUP','teamRam','DDR4',['T-FORCE DELTA RGB DDR4','T-FORCE VULCAN Z DDR4']);

// SSD — model/series existence; capacity variants deliberately not priced unless verified later.
addMany('ssd','三星 Samsung','samsungSsd',['Samsung 9100 PRO','Samsung 990 PRO','Samsung 990 EVO Plus','Samsung 990 EVO','Samsung 980 PRO','Samsung 870 EVO'],{recordLevel:'series',tier:6});
addMany('ssd','金士顿 Kingston','kingstonSsd',['Kingston FURY Renegade G5','Kingston FURY Renegade','Kingston KC3000','Kingston NV3','Kingston NV2'],{recordLevel:'series',tier:5});
addMany('ssd','SK hynix','skhynixSsd',['SK hynix Platinum P41','SK hynix Gold P31'],{recordLevel:'series',tier:5});
addMany('ssd','雷克沙 Lexar','lexarSsd',['Lexar NM1090','Lexar NM800 PRO','Lexar NM790','Lexar NQ790','Lexar NQ780','Lexar NM710','Lexar NM620','Lexar NM610 PRO'],{recordLevel:'series',tier:5});
addMany('ssd','英睿达 Crucial','crucialSsd',['Crucial T705','Crucial T700','Crucial T500','Crucial P310','Crucial P3 Plus'],{recordLevel:'series',tier:5});
addMany('ssd','西部数据 WD','wdSsd',['WD_BLACK SN850X NVMe SSD','WD_BLACK SN7100 NVMe SSD','WD Blue SN580 NVMe SSD'],{recordLevel:'series',tier:5});
addMany('ssd','铭瑄 MAXSUN','maxsunProduct',['MAXSUN Taichi SSD','MAXSUN Terminator SSD','MAXSUN Avenger SSD'],{recordLevel:'series',tier:4});

// PSU — official catalog model families; watt field is parsed from product name when explicit.
psuMany('华硕 ASUS','asusPsu',['ASUS Prime 550W Bronze','ASUS Prime 650W Bronze','ASUS Prime 750W Bronze','ASUS Prime 750W Gold','ASUS Prime 850W Gold','TUF Gaming 750W Gold','TUF Gaming 850W Gold','ROG Strix 850W Platinum','ROG Strix 1000W Platinum','ROG Strix 1200W Platinum','ROG Loki SFX-L 750W Platinum','ROG Loki SFX-L 850W Platinum','ROG Loki SFX-L 1000W Platinum','ROG Loki SFX-L 1200W Titanium','ROG Thor 850W Platinum II']);
psuMany('微星 MSI','msiPsu',['MSI MEG Ai1600T PCIE5 1600W','MSI MEG Ai1300P PCIE5 1300W','MSI MEG Ai1000P PCIE5 1000W','MSI MPG A1250GS PCIE5 1250W','MSI MPG A1000GS PCIE5 1000W','MSI MPG A1000G PCIE5 1000W','MSI MPG A850G PCIE5 850W','MSI MAG A1250GL PCIE5 1250W','MSI MAG A1000GL PCIE5 1000W','MSI MAG A850GN PCIE5 850W','MSI MAG A750GN PCIE5 750W']);
psuMany('海盗船 CORSAIR','corsairPsu',['CORSAIR RM650e 650W','CORSAIR RM750e 750W','CORSAIR RM850e 850W','CORSAIR RM1000e 1000W','CORSAIR RM850x 850W','CORSAIR RM1000x 1000W','CORSAIR HX1000i 1000W','CORSAIR HX1500i 1500W']);
psuMany('海韵 Seasonic','seasonicPsu',['Seasonic FOCUS GX-750 750W','Seasonic FOCUS GX-850 850W','Seasonic FOCUS GX-1000 1000W','Seasonic VERTEX GX-850 850W','Seasonic VERTEX GX-1000 1000W','Seasonic PRIME TX-1000 1000W','Seasonic PRIME TX-1300 1300W']);
psuMany('振华 Super Flower','superflowerPsu',['Super Flower LEADEX III Gold 650W','Super Flower LEADEX III Gold 750W','Super Flower LEADEX III Gold 850W','Super Flower LEADEX VII XG 850W','Super Flower LEADEX VII XG 1000W','Super Flower LEADEX Titanium 1000W']);

// CPU coolers.
addMany('cooler','九州风神 DeepCool','deepcool',['DeepCool ASSASSIN IV VC VISION','DeepCool ASSASSIN IV','DeepCool ASSASSIN 4S','DeepCool AK620 DIGITAL PRO','DeepCool AK620 DIGITAL','DeepCool AK620 ZERO DARK','DeepCool AK620','DeepCool AK500 DIGITAL','DeepCool AK500S DIGITAL','DeepCool AK500','DeepCool AK400 DIGITAL PRO','DeepCool AK400 DIGITAL','DeepCool AK400','DeepCool AG620 DIGITAL','DeepCool AG500 DIGITAL','DeepCool AG400 DIGITAL','DeepCool AN600','DeepCool AN400'],{recordLevel:'sku',tier:4});
addMany('cooler','利民 Thermalright','thermalright',['Thermalright Peerless Assassin 120 SE','Thermalright Peerless Assassin 120','Thermalright Phantom Spirit 120 SE','Thermalright Phantom Spirit 120','Thermalright Frozen Prism 360 BLACK','Thermalright Frozen Prism 360 ARGB'],{recordLevel:'sku',tier:5});
addMany('cooler','猫头鹰 Noctua','noctua',['Noctua NH-D15 G2','Noctua NH-D15','Noctua NH-U12A','Noctua NH-U12S','Noctua NH-L12S'],{recordLevel:'sku',tier:6});
addMany('cooler','ARCTIC','arctic',['ARCTIC Liquid Freezer III Pro 360','ARCTIC Liquid Freezer III 360','ARCTIC Freezer 36'],{recordLevel:'sku',tier:5});

// Cases — catalog-backed model existence. Exact GPU/radiator clearances remain blank until exact official spec rows are ingested.
addMany('case','NZXT','nzxtCase',['NZXT H9 Flow','NZXT H9 Flow RGB+','NZXT H7 Flow','NZXT H7 Flow RGB','NZXT H6 Flow','NZXT H6 Flow RGB','NZXT H5 Flow','NZXT H5 Flow RGB','NZXT H3 Flow','NZXT H2 Flow'],{recordLevel:'series',tier:5});
addMany('case','Fractal Design','fractalCase',['Fractal Define One','Fractal North','Fractal North XL','Fractal Meshify 3','Fractal Meshify 3 XL','Fractal Era 2','Fractal Mood','Fractal Terra','Fractal Ridge','Fractal Focus 2','Fractal Define 7','Fractal Define 7 XL','Fractal Torrent','Fractal Torrent Compact','Fractal Pop Air','Fractal Pop Mini Air'],{recordLevel:'series',tier:5});
addMany('case','联力 LIAN LI','lianliCase',['LIAN LI O11 Vision Compact','LIAN LI O11D EVO RGB','LIAN LI O11D EVO','LIAN LI O11D EVO XL','LIAN LI O11 Dynamic','LIAN LI O11D XL','LIAN LI O11D MINI','LIAN LI O11 AIR MINI','LIAN LI LANCOOL 207','LIAN LI LANCOOL 216','LIAN LI LANCOOL III','LIAN LI A3-mATX','LIAN LI SUP01'],{recordLevel:'series',tier:5});
addMany('case','海盗船 CORSAIR','corsairCase',['CORSAIR 2500D AIRFLOW','CORSAIR 3500X','CORSAIR 4000D AIRFLOW','CORSAIR 5000D AIRFLOW','CORSAIR 6500D AIRFLOW','CORSAIR 7000D AIRFLOW'],{recordLevel:'series',tier:5});

// Derived searchable aliases, without creating facts.
DB.forEach(x=>{
  const raw=(x.name+' '+x.brand).toLowerCase();
  const simple=raw.replace(/[™®]/g,'').replace(/geforce|radeon|gaming|edition|official/g,' ').replace(/\s+/g,' ').trim();
  x.aliases=[...new Set([...(x.aliases||[]),simple])];
  if(x.price==null){x.priceVerified=false;x.priceDate=null;}
});
window.HW_DB=DB;
window.HW_META={version:'0.6.0',snapshotDate:'2026-09-19',generatedAt:'2026-09-19',rules:'官方目录确认型号存在；价格/评价无证据则留空。'};
