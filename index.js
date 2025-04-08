const e=Object.freeze({domain:23,organization:39,repository:100}),t=t=>{const s=String(t).trim(),o=s.length,a=e.domain+e.organization+e.repository;if(o>a)throw new Error(`O tamanho máximo da URL foi excedido (${o}/${a}).`);const r=s.match(/^https?:\/\/github\.com\/([^\/]+)\/([^\/]+)(?:\/|$)/);if(!r||!r[1]||!r[2])throw new Error("A URL do repositório é inválida.");const i={organization:r[1],repository:r[2]};if(i.organization.length>e.organization)throw new Error(`O nome da organização excedeu o tamanho de caracteres (${i.organization.length}/${e.organization}).`,{cause:400});if(i.repository.length>e.repository)throw new Error(`O nome do repositório excedeu o tamanho de caracteres (${i.repository.length}/${e.repository}).`,{cause:400});if(-1!==i.repository.indexOf("/")||-1!==i.repository.indexOf("#")||-1!==i.repository.indexOf("?"))throw new Error("Verifique a URL do repositório.",{cause:400});return i},s=Object.freeze({STAR_POINTS:1,FORK_POINTS:2,DIRECT_REPOSITORY_DEPENDENTS_POINTS:4,DIRECT_REPOSITORY_DEPENDENTS_INTERVAL:10,TOTAL_DOWNLOADS_POINTS:2,TOTAL_DOWNLOADS_INTERVAL:2e3,MONTHLY_DOWNLOADS_POINTS:3,MONTHLY_DOWNLOADS_INTERVAL:1e3,CONTRIBUTOR_POINTS:5,CLOSED_ISSUE_POINTS:2,ISSUE_PENALTY:1,MIN_INACTIVE_YEARS_FOR_PENALTY:2,INACTIVE_ISSUE_PENALTY:2e3,INACTIVE_YEAR_BASE_PENALTY:200}),o=e=>{const{contributors:t,forks:o,homebrew:a,npm:r,pypi:i,vscode:n,chocolatey:l,stars:c,commits:u,closedIssues:m,issues:p,repositoryDependents:h}=e;let d=0;if("number"==typeof c&&(d+=c*s.STAR_POINTS),"number"==typeof o&&(d+=o*s.FORK_POINTS),"number"==typeof t&&(d+=t*s.CONTRIBUTOR_POINTS),"number"==typeof n&&(d+=Math.floor(n/s.TOTAL_DOWNLOADS_INTERVAL)*s.TOTAL_DOWNLOADS_POINTS),"number"==typeof l&&(d+=Math.floor(l/s.TOTAL_DOWNLOADS_INTERVAL)*s.TOTAL_DOWNLOADS_POINTS),"number"==typeof r&&(d+=Math.floor(r/s.MONTHLY_DOWNLOADS_INTERVAL)*s.MONTHLY_DOWNLOADS_POINTS),"number"==typeof a&&(d+=Math.floor(a/s.MONTHLY_DOWNLOADS_INTERVAL)*s.MONTHLY_DOWNLOADS_POINTS),"number"==typeof i&&(d+=Math.floor(i/s.MONTHLY_DOWNLOADS_INTERVAL)*s.MONTHLY_DOWNLOADS_POINTS),"number"==typeof m){const e=m*s.CLOSED_ISSUE_POINTS,t=Math.floor(.5*d);d+=Math.min(e,t)}if("number"==typeof h){const e=Math.floor(h/s.DIRECT_REPOSITORY_DEPENDENTS_INTERVAL)*s.DIRECT_REPOSITORY_DEPENDENTS_POINTS,t=Math.floor(.5*d);d+=Math.min(e,t)}if("string"==typeof u){const e=(e=>{const t=(new Date).getUTCFullYear(),o=e.match(/\b\d{4}\b/);if(!o)return 0;const a=t-parseInt(o[0],10);return a<s.MIN_INACTIVE_YEARS_FOR_PENALTY?0:a**2*s.INACTIVE_YEAR_BASE_PENALTY})(u);"number"==typeof p&&(d-=e>0?p*s.INACTIVE_ISSUE_PENALTY:p),d-=e}return d},a=e=>{if(e<1e3)return e.toLocaleString("pt-BR");const t=[{singular:" mil",plural:" mil"},{singular:" milhão",plural:" milhões"},{singular:" bilhão",plural:" bilhões"}];let s=Math.floor(Math.log10(e)/3);if(0===s)return e.toLocaleString("pt-BR");const o=(e/Math.pow(10,3*s)).toFixed(1).replace(".0","");return`${o}${Number(o)>=2?t[s-1].plural:t[s-1].singular}`},r=e=>{const t=Number(e.replace(/[^0-9.]/g,""))*(/k/i.test(e.replace(/mês/,""))?1e3:/m/i.test(e.replace(/mês/,""))?1e6:1);return{value:t,label:a(t)}},i=async(e,t)=>{const s=await(await fetch(`https://img.shields.io/github/issues-closed/${e}/${t}.json?cacheSeconds=1`)).json();return r(s.value.replace(/closed/,""))},n={today:"Hoje",yesterday:"Ontem","this week":"Esta semana","this month":"Este mês","this year":"Este ano","last week":"Semana passada","last month":"Mês passado","last year":"Ano passado","two weeks ago":"Duas semanas atrás","three weeks ago":"Três semanas atrás","four weeks ago":"Quatro semanas atrás","five weeks ago":"Cinco semanas atrás","six weeks ago":"Seis semanas atrás","seven weeks ago":"Sete semanas atrás","eight weeks ago":"Oito semanas atrás","nine weeks ago":"Nove semanas atrás","ten weeks ago":"Dez semanas atrás","last sunday":"Último domingo","last monday":"Última segunda-feira","last tuesday":"Última terça-feira","last wednesday":"Última quarta-feira","last thursday":"Última quinta-feira","last friday":"Última sexta-feira","last saturday":"Último sábado",january:"Janeiro",february:"Fevereiro",march:"Março",april:"Abril",may:"Maio",june:"Junho",july:"Julho",august:"Agosto",september:"Setembro",october:"Outubro",november:"Novembro",december:"Dezembro"},l=async(e,t)=>{const s=(await(await fetch(`https://img.shields.io/github/last-commit/${e}/${t}.json?cacheSeconds=1`)).json()).value,o=new RegExp(Object.keys(n).join("|"),"gi");return s.replace(o,(e=>n[e.toLowerCase()]||e))},c=async(e,t)=>{const s=await(await fetch(`https://img.shields.io/github/contributors-anon/${e}/${t}.json?cacheSeconds=1`)).json();return r(s.value)},u=async(e,t)=>{const s=await(await fetch(`https://img.shields.io/github/forks/${e}/${t}.json?cacheSeconds=1`)).json();return r(s.value)},m=async(e,t)=>{const s=await(await fetch(`https://img.shields.io/github/issues/${e}/${t}.json?cacheSeconds=1`)).json();return r(s.value.replace(/open/,""))},p=async(e,t)=>{const s=await(await fetch(`https://img.shields.io/github/license/${e}/${t}.json?cacheSeconds=1`)).json();return s.value.includes("identifiable")?"Other":s.value},h=async(e,t)=>{try{const s=await fetch(`https://github.com/${e}/${t}/network/dependents`),o=(await s.text()).split("\n");for(let e=0;e<o.length;e++){const t=o[e].trim();if(!/^[\d,]+$/.test(t))continue;if(!(e+1<o.length&&"Repositories"===o[e+1].trim()))continue;const s=Number(t.replace(/,/g,""))||0;return{value:s,label:a(s)}}return{value:0,label:"0"}}catch{return{value:0,label:"0"}}},d=async(e,t)=>{const s=await(await fetch(`https://img.shields.io/github/stars/${e}/${t}.json?cacheSeconds=1`)).json();return r(s.value)},f=async e=>{const t=await(await fetch(`https://img.shields.io/visual-studio-marketplace/i/${e}.json?cacheSeconds=1`)).json();if(t.value.includes("rate limited by upstream service")){const t=await(async()=>{try{const t=await fetch(`https://marketplace.visualstudio.com/items?itemName=${e}`),s=(await t.text()).split("\n");for(let e=0;e<s.length;e++){const t=s[e].trim();if(!t.includes("data-reactroot"))continue;const o=" installs",a=t.indexOf(o);if(-1===a)break;let r=a;for(;r>0&&(t[r-1]>="0"&&t[r-1]<="9"||","===t[r-1]);)r--;const i=t.substring(r,a).trim();return Number(i.replace(/,/g,""))||0}return 0}catch{return 0}})();return{value:t,label:a(t)}}return r(t.value)},g=async(e,s)=>{const{repository:a,npm:n,pypi:g,homebrew:y,vscode:w,chocolatey:O}=e,{organization:v,repository:N}=t(a),T=Object.create(null),b=await Promise.all([p(v,N),d(v,N),u(v,N),m(v,N),i(v,N),l(v,N),c(v,N),h(v,N)]);return T.license=b[0],T.stars=b[1],T.forks=b[2],T.issues=b[3],T.closedIssues=b[4],T.commits=b[5],T.contributors=b[6],T.repositoryDependents=b[7],n&&(T.npm=await(async e=>{const t=await(await fetch(`https://img.shields.io/npm/dm/${e}.json?cacheSeconds=1`)).json();return r(t.value.replace(/month/,"mês"))})(n)),y&&(T.homebrew=await(async e=>{const t=await(await fetch(`https://img.shields.io/homebrew/installs/dm/${e}.json?cacheSeconds=1`)).json();return r(t.value.replace(/month/,"mês"))})(y)),g&&(T.pypi=await(async e=>{const t=await(await fetch(`https://img.shields.io/pypi/dm/${e}.json?cacheSeconds=1`)).json();return r(t.value.replace(/month/,"mês"))})(g)),w&&(T.vscode=await f(w)),O&&(T.chocolatey=await(async e=>{const t=await(await fetch(`https://img.shields.io/chocolatey/dt/${e}.json?cacheSeconds=1`)).json();return r(t.value.replace(/month/,"mês"))})(O)),T.score=o({contributors:T?.contributors?.value,forks:T?.forks?.value,homebrew:T?.homebrew?.value,npm:T?.npm?.value,pypi:T?.pypi?.value,vscode:T?.vscode?.value,chocolatey:T?.chocolatey?.value,stars:T?.stars?.value,issues:T?.issues?.value,closedIssues:T?.closedIssues?.value,commits:T?.commits,repositoryDependents:T.repositoryDependents?.value}),await s({organization:v,repository:N,results:T})},y=e=>{let{max:t}=e;if(!(Number.isInteger(t)&&t>0))throw new TypeError("`max` must be a positive integer");let s=0,o=0,a=0,r=[];const{onEviction:i}=e,n=new Map,l=new Array(t).fill(void 0),c=new Array(t).fill(void 0),u=new Array(t).fill(0),m=new Array(t).fill(0),p=(e,t)=>{if(e===a)return;const s=u[e],r=m[e];e===o?o=s:"get"!==t&&0===r||(u[r]=s),0!==s&&(m[s]=r),u[a]=e,m[e]=a,u[e]=0,a=e},h=()=>{const e=o,t=l[e];return null==i||i(t,c[e]),n.delete(t),l[e]=void 0,c[e]=void 0,o=u[e],0!==o&&(m[o]=0),s--,0===s&&(o=a=0),r.push(e),e};return{set(e,u){if(void 0===e)return;let m=n.get(e);void 0===m?(m=s===t?h():r.length>0?r.pop():s,n.set(e,m),l[m]=e,s++):null==i||i(e,c[m]),c[m]=u,1===s?o=a=m:p(m,"set")},get(e){const t=n.get(e);if(void 0!==t)return t!==a&&p(t,"get"),c[t]},peek:e=>{const t=n.get(e);return void 0!==t?c[t]:void 0},has:e=>n.has(e),*keys(){let e=a;for(let t=0;t<s;t++)yield l[e],e=m[e]},*values(){let e=a;for(let t=0;t<s;t++)yield c[e],e=m[e]},*entries(){let e=a;for(let t=0;t<s;t++)yield[l[e],c[e]],e=m[e]},forEach:e=>{let t=a;for(let o=0;o<s;o++){const s=l[t];e(c[t],s),t=m[t]}},delete(e){const t=n.get(e);if(void 0===t)return!1;null==i||i(e,c[t]),n.delete(e),r.push(t),l[t]=void 0,c[t]=void 0;const p=m[t],h=u[t];return 0!==p&&(u[p]=h),0!==h&&(m[h]=p),t===o&&(o=h),t===a&&(a=p),s--,!0},evict:e=>{let t=Math.min(e,s);for(;t>0;)h(),t--},clear(){if("function"==typeof i){const e=n.values();for(let t=e.next();!t.done;t=e.next())i(l[t.value],c[t.value])}n.clear(),l.fill(void 0),c.fill(void 0),r=[],s=0,o=a=0},resize:e=>{if(!(Number.isInteger(e)&&e>0))throw new TypeError("`max` must be a positive integer");if(e!==t){if(e<t){let t=a;const p=Math.min(s,e),h=s-p,d=new Array(e),f=new Array(e),g=new Array(e),y=new Array(e);for(let e=1;e<=h;e++)null==i||i(l[e],c[e]);for(let e=p-1;e>=0;e--)d[e]=l[t],f[e]=c[t],g[e]=e+1,y[e]=e-1,n.set(d[e],e),t=m[t];o=0,a=p-1,s=p,l.length=e,c.length=e,u.length=e,m.length=e;for(let e=0;e<p;e++)l[e]=d[e],c[e]=f[e],u[e]=g[e],m[e]=y[e];r=[];for(let t=p;t<e;t++)r.push(t)}else{const s=e-t;l.push(...new Array(s).fill(void 0)),c.push(...new Array(s).fill(void 0)),u.push(...new Array(s).fill(0)),m.push(...new Array(s).fill(0))}t=e}},get max(){return t},get size(){return s},get available(){return t-s}}},w={stats:y({max:1e3}),rateLimit:y({max:1e3})},O=new Set(["https://awesomeyou.io","https://www.awesomeyou.io"]),v=10,N=6e4,T=6e4,b=e=>{const t=Date.now(),s=(e=>{const t=e.headers.get("CF-Connecting-IP")||e.headers.get("X-Forwarded-For")||"UNKNOWN";return String(t).slice(0,19)})(e),o=w.rateLimit.get(s);if(o?.blocked&&t<o.resetAt)return{available:!1,remaining:0,resetAt:o.resetAt};if(!o||t-o.timestamp>=N)return w.rateLimit.set(s,{count:1,timestamp:t,blocked:!1}),{available:!0,remaining:v-1};const a=o.count+1;if(a>v){const e=t+T;return w.rateLimit.set(s,{count:a,timestamp:o.timestamp,blocked:!0,resetAt:e}),{available:!1,remaining:0,resetAt:e}}return w.rateLimit.set(s,{...o,count:a}),{available:!0,remaining:v-a}},S={packageName:/[^a-z0-9-_.@\/]/gi},A=e=>void 0===e||"string"==typeof e&&(!(e.length>64)&&!S.packageName.test(e)),E=e=>{if("string"!=typeof e)return;const t=e.trim().replace(S.packageName,"");return t||void 0};var _={async fetch(e,s){if("POST"!==e.method)return new Response("Método não permitido.",{status:405});const a=b(e),r=e.headers.get("Origin"),i="production"===s.ENVIRONMENT;if(!r||"string"!=typeof r)return new Response("Método não permitido.",{status:405});if(i&&!O.has(r))return new Response("Acesso negado.",{status:403});const n=Object.freeze({"Access-Control-Allow-Origin":i?r:"*","Access-Control-Allow-Methods":"POST","Access-Control-Allow-Headers":"Content-Type","Content-Type":"application/json; charset=utf-8","X-RateLimit-Limit":String(v),"X-RateLimit-Remaining":String(a.remaining)}),l=(e,t=200)=>new Response(JSON.stringify(e),{status:t,headers:n});try{if(!a.available)return l({message:"Limite de requisições excedido. Tente novamente mais tarde."},429);const s=await e.text(),{repositoryURL:r,...i}=JSON.parse(s);if("string"!=typeof r)return l({message:"Repositório inválido."},400);if(!A(i.npm))return l({message:"Pacote npm inválido."},400);if(!A(i.homebrew))return l({message:"Pacote Homebrew inválido."},400);if(!A(i.pypi))return l({message:"Pacote PyPi inválido."},400);if(!A(i.chocolatey))return l({message:"Pacote Chocolatey inválido."},400);if(!A(i.vscode))return l({message:"ID do Visual Code Studio Marketplace inválido."},400);const n=r.trim(),c=E(i.npm),u=E(i.homebrew),m=E(i.pypi),p=E(i.chocolatey),h=E(i.vscode);let d=n;"string"==typeof c&&(d+=`:${c}`),"string"==typeof u&&(d+=`:${u}`),"string"==typeof m&&(d+=`:${m}`),"string"==typeof p&&(d+=`:${p}`),"string"==typeof h&&(d+=`:${h}`);const{organization:f,repository:y}=t(n);return w.stats.has(d)?l(w.stats.get(d)):l(await g({description:"",repository:n,npm:c,homebrew:u,pypi:m,chocolatey:p,vscode:h},(({results:e})=>{const t=o({closedIssues:e?.closedIssues?.value,contributors:e?.contributors?.value,forks:e?.forks?.value,homebrew:e?.homebrew?.value,issues:e?.issues?.value,npm:e?.npm?.value,pypi:e?.pypi?.value,stars:e?.stars?.value,commits:e?.commits,chocolatey:e?.chocolatey?.value,repositoryDependents:e?.repositoryDependents?.value,vscode:e?.vscode?.value}),s={...e,score:t,username:f,repository:y};return w.stats.set(d,s),{...e,score:t,username:f,repository:y}})))}catch(e){return e instanceof Error&&400===e.cause?l({message:e.message},400):("production"!==s.ENVIRONMENT&&console.error(e),l({message:"Ops! Erro interno."},500))}}};export{_ as default};
