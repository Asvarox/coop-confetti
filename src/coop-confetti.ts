import {css, html, LitElement, PropertyValues, svg} from 'lit'
import {customElement, query, state} from 'lit/decorators.js'
import {MessageConfetti} from "../party";
import {calculateVelocity, MAX_DISTANCE} from "./config.ts";

function calculateDistanceAndAngle(x1: number, y1: number, x2: number, y2: number) {
    // Calculating differential
    const dx = x2 - x1;
    const dy = y2 - y1;

    // Calculating distance between two points
    const distance = Math.hypot(dx, dy);

    // Calculating angle in radians
    const angleRadians = Math.atan2(dy, dx);

    // Converting angle to degrees
    const angleDegrees = angleRadians * (180 / Math.PI);

    return {distance: distance, angle: angleDegrees};
}

@customElement('coop-confetti')
export class CoopConfetti extends LitElement {
    @query('canvas')
    canvas: HTMLCanvasElement | undefined;

    @query('iframe')
    iframe: HTMLIFrameElement | undefined;

    confetti: any;

    @state()
    private _enabled = true;

    @state()
    private dragging = false;
    @state()
    private currentPosition: { x: number, y: number } | null = null;

    private initialPoint: { x: number, y: number } | null = null;

    protected async firstUpdated(_changedProperties: PropertyValues) {
        super.firstUpdated(_changedProperties);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
    }

    render() {
        return html`
            <button @click="${this._toggleEnabled}" class="${this._enabled ? 'enabled' : 'disabled'}">🎉</button>
            <svg @mousedown="${this._mouseDown}" @mouseup="${this._mouseUp}" @mousemove="${this._mouseMove}"
                 width="${window.innerWidth}"
                 height="${window.innerHeight}"
                 style="pointer-events: ${this._enabled ? 'initial' : 'none'}"
            >
                ${this.dragging ? (() => {
                    if (this.initialPoint && this.currentPosition) {
                        const {distance} = calculateDistanceAndAngle(this.currentPosition.x, this.currentPosition.y, this.initialPoint.x, this.initialPoint.y);
                        return svg`
                            <mask id="circle-mask">
                                <rect width="${window.innerWidth}" height="${window.innerHeight}" fill="white"/> 
                                <circle cx="${this.initialPoint.x}" cy="${this.initialPoint.y}" r="${calculateVelocity(distance)}" fill="black" />
                            </mask>
                            <circle cx="${this.initialPoint.x}" cy="${this.initialPoint.y}" r="${calculateVelocity(distance)}" style="stroke:rgb(0,0,0);stroke-width:2;fill: transparent" />
                            <circle cx="${this.initialPoint.x}" cy="${this.initialPoint.y}" r="${calculateVelocity(distance)}" style="stroke:${distance >= MAX_DISTANCE ? 'rgb(255,0,0)':'rgb(255,255,255)'};stroke-width:1;fill: transparent" />
                            <g mask="url(#circle-mask)">
                                <line x1="${this.initialPoint.x}" y1="${this.initialPoint.y}" x2="${this.currentPosition.x}"
                                      y2="${this.currentPosition.y}"
                                      style="stroke:rgb(0,0,0);stroke-width:2"/>
                                <line x1="${this.initialPoint.x}" y1="${this.initialPoint.y}" x2="${this.currentPosition.x}"
                                      y2="${this.currentPosition.y}"
                                      style="stroke:rgb(255,255,255);stroke-width:1"/>
                            </g>`;
                        
                    }
                })() : ''}
            </svg>
            <iframe src="${import.meta.env.VITE_APP_HOST_PAGE}/iframe.html?url=${encodeURIComponent(window.location.href)}"
                    width="500" height="500" style="inset: 0;pointer-events: none" allowtransparency="true"/>
        `
    }

    private _toggleEnabled() {
        this._enabled = !this._enabled;
    }

    private _mouseDown(e: MouseEvent) {
        if (this._enabled) {
            e.preventDefault();
            e.stopPropagation();
            this.dragging = true;
            this.initialPoint = {x: e.clientX, y: e.clientY};
        }
    }

    private _mouseMove(e: MouseEvent) {
        if (this.dragging) {
            this.currentPosition = {x: e.clientX, y: e.clientY};
        }
    }

    private _mouseUp(e: MouseEvent) {
        if (this._enabled) {
            e.preventDefault();
            e.stopPropagation();
            const {
                angle,
                distance
            } = calculateDistanceAndAngle(e.clientX, e.clientY, this.initialPoint!.x, this.initialPoint!.y);

            if (distance > 10) {

                const payload: MessageConfetti = {
                    type: "confetti",
                    x: this.initialPoint!.x,
                    y: this.initialPoint!.y,
                    angle: -angle,
                    distance,
                };
                this.iframe!.contentWindow?.postMessage(JSON.stringify(payload), '*');
            }
        }
        this.dragging = false;
        this.initialPoint = this.currentPosition = null;
    }

    static styles = css`
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
    `
}

declare global {
    interface HTMLElementTagNameMap {
        'coop-confetti': CoopConfetti
    }
}

document.body.append(document.createElement('coop-confetti'));