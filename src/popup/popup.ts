import { formObject } from './utils.js';

async function main() {
    const form = document.querySelector('form');
    const wait = form.querySelector('input[name="wait"]') as HTMLInputElement;

    const data = await chrome.storage.sync.get(['config']);

    if (data?.config?.message) form.querySelector('textarea').value = data.config.message;
    if (data?.config?.wait) wait.value = data.config.wait;

    const handleChange = () => {
        const config = formObject(form);

        if (!+wait.value || +wait.value < 2000) wait.value = '2000';
        if (+wait.value > 15000) wait.value = '15000';

        chrome.storage.sync.remove(['config']);
        chrome.storage.sync.set({ config });
    };

    // anytime form changes, post the updated data to background.ts
    form.addEventListener('keyup', handleChange);
    form.addEventListener('change', handleChange);
}

window.addEventListener('load', main);
