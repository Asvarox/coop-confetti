import {css, html, LitElement, PropertyValues} from 'lit'
import {customElement, query, state} from 'lit/decorators.js'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('coop-confetti')
export class CoopConfetti extends LitElement {
    @query('canvas')
    canvas: HTMLCanvasElement | undefined;

    @query('iframe')
    iframe: HTMLIFrameElement | undefined;

    confetti: any;

    @state()
    private _enabled = true;

    protected async firstUpdated(_changedProperties: PropertyValues) {
        super.firstUpdated(_changedProperties);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
    }

    render() {
        return html`
            <button @click="${this._toggleEnabled}">${this._enabled ? 'Disable' : 'Enable'}</button>
            <svg @click="${this._click}" width="${window.innerWidth}" height="${window.innerHeight}"
                 style="pointer-events: ${this._enabled ? 'initial' : 'none'}"></svg>
            <iframe src="${import.meta.env.VITE_APP_HOST_PAGE}/iframe.html?url=${encodeURIComponent(window.location.href)}" width="500" height="500" style="inset: 0;pointer-events: none"  allowtransparency="true" />
        `
    }

    private _toggleEnabled() {
        this._enabled = !this._enabled;
    }

    private _click(e: MouseEvent) {
        if (this._enabled) {
            e.preventDefault();
            e.stopPropagation();
            this.iframe!.contentWindow?.postMessage(JSON.stringify({
                type: "confetti",
                x: e.clientX,
                y: e.clientY,
            }), '*');
        }
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
    `
}

declare global {
    interface HTMLElementTagNameMap {
        'coop-confetti': CoopConfetti
    }
}

document.body.append(document.createElement('coop-confetti'));