const e=e=>{const t=String(e).trim(),s=Object.freeze({domain:23,organization:39,repository:100}),o=t.length,r=s.domain+s.organization+s.repository;if(o>r)throw new Error(`O tamanho máximo da URL foi excedido (${o}/${r}).`);const a=t.match(/^https?:\/\/github\.com\/([^\/]+)\/([^\/]+)(?:\/|$)/);if(!a||!a[1]||!a[2])throw new Error("A URL do repositório é inválida.");const i={organization:a[1],repository:a[2]};if(i.organization.length>s.organization)throw new Error(`O nome da organização excedeu o tamanho de caracteres (${i.organization.length}/${s.organization}).`,{cause:400});if(i.repository.length>s.repository)throw new Error(`O nome do repositório excedeu o tamanho de caracteres (${i.repository.length}/${s.repository}).`,{cause:400});if(-1!==i.repository.indexOf("/")||-1!==i.repository.indexOf("#")||-1!==i.repository.indexOf("?"))throw new Error("Verifique a URL do repositório.",{cause:400});return i},t=e=>{if(e<1e3)return e.toLocaleString("pt-BR");const t=[{singular:" mil",plural:" mil"},{singular:" milhão",plural:" milhões"},{singular:" bilhão",plural:" bilhões"}];let s=Math.floor(Math.log10(e)/3);if(0===s)return e.toLocaleString("pt-BR");const o=(e/Math.pow(10,3*s)).toFixed(1).replace(".0","");return`${o}${Number(o)>=2?t[s-1].plural:t[s-1].singular}`},s=e=>{const s=Number(e.replace(/[^0-9.]/g,""))*(/k/i.test(e.replace(/mês/,""))?1e3:/m/i.test(e.replace(/mês/,""))?1e6:1);return{value:s,label:t(s)}},o=async(e,t)=>{const o=await(await fetch(`https://img.shields.io/github/issues-closed/${e}/${t}.json`)).json();return s(o.value.replace(/closed/,""))},r={today:"Hoje",yesterday:"Ontem","this week":"Esta semana","this month":"Este mês","this year":"Este ano","last week":"Semana passada","last month":"Mês passado","last year":"Ano passado","two weeks ago":"Duas semanas atrás","three weeks ago":"Três semanas atrás","four weeks ago":"Quatro semanas atrás","five weeks ago":"Cinco semanas atrás","six weeks ago":"Seis semanas atrás","seven weeks ago":"Sete semanas atrás","eight weeks ago":"Oito semanas atrás","nine weeks ago":"Nove semanas atrás","ten weeks ago":"Dez semanas atrás","last sunday":"Último domingo","last monday":"Última segunda-feira","last tuesday":"Última terça-feira","last wednesday":"Última quarta-feira","last thursday":"Última quinta-feira","last friday":"Última sexta-feira","last saturday":"Último sábado",january:"Janeiro",february:"Fevereiro",march:"Março",april:"Abril",may:"Maio",june:"Junho",july:"Julho",august:"Agosto",september:"Setembro",october:"Outubro",november:"Novembro",december:"Dezembro"},a=async(e,t)=>{const s=(await(await fetch(`https://img.shields.io/github/last-commit/${e}/${t}.json`)).json()).value,o=new RegExp(Object.keys(r).join("|"),"gi");return s.replace(o,(e=>r[e.toLowerCase()]||e))},i=async(e,t)=>{const o=await(await fetch(`https://img.shields.io/github/contributors-anon/${e}/${t}.json`)).json();return s(o.value)},n=async(e,t)=>{const o=await(await fetch(`https://img.shields.io/github/forks/${e}/${t}.json`)).json();return s(o.value)},l=async(e,t)=>{const o=await(await fetch(`https://img.shields.io/github/issues/${e}/${t}.json`)).json();return s(o.value.replace(/open/,""))},c=async(e,t)=>{const s=await(await fetch(`https://img.shields.io/github/license/${e}/${t}.json`)).json();return s.value.includes("identifiable")?"Other":s.value},u=async(e,s)=>{try{const o=await fetch(`https://github.com/${e}/${s}/network/dependents`),r=(await o.text()).split("\n");for(let e=0;e<r.length;e++){const s=r[e].trim();if(!/^[\d,]+$/.test(s))continue;if(!(e+1<r.length&&"Repositories"===r[e+1].trim()))continue;const o=Number(s.replace(/,/g,""))||0;return{value:o,label:t(o)}}return{value:0,label:"0"}}catch{return{value:0,label:"0"}}},m=async(e,t)=>{const o=await(await fetch(`https://img.shields.io/github/stars/${e}/${t}.json`)).json();return s(o.value)},p=async e=>{const o=await(await fetch(`https://img.shields.io/visual-studio-marketplace/i/${e}.json`)).json();if(o.value.includes("rate limited by upstream service")){const s=await(async()=>{try{const t=await fetch(`https://marketplace.visualstudio.com/items?itemName=${e}`),s=(await t.text()).split("\n");for(let e=0;e<s.length;e++){const t=s[e].trim();if(!t.includes("data-reactroot"))continue;const o=" installs",r=t.indexOf(o);if(-1===r)break;let a=r;for(;a>0&&(t[a-1]>="0"&&t[a-1]<="9"||","===t[a-1]);)a--;const i=t.substring(a,r).trim();return Number(i.replace(/,/g,""))||0}return 0}catch{return 0}})();return{value:s,label:t(s)}}return s(o.value)},h=async(t,r)=>{const{repository:h,npm:d,pypi:f,homebrew:g,vscode:y,chocolatey:w}=t,{organization:O,repository:N}=e(h),v=Object.create(null),T=await Promise.all([c(O,N),m(O,N),n(O,N),l(O,N),o(O,N),a(O,N),i(O,N),u(O,N)]);return v.license=T[0],v.stars=T[1],v.forks=T[2],v.issues=T[3],v.closedIssues=T[4],v.commits=T[5],v.contributors=T[6],v.repositoryDependents=T[7],d&&(v.npm=await(async e=>{const t=await(await fetch(`https://img.shields.io/npm/dm/${e}.json`)).json();return s(t.value.replace(/month/,"mês"))})(d)),g&&(v.homebrew=await(async e=>{const t=await(await fetch(`https://img.shields.io/homebrew/installs/dm/${e}.json`)).json();return s(t.value.replace(/month/,"mês"))})(g)),f&&(v.pypi=await(async e=>{const t=await(await fetch(`https://img.shields.io/pypi/dm/${e}.json`)).json();return s(t.value.replace(/month/,"mês"))})(f)),y&&(v.vscode=await p(y)),w&&(v.chocolatey=await(async e=>{const t=await(await fetch(`https://img.shields.io/chocolatey/dt/${e}.json`)).json();return s(t.value.replace(/month/,"mês"))})(w)),await r({organization:O,repository:N,results:v})},d=Object.freeze({STAR_POINTS:1,FORK_POINTS:2,DIRECT_REPOSITORY_DEPENDENTS_POINTS:4,DIRECT_REPOSITORY_DEPENDENTS_INTERVAL:10,TOTAL_DOWNLOADS_POINTS:2,TOTAL_DOWNLOADS_INTERVAL:2e3,MONTHLY_DOWNLOADS_POINTS:3,MONTHLY_DOWNLOADS_INTERVAL:1e3,CONTRIBUTOR_POINTS:5,CLOSED_ISSUE_POINTS:2,ISSUE_PENALTY:1,MIN_INACTIVE_YEARS_FOR_PENALTY:2,INACTIVE_ISSUE_PENALTY:2500,INACTIVE_YEAR_BASE_PENALTY:250}),f=e=>{const{contributors:t,forks:s,homebrew:o,npm:r,pypi:a,vscode:i,chocolatey:n,stars:l,commits:c,closedIssues:u,issues:m,repositoryDependents:p}=e;let h=0;if("number"==typeof l&&(h+=l*d.STAR_POINTS),"number"==typeof s&&(h+=s*d.FORK_POINTS),"number"==typeof t&&(h+=t*d.CONTRIBUTOR_POINTS),"number"==typeof i&&(h+=Math.floor(i/d.TOTAL_DOWNLOADS_INTERVAL)*d.TOTAL_DOWNLOADS_POINTS),"number"==typeof n&&(h+=Math.floor(n/d.TOTAL_DOWNLOADS_INTERVAL)*d.TOTAL_DOWNLOADS_POINTS),"number"==typeof r&&(h+=Math.floor(r/d.MONTHLY_DOWNLOADS_INTERVAL)*d.MONTHLY_DOWNLOADS_POINTS),"number"==typeof o&&(h+=Math.floor(o/d.MONTHLY_DOWNLOADS_INTERVAL)*d.MONTHLY_DOWNLOADS_POINTS),"number"==typeof a&&(h+=Math.floor(a/d.MONTHLY_DOWNLOADS_INTERVAL)*d.MONTHLY_DOWNLOADS_POINTS),"number"==typeof u){const e=u*d.CLOSED_ISSUE_POINTS,t=Math.floor(.5*h);h+=Math.min(e,t)}if("number"==typeof p){const e=Math.floor(p/d.DIRECT_REPOSITORY_DEPENDENTS_INTERVAL)*d.DIRECT_REPOSITORY_DEPENDENTS_POINTS,t=Math.floor(.5*h);h+=Math.min(e,t)}if("string"==typeof c){const e=(e=>{const t=(new Date).getUTCFullYear(),s=e.match(/\b\d{4}\b/);if(!s)return 0;const o=t-parseInt(s[0],10);return o<d.MIN_INACTIVE_YEARS_FOR_PENALTY?0:o**2*d.INACTIVE_YEAR_BASE_PENALTY})(c);"number"==typeof m&&(h-=e>0?m*d.INACTIVE_ISSUE_PENALTY:m),h-=e}return h},g=e=>{let{max:t}=e;if(!(Number.isInteger(t)&&t>0))throw new TypeError("`max` must be a positive integer");let s=0,o=0,r=0,a=[];const{onEviction:i}=e,n=new Map,l=new Array(t).fill(void 0),c=new Array(t).fill(void 0),u=new Array(t).fill(0),m=new Array(t).fill(0),p=(e,t)=>{if(e===r)return;const s=u[e],a=m[e];e===o?o=s:"get"!==t&&0===a||(u[a]=s),0!==s&&(m[s]=a),u[r]=e,m[e]=r,u[e]=0,r=e},h=()=>{const e=o,t=l[e];return null==i||i(t,c[e]),n.delete(t),l[e]=void 0,c[e]=void 0,o=u[e],0!==o&&(m[o]=0),s--,0===s&&(o=r=0),a.push(e),e};return{set(e,u){if(void 0===e)return;let m=n.get(e);void 0===m?(m=s===t?h():a.length>0?a.pop():s,n.set(e,m),l[m]=e,s++):null==i||i(e,c[m]),c[m]=u,1===s?o=r=m:p(m,"set")},get(e){const t=n.get(e);if(void 0!==t)return t!==r&&p(t,"get"),c[t]},peek:e=>{const t=n.get(e);return void 0!==t?c[t]:void 0},has:e=>n.has(e),*keys(){let e=r;for(let t=0;t<s;t++)yield l[e],e=m[e]},*values(){let e=r;for(let t=0;t<s;t++)yield c[e],e=m[e]},*entries(){let e=r;for(let t=0;t<s;t++)yield[l[e],c[e]],e=m[e]},forEach:e=>{let t=r;for(let o=0;o<s;o++){const s=l[t];e(c[t],s),t=m[t]}},delete(e){const t=n.get(e);if(void 0===t)return!1;null==i||i(e,c[t]),n.delete(e),a.push(t),l[t]=void 0,c[t]=void 0;const p=m[t],h=u[t];return 0!==p&&(u[p]=h),0!==h&&(m[h]=p),t===o&&(o=h),t===r&&(r=p),s--,!0},evict:e=>{let t=Math.min(e,s);for(;t>0;)h(),t--},clear(){if("function"==typeof i){const e=n.values();for(let t=e.next();!t.done;t=e.next())i(l[t.value],c[t.value])}n.clear(),l.fill(void 0),c.fill(void 0),a=[],s=0,o=r=0},resize:e=>{if(!(Number.isInteger(e)&&e>0))throw new TypeError("`max` must be a positive integer");if(e!==t){if(e<t){let t=r;const p=Math.min(s,e),h=s-p,d=new Array(e),f=new Array(e),g=new Array(e),y=new Array(e);for(let e=1;e<=h;e++)null==i||i(l[e],c[e]);for(let e=p-1;e>=0;e--)d[e]=l[t],f[e]=c[t],g[e]=e+1,y[e]=e-1,n.set(d[e],e),t=m[t];o=0,r=p-1,s=p,l.length=e,c.length=e,u.length=e,m.length=e;for(let e=0;e<p;e++)l[e]=d[e],c[e]=f[e],u[e]=g[e],m[e]=y[e];a=[];for(let t=p;t<e;t++)a.push(t)}else{const s=e-t;l.push(...new Array(s).fill(void 0)),c.push(...new Array(s).fill(void 0)),u.push(...new Array(s).fill(0)),m.push(...new Array(s).fill(0))}t=e}},get max(){return t},get size(){return s},get available(){return t-s}}},y={stats:g({max:1e3}),rateLimit:g({max:1e3})},w=new Set(["https://awesomeyou.io","https://www.awesomeyou.io"]),O=10,N=6e4,v=6e4,T=e=>{const t=Date.now(),s=(e=>{const t=e.headers.get("CF-Connecting-IP")||e.headers.get("X-Forwarded-For")||"unknown";return String(t)})(e),o=y.rateLimit.get(s);if(o?.blocked&&t<o.resetAt)return{available:!1,remaining:0,resetAt:o.resetAt};if(!o||t-o.timestamp>=N)return y.rateLimit.set(s,{count:1,timestamp:t,blocked:!1}),{available:!0,remaining:O-1};const r=o.count+1;if(r>O){const e=t+v;return y.rateLimit.set(s,{count:r,timestamp:o.timestamp,blocked:!0,resetAt:e}),{available:!1,remaining:0,resetAt:e}}return y.rateLimit.set(s,{...o,count:r}),{available:!0,remaining:O-r}},b={packageName:/[^a-z0-9-_.@\/]/gi},A=e=>void 0===e||"string"==typeof e&&(!(e.length>64)&&!b.packageName.test(e)),E=e=>{if("string"!=typeof e)return;const t=e.trim().replace(b.packageName,"");return t||void 0};var S={async fetch(t,s){if("POST"!==t.method)return new Response("Método não permitido.",{status:405});const o=T(t),r=t.headers.get("Origin"),a="production"===s.ENVIRONMENT;if(!r||"string"!=typeof r)return new Response("Método não permitido.",{status:405});if(a&&!w.has(r))return new Response("Acesso negado.",{status:403});const i=Object.freeze({"Access-Control-Allow-Origin":a?r:"*","Access-Control-Allow-Methods":"POST","Access-Control-Allow-Headers":"Content-Type","Content-Type":"application/json; charset=utf-8","X-RateLimit-Limit":String(O),"X-RateLimit-Remaining":String(o.remaining)}),n=(e,t=200)=>new Response(JSON.stringify(e),{status:t,headers:i});try{if(!o.available)return n({message:"Limite de requisições excedido. Tente novamente mais tarde."},429);const s=await t.text(),{repositoryURL:r,...a}=JSON.parse(s);if("string"!=typeof r)return n({message:"Repositório inválido."},400);if(!A(a.npm))return n({message:"Pacote npm inválido."},400);if(!A(a.homebrew))return n({message:"Pacote Homebrew inválido."},400);if(!A(a.pypi))return n({message:"Pacote PyPi inválido."},400);if(!A(a.chocolatey))return n({message:"Pacote Chocolatey inválido."},400);if(!A(a.vscode))return n({message:"ID do Visual Code Studio Marketplace inválido."},400);const i=r.trim(),l=E(a.npm),c=E(a.homebrew),u=E(a.pypi),m=E(a.chocolatey),p=E(a.vscode);let d=i;"string"==typeof l&&(d+=`:${l}`),"string"==typeof c&&(d+=`:${c}`),"string"==typeof u&&(d+=`:${u}`),"string"==typeof m&&(d+=`:${m}`),"string"==typeof p&&(d+=`:${p}`);const{organization:g,repository:w}=e(i);return y.stats.has(d)?n(y.stats.get(d)):n(await h({description:"",repository:i,npm:l,homebrew:c,pypi:u,chocolatey:m,vscode:p},(({results:e})=>{const t=f({closedIssues:e?.closedIssues?.value,contributors:e?.contributors?.value,forks:e?.forks?.value,homebrew:e?.homebrew?.value,issues:e?.issues?.value,npm:e?.npm?.value,pypi:e?.pypi?.value,stars:e?.stars?.value,commits:e?.commits,chocolatey:e?.chocolatey?.value,repositoryDependents:e?.repositoryDependents?.value,vscode:e?.vscode?.value}),s={...e,score:t,username:g,repository:w};return y.stats.set(d,s),{...e,score:t,username:g,repository:w}})))}catch(e){return e instanceof Error&&400===e.cause?n({message:e.message},400):("production"!==s.ENVIRONMENT&&console.error(e),n({message:"Ops! Erro interno."},500))}}};export{S as default};
