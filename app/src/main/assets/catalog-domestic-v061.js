/* SmartPCBuilder domestic-market expansion pack v0.6.1 */
(function(){
 const DB=window.HW_DB=window.HW_DB||[],SRC=window.HW_SOURCES=window.HW_SOURCES||{};
 Object.assign(SRC,{
  asgardOfficial:{title:'阿斯加特官方产品中心',url:'https://www.asgard.com.cn/',date:'2026-09-19',kind:'official',note:'官方产品中心列出博拉琪Ⅱ代、瓦尔基里Ⅱ代、吹雪联名、雷神、海姆达尔、海拉等 DDR5 内存，以及海拉 SSD、PCIe 4.0 V7。'},
  predatorOfficial:{title:'Predator Storage 官方产品资讯',url:'https://www.predatorstorage.com/category/product-spotlights/',date:'2026-09-19',kind:'official',note:'官方页面列出 Hera RGB DDR5、Hermes DDR5、Vesta II DDR5、Pallas II DDR5、GM7000、GM7 等。'},
  netacOfficial:{title:'朗科 Netac 官方产品站',url:'https://www.netac.com.cn/',date:'2026-09-19',kind:'official',note:'朗科官网列出绝影 NV7000 等存储产品与内存产品线。'},
  samaPsuOfficial:{title:'先马 SAMA 官方电源目录',url:'https://www.sama.cn/dianyuan',date:'2026-09-19',kind:'official',note:'先马官方目录列出 XP、黑钻、铂钻、GT、玄武、朱雀等电源型号。'},
  samaCaseOfficial:{title:'先马 SAMA 官方机箱目录',url:'https://www.sama.cn/jixiang/eatx',date:'2026-09-19',kind:'official',note:'先马官方目录列出朱雀、黑洞、颜之神、结界、风洞等机箱。'},
  jonsboOfficial:{title:'乔思伯 JONSBO 官方产品目录',url:'https://www.jonsbo.com/product.html',date:'2026-09-19',kind:'official',note:'官方目录列出 Z20、D300、TK-2、TK-1、U4 mini、D41、D31 等机箱。'},
  jonsboD31:{title:'乔思伯 D31 官方规格页',url:'https://www.jonsbo.com/products/D31biaozhunbanhei.html',date:'2026-09-19',kind:'official',note:'D31 标准版：M-ATX/ITX/DTX，CPU 散热限高 168mm，显卡支持长度随电源位置为约330-400mm。'},
  jonsboTk2:{title:'乔思伯 TK-2 官方规格页',url:'https://www.jonsbo.com/products/TK2.html',date:'2026-09-19',kind:'official',note:'TK-2：ITX/M-ATX/ATX，CPU 散热限高 165mm，显卡限长 405mm，支持双 360 冷排位。'},
  id226xt:{title:'ID-COOLING SE-226-XT BLACK 官方规格',url:'https://www.idcooling.com/product/detail?id=269',date:'2026-09-19',kind:'official',note:'官方规格：LGA1851/1700/1200等及 AM5/AM4；高度 154mm；6 热管。'},
  cmV750:{title:'Cooler Master V SFX Gold 750 ATX 3.1 官方页',url:'https://www.coolermaster.com/en-sg/products/v-sfx-gold-750-atx-3-1.html',date:'2026-09-19',kind:'official',note:'官方页确认 750W、ATX 3.1、12V-2x6、80 PLUS Gold、全模组。'},
  cmElite600:{title:'Cooler Master Elite 600 官方规格',url:'https://www.coolermaster.com/en-sg/products/elite-600.html',date:'2026-09-19',kind:'official',note:'官方规格：ATX/MATX/ITX，CPU 散热限高 160mm，显卡限长 425mm，支持 360mm 冷排。'}
 });
 let seq=0;const slug=s=>String(s).toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g,'-').replace(/^-|-$/g,'').slice(0,60);
 function add(cat,brand,name,src,opt={}){if(DB.some(x=>x.cat===cat&&String(x.name).toLowerCase()===String(name).toLowerCase()))return;DB.push(Object.assign({id:'dom-'+cat+'-'+slug(brand)+'-'+slug(name)+'-'+(++seq),cat,brand,name,aliases:[],price:null,priceVerified:false,priceDate:null,sourceIds:[src],catalogVerified:true,verifiedSpecs:!!opt.verifiedSpecs,confidence:opt.verifiedSpecs?'high':'medium',recordLevel:opt.recordLevel||'series',market:'官方目录已确认'},opt));}
 function many(cat,brand,src,names,opt={}){names.forEach(n=>add(cat,brand,n,src,opt));}

 many('ram','阿斯加特 Asgard','asgardOfficial',['阿斯加特 瓦尔基里Ⅱ代 DDR5 RGB','阿斯加特 博拉琪Ⅱ代 DDR5 RGB','阿斯加特 吹雪联名款 DDR5 RGB','阿斯加特 雷神 DDR5','阿斯加特 海姆达尔 DDR5','阿斯加特 海拉 DDR5'],{memory:'DDR5',verifiedSpecs:true,recordLevel:'series',tier:5});
 many('ram','阿斯加特 Asgard','asgardOfficial',['阿斯加特 瓦尔基里 DDR4 RGB','阿斯加特 金伦加&TUF联名 DDR4'],{memory:'DDR4',verifiedSpecs:true,recordLevel:'series',tier:4});
 many('ssd','阿斯加特 Asgard','asgardOfficial',['阿斯加特 海拉 SSD','Asgard PCIe 4.0 V7 SSD'],{recordLevel:'series',tier:5});

 many('ram','宏碁掠夺者 Predator','predatorOfficial',['Predator Hera RGB DDR5','Predator Hermes RGB DDR5','Predator Vesta II DDR5 RGB','Predator Pallas II DDR5'],{memory:'DDR5',verifiedSpecs:true,recordLevel:'series',tier:5});
 many('ssd','宏碁掠夺者 Predator','predatorOfficial',['Predator GM7000 Heatsink','Predator GM7000','Predator GM7'],{recordLevel:'series',tier:6});

 many('ssd','朗科 Netac','netacOfficial',['朗科 绝影 NV7000','朗科 绝影 NV7000-t','朗科 ZX20 二代移动固态硬盘'],{recordLevel:'series',tier:5});
 many('ram','朗科 Netac','netacOfficial',['朗科 越影III DDR4'],{memory:'DDR4',verifiedSpecs:true,recordLevel:'series',tier:3});

 ['XP850 V3版 850W','XP1000 V3版 1000W','XP850悟空版 850W','XP1000悟空版 1000W','XP1200 super 1200W','铂钻850 850W','铂钻1000 1000W','黑钻650 V4版 650W','黑钻750 V4版 750W','黑钻850 V4版 850W','黑钻1000 V4版 1000W','GT650D 650W','GT750D 750W','GT850 850W','GT1000 1000W','玄武650 650W','朱雀750 750W','朱雀850 850W'].forEach(n=>{const m=n.match(/(\d{3,4})W/);add('psu','先马 SAMA','先马 '+n,'samaPsuOfficial',{watts:m?+m[1]:null,verifiedSpecs:!!m,recordLevel:'sku',tier:m?Math.max(3,Math.min(8,Math.round(+m[1]/150))):4});});
 many('case','先马 SAMA','samaCaseOfficial',['先马 AI SUPER 100','先马 朱雀5 工作站版','先马 风洞','先马 颜之神 mesh版','先马 AI SUPER','先马 朱雀5','先马 结界','先马 朱雀3','先马 黑洞PRO','先马 黑洞'],{recordLevel:'sku',tier:4});

 many('case','乔思伯 JONSBO','jonsboOfficial',['乔思伯 Z20','乔思伯 D300','乔思伯 TK-1','乔思伯 N3','乔思伯 U4 mini','乔思伯 C6 Handle','乔思伯 C6','乔思伯 D41 MESH版','乔思伯 N2'],{recordLevel:'sku',tier:4});
 add('case','乔思伯 JONSBO','乔思伯 TK-2','jonsboTk2',{verifiedSpecs:true,recordLevel:'sku',gpuClearance:405,coolerHeight:165,tier:5});
 add('case','乔思伯 JONSBO','乔思伯 D31 标准版','jonsboD31',{verifiedSpecs:true,recordLevel:'sku',gpuClearance:330,coolerHeight:168,tier:4,compatNote:'官方显卡支持长度会随电源位置变化，330mm 为保守值，最大可到约400mm。'});
 add('case','乔思伯 JONSBO','乔思伯 D31 MESH版','jonsboD31',{verifiedSpecs:true,recordLevel:'sku',gpuClearance:330,coolerHeight:168,tier:4,compatNote:'以 D31 同平台官方结构参数做保守限长记录；具体版本购买前仍需核对。'});

 add('cooler','ID-COOLING','ID-COOLING SE-226-XT BLACK','id226xt',{verifiedSpecs:true,recordLevel:'sku',height:154,tier:5,sockets:['LGA1851','LGA1700','LGA1200','AM5','AM4']});
 add('psu','酷冷至尊 Cooler Master','Cooler Master V SFX Gold 750 ATX 3.1','cmV750',{verifiedSpecs:true,recordLevel:'sku',watts:750,atx:'3.1',connector:'12V-2x6',tier:5});
 add('case','酷冷至尊 Cooler Master','Cooler Master Elite 600','cmElite600',{verifiedSpecs:true,recordLevel:'sku',gpuClearance:425,coolerHeight:160,tier:4});

 DB.forEach(x=>{if(!Array.isArray(x.aliases))x.aliases=[];const simple=(x.name+' '+x.brand).toLowerCase().replace(/[™®]/g,'').replace(/\s+/g,' ').trim();if(!x.aliases.includes(simple))x.aliases.push(simple);});
 if(window.HW_META){window.HW_META.version='0.6.1';window.HW_META.domesticPack='catalog-domestic-v061.js';}
})();
