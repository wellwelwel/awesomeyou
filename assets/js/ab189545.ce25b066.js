/*! For license information please see ab189545.ce25b066.js.LICENSE.txt */
"use strict";(self.webpackChunkawesomeyou=self.webpackChunkawesomeyou||[]).push([[842],{2476:function(e,s,r){r.d(s,{S:function(){return n}});var t=r(4848),n=function(e){return e.name.split("").map((function(e,s){return(0,t.jsx)("span",{style:e.trim().length>0?{"--index":s}:void 0,children:e},"name:"+e+":"+s)}))}},4997:function(e,s,r){r.d(s,{A:function(){return t}});const t=(0,r(4722).A)("CircleHelp",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]])},7179:function(e,s,r){r.r(s),r.d(s,{default:function(){return I}});var t=r(675),n=r(467),i=r(6540),l=r(6289),a=r(5199);var o=r(7677),c=r(3378),d=r(7946),h=r(4997),u=r(4722);const x=(0,u.A)("Gamepad2",[["line",{x1:"6",x2:"10",y1:"11",y2:"11",key:"1gktln"}],["line",{x1:"8",x2:"8",y1:"9",y2:"13",key:"qnk9ow"}],["line",{x1:"15",x2:"15.01",y1:"12",y2:"12",key:"krot7o"}],["line",{x1:"18",x2:"18.01",y1:"10",y2:"10",key:"1lcuu1"}],["path",{d:"M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z",key:"mfqc10"}]]);var p=r(8931);const m=(0,u.A)("ClipboardList",[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1",key:"tgr4d6"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",key:"116196"}],["path",{d:"M12 11h4",key:"1jrz19"}],["path",{d:"M12 16h4",key:"n85exb"}],["path",{d:"M8 11h.01",key:"1dfujw"}],["path",{d:"M8 16h.01",key:"18s6g9"}]]),j=(0,u.A)("Trophy",[["path",{d:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6",key:"17hqa7"}],["path",{d:"M18 9h1.5a2.5 2.5 0 0 0 0-5H18",key:"lmptdp"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",key:"1nw9bq"}],["path",{d:"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",key:"1np0yb"}],["path",{d:"M18 2H6v7a6 6 0 0 0 12 0V2Z",key:"u46fv3"}]]),y=(0,u.A)("Award",[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]]);var g=r(7870);const v=(0,u.A)("FlameKindling",[["path",{d:"M12 2c1 3 2.5 3.5 3.5 4.5A5 5 0 0 1 17 10a5 5 0 1 1-10 0c0-.3 0-.6.1-.9a2 2 0 1 0 3.3-2C8 4.5 11 2 12 2Z",key:"1ir223"}],["path",{d:"m5 22 14-4",key:"1brv4h"}],["path",{d:"m5 18 14 4",key:"lgyyje"}]]);var f=r(5136),b=r(3975),w=r(9653),A=r(7621),k=r(1228),z=r(686),M=r(1181),C=r(6844),R=r(215),S=r(4579),E=r(6816),P=r(4721),N=r(2476),L=r(1634),D=r(7914),q=r(4848),I=function(){var e,s,r,u,I,T,H,V,O,U,F,B=(0,i.useState)(null),G=B[0],Z=B[1],J=(0,i.useRef)(null),K=(0,i.useRef)(""),Q=(0,i.useRef)((e=>{let{max:s}=e;if(!(Number.isInteger(s)&&s>0))throw new TypeError("`max` must be a positive integer");let r=0,t=0,n=0,i=[];const{onEviction:l}=e,a=new Map,o=new Array(s).fill(void 0),c=new Array(s).fill(void 0),d=new Array(s).fill(0),h=new Array(s).fill(0),u=(e,s)=>{if(e===n)return;const r=d[e],i=h[e];e===t?t=r:"get"!==s&&0===i||(d[i]=r),0!==r&&(h[r]=i),d[n]=e,h[e]=n,d[e]=0,n=e},x=()=>{const e=t,s=o[e];return null==l||l(s,c[e]),a.delete(s),o[e]=void 0,c[e]=void 0,t=d[e],0!==t&&(h[t]=0),r--,0===r&&(t=n=0),i.push(e),e};return{set(e,d){if(void 0===e)return;let h=a.get(e);void 0===h?(h=r===s?x():i.length>0?i.pop():r,a.set(e,h),o[h]=e,r++):null==l||l(e,c[h]),c[h]=d,1===r?t=n=h:u(h,"set")},get(e){const s=a.get(e);if(void 0!==s)return s!==n&&u(s,"get"),c[s]},peek:e=>{const s=a.get(e);return void 0!==s?c[s]:void 0},has:e=>a.has(e),*keys(){let e=n;for(let s=0;s<r;s++)yield o[e],e=h[e]},*values(){let e=n;for(let s=0;s<r;s++)yield c[e],e=h[e]},*entries(){let e=n;for(let s=0;s<r;s++)yield[o[e],c[e]],e=h[e]},forEach:e=>{let s=n;for(let t=0;t<r;t++){const r=o[s];e(c[s],r),s=h[s]}},delete(e){const s=a.get(e);if(void 0===s)return!1;null==l||l(e,c[s]),a.delete(e),i.push(s),o[s]=void 0,c[s]=void 0;const u=h[s],x=d[s];return 0!==u&&(d[u]=x),0!==x&&(h[x]=u),s===t&&(t=x),s===n&&(n=u),r--,!0},evict:e=>{let s=Math.min(e,r);for(;s>0;)x(),s--},clear(){if("function"==typeof l){const e=a.values();for(let s=e.next();!s.done;s=e.next())l(o[s.value],c[s.value])}a.clear(),o.fill(void 0),c.fill(void 0),i=[],r=0,t=n=0},resize:e=>{if(!(Number.isInteger(e)&&e>0))throw new TypeError("`max` must be a positive integer");if(e!==s){if(e<s){let s=n;const u=Math.min(r,e),x=r-u,p=new Array(e),m=new Array(e),j=new Array(e),y=new Array(e);for(let e=1;e<=x;e++)null==l||l(o[e],c[e]);for(let e=u-1;e>=0;e--)p[e]=o[s],m[e]=c[s],j[e]=e+1,y[e]=e-1,a.set(p[e],e),s=h[s];t=0,n=u-1,r=u,o.length=e,c.length=e,d.length=e,h.length=e;for(let e=0;e<u;e++)o[e]=p[e],c[e]=m[e],d[e]=j[e],h[e]=y[e];i=[];for(let r=u;r<e;r++)i.push(r)}else{const r=e-s;o.push(...new Array(r).fill(void 0)),c.push(...new Array(r).fill(void 0)),d.push(...new Array(r).fill(0)),h.push(...new Array(r).fill(0))}s=e}},get max(){return s},get size(){return r},get available(){return s-r}}})({max:1e3})).current,Y=function(){var e=(0,n.A)((0,t.A)().mark((function e(s){var r;return(0,t.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:s.preventDefault(),null==(r=J.current)||r.classList.remove("active"),(0,i.startTransition)((0,n.A)((0,t.A)().mark((function e(){var r,n,i,l,a,o,c,d,h,u,x,p,m,j;return(0,t.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,r=new FormData(s.currentTarget),n=r.get("repositoryURL"),i=r.get("npm"),l=r.get("homebrew"),a=r.get("pypi"),o=r.get("chocolatey"),c=r.get("vscode"),n&&"string"==typeof n){e.next=11;break}return P.oR.error("Insira uma URL v\xe1lida."),e.abrupt("return");case 11:if(d=(0,D.o)(n),h=d.organization,u=d.repository,x=h.trim()+"/"+u.trim(),p=x+":"+i+":"+l+":"+a+":"+o+":"+c,K.current="https://github.com/"+x,P.oR.dismiss(),Z(null),setTimeout((function(){var e;null==(e=J.current)||e.classList.add("active")}),250),!Q.has(p)){e.next=21;break}return Z(Q.get(p)),e.abrupt("return");case 21:return e.next=23,fetch("https://api.awesomeyou.io",{method:"POST",body:JSON.stringify({repositoryURL:K.current,npm:i,homebrew:l,pypi:a,chocolatey:o,vscode:c})});case 23:return m=e.sent,e.next=26,m.json();case 26:if(j=e.sent,m.ok){e.next=30;break}return setTimeout((function(){P.oR.error(j.message)}),250),e.abrupt("return");case 30:Q.set(p,j),Z(Q.get(p)),e.next=37;break;case 34:e.prev=34,e.t0=e.catch(0),setTimeout((function(){e.t0 instanceof Error&&P.oR.error(e.t0.message)}),250);case 37:case"end":return e.stop()}}),e,null,[[0,34]])}))));case 3:case"end":return e.stop()}}),e)})));return function(s){return e.apply(this,arguments)}}();return(0,q.jsx)(a.A,{title:"Calculadora",description:"Descubra projetos open source incr\xedveis criados e mantidos por desenvolvedores brasileiros.",children:(0,q.jsx)("div",{id:"calculator",children:(0,q.jsxs)("main",{children:[(0,q.jsxs)("header",{children:[(0,q.jsx)("h1",{children:(0,q.jsx)(N.S,{name:"<Descubra seu Score />"})}),(0,q.jsxs)("small",{children:[(0,q.jsx)("p",{children:"Como seu projeto impacta o mundo real?"}),(0,q.jsx)("br",{}),(0,q.jsx)("p",{children:"Seja por divers\xe3o, meta ou at\xe9 mesmo por curiosidade, voc\xea pode calcular a pontua\xe7\xe3o do seu reposit\xf3rio dinamicamente e sem compromisso atrav\xe9s da nossa calculadora."}),(0,q.jsx)("br",{}),(0,q.jsxs)(l.A,{to:"/new",children:["Quer cadastrar seu projeto na ",(0,q.jsx)("strong",{children:"Awesome You"}),"? Siga as instru\xe7\xf5es na p\xe1gina de inscri\xe7\xe3o ",(0,q.jsx)(o.A,{})]})]}),(0,q.jsxs)("form",{onSubmit:Y,children:[(0,q.jsxs)("label",{children:[(0,q.jsxs)("span",{children:[(0,q.jsx)(c.A,{}),(0,q.jsxs)("span",{children:["URL do Reposit\xf3rio ",(0,q.jsx)("em",{children:"*"})]})]}),(0,q.jsx)("input",{placeholder:"Ex.: https://github.com/BrasilAPI/BrasilAPI",type:"text",name:"repositoryURL",required:!0}),(0,q.jsxs)("small",{children:[(0,q.jsx)(d.A,{})," Obrigat\xf3rio."]})]}),(0,q.jsxs)("label",{children:[(0,q.jsxs)("span",{children:[(0,q.jsx)("img",{loading:"lazy",src:"/img/npm.svg",alt:"npm"})," Pacote NPM"," ",(0,q.jsx)("sup",{children:"?"})]}),(0,q.jsx)("input",{placeholder:"Ex.: poku",type:"text",name:"npm"}),(0,q.jsxs)("small",{children:[(0,q.jsx)(h.A,{})," Nome do pacote npm, caso exista (opcional)."]})]}),(0,q.jsxs)("label",{children:[(0,q.jsxs)("span",{children:[(0,q.jsx)("img",{loading:"lazy",src:"/img/homebrew.svg",alt:"npm"})," ","Pacote Homebrew",(0,q.jsx)("sup",{children:"?"})]}),(0,q.jsx)("input",{placeholder:"Ex.: elixir",type:"text",name:"homebrew"}),(0,q.jsxs)("small",{children:[(0,q.jsx)(h.A,{})," Nome do pacote Homebrew, caso exista (opcional)."]})]}),(0,q.jsxs)("label",{children:[(0,q.jsxs)("span",{children:[(0,q.jsx)("img",{loading:"lazy",src:"/img/pypi.svg",alt:"PyPi"})," Pacote PyPi ",(0,q.jsx)("sup",{children:"?"})]}),(0,q.jsx)("input",{placeholder:"Ex.: socketify",type:"text",name:"pypi"}),(0,q.jsxs)("small",{children:[(0,q.jsx)(h.A,{})," Nome do pacote PyPi, caso exista (opcional)."]})]}),(0,q.jsxs)("label",{children:[(0,q.jsxs)("span",{children:[(0,q.jsx)("img",{loading:"lazy",src:"/img/chocolatey.svg",alt:"Chocolatey"})," ","Pacote Chocolatey ",(0,q.jsx)("sup",{children:"?"})]}),(0,q.jsx)("input",{placeholder:"Ex.: rio-terminal",type:"text",name:"chocolatey"}),(0,q.jsxs)("small",{children:[(0,q.jsx)(h.A,{})," Nome do pacote Chocolatey, caso exista (opcional)."]})]}),(0,q.jsxs)("label",{children:[(0,q.jsxs)("span",{children:[(0,q.jsx)("img",{loading:"lazy",src:"/img/vscode.svg",alt:"Visual Studio Code Marketplace"})," ","Visual Studio Code ID ",(0,q.jsx)("sup",{children:"?"})]}),(0,q.jsx)("input",{placeholder:"Ex.: dracula-theme.theme-dracula",type:"text",name:"vscode"}),(0,q.jsxs)("small",{children:[(0,q.jsx)(h.A,{})," ID da extens\xe3o do Visual Studio Code Marketplace, caso exista (opcional)."]})]}),(0,q.jsx)("label",{className:"span",children:(0,q.jsxs)("span",{children:[(0,q.jsx)("input",{type:"checkbox",name:"terms",required:!0}),"Entendo que o score \xe9 baseado em m\xe9tricas automatizadas limitadas e n\xe3o reflete a qualidade dos projetos. ",(0,q.jsx)("em",{children:"*"})]})}),(0,q.jsxs)("button",{children:[(0,q.jsx)(x,{})," Gerar Score"]})]})]}),(0,q.jsx)("main",{ref:J,children:(0,q.jsx)("div",{className:"score",children:G&&(0,q.jsxs)(q.Fragment,{children:[(0,q.jsxs)(L.w,{to:"https://github.com/wellwelwel/awesomeyou/issues/4",children:["Acredita que essa pontua\xe7\xe3o deveria ser diferente? Sugira melhorias e ideias para aprimorar as automa\xe7\xf5es",(0,q.jsx)(p.A,{})]}),(0,q.jsxs)("h3",{children:[(0,q.jsx)(m,{})," Resultado"]}),(0,q.jsx)("table",{children:(0,q.jsxs)("tbody",{children:[(0,q.jsxs)("tr",{children:[(0,q.jsx)("td",{children:"Reposit\xf3rio"}),(0,q.jsxs)("td",{children:[(0,q.jsx)("img",{src:"https://avatars.githubusercontent.com/"+G.username,loading:"lazy",className:"organization",alt:G.username+" profile avatar"})," ",G.username,"/",G.repository]})]}),(0,q.jsxs)("tr",{children:[(0,q.jsx)("td",{children:(0,q.jsx)("span",{children:"Score"})}),(0,q.jsxs)("td",{children:[G.score>1e6?(0,q.jsx)(j,{}):G.score>1e5?(0,q.jsx)(y,{}):G.score>1e4?(0,q.jsx)(g.A,{}):G.score>1e3?(0,q.jsx)(v,{}):(0,q.jsx)(f.A,{}),(0,q.jsx)("span",{className:"score",children:Number(G.score).toLocaleString("pt-BR")})]})]}),(0,q.jsxs)("tr",{className:G.license.includes("not specified")?"error":void 0,children:[(0,q.jsx)("td",{children:"Licen\xe7a"}),(0,q.jsxs)("td",{children:[(0,q.jsx)(b.A,{}),(0,q.jsx)("span",{className:"score",children:null!=G&&G.license.includes("not specified")?"Licen\xe7a n\xe3o especificada":null==G?void 0:G.license})]})]})]})}),(0,q.jsxs)("h3",{children:[(0,q.jsx)(w.A,{})," Impacto"]}),(0,q.jsx)("table",{children:(0,q.jsxs)("tbody",{children:[(0,q.jsxs)("tr",{children:[(0,q.jsx)("td",{children:"Contribuidores"}),(0,q.jsxs)("td",{children:[(0,q.jsx)(A.A,{}),(null==G||null==(e=G.contributors)?void 0:e.label)||0]})]}),(0,q.jsxs)("tr",{children:[(0,q.jsx)("td",{children:"Dependentes"}),(0,q.jsxs)("td",{children:[(0,q.jsx)(k.A,{}),null==G||null==(s=G.repositoryDependents)?void 0:s.label]})]}),(null==G||null==(r=G.npm)?void 0:r.label)&&(0,q.jsxs)("tr",{children:[(0,q.jsx)("td",{children:(0,q.jsx)("span",{children:"Downloads por M\xeas"})}),(0,q.jsxs)("td",{children:[(0,q.jsx)("img",{loading:"lazy",src:"/img/npm.svg",alt:"npm"}),G.npm.label]})]}),(null==G||null==(u=G.homebrew)?void 0:u.label)&&(0,q.jsxs)("tr",{children:[(0,q.jsx)("td",{children:(0,q.jsx)("span",{children:"Downloads por M\xeas"})}),(0,q.jsxs)("td",{children:[(0,q.jsx)("img",{loading:"lazy",src:"/img/homebrew.svg",alt:"Homebrew"}),G.homebrew.label]})]}),(null==G||null==(I=G.pypi)?void 0:I.label)&&(0,q.jsxs)("tr",{children:[(0,q.jsx)("td",{children:(0,q.jsx)("span",{children:"Downloads por M\xeas"})}),(0,q.jsxs)("td",{children:[(0,q.jsx)("img",{loading:"lazy",src:"/img/pypi.svg",alt:"PyPi"}),G.pypi.label]})]}),(null==G||null==(T=G.chocolatey)?void 0:T.label)&&(0,q.jsxs)("tr",{title:"Chocolatey",children:[(0,q.jsx)("td",{children:(0,q.jsx)("span",{children:"Downloads Totais:"})}),(0,q.jsxs)("td",{children:[(0,q.jsx)("img",{loading:"lazy",src:"/img/chocolatey.svg"}),G.chocolatey.label]})]}),(null==G||null==(H=G.vscode)?void 0:H.label)&&(0,q.jsxs)("tr",{title:"Visual Studio Code Marketplace",children:[(0,q.jsx)("td",{children:(0,q.jsx)("span",{children:"Downloads Totais:"})}),(0,q.jsxs)("td",{children:[(0,q.jsx)("img",{loading:"lazy",src:"/img/vscode.svg"}),G.vscode.label]})]}),(0,q.jsxs)("tr",{children:[(0,q.jsx)("td",{children:"Forks"}),(0,q.jsxs)("td",{children:[(0,q.jsx)(z.A,{}),(null==G||null==(V=G.forks)?void 0:V.label)||0]})]}),(0,q.jsxs)("tr",{children:[(0,q.jsx)("td",{children:"Estrelas"}),(0,q.jsxs)("td",{children:[(0,q.jsx)(M.A,{}),(null==G||null==(O=G.stars)?void 0:O.label)||0]})]})]})}),(0,q.jsxs)("h3",{children:[(0,q.jsx)(C.A,{})," Atividade"]}),(0,q.jsx)("table",{children:(0,q.jsxs)("tbody",{children:[(0,q.jsxs)("tr",{children:[(0,q.jsx)("td",{children:"Issues abertas"}),(0,q.jsxs)("td",{children:[(0,q.jsx)(R.A,{}),(null==G||null==(U=G.issues)?void 0:U.label)||0]})]}),(0,q.jsxs)("tr",{children:[(0,q.jsx)("td",{children:"Issues fechadas"}),(0,q.jsxs)("td",{children:[(0,q.jsx)(S.A,{}),(null==G||null==(F=G.closedIssues)?void 0:F.label)||0]})]}),(0,q.jsxs)("tr",{children:[(0,q.jsx)("td",{children:"\xdaltimo commit"}),(0,q.jsxs)("td",{children:[(0,q.jsx)(E.A,{}),(null==G?void 0:G.commits)||0]})]})]})})]})})})]})})})}},7677:function(e,s,r){r.d(s,{A:function(){return t}});const t=(0,r(4722).A)("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]])},7914:function(e,s,r){r.d(s,{o:function(){return t}});var t=function(e){var s=String(e).trim(),r=Object.freeze({domain:23,organization:39,repository:100}),t=s.length,n=r.domain+r.organization+r.repository;if(t>n)throw new Error("O tamanho m\xe1ximo da URL foi excedido ("+t+"/"+n+").");var i=s.match(/^https?:\/\/github\.com\/([^\/]+)\/([^\/]+)(?:\/|$)/);if(!i||!i[1]||!i[2])throw new Error("A URL do reposit\xf3rio \xe9 inv\xe1lida.");var l={organization:i[1],repository:i[2]};if(l.organization.length>r.organization)throw new Error("O nome da organiza\xe7\xe3o excedeu o tamanho de caracteres ("+l.organization.length+"/"+r.organization+").");if(l.repository.length>r.repository)throw new Error("O nome do reposit\xf3rio excedeu o tamanho de caracteres ("+l.repository.length+"/"+r.repository+").");return l}},7946:function(e,s,r){r.d(s,{A:function(){return t}});const t=(0,r(4722).A)("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]])}}]);