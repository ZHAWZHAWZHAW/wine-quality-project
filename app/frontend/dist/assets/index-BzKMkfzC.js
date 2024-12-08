import{b as we,j as Ve,k as Se,e as Ce,l as Pe,g as Ie,_ as q,i as ie,V as X}from"./VContainer-CEfwx4_g.js";import{m as xe,a as Fe,u as Le,V as Te,b as I,c as g,d as ee,e as Be,f as ze,g as Ae,h as De,i as Ne}from"./VExpansionPanels-Bn_x9r2j.js";import{m as Re,a as Ee,u as $e,V as te,f as Me,b as je,c as Ue,d as Ke,e as ue,g as Ge,h as ae,i as ne,j as le}from"./VCard-BO6ejYnV.js";import{p as re,L as ce,j as de,M as Oe,q as fe,c as b,N as oe,v as h,w as Y,z as me,O as Ye,A as t,B as R,F as U,D as ve,P as We,i as qe,Q as He,l as Ze,s as W,R as Je,S as Qe,u as Xe,U as et,d as tt,o as at,W as nt,e as lt,E,G as H,H as n,X as V,Y as pe,Z as se,K as f,_ as ot}from"./index-C85XwDNN.js";import{u as st,V as it,b as ut,d as rt}from"./scopeId-CcVzwFx7.js";const ct=re({chips:Boolean,counter:Boolean,counterSizeString:{type:String,default:"$vuetify.fileInput.counterSize"},counterString:{type:String,default:"$vuetify.fileInput.counter"},hideInput:Boolean,multiple:Boolean,showSize:{type:[Boolean,Number,String],default:!1,validator:e=>typeof e=="boolean"||[1e3,1024].includes(Number(e))},...Re({prependIcon:"$file"}),modelValue:{type:[Array,Object],default:e=>e.multiple?[]:null,validator:e=>ce(e).every(a=>a!=null&&typeof a=="object")},...Ee({clearable:!0})},"VFileInput"),dt=de()({name:"VFileInput",inheritAttrs:!1,props:ct(),emits:{"click:control":e=>!0,"mousedown:control":e=>!0,"update:focused":e=>!0,"update:modelValue":e=>!0},setup(e,a){let{attrs:o,emit:u,slots:r}=a;const{t:s}=Oe(),i=fe(e,"modelValue",e.modelValue,l=>ce(l),l=>!e.multiple&&Array.isArray(l)?l[0]:l),{isFocused:m,focus:p,blur:x}=$e(e),S=b(()=>typeof e.showSize!="boolean"?e.showSize:void 0),y=b(()=>(i.value??[]).reduce((l,d)=>{let{size:c=0}=d;return l+c},0)),F=b(()=>oe(y.value,S.value)),C=b(()=>(i.value??[]).map(l=>{const{name:d="",size:c=0}=l;return e.showSize?`${d} (${oe(c,S.value)})`:d})),P=b(()=>{var d;const l=((d=i.value)==null?void 0:d.length)??0;return e.showSize?s(e.counterSizeString,l,F.value):s(e.counterString,l)}),L=h(),T=h(),v=h(),B=b(()=>m.value||e.active),_=b(()=>["plain","underlined"].includes(e.variant));function z(){var l;v.value!==document.activeElement&&((l=v.value)==null||l.focus()),m.value||p()}function K(l){var d;(d=v.value)==null||d.click()}function $(l){u("mousedown:control",l)}function G(l){var d;(d=v.value)==null||d.click(),u("click:control",l)}function O(l){l.stopPropagation(),z(),ve(()=>{i.value=[],We(e["onClick:clear"],l)})}return Y(i,l=>{(!Array.isArray(l)||!l.length)&&v.value&&(v.value.value="")}),me(()=>{const l=!!(r.counter||e.counter),d=!!(l||r.details),[c,w]=Ye(o),{modelValue:A,...M}=te.filterProps(e),ge=Me(e);return t(te,R({ref:L,modelValue:i.value,"onUpdate:modelValue":D=>i.value=D,class:["v-file-input",{"v-file-input--chips":!!e.chips,"v-file-input--hide":e.hideInput,"v-input--plain-underlined":_.value},e.class],style:e.style,"onClick:prepend":K},c,M,{centerAffix:!_.value,focused:m.value}),{...r,default:D=>{let{id:j,isDisabled:N,isDirty:Z,isReadonly:J,isValid:ke}=D;return t(je,R({ref:T,"prepend-icon":e.prependIcon,onMousedown:$,onClick:G,"onClick:clear":O,"onClick:prependInner":e["onClick:prependInner"],"onClick:appendInner":e["onClick:appendInner"]},ge,{id:j.value,active:B.value||Z.value,dirty:Z.value||e.dirty,disabled:N.value,focused:m.value,error:ke.value===!1}),{...r,default:be=>{var Q;let{props:{class:he,...ye}}=be;return t(U,null,[t("input",R({ref:v,type:"file",readonly:J.value,disabled:N.value,multiple:e.multiple,name:e.name,onClick:k=>{k.stopPropagation(),J.value&&k.preventDefault(),z()},onChange:k=>{if(!k.target)return;const _e=k.target;i.value=[..._e.files??[]]},onFocus:z,onBlur:x},ye,w),null),t("div",{class:he},[!!((Q=i.value)!=null&&Q.length)&&!e.hideInput&&(r.selection?r.selection({fileNames:C.value,totalBytes:y.value,totalBytesReadable:F.value}):e.chips?C.value.map(k=>t(Ue,{key:k,size:"small",text:k},null)):C.value.join(", "))])])}})},details:d?D=>{var j,N;return t(U,null,[(j=r.details)==null?void 0:j.call(r,D),l&&t(U,null,[t("span",null,null),t(Ke,{active:!!((N=i.value)!=null&&N.length),value:P.value,disabled:e.disabled},r.counter)])])}:void 0})}),ue({},L,T,v)}});function ft(e){const a=W(e());let o=-1;function u(){clearInterval(o)}function r(){u(),ve(()=>a.value=e())}function s(i){const m=i?getComputedStyle(i):{transitionDuration:.2},p=parseFloat(m.transitionDuration)*1e3||200;if(u(),a.value<=0)return;const x=performance.now();o=window.setInterval(()=>{const S=performance.now()-x+p;a.value=Math.max(e()-S,0),a.value<=0&&u()},p)}return lt(u),{clear:u,time:a,start:s,reset:r}}const mt=re({multiLine:Boolean,text:String,timer:[Boolean,String],timeout:{type:[Number,String],default:5e3},vertical:Boolean,...xe({location:"bottom"}),...Fe(),...we(),...Ve(),...qe(),...He(Ge({transition:"v-snackbar-transition"}),["persistent","noClickAnimation","scrim","scrollStrategy"])},"VSnackbar"),vt=de()({name:"VSnackbar",props:mt(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:o}=a;const u=fe(e,"modelValue"),{positionClasses:r}=Le(e),{scopeId:s}=st(),{themeClasses:i}=Ze(e),{colorClasses:m,colorStyles:p,variantClasses:x}=Se(e),{roundedClasses:S}=Ce(e),y=ft(()=>Number(e.timeout)),F=h(),C=h(),P=W(!1),L=W(0),T=h(),v=Je(Qe,void 0);Xe(()=>!!v,()=>{const c=et();tt(()=>{T.value=c.mainStyles.value})}),Y(u,_),Y(()=>e.timeout,_),at(()=>{u.value&&_()});let B=-1;function _(){y.reset(),window.clearTimeout(B);const c=Number(e.timeout);if(!u.value||c===-1)return;const w=nt(C.value);y.start(w),B=window.setTimeout(()=>{u.value=!1},c)}function z(){y.reset(),window.clearTimeout(B)}function K(){P.value=!0,z()}function $(){P.value=!1,_()}function G(c){L.value=c.touches[0].clientY}function O(c){Math.abs(L.value-c.changedTouches[0].clientY)>50&&(u.value=!1)}function l(){P.value&&$()}const d=b(()=>e.location.split(" ").reduce((c,w)=>(c[`v-snackbar--${w}`]=!0,c),{}));return me(()=>{const c=ae.filterProps(e),w=!!(o.default||o.text||e.text);return t(ae,R({ref:F,class:["v-snackbar",{"v-snackbar--active":u.value,"v-snackbar--multi-line":e.multiLine&&!e.vertical,"v-snackbar--timer":!!e.timer,"v-snackbar--vertical":e.vertical},d.value,r.value,e.class],style:[T.value,e.style]},c,{modelValue:u.value,"onUpdate:modelValue":A=>u.value=A,contentProps:R({class:["v-snackbar__wrapper",i.value,m.value,S.value,x.value],style:[p.value],onPointerenter:K,onPointerleave:$},c.contentProps),persistent:!0,noClickAnimation:!0,scrim:!1,scrollStrategy:"none",_disableGlobalStack:!0,onTouchstartPassive:G,onTouchend:O,onAfterLeave:l},s),{default:()=>{var A,M;return[Pe(!1,"v-snackbar"),e.timer&&!P.value&&t("div",{key:"timer",class:"v-snackbar__timer"},[t(Te,{ref:C,color:typeof e.timer=="string"?e.timer:"info",max:e.timeout,"model-value":y.time.value},null)]),w&&t("div",{key:"content",class:"v-snackbar__content",role:"status","aria-live":"polite"},[((A=o.text)==null?void 0:A.call(o))??e.text,(M=o.default)==null?void 0:M.call(o)]),o.actions&&t(Ie,{defaults:{VBtn:{variant:"text",ripple:!1,slim:!0}}},{default:()=>[t("div",{class:"v-snackbar__actions"},[o.actions({isActive:u})])]})]},activator:o.activator})}),ue({},F)}}),pt={__name:"FileUpload",setup(e){const a=h(null),o=h({show:!1,message:"",success:!0}),u=async()=>{if(!a.value)return;const r=new FormData;r.append("file",a.value);try{const s=await fetch("/upload_zip",{method:"POST",body:r});if(!s.ok)throw new Error("File upload failed");const i=await s.json();o.value={show:!0,message:"File uploaded successfully!",success:!0}}catch(s){console.error("Error uploading file:",s),o.value={show:!0,message:"Error uploading file.",success:!1}}};return(r,s)=>(E(),H(ie,null,{default:n(()=>[t(I,{class:"w-100"},{default:n(()=>[t(g,{cols:"12",md:"8"},{default:n(()=>[t(dt,{modelValue:a.value,"onUpdate:modelValue":s[0]||(s[0]=i=>a.value=i),label:"Choose a file",accept:".zip","show-size":""},null,8,["modelValue"])]),_:1})]),_:1}),t(I,{class:"w-100 mt-4"},{default:n(()=>[t(g,{cols:"12",md:"8"},{default:n(()=>[t(ee,{class:"w-33",disabled:!a.value,color:"primary",onClick:u},{default:n(()=>s[3]||(s[3]=[V(" Upload ")])),_:1},8,["disabled"])]),_:1}),t(g,{cols:"12"},{default:n(()=>[t(vt,{modelValue:o.value.show,"onUpdate:modelValue":s[2]||(s[2]=i=>o.value.show=i),color:o.value.success?"green":"red",top:"",timeout:"3000"},{action:n(()=>[t(ee,{color:"white",text:"",onClick:s[1]||(s[1]=i=>o.value.show=!1)},{default:n(()=>s[4]||(s[4]=[V("Close")])),_:1})]),default:n(()=>[V(pe(o.value.message)+" ",1)]),_:1},8,["modelValue","color"])]),_:1})]),_:1})]),_:1}))}},gt=q(pt,[["__scopeId","data-v-88e32ed9"]]),kt="/assets/kaggle_profile-DsMVUMKy.png",bt="/assets/kaggle_api_token-D10ZtWPc.png",ht={data(){return{colabLinks:[]}},mounted(){this.fetchColabLinks()},methods:{async fetchColabLinks(){try{const e=await fetch("/get_colab_links");if(!e.ok)throw new Error("Network response was not ok");const a=await e.json();this.colabLinks=a}catch(e){console.error("Error fetching links:",e)}}}},yt=["href"];function _t(e,a,o,u,r,s){const i=gt;return E(),se("div",null,[t(le,{subtitle:"Kaggle API Token",title:"Prerequisites",class:"mb-2",variant:"outlined",color:"grey-lighten-1"},{default:n(()=>[t(ne,null,{default:n(()=>[a[4]||(a[4]=f("p",null," Bevor die Jupyter Notebooks ausgeführt werden können, muss ein kaggle API Token vorhanden sein! ",-1)),a[5]||(a[5]=f("p",null,[V(" Gehen Sie dafür auf die "),f("a",{href:"https://www.kaggle.com",target:"_blank"},"Kaggle"),V(" Webseite, und loggen Sie sich ein. ")],-1)),t(I,{class:"mt-3"},{default:n(()=>[t(g,null,{default:n(()=>a[0]||(a[0]=[V('Klicken Sie auf "Settings" oder "Einstellungen"')])),_:1}),t(g,null,{default:n(()=>[t(X,{src:kt,alt:"Kaggle Profile",height:"200px"})]),_:1})]),_:1}),t(I,null,{default:n(()=>[t(g,null,{default:n(()=>a[1]||(a[1]=[f("p",null,"Scrollen Sien runter, bis sie zum API Tab kommen.",-1),f("p",null,' Klicken sie auf "Create New Token" und speichern sie das "kaggle.json" ',-1)])),_:1}),t(g,null,{default:n(()=>[t(X,{src:bt})]),_:1})]),_:1}),t(I,null,{default:n(()=>[t(g,null,{default:n(()=>a[2]||(a[2]=[f("p",null,' Sobald Sie das kaggle.json runtergeladen haben, können sie die Schritte 1 - 6 unter "Google Colab Links" ausführen ',-1)])),_:1})]),_:1}),t(I,{class:"mt-2"},{default:n(()=>[t(g,null,{default:n(()=>[t(Be,{color:"info"},{default:n(()=>a[3]||(a[3]=[f("p",null,"Info:",-1),f("p",null," Beim ausführen der Notebooks, werden sie aufgefordert Berechtigungen auf ihr Google Drive zu erteilen. ",-1),f("p",null," Diese werden benötigt, um die Files speichern zu können. ",-1)])),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),t(Ne,null,{default:n(()=>[t(ze,null,{default:n(()=>[t(Ae,{color:"orange-lighten-3"},{default:n(()=>a[6]||(a[6]=[V("Google Colab Links")])),_:1}),t(De,null,{default:n(()=>[t(it,{lines:"two"},{default:n(()=>[(E(!0),se(U,null,ot(r.colabLinks,(m,p)=>(E(),H(ut,{key:p,title:"Schritt "+(p+1)},{default:n(()=>[t(rt,{class:"mt-2"}),f("a",{href:m.link,target:"_blank"},pe(m.description),9,yt)]),_:2},1032,["title"]))),128))]),_:1})]),_:1})]),_:1})]),_:1}),t(le,{subtitle:"Damit die Flask app die ML Modelle nutzten kann, müssen diese hochgeladen werden.",title:".zip upload",class:"mb-2 mt-2",variant:"outlined",color:"grey-lighten-1"},{default:n(()=>[t(ne,null,{default:n(()=>[a[7]||(a[7]=f("p",null,' Nachdem Schritt 6 erfolgreich erledigt wurde, sollten sie in ihrem "downloads" folder ein file mit dem Namen "wine_project_artifacts.zip" haben ',-1)),a[8]||(a[8]=f("p",null,"Laden sie dieses File bitte hoch.",-1)),t(i)]),_:1})]),_:1})])}const wt=q(ht,[["render",_t],["__scopeId","data-v-bd3af8be"]]),Vt={};function St(e,a){const o=wt;return E(),H(ie,null,{default:n(()=>[a[0]||(a[0]=f("h1",{class:"mb-3"},"Instructions",-1)),t(o)]),_:1})}const Lt=q(Vt,[["render",St]]);export{Lt as default};
