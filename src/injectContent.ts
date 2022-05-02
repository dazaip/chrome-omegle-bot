async function main() {
    // inject content.ts so we can use it as a module
    const script = document.createElement('script');
    const url = chrome.runtime.getURL('../dist/content/content.js');
    script.setAttribute('src', url);
    script.setAttribute('type', 'module');
    document.body.appendChild(script);

    // anytime storage changes, update localstorage
    chrome.storage.onChanged.addListener(async () => {
        const data = await chrome.storage.sync.get(['config']);
        console.log(data);
        localStorage.setItem('config', JSON.stringify(data));
    });
}

window.addEventListener('load', main);
