/* SmartPCBuilder v0.6.3 interaction core
 * Fixed-load page: no Android-time script injection.
 * Gives the user a real component picker and a deterministic natural-language flow.
 */
(function(){
  let pickerCat='cpu';
  const byId=id=>document.getElementById(id);
  const categoryLabel=c=>(typeof LABEL!=='undefined'&&LABEL[c])||c;
  const categoryIcon=c=>(typeof ICON!=='undefined'&&ICON[c])||'•';

  function safeAssistant(text,type){try{assistant(text,type);}catch(e){const m=byId('assistantMini');if(m)m.textContent=text;}}
  function normalizeText(s){return String(s||'').toLowerCase().replace(/[™®]/g,'').replace(/[\s_\-\/()（）]+/g,'');}

  function navTo(id){
    const target=byId(id);if(!target)return false;
    document.querySelectorAll('.page').forEach(x=>x.classList.toggle('on',x.id===id));
    document.querySelectorAll('.nav button').forEach(x=>x.classList.toggle('on',x.dataset.p===id));
    if(id==='database'&&typeof renderDatabase==='function')renderDatabase();
    if(id==='compare'&&typeof renderCompare==='function')renderCompare();
    try{window.scrollTo(0,0);}catch(_){}
    return true;
  }
  window.go=navTo;

  function bindNav(){
    document.querySelectorAll('.nav button').forEach(btn=>{
      const id=btn.dataset.p;
      btn.onclick=function(e){if(e)e.preventDefault();navTo(id);try{haptic(16);}catch(_){}return false;};
      btn.style.pointerEvents='auto';
      btn.disabled=false;
    });
  }

  function pickerSource(){
    let list=DB.filter(x=>x.cat===pickerCat&&x.recordLevel!=='chip');
    const q=(byId('pickerSearch')?.value||'').trim();
    const brand=byId('pickerBrand')?.value||'all';
    if(brand!=='all')list=list.filter(x=>x.brand===brand);
    if(q)list=list.filter(x=>scoreItem(x,q)>=20||normalizeText(x.name).includes(normalizeText(q))||normalizeText(x.brand).includes(normalizeText(q)));
    list.sort((a,b)=>Number(b.catalogVerified)-Number(a.catalogVerified)||Number(b.priceVerified)-Number(a.priceVerified)||String(a.brand).localeCompare(String(b.brand),'zh-CN')||String(a.name).localeCompare(String(b.name),'zh-CN'));
    return list;
  }

  function renderPickerV063(){
    const panel=byId('pickerPanel'),listBox=byId('pickerList'),brandSel=byId('pickerBrand');
    if(!panel||!listBox||!brandSel)return;
    const all=DB.filter(x=>x.cat===pickerCat&&x.recordLevel!=='chip');
    const brands=[...new Set(all.map(x=>x.brand))].sort((a,b)=>a.localeCompare(b,'zh-CN'));
    const keep=brandSel.value||'all';
    brandSel.innerHTML='<option value="all">全部品牌</option>'+brands.map(b=>`<option value="${esc(b)}">${esc(b)}</option>`).join('');
    if([...brandSel.options].some(o=>o.value===keep))brandSel.value=keep;
    const list=pickerSource().slice(0,180);
    const current=selected(pickerCat);
    listBox.innerHTML=list.length?list.map(x=>{
      const active=current&&current.id===x.id;
      return `<div class="pickItem"><div><b>${esc(x.name)}</b><div class="meta">${esc(x.brand)} · ${x.catalogVerified?'官方目录确认':x.marketCatalogVerified?'市场目录确认':'待核验'} · ${x.priceVerified?money(x.price):'价格待核验'}</div><div class="tags">${typeof confidenceBadge==='function'?confidenceBadge(x):''}${typeof priceBadge==='function'?priceBadge(x):''}</div></div><button type="button" onclick="selectPickerV063('${x.id}')">${active?'✓ 已选择':current?'替换当前':'选择这个'}</button></div>`;
    }).join(''):`<div class="empty" style="padding:18px 2px">当前筛选没有匹配型号。<br><button class="btn primary" style="margin-top:9px;width:100%" onclick="selectCustomPickerV063()">按搜索文字加入为“待核验”配件</button></div>`;
  }

  window.openPickerV063=function(cat){
    pickerCat=cat;
    const title=byId('pickerTitle'),search=byId('pickerSearch'),brand=byId('pickerBrand'),panel=byId('pickerPanel');
    if(title)title.textContent='选择 '+categoryLabel(cat);
    if(search)search.value='';
    if(brand)brand.value='all';
    renderPickerV063();
    if(panel)panel.classList.add('open');
    try{haptic(20);}catch(_){}
  };
  window.closePickerV063=function(){const p=byId('pickerPanel');if(p)p.classList.remove('open');};
  window.manualPick=window.openPickerV063;

  window.selectPickerV063=function(id){
    const x=itemById(id);if(!x)return toast('这个型号没有找到');
    try{snapshot();}catch(_){}
    state.parts[x.cat]=x.id;delete state.custom[x.cat];state.locks[x.cat]=true;
    save();renderAll();closePickerV063();navTo('build');
    safeAssistant(`已由你自主选择：${x.name}。这个部件已自动锁定，智能补齐不会替换它；兼容和搭配合理性已重新检查。`,'good');
    try{haptic(30);}catch(_){}
  };

  window.selectCustomPickerV063=function(){
    const text=(byId('pickerSearch')?.value||'').trim();
    if(!text)return toast('先输入你要加入的型号');
    try{snapshot();}catch(_){}
    const x=inferCustom(text,pickerCat);state.custom[pickerCat]=x;state.parts[pickerCat]=x.id;state.locks[pickerCat]=true;
    save();renderAll();closePickerV063();navTo('build');
    safeAssistant(`“${text}”已作为你手动选择的待核验 ${categoryLabel(pickerCat)} 加入。没有可靠来源前不会编造价格和规格。`,'warn');
  };

  function renderPickerCats(){
    const box=byId('pickerCats');if(!box)return;
    box.innerHTML=CATS.map(c=>`<button type="button" onclick="openPickerV063('${c}')">${categoryIcon(c)} ${categoryLabel(c)}<br><small>${selected(c)?'已选：'+esc(selected(c).name).slice(0,13):'点击选择型号'}</small></button>`).join('');
  }

  function extractHardwareMentions(text){
    const out=[];
    const rules=[
      ['gpu',/(rtx\s*50(?:60(?:\s*ti)?|70(?:\s*ti)?|80|90)|rx\s*90(?:60\s*xt|70(?:\s*xt)?)|arc\s*b(?:570|580))/ig],
      ['cpu',/(ryzen\s*[3579]\s*\d{4,5}(?:x3d|x|g|gt|f)?|core\s*(?:ultra\s*[579]\s*\d{3}[a-z]*|i[3579][\s-]*\d{4,5}[a-z]{0,3}))/ig]
    ];
    for(const [cat,re] of rules){let m;while((m=re.exec(text))!==null)out.push({cat,text:m[1]});}
    return out;
  }

  function assignMention(m,asOwned){
    const token=m.text.trim();
    const matches=searchDB(token,m.cat,20);
    let exact=null;
    if(m.cat==='cpu')exact=matches.find(x=>normalizeText(x.name).includes(normalizeText(token))&&x.recordLevel!=='chip')||null;
    if(exact){state.parts[m.cat]=exact.id;delete state.custom[m.cat];if(asOwned)state.locks[m.cat]=true;return exact.name;}
    const x=inferCustom(token,m.cat);x.name=token+(m.cat==='gpu'?'（具体品牌型号待确认）':'');state.custom[m.cat]=x;state.parts[m.cat]=x.id;if(asOwned)state.locks[m.cat]=true;return x.name;
  }

  window.parseNatural=function(){
    const input=byId('naturalInput');const text=(input?.value||'').trim();
    if(!text)return toast('先输入你的预算、用途或已有配件');
    try{snapshot();}catch(_){}
    const bm=text.match(/(?:预算|剩余|还剩|大约|约)?\s*(\d{3,5})\s*(?:元|块)/i)||text.match(/(\d{4,5})\s*(?:元|块)?/);
    if(bm){const n=Number(bm[1]);if(n>=500&&n<=100000)state.budget=n;}
    state.prefs=state.prefs||{};
    state.prefs.resolution=/4k/i.test(text)?'4K':/(2k|1440p)/i.test(text)?'2K':/(1080p|1k)/i.test(text)?'1080P':null;
    state.prefs.use=/剪辑|渲染|生产力|建模|视频/.test(text)?'生产力':/游戏|电竞|3a|网游/i.test(text)?'游戏':'综合';
    state.prefs.quiet=/静音|安静/.test(text);state.prefs.white=/白色/.test(text);state.prefs.noRgb=/不要\s*rgb|无光|不要灯|非rgb/i.test(text);
    const owned=/(已有|已经有|手上有|自带|现有)/.test(text);
    const mentions=extractHardwareMentions(text);const assigned=[];
    mentions.forEach(m=>assigned.push(assignMention(m,owned)));
    save();
    if(byId('budget'))byId('budget').value=state.budget;
    if(owned&&mentions.length&&typeof fillMissingSmart==='function')fillMissingSmart();
    else if(typeof autoBuild==='function')autoBuild();
    else renderAll();
    renderPickerCats();navTo('build');
    const d=typeof calcDiagnostics==='function'?calcDiagnostics():{msgs:[]};
    const bad=(d.msgs||[]).filter(x=>x[0]==='bad').length,warn=(d.msgs||[]).filter(x=>x[0]==='warn').length;
    const summary=[`已理解你的需求：预算 ${money(state.budget)}`,`用途：${state.prefs.use}${state.prefs.resolution?' · '+state.prefs.resolution:''}${state.prefs.quiet?' · 静音':''}${state.prefs.white?' · 白色':''}${state.prefs.noRgb?' · 不要RGB':''}`,assigned.length?`识别到配件：${assigned.join('、')}`:'没有识别到“已有配件”，已按预算生成候选。',`自动检查：${bad} 个必须处理问题，${warn} 条提醒。`].join('\n');
    openAssistant(summary);safeAssistant('智能理解已完成，已经生成/补齐配置并自动检查。','good');
  };

  window.clearAllV063=function(){
    try{snapshot();}catch(_){}state.parts={};state.custom={};state.locks={};state.compare=[];save();renderAll();renderPickerCats();safeAssistant('配置已清空，可以重新自主选择。');
  };

  function bindControls(){
    const run=byId('naturalRun');if(run)run.onclick=function(){parseNatural();};
    const ps=byId('pickerSearch');if(ps)ps.oninput=function(){renderPickerV063();};
    const pb=byId('pickerBrand');if(pb)pb.onchange=function(){renderPickerV063();};
    document.querySelectorAll('button').forEach(b=>{b.disabled=false;b.style.pointerEvents='auto';});
  }

  const oldRenderAll=window.renderAll;
  window.renderAll=function(){if(typeof oldRenderAll==='function')oldRenderAll();renderPickerCats();};

  function boot(){
    const old=byId('manualPickerV062');if(old)old.remove();
    bindNav();bindControls();renderPickerCats();
    try{renderAll();}catch(e){console.error('v063 render',e);safeAssistant('界面加载出现异常：'+e.message,'bad');}
    safeAssistant(`v0.6.3 已加载 ${DB.length} 条本地记录。智能理解和自主选择配件现在走固定加载链路。`,'good');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,0),{once:true});else setTimeout(boot,0);
})();