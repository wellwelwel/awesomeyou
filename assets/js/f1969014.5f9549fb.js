"use strict";(self.webpackChunkawesomeyou=self.webpackChunkawesomeyou||[]).push([[313],{2476:function(e,s,r){r.d(s,{S:function(){return i}});var n=r(4848),i=function(e){return e.name.split("").map((function(e,s){return(0,n.jsx)("span",{style:e.trim().length>0?{"--index":s}:void 0,children:e},"name:"+e+":"+s)}))}},8999:function(e,s,r){r.r(s);r(6540);var n=r(6878),i=r(2476),t=r(1634),o=r(4848);s.default=function(e){var s=e.data,r=s.username,a=s.projects;return(0,o.jsx)(n.A,{title:"",description:"Lista de projetos open source do Brasil",children:(0,o.jsxs)("main",{style:{padding:"2rem",zIndex:1},children:[(0,o.jsxs)("header",{children:[(0,o.jsx)("img",{src:"https://avatars.githubusercontent.com/"+r,loading:"eager",alt:r+" profile avatar"}),(0,o.jsxs)("h1",{children:["\ud83d\udc4b Conhe\xe7a ",(0,o.jsx)(i.S,{name:r})]})]}),(0,o.jsx)("ul",{style:{listStyleType:"none",padding:0},children:a.map((function(e,s){return(0,o.jsxs)("li",{style:{marginBottom:"2rem",borderBottom:"1px solid #ccc",paddingBottom:"1rem"},children:[(0,o.jsx)("h2",{children:e.name||"..."}),(0,o.jsx)("p",{children:e.description}),(0,o.jsxs)("p",{children:[(0,o.jsx)("strong",{children:"Reposit\xf3rio:"})," ",(0,o.jsx)(t.w,{to:e.repository,children:e.repository})]}),e.languages&&e.languages.length>0&&(0,o.jsxs)("p",{children:[(0,o.jsx)("strong",{children:"Linguagens:"})," ",e.languages.join(", ")]}),e.categories&&e.categories.length>0&&(0,o.jsxs)("p",{children:[(0,o.jsx)("strong",{children:"Categorias:"})," ",e.categories.join(", ")]}),e.npm&&(0,o.jsxs)("p",{children:[(0,o.jsx)("strong",{children:"NPM:"})," ",(0,o.jsx)(t.w,{to:"https://www.npmjs.com/package/"+e.npm,children:e.npm})]}),e.pypi&&(0,o.jsxs)("p",{children:[(0,o.jsx)("strong",{children:"PyPI:"})," ",(0,o.jsx)(t.w,{to:"https://pypi.org/project/"+e.pypi,children:e.pypi})]}),e.homebrew&&(0,o.jsxs)("p",{children:[(0,o.jsx)("strong",{children:"Homebrew:"})," ",(0,o.jsx)(t.w,{to:"https://formulae.brew.sh/formula/"+e.homebrew,children:e.homebrew})]}),(0,o.jsxs)("p",{children:[(0,o.jsx)("strong",{children:"Foi criado por um autor brasileiro?"})," ",e.madeInBrazil?"Sim":"N\xe3o"]}),e.message&&(0,o.jsx)("p",{children:(0,o.jsx)("em",{children:e.message})})]},s)}))})]})})}}}]);