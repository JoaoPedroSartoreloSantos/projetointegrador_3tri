(function(){
var D=[["Informática",52,"Alunos quietos digitando"],["Sala do 2º ano C",55,"Apresentação baixa em sala"],["Aula vaga do 2º ano de Administração",65,"Turma fora da sala em aula vaga"],["Educação Física do 9º ano",69,"Alunos jogando bola"],["Sala vazia do 2º ano A",50,"Sala completamente vazia de pessoas"],["Secretaria",48,"Ambiente Administrativo"],["Quadra aberta no recreio",80,"Apresentação de um grupo da escola (VillaAfro) na quadra aberta"]];
var tb=document.querySelector("#dbT tbody"),bars=document.getElementById("dbBars");
D.forEach(function(r,n){
  var tr=document.createElement("tr");
  [r[0],r[1],r[2],["9h42","9h44","9h46","9h48","9h50","9h52","10h"][n]].forEach(function(v,i){var td=document.createElement("td");td.textContent=v;tr.appendChild(td);});
  tb.appendChild(tr);
});
D.slice().sort(function(a,b){return b[1]-a[1];}).forEach(function(r){
  var row=document.createElement("div");row.className="brow";
  var l=document.createElement("span");l.textContent=r[0];
  var tr=document.createElement("div");tr.className="btrack";
  var f=document.createElement("div");f.className="bfill";f.style.width=r[1]+"%";f.textContent=r[1]+" dB";
  tr.appendChild(f);row.appendChild(l);row.appendChild(tr);bars.appendChild(row);
});
})();

