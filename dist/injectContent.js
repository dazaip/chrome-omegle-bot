"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const script = document.createElement('script');
        const url = chrome.runtime.getURL('../dist/content/content.js');
        script.setAttribute('src', url);
        script.setAttribute('type', 'module');
        document.body.appendChild(script);
        chrome.storage.onChanged.addListener(() => __awaiter(this, void 0, void 0, function* () {
            const data = yield chrome.storage.sync.get(['config']);
            console.log(data);
            localStorage.setItem('config', JSON.stringify(data));
        }));
    });
}
window.addEventListener('load', main);
