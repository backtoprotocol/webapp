import"./rolldown-runtime-CNC7AqOf.js";import{n as e,t}from"./react-B9erjAfV.js";import{t as n}from"./compiler-runtime-B4KMrlb8.js";import{Ct as r,F as i,H as a,Mt as o,Nt as s,R as c,gt as l}from"./dist-BPo_N1eq.js";import{$o as u,Bo as d,Go as f,Ko as p,Ss as m,Vl as h,Xo as g,Yo as _,Zo as v,co as y,pn as b,qo as x,so as S,zo as C}from"./index2-ydWXPoXi.js";var w=e(),T=n();t(),h(),v(),g(),f(),_(),x(),p(),m(),u(),d(),C();var E=1,D=3,O=s(c).withConfig({displayName:`RootFlex`,componentId:`sc-1y8zfkj-0`})(({theme:e})=>o`
    min-height: 100%;

    @media (max-width: ${e.sanity.media[D]}px) {
      position: relative;
    }
  `),k=s(a).withConfig({displayName:`SidebarMotionLayer`,componentId:`sc-1y8zfkj-1`})(({theme:e})=>{let t=e.sanity.media;return o`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 360px;
    border-left: 1px solid var(--card-border-color);
    box-sizing: border-box;
    overflow: hidden;

    box-shadow:
      0px 6px 8px -4px var(--card-shadow-umbra-color),
      0px 12px 17px -1px var(--card-shadow-penumbra-color);

    @media (max-width: ${t[D]}px) {
      bottom: 0;
      position: absolute;
      right: 0;
      top: 0;
    }

    @media (max-width: ${t[E]}px) {
      border-left: 0;
      min-width: 100%;
      left: 0;
    }
  `});function A(e){let t=(0,T.c)(12),n=l(),{state:a}=y(),{isOpen:o}=a,s=n<=E&&o?`hidden`:`auto`,c;t[0]===e?c=t[1]:(c=e.renderDefault(e),t[0]=e,t[1]=c);let u;t[2]!==s||t[3]!==c?(u=(0,w.jsx)(i,{flex:1,height:`fill`,overflow:s,children:c}),t[2]=s,t[3]=c,t[4]=u):u=t[4];let d;t[5]===o?d=t[6]:(d=o&&(0,w.jsx)(k,{zOffset:100,height:`fill`,children:(0,w.jsx)(b,{})}),t[5]=o,t[6]=d);let f;t[7]===d?f=t[8]:(f=(0,w.jsx)(r,{initial:!1,children:d}),t[7]=d,t[8]=f);let p;return t[9]!==u||t[10]!==f?(p=(0,w.jsxs)(O,{sizing:`border`,height:`fill`,children:[u,f]}),t[9]=u,t[10]=f,t[11]=p):p=t[11],p}function j(e){let t=(0,T.c)(4),{enabled:n}=S();if(!n){let n;return t[0]===e?n=t[1]:(n=e.renderDefault(e),t[0]=e,t[1]=n),n}let r;return t[2]===e?r=t[3]:(r=(0,w.jsx)(A,{...e}),t[2]=e,t[3]=r),r}export{j as TasksStudioActiveToolLayout};