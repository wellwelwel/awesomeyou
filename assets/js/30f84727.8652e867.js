"use strict";(self.webpackChunkawesomeyou=self.webpackChunkawesomeyou||[]).push([[854],{2476:function(e,s,n){n.d(s,{S:function(){return o}});var r=n(4848),o=function(e){return e.name.split("").map((function(e,s){return(0,r.jsx)("span",{style:e.trim().length>0?{"--index":s}:void 0,children:e},"name:"+e+":"+s)}))}},2676:function(e,s,n){n.r(s),n.d(s,{default:function(){return ne}});var r=n(9912),o=n(6540),a=n(4721),i=n(4848),t=(0,o.createContext)(Object.create(null)),l=function(e){var s=e.children,n=(0,o.useState)("***"),r=(0,o.useState)(Object.create(null)),l=(0,o.useState)(void 0),c=(0,o.useRef)(null),d=n[0],u=l[1],j=r[0],x=(0,o.useCallback)((function(e){var s,n;if(d&&"***"!==d)if(null==(s=c.current)||s.classList.add("show"),e){var r=null==(n=j.projects)?void 0:n.find((function(s){return s.repository===e}));u(r)}else u(void 0);else a.oR.error("Defina o username de que mant\xe9m os projetos.")}),[d,j,u]);return(0,o.useEffect)((function(){r[1]((function(e){return Object.assign({},e,{$schema:"../../../schemas/projects.json",projects:[]})}))}),[r[1]]),(0,i.jsx)(t.Provider,{value:{modalRef:c,useMaintainer:n,useJSON:r,useCurrentProject:l,openProject:x},children:s})},c=n(8069),d=n(9044),u=n(2957),j=n(9687),x=n(1950),p=n(7924),h=n(4379),m=n(6716),f=n(3622),v=n(7910),g=n(5397),y=n(1634),b=n(7914),A=function(){var e,s=(0,o.useContext)(t),n=s.useMaintainer,r=s.useJSON,a=n[0],l=r[0];return(0,i.jsx)(g.T,{open:!0,title:(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(d.A,{})," Instru\xe7\xf5es"]}),children:(0,i.jsxs)("small",{children:[(0,i.jsxs)("div",{children:[(0,i.jsx)(u.A,{}),(0,i.jsxs)("span",{children:["Fa\xe7a um"," ",(0,i.jsx)("strong",{children:(0,i.jsxs)(y.w,{to:"https://github.com/wellwelwel/awesomeyou/fork",children:["fork do reposit\xf3rio ",(0,i.jsx)("ins",{children:"awesomeyou"})]})}),"."]})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)(j.A,{}),(0,i.jsxs)("span",{children:["Baixe seu ",(0,i.jsx)("em",{children:"fork"})," localmente e crie uma nova ",(0,i.jsx)("em",{children:"branch"}),"."]})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)(x.A,{}),(0,i.jsxs)("span",{children:["Crie o arquivo"," ",(0,i.jsxs)("code",{children:["content/maintainers/",(0,i.jsx)("ins",{children:a}),"/projects.json"]})," ","e cole o conte\xfado a seguir:",(0,i.jsx)(c.A,{language:"json",title:"content/maintainers/"+a+"/projects.json",children:JSON.stringify(l,null,2)+"\n\n"})]})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)(p.A,{}),(0,i.jsxs)("span",{children:["Instale as depend\xeancias do projeto com o comando ",(0,i.jsx)("code",{children:"npm ci"})," ","(opcional)."]})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)(h.A,{}),(0,i.jsxs)("span",{children:["Aplique a formata\xe7\xe3o com o comando ",(0,i.jsx)("code",{children:"npm run lint:fix"})," ","(opcional)."]})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)(m.A,{}),(0,i.jsxs)("span",{children:["Crie o ",(0,i.jsx)("em",{children:"commit"})," com suas modifica\xe7\xf5es."]})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)(f.A,{}),(0,i.jsxs)("span",{children:["Abra uma ",(0,i.jsx)("strong",{children:"Pull Request"}),' com o t\xedtulo "',(0,i.jsxs)("strong",{children:["docs: add"," ",(null==l||null==(e=l.projects)||null==(e=e[0])?void 0:e.name)||function(){try{return(0,b.o)(l.projects[0].repository).repository}catch(e){return"***"}}()]}),'".']})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)(v.A,{}),(0,i.jsx)("span",{children:"Fique \xe0 vontade para falar do seu projeto e conversar em portugu\xeas."})]})]})})},C=n(4752),w=n(2640),P=function(){return(0,i.jsx)(g.T,{title:(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(C.A,{})," Como cadastrar m\xfaltiplas pessoas no mesmo projeto?"]}),children:(0,i.jsxs)("small",{children:[(0,i.jsxs)("div",{children:[(0,i.jsx)(f.A,{}),(0,i.jsxs)("span",{children:["Cada pessoa deve ser cadastrada individualmente, cada uma em um"," ",(0,i.jsx)("em",{children:"Pull Request"})," pr\xf3prio."]})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)(w.A,{}),(0,i.jsx)("span",{children:"O sistema associa m\xfaltiplas pessoas automaticamente em projetos j\xe1 cadastrados."})]})]})})},O=n(5892),k=n(1279),N=n(9685),z=function(){return(0,i.jsx)(g.T,{title:(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(O.A,{})," Atualizando projetos"]}),children:(0,i.jsxs)("small",{children:[(0,i.jsxs)("div",{children:[(0,i.jsx)(k.A,{}),(0,i.jsxs)("span",{children:["Voc\xea pode simular um novo cadastro, ent\xe3o copiar e colar apenas as novas informa\xe7\xf5es, assim como editar o ",(0,i.jsx)("code",{children:".json"})," ","manualmente."]})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)(N.A,{}),(0,i.jsx)("span",{children:"O mesmo se aplica ao atualizar a mini bio da pessoa mantenedora."})]})]})})},E=function(){return(0,i.jsxs)("main",{children:[(0,i.jsx)(A,{}),(0,i.jsx)(P,{}),(0,i.jsx)(z,{})]})},q=n(6171),R=n(697),S=n(8697),I=n(1585),M=n(1622),L=n(8686),T=n(3378),B=n(7946),F=n(665),U=n(4997),D=function(){var e=(0,o.useContext)(t).useMaintainer[1];return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)("h2",{children:[(0,i.jsx)(L.A,{})," Quem mat\xe9m os projetos?"]}),(0,i.jsxs)("label",{children:[(0,i.jsxs)("span",{children:[(0,i.jsx)(T.A,{}),(0,i.jsxs)("span",{children:["Username do GitHub ",(0,i.jsx)("em",{children:"*"})]})]}),(0,i.jsx)("input",{placeholder:"Ex.: felipefialho",type:"text",name:"maintainer",maxLength:39,required:!0,onChange:function(s){return e(s.currentTarget.value.trim()||"***")}}),(0,i.jsxs)("small",{children:[(0,i.jsx)(B.A,{})," O username do perfil de quem mant\xe9m o projeto no GitHub (obrigat\xf3rio)."]})]}),(0,i.jsxs)("label",{children:[(0,i.jsxs)("span",{children:[(0,i.jsx)(F.A,{}),(0,i.jsxs)("span",{children:["Mini Bio ",(0,i.jsx)("sup",{children:"?"})]})]}),(0,i.jsx)("input",{placeholder:"",type:"text",name:"maintainer",maxLength:200,required:!0}),(0,i.jsxs)("small",{children:[(0,i.jsx)(U.A,{})," Voc\xea pode escrever uma mini bio em portugu\xeas de at\xe9 200 caracteres, caso contr\xe1rio, ser\xe1 usada sua Bio do GitHub."]})]})]})},V=n(3164),H=n(9759),J=n(1195),G=n(9379),Q=n(9782),$=n(2595),K={repository:"",description:"",madeInBrazil:!1,isAuthor:!1,name:"",message:"",npm:"",homebrew:"",pypi:"",chocolatey:"",vscode:""},W=function(){var e=(0,o.useContext)(t),s=e.useMaintainer,n=e.useCurrentProject,r=s[0],a=n[0],l=n[1],c=Object.assign({},K,a),d=(0,o.useCallback)((function(e,s,n){var r,o,a,i=(null==(r=e.currentTarget)?void 0:r.value.trim().length)>0?null==(o=e.currentTarget)?void 0:o.value.trim():"",t=null==(a=e.currentTarget)?void 0:a.checked;l((function(e){var r;return Object.assign({},K,e||Object.create(null),((r={})[s]=n?t:i,r))}))}),[l]);return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)("h2",{children:[(0,i.jsx)(V.A,{})," Projeto"]}),(0,i.jsxs)("label",{children:[(0,i.jsxs)("span",{children:[(0,i.jsx)(T.A,{}),(0,i.jsxs)("span",{children:["URL do Reposit\xf3rio ",(0,i.jsx)("em",{children:"*"})]})]}),(0,i.jsx)("input",{placeholder:"Ex.: https://github.com/lpereira/lwan",type:"text",name:"repositoryURL",required:!0,value:c.repository,onChange:function(e){return d(e,"repository")}}),(0,i.jsxs)("small",{children:[(0,i.jsx)(B.A,{})," Obrigat\xf3rio."]})]}),(0,i.jsxs)("label",{children:[(0,i.jsxs)("span",{children:[(0,i.jsx)(H.A,{}),(0,i.jsxs)("span",{children:["Descri\xe7\xe3o ",(0,i.jsx)("em",{children:"*"})]})]}),(0,i.jsx)("input",{placeholder:"Ex.: Esse \xe9 um projeto incr\xedvel que faz coisas ainda mais incr\xedveis quando usado por voc\xea.",type:"text",name:"description",required:!0,value:c.description,onChange:function(e){return d(e,"description")}}),(0,i.jsxs)("small",{children:[(0,i.jsx)(B.A,{})," Descri\xe7\xe3o do projeto (obrigat\xf3rio)."]})]}),(0,i.jsxs)("label",{className:"span",children:[(0,i.jsxs)("span",{children:[(0,i.jsx)("input",{type:"checkbox",name:"madeInBrazil",checked:c.madeInBrazil,onChange:function(e){return d(e,"madeInBrazil",!0)}}),"Quem criou o projeto \xe9 brasileiro? ",(0,i.jsx)("sup",{children:"?"})]}),(0,i.jsxs)("small",{children:[(0,i.jsx)(U.A,{}),' Marque essa op\xe7\xe3o se a resposta for "sim".']})]}),(0,i.jsxs)("label",{className:"span",children:[(0,i.jsxs)("span",{children:[(0,i.jsx)("input",{type:"checkbox",name:"isAuthor",checked:c.isAuthor,onChange:function(e){return d(e,"isAuthor",!0)}}),(0,i.jsx)("ins",{children:r})," criou esse projeto? ",(0,i.jsx)("sup",{children:"?"})]}),(0,i.jsxs)("small",{children:[(0,i.jsx)(U.A,{}),' Marque essa op\xe7\xe3o se a resposta for "sim".']})]}),(0,i.jsxs)("h2",{children:[(0,i.jsx)(J.A,{})," Personaliza\xe7\xe3o"]}),(0,i.jsxs)("label",{children:[(0,i.jsxs)("span",{children:[(0,i.jsx)(G.A,{}),(0,i.jsxs)("span",{children:["Nome ",(0,i.jsx)("sup",{children:"?"})]})]}),(0,i.jsx)("input",{placeholder:"Ex.: Meu Projeto",type:"text",name:"project-name",value:c.name,onChange:function(e){return d(e,"name")}}),(0,i.jsxs)("small",{children:[(0,i.jsx)(U.A,{})," Se o nome n\xe3o for definido, ser\xe1 usado o nome do reposit\xf3rio (opcional)."]})]}),(0,i.jsxs)("label",{children:[(0,i.jsxs)("span",{children:[(0,i.jsx)(Q.A,{}),(0,i.jsxs)("span",{children:["Mensagem (CTA) ",(0,i.jsx)("sup",{children:"?"})]})]}),(0,i.jsx)("input",{placeholder:"Ex.: Deixe uma estrela para mostrar seu apoio.",type:"text",name:"message",value:c.message,onChange:function(e){return d(e,"message")}}),(0,i.jsxs)("small",{children:[(0,i.jsx)(U.A,{})," Uma mensagem (Call to Action) para atrair pessoas a usarem, contribu\xedrem e apoiarem seu projeto (opcional)."]})]}),(0,i.jsxs)("h2",{children:[(0,i.jsx)($.A,{})," Downloads e Instala\xe7\xf5es"]}),(0,i.jsxs)("label",{children:[(0,i.jsxs)("span",{children:[(0,i.jsx)("img",{loading:"lazy",src:"/img/npm.svg",alt:"npm"})," Pacote NPM"," ",(0,i.jsx)("sup",{children:"?"})]}),(0,i.jsx)("input",{placeholder:"Ex.: gotql",type:"text",name:"npm",value:c.npm,onChange:function(e){return d(e,"npm")}}),(0,i.jsxs)("small",{children:[(0,i.jsx)(U.A,{})," Nome do pacote npm, caso exista (opcional)."]})]}),(0,i.jsxs)("label",{children:[(0,i.jsxs)("span",{children:[(0,i.jsx)("img",{loading:"lazy",src:"/img/homebrew.svg",alt:"npm"})," Pacote Homebrew",(0,i.jsx)("sup",{children:"?"})]}),(0,i.jsx)("input",{placeholder:"Ex.: rio",type:"text",name:"homebrew",value:c.homebrew,onChange:function(e){return d(e,"homebrew")}}),(0,i.jsxs)("small",{children:[(0,i.jsx)(U.A,{})," Nome do pacote Homebrew, caso exista (opcional)."]})]}),(0,i.jsxs)("label",{children:[(0,i.jsxs)("span",{children:[(0,i.jsx)("img",{loading:"lazy",src:"/img/pypi.svg",alt:"PyPi"})," Pacote PyPi"," ",(0,i.jsx)("sup",{children:"?"})]}),(0,i.jsx)("input",{placeholder:"Ex.: splinter",type:"text",name:"pypi",value:c.pypi,onChange:function(e){return d(e,"pypi")}}),(0,i.jsxs)("small",{children:[(0,i.jsx)(U.A,{})," Nome do pacote PyPi, caso exista (opcional)."]})]}),(0,i.jsxs)("label",{children:[(0,i.jsxs)("span",{children:[(0,i.jsx)("img",{loading:"lazy",src:"/img/chocolatey.svg",alt:"Chocolatey"})," ","Pacote Chocolatey ",(0,i.jsx)("sup",{children:"?"})]}),(0,i.jsx)("input",{placeholder:"Ex.: elixir",type:"text",name:"chocolatey",value:c.chocolatey,onChange:function(e){return d(e,"chocolatey")}}),(0,i.jsxs)("small",{children:[(0,i.jsx)(U.A,{})," Nome do pacote Chocolatey, caso exista (opcional)."]})]}),(0,i.jsxs)("label",{children:[(0,i.jsxs)("span",{children:[(0,i.jsx)("img",{loading:"lazy",src:"/img/vscode.svg",alt:"Visual Studio Code Marketplace"})," ","Visual Studio Code ID ",(0,i.jsx)("sup",{children:"?"})]}),(0,i.jsx)("input",{placeholder:"Ex.: dracula-theme.theme-dracula",type:"text",name:"vscode",value:c.vscode,onChange:function(e){return d(e,"vscode")}}),(0,i.jsxs)("small",{children:[(0,i.jsx)(U.A,{})," ID da extens\xe3o do Visual Studio Code Marketplace, caso exista (opcional)."]})]})]})},X=function(){var e=(0,o.useContext)(t),s=e.modalRef,n=e.useJSON,r=e.useCurrentProject,l=e.openProject,c=n[0],d=n[1],u=c.projects,j=r[0],x=r[1],p=(0,o.useCallback)((function(){var e;null==(e=s.current)||e.classList.remove("show"),x(void 0)}),[s.current,x]),h=(0,o.useCallback)((function(){var e;if(j)if(j.repository)if(j.description){try{(0,b.o)(j.repository)}catch(o){return void(o instanceof Error&&a.oR.error(o.message))}for(var s in j)if(Object.prototype.hasOwnProperty.call(j,s)){var n=s;j[n]||"repository"===n||"description"===n||delete j[n]}var r=null==(e=c.projects)?void 0:e.findIndex((function(e){return e.repository===j.repository}));d(-1!==r?function(e){var s=[].concat(e.projects);return s[r]=j,Object.assign({},e,{projects:s})}:function(e){return Object.assign({},e,{projects:[].concat(e.projects,[j])})}),p()}else a.oR.error("Insira a descri\xe7\xe3o do projeto.");else a.oR.error("Insira o reposit\xf3rio do projeto.");else a.oR.error("Preencha os campos obrigat\xf3rios para salvar.")}),[j,d]),m=(0,o.useCallback)((function(){var e;if(j){var s=null==(e=c.projects)?void 0:e.findIndex((function(e){return(null==e?void 0:e.repository)===(null==j?void 0:j.repository)}));-1!==s&&d((function(e){var n=[].concat(e.projects);return delete n[s],Object.assign({},e,{projects:n.filter(Boolean)})})),p()}else p()}),[j,d]);return(0,i.jsxs)("form",{children:[(0,i.jsx)(D,{}),(0,i.jsxs)("h2",{children:[(0,i.jsx)(q.A,{})," Projetos"]}),(0,i.jsxs)("div",{className:"projects",children:[u&&(null==u?void 0:u.map((function(e,s){var n=e.repository,r=e.name;return n&&(0,i.jsxs)("button",{type:"button",onClick:function(){return l(n)},children:[(0,i.jsx)(O.A,{}),r||function(){try{return(0,b.o)(n).repository}catch(e){}}()]},"project:"+s)}))),(0,i.jsxs)("button",{type:"button",onClick:function(){return l()},children:[(0,i.jsx)(R.A,{}),"Adicionar Projeto"]})]}),(0,i.jsx)("div",{ref:s,className:"modal",children:(0,i.jsxs)("div",{className:"content",children:[(0,i.jsx)(W,{}),(0,i.jsxs)("footer",{children:[(0,i.jsxs)("button",{type:"button",className:"delete",onClick:m,children:[(0,i.jsx)(S.A,{}),"Excluir"]}),(0,i.jsxs)("div",{children:[(0,i.jsxs)("button",{type:"button",className:"cancel",onClick:p,children:[(0,i.jsx)(I.A,{}),"Cancelar"]}),(0,i.jsxs)("button",{type:"button",onClick:h,children:[(0,i.jsx)(M.A,{}),"Salvar"]})]})]})]})})]})},Y=n(6289),Z=n(8931),_=n(7677),ee=n(2476),se=function(){return(0,i.jsxs)("header",{children:[(0,i.jsx)("h1",{children:(0,i.jsx)(ee.S,{name:"<Novo Projeto + />"})}),(0,i.jsxs)("small",{className:"baloon",children:[(0,i.jsx)("div",{className:"float",children:(0,i.jsx)(M.A,{})}),(0,i.jsx)("span",{children:"Fa\xe7a parte da nossa hist\xf3ria."})]}),(0,i.jsxs)("small",{children:[(0,i.jsxs)("p",{children:["Para manter a relev\xe2ncia dos projetos dentro da iniciativa e dos seus respectivos mantenedores, os projetos precisam atingir pelo menos"," ",(0,i.jsx)("strong",{children:"250 pontos"}),". Consulte as"," ",(0,i.jsxs)(y.w,{to:"https://github.com/wellwelwel/awesomeyou/blob/main/docs/RULES.md",children:["Regras ",(0,i.jsx)(Z.A,{})]})," ","e"," ",(0,i.jsxs)(Y.A,{to:"/calculator",children:["use nossa calculadora para descobrir o score do projeto"," ",(0,i.jsx)(_.A,{})]})]}),(0,i.jsx)("br",{}),(0,i.jsxs)(y.w,{to:"https://github.com/wellwelwel/awesomeyou/issues/4",children:["Voc\xea pode contribuir para melhorar o sistema de pontos ",(0,i.jsx)(Z.A,{})]})]})]})},ne=function(){return(0,i.jsx)(r.A,{title:"Novo Projeto",children:(0,i.jsx)(l,{children:(0,i.jsxs)("div",{id:"new",children:[(0,i.jsxs)("main",{children:[(0,i.jsx)(se,{}),(0,i.jsx)(X,{})]}),(0,i.jsx)(E,{})]})})})}},5397:function(e,s,n){n.d(s,{T:function(){return a}});var r=n(697),o=n(4848),a=function(e){var s=e.title,n=e.children,a=e.open;return(0,o.jsxs)("div",{className:a?"faq open":"faq",children:[(0,o.jsxs)("h2",{onClick:function(e){return e.currentTarget.parentElement.classList.toggle("open")},children:[(0,o.jsx)("span",{children:s}),(0,o.jsx)(r.A,{className:"arrow"})]}),(0,o.jsx)("div",{className:"wrapper",children:(0,o.jsx)("span",{children:n})})]})}},7914:function(e,s,n){n.d(s,{o:function(){return o}});var r=Object.freeze({domain:23,organization:39,repository:100}),o=function(e){var s=String(e).trim(),n=s.length,o=r.domain+r.organization+r.repository;if(n>o)throw new Error("O tamanho m\xe1ximo da URL foi excedido ("+n+"/"+o+").");var a=s.match(/^https?:\/\/github\.com\/([^\/]+)\/([^\/]+)(?:\/|$)/);if(!a||!a[1]||!a[2])throw new Error("A URL do reposit\xf3rio \xe9 inv\xe1lida.");var i={organization:a[1],repository:a[2]};if(i.organization.length>r.organization)throw new Error("O nome da organiza\xe7\xe3o excedeu o tamanho de caracteres ("+i.organization.length+"/"+r.organization+").",{cause:400});if(i.repository.length>r.repository)throw new Error("O nome do reposit\xf3rio excedeu o tamanho de caracteres ("+i.repository.length+"/"+r.repository+").",{cause:400});if(-1!==i.repository.indexOf("/")||-1!==i.repository.indexOf("#")||-1!==i.repository.indexOf("?"))throw new Error("Verifique a URL do reposit\xf3rio.",{cause:400});return i}}}]);