import{i as h,s as f,x as g,e as y}from"./query-assigned-elements.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const v=(t,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(n){n.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(n){n.createProperty(e.key,t)}},b=(t,e,n)=>{e.constructor.createProperty(n,t)};function m(t){return(e,n)=>n!==void 0?b(t,e,n):v(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function d(t){return m({...t,state:!0})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _=({finisher:t,descriptor:e})=>(n,r)=>{var i;if(r===void 0){const o=(i=n.originalKey)!==null&&i!==void 0?i:n.key,s=e!=null?{kind:"method",placement:"prototype",key:o,descriptor:e(n.key)}:{...n,key:o};return t!=null&&(s.finisher=function(c){t(c,o)}),s}{const o=n.constructor;e!==void 0&&Object.defineProperty(n,r,e(r)),t==null||t(o,r)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function p(t,e){return _({descriptor:n=>{const r={get(){var i,o;return(o=(i=this.renderRoot)===null||i===void 0?void 0:i.querySelector(t))!==null&&o!==void 0?o:null},enumerable:!0,configurable:!0};if(e){const i=typeof n=="symbol"?Symbol():"__"+n;r.get=function(){var o,s;return this[i]===void 0&&(this[i]=(s=(o=this.renderRoot)===null||o===void 0?void 0:o.querySelector(t))!==null&&s!==void 0?s:null),this[i]}}return r}})}var w=Object.defineProperty,P=Object.getOwnPropertyDescriptor,l=(t,e,n,r)=>{for(var i=r>1?void 0:r?P(e,n):e,o=t.length-1,s;o>=0;o--)(s=t[o])&&(i=(r?s(e,n,i):s(i))||i);return r&&i&&w(e,n,i),i};function x(t,e,n,r){const i=n-t,o=r-e,s=Math.hypot(i,o),u=Math.atan2(o,i)*(180/Math.PI);return{distance:s,angle:u}}let a=class extends f{constructor(){super(...arguments),this._enabled=!0,this.dragging=!1,this.initialPoint=null}async firstUpdated(t){super.firstUpdated(t)}disconnectedCallback(){super.disconnectedCallback()}render(){return g`
            <button @click="${this._toggleEnabled}" class="${this._enabled?"enabled":"disabled"}">🎉</button>
            <svg @mousedown="${this._mouseDown}" @mouseup="${this._mouseUp}" width="${window.innerWidth}"
                 height="${window.innerHeight}"
                 style="pointer-events: ${this._enabled?"initial":"none"}"></svg>
            <iframe src="${"https://asvarox.github.io/coop-confetti"}/iframe.html?url=${encodeURIComponent(window.location.href)}"
                    width="500" height="500" style="inset: 0;pointer-events: none" allowtransparency="true"/>
        `}_toggleEnabled(){this._enabled=!this._enabled}_mouseDown(t){this._enabled&&(t.preventDefault(),t.stopPropagation(),this.dragging=!0,this.initialPoint={x:t.clientX,y:t.clientY})}_mouseUp(t){var e;if(this.dragging=!1,this._enabled){t.preventDefault(),t.stopPropagation();const{angle:n,distance:r}=x(t.clientX,t.clientY,this.initialPoint.x,this.initialPoint.y);if(r>10){const i={type:"confetti",x:this.initialPoint.x,y:this.initialPoint.y,angle:-n,distance:r};(e=this.iframe.contentWindow)==null||e.postMessage(JSON.stringify(i),"*")}}}};a.styles=h`
      :host {
        position: fixed;
        inset: 0;
        z-index: 99999;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
      }

      button {
        cursor: pointer;
        pointer-events: initial;
        position: absolute;
        inset: auto 50px 50px auto;
        border-radius: 100%;
        width: 75px;
        height: 75px;
        font-size: 40px;
        transition: 200ms;
      }

      .enabled {
        background-color: #4cff00;
      }

      .disabled {
        opacity: 0.75;
        filter: grayscale(75%);
      }

      canvas, iframe {
        pointer-events: none;
        user-select: none;
        position: absolute;
        width: 100%;
        border: 0;
        height: 100%;
      }
    ;
    `;l([p("canvas")],a.prototype,"canvas",2);l([p("iframe")],a.prototype,"iframe",2);l([d()],a.prototype,"_enabled",2);l([d()],a.prototype,"dragging",2);a=l([y("coop-confetti")],a);document.body.append(document.createElement("coop-confetti"));
