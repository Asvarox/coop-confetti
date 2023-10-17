import {injectIntoPage} from "./injector.ts";

injectIntoPage();
document.getElementById('bookmark')?.setAttribute('href', `javascript:(${injectIntoPage.toString().split("\n").join('')})()`);
