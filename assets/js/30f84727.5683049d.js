"use strict";(self.webpackChunkawesomeyou=self.webpackChunkawesomeyou||[]).push([[854],{872:function(e,r,n){n.d(r,{F:function(){return s}});var s=function(e){return Object.fromEntries(Object.entries(e).sort((function(e,r){var n=e[1],s=r[1];return String(n).localeCompare(String(s))})))}},2126:function(e,r,n){n.d(r,{G:function(){return o}});var s=new Intl.ListFormat("pt-BR",{style:"long",type:"conjunction"}),t=new Intl.ListFormat("en-US",{style:"long",type:"conjunction"}),o={list:s.format.bind(s),listEn:t.format.bind(t)}},2476:function(e,r,n){n.d(r,{S:function(){return t}});var s=n(4848),t=function(e){return e.name.split("").map((function(e,r){return(0,s.jsx)("span",{style:e.trim().length>0?{"--index":r}:void 0,children:e},"name:"+e+":"+r)}))}},3509:function(e,r,n){n.r(r),n.d(r,{default:function(){return xe}});var s=n(9912),t=n(6540),o=n(4721),a=n(4848),i=function(e){var r=document.querySelector("html");r&&(e?r.classList.add("in-modal"):r.classList.remove("in-modal"))},c=(0,t.createContext)(Object.create(null)),l=function(e){var r=e.children,n=(0,t.useState)(""),s=(0,t.useState)(Object.create(null)),l=(0,t.useState)(void 0),u=(0,t.useRef)(null),d=n[0],p=l[1],j=s[0],m=(0,t.useRef)(!1),h=(0,t.useCallback)((function(e){var r,n;if(d&&""!==d){if(i(!0),null==(r=u.current)||r.classList.add("show"),!e)return m.current=!1,void p(void 0);var s=null==(n=j.projects)?void 0:n.find((function(r){return r.repository===e}));p(s),m.current=!0}else o.oR.error("Digite o username ou URL de uma das pessoas que mant\xe9m os projetos.")}),[d,j,p,m.current]);return(0,t.useEffect)((function(){s[1]((function(e){return Object.assign({},e,{$schema:"../../../schemas/projects.json",projects:[]})}))}),[s[1]]),(0,a.jsx)(c.Provider,{value:{modalRef:u,useMaintainer:n,useJSON:s,useCurrentProject:l,openProject:h,showSteps:m},children:r})},u=n(675),d=n(467),p=n(8069),j=n(9044),m=n(2957),h=n(9687),x=n(1950),f=n(7924),v=n(4379),g=n(6716),y=n(3622),b=n(7910),A=n(5283),w=n(6745),C=n(8463),k=n(5397),P=n(1634),O=function(e){if(null==e)return e;if("string"==typeof e)return e.trim();if(Array.isArray(e))return e.map(O);if("object"==typeof e){var r=Object.create(null);for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=O(e[n]));return r}return e},S=n(7914),R=n(2126),N=function(){var e,r,n=(0,t.useContext)(c),s=n.useMaintainer,o=n.useJSON,i=s[0],l=o[0],N=(0,t.useState)(""),L=N[0],E=N[1],z=(null==l||null==(e=l.projects)?void 0:e.length)>0?"s":"",I=(0,t.useCallback)((0,d.A)((0,u.A)().mark((function e(){var r,n;return(0,u.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!=l&&l.$schema){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,r=JSON.stringify(O(l)),e.next=6,C.Ay.format("("+r+")",{parser:"json",plugins:[A.A,w.Ay],printWidth:80,tabWidth:2,semi:!0,singleQuote:!0,quoteProps:"as-needed",jsxSingleQuote:!0,trailingComma:"es5",bracketSpacing:!0,bracketSameLine:!1,arrowParens:"always",proseWrap:"preserve",htmlWhitespaceSensitivity:"css",endOfLine:"auto",embeddedLanguageFormatting:"auto",singleAttributePerLine:!1});case 6:n=e.sent,E(n.trim().replace(/^\(\|\);$/g,"").trim()),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(2),E(JSON.stringify(l,null,2));case 13:case"end":return e.stop()}}),e,null,[[2,10]])}))),[E,l]);return(0,t.useEffect)((function(){I()}),[I,l]),(0,a.jsx)(k.T,{open:!0,title:(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(j.A,{})," Instru\xe7\xf5es"]}),children:(0,a.jsxs)("small",{children:[(0,a.jsxs)("div",{children:[(0,a.jsx)(m.A,{}),(0,a.jsxs)("span",{children:["Fa\xe7a um"," ",(0,a.jsx)("strong",{children:(0,a.jsxs)(P.w,{to:"https://github.com/wellwelwel/awesomeyou/fork",children:["fork do reposit\xf3rio ",(0,a.jsx)("ins",{children:"awesomeyou"})]})}),"."]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(h.A,{}),(0,a.jsxs)("span",{children:["Baixe seu ",(0,a.jsx)("em",{children:"fork"})," localmente e crie uma nova ",(0,a.jsx)("em",{children:"branch"}),"."]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(x.A,{}),(0,a.jsxs)("span",{children:["Crie o arquivo"," ",(0,a.jsxs)("code",{children:["static/maintainers/",(0,a.jsx)("ins",{children:i||"***"}),"/projects.json"]})," ","e cole o conte\xfado a seguir:",(0,a.jsx)(p.A,{language:"json",title:"static/maintainers/"+(i||"***")+"/projects.json",children:L+"\n\n"})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(f.A,{}),(0,a.jsxs)("span",{children:["Instale as depend\xeancias do projeto com o comando ",(0,a.jsx)("code",{children:"npm ci"})," ","(opcional)."]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(v.A,{}),(0,a.jsxs)("span",{children:["Aplique a formata\xe7\xe3o com o comando ",(0,a.jsx)("code",{children:"npm run lint:fix"})," ","(opcional)."]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(g.A,{}),(0,a.jsxs)("span",{children:["Crie o ",(0,a.jsx)("em",{children:"commit"})," com suas modifica\xe7\xf5es."]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(y.A,{}),(0,a.jsxs)("span",{children:["Abra uma ",(0,a.jsx)("strong",{children:"Pull Request"})," com o t\xedtulo:"," ",(0,a.jsx)("code",{children:(0,a.jsxs)("strong",{children:["feat(",i||"***","): add"," ",(null==l||null==(r=l.projects)?void 0:r.length)>0?R.G.listEn(l.projects.map((function(e){if(e.name)return e.name;try{return(0,S.o)(e.repository).repository}catch(r){return"***"}}))):"***"]})}),"."]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(b.A,{}),(0,a.jsxs)("span",{children:["Aproveite o espa\xe7o para falar do",z," projeto",z," e conversar em portugu\xeas com a gente."]})]})]})})},L=n(4752),E=n(2640),z=function(){return(0,a.jsx)(k.T,{title:(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(L.A,{})," Como cadastrar m\xfaltiplas pessoas no mesmo projeto?"]}),children:(0,a.jsxs)("small",{children:[(0,a.jsxs)("div",{children:[(0,a.jsx)(y.A,{}),(0,a.jsxs)("span",{children:["Cada pessoa deve ser cadastrada individualmente, cada uma em um"," ",(0,a.jsx)("em",{children:"Pull Request"})," pr\xf3prio."]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(E.A,{}),(0,a.jsx)("span",{children:"O sistema associa m\xfaltiplas pessoas automaticamente em projetos j\xe1 cadastrados."})]})]})})},I=n(5892),q=n(1279),T=function(){return(0,a.jsx)(k.T,{title:(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(I.A,{})," Atualizando projetos"]}),children:(0,a.jsx)("small",{children:(0,a.jsxs)("div",{children:[(0,a.jsx)(q.A,{}),(0,a.jsxs)("span",{children:["Voc\xea pode simular um novo cadastro, ent\xe3o copiar e colar apenas as novas informa\xe7\xf5es, assim como editar o ",(0,a.jsx)("code",{children:".json"})," ","manualmente."]})]})})})},F=function(){return(0,a.jsxs)("main",{children:[(0,a.jsx)(N,{}),(0,a.jsx)(z,{}),(0,a.jsx)(T,{})]})},D=n(6171),U=n(697),B=n(1585),M=n(3420),V=n(1622),J=n(3666),G=n(8686),H=n(3378),Q=n(7946),W=(0,J.C)({max:100}),$=function(){var e=(0,t.useContext)(c),r=e.useMaintainer,n=e.useJSON,s=r[0],i=r[1],l=n[1],p=(0,t.useCallback)((function(e){var r=e.currentTarget.value.trim().split("/").pop()||"";i(r)}),[i]),j=(0,t.useCallback)((function(e){o.oR.dismiss();var r=e.currentTarget.value.trim();r&&(W.has(r)?W.get(r)||o.oR.error('O username "'+r+'" n\xe3o foi encontrado.'):(0,t.startTransition)((0,d.A)((0,u.A)().mark((function e(){var n,s;return(0,u.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("https://api.github.com/users/"+r);case 3:n=e.sent,s=404!==n.status,W.set(r,s),s||o.oR.error('O username "'+r+'" n\xe3o foi encontrado.'),e.next=11;break;case 9:e.prev=9,e.t0=e.catch(0);case 11:case"end":return e.stop()}}),e,null,[[0,9]])})))))}),[]);return(0,t.useEffect)((function(){o.oR.dismiss(),0!==s.trim().length&&(0,t.startTransition)((0,d.A)((0,u.A)().mark((function e(){var r,n;return(0,u.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("/maintainers/"+s+"/projects.json");case 3:if(r=e.sent,404!==r.status){e.next=7;break}return e.abrupt("return");case 7:return e.next=9,r.json();case 9:n=e.sent,l(n),o.oR.info(s+" j\xe1 possui projetos na iniciativa \ud83d\ude80"),e.next=16;break;case 14:e.prev=14,e.t0=e.catch(0);case 16:case"end":return e.stop()}}),e,null,[[0,14]])}))))}),[s]),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("h2",{children:[(0,a.jsx)(G.A,{})," Quem mat\xe9m os projetos?"]}),(0,a.jsxs)("label",{className:"column",children:[(0,a.jsxs)("span",{children:[(0,a.jsx)(H.A,{}),(0,a.jsxs)("span",{children:["Username ou URL do GitHub ",(0,a.jsx)("em",{children:"*"})]})]}),(0,a.jsx)("input",{placeholder:"Ex.: felipefialho",type:"text",name:"maintainer",maxLength:39,required:!0,value:s,onChange:p,onBlur:j}),(0,a.jsxs)("small",{children:[(0,a.jsx)(Q.A,{})," O username do perfil de quem mant\xe9m o projeto no GitHub (obrigat\xf3rio)."]})]})]})},X=n(1576),Z=n(4997),K=n(9759),Y=n(3558),_=n(9379),ee=n(9782),re=n(3164),ne=n(6428),se=n(1195),te=n(2595),oe=n(6284),ae=n(6977),ie=n(872),ce={repository:"",description:"",madeInBrazil:!1,isAuthor:!1,name:"",message:"",npm:"",homebrew:"",pypi:"",chocolatey:"",vscode:""},le=function(){var e=(0,t.useContext)(c),r=e.useMaintainer,n=e.useCurrentProject,s=e.showSteps,i=r[0],l=n[0],p=n[1],j=Object.assign({},ce,l),m=function(){try{return(0,S.o)(j.repository).repository}catch(e){return"Ex.: Meu Projeto"}}(),h=(0,t.useCallback)(function(){var e=(0,d.A)((0,u.A)().mark((function e(r){var n,t,a,i,c,l;return(0,u.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n=r.currentTarget.value.trim(),t=(0,S.o)(n),a=t.organization,i=t.repository,s.current=!0,e.prev=4,c="/assets/json/projects/"+a+"/"+i+".json",e.next=8,fetch(c);case 8:return e.next=10,e.sent.json();case 10:l=e.sent,o.oR.info("Projeto encontrado na iniciativa",{description:"Mantenedores: "+R.G.list(l.maintainers.map((function(e){return e.name})))+".",duration:6e3}),p((function(e){return Object.assign({},ce,e||Object.create(null),{repository:n,description:l.description,name:l.name||"",categories:l.categories||[],languages:l.languages||[],madeInBrazil:l.madeInBrazil||!1,message:l.message||"",chocolatey:l.chocolatey||"",homebrew:l.homebrew||"",npm:l.npm||"",pypi:l.pypi||"",vscode:l.vscode||""})})),e.next=17;break;case 15:e.prev=15,e.t0=e.catch(4);case 17:e.next=23;break;case 19:e.prev=19,e.t1=e.catch(0),s.current=!1,e.t1 instanceof Error&&o.oR.error(e.t1.message);case 23:case"end":return e.stop()}}),e,null,[[0,19],[4,15]])})));return function(r){return e.apply(this,arguments)}}(),[]),x=(0,t.useCallback)(function(){var e=(0,d.A)((0,u.A)().mark((function e(r,n,s){var t,a,i,c,l;return(0,u.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r.stopPropagation(),o.oR.dismiss(),"repository"===n&&h(r),c=(null==(t=r.currentTarget)?void 0:t.value.trim().length)>0?null==(a=r.currentTarget)?void 0:a.value:"",l=null==(i=r.currentTarget)?void 0:i.checked,p((function(e){var r;return Object.assign({},ce,e||Object.create(null),((r={})[n]=s?l:c,r))}));case 6:case"end":return e.stop()}}),e)})));return function(r,n,s){return e.apply(this,arguments)}}(),[p,s.current]),f=(0,t.useCallback)((function(e,r){var n=r.key,s=r.limit,t=r.error,a=r.field,i=e.currentTarget,c=i.checked,u=i.parentElement;if(p((function(r){return function(r){var i,l=(null==r?void 0:r[a])||[];if(c&&l.length>=s)return e.preventDefault(),e.stopPropagation(),e.currentTarget&&(e.currentTarget.checked=!1),o.oR.warning(t),r;var u=c?[].concat(l,[n]):l.filter((function(e){return e!==n}));return Object.assign({},ce,r||Object.create(null),((i={})[a]=u.length>0?u:void 0,i))}(r||Object.create(null))})),u){var d;if(!c)return void u.classList.remove("on");var j=(null==l||null==(d=l[a])?void 0:d.length)||0;u.classList[j<s?"add":"remove"]("on")}}),[p,l]);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("h2",{children:[(0,a.jsx)(X.A,{})," Projeto"]}),(0,a.jsxs)("label",{children:[(0,a.jsxs)("span",{children:[(0,a.jsx)(H.A,{}),(0,a.jsxs)("span",{children:["URL do Reposit\xf3rio ",(0,a.jsx)("em",{children:"*"})]})]}),(0,a.jsx)("input",{placeholder:"Ex.: https://github.com/lpereira/lwan",type:"text",name:"repositoryURL",required:!0,value:j.repository,onChange:function(e){return x(e,"repository")}}),(0,a.jsxs)("small",{children:[(0,a.jsx)(Q.A,{})," Obrigat\xf3rio."]})]}),s.current&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("label",{children:[(0,a.jsxs)("span",{children:[(0,a.jsx)(Z.A,{}),(0,a.jsxs)("span",{children:["Descri\xe7\xe3o ",(0,a.jsx)("em",{children:"*"})]})]}),(0,a.jsx)("input",{placeholder:"Ex.: Esse \xe9 um projeto incr\xedvel que faz coisas ainda mais incr\xedveis quando usado por voc\xea.",type:"text",name:"description",required:!0,value:j.description,onChange:function(e){return x(e,"description")}}),(0,a.jsxs)("small",{children:[(0,a.jsx)(Q.A,{})," Descri\xe7\xe3o do projeto (obrigat\xf3rio)."]})]}),(0,a.jsxs)("label",{className:"span",children:[(0,a.jsxs)("span",{children:[(0,a.jsx)("input",{type:"checkbox",name:"madeInBrazil",checked:j.madeInBrazil,onChange:function(e){return x(e,"madeInBrazil",!0)}}),"Quem criou o projeto \xe9 brasileiro? ",(0,a.jsx)("sup",{children:"?"})]}),(0,a.jsxs)("small",{children:[(0,a.jsx)(K.A,{}),' Marque essa op\xe7\xe3o se a resposta for "sim".']})]}),(0,a.jsxs)("label",{className:"span",children:[(0,a.jsxs)("span",{children:[(0,a.jsx)("input",{type:"checkbox",name:"isAuthor",checked:j.isAuthor,onChange:function(e){return x(e,"isAuthor",!0)}}),(0,a.jsx)("ins",{children:i})," criou esse projeto? ",(0,a.jsx)("sup",{children:"?"})]}),(0,a.jsxs)("small",{children:[(0,a.jsx)(K.A,{}),' Marque essa op\xe7\xe3o se a resposta for "sim".']})]}),(0,a.jsxs)("h2",{children:[(0,a.jsx)(Y.A,{})," Personaliza\xe7\xe3o"]}),(0,a.jsxs)("label",{children:[(0,a.jsxs)("span",{children:[(0,a.jsx)(_.A,{}),(0,a.jsxs)("span",{children:["Nome ",(0,a.jsx)("sup",{children:"?"})]})]}),(0,a.jsx)("input",{placeholder:m,type:"text",name:"project-name",value:j.name,onChange:function(e){return x(e,"name")}}),(0,a.jsxs)("small",{children:[(0,a.jsx)(K.A,{})," Se o nome n\xe3o for definido, ser\xe1 usado o nome do reposit\xf3rio (opcional)."]})]}),(0,a.jsxs)("label",{children:[(0,a.jsxs)("span",{children:[(0,a.jsx)(ee.A,{}),(0,a.jsxs)("span",{children:["Mensagem (CTA) ",(0,a.jsx)("sup",{children:"?"})]})]}),(0,a.jsx)("input",{placeholder:"Ex.: Deixe uma estrela para mostrar seu apoio.",type:"text",name:"message",value:j.message,onChange:function(e){return x(e,"message")}}),(0,a.jsxs)("small",{children:[(0,a.jsx)(K.A,{})," Uma mensagem (Call to Action) para atrair pessoas a usarem, contribu\xedrem e apoiarem seu projeto (opcional)."]})]}),(0,a.jsxs)("h2",{children:[(0,a.jsx)(re.A,{})," Selecione at\xe9 2 linguagens"]}),(0,a.jsx)("div",{className:"multiple",children:Object.entries((0,ie.F)(ae.e)).map((function(e){var r,n=e[0],s=e[1],t=(null==j||null==(r=j.languages)?void 0:r.includes(n))||!1;return(0,a.jsx)("label",{className:"span",children:(0,a.jsxs)("span",{className:t?"on":void 0,children:[(0,a.jsx)("input",{type:"checkbox",name:"languages",checked:t,onChange:function(e){return f(e,{key:n,limit:2,error:"Voc\xea selecionou o m\xe1ximo de linguagens.",field:"languages"})}}),(0,a.jsx)(ne.A,{})," ",s]})},n)}))}),(0,a.jsxs)("h2",{children:[(0,a.jsx)(se.A,{})," Selecione at\xe9 4 categorias"]}),(0,a.jsx)("div",{className:"multiple",children:Object.entries((0,ie.F)(oe.L)).map((function(e){var r,n=e[0],s=e[1],t=(null==j||null==(r=j.categories)?void 0:r.includes(n))||!1;return(0,a.jsx)("label",{className:"span",children:(0,a.jsxs)("span",{className:t?"on":void 0,children:[(0,a.jsx)("input",{type:"checkbox",name:"categories",checked:t,onChange:function(e){return f(e,{key:n,limit:4,error:"Voc\xea selecionou o m\xe1ximo de categorias.",field:"categories"})}}),(0,a.jsx)(ne.A,{})," ",s]})},n)}))}),(0,a.jsxs)("h2",{children:[(0,a.jsx)(te.A,{})," Downloads e Instala\xe7\xf5es"]}),(0,a.jsxs)("label",{children:[(0,a.jsxs)("span",{children:[(0,a.jsx)("img",{loading:"lazy",src:"/assets/img/npm.svg",alt:"npm"})," Pacote NPM ",(0,a.jsx)("sup",{children:"?"})]}),(0,a.jsx)("input",{placeholder:"Ex.: gotql",type:"text",name:"npm",value:j.npm,onChange:function(e){return x(e,"npm")}}),(0,a.jsxs)("small",{children:[(0,a.jsx)(K.A,{})," Nome do pacote npm, caso exista (opcional)."]})]}),(0,a.jsxs)("label",{children:[(0,a.jsxs)("span",{children:[(0,a.jsx)("img",{loading:"lazy",src:"/assets/img/homebrew.svg",alt:"npm"})," ","Pacote Homebrew",(0,a.jsx)("sup",{children:"?"})]}),(0,a.jsx)("input",{placeholder:"Ex.: rio",type:"text",name:"homebrew",value:j.homebrew,onChange:function(e){return x(e,"homebrew")}}),(0,a.jsxs)("small",{children:[(0,a.jsx)(K.A,{})," Nome do pacote Homebrew, caso exista (opcional)."]})]}),(0,a.jsxs)("label",{children:[(0,a.jsxs)("span",{children:[(0,a.jsx)("img",{loading:"lazy",src:"/assets/img/pypi.svg",alt:"PyPi"})," ","Pacote PyPi ",(0,a.jsx)("sup",{children:"?"})]}),(0,a.jsx)("input",{placeholder:"Ex.: splinter",type:"text",name:"pypi",value:j.pypi,onChange:function(e){return x(e,"pypi")}}),(0,a.jsxs)("small",{children:[(0,a.jsx)(K.A,{})," Nome do pacote PyPi, caso exista (opcional)."]})]}),(0,a.jsxs)("label",{children:[(0,a.jsxs)("span",{children:[(0,a.jsx)("img",{loading:"lazy",src:"/assets/img/chocolatey.svg",alt:"Chocolatey"})," ","Pacote Chocolatey ",(0,a.jsx)("sup",{children:"?"})]}),(0,a.jsx)("input",{placeholder:"Ex.: elixir",type:"text",name:"chocolatey",value:j.chocolatey,onChange:function(e){return x(e,"chocolatey")}}),(0,a.jsxs)("small",{children:[(0,a.jsx)(K.A,{})," Nome do pacote Chocolatey, caso exista (opcional)."]})]}),(0,a.jsxs)("label",{children:[(0,a.jsxs)("span",{children:[(0,a.jsx)("img",{loading:"lazy",src:"/assets/img/vscode.svg",alt:"Visual Studio Code Marketplace"})," ","Visual Studio Code ID ",(0,a.jsx)("sup",{children:"?"})]}),(0,a.jsx)("input",{placeholder:"Ex.: dracula-theme.theme-dracula",type:"text",name:"vscode",value:j.vscode,onChange:function(e){return x(e,"vscode")}}),(0,a.jsxs)("small",{children:[(0,a.jsx)(K.A,{})," ID da extens\xe3o do Visual Studio Code Marketplace, caso exista (opcional)."]})]})]})]})},ue=function(){var e=(0,t.useContext)(c),r=e.modalRef,n=e.useJSON,s=e.useCurrentProject,l=e.openProject,u=e.showSteps,d=n[0],p=n[1],j=d.projects,m=s[0],h=s[1],x=(0,t.useCallback)((function(){var e;i(!1),null==(e=r.current)||e.classList.remove("show"),h(void 0),u.current=!1;for(var n=0,s=Array.from(document.querySelectorAll(".multiple .on"));n<s.length;n++){var t,o=s[n];o.classList.remove("on"),null==(t=o.querySelector("input"))||t.classList.remove("on")}}),[r.current,h]),f=(0,t.useCallback)((function(){var e;if(m)if(m.repository){try{(0,S.o)(m.repository)}catch(t){return void(t instanceof Error&&o.oR.error(t.message))}if(m.description){for(var r in m)if(Object.prototype.hasOwnProperty.call(m,r)){var n=r;m[n]||"repository"===n||"description"===n||delete m[n]}var s=null==(e=d.projects)?void 0:e.findIndex((function(e){return e.repository===m.repository}));p(-1!==s?function(e){var r=[].concat(e.projects);return r[s]=m,Object.assign({},e,{projects:O(r)})}:function(e){return Object.assign({},e,{projects:[].concat(e.projects,[O(m)])})}),o.oR.success("Projeto adicionado."),x()}else o.oR.error("Insira a descri\xe7\xe3o do projeto.")}else o.oR.error("Insira o reposit\xf3rio do projeto.");else o.oR.error("Preencha os campos obrigat\xf3rios para salvar.")}),[m,p]),v=(0,t.useCallback)((function(){var e;if(m){var r=null==(e=d.projects)?void 0:e.findIndex((function(e){return(null==e?void 0:e.repository)===(null==m?void 0:m.repository)}));-1!==r&&p((function(e){var n=[].concat(e.projects);return delete n[r],Object.assign({},e,{projects:n.filter(Boolean)})})),o.oR.info("Projeto removido."),x()}else x()}),[m,p]);return(0,a.jsxs)("form",{children:[(0,a.jsx)($,{}),(0,a.jsxs)("h2",{children:[(0,a.jsx)(D.A,{})," Projetos"]}),(0,a.jsxs)("div",{className:"projects",children:[j&&(null==j?void 0:j.map((function(e,r){var n=e.repository,s=e.name;return n&&(0,a.jsxs)("button",{type:"button",onClick:function(){return l(n)},children:[(0,a.jsx)(I.A,{}),s||function(){try{return(0,S.o)(n).repository}catch(e){}}()]},"project:"+r)}))),(0,a.jsxs)("button",{type:"button",onClick:function(){return l()},children:[(0,a.jsx)(U.A,{}),"Adicionar Projeto"]})]}),(0,a.jsx)("div",{ref:r,className:"modal",children:(0,a.jsxs)("div",{className:"content",children:[(0,a.jsx)(le,{}),(0,a.jsxs)("footer",{children:[(0,a.jsxs)("button",{type:"button",className:"delete",onClick:v,children:[(0,a.jsx)(B.A,{}),"Excluir"]}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("button",{type:"button",className:"cancel",onClick:x,children:[(0,a.jsx)(M.A,{}),"Cancelar"]}),(0,a.jsxs)("button",{type:"button",onClick:f,children:[(0,a.jsx)(V.A,{}),"Salvar"]})]})]})]})})]})},de=n(6289),pe=n(8931),je=n(7677),me=n(2476),he=function(){return(0,a.jsxs)("header",{children:[(0,a.jsx)("h1",{"aria-label":"Novo Projeto",children:(0,a.jsx)(me.S,{name:"<Novo Projeto + />"})}),(0,a.jsxs)("small",{className:"baloon",children:[(0,a.jsx)("div",{className:"float",children:(0,a.jsx)(V.A,{})}),(0,a.jsx)("span",{children:"Fa\xe7a parte da nossa hist\xf3ria."})]}),(0,a.jsxs)("small",{children:[(0,a.jsxs)("p",{children:["Para manter a relev\xe2ncia dos projetos dentro da iniciativa, eles precisam atingir individualmente, pelo menos"," ",(0,a.jsx)(de.A,{to:"/calculator",children:(0,a.jsx)("strong",{children:"250 pontos"})}),". Consulte as"," ",(0,a.jsxs)(P.w,{to:"https://github.com/wellwelwel/awesomeyou/blob/main/docs/RULES.md",children:["Regras ",(0,a.jsx)(pe.A,{})]})," ","e"," ",(0,a.jsxs)(de.A,{to:"/calculator",children:["use nossa ",(0,a.jsx)("strong",{children:"calculadora"})," para descobrir o score do projeto ",(0,a.jsx)(je.A,{})]})]}),(0,a.jsx)("br",{}),(0,a.jsxs)(P.w,{to:"https://github.com/wellwelwel/awesomeyou/issues/4",children:["Voc\xea pode contribuir para melhorar o sistema de pontos"," ",(0,a.jsx)(pe.A,{})]})]})]})},xe=function(){return(0,a.jsx)(s.A,{title:"Novo Projeto",children:(0,a.jsx)(l,{children:(0,a.jsxs)("div",{id:"new",children:[(0,a.jsxs)("main",{children:[(0,a.jsx)(he,{}),(0,a.jsx)(ue,{})]}),(0,a.jsx)(F,{})]})})})}},5397:function(e,r,n){n.d(r,{T:function(){return o}});var s=n(697),t=n(4848),o=function(e){var r=e.title,n=e.children,o=e.open;return(0,t.jsxs)("div",{className:o?"faq open":"faq",children:[(0,t.jsxs)("h2",{onClick:function(e){return e.currentTarget.parentElement.classList.toggle("open")},children:[(0,t.jsx)("span",{children:r}),(0,t.jsx)(s.A,{className:"arrow"})]}),(0,t.jsx)("div",{className:"wrapper",children:(0,t.jsx)("span",{children:n})})]})}},6284:function(e,r,n){n.d(r,{L:function(){return s}});var s=Object.freeze({api:"API",app:"Apps, Plataformas e Softwares",database:"Banco de Dados",ci:"CI/CD",devops:"DevOps",language:"Linguagem de Programa\xe7\xe3o",performance:"Performance",test:"Testes",theme:"Temas",plugin:"Plug-ins",cli:"CLI",educational:"Conte\xfados Educacionais",career:"Carreira",tool:"Ferramentas",frontend:"Frontend",backend:"Backend",observability:"Observabilidade",ai:"Intelig\xeancia Artificial",ui:"UI/UX",frameworks:"Livrarias e Frameworks",security:"Seguran\xe7a e Privacidade",productivity:"Produtividade",list:"Listas",template:"Templates",git:"Git"})},6977:function(e,r,n){n.d(r,{e:function(){return s}});var s=Object.freeze({c:"C",csharp:"C#",cpp:"C++",css:"CSS",clojure:"Clojure",dart:"Dart",delphi:"Delphi",haskell:"Haskell",javascript:"JavaScript",typescript:"TypeScript",php:"PHP",shell:"Shell",go:"GO",lua:"Lua",ruby:"Ruby",elixir:"Elixir",rust:"Rust",java:"Java",swift:"Swift",vim:"Vim Script",python:"Python",zig:"Zig"})},7914:function(e,r,n){n.d(r,{o:function(){return t}});var s=Object.freeze({domain:23,organization:39,repository:100}),t=function(e){var r=String(e).trim(),n=r.length,t=s.domain+s.organization+s.repository;if(n>t)throw new Error("O tamanho m\xe1ximo da URL foi excedido ("+n+"/"+t+").");var o=r.match(/^https?:\/\/github\.com\/([^\/]+)\/([^\/]+)(?:\/|$)/);if(!o||!o[1]||!o[2])throw new Error("A URL do reposit\xf3rio \xe9 inv\xe1lida.");var a={organization:o[1],repository:o[2]};if(a.organization.length>s.organization)throw new Error("O nome da organiza\xe7\xe3o excedeu o tamanho de caracteres ("+a.organization.length+"/"+s.organization+").",{cause:400});if(a.repository.length>s.repository)throw new Error("O nome do reposit\xf3rio excedeu o tamanho de caracteres ("+a.repository.length+"/"+s.repository+").",{cause:400});if(-1!==a.repository.indexOf("/")||-1!==a.repository.indexOf("#")||-1!==a.repository.indexOf("?"))throw new Error("Verifique a URL do reposit\xf3rio.",{cause:400});return a}}}]);