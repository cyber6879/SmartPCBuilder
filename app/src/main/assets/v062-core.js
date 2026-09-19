/* SmartPCBuilder v0.6.2 core hotfix
 * Goals:
 * 1) bottom navigation must work even if earlier init was interrupted;
 * 2) user-selected parts are preserved and can be completed around;
 * 3) compatibility and pairing reasonableness are separate conclusions;
 * 4) no fake bottleneck percentages or invented specs.
 */
(function(){
  let booted=false;
  function safe$(id){return document.getElementById(id);}
  function itemTier(x){const n=Number(x&&x.tier);return Number.isFinite(n)?n:null;}
  function hasPart(cat){return !!selected(cat);}

  function robustGo(id){
    const target=safe$(id);
    if(!target){try{toast('页面组件不存在：'+id);}catch(_){}return false;}
    document.querySelectorAll('.page').forEach(x=>x.classList.toggle('on',x.id===id));
    document.querySelectorAll('.nav button').forEach(x=>x.classList.toggle('on',x.dataset.p===id));
    if(id==='database'&&typeof renderDatabase==='function')renderDatabase();
    if(id==='compare'&&typeof renderCompare==='function')renderCompare();
    try{window.scrollTo(0,0);}catch(_){}
    return true;
  }

  function bindBottomNav(){
    window.go=robustGo;
    document.querySelectorAll('.nav button').forEach(btn=>{
      const page=btn.dataset.p;
      btn.setAttribute('type','button');
      btn.onclick=function(ev){if(ev)ev.preventDefault();robustGo(page);try{haptic(18);}catch(_){}return false;};
      btn.style.pointerEvents='auto';
    });
  }

  function manualPick(cat){
    robustGo('build');
    const sel=safe$('searchCat'),input=safe$('partSearch');
    if(sel)sel.value=cat;
    if(input){input.value='';input.focus();}
    const out=safe$('searchResults');
    if(out){
      const list=DB.filter(x=>x.cat===cat&&x.recordLevel!=='chip').slice(0,30);
      out.innerHTML=list.length?list.map(renderSearchItem).join(''):'<div class="empty">这个类别暂时没有可选型号。</div>';
    }
    assistant('自主选择 '+LABEL[cat]+'：你选什么就保留什么，系统只负责即时检查和提醒。','good');
  }
  window.manualPick=manualPick;

  function addManualPanel(){
    if(safe$('manualPickerV062'))return;
    const build=document.querySelector('#build .buildLayout > div');
    if(!build)return;
    const card=document.createElement('div');
    card.id='manualPickerV062';card.className='card';
    card.innerHTML=`<div class="sectionTitle"><b>自主选择配件</b><span class="badge">你选 · 我检查</span></div>
      <div class="meta">点一个类别直接自己挑型号。你已选择的部件不会被“补齐空缺”替换。</div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin-top:9px">
        ${CATS.map(c=>`<button class="btn softBtn" style="padding:10px 5px;font-size:11px" onclick="manualPick('${c}')">${ICON[c]} ${LABEL[c]}</button>`).join('')}
      </div>
      <div class="actionRow"><button class="btn primary" onclick="fillMissingSmart()">✦ 保留已选 · 智能补齐空缺</button><button class="btn softBtn" onclick="reasonCheckNow()">立即检查合理性</button></div>`;
    const first=build.querySelector('.card');
    if(first)build.insertBefore(card,first);else build.prepend(card);
  }

  function chooseNear(cat,predicate,targetTier){
    let list=DB.filter(x=>x.cat===cat&&x.recordLevel!=='chip'&&(!predicate||predicate(x)));
    if(!list.length)return null;
    list.sort((a,b)=>{
      const at=itemTier(a)??4,bt=itemTier(b)??4;
      const td=Math.abs(at-targetTier)-Math.abs(bt-targetTier);
      if(td)return td;
      if(Number(b.catalogVerified)!==Number(a.catalogVerified))return Number(b.catalogVerified)-Number(a.catalogVerified);
      if(Number(b.priceVerified)!==Number(a.priceVerified))return Number(b.priceVerified)-Number(a.priceVerified);
      return String(a.name).localeCompare(String(b.name),'zh-CN');
    });
    return list[0];
  }

  function putIfEmpty(cat,item){
    if(!item||state.parts[cat]||state.locks[cat])return;
    state.parts[cat]=item.id;delete state.custom[cat];
  }

  window.fillMissingSmart=function(){
    snapshot();
    let cpu=selected('cpu'),board=selected('board'),gpu=selected('gpu');
    const baseTier=itemTier(gpu)??itemTier(cpu)??4;
    if(!cpu){cpu=chooseNear('cpu',x=>!board||!board.socket||x.socket===board.socket,Math.max(2,baseTier-1));putIfEmpty('cpu',cpu);}
    cpu=selected('cpu');
    if(!board){board=chooseNear('board',x=>!cpu||!cpu.socket||x.socket===cpu.socket,Math.max(3,itemTier(cpu)??4));putIfEmpty('board',board);}
    board=selected('board');
    if(!selected('ram'))putIfEmpty('ram',chooseNear('ram',x=>!board||!board.memory||x.memory===board.memory,4));
    if(!selected('gpu'))putIfEmpty('gpu',chooseNear('gpu',null,Math.max(3,(itemTier(cpu)??4)+1)));
    gpu=selected('gpu');
    if(!selected('ssd'))putIfEmpty('ssd',chooseNear('ssd',null,4));
    if(!selected('psu')){
      const need=gpu&&gpu.recommendedPsu?Number(gpu.recommendedPsu):null;
      putIfEmpty('psu',chooseNear('psu',x=>!need||!x.watts||x.watts>=need,itemTier(gpu)>=7?7:itemTier(gpu)>=5?6:4));
    }
    if(!selected('cooler'))putIfEmpty('cooler',chooseNear('cooler',null,itemTier(cpu)>=6?6:4));
    if(!selected('case'))putIfEmpty('case',chooseNear('case',null,itemTier(gpu)>=6?6:4));
    save();renderAll();robustGo('build');
    assistant('已保留你手动选择的部件，只补齐原本空缺的位置。请看下方“合理性/兼容”诊断。','good');
  };

  const baseCalc=window.calcDiagnostics;
  window.calcDiagnostics=function(){
    let d;
    try{d=typeof baseCalc==='function'?baseCalc():{msgs:[],verified:[],unknown:[],sum:0};}
    catch(e){d={msgs:[['warn','基础兼容检查发生异常，已切换到安全诊断。']],verified:[],unknown:[],sum:0};}
    if(!d.msgs)d.msgs=[];
    const msgs=d.msgs;
    const cpu=selected('cpu'),board=selected('board'),gpu=selected('gpu'),ram=selected('ram'),psu=selected('psu'),cooler=selected('cooler');
    const ct=itemTier(cpu),gt=itemTier(gpu),bt=itemTier(board),kot=itemTier(cooler);

    const coreMissing=['cpu','board','gpu','ram','ssd','psu'].filter(c=>!selected(c));
    if(coreMissing.length)msgs.unshift(['warn','整机尚未完整：还缺 '+coreMissing.map(c=>LABEL[c]).join('、')+'。']);

    if(cpu&&gpu&&ct!=null&&gt!=null){
      const diff=ct-gt;
      if(diff>=3)msgs.push(['warn',`搭配合理性：CPU 内部档位（${ct}）明显高于显卡（${gt}）。如果主要玩游戏，可能把过多预算放在 CPU；这是搭配提醒，不是“瓶颈百分比”。`]);
      else if(diff<=-3)msgs.push(['warn',`搭配合理性：显卡内部档位（${gt}）明显高于 CPU（${ct}）。高帧率/CPU敏感游戏可能更容易受平台限制；建议核对目标游戏实测。`]);
      else msgs.push(['good','搭配合理性：CPU 与显卡的内部性能档位没有发现明显跨级失衡。']);
    }

    if(cpu&&board&&ct!=null){
      const n=String(board.name||'').toLowerCase();
      if(ct>=6&&/(h610|h810|a520|a620)/i.test(n))msgs.push(['warn','搭配合理性：高阶 CPU 搭配入门芯片组主板。即使插槽兼容，也要重点核对该具体主板的供电、BIOS 和功耗限制。']);
      if(ct<=3&&/(x870e|x870|z890|maximus|godlike|taichi aqua)/i.test(n))msgs.push(['warn','搭配合理性：入门/中低档 CPU 搭配高端主板，可能存在明显预算冗余；如果是为了扩展接口或未来升级则可以保留。']);
      if(bt!=null&&bt-ct>=4)msgs.push(['warn','主板内部档位明显高于 CPU。软件不会直接判“浪费”，但会提醒你检查这笔预算是否真的换来了需要的接口/扩展。']);
    }

    if(gpu&&psu&&psu.watts&&gpu.recommendedPsu){
      const p=Number(psu.watts),need=Number(gpu.recommendedPsu);
      if(p<need)msgs.push(['bad',`电源合理性：当前 ${p}W 低于该显卡记录中的建议电源 ${need}W。`]);
      else if(p>=need+400)msgs.push(['warn',`电源合理性：当前 ${p}W 比显卡建议值 ${need}W 高很多，除非你计划后续升级，否则可能存在容量冗余。`]);
    }

    if(cpu&&cooler&&cpu.power&&cpu.verifiedSpecs&&kot!=null){
      if(Number(cpu.power)>=120&&kot<=3)msgs.push(['warn','散热合理性：CPU 已核验功耗较高，而当前散热器属于较低内部档位。请进一步核对具体散热器实测能力。']);
    }

    const budget=Number(state.budget)||0;
    if(budget>0&&d.sum>budget)msgs.push(['bad',`预算：目前“已核验价格”合计 ${money(d.sum)} 已超过预算 ${money(budget)}。未核验价格还没有计入。`]);

    d.reasonSummary={missing:coreMissing.length,cpuTier:ct,gpuTier:gt};
    return d;
  };

  window.renderDiagnostics=function(){
    const d=calcDiagnostics();
    if(safe$('verifiedTotal'))safe$('verifiedTotal').textContent=money(d.sum||0);
    if(safe$('unknownCount'))safe$('unknownCount').textContent=(d.unknown||[]).length+' 项';
    if(safe$('budgetLeft'))safe$('budgetLeft').textContent=money(Math.max(0,(Number(state.budget)||0)-(d.sum||0)));
    const box=safe$('diagnostics');
    if(box)box.innerHTML=(d.msgs&&d.msgs.length?d.msgs:[['warn','请先选择配件。']]).map(m=>`<div class="notice ${m[0]}">${esc(m[1])}</div>`).join('');
    const bad=(d.msgs||[]).filter(x=>x[0]==='bad').length,warn=(d.msgs||[]).filter(x=>x[0]==='warn').length;
    if(bad)assistant(`自动检查：发现 ${bad} 个必须处理的问题，另有 ${warn} 条提醒。`,'bad');
    else if(warn)assistant(`自动检查：没有确认的硬冲突，但有 ${warn} 条完整性/合理性/数据提醒。`,'warn');
    else if(CATS.some(c=>selected(c)))assistant('自动检查：当前已核验字段未发现冲突，搭配档位也没有明显失衡。','good');
  };

  window.reasonCheckNow=function(){
    renderDiagnostics();
    const d=calcDiagnostics(),bad=d.msgs.filter(x=>x[0]==='bad'),warn=d.msgs.filter(x=>x[0]==='warn'),good=d.msgs.filter(x=>x[0]==='good');
    const lines=['【当前配置自动检查】',`必须处理：${bad.length} 条`,`提醒：${warn.length} 条`,`通过项：${good.length} 条`,''];
    bad.forEach(x=>lines.push('❌ '+x[1]));warn.slice(0,8).forEach(x=>lines.push('⚠ '+x[1]));good.slice(0,5).forEach(x=>lines.push('✅ '+x[1]));
    openAssistant(lines.join('\n'));
  };

  function addDirectCheckButton(){
    const title=document.querySelector('#build .stickySide .sectionTitle');
    if(!title||safe$('reasonCheckBtn'))return;
    const b=document.createElement('button');b.id='reasonCheckBtn';b.className='mini';b.textContent='一键检查';b.onclick=reasonCheckNow;title.appendChild(b);
  }

  function boot(){
    if(booted)return;booted=true;
    bindBottomNav();addManualPanel();addDirectCheckButton();
    const sub=document.querySelector('.top .sub');if(sub)sub.textContent='v0.6.2 · 自主选配 · 自动兼容/合理性诊断';
    const badge=document.querySelector('.hero .badge');if(badge)badge.textContent='SUPER SMART v0.6.2';
    try{renderAll();}catch(e){console.error('v062 renderAll',e);}
    robustGo(document.querySelector('.page.on')?.id||'home');
    assistant(`v0.6.2 已启用：底部导航已重新绑定；你可以自主选任意配件，系统会自动检查兼容和搭配合理性。`,'good');
  }

  window.__bootV062=boot;
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
  else setTimeout(boot,0);
})();
