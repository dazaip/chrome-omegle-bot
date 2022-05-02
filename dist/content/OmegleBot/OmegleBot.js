var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getConfig } from '../dataManagement.js';
import { select, sleep } from '../utils.js';
import { EventEmitter } from './EventEmitter.js';
import { OmegleSelectors } from './consts.js';
export default class OmegleBot extends EventEmitter {
    constructor() {
        super();
        Object.defineProperty(this, "message", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "skipped", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "wait", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "interval", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "connecting", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "stop", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        for (const selector of Object.values(OmegleSelectors)) {
            if (!select(selector))
                throw new Error('Must start a chat session before starting the bot.');
        }
        if (!getConfig().message) {
            throw new Error('Configure a message first!');
        }
        this.message = getConfig().message;
        this.skipped = false;
        this.wait = +getConfig().wait || 2000;
        this.connecting = false;
        this.stop = false;
        setInterval(() => {
            this.message = getConfig().message;
            this.wait = +getConfig().wait || 2000;
        }, 1000);
        setInterval(() => {
            if (select('div.newchatbtnwrapper'))
                this.skipped = true;
            if (select('button.sendbtn[disabled]'))
                this.connecting = true;
            else
                this.connecting = false;
        }, 100);
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.stop)
                return;
            if (this.connecting) {
                yield sleep(100);
                return this.run();
            }
            const [chatBox, disconnect, send] = Object.values(OmegleSelectors).map((str) => select(str));
            chatBox.value = this.message;
            yield sleep(500);
            send.click();
            this.emit('sent');
            if (this.skipped) {
                yield sleep(this.wait);
                disconnect.click();
                this.skipped = false;
                return this.run();
            }
            for (const _ of Array(2).keys()) {
                yield sleep(Math.floor(this.wait / 2));
                disconnect.click();
            }
            yield sleep(500);
            disconnect.click();
            this.skipped = false;
            return this.run();
        });
    }
}
