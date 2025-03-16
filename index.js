const e=e=>{const t=e.match(/^https?:\/\/github\.com\/([^\/]+)\/([^\/]+)(?:\/|$)/);if(!t||!t[1]||!t[2])throw new Error("Invalid GitHub repository URL format.");const s={organization:t[1],repository:t[2]};if(s.organization.length>39)throw new Error("Organization name exceeds GitHub's limit of 39 characters.");if(s.repository.length>100)throw new Error("Repository name exceeds GitHub's limit of 100 characters.");return s},t=e=>{if(e<1e3)return e.toLocaleString("pt-BR");let t=Math.floor(Math.log10(e)/3);if(0===t)return e.toLocaleString("pt-BR");return`${(e/Math.pow(10,3*t)).toFixed(1).replace(".0","")}${[" mil","M","B"][t-1]}`},s=e=>{const s=Number(e.replace(/[^0-9.]/g,""))*(/k/i.test(e.replace(/mês/,""))?1e3:/m/i.test(e.replace(/mês/,""))?1e6:1);return{value:s,label:t(s)}},a=async(e,t)=>{const a=await(await fetch(`https://img.shields.io/github/issues-closed/${e}/${t}.json`)).json();return s(a.value.replace(/closed/,""))},o={today:"Hoje",yesterday:"Ontem","this week":"Esta semana","this month":"Este mês","this year":"Este ano","last week":"Semana passada","last month":"Mês passado","last year":"Ano passado","two weeks ago":"Duas semanas atrás","three weeks ago":"Três semanas atrás","four weeks ago":"Quatro semanas atrás","five weeks ago":"Cinco semanas atrás","six weeks ago":"Seis semanas atrás","seven weeks ago":"Sete semanas atrás","eight weeks ago":"Oito semanas atrás","nine weeks ago":"Nove semanas atrás","ten weeks ago":"Dez semanas atrás","last sunday":"Último domingo","last monday":"Última segunda-feira","last tuesday":"Última terça-feira","last wednesday":"Última quarta-feira","last thursday":"Última quinta-feira","last friday":"Última sexta-feira","last saturday":"Último sábado",january:"Janeiro",february:"Fevereiro",march:"Março",april:"Abril",may:"Maio",june:"Junho",july:"Julho",august:"Agosto",september:"Setembro",october:"Outubro",november:"Novembro",december:"Dezembro"},r=async(e,t)=>{const s=(await(await fetch(`https://img.shields.io/github/last-commit/${e}/${t}.json`)).json()).value,a=new RegExp(Object.keys(o).join("|"),"gi");return s.replace(a,(e=>o[e.toLowerCase()]||e))},n=async(e,t)=>{const a=await(await fetch(`https://img.shields.io/github/contributors/${e}/${t}.json`)).json();return s(a.value)},i=async(e,t)=>{const a=await(await fetch(`https://img.shields.io/github/forks/${e}/${t}.json`)).json();return s(a.value)},l=async(e,t)=>{const a=await(await fetch(`https://img.shields.io/github/issues/${e}/${t}.json`)).json();return s(a.value.replace(/open/,""))},u=async(e,t)=>{const s=await(await fetch(`https://img.shields.io/github/license/${e}/${t}.json`)).json();return s.value.includes("identifiable")?"Other":s.value},c=async(e,s)=>{try{const a=await fetch(`https://github.com/${e}/${s}/network/dependents`),o=(await a.text()).match(/([\d,]+)\s{1,}Repositories/);if(o&&o[1]){const e=Number(o[1].replace(/,/g,""));return{value:e,label:t(e)}}return{value:0,label:"0"}}catch{return{value:0,label:"0"}}},h=async(e,t)=>{const a=await(await fetch(`https://img.shields.io/github/stars/${e}/${t}.json`)).json();return s(a.value)},m=async e=>{const a=await(await fetch(`https://img.shields.io/visual-studio-marketplace/i/${e}.json`)).json();if(a.value.includes("rate limited by upstream service")){const s=await(async()=>{try{const t=await fetch(`https://marketplace.visualstudio.com/items?itemName=${e}`),s=(await t.text()).match(/([\d,]+) installs/);if(s&&s[1]){const e=s[1].replace(/,/g,"");return Number(e)}return 0}catch{return 0}})();return{value:s,label:t(s)}}return s(a.value.replace(/month/,"mês"))},p=async(t,o)=>{const{repository:p,npm:f,pypi:y,homebrew:d,vscode:w,chocolatey:O}=t,{organization:N,repository:T}=e(p),g=Object.create(null),A=await Promise.all([u(N,T),h(N,T),i(N,T),l(N,T),a(N,T),r(N,T),n(N,T),c(N,T)]);return g.license=A[0],g.stars=A[1],g.forks=A[2],g.issues=A[3],g.closedIssues=A[4],g.commits=A[5],g.contributors=A[6],g.repositoryDependents=A[7],f&&(g.npm=await(async e=>{const t=await(await fetch(`https://img.shields.io/npm/dm/${e}.json`)).json();return s(t.value.replace(/month/,"mês"))})(f)),d&&(g.homebrew=await(async e=>{const t=await(await fetch(`https://img.shields.io/homebrew/installs/dm/${e}.json`)).json();return s(t.value.replace(/month/,"mês"))})(d)),y&&(g.pypi=await(async e=>{const t=await(await fetch(`https://img.shields.io/pypi/dm/${e}.json`)).json();return s(t.value.replace(/month/,"mês"))})(y)),w&&(g.vscode=await m(w)),O&&(g.chocolatey=await(async e=>{const t=await(await fetch(`https://img.shields.io/chocolatey/dt/${e}.json`)).json();return s(t.value.replace(/month/,"mês"))})(O)),await o({organization:N,repository:T,results:g})},f=Object.freeze({STAR_POINTS:1,FORK_POINTS:2,DIRECT_REPOSITORY_DEPENDENTS_POINTS:4,DIRECT_REPOSITORY_DEPENDENTS_INTERVAL:10,TOTAL_DOWNLOADS_POINTS:2,TOTAL_DOWNLOADS_INTERVAL:2e3,MONTHLY_DOWNLOADS_POINTS:3,MONTHLY_DOWNLOADS_INTERVAL:1e3,CONTRIBUTOR_POINTS:5,CLOSED_ISSUE_POINTS:2,ISSUE_PENALTY:1,MIN_INACTIVE_YEARS_FOR_PENALTY:2,INACTIVE_ISSUE_PENALTY:2500,INACTIVE_YEAR_BASE_PENALTY:250}),y=e=>{const{contributors:t,forks:s,homebrew:a,npm:o,pypi:r,vscode:n,chocolatey:i,stars:l,commits:u,closedIssues:c,issues:h,repositoryDependents:m}=e;let p=0;if("number"==typeof l&&(p+=l*f.STAR_POINTS),"number"==typeof s&&(p+=s*f.FORK_POINTS),"number"==typeof t&&(p+=t*f.CONTRIBUTOR_POINTS),"number"==typeof n&&(p+=Math.floor(n/f.TOTAL_DOWNLOADS_INTERVAL)*f.TOTAL_DOWNLOADS_POINTS),"number"==typeof i&&(p+=Math.floor(i/f.TOTAL_DOWNLOADS_INTERVAL)*f.TOTAL_DOWNLOADS_POINTS),"number"==typeof o&&(p+=Math.floor(o/f.MONTHLY_DOWNLOADS_INTERVAL)*f.MONTHLY_DOWNLOADS_POINTS),"number"==typeof a&&(p+=Math.floor(a/f.MONTHLY_DOWNLOADS_INTERVAL)*f.MONTHLY_DOWNLOADS_POINTS),"number"==typeof r&&(p+=Math.floor(r/f.MONTHLY_DOWNLOADS_INTERVAL)*f.MONTHLY_DOWNLOADS_POINTS),"number"==typeof c){const e=c*f.CLOSED_ISSUE_POINTS,t=Math.floor(.5*p);p+=Math.min(e,t)}if("number"==typeof m){const e=Math.floor(m/f.DIRECT_REPOSITORY_DEPENDENTS_INTERVAL)*f.DIRECT_REPOSITORY_DEPENDENTS_POINTS,t=Math.floor(.5*p);p+=Math.min(e,t)}if("string"==typeof u){const e=(e=>{const t=(new Date).getUTCFullYear(),s=e.match(/\b\d{4}\b/);if(!s)return 0;const a=t-parseInt(s[0],10);return a<f.MIN_INACTIVE_YEARS_FOR_PENALTY?0:a**2*f.INACTIVE_YEAR_BASE_PENALTY})(u);"number"==typeof h&&(p-=e>0?h*f.INACTIVE_ISSUE_PENALTY:h),p-=e}return p},d=new Set(["https://awesomeyou.io","https://www.awesomeyou.io"]),w={stats:(e=>{let{max:t}=e;if(!(Number.isInteger(t)&&t>0))throw new TypeError("`max` must be a positive integer");let s=0,a=0,o=0,r=[];const{onEviction:n}=e,i=new Map,l=new Array(t).fill(void 0),u=new Array(t).fill(void 0),c=new Array(t).fill(0),h=new Array(t).fill(0),m=(e,t)=>{if(e===o)return;const s=c[e],r=h[e];e===a?a=s:"get"!==t&&0===r||(c[r]=s),0!==s&&(h[s]=r),c[o]=e,h[e]=o,c[e]=0,o=e},p=()=>{const e=a,t=l[e];return null==n||n(t,u[e]),i.delete(t),l[e]=void 0,u[e]=void 0,a=c[e],0!==a&&(h[a]=0),s--,0===s&&(a=o=0),r.push(e),e};return{set(e,c){if(void 0===e)return;let h=i.get(e);void 0===h?(h=s===t?p():r.length>0?r.pop():s,i.set(e,h),l[h]=e,s++):null==n||n(e,u[h]),u[h]=c,1===s?a=o=h:m(h,"set")},get(e){const t=i.get(e);if(void 0!==t)return t!==o&&m(t,"get"),u[t]},peek:e=>{const t=i.get(e);return void 0!==t?u[t]:void 0},has:e=>i.has(e),*keys(){let e=o;for(let t=0;t<s;t++)yield l[e],e=h[e]},*values(){let e=o;for(let t=0;t<s;t++)yield u[e],e=h[e]},*entries(){let e=o;for(let t=0;t<s;t++)yield[l[e],u[e]],e=h[e]},forEach:e=>{let t=o;for(let a=0;a<s;a++){const s=l[t];e(u[t],s),t=h[t]}},delete(e){const t=i.get(e);if(void 0===t)return!1;null==n||n(e,u[t]),i.delete(e),r.push(t),l[t]=void 0,u[t]=void 0;const m=h[t],p=c[t];return 0!==m&&(c[m]=p),0!==p&&(h[p]=m),t===a&&(a=p),t===o&&(o=m),s--,!0},evict:e=>{let t=Math.min(e,s);for(;t>0;)p(),t--},clear(){if("function"==typeof n){const e=i.values();for(let t=e.next();!t.done;t=e.next())n(l[t.value],u[t.value])}i.clear(),l.fill(void 0),u.fill(void 0),r=[],s=0,a=o=0},resize:e=>{if(!(Number.isInteger(e)&&e>0))throw new TypeError("`max` must be a positive integer");if(e!==t){if(e<t){let t=o;const m=Math.min(s,e),p=s-m,f=new Array(e),y=new Array(e),d=new Array(e),w=new Array(e);for(let e=1;e<=p;e++)null==n||n(l[e],u[e]);for(let e=m-1;e>=0;e--)f[e]=l[t],y[e]=u[t],d[e]=e+1,w[e]=e-1,i.set(f[e],e),t=h[t];a=0,o=m-1,s=m,l.length=e,u.length=e,c.length=e,h.length=e;for(let e=0;e<m;e++)l[e]=f[e],u[e]=y[e],c[e]=d[e],h[e]=w[e];r=[];for(let t=m;t<e;t++)r.push(t)}else{const s=e-t;l.push(...new Array(s).fill(void 0)),u.push(...new Array(s).fill(void 0)),c.push(...new Array(s).fill(0)),h.push(...new Array(s).fill(0))}t=e}},get max(){return t},get size(){return s},get available(){return t-s}}})({max:1e3})};var O={async fetch(t,s){if("POST"!==t.method)return new Response("Method Not Allowed.",{status:405});const a=t.headers.get("Origin"),o="production"===s.ENVIRONMENT;if(!a||"string"!=typeof a)return new Response("Method Not Allowed.",{status:405});if(o&&!d.has(a))return new Response("Access Denied.",{status:403});const r=Object.freeze({"Access-Control-Allow-Origin":o?a:"*","Access-Control-Allow-Methods":"POST","Access-Control-Allow-Headers":"Content-Type"}),n=e=>new Response(JSON.stringify(e),{status:200,headers:r});try{const s=await t.text(),{repositoryURL:a}=JSON.parse(s);if("string"!=typeof a)return new Response("Invalid repository URL.",{status:400});const{organization:o,repository:r}=e(a);return w.stats.has(a)?n(w.stats.get(a)):n(await p({repository:a.trim(),description:"",madeInBrazil:!0},(({results:e})=>{const t=y({closedIssues:e?.closedIssues?.value,contributors:e?.contributors?.value,forks:e?.forks?.value,homebrew:e?.homebrew?.value,issues:e?.issues?.value,npm:e?.npm?.value,pypi:e?.pypi?.value,stars:e?.stars?.value,commits:e?.commits,chocolatey:e?.chocolatey?.value,repositoryDependents:e?.repositoryDependents?.value,vscode:e?.vscode?.value}),s={...e,score:t,username:o,repository:r};return w.stats.set(a,s),{...e,score:t,username:o,repository:r}})))}catch{return new Response("Internal Error.",{status:500,headers:r})}}};export{O as default};
