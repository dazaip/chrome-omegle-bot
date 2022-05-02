import { formObject } from './utils.js';
function main() {
    const form = document.querySelector('form');
    const port = chrome.runtime.connect({ name: 'config' });
    form.addEventListener('keyup', () => {
        port.postMessage(formObject(form));
    });
}
window.addEventListener('load', main);
