var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { formObject } from './utils.js';
function main() {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const form = document.querySelector('form');
        const wait = form.querySelector('input[name="wait"]');
        const data = yield chrome.storage.sync.get(['config']);
        if ((_a = data === null || data === void 0 ? void 0 : data.config) === null || _a === void 0 ? void 0 : _a.message)
            form.querySelector('textarea').value = data.config.message;
        if ((_b = data === null || data === void 0 ? void 0 : data.config) === null || _b === void 0 ? void 0 : _b.wait)
            wait.value = data.config.wait;
        const handleChange = () => {
            const config = formObject(form);
            if (!+wait.value || +wait.value < 2000)
                wait.value = '2000';
            if (+wait.value > 15000)
                wait.value = '15000';
            chrome.storage.sync.remove(['config']);
            chrome.storage.sync.set({ config });
        };
        form.addEventListener('keyup', handleChange);
        form.addEventListener('change', handleChange);
    });
}
window.addEventListener('load', main);
