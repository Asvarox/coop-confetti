import {css, html, LitElement, PropertyValues, svg} from 'lit'
import {customElement, query, state} from 'lit/decorators.js'
import PartySocket from "partysocket";
import {Message, MessageConfetti} from "../party/index.ts";
import {sha1} from "./utils/hash.ts";
import {confetti as confettiEmitter} from 'tsparticles-confetti';
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


/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('iframe-renderer')
export class IframeRenderer extends LitElement {
    private partySocket: PartySocket | undefined;

    @query('iframe')
    iframe: HTMLIFrameElement | undefined;

    @state()
    private _enabled = true;

    @state()
    private dragging = false;
    @state()
    private currentPosition: { x: number, y: number } | null = null;

    private initialPoint: { x: number, y: number } | null = null;

    protected async firstUpdated(_changedProperties: PropertyValues) {
        super.firstUpdated(_changedProperties);

        const params = new URLSearchParams(window.location.search);

        const url = params.get('url');
        if (url) {
            this.partySocket = new PartySocket({
                host: import.meta.env.VITE_APP_WS_SERVER,
                room: await sha1(url),
            });

            this.partySocket.addEventListener("message", this._onMessageEvent);

            window.addEventListener('message', this._onPostMessage);
        }
    }


    disconnectedCallback() {
        super.disconnectedCallback();
        this.partySocket?.removeEventListener("message", this._onMessageEvent);
        window.removeEventListener("message", this._onPostMessage);
        this.partySocket?.close();
        3
    }

    private _onPostMessage = (event: MessageEvent<string>) => {
        console.log('postMessage', event.data);
        const message: boolean = JSON.parse(event.data);
        console.log(message);

        if (message === true || message === false) {
            this._enabled = message;
        }
    }

    private _onMessageEvent = (event: MessageEvent<string>) => {
        try {
            const message: Message = JSON.parse(event.data);

            if (message.type === "confetti") {
                this._addConfetti(message);
            }
        } catch (e) {
            console.warn("Failed to parse message", e, e);
        }
    };

    render() {
        return html`
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
                            <circle cx="${this.initialPoint.x}" cy="${this.initialPoint.y}" r="${calculateVelocity(distance)}" style="stroke:${distance >= MAX_DISTANCE ? 'rgb(255,0,0)' : 'rgb(255,255,255)'};transition: stroke 300ms;stroke-width:1;fill: transparent" />
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
        `
    }

    private _addConfetti({x, y, angle, distance}: MessageConfetti) {
        const velocity = calculateVelocity(distance);
        confettiEmitter({
            spread: 20 + velocity,
            particleCount: 3 * velocity,
            angle,
            startVelocity: velocity,
            origin: {x: (x - window.scrollX) / window.innerWidth, y: (y - window.scrollY) / window.innerHeight}
        });
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
                this.partySocket?.send(JSON.stringify(payload));
                this._addConfetti(payload);
            }
        }
        this.dragging = false;
        this.initialPoint = this.currentPosition = null;
    }

    static styles = css`
      :host {
        position: fixed;
        inset: 0;
        z-index: 1;
        width: 100vw;
        height: 100vh;
        cursor:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>🎉</text></svg>") 16 0,auto;
      }
    ;
    `
}

declare global {
    interface HTMLElementTagNameMap {
        'iframe-renderer': IframeRenderer
    }
}