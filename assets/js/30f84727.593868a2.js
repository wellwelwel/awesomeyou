"use strict";(self.webpackChunkawesomeyou=self.webpackChunkawesomeyou||[]).push([[854],{2476:function(e,s,r){r.d(s,{S:function(){return o}});var n=r(4848),o=function(e){return e.name.split("").map((function(e,s){return(0,n.jsx)("span",{style:e.trim().length>0?{"--index":s}:void 0,children:e},"name:"+e+":"+s)}))}},2676:function(e,s,r){r.r(s),r.d(s,{default:function(){return re}});var n=r(9912),o=r(6540),i=r(4721),a=r(4848),t=(0,o.createContext)(Object.create(null)),l=function(e){var s=e.children,r=(0,o.useState)("***"),n=(0,o.useState)(Object.create(null)),l=(0,o.useState)(void 0),c=(0,o.useRef)(null),d=r[0],u=l[1],j=n[0],x=(0,o.useCallback)((function(e){var s,r;if(d&&"***"!==d)if(null==(s=c.current)||s.classList.add("show"),e){var n=null==(r=j.projects)?void 0:r.find((function(s){return s.repository===e}));u(n)}else u(void 0);else i.oR.error("Defina o username de que mant\xe9m os projetos.")}),[d,j,u]);return(0,o.useEffect)((function(){n[1]((function(e){return Object.assign({},e,{$schema:"../../../schemas/projects.json",projects:[]})}))}),[n[1]]),(0,a.jsx)(t.Provider,{value:{modalRef:c,useMaintainer:r,useJSON:n,useCurrentProject:l,openProject:x},children:s})},c=r(8069),d=r(9044),u=r(2957),j=r(9687),x=r(1950),p=r(7924),h=r(4379),m=r(6716),f=r(3622),v=r(7910),g=r(5397),y=r(1634),b=r(7914),A=function(){var e,s=(0,o.useContext)(t),r=s.useMaintainer,n=s.useJSON,i=r[0],l=n[0];return(0,a.jsx)(g.T,{open:!0,title:(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(d.A,{})," Instru\xe7\xf5es"]}),children:(0,a.jsxs)("small",{children:[(0,a.jsxs)("div",{children:[(0,a.jsx)(u.A,{}),(0,a.jsxs)("span",{children:["Fa\xe7a um"," ",(0,a.jsx)("strong",{children:(0,a.jsxs)(y.w,{to:"https://github.com/wellwelwel/awesomeyou/fork",children:["fork do reposit\xf3rio ",(0,a.jsx)("ins",{children:"awesomeyou"})]})}),"."]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(j.A,{}),(0,a.jsxs)("span",{children:["Baixe seu ",(0,a.jsx)("em",{children:"fork"})," localmente e crie uma nova ",(0,a.jsx)("em",{children:"branch"}),"."]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(x.A,{}),(0,a.jsxs)("span",{children:["Crie o arquivo"," ",(0,a.jsxs)("code",{children:["content/maintainers/",(0,a.jsx)("ins",{children:i}),"/projects.json"]})," ","e cole o conte\xfado a seguir:",(0,a.jsx)(c.A,{language:"json",title:"content/maintainers/"+i+"/projects.json",children:JSON.stringify(l,null,2)+"\n\n"})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(p.A,{}),(0,a.jsxs)("span",{children:["Instale as depend\xeancias do projeto com o comando ",(0,a.jsx)("code",{children:"npm ci"})," ","(opcional)."]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(h.A,{}),(0,a.jsxs)("span",{children:["Aplique a formata\xe7\xe3o com o comando ",(0,a.jsx)("code",{children:"npm run lint:fix"})," ","(opcional)."]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(m.A,{}),(0,a.jsxs)("span",{children:["Crie o ",(0,a.jsx)("em",{children:"commit"})," com suas modifica\xe7\xf5es."]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(f.A,{}),(0,a.jsxs)("span",{children:["Abra uma ",(0,a.jsx)("strong",{children:"Pull Request"}),' com o t\xedtulo "',(0,a.jsxs)("strong",{children:["docs: add"," ",(null==l||null==(e=l.projects)||null==(e=e[0])?void 0:e.name)||function(){try{return(0,b.o)(l.projects[0].repository).repository}catch(e){return"***"}}()]}),'".']})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(v.A,{}),(0,a.jsx)("span",{children:"Fique \xe0 vontade para falar do seu projeto e conversar em portugu\xeas."})]})]})})},C=r(4752),w=r(2640),P=function(){return(0,a.jsx)(g.T,{title:(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(C.A,{})," Como cadastrar m\xfaltiplas pessoas no mesmo projeto?"]}),children:(0,a.jsxs)("small",{children:[(0,a.jsxs)("div",{children:[(0,a.jsx)(f.A,{}),(0,a.jsxs)("span",{children:["Cada pessoa deve ser cadastrada individualmente, cada uma em um"," ",(0,a.jsx)("em",{children:"Pull Request"})," pr\xf3prio."]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(w.A,{}),(0,a.jsx)("span",{children:"O sistema associa m\xfaltiplas pessoas automaticamente em projetos j\xe1 cadastrados."})]})]})})},O=r(5892),k=r(1279),N=r(9685),z=function(){return(0,a.jsx)(g.T,{title:(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(O.A,{})," Atualizando projetos"]}),children:(0,a.jsxs)("small",{children:[(0,a.jsxs)("div",{children:[(0,a.jsx)(k.A,{}),(0,a.jsxs)("span",{children:["Voc\xea pode simular um novo cadastro, ent\xe3o copiar e colar apenas as novas informa\xe7\xf5es, assim como editar o ",(0,a.jsx)("code",{children:".json"})," ","manualmente."]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(N.A,{}),(0,a.jsx)("span",{children:"O mesmo se aplica ao atualizar a mini bio de quem mat\xe9m os projetos."})]})]})})},E=function(){return(0,a.jsxs)("main",{children:[(0,a.jsx)(A,{}),(0,a.jsx)(P,{}),(0,a.jsx)(z,{})]})},q=r(6171),R=r(697),S=r(8697),I=r(1585),M=r(1622),L=r(8686),T=r(3378),B=r(7946),F=r(665),U=r(4997),D=function(){var e=(0,o.useContext)(t).useMaintainer[1];return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("h2",{children:[(0,a.jsx)(L.A,{})," Quem mat\xe9m os projetos?"]}),(0,a.jsxs)("label",{children:[(0,a.jsxs)("span",{children:[(0,a.jsx)(T.A,{}),(0,a.jsxs)("span",{children:["Username do GitHub ",(0,a.jsx)("em",{children:"*"})]})]}),(0,a.jsx)("input",{placeholder:"Ex.: felipefialho",type:"text",name:"maintainer",maxLength:39,required:!0,onChange:function(s){return e(s.currentTarget.value.trim()||"***")}}),(0,a.jsxs)("small",{children:[(0,a.jsx)(B.A,{})," O username do perfil de quem mant\xe9m o projeto no GitHub (obrigat\xf3rio)."]})]}),(0,a.jsxs)("label",{children:[(0,a.jsxs)("span",{children:[(0,a.jsx)(F.A,{}),(0,a.jsxs)("span",{children:["Mini Bio ",(0,a.jsx)("sup",{children:"?"})]})]}),(0,a.jsx)("input",{placeholder:"",type:"text",name:"maintainer",maxLength:200,required:!0}),(0,a.jsxs)("small",{children:[(0,a.jsx)(U.A,{})," Voc\xea pode escrever uma mini bio em portugu\xeas de at\xe9 200 caracteres, caso contr\xe1rio, ser\xe1 usada sua Bio do GitHub."]})]})]})},V=r(3164),H=r(9759),J=r(1195),G=r(9379),Q=r(9782),$=r(2595),K={repository:"",description:"",madeInBrazil:!1,isAuthor:!1,name:"",message:"",npm:"",homebrew:"",pypi:"",chocolatey:"",vscode:""},W=function(){var e=(0,o.useContext)(t),s=e.useMaintainer,r=e.useCurrentProject,n=s[0],i=r[0],l=r[1],c=Object.assign({},K,i),d=(0,o.useCallback)((function(e,s,r){var n,o,i,a=(null==(n=e.currentTarget)?void 0:n.value.trim().length)>0?null==(o=e.currentTarget)?void 0:o.value.trim():"",t=null==(i=e.currentTarget)?void 0:i.checked;l((function(e){var n;return Object.assign({},K,e||Object.create(null),((n={})[s]=r?t:a,n))}))}),[l]);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("h2",{children:[(0,a.jsx)(V.A,{})," Projeto"]}),(0,a.jsxs)("label",{children:[(0,a.jsxs)("span",{children:[(0,a.jsx)(T.A,{}),(0,a.jsxs)("span",{children:["URL do Reposit\xf3rio ",(0,a.jsx)("em",{children:"*"})]})]}),(0,a.jsx)("input",{placeholder:"Ex.: https://github.com/lpereira/lwan",type:"text",name:"repositoryURL",required:!0,value:c.repository,onChange:function(e){return d(e,"repository")}}),(0,a.jsxs)("small",{children:[(0,a.jsx)(B.A,{})," Obrigat\xf3rio."]})]}),(0,a.jsxs)("label",{children:[(0,a.jsxs)("span",{children:[(0,a.jsx)(H.A,{}),(0,a.jsxs)("span",{children:["Descri\xe7\xe3o ",(0,a.jsx)("em",{children:"*"})]})]}),(0,a.jsx)("input",{placeholder:"Ex.: Esse \xe9 um projeto incr\xedvel que faz coisas ainda mais incr\xedveis quando usado por voc\xea.",type:"text",name:"description",required:!0,value:c.description,onChange:function(e){return d(e,"description")}}),(0,a.jsxs)("small",{children:[(0,a.jsx)(B.A,{})," Descri\xe7\xe3o do projeto (obrigat\xf3rio)."]})]}),(0,a.jsxs)("label",{className:"span",children:[(0,a.jsxs)("span",{children:[(0,a.jsx)("input",{type:"checkbox",name:"madeInBrazil",checked:c.madeInBrazil,onChange:function(e){return d(e,"madeInBrazil",!0)}}),"Quem criou o projeto \xe9 brasileiro? ",(0,a.jsx)("sup",{children:"?"})]}),(0,a.jsxs)("small",{children:[(0,a.jsx)(U.A,{}),' Marque essa op\xe7\xe3o se a resposta for "sim".']})]}),(0,a.jsxs)("label",{className:"span",children:[(0,a.jsxs)("span",{children:[(0,a.jsx)("input",{type:"checkbox",name:"isAuthor",checked:c.isAuthor,onChange:function(e){return d(e,"isAuthor",!0)}}),(0,a.jsx)("ins",{children:n})," criou esse projeto? ",(0,a.jsx)("sup",{children:"?"})]}),(0,a.jsxs)("small",{children:[(0,a.jsx)(U.A,{}),' Marque essa op\xe7\xe3o se a resposta for "sim".']})]}),(0,a.jsxs)("h2",{children:[(0,a.jsx)(J.A,{})," Personaliza\xe7\xe3o"]}),(0,a.jsxs)("label",{children:[(0,a.jsxs)("span",{children:[(0,a.jsx)(G.A,{}),(0,a.jsxs)("span",{children:["Nome ",(0,a.jsx)("sup",{children:"?"})]})]}),(0,a.jsx)("input",{placeholder:"Ex.: Meu Projeto",type:"text",name:"project-name",value:c.name,onChange:function(e){return d(e,"name")}}),(0,a.jsxs)("small",{children:[(0,a.jsx)(U.A,{})," Se o nome n\xe3o for definido, ser\xe1 usado o nome do reposit\xf3rio (opcional)."]})]}),(0,a.jsxs)("label",{children:[(0,a.jsxs)("span",{children:[(0,a.jsx)(Q.A,{}),(0,a.jsxs)("span",{children:["Mensagem (CTA) ",(0,a.jsx)("sup",{children:"?"})]})]}),(0,a.jsx)("input",{placeholder:"Ex.: Deixe uma estrela para mostrar seu apoio.",type:"text",name:"message",value:c.message,onChange:function(e){return d(e,"message")}}),(0,a.jsxs)("small",{children:[(0,a.jsx)(U.A,{})," Uma mensagem (Call to Action) para atrair pessoas a usarem, contribu\xedrem e apoiarem seu projeto (opcional)."]})]}),(0,a.jsxs)("h2",{children:[(0,a.jsx)($.A,{})," Downloads e Instala\xe7\xf5es"]}),(0,a.jsxs)("label",{children:[(0,a.jsxs)("span",{children:[(0,a.jsx)("img",{loading:"lazy",src:"/img/npm.svg",alt:"npm"})," Pacote NPM"," ",(0,a.jsx)("sup",{children:"?"})]}),(0,a.jsx)("input",{placeholder:"Ex.: gotql",type:"text",name:"npm",value:c.npm,onChange:function(e){return d(e,"npm")}}),(0,a.jsxs)("small",{children:[(0,a.jsx)(U.A,{})," Nome do pacote npm, caso exista (opcional)."]})]}),(0,a.jsxs)("label",{children:[(0,a.jsxs)("span",{children:[(0,a.jsx)("img",{loading:"lazy",src:"/img/homebrew.svg",alt:"npm"})," Pacote Homebrew",(0,a.jsx)("sup",{children:"?"})]}),(0,a.jsx)("input",{placeholder:"Ex.: rio",type:"text",name:"homebrew",value:c.homebrew,onChange:function(e){return d(e,"homebrew")}}),(0,a.jsxs)("small",{children:[(0,a.jsx)(U.A,{})," Nome do pacote Homebrew, caso exista (opcional)."]})]}),(0,a.jsxs)("label",{children:[(0,a.jsxs)("span",{children:[(0,a.jsx)("img",{loading:"lazy",src:"/img/pypi.svg",alt:"PyPi"})," Pacote PyPi"," ",(0,a.jsx)("sup",{children:"?"})]}),(0,a.jsx)("input",{placeholder:"Ex.: splinter",type:"text",name:"pypi",value:c.pypi,onChange:function(e){return d(e,"pypi")}}),(0,a.jsxs)("small",{children:[(0,a.jsx)(U.A,{})," Nome do pacote PyPi, caso exista (opcional)."]})]}),(0,a.jsxs)("label",{children:[(0,a.jsxs)("span",{children:[(0,a.jsx)("img",{loading:"lazy",src:"/img/chocolatey.svg",alt:"Chocolatey"})," ","Pacote Chocolatey ",(0,a.jsx)("sup",{children:"?"})]}),(0,a.jsx)("input",{placeholder:"Ex.: elixir",type:"text",name:"chocolatey",value:c.chocolatey,onChange:function(e){return d(e,"chocolatey")}}),(0,a.jsxs)("small",{children:[(0,a.jsx)(U.A,{})," Nome do pacote Chocolatey, caso exista (opcional)."]})]}),(0,a.jsxs)("label",{children:[(0,a.jsxs)("span",{children:[(0,a.jsx)("img",{loading:"lazy",src:"/img/vscode.svg",alt:"Visual Studio Code Marketplace"})," ","Visual Studio Code ID ",(0,a.jsx)("sup",{children:"?"})]}),(0,a.jsx)("input",{placeholder:"Ex.: dracula-theme.theme-dracula",type:"text",name:"vscode",value:c.vscode,onChange:function(e){return d(e,"vscode")}}),(0,a.jsxs)("small",{children:[(0,a.jsx)(U.A,{})," ID da extens\xe3o do Visual Studio Code Marketplace, caso exista (opcional)."]})]})]})},X=function(){var e=(0,o.useContext)(t),s=e.modalRef,r=e.useJSON,n=e.useCurrentProject,l=e.openProject,c=r[0],d=r[1],u=c.projects,j=n[0],x=n[1],p=(0,o.useCallback)((function(){var e;null==(e=s.current)||e.classList.remove("show"),x(void 0)}),[s.current,x]),h=(0,o.useCallback)((function(){var e;if(j)if(j.repository)if(j.description){try{(0,b.o)(j.repository)}catch(o){return void(o instanceof Error&&i.oR.error(o.message))}for(var s in j)if(Object.prototype.hasOwnProperty.call(j,s)){var r=s;j[r]||"repository"===r||"description"===r||delete j[r]}var n=null==(e=c.projects)?void 0:e.findIndex((function(e){return e.repository===j.repository}));d(-1!==n?function(e){var s=[].concat(e.projects);return s[n]=j,Object.assign({},e,{projects:s})}:function(e){return Object.assign({},e,{projects:[].concat(e.projects,[j])})}),p()}else i.oR.error("Insira a descri\xe7\xe3o do projeto.");else i.oR.error("Insira o reposit\xf3rio do projeto.");else i.oR.error("Preencha os campos obrigat\xf3rios para salvar.")}),[j,d]),m=(0,o.useCallback)((function(){var e;if(j){var s=null==(e=c.projects)?void 0:e.findIndex((function(e){return(null==e?void 0:e.repository)===(null==j?void 0:j.repository)}));-1!==s&&d((function(e){var r=[].concat(e.projects);return delete r[s],Object.assign({},e,{projects:r.filter(Boolean)})})),p()}else p()}),[j,d]);return(0,a.jsxs)("form",{children:[(0,a.jsx)(D,{}),(0,a.jsxs)("h2",{children:[(0,a.jsx)(q.A,{})," Projetos"]}),(0,a.jsxs)("div",{className:"projects",children:[u&&(null==u?void 0:u.map((function(e,s){var r=e.repository,n=e.name;return r&&(0,a.jsxs)("button",{type:"button",onClick:function(){return l(r)},children:[(0,a.jsx)(O.A,{}),n||function(){try{return(0,b.o)(r).repository}catch(e){}}()]},"project:"+s)}))),(0,a.jsxs)("button",{type:"button",onClick:function(){return l()},children:[(0,a.jsx)(R.A,{}),"Adicionar Projeto"]})]}),(0,a.jsx)("div",{ref:s,className:"modal",children:(0,a.jsxs)("div",{className:"content",children:[(0,a.jsx)(W,{}),(0,a.jsxs)("footer",{children:[(0,a.jsxs)("button",{type:"button",className:"delete",onClick:m,children:[(0,a.jsx)(S.A,{}),"Excluir"]}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("button",{type:"button",className:"cancel",onClick:p,children:[(0,a.jsx)(I.A,{}),"Cancelar"]}),(0,a.jsxs)("button",{type:"button",onClick:h,children:[(0,a.jsx)(M.A,{}),"Salvar"]})]})]})]})})]})},Y=r(6289),Z=r(8931),_=r(7677),ee=r(2476),se=function(){return(0,a.jsxs)("header",{children:[(0,a.jsx)("h1",{children:(0,a.jsx)(ee.S,{name:"<Novo Projeto + />"})}),(0,a.jsxs)("small",{className:"baloon",children:[(0,a.jsx)("div",{className:"float",children:(0,a.jsx)(M.A,{})}),(0,a.jsx)("span",{children:"Fa\xe7a parte da nossa hist\xf3ria."})]}),(0,a.jsxs)("small",{children:[(0,a.jsxs)("p",{children:["Para manter a relev\xe2ncia dos projetos dentro da iniciativa e dos seus respectivos mantenedores, os projetos precisam atingir pelo menos"," ",(0,a.jsx)("strong",{children:"250 pontos"}),". Consulte as"," ",(0,a.jsxs)(y.w,{to:"https://github.com/wellwelwel/awesomeyou/blob/main/docs/RULES.md",children:["Regras ",(0,a.jsx)(Z.A,{})]})," ","e"," ",(0,a.jsxs)(Y.A,{to:"/calculator",children:["use nossa calculadora para descobrir o score do projeto"," ",(0,a.jsx)(_.A,{})]})]}),(0,a.jsx)("br",{}),(0,a.jsxs)(y.w,{to:"https://github.com/wellwelwel/awesomeyou/issues/4",children:["Voc\xea pode contribuir para melhorar o sistema de pontos ",(0,a.jsx)(Z.A,{})]})]})]})},re=function(){return(0,a.jsx)(n.A,{title:"Novo Projeto",children:(0,a.jsx)(l,{children:(0,a.jsxs)("div",{id:"new",children:[(0,a.jsxs)("main",{children:[(0,a.jsx)(se,{}),(0,a.jsx)(X,{})]}),(0,a.jsx)(E,{})]})})})}},5397:function(e,s,r){r.d(s,{T:function(){return i}});var n=r(697),o=r(4848),i=function(e){var s=e.title,r=e.children,i=e.open;return(0,o.jsxs)("div",{className:i?"faq open":"faq",children:[(0,o.jsxs)("h2",{onClick:function(e){return e.currentTarget.parentElement.classList.toggle("open")},children:[(0,o.jsx)("span",{children:s}),(0,o.jsx)(n.A,{className:"arrow"})]}),(0,o.jsx)("div",{className:"wrapper",children:(0,o.jsx)("span",{children:r})})]})}},7914:function(e,s,r){r.d(s,{o:function(){return o}});var n=Object.freeze({domain:23,organization:39,repository:100}),o=function(e){var s=String(e).trim(),r=s.length,o=n.domain+n.organization+n.repository;if(r>o)throw new Error("O tamanho m\xe1ximo da URL foi excedido ("+r+"/"+o+").");var i=s.match(/^https?:\/\/github\.com\/([^\/]+)\/([^\/]+)(?:\/|$)/);if(!i||!i[1]||!i[2])throw new Error("A URL do reposit\xf3rio \xe9 inv\xe1lida.");var a={organization:i[1],repository:i[2]};if(a.organization.length>n.organization)throw new Error("O nome da organiza\xe7\xe3o excedeu o tamanho de caracteres ("+a.organization.length+"/"+n.organization+").",{cause:400});if(a.repository.length>n.repository)throw new Error("O nome do reposit\xf3rio excedeu o tamanho de caracteres ("+a.repository.length+"/"+n.repository+").",{cause:400});if(-1!==a.repository.indexOf("/")||-1!==a.repository.indexOf("#")||-1!==a.repository.indexOf("?"))throw new Error("Verifique a URL do reposit\xf3rio.",{cause:400});return a}}}]);