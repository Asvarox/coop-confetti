export const injectIntoPage = () => {
    let docum = document;
    let documentElementById = 'getElementById' as const;
    let enabled = true;
    const buttonStyles = `z-index:99999;cursor:pointer;pointer-events:initial;position:fixed;inset:auto 50px 50px auto;border-radius:100%;width:75px;height:75px;font-size:40px;transition:200ms;`;
    const enabledStyles = `background-color:#4cff00;`;
    const disabledStyles = `opacity:.75;filter:grayscale(75%);`;
    let html = `<button id="confetti-button" style="${buttonStyles}${enabledStyles}">🎉</button><iframe id="confetti-iframe" src="${import.meta.env.VITE_APP_HOST_PAGE}/iframe.html?url=${encodeURIComponent(window.location.href)}" style="pointer-events:initial;position:fixed;inset:0;width:100vw;height:100vh;border:none;z-index:99998;"/>`;
    docum.body.insertAdjacentHTML('beforeend', html);
    let iframe = docum[documentElementById]('confetti-iframe') as HTMLIFrameElement;
    let button = docum[documentElementById]('confetti-button') as HTMLButtonElement;
    button.onclick = () => {
        enabled = !enabled;
        iframe.contentWindow!.postMessage(enabled, '*');
        iframe.style.pointerEvents = enabled ? 'initial' : 'none';
        button.style.cssText = buttonStyles + (enabled ? enabledStyles : disabledStyles);
    }
}