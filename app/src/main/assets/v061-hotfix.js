/* SmartPCBuilder v0.6.1 interaction hotfix */
(function(){
  let dbLimit=160;

  window.confidenceBadge=function(x){
    if(x.catalogVerified)return '<span class="tag verified">官方目录确认</span>';
    if(x.marketCatalogVerified)return '<span class="tag ok">市场目录确认</span>';
    return '<span class="tag pending">待核验</span>';
  };
  window.priceBadge=function(x){
    if(x.priceStatus==='conflict'&&Array.isArray(x.priceRange))return `<span class="tag pending">价格来源冲突 ${money(x.priceRange[0])}–${money(x.priceRange[1])}</span>`;
    if(x.priceVerified&&x.price!=null){const c=x.priceConfidence==='high'?'ok':'verified';return `<span class="tag ${c}">${esc(x.priceType||'可追溯价格')} ${money(x.price)}</span>`;}
    return '<span class="tag pending">价格待核验</span>';
  };

  window.openAssistant=function(text){
    const detail=$('assistantDetail'),panel=$('assistantPanel');
    if(!detail||!panel)return;
    const live=$('assistantText')?.textContent||$('assistantMini')?.textContent||'当前没有新的解释。';
    detail.textContent=text||live;
    panel.classList.add('open');haptic(22);
  };

  window.chooseReplacement=function(cat,id){
    const x=itemById(id);if(!x)return toast('替代型号不存在');
    snapshot();state.parts[cat]=id;delete state.custom[cat];save();renderAll();closeAssistant();
    assistant(`已替换为 ${x.name}，兼容与价格信息已重新计算。`,'good');haptic(28);
  };
  window.showReplacements=function(cat){
    const cur=selected(cat);if(!cur)return;
    const list=recommendAlternatives(cat);
    const panel=$('assistantPanel'),detail=$('assistantDetail');if(!panel||!detail)return;
    if(!list.length){detail.textContent='当前本地数据库没有同类别替代型号。';panel.classList.add('open');return;}
    detail.innerHTML=`<b>替换 ${esc(cur.name)}</b><div style="margin-top:10px">${list.map(x=>`<button onclick="chooseReplacement('${cat}','${x.id}')" style="display:block;width:100%;text-align:left;margin:7px 0;padding:11px;border:1px solid #e3e9f2;border-radius:12px;background:#f8faff"><b>${esc(x.name)}</b><br><small>${x.priceVerified?esc(x.priceType||'参考价')+' '+money(x.price):x.priceStatus==='conflict'?'价格来源冲突':'价格待核验'} · ${x.catalogVerified?'官方目录':x.marketCatalogVerified?'市场目录':'待核验'}</small></button>`).join('')}</div>`;
    panel.classList.add('open');haptic(22);
  };

  window.renderDatabase=function(){
    const q=($('dbSearch')?.value||'').trim(),cat=$('dbCat')?.value||'all',brand=$('dbBrand')?.value||'all';
    let list=DB.filter(x=>(cat==='all'||x.cat===cat)&&(brand==='all'||x.brand===brand));
    if(q)list=list.filter(x=>scoreItem(x,q)>=22);
    const brands=[...new Set(DB.map(x=>x.brand))].sort((a,b)=>a.localeCompare(b,'zh-CN'));
    const brandSel=$('dbBrand');
    if(brandSel&&brandSel.options.length<=1){brandSel.innerHTML='<option value="all">全部品牌</option>'+brands.map(b=>`<option value="${esc(b)}">${esc(b)}</option>`).join('');}
    const priced=DB.filter(x=>x.priceVerified&&x.price!=null).length,conflicts=DB.filter(x=>x.priceStatus==='conflict').length;
    const counts=CATS.map(c=>`${LABEL[c]} ${DB.filter(x=>x.cat===c).length}`).join(' · ');
    if($('dbStats'))$('dbStats').innerHTML=`<b>${DB.length}</b> 条本地记录 · <b>${brands.length}</b> 个品牌/品牌组<br><span>${counts}</span><br><span>官方目录 ${DB.filter(x=>x.catalogVerified).length} 条 · 市场目录 ${DB.filter(x=>x.marketCatalogVerified).length} 条 · 可追溯价格 ${priced} 条${conflicts?' · 价格冲突 '+conflicts+' 条':''}</span>`;
    const shown=list.slice(0,dbLimit);
    if($('dbList'))$('dbList').innerHTML=shown.map(x=>`<div class="dbItem lift"><div><b>${esc(x.name)}</b><div class="meta">${LABEL[x.cat]} · ${esc(x.brand)} · ${levelText(x)}</div><div class="tags">${confidenceBadge(x)}${priceBadge(x)}</div></div><div class="dbActions"><button onclick="setPart('${x.cat}','${x.id}');go('build')">加入</button><button onclick="toggleCompare('${x.id}');go('compare')">对比</button></div></div>`).join('')||'<div class="empty">没有匹配记录。</div>';
    if($('dbList')&&shown.length<list.length){$('dbList').insertAdjacentHTML('beforeend',`<button class="btn softBtn" style="width:100%;margin-top:10px" onclick="loadMoreDb()">继续加载 ${Math.min(160,list.length-shown.length)} 条（已显示 ${shown.length}/${list.length}）</button>`);}else if($('dbList')&&list.length){$('dbList').insertAdjacentHTML('beforeend',`<div class="meta" style="padding:12px 0;text-align:center">已显示全部 ${list.length} 条</div>`);}
  };
  window.loadMoreDb=function(){dbLimit+=160;renderDatabase();haptic(18);};
  window.setNaturalExample=function(text){const el=$('naturalInput');if(!el)return;el.value=text;el.focus();haptic(14);};

  window.renderCoverage=function(){
    const c=$('coverage');if(!c)return;
    const priced=DB.filter(x=>x.priceVerified&&x.price!=null).length,high=DB.filter(x=>x.priceVerified&&x.priceConfidence==='high').length,conflicts=DB.filter(x=>x.priceStatus==='conflict').length;
    c.textContent=`本地库 ${DB.length} 条；${DB.filter(x=>x.catalogVerified).length} 条官方目录确认；${DB.filter(x=>x.marketCatalogVerified).length} 条市场目录确认；${priced} 条有可追溯价格，其中 ${high} 条为明确平台快照${conflicts?`；另有 ${conflicts} 条价格来源冲突，未强行给单一价格`:''}。`;
  };

  window.renderMarket=function(){
    const verified=DB.filter(x=>x.priceVerified&&x.price!=null),conflict=DB.filter(x=>x.priceStatus==='conflict');
    if($('marketList'))$('marketList').innerHTML=(verified.length?verified.map(x=>`<div class="marketItem"><b>${esc(x.name)}</b><div class="price"><strong>${money(x.price)}</strong><small>${esc(x.pricePlatform||'来源可追溯')} · ${esc(x.priceType||'参考价')} · 采集 ${esc(x.priceDate||'')}${x.priceSourceDate?' · 来源标价日 '+esc(x.priceSourceDate):''}</small></div>${sourceHtml(x)}</div>`).join(''):'<div class="empty">暂无已核验价格。</div>')+conflict.map(x=>`<div class="marketItem"><b>${esc(x.name)}</b><div class="notice warn">当前来源报价冲突：${money(x.priceRange[0])}–${money(x.priceRange[1])}。不选一个数字冒充真实价格。</div>${sourceHtml(x)}</div>`).join('');
  };

  window.addEventListener('error',function(e){try{toast('检测到功能异常，错误已记录');console.error('SmartPC UI error',e.error||e.message);}catch(_){};});

  function install(){
    window.naturalInput=$('naturalInput');
    const chips=document.querySelectorAll('.exampleChips button');
    const examples=['5000元主机，1080P高刷游戏，性价比优先','8000元，2K 3A游戏，不要RGB，尽量静音','我已有RTX 5070，剩下预算4000元，帮我配整机'];
    chips.forEach((b,i)=>{if(examples[i])b.onclick=()=>setNaturalExample(examples[i]);});
    const metric=$('verifiedTotal')?.parentElement?.querySelector('small');if(metric)metric.textContent='可追溯参考价合计';
    const sub=document.querySelector('.top .sub');if(sub)sub.textContent='v0.6.1 · 本地大数据库 · 交互修复 · 价格来源可追溯';
    const superBadge=document.querySelector('.hero .badge');if(superBadge)superBadge.textContent='SUPER SMART v0.6.1';
    renderAll();
    const required=['home','build','database','compare','rules','partSearch','budget','dbSearch','assistantPanel'];
    const missing=required.filter(id=>!$(id));
    if(missing.length)assistant('界面自检发现缺失组件：'+missing.join('、'),'bad');
    else assistant(`v0.6.1 已完成交互修复；本地库 ${DB.length} 条，当前可追溯价格 ${DB.filter(x=>x.priceVerified).length} 条。`,'good');
    window.__v061HotfixReady=true;
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();
