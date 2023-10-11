import {css, html, LitElement, PropertyValues} from 'lit'
import {customElement, state} from 'lit/decorators.js'
import PartySocket from "partysocket";
import {Message, MessageConfetti} from "../party/index.ts";
import {sha1} from "./utils/hash.ts";
import {confetti as confettiEmitter} from 'tsparticles-confetti';
import {calculateVelocity} from "./config.ts";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('iframe-renderer')
export class IframeRenderer extends LitElement {
    private partySocket: PartySocket | undefined;

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
    }

    private _onPostMessage = (event: MessageEvent<string>) => {
        console.log('postMessage', event.data);
        const message: Message = JSON.parse(event.data);

        if (message.type === "confetti") {
            this.partySocket?.send(JSON.stringify(message));
            this._addConfetti(message);
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
        return html``
    }

    private _addConfetti({x, y, angle, distance }: MessageConfetti) {
        const velocity = calculateVelocity(distance);
        confettiEmitter({
            spread: 20 + velocity,
            particleCount: 3 * velocity,
            angle,
            startVelocity: velocity,
            origin: {x: (x - window.scrollX) / window.innerWidth, y: (y - window.scrollY) / window.innerHeight}
        });
    }

    static styles = css`
      :host {
        position: fixed;
        inset: 0;
        z-index: 1;
        width: 100vw;
        height: 100vh;
      }

      button {
        pointer-events: initial;
      }

      canvas {
        width: 100%;
        height: 100%;
      }
    ;
    `
}

declare global {
    interface HTMLElementTagNameMap {
        'iframe-renderer': IframeRenderer
    }
}