(function(){
function $(i){return document.getElementById(i);}
function show(el,t){el.hidden=false;el.textContent=t;}
var SUF="___COFRE_OK___";
function enc(t,k){return Array.from(SUF+t).map(function(c){return String.fromCodePoint(c.codePointAt(0)+k);}).join("");}
function dec(c,k){try{var t=Array.from(c).map(function(x){return String.fromCodePoint(x.codePointAt(0)-k);}).join("");if(t.indexOf(SUF)===0)return{ok:true,r:t.slice(SUF.length)};}catch(e){}return{ok:false,r:"Não foi possível descriptografar (chave incorreta)."};}
function key(id){var v=parseInt($(id).value,10);return isNaN(v)?null:v;}
$("cGo").onclick=function(){
  var t=$("cIn").value,k=key("cKey");
  $("cOut").hidden=false;
  if(!t||k===null){$("cTxt").textContent="Digite a informação e uma chave inteira.";return;}
  try{$("cTxt").textContent=enc(t,k);}catch(e){$("cTxt").textContent="Chave inválida. Use um número menor.";}
};
$("cCopy").onclick=function(){try{navigator.clipboard.writeText($("cTxt").textContent);this.textContent="✔ Copiado";}catch(e){this.textContent="Selecione e copie manualmente";}};
$("dGo").onclick=function(){
  var c=$("dIn").value,k=key("dKey");
  $("dOut").hidden=false;
  if(!c||k===null){$("dTit").textContent="Atenção";$("dTxt").textContent="Cole o código e digite a chave.";return;}
  var r=dec(c,k);
  $("dTit").textContent=r.ok?"Informação revelada":"Erro na operação";
  $("dTxt").textContent=r.r;
};
var R={"Leitura Facilitada":"- Use palavras simples do cotidiano e frases curtas.\n- Organize em tópicos com negrito.\n- Não infantilize o leitor.","Deficiência Visual":"- Descreva do geral para os detalhes (da esquerda para a direita).\n- Formate para leitores de tela (NVDA/TalkBack), sem emojis.","Escrita Inclusiva":"- Evite termos capacitistas.\n- Coloque sempre a pessoa antes da deficiência (ex.: “pessoa com deficiência”)."};
$("pGo").onclick=function(){
  var f=$("pFoco").value,n=$("pNivel").value,t=$("pIn").value;
  if(!t.trim()){$("pOut").value="⚠️ Digite um comando simples antes de refinar!";return;}
  $("pOut").value=n==="Direto"
   ?"Atue como Especialista em "+f+".\n\nTAREFA:\n"+t+"\n\nREGRAS:\n"+R[f]+"\n- Não omita avisos de segurança."
   :"# PAPEL\nAtue como Especialista Sênior em Acessibilidade ("+f+").\n\n# PASSO A PASSO\n1. Extraia os avisos críticos e as informações principais.\n2. Remova termos técnicos difíceis ou capacitistas.\n3. Adapte o texto com clareza e respeito.\n\n# REGRAS OBRIGATÓRIAS\n- Zero alucinação: não invente informações.\n- Trava de segurança: nunca apague alertas de risco.\n"+R[f]+"\n\n# TEXTO ORIGINAL\n---\n"+t+"\n---";
};
$("pClr").onclick=function(){$("pIn").value="";$("pOut").value="";};
$("pCopy").onclick=function(){try{navigator.clipboard.writeText($("pOut").value);this.textContent="✔ Copiado";}catch(e){this.textContent="Copie manualmente";}};
var T={"Arroz Integral":[124,25.8,2.6,1],"Feijão Preto":[77,14,4.5,2],"Peito de Frango Grelhado":[165,0,31,74],"Salada de Alface e Tomate":[18,3.9,0.9,10],"Sopa Pronta em Lata":[68,9,1.5,780]};
var items=[];
Object.keys(T).forEach(function(k){var o=document.createElement("option");o.textContent=k;$("nFood").appendChild(o);});
function draw(){
  var l=$("nList");l.textContent="";
  if(!items.length){l.textContent="Nenhum alimento adicionado.";}
  items.forEach(function(it,i){
    var d=document.createElement("div");d.className="item";
    var s=document.createElement("span");s.textContent=it.n+" ("+it.g+" g)";
    var b=document.createElement("button");b.textContent="x";b.setAttribute("aria-label","Remover "+it.n);
    b.onclick=function(){items.splice(i,1);draw();};
    d.appendChild(s);d.appendChild(b);l.appendChild(d);
  });
  var t=[0,0,0,0];
  items.forEach(function(it){for(var j=0;j<4;j++)t[j]+=T[it.n][j]*it.g/100;});
  $("sCal").textContent=t[0].toFixed(1)+" kcal";$("sCar").textContent=t[1].toFixed(1)+" g";
  $("sPro").textContent=t[2].toFixed(1)+" g";$("sSod").textContent=t[3].toFixed(1)+" mg";
  var s=t[3]>600,c=t[1]>50;
  $("aSod").className=s?"bad":"ok";$("aSod").textContent=s?"ALERTA (hipertensão): sódio elevado, acima de 600 mg.":"OK (sódio): nível seguro.";
  $("aCar").className=c?"bad":"ok";$("aCar").textContent=c?"ALERTA (diabetes): carboidratos elevados, acima de 50 g.":"OK (carboidratos): nível equilibrado.";
}
$("nAdd").onclick=function(){
  var g=parseFloat($("nG").value);
  if(isNaN(g)||g<=0){$("nMsg").textContent="Digite uma quantidade válida em gramas.";return;}
  $("nMsg").textContent="";items.push({n:$("nFood").value,g:g});$("nG").value="";draw();
};
$("nClr").onclick=function(){items=[];$("nG").value="";$("nMsg").textContent="";draw();};
draw();
})();

var tabs=["robotica","fisica","programacao","resumo"];
function show(id){
  if(tabs.indexOf(id)<0)id="robotica";
  tabs.forEach(function(t){
    document.getElementById(t).hidden=(t!==id);
    document.getElementById("t-"+t).setAttribute("aria-selected",t===id);
  });
  stopSpeak();
}
tabs.forEach(function(t){document.getElementById("t-"+t).onclick=function(){location.hash=t;};});
window.addEventListener("hashchange",function(){show(location.hash.slice(1));});
show(location.hash.slice(1));

function $s(i){return document.getElementById(i);}
var size=100;
function zoom(n){size=Math.max(80,Math.min(200,n));document.documentElement.style.fontSize=size+"%";$s("zv").textContent=size+"%";}
$s("aPlus").onclick=function(){zoom(size+10);};
$s("aMinus").onclick=function(){zoom(size-10);};
$s("aReset").onclick=function(){zoom(100);};

var root=document.documentElement,tb=document.getElementById("theme");
function isDark(){return root.dataset.theme?root.dataset.theme==="dark":matchMedia("(prefers-color-scheme: dark)").matches;}
function label(){tb.textContent=isDark()?"☀️ Claro":"🌙 Escuro";}
tb.onclick=function(){root.dataset.theme=isDark()?"light":"dark";label();};
label();

