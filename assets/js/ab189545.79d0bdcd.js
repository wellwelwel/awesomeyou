/*! For license information please see ab189545.79d0bdcd.js.LICENSE.txt */
"use strict";(self.webpackChunkawesomeyou=self.webpackChunkawesomeyou||[]).push([[842],{215:function(t,e,r){r.d(e,{A:function(){return n}});const n=(0,r(4722).A)("Bug",[["path",{d:"m8 2 1.88 1.88",key:"fmnt4t"}],["path",{d:"M14.12 3.88 16 2",key:"qol33r"}],["path",{d:"M9 7.13v-1a3.003 3.003 0 1 1 6 0v1",key:"d7y7pr"}],["path",{d:"M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6",key:"xs1cw7"}],["path",{d:"M12 20v-9",key:"1qisl0"}],["path",{d:"M6.53 9C4.6 8.8 3 7.1 3 5",key:"32zzws"}],["path",{d:"M6 13H2",key:"82j7cp"}],["path",{d:"M3 21c0-2.1 1.7-3.9 3.8-4",key:"4p0ekp"}],["path",{d:"M20.97 5c0 2.1-1.6 3.8-3.5 4",key:"18gb23"}],["path",{d:"M22 13h-4",key:"1jl80f"}],["path",{d:"M17.2 17c2.1.1 3.8 1.9 3.8 4",key:"k3fwyw"}]])},467:function(t,e,r){function n(t,e,r,n,o,i,a){try{var s=t[i](a),l=s.value}catch(t){return void r(t)}s.done?e(l):Promise.resolve(l).then(n,o)}function o(t){return function(){var e=this,r=arguments;return new Promise((function(o,i){var a=t.apply(e,r);function s(t){n(a,o,i,s,l,"next",t)}function l(t){n(a,o,i,s,l,"throw",t)}s(void 0)}))}}r.d(e,{A:function(){return o}})},675:function(t,e,r){r.d(e,{A:function(){return o}});var n=r(2284);function o(){o=function(){return e};var t,e={},r=Object.prototype,i=r.hasOwnProperty,a=Object.defineProperty||function(t,e,r){t[e]=r.value},s="function"==typeof Symbol?Symbol:{},l=s.iterator||"@@iterator",c=s.asyncIterator||"@@asyncIterator",u=s.toStringTag||"@@toStringTag";function h(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{h({},"")}catch(t){h=function(t,e,r){return t[e]=r}}function d(t,e,r,n){var o=e&&e.prototype instanceof g?e:g,i=Object.create(o.prototype),s=new _(n||[]);return a(i,"_invoke",{value:z(t,r,s)}),i}function p(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}e.wrap=d;var f="suspendedStart",y="suspendedYield",v="executing",m="completed",x={};function g(){}function j(){}function k(){}var w={};h(w,l,(function(){return this}));var b=Object.getPrototypeOf,A=b&&b(b(T([])));A&&A!==r&&i.call(A,l)&&(w=A);var M=k.prototype=g.prototype=Object.create(w);function L(t){["next","throw","return"].forEach((function(e){h(t,e,(function(t){return this._invoke(e,t)}))}))}function E(t,e){function r(o,a,s,l){var c=p(t[o],t,a);if("throw"!==c.type){var u=c.arg,h=u.value;return h&&"object"==(0,n.A)(h)&&i.call(h,"__await")?e.resolve(h.__await).then((function(t){r("next",t,s,l)}),(function(t){r("throw",t,s,l)})):e.resolve(h).then((function(t){u.value=t,s(u)}),(function(t){return r("throw",t,s,l)}))}l(c.arg)}var o;a(this,"_invoke",{value:function(t,n){function i(){return new e((function(e,o){r(t,n,e,o)}))}return o=o?o.then(i,i):i()}})}function z(e,r,n){var o=f;return function(i,a){if(o===v)throw Error("Generator is already running");if(o===m){if("throw"===i)throw a;return{value:t,done:!0}}for(n.method=i,n.arg=a;;){var s=n.delegate;if(s){var l=N(s,n);if(l){if(l===x)continue;return l}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===f)throw o=m,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=v;var c=p(e,r,n);if("normal"===c.type){if(o=n.done?m:y,c.arg===x)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(o=m,n.method="throw",n.arg=c.arg)}}}function N(e,r){var n=r.method,o=e.iterator[n];if(o===t)return r.delegate=null,"throw"===n&&e.iterator.return&&(r.method="return",r.arg=t,N(e,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),x;var i=p(o,e.iterator,r.arg);if("throw"===i.type)return r.method="throw",r.arg=i.arg,r.delegate=null,x;var a=i.arg;return a?a.done?(r[e.resultName]=a.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,x):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,x)}function O(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function S(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function _(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(O,this),this.reset(!0)}function T(e){if(e||""===e){var r=e[l];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,a=function r(){for(;++o<e.length;)if(i.call(e,o))return r.value=e[o],r.done=!1,r;return r.value=t,r.done=!0,r};return a.next=a}}throw new TypeError((0,n.A)(e)+" is not iterable")}return j.prototype=k,a(M,"constructor",{value:k,configurable:!0}),a(k,"constructor",{value:j,configurable:!0}),j.displayName=h(k,u,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===j||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,k):(t.__proto__=k,h(t,u,"GeneratorFunction")),t.prototype=Object.create(M),t},e.awrap=function(t){return{__await:t}},L(E.prototype),h(E.prototype,c,(function(){return this})),e.AsyncIterator=E,e.async=function(t,r,n,o,i){void 0===i&&(i=Promise);var a=new E(d(t,r,n,o),i);return e.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},L(M),h(M,u,"Generator"),h(M,l,(function(){return this})),h(M,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},e.values=T,_.prototype={constructor:_,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(S),!e)for(var r in this)"t"===r.charAt(0)&&i.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function n(n,o){return s.type="throw",s.arg=e,r.next=n,o&&(r.method="next",r.arg=t),!!o}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],s=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var l=i.call(a,"catchLoc"),c=i.call(a,"finallyLoc");if(l&&c){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(l){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!c)throw Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&i.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=t,a.arg=e,o?(this.method="next",this.next=o.finallyLoc,x):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),x},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),S(r),x}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;S(r)}return o}}throw Error("illegal catch attempt")},delegateYield:function(e,r,n){return this.delegate={iterator:T(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),x}},e}},686:function(t,e,r){r.d(e,{A:function(){return n}});const n=(0,r(4722).A)("UtensilsCrossed",[["path",{d:"m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8",key:"n7qcjb"}],["path",{d:"M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7",key:"d0u48b"}],["path",{d:"m2.1 21.8 6.4-6.3",key:"yn04lh"}],["path",{d:"m19 5-7 7",key:"194lzd"}]])},1181:function(t,e,r){r.d(e,{A:function(){return n}});const n=(0,r(4722).A)("Star",[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]])},3975:function(t,e,r){r.d(e,{A:function(){return n}});const n=(0,r(4722).A)("Scale",[["path",{d:"m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z",key:"7g6ntu"}],["path",{d:"m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z",key:"ijws7r"}],["path",{d:"M7 21h10",key:"1b0cd5"}],["path",{d:"M12 3v18",key:"108xh3"}],["path",{d:"M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2",key:"3gwbw2"}]])},4579:function(t,e,r){r.d(e,{A:function(){return n}});const n=(0,r(4722).A)("BugOff",[["path",{d:"M15 7.13V6a3 3 0 0 0-5.14-2.1L8 2",key:"vl8zik"}],["path",{d:"M14.12 3.88 16 2",key:"qol33r"}],["path",{d:"M22 13h-4v-2a4 4 0 0 0-4-4h-1.3",key:"1ou0bd"}],["path",{d:"M20.97 5c0 2.1-1.6 3.8-3.5 4",key:"18gb23"}],["path",{d:"m2 2 20 20",key:"1ooewy"}],["path",{d:"M7.7 7.7A4 4 0 0 0 6 11v3a6 6 0 0 0 11.13 3.13",key:"1njkjs"}],["path",{d:"M12 20v-8",key:"i3yub9"}],["path",{d:"M6 13H2",key:"82j7cp"}],["path",{d:"M3 21c0-2.1 1.7-3.9 3.8-4",key:"4p0ekp"}]])},5043:function(t,e,r){r.r(e),r.d(e,{default:function(){return L}});var n=r(675),o=r(467),i=r(6540),a=r(6289),s=r(797),l=r(6878);var c=r(9653),u=r(6844),h=r(4722);const d=(0,h.A)("Trophy",[["path",{d:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6",key:"17hqa7"}],["path",{d:"M18 9h1.5a2.5 2.5 0 0 0 0-5H18",key:"lmptdp"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",key:"1nw9bq"}],["path",{d:"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",key:"1np0yb"}],["path",{d:"M18 2H6v7a6 6 0 0 0 12 0V2Z",key:"u46fv3"}]]),p=(0,h.A)("Award",[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]]);var f=r(7870);const y=(0,h.A)("FlameKindling",[["path",{d:"M12 2c1 3 2.5 3.5 3.5 4.5A5 5 0 0 1 17 10a5 5 0 1 1-10 0c0-.3 0-.6.1-.9a2 2 0 1 0 3.3-2C8 4.5 11 2 12 2Z",key:"1ir223"}],["path",{d:"m5 22 14-4",key:"1brv4h"}],["path",{d:"m5 18 14 4",key:"lgyyje"}]]),v=(0,h.A)("Loader",[["path",{d:"M12 2v4",key:"3427ic"}],["path",{d:"m16.2 7.8 2.9-2.9",key:"r700ao"}],["path",{d:"M18 12h4",key:"wj9ykh"}],["path",{d:"m16.2 16.2 2.9 2.9",key:"1bxg5t"}],["path",{d:"M12 18v4",key:"jadmvz"}],["path",{d:"m4.9 19.1 2.9-2.9",key:"bwix9q"}],["path",{d:"M2 12h4",key:"j09sii"}],["path",{d:"m4.9 4.9 2.9 2.9",key:"giyufr"}]]);var m=r(7621),x=r(686),g=r(1181),j=r(3975),k=r(215),w=r(4579),b=r(6816),A=r(4721),M=r(4848),L=function(){var t,e,r,h,L,E,z,N,O=(0,s.A)().siteConfig,S=(0,i.useState)(null),_=S[0],T=S[1],I=(0,i.useRef)(""),q=(0,i.useRef)((t=>{let{max:e}=t;if(!(Number.isInteger(e)&&e>0))throw new TypeError("`max` must be a positive integer");let r=0,n=0,o=0,i=[];const{onEviction:a}=t,s=new Map,l=new Array(e).fill(void 0),c=new Array(e).fill(void 0),u=new Array(e).fill(0),h=new Array(e).fill(0),d=(t,e)=>{if(t===o)return;const r=u[t],i=h[t];t===n?n=r:"get"!==e&&0===i||(u[i]=r),0!==r&&(h[r]=i),u[o]=t,h[t]=o,u[t]=0,o=t},p=()=>{const t=n,e=l[t];return null==a||a(e,c[t]),s.delete(e),l[t]=void 0,c[t]=void 0,n=u[t],0!==n&&(h[n]=0),r--,0===r&&(n=o=0),i.push(t),t};return{set(t,u){if(void 0===t)return;let h=s.get(t);void 0===h?(h=r===e?p():i.length>0?i.pop():r,s.set(t,h),l[h]=t,r++):null==a||a(t,c[h]),c[h]=u,1===r?n=o=h:d(h,"set")},get(t){const e=s.get(t);if(void 0!==e)return e!==o&&d(e,"get"),c[e]},peek:t=>{const e=s.get(t);return void 0!==e?c[e]:void 0},has:t=>s.has(t),*keys(){let t=o;for(let e=0;e<r;e++)yield l[t],t=h[t]},*values(){let t=o;for(let e=0;e<r;e++)yield c[t],t=h[t]},*entries(){let t=o;for(let e=0;e<r;e++)yield[l[t],c[t]],t=h[t]},forEach:t=>{let e=o;for(let n=0;n<r;n++){const r=l[e];t(c[e],r),e=h[e]}},delete(t){const e=s.get(t);if(void 0===e)return!1;null==a||a(t,c[e]),s.delete(t),i.push(e),l[e]=void 0,c[e]=void 0;const d=h[e],p=u[e];return 0!==d&&(u[d]=p),0!==p&&(h[p]=d),e===n&&(n=p),e===o&&(o=d),r--,!0},evict:t=>{let e=Math.min(t,r);for(;e>0;)p(),e--},clear(){if("function"==typeof a){const t=s.values();for(let e=t.next();!e.done;e=t.next())a(l[e.value],c[e.value])}s.clear(),l.fill(void 0),c.fill(void 0),i=[],r=0,n=o=0},resize:t=>{if(!(Number.isInteger(t)&&t>0))throw new TypeError("`max` must be a positive integer");if(t!==e){if(t<e){let e=o;const d=Math.min(r,t),p=r-d,f=new Array(t),y=new Array(t),v=new Array(t),m=new Array(t);for(let t=1;t<=p;t++)null==a||a(l[t],c[t]);for(let t=d-1;t>=0;t--)f[t]=l[e],y[t]=c[e],v[t]=t+1,m[t]=t-1,s.set(f[t],t),e=h[e];n=0,o=d-1,r=d,l.length=t,c.length=t,u.length=t,h.length=t;for(let t=0;t<d;t++)l[t]=f[t],c[t]=y[t],u[t]=v[t],h[t]=m[t];i=[];for(let r=d;r<t;r++)i.push(r)}else{const r=t-e;l.push(...new Array(r).fill(void 0)),c.push(...new Array(r).fill(void 0)),u.push(...new Array(r).fill(0)),h.push(...new Array(r).fill(0))}e=t}},get max(){return e},get size(){return r},get available(){return e-r}}})({max:100})).current,F=function(){var t=(0,o.A)((0,n.A)().mark((function t(e){var r,o,i,a;return(0,n.A)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.preventDefault(),r=new FormData(e.currentTarget),o=r.get("user"),i=r.get("repository"),o&&"string"==typeof o){t.next=7;break}return A.oR.error("Insira um usu\xe1rio v\xe1lido"),t.abrupt("return");case 7:if(i&&"string"==typeof i){t.next=10;break}return A.oR.error("Insira um reposit\xf3rio v\xe1lido"),t.abrupt("return");case 10:if(a=o.trim()+"/"+i.trim(),I.current="https://github.com/"+a,!q.has(a)){t.next=15;break}return T(q.get(a)),t.abrupt("return");case 15:return t.t0=console,t.next=18,fetch("http://localhost:3001",{method:"POST",body:JSON.stringify({repositoryURL:I.current})});case 18:return t.next=20,t.sent.json();case 20:t.t1=t.sent,t.t0.log.call(t.t0,t.t1);case 22:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return _&&console.log(_),(0,M.jsx)(l.A,{title:O.title,description:"Descubra projetos open-source incr\xedveis criados e mantidos por desenvolvedores brasileiros.",children:(0,M.jsx)("div",{id:"home",children:(0,M.jsx)("main",{children:(0,M.jsxs)("header",{children:[(0,M.jsx)("h1",{children:"Teste 2"}),(0,M.jsx)("small",{children:"..."}),(0,M.jsxs)("section",{children:[(0,M.jsx)("h2",{children:"Verifique seu score"}),(0,M.jsxs)("form",{onSubmit:F,children:[(0,M.jsx)("input",{placeholder:"dracula",defaultValue:"raphamorim",type:"text",name:"user"}),(0,M.jsx)("input",{placeholder:"dracula-theme",defaultValue:"lucario",type:"text",name:"repository"}),(0,M.jsx)("button",{children:"Gerar Score"})]}),(0,M.jsxs)("div",{className:"social",children:[(0,M.jsxs)("div",{className:"tabs",children:[(0,M.jsxs)("h3",{children:[(0,M.jsx)(c.A,{})," Impacto"]}),(0,M.jsxs)("h3",{children:[(0,M.jsx)(u.A,{})," Atividade"]})]}),_?(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)("header",{children:(0,M.jsx)("img",{src:"https://avatars.githubusercontent.com/"+_.username,loading:"lazy",alt:_.username+" profile avatar"})}),(0,M.jsx)("table",{children:(0,M.jsxs)("tbody",{children:[_.score?(0,M.jsxs)("tr",{children:[(0,M.jsx)("td",{children:(0,M.jsx)("span",{children:"Score:"})}),(0,M.jsxs)("td",{children:[_.score>1e6?(0,M.jsx)(d,{}):_.score>1e5?(0,M.jsx)(p,{}):_.score>1e4?(0,M.jsx)(f.A,{}):_.score>1e3?(0,M.jsx)(y,{}):(0,M.jsx)(v,{}),(0,M.jsx)("span",{className:"score",children:Number(_.score).toLocaleString("pt-BR")})]})]}):null,(0,M.jsxs)("tr",{children:[(0,M.jsx)("td",{children:"Contribuidores:"}),(0,M.jsx)("td",{children:(0,M.jsxs)(a.A,{to:"repositoryURL ? undefined : "+I.current+"/graphs/contributors",children:[(0,M.jsx)(m.A,{}),(null==_||null==(t=_.contributors)?void 0:t.label)||null]})})]}),_.npm?(0,M.jsxs)("tr",{children:[(0,M.jsx)("td",{children:(0,M.jsx)("span",{children:"Downloads por m\xeas:"})}),(0,M.jsx)("td",{children:(0,M.jsxs)(a.A,{to:"https://www.npmjs.com/package/"+_.npm,children:[(0,M.jsx)("img",{loading:"lazy",src:"/img/npm.svg"}),(null==_||null==(e=_.npm)?void 0:e.label)||null]})})]}):null,_.homebrew?(0,M.jsxs)("tr",{children:[(0,M.jsx)("td",{children:(0,M.jsx)("span",{children:"Downloads por m\xeas:"})}),(0,M.jsx)("td",{children:(0,M.jsxs)(a.A,{to:"https://formulae.brew.sh/formula/"+_.homebrew,children:[(0,M.jsx)("img",{loading:"lazy",src:"/img/homebrew.svg"}),(null==_||null==(r=_.homebrew)?void 0:r.label)||null]})})]}):null,_.pypi?(0,M.jsxs)("tr",{children:[(0,M.jsx)("td",{children:(0,M.jsx)("span",{children:"Downloads por m\xeas:"})}),(0,M.jsx)("td",{children:(0,M.jsxs)(a.A,{to:"https://pypi.org/project/"+_.pypi+"/",children:[(0,M.jsx)("img",{loading:"lazy",src:"/img/pypi.svg"}),(null==_||null==(h=_.pypi)?void 0:h.label)||null]})})]}):null,(0,M.jsxs)("tr",{children:[(0,M.jsx)("td",{children:"Forks:"}),(0,M.jsx)("td",{children:(0,M.jsxs)(a.A,{to:I.current+"/graphs/contributors",children:[(0,M.jsx)(x.A,{}),(null==_||null==(L=_.forks)?void 0:L.label)||null]})})]}),(0,M.jsxs)("tr",{children:[(0,M.jsx)("td",{children:"Estrelas:"}),(0,M.jsx)("td",{children:(0,M.jsxs)(a.A,{to:I.current+"/stargazers",children:[(0,M.jsx)(g.A,{}),(null==_||null==(E=_.stars)?void 0:E.label)||null]})})]}),(null==_?void 0:_.license)&&(0,M.jsxs)("tr",{className:_.license.includes("not specified")?"error":void 0,children:[(0,M.jsx)("td",{children:"Licen\xe7a:"}),(0,M.jsxs)("td",{children:[(0,M.jsx)(j.A,{}),(0,M.jsx)("span",{className:"score",children:null==_?void 0:_.license})]})]})]})}),(0,M.jsx)("table",{children:(0,M.jsxs)("tbody",{children:[(0,M.jsxs)("tr",{children:[(0,M.jsx)("td",{children:"Issues abertas:"}),(0,M.jsx)("td",{children:(0,M.jsxs)(a.A,{to:I.current+"/issues",children:[(0,M.jsx)(k.A,{}),(null==_||null==(z=_.issues)?void 0:z.label)||null]})})]}),(0,M.jsxs)("tr",{children:[(0,M.jsx)("td",{children:"Issues fechadas:"}),(0,M.jsx)("td",{children:(0,M.jsxs)(a.A,{to:I.current+"/issues?q=is:issue+is:closed",children:[(0,M.jsx)(w.A,{}),(null==_||null==(N=_.closedIssues)?void 0:N.label)||null]})})]}),(0,M.jsxs)("tr",{children:[(0,M.jsx)("td",{children:"\xdaltimo commit:"}),(0,M.jsx)("td",{children:(0,M.jsxs)(a.A,{to:I.current+"/commits",children:[(0,M.jsx)(b.A,{}),(null==_?void 0:_.commits)||null]})})]})]})})]}):null]})]})]})})})})}},6816:function(t,e,r){r.d(e,{A:function(){return n}});const n=(0,r(4722).A)("Wrench",[["path",{d:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",key:"cbrjhi"}]])},6844:function(t,e,r){r.d(e,{A:function(){return n}});const n=(0,r(4722).A)("Activity",[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]])},7621:function(t,e,r){r.d(e,{A:function(){return n}});const n=(0,r(4722).A)("HeartHandshake",[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}],["path",{d:"M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66",key:"4oyue0"}],["path",{d:"m18 15-2-2",key:"60u0ii"}],["path",{d:"m15 18-2-2",key:"6p76be"}]])},7870:function(t,e,r){r.d(e,{A:function(){return n}});const n=(0,r(4722).A)("Flame",[["path",{d:"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",key:"96xj49"}]])},9653:function(t,e,r){r.d(e,{A:function(){return n}});const n=(0,r(4722).A)("Rocket",[["path",{d:"M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",key:"m3kijz"}],["path",{d:"m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z",key:"1fmvmk"}],["path",{d:"M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0",key:"1f8sc4"}],["path",{d:"M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5",key:"qeys4"}]])}}]);