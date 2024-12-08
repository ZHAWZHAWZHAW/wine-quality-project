import{m as ue,a as re,b as se,u as ce,c as q,d as ve,e as de,f as me,t as fe,V as he,g as ge,_ as K,h as W,i as ye}from"./VContainer-CEfwx4_g.js";import{m as we,u as be,a as pe,V as Z,b as N,c as _e}from"./scopeId-CcVzwFx7.js";import{s as C,c as b,a as ke,o as Q,w as H,b as ee,C as Se,u as Y,d as Ee,e as Ve,p as xe,m as Te,f as Me,g as Be,h as Ce,i as Pe,j as De,k as Ie,l as He,t as j,n as Re,q as Le,r as Ne,v as Ye,x as We,y as Oe,z as $e,A as r,B as U,T as Xe,F as ze,D as Ae,E as te,G as ae,H as V,V as Fe,I as qe,J as Ze,K as je}from"./index-C85XwDNN.js";function Ue(e){let{rootEl:c,isSticky:i,layoutItemStyles:S}=e;const t=C(!1),s=C(0),a=b(()=>{const p=typeof t.value=="boolean"?"top":t.value;return[i.value?{top:"auto",bottom:"auto",height:void 0}:void 0,t.value?{[p]:ke(s.value)}:{top:S.value.top}]});Q(()=>{H(i,p=>{p?window.addEventListener("scroll",E,{passive:!0}):window.removeEventListener("scroll",E)},{immediate:!0})}),ee(()=>{window.removeEventListener("scroll",E)});let y=0;function E(){const p=y>window.scrollY?"up":"down",d=c.value.getBoundingClientRect(),m=parseFloat(S.value.top??0),v=window.scrollY-Math.max(0,s.value-m),h=d.height+Math.max(s.value,m)-window.scrollY-window.innerHeight,w=parseFloat(getComputedStyle(c.value).getPropertyValue("--v-body-scroll-y"))||0;d.height<window.innerHeight-m?(t.value="top",s.value=m):p==="up"&&t.value==="bottom"||p==="down"&&t.value==="top"?(s.value=window.scrollY+d.top-w,t.value=!0):p==="down"&&h<=0?(s.value=0,t.value="bottom"):p==="up"&&v<=0&&(w?t.value!=="top"&&(s.value=-v+w+m,t.value="top"):(s.value=d.top+v,t.value="top")),y=window.scrollY}return{isStuck:t,stickyStyles:a}}const Ge=100,Je=20;function G(e){return(e<0?-1:1)*Math.sqrt(Math.abs(e))*1.41421356237}function J(e){if(e.length<2)return 0;if(e.length===2)return e[1].t===e[0].t?0:(e[1].d-e[0].d)/(e[1].t-e[0].t);let c=0;for(let i=e.length-1;i>0;i--){if(e[i].t===e[i-1].t)continue;const S=G(c),t=(e[i].d-e[i-1].d)/(e[i].t-e[i-1].t);c+=(t-S)*Math.abs(t),i===e.length-1&&(c*=.5)}return G(c)*1e3}function Ke(){const e={};function c(t){Array.from(t.changedTouches).forEach(s=>{(e[s.identifier]??(e[s.identifier]=new Se(Je))).push([t.timeStamp,s])})}function i(t){Array.from(t.changedTouches).forEach(s=>{delete e[s.identifier]})}function S(t){var p;const s=(p=e[t])==null?void 0:p.values().reverse();if(!s)throw new Error(`No samples for touch id ${t}`);const a=s[0],y=[],E=[];for(const d of s){if(a[0]-d[0]>Ge)break;y.push({t:d[0],d:d[1].clientX}),E.push({t:d[0],d:d[1].clientY})}return{x:J(y),y:J(E),get direction(){const{x:d,y:m}=this,[v,h]=[Math.abs(d),Math.abs(m)];return v>h&&d>=0?"right":v>h&&d<=0?"left":h>v&&m>=0?"down":h>v&&m<=0?"up":Qe()}}}return{addMovement:c,endTouch:i,getVelocity:S}}function Qe(){throw new Error}function et(e){let{el:c,isActive:i,isTemporary:S,width:t,touchless:s,position:a}=e;Q(()=>{window.addEventListener("touchstart",T,{passive:!0}),window.addEventListener("touchmove",x,{passive:!1}),window.addEventListener("touchend",R,{passive:!0})}),ee(()=>{window.removeEventListener("touchstart",T),window.removeEventListener("touchmove",x),window.removeEventListener("touchend",R)});const y=b(()=>["left","right"].includes(a.value)),{addMovement:E,endTouch:p,getVelocity:d}=Ke();let m=!1;const v=C(!1),h=C(0),w=C(0);let k;function P(n,o){return(a.value==="left"?n:a.value==="right"?document.documentElement.clientWidth-n:a.value==="top"?n:a.value==="bottom"?document.documentElement.clientHeight-n:B())-(o?t.value:0)}function D(n){let o=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;const l=a.value==="left"?(n-w.value)/t.value:a.value==="right"?(document.documentElement.clientWidth-n-w.value)/t.value:a.value==="top"?(n-w.value)/t.value:a.value==="bottom"?(document.documentElement.clientHeight-n-w.value)/t.value:B();return o?Math.max(0,Math.min(1,l)):l}function T(n){if(s.value)return;const o=n.changedTouches[0].clientX,l=n.changedTouches[0].clientY,u=25,g=a.value==="left"?o<u:a.value==="right"?o>document.documentElement.clientWidth-u:a.value==="top"?l<u:a.value==="bottom"?l>document.documentElement.clientHeight-u:B(),f=i.value&&(a.value==="left"?o<t.value:a.value==="right"?o>document.documentElement.clientWidth-t.value:a.value==="top"?l<t.value:a.value==="bottom"?l>document.documentElement.clientHeight-t.value:B());(g||f||i.value&&S.value)&&(k=[o,l],w.value=P(y.value?o:l,i.value),h.value=D(y.value?o:l),m=w.value>-20&&w.value<80,p(n),E(n))}function x(n){const o=n.changedTouches[0].clientX,l=n.changedTouches[0].clientY;if(m){if(!n.cancelable){m=!1;return}const g=Math.abs(o-k[0]),f=Math.abs(l-k[1]);(y.value?g>f&&g>3:f>g&&f>3)?(v.value=!0,m=!1):(y.value?f:g)>3&&(m=!1)}if(!v.value)return;n.preventDefault(),E(n);const u=D(y.value?o:l,!1);h.value=Math.max(0,Math.min(1,u)),u>1?w.value=P(y.value?o:l,!0):u<0&&(w.value=P(y.value?o:l,!1))}function R(n){if(m=!1,!v.value)return;E(n),v.value=!1;const o=d(n.changedTouches[0].identifier),l=Math.abs(o.x),u=Math.abs(o.y);(y.value?l>u&&l>400:u>l&&u>3)?i.value=o.direction===({left:"right",right:"left",top:"down",bottom:"up"}[a.value]||B()):i.value=h.value>.5}const I=b(()=>v.value?{transform:a.value==="left"?`translateX(calc(-100% + ${h.value*t.value}px))`:a.value==="right"?`translateX(calc(100% - ${h.value*t.value}px))`:a.value==="top"?`translateY(calc(-100% + ${h.value*t.value}px))`:a.value==="bottom"?`translateY(calc(100% - ${h.value*t.value}px))`:B(),transition:"none"}:void 0);return Y(v,()=>{var l,u;const n=((l=c.value)==null?void 0:l.style.transform)??null,o=((u=c.value)==null?void 0:u.style.transition)??null;Ee(()=>{var g,f,M,L;(f=c.value)==null||f.style.setProperty("transform",((g=I.value)==null?void 0:g.transform)||"none"),(L=c.value)==null||L.style.setProperty("transition",((M=I.value)==null?void 0:M.transition)||null)}),Ve(()=>{var g,f;(g=c.value)==null||g.style.setProperty("transform",n),(f=c.value)==null||f.style.setProperty("transition",o)})}),{isDragging:v,dragProgress:h,dragStyles:I}}function B(){throw new Error}const tt=["start","end","left","right","top","bottom"],at=xe({color:String,disableResizeWatcher:Boolean,disableRouteWatcher:Boolean,expandOnHover:Boolean,floating:Boolean,modelValue:{type:Boolean,default:null},permanent:Boolean,rail:{type:Boolean,default:null},railWidth:{type:[Number,String],default:56},scrim:{type:[Boolean,String],default:!0},image:String,temporary:Boolean,persistent:Boolean,touchless:Boolean,width:{type:[Number,String],default:256},location:{type:String,default:"start",validator:e=>tt.includes(e)},sticky:Boolean,...ue(),...Te(),...we(),...Me({mobile:null}),...re(),...Be(),...se(),...Ce({tag:"nav"}),...Pe()},"VNavigationDrawer"),nt=De()({name:"VNavigationDrawer",props:at(),emits:{"update:modelValue":e=>!0,"update:rail":e=>!0},setup(e,c){let{attrs:i,emit:S,slots:t}=c;const{isRtl:s}=Ie(),{themeClasses:a}=He(e),{borderClasses:y}=ce(e),{backgroundColorClasses:E,backgroundColorStyles:p}=q(j(e,"color")),{elevationClasses:d}=ve(e),{displayClasses:m,mobile:v}=Re(e),{roundedClasses:h}=de(e),w=me(),k=Le(e,"modelValue",null,_=>!!_),{ssrBootStyles:P}=Ne(),{scopeId:D}=be(),T=Ye(),x=C(!1),{runOpenDelay:R,runCloseDelay:I}=pe(e,_=>{x.value=_}),n=b(()=>e.rail&&e.expandOnHover&&x.value?Number(e.width):Number(e.rail?e.railWidth:e.width)),o=b(()=>fe(e.location,s.value)),l=b(()=>e.persistent),u=b(()=>!e.permanent&&(v.value||e.temporary)),g=b(()=>e.sticky&&!u.value&&o.value!=="bottom");Y(()=>e.expandOnHover&&e.rail!=null,()=>{H(x,_=>S("update:rail",!_))}),Y(()=>!e.disableResizeWatcher,()=>{H(u,_=>!e.permanent&&Ae(()=>k.value=!_))}),Y(()=>!e.disableRouteWatcher&&!!w,()=>{H(w.currentRoute,()=>u.value&&(k.value=!1))}),H(()=>e.permanent,_=>{_&&(k.value=!0)}),e.modelValue==null&&!u.value&&(k.value=e.permanent||!v.value);const{isDragging:f,dragProgress:M}=et({el:T,isActive:k,isTemporary:u,width:n,touchless:j(e,"touchless"),position:o}),L=b(()=>{const _=u.value?0:e.rail&&e.expandOnHover?Number(e.railWidth):n.value;return f.value?_*M.value:_}),ne=b(()=>["top","bottom"].includes(e.location)?0:n.value),{layoutItemStyles:O,layoutItemScrimStyles:oe}=We({id:e.name,order:b(()=>parseInt(e.order,10)),position:o,layoutSize:L,elementSize:ne,active:b(()=>k.value||f.value),disableTransitions:b(()=>f.value),absolute:b(()=>e.absolute||g.value&&typeof $.value!="string")}),{isStuck:$,stickyStyles:le}=Ue({rootEl:T,isSticky:g,layoutItemStyles:O}),X=q(b(()=>typeof e.scrim=="string"?e.scrim:null)),ie=b(()=>({...f.value?{opacity:M.value*.2,transition:"none"}:void 0,...oe.value}));return Oe({VList:{bgColor:"transparent"}}),$e(()=>{const _=t.image||e.image;return r(ze,null,[r(e.tag,U({ref:T,onMouseenter:R,onMouseleave:I,class:["v-navigation-drawer",`v-navigation-drawer--${o.value}`,{"v-navigation-drawer--expand-on-hover":e.expandOnHover,"v-navigation-drawer--floating":e.floating,"v-navigation-drawer--is-hovering":x.value,"v-navigation-drawer--rail":e.rail,"v-navigation-drawer--temporary":u.value,"v-navigation-drawer--persistent":l.value,"v-navigation-drawer--active":k.value,"v-navigation-drawer--sticky":g.value},a.value,E.value,y.value,m.value,d.value,h.value,e.class],style:[p.value,O.value,P.value,le.value,e.style,["top","bottom"].includes(o.value)?{height:"auto"}:{}]},D,i),{default:()=>{var z,A,F;return[_&&r("div",{key:"image",class:"v-navigation-drawer__img"},[t.image?r(ge,{key:"image-defaults",disabled:!e.image,defaults:{VImg:{alt:"",cover:!0,height:"inherit",src:e.image}}},t.image):r(he,{key:"image-img",alt:"",cover:!0,height:"inherit",src:e.image},null)]),t.prepend&&r("div",{class:"v-navigation-drawer__prepend"},[(z=t.prepend)==null?void 0:z.call(t)]),r("div",{class:"v-navigation-drawer__content"},[(A=t.default)==null?void 0:A.call(t)]),t.append&&r("div",{class:"v-navigation-drawer__append"},[(F=t.append)==null?void 0:F.call(t)])]}}),r(Xe,{name:"fade-transition"},{default:()=>[u.value&&(f.value||k.value)&&!!e.scrim&&r("div",U({class:["v-navigation-drawer__scrim",X.backgroundColorClasses.value],style:[ie.value,X.backgroundColorStyles.value],onClick:()=>{l.value||(k.value=!1)}},D),null)]})])}),{isStuck:$}}}),ot={};function lt(e,c){return te(),ae(nt,null,{default:V(()=>[r(Z,null,{default:V(()=>[r(N)]),_:1}),r(_e),r(Z,{density:"compact",nav:""},{default:V(()=>[r(N,{title:"Instructions",value:"Home",to:"/","active-color":"secondary"},{prepend:V(()=>[r(W,{icon:"mdi-menu",color:"secondary"})]),_:1}),r(N,{title:"Plots",value:"plots",to:"/plots","active-color":"secondary"},{prepend:V(()=>[r(W,{icon:"mdi-image",color:"warning"})]),_:1}),r(N,{title:"App",value:"run",to:"/run","active-color":"secondary"},{prepend:V(()=>[r(W,{icon:"mdi-play",color:"primary"})]),_:1})]),_:1})]),_:1})}const it=K(ot,[["render",lt]]),ut={},rt={class:"w-100 ma-10"};function st(e,c){const i=it,S=qe("router-view");return te(),ae(Fe,null,{default:V(()=>[r(ye,{fluid:""},{default:V(()=>[r(i),r(Ze,{class:"d-flex justify-center align-center"},{default:V(()=>[je("div",rt,[r(S)])]),_:1})]),_:1})]),_:1})}const mt=K(ut,[["render",st]]);export{mt as default};
