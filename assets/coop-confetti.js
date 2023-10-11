import{i as p,s as u,x as h,e as f}from"./query-assigned-elements.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const v=(t,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(n){n.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(n){n.createProperty(e.key,t)}},y=(t,e,n)=>{e.constructor.createProperty(n,t)};function b(t){return(e,n)=>n!==void 0?y(t,e,n):v(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function m(t){return b({...t,state:!0})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const g=({finisher:t,descriptor:e})=>(n,r)=>{var i;if(r===void 0){const o=(i=n.originalKey)!==null&&i!==void 0?i:n.key,s=e!=null?{kind:"method",placement:"prototype",key:o,descriptor:e(n.key)}:{...n,key:o};return t!=null&&(s.finisher=function(d){t(d,o)}),s}{const o=n.constructor;e!==void 0&&Object.defineProperty(n,r,e(r)),t==null||t(o,r)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function a(t,e){return g({descriptor:n=>{const r={get(){var i,o;return(o=(i=this.renderRoot)===null||i===void 0?void 0:i.querySelector(t))!==null&&o!==void 0?o:null},enumerable:!0,configurable:!0};if(e){const i=typeof n=="symbol"?Symbol():"__"+n;r.get=function(){var o,s;return this[i]===void 0&&(this[i]=(s=(o=this.renderRoot)===null||o===void 0?void 0:o.querySelector(t))!==null&&s!==void 0?s:null),this[i]}}return r}})}var _=Object.defineProperty,w=Object.getOwnPropertyDescriptor,c=(t,e,n,r)=>{for(var i=r>1?void 0:r?w(e,n):e,o=t.length-1,s;o>=0;o--)(s=t[o])&&(i=(r?s(e,n,i):s(i))||i);return r&&i&&_(e,n,i),i};let l=class extends u{constructor(){super(...arguments),this._enabled=!0}async firstUpdated(t){super.firstUpdated(t)}disconnectedCallback(){super.disconnectedCallback()}render(){return h`
            <button @click="${this._toggleEnabled}">${this._enabled?"Disable":"Enable"}</button>
            <svg @click="${this._click}" width="${window.innerWidth}" height="${window.innerHeight}"
                 style="pointer-events: ${this._enabled?"initial":"none"}"></svg>
            <iframe src="${"https://asvarox.github.io/coop-confetti"}/iframe.html?url=${encodeURIComponent(window.location.href)}" width="500" height="500" style="inset: 0;pointer-events: none"  allowtransparency="true" />
        `}_toggleEnabled(){this._enabled=!this._enabled}_click(t){var e;this._enabled&&(t.preventDefault(),t.stopPropagation(),(e=this.iframe.contentWindow)==null||e.postMessage(JSON.stringify({type:"confetti",x:t.clientX,y:t.clientY}),"*"))}};l.styles=p`
      :host {
        position: fixed;
        inset: 0;
        z-index: 99999;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
      }

      button {
        pointer-events: initial;
      }

      canvas,iframe {
        pointer-events: none;
        user-select: none;
        position: absolute;
        width: 100%;
        height: 100%;
      }
    ;
    `;c([a("canvas")],l.prototype,"canvas",2);c([a("iframe")],l.prototype,"iframe",2);c([m()],l.prototype,"_enabled",2);l=c([f("coop-confetti")],l);document.body.append(document.createElement("coop-confetti"));
