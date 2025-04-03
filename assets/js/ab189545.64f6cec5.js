/*! For license information please see ab189545.64f6cec5.js.LICENSE.txt */
"use strict";(self.webpackChunkawesomeyou=self.webpackChunkawesomeyou||[]).push([[842],{2476:function(e,s,r){r.d(s,{S:function(){return t}});var n=r(4848),t=function(e){return e.name.split("").map((function(e,s){return(0,n.jsx)("span",{style:e.trim().length>0?{"--index":s}:void 0,children:e},"name:"+e+":"+s)}))}},4997:function(e,s,r){r.d(s,{A:function(){return n}});const n=(0,r(4722).A)("circle-help",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]])},7677:function(e,s,r){r.d(s,{A:function(){return n}});const n=(0,r(4722).A)("chevron-right",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]])},7914:function(e,s,r){r.d(s,{o:function(){return t}});var n=Object.freeze({domain:23,organization:39,repository:100}),t=function(e){var s=String(e).trim(),r=s.length,t=n.domain+n.organization+n.repository;if(r>t)throw new Error("O tamanho m\xe1ximo da URL foi excedido ("+r+"/"+t+").");var i=s.match(/^https?:\/\/github\.com\/([^\/]+)\/([^\/]+)(?:\/|$)/);if(!i||!i[1]||!i[2])throw new Error("A URL do reposit\xf3rio \xe9 inv\xe1lida.");var l={organization:i[1],repository:i[2]};if(l.organization.length>n.organization)throw new Error("O nome da organiza\xe7\xe3o excedeu o tamanho de caracteres ("+l.organization.length+"/"+n.organization+").",{cause:400});if(l.repository.length>n.repository)throw new Error("O nome do reposit\xf3rio excedeu o tamanho de caracteres ("+l.repository.length+"/"+n.repository+").",{cause:400});if(-1!==l.repository.indexOf("/")||-1!==l.repository.indexOf("#")||-1!==l.repository.indexOf("?"))throw new Error("Verifique a URL do reposit\xf3rio.",{cause:400});return l}},7946:function(e,s,r){r.d(s,{A:function(){return n}});const n=(0,r(4722).A)("circle-alert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]])},9513:function(e,s,r){r.r(s),r.d(s,{default:function(){return O}});var n=r(675),t=r(467),i=r(6540),l=r(6289),o=r(9912);var a=r(9229),c=r(7677),d=r(3378),h=r(7946),u=r(4997),x=r(4722);const p=(0,x.A)("gamepad-2",[["line",{x1:"6",x2:"10",y1:"11",y2:"11",key:"1gktln"}],["line",{x1:"8",x2:"8",y1:"9",y2:"13",key:"qnk9ow"}],["line",{x1:"15",x2:"15.01",y1:"12",y2:"12",key:"krot7o"}],["line",{x1:"18",x2:"18.01",y1:"10",y2:"10",key:"1lcuu1"}],["path",{d:"M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z",key:"mfqc10"}]]);var m=r(8931);const j=(0,x.A)("clipboard-list",[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1",key:"tgr4d6"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",key:"116196"}],["path",{d:"M12 11h4",key:"1jrz19"}],["path",{d:"M12 16h4",key:"n85exb"}],["path",{d:"M8 11h.01",key:"1dfujw"}],["path",{d:"M8 16h.01",key:"18s6g9"}]]);var y=r(5899),g=r(4180),f=r(7870),v=r(5321),b=r(5136),w=r(3975),A=r(9653),k=r(7621),z=r(1228),R=r(686),S=r(1181),E=r(6844),M=r(215),N=r(4579),P=r(6816),C=r(4721),D=r(2476),L=r(1634),I=r(7914),q=r(4848),O=function(){var e,s,r,x,O,T,U,V,H,B,F,G=(0,i.useState)(null),J=G[0],Q=G[1],Y=(0,i.useRef)(null),$=(0,i.useRef)(""),K=(0,i.useRef)((e=>{let{max:s}=e;if(!(Number.isInteger(s)&&s>0))throw new TypeError("`max` must be a positive integer");let r=0,n=0,t=0,i=[];const{onEviction:l}=e,o=new Map,a=new Array(s).fill(void 0),c=new Array(s).fill(void 0),d=new Array(s).fill(0),h=new Array(s).fill(0),u=(e,s)=>{if(e===t)return;const r=d[e],i=h[e];e===n?n=r:"get"!==s&&0===i||(d[i]=r),0!==r&&(h[r]=i),d[t]=e,h[e]=t,d[e]=0,t=e},x=()=>{const e=n,s=a[e];return null==l||l(s,c[e]),o.delete(s),a[e]=void 0,c[e]=void 0,n=d[e],0!==n&&(h[n]=0),r--,0===r&&(n=t=0),i.push(e),e};return{set(e,d){if(void 0===e)return;let h=o.get(e);void 0===h?(h=r===s?x():i.length>0?i.pop():r,o.set(e,h),a[h]=e,r++):null==l||l(e,c[h]),c[h]=d,1===r?n=t=h:u(h,"set")},get(e){const s=o.get(e);if(void 0!==s)return s!==t&&u(s,"get"),c[s]},peek:e=>{const s=o.get(e);return void 0!==s?c[s]:void 0},has:e=>o.has(e),*keys(){let e=t;for(let s=0;s<r;s++)yield a[e],e=h[e]},*values(){let e=t;for(let s=0;s<r;s++)yield c[e],e=h[e]},*entries(){let e=t;for(let s=0;s<r;s++)yield[a[e],c[e]],e=h[e]},forEach:e=>{let s=t;for(let n=0;n<r;n++){const r=a[s];e(c[s],r),s=h[s]}},delete(e){const s=o.get(e);if(void 0===s)return!1;null==l||l(e,c[s]),o.delete(e),i.push(s),a[s]=void 0,c[s]=void 0;const u=h[s],x=d[s];return 0!==u&&(d[u]=x),0!==x&&(h[x]=u),s===n&&(n=x),s===t&&(t=u),r--,!0},evict:e=>{let s=Math.min(e,r);for(;s>0;)x(),s--},clear(){if("function"==typeof l){const e=o.values();for(let s=e.next();!s.done;s=e.next())l(a[s.value],c[s.value])}o.clear(),a.fill(void 0),c.fill(void 0),i=[],r=0,n=t=0},resize:e=>{if(!(Number.isInteger(e)&&e>0))throw new TypeError("`max` must be a positive integer");if(e!==s){if(e<s){let s=t;const u=Math.min(r,e),x=r-u,p=new Array(e),m=new Array(e),j=new Array(e),y=new Array(e);for(let e=1;e<=x;e++)null==l||l(a[e],c[e]);for(let e=u-1;e>=0;e--)p[e]=a[s],m[e]=c[s],j[e]=e+1,y[e]=e-1,o.set(p[e],e),s=h[s];n=0,t=u-1,r=u,a.length=e,c.length=e,d.length=e,h.length=e;for(let e=0;e<u;e++)a[e]=p[e],c[e]=m[e],d[e]=j[e],h[e]=y[e];i=[];for(let r=u;r<e;r++)i.push(r)}else{const r=e-s;a.push(...new Array(r).fill(void 0)),c.push(...new Array(r).fill(void 0)),d.push(...new Array(r).fill(0)),h.push(...new Array(r).fill(0))}s=e}},get max(){return s},get size(){return r},get available(){return s-r}}})({max:1e3})).current,W=function(){var e=(0,t.A)((0,n.A)().mark((function e(s){var r;return(0,n.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:s.preventDefault(),null==(r=Y.current)||r.classList.remove("active"),(0,i.startTransition)((0,t.A)((0,n.A)().mark((function e(){var r,t,i,l,o,a,c,d,h,u,x,p,m,j;return(0,n.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,r=new FormData(s.currentTarget),t=r.get("repositoryURL"),i=r.get("npm"),l=r.get("homebrew"),o=r.get("pypi"),a=r.get("chocolatey"),c=r.get("vscode"),t&&"string"==typeof t){e.next=11;break}return C.oR.error("Insira uma URL v\xe1lida."),e.abrupt("return");case 11:if(d=(0,I.o)(t),h=d.organization,u=d.repository,x=h.trim()+"/"+u.trim(),p=x+":"+i+":"+l+":"+o+":"+a+":"+c,$.current="https://github.com/"+x,C.oR.dismiss(),Q(null),setTimeout((function(){var e;null==(e=Y.current)||e.classList.add("active")}),250),!K.has(p)){e.next=21;break}return Q(K.get(p)),e.abrupt("return");case 21:return e.next=23,fetch("https://api.awesomeyou.io",{method:"POST",body:JSON.stringify({repositoryURL:$.current,npm:i,homebrew:l,pypi:o,chocolatey:a,vscode:c})});case 23:return m=e.sent,e.next=26,m.json();case 26:if(j=e.sent,m.ok){e.next=30;break}return setTimeout((function(){C.oR.error(j.message)}),250),e.abrupt("return");case 30:K.set(p,j),Q(K.get(p)),e.next=37;break;case 34:e.prev=34,e.t0=e.catch(0),setTimeout((function(){e.t0 instanceof Error&&C.oR.error(e.t0.message)}),250);case 37:case"end":return e.stop()}}),e,null,[[0,34]])}))));case 3:case"end":return e.stop()}}),e)})));return function(s){return e.apply(this,arguments)}}();return(0,q.jsx)(o.A,{title:"Calculadora",description:"Descubra projetos open source incr\xedveis criados e mantidos por desenvolvedores brasileiros.",children:(0,q.jsx)("div",{id:"calculator",children:(0,q.jsxs)("main",{children:[(0,q.jsxs)("header",{children:[(0,q.jsx)("h1",{"aria-label":"Descubra seu Score",children:(0,q.jsx)(D.S,{name:"<Descubra seu Score />"})}),(0,q.jsxs)("small",{className:"baloon",children:[(0,q.jsx)("div",{className:"float",children:(0,q.jsx)(a.A,{})}),(0,q.jsx)("span",{children:"Como seu projeto impacta o mundo real?"})]}),(0,q.jsxs)("small",{children:[(0,q.jsx)("p",{children:"Seja por divers\xe3o, meta ou at\xe9 mesmo por curiosidade, voc\xea pode calcular a pontua\xe7\xe3o do seu reposit\xf3rio dinamicamente e sem compromisso atrav\xe9s da nossa calculadora."}),(0,q.jsx)("br",{}),(0,q.jsxs)(l.A,{to:"/new",children:["Quer cadastrar seu projeto na ",(0,q.jsx)("strong",{children:"Awesome You"}),"? Siga as instru\xe7\xf5es na p\xe1gina de inscri\xe7\xe3o ",(0,q.jsx)(c.A,{})]})]}),(0,q.jsxs)("form",{onSubmit:W,children:[(0,q.jsxs)("label",{children:[(0,q.jsxs)("span",{children:[(0,q.jsx)(d.A,{}),(0,q.jsxs)("span",{children:["URL do Reposit\xf3rio ",(0,q.jsx)("em",{children:"*"})]})]}),(0,q.jsx)("input",{placeholder:"Ex.: https://github.com/BrasilAPI/BrasilAPI",type:"text",name:"repositoryURL",required:!0}),(0,q.jsxs)("small",{children:[(0,q.jsx)(h.A,{})," Obrigat\xf3rio."]})]}),(0,q.jsxs)("label",{children:[(0,q.jsxs)("span",{children:[(0,q.jsx)("img",{loading:"lazy",src:"/img/npm.svg",alt:"npm"})," Pacote NPM"," ",(0,q.jsx)("sup",{children:"?"})]}),(0,q.jsx)("input",{placeholder:"Ex.: poku",type:"text",name:"npm"}),(0,q.jsxs)("small",{children:[(0,q.jsx)(u.A,{})," Nome do pacote npm, caso exista (opcional)."]})]}),(0,q.jsxs)("label",{children:[(0,q.jsxs)("span",{children:[(0,q.jsx)("img",{loading:"lazy",src:"/img/homebrew.svg",alt:"npm"})," ","Pacote Homebrew",(0,q.jsx)("sup",{children:"?"})]}),(0,q.jsx)("input",{placeholder:"Ex.: elixir",type:"text",name:"homebrew"}),(0,q.jsxs)("small",{children:[(0,q.jsx)(u.A,{})," Nome do pacote Homebrew, caso exista (opcional)."]})]}),(0,q.jsxs)("label",{children:[(0,q.jsxs)("span",{children:[(0,q.jsx)("img",{loading:"lazy",src:"/img/pypi.svg",alt:"PyPi"})," Pacote PyPi ",(0,q.jsx)("sup",{children:"?"})]}),(0,q.jsx)("input",{placeholder:"Ex.: socketify",type:"text",name:"pypi"}),(0,q.jsxs)("small",{children:[(0,q.jsx)(u.A,{})," Nome do pacote PyPi, caso exista (opcional)."]})]}),(0,q.jsxs)("label",{children:[(0,q.jsxs)("span",{children:[(0,q.jsx)("img",{loading:"lazy",src:"/img/chocolatey.svg",alt:"Chocolatey"})," ","Pacote Chocolatey ",(0,q.jsx)("sup",{children:"?"})]}),(0,q.jsx)("input",{placeholder:"Ex.: rio-terminal",type:"text",name:"chocolatey"}),(0,q.jsxs)("small",{children:[(0,q.jsx)(u.A,{})," Nome do pacote Chocolatey, caso exista (opcional)."]})]}),(0,q.jsxs)("label",{children:[(0,q.jsxs)("span",{children:[(0,q.jsx)("img",{loading:"lazy",src:"/img/vscode.svg",alt:"Visual Studio Code Marketplace"})," ","Visual Studio Code ID ",(0,q.jsx)("sup",{children:"?"})]}),(0,q.jsx)("input",{placeholder:"Ex.: dracula-theme.theme-dracula",type:"text",name:"vscode"}),(0,q.jsxs)("small",{children:[(0,q.jsx)(u.A,{})," ID da extens\xe3o do Visual Studio Code Marketplace, caso exista (opcional)."]})]}),(0,q.jsx)("label",{className:"span",children:(0,q.jsxs)("span",{children:[(0,q.jsx)("input",{type:"checkbox",name:"terms",required:!0}),"Entendo que o score \xe9 baseado em m\xe9tricas automatizadas limitadas e n\xe3o reflete a qualidade dos projetos. ",(0,q.jsx)("em",{children:"*"})]})}),(0,q.jsxs)("button",{children:[(0,q.jsx)(p,{})," Gerar Score"]})]})]}),(0,q.jsx)("main",{ref:Y,children:(0,q.jsx)("div",{className:"score",children:J&&(0,q.jsxs)(q.Fragment,{children:[(0,q.jsxs)(L.w,{to:"https://github.com/wellwelwel/awesomeyou/issues/4",children:["Acredita que essa pontua\xe7\xe3o deveria ser diferente? Sugira melhorias e ideias para aprimorar as automa\xe7\xf5es",(0,q.jsx)(m.A,{})]}),(0,q.jsxs)("h3",{children:[(0,q.jsx)(j,{})," Resultado"]}),(0,q.jsx)("table",{children:(0,q.jsxs)("tbody",{children:[(0,q.jsxs)("tr",{children:[(0,q.jsx)("td",{children:"Reposit\xf3rio"}),(0,q.jsxs)("td",{children:[(0,q.jsx)("img",{src:"https://avatars.githubusercontent.com/"+J.username,loading:"lazy",className:"organization",alt:J.username+" profile avatar"})," ",J.username,"/",J.repository]})]}),(0,q.jsxs)("tr",{children:[(0,q.jsx)("td",{children:(0,q.jsx)("span",{children:"Score"})}),(0,q.jsxs)("td",{children:[J.score>1e6?(0,q.jsx)(y.A,{}):J.score>1e5?(0,q.jsx)(g.A,{}):J.score>1e4?(0,q.jsx)(f.A,{}):J.score>1e3?(0,q.jsx)(v.A,{}):(0,q.jsx)(b.A,{}),(0,q.jsx)("span",{className:"score",children:Number(J.score).toLocaleString("pt-BR")})]})]}),(0,q.jsxs)("tr",{className:J.license.includes("not specified")?"error":void 0,children:[(0,q.jsx)("td",{children:"Licen\xe7a"}),(0,q.jsxs)("td",{children:[(0,q.jsx)(w.A,{}),(0,q.jsx)("span",{className:"score",children:null!=J&&J.license.includes("not specified")?"Licen\xe7a n\xe3o especificada":null==J?void 0:J.license})]})]})]})}),(0,q.jsxs)("h3",{children:[(0,q.jsx)(A.A,{})," Impacto"]}),(0,q.jsx)("table",{children:(0,q.jsxs)("tbody",{children:[(0,q.jsxs)("tr",{children:[(0,q.jsx)("td",{children:"Contribuidores"}),(0,q.jsxs)("td",{children:[(0,q.jsx)(k.A,{}),(null==J||null==(e=J.contributors)?void 0:e.label)||0]})]}),(0,q.jsxs)("tr",{children:[(0,q.jsx)("td",{children:"Dependentes"}),(0,q.jsxs)("td",{children:[(0,q.jsx)(z.A,{}),null==J||null==(s=J.repositoryDependents)?void 0:s.label]})]}),(null==J||null==(r=J.npm)?void 0:r.label)&&(0,q.jsxs)("tr",{children:[(0,q.jsx)("td",{children:(0,q.jsx)("span",{children:"Downloads por M\xeas"})}),(0,q.jsxs)("td",{children:[(0,q.jsx)("img",{loading:"lazy",src:"/img/npm.svg",alt:"npm"}),J.npm.label]})]}),(null==J||null==(x=J.homebrew)?void 0:x.label)&&(0,q.jsxs)("tr",{children:[(0,q.jsx)("td",{children:(0,q.jsx)("span",{children:"Downloads por M\xeas"})}),(0,q.jsxs)("td",{children:[(0,q.jsx)("img",{loading:"lazy",src:"/img/homebrew.svg",alt:"Homebrew"}),J.homebrew.label]})]}),(null==J||null==(O=J.pypi)?void 0:O.label)&&(0,q.jsxs)("tr",{children:[(0,q.jsx)("td",{children:(0,q.jsx)("span",{children:"Downloads por M\xeas"})}),(0,q.jsxs)("td",{children:[(0,q.jsx)("img",{loading:"lazy",src:"/img/pypi.svg",alt:"PyPi"}),J.pypi.label]})]}),(null==J||null==(T=J.chocolatey)?void 0:T.label)&&(0,q.jsxs)("tr",{title:"Chocolatey",children:[(0,q.jsx)("td",{children:(0,q.jsx)("span",{children:"Downloads Totais:"})}),(0,q.jsxs)("td",{children:[(0,q.jsx)("img",{loading:"lazy",src:"/img/chocolatey.svg"}),J.chocolatey.label]})]}),(null==J||null==(U=J.vscode)?void 0:U.label)&&(0,q.jsxs)("tr",{title:"Visual Studio Code Marketplace",children:[(0,q.jsx)("td",{children:(0,q.jsx)("span",{children:"Downloads Totais:"})}),(0,q.jsxs)("td",{children:[(0,q.jsx)("img",{loading:"lazy",src:"/img/vscode.svg"}),J.vscode.label]})]}),(0,q.jsxs)("tr",{children:[(0,q.jsx)("td",{children:"Forks"}),(0,q.jsxs)("td",{children:[(0,q.jsx)(R.A,{}),(null==J||null==(V=J.forks)?void 0:V.label)||0]})]}),(0,q.jsxs)("tr",{children:[(0,q.jsx)("td",{children:"Estrelas"}),(0,q.jsxs)("td",{children:[(0,q.jsx)(S.A,{}),(null==J||null==(H=J.stars)?void 0:H.label)||0]})]})]})}),(0,q.jsxs)("h3",{children:[(0,q.jsx)(E.A,{})," Atividade"]}),(0,q.jsx)("table",{children:(0,q.jsxs)("tbody",{children:[(0,q.jsxs)("tr",{children:[(0,q.jsx)("td",{children:"Issues abertas"}),(0,q.jsxs)("td",{children:[(0,q.jsx)(M.A,{}),(null==J||null==(B=J.issues)?void 0:B.label)||0]})]}),(0,q.jsxs)("tr",{children:[(0,q.jsx)("td",{children:"Issues fechadas"}),(0,q.jsxs)("td",{children:[(0,q.jsx)(N.A,{}),(null==J||null==(F=J.closedIssues)?void 0:F.label)||0]})]}),(0,q.jsxs)("tr",{children:[(0,q.jsx)("td",{children:"\xdaltimo commit"}),(0,q.jsxs)("td",{children:[(0,q.jsx)(P.A,{}),(null==J?void 0:J.commits)||0]})]})]})})]})})})]})})})}}}]);