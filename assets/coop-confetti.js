import{i as g,s as f,x as P,b,c,M as v,e as m}from"./config.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const $=(t,i)=>i.kind==="method"&&i.descriptor&&!("value"in i.descriptor)?{...i,finisher(n){n.createProperty(i.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:i.key,initializer(){typeof i.initializer=="function"&&(this[i.key]=i.initializer.call(this))},finisher(n){n.createProperty(i.key,t)}},x=(t,i,n)=>{i.constructor.createProperty(n,t)};function w(t){return(i,n)=>n!==void 0?x(t,i,n):$(t,i)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function h(t){return w({...t,state:!0})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const k=({finisher:t,descriptor:i})=>(n,s)=>{var e;if(s===void 0){const o=(e=n.originalKey)!==null&&e!==void 0?e:n.key,r=i!=null?{kind:"method",placement:"prototype",key:o,descriptor:i(n.key)}:{...n,key:o};return t!=null&&(r.finisher=function(d){t(d,o)}),r}{const o=n.constructor;i!==void 0&&Object.defineProperty(n,s,i(s)),t==null||t(o,s)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function p(t,i){return k({descriptor:n=>{const s={get(){var e,o;return(o=(e=this.renderRoot)===null||e===void 0?void 0:e.querySelector(t))!==null&&o!==void 0?o:null},enumerable:!0,configurable:!0};if(i){const e=typeof n=="symbol"?Symbol():"__"+n;s.get=function(){var o,r;return this[e]===void 0&&(this[e]=(r=(o=this.renderRoot)===null||o===void 0?void 0:o.querySelector(t))!==null&&r!==void 0?r:null),this[e]}}return s}})}var _=Object.defineProperty,D=Object.getOwnPropertyDescriptor,a=(t,i,n,s)=>{for(var e=s>1?void 0:s?D(i,n):i,o=t.length-1,r;o>=0;o--)(r=t[o])&&(e=(s?r(i,n,e):r(e))||e);return s&&e&&_(i,n,e),e};function u(t,i,n,s){const e=n-t,o=s-i,r=Math.hypot(e,o),y=Math.atan2(o,e)*(180/Math.PI);return{distance:r,angle:y}}let l=class extends f{constructor(){super(...arguments),this._enabled=!0,this.dragging=!1,this.currentPosition=null,this.initialPoint=null}async firstUpdated(t){super.firstUpdated(t)}disconnectedCallback(){super.disconnectedCallback()}render(){return P`
            <button @click="${this._toggleEnabled}" class="${this._enabled?"enabled":"disabled"}">🎉</button>
            <svg @mousedown="${this._mouseDown}" @mouseup="${this._mouseUp}" @mousemove="${this._mouseMove}"
                 width="${window.innerWidth}"
                 height="${window.innerHeight}"
                 style="pointer-events: ${this._enabled?"initial":"none"}"
            >
                ${this.dragging?(()=>{if(this.initialPoint&&this.currentPosition){const{distance:t}=u(this.currentPosition.x,this.currentPosition.y,this.initialPoint.x,this.initialPoint.y);return b`
                            <mask id="circle-mask">
                                <rect width="${window.innerWidth}" height="${window.innerHeight}" fill="white"/> 
                                <circle cx="${this.initialPoint.x}" cy="${this.initialPoint.y}" r="${c(t)}" fill="black" />
                            </mask>
                            <circle cx="${this.initialPoint.x}" cy="${this.initialPoint.y}" r="${c(t)}" style="stroke:rgb(0,0,0);stroke-width:2;fill: transparent" />
                            <circle cx="${this.initialPoint.x}" cy="${this.initialPoint.y}" r="${c(t)}" style="stroke:${t>=v?"rgb(255,0,0)":"rgb(255,255,255)"};stroke-width:1;fill: transparent" />
                            <g mask="url(#circle-mask)">
                                <line x1="${this.initialPoint.x}" y1="${this.initialPoint.y}" x2="${this.currentPosition.x}"
                                      y2="${this.currentPosition.y}"
                                      style="stroke:rgb(0,0,0);stroke-width:2"/>
                                <line x1="${this.initialPoint.x}" y1="${this.initialPoint.y}" x2="${this.currentPosition.x}"
                                      y2="${this.currentPosition.y}"
                                      style="stroke:rgb(255,255,255);stroke-width:1"/>
                            </g>`}})():""}
            </svg>
            <iframe src="${"https://asvarox.github.io/coop-confetti"}/iframe.html?url=${encodeURIComponent(window.location.href)}"
                    width="500" height="500" style="inset: 0;pointer-events: none" allowtransparency="true"/>
        `}_toggleEnabled(){this._enabled=!this._enabled}_mouseDown(t){this._enabled&&(t.preventDefault(),t.stopPropagation(),this.dragging=!0,this.initialPoint={x:t.clientX,y:t.clientY})}_mouseMove(t){this.dragging&&(this.currentPosition={x:t.clientX,y:t.clientY})}_mouseUp(t){var i;if(this._enabled){t.preventDefault(),t.stopPropagation();const{angle:n,distance:s}=u(t.clientX,t.clientY,this.initialPoint.x,this.initialPoint.y);if(s>10){const e={type:"confetti",x:this.initialPoint.x,y:this.initialPoint.y,angle:-n,distance:s};(i=this.iframe.contentWindow)==null||i.postMessage(JSON.stringify(e),"*")}}this.dragging=!1,this.initialPoint=this.currentPosition=null}};l.styles=g`
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
    `;a([p("canvas")],l.prototype,"canvas",2);a([p("iframe")],l.prototype,"iframe",2);a([h()],l.prototype,"_enabled",2);a([h()],l.prototype,"dragging",2);a([h()],l.prototype,"currentPosition",2);l=a([m("coop-confetti")],l);document.body.append(document.createElement("coop-confetti"));