var spk=false,paused=false,q=[],qi=0,rate=1,tok=0;
function ui(){$s("speak").textContent=spk?"⏹ Parar leitura":"🔊 Ouvir página";$s("spPause").disabled=!spk;$s("spPause").textContent=paused?"▶":"⏸";}
function stopSpeak(){tok++;if("speechSynthesis" in window)speechSynthesis.cancel();spk=false;paused=false;q=[];ui();}
function say(){
  if(qi>=q.length){stopSpeak();return;}
  var t=tok,u=new SpeechSynthesisUtterance(q[qi]);u.lang="pt-BR";u.rate=rate;
  var v=speechSynthesis.getVoices().filter(function(x){return x.lang&&x.lang.toLowerCase().indexOf("pt")===0;})[0];if(v)u.voice=v;
  u.onend=function(){if(t===tok&&spk){qi++;say();}};
  speechSynthesis.speak(u);
}
function start(text){
  if(!("speechSynthesis" in window)){$s("speak").textContent="Voz indisponível";return;}
  stopSpeak();q=text.replace(/\s+/g," ").match(/[^.!?:;]+[.!?:;]?\s*/g)||[];qi=0;spk=true;ui();say();
}
$s("speak").onclick=function(){if(spk){stopSpeak();return;}start(document.querySelector(".panel:not([hidden])").innerText);};
$s("spSel").onclick=function(){
  var s=String(getSelection());
  if(s.trim()){start(s);return;}
  var b=$s("spSel");b.textContent="Selecione um texto";setTimeout(function(){b.textContent="Ler seleção";},1800);
};
$s("spPause").onclick=function(){if(!spk)return;if(paused){speechSynthesis.resume();paused=false;}else{speechSynthesis.pause();paused=true;}ui();};
$s("spRate").onchange=function(){rate=parseFloat(this.value);};

var M={A:".-",B:"-...",C:"-.-.",D:"-..",E:".",F:"..-.",G:"--.",H:"....",I:"..",J:".---",K:"-.-",L:".-..",M:"--",N:"-.",O:"---",P:".--.",Q:"--.-",R:".-.",S:"...",T:"-",U:"..-",V:"...-",W:".--",X:"-..-",Y:"-.--",Z:"--..",0:"-----",1:".----",2:"..---",3:"...--",4:"....-",5:"....."," 6":"-....",6:"-....",7:"--...",8:"---..",9:"----."};
function morse(s){
  return s.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").split("").map(function(c){return c===" "?"/":(M[c]||"");}).filter(Boolean).join(" ");
}
var mi=document.getElementById("mIn"),mo=document.getElementById("mOut");
function upd(){mo.textContent=morse(mi.value);}
mi.oninput=upd;upd();

/* ===== CONTROLADOR DOS SLIDES (ABA RESUMO) ===== */
(function() {
  var slides = document.querySelectorAll("#slideDeckWrapper .web-slide");
  var counter = document.getElementById("slideCounter");
  var btnPrev = document.getElementById("slidePrev");
  var btnNext = document.getElementById("slideNext");
  var btnFull = document.getElementById("slideFull");
  var wrapper = document.getElementById("slideDeckWrapper");
  if (!slides.length) return;

  var idx = 0;
  function renderSlide(n) {
    idx = (n + slides.length) % slides.length;
    slides.forEach(function(s, i) {
      s.classList.toggle("active", i === idx);
    });
    if (counter) counter.textContent = (idx + 1) + " / " + slides.length;
  }

  if (btnPrev) btnPrev.onclick = function() { renderSlide(idx - 1); };
  if (btnNext) btnNext.onclick = function() { renderSlide(idx + 1); };

  if (wrapper) {
    wrapper.addEventListener("click", function(e) {
      if (window.getSelection().toString().trim()) return;
      var rect = wrapper.getBoundingClientRect();
      var clickX = e.clientX - rect.left;
      if (clickX > rect.width * 0.35) {
        renderSlide(idx + 1);
      } else {
        renderSlide(idx - 1);
      }
    });

    wrapper.addEventListener("keydown", function(e) {
      if (e.key === "ArrowRight") renderSlide(idx + 1);
      if (e.key === "ArrowLeft") renderSlide(idx - 1);
    });
  }

  if (btnFull && wrapper) {
    btnFull.onclick = function() {
      if (!document.fullscreenElement) {
        wrapper.requestFullscreen().catch(function(){});
      } else {
        document.exitFullscreen();
      }
    };
  }

  renderSlide(0);
})();