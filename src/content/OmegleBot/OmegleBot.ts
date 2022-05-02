import { getConfig } from '../dataManagement.js';
import { select, sleep } from '../utils.js';
import { EventEmitter } from './EventEmitter.js';
import { OmegleSelectors } from './consts.js';

export default class OmegleBot extends EventEmitter {
    message: string;
    skipped: boolean;
    wait: number;
    interval: unknown;
    connecting: boolean;
    stop: boolean;

    constructor() {
        super();

        for (const selector of Object.values(OmegleSelectors)) {
            if (!select(selector)) throw new Error('Must start a chat session before starting the bot.');
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
            if (select('div.newchatbtnwrapper')) this.skipped = true;

            if (select('button.sendbtn[disabled]')) this.connecting = true;
            else this.connecting = false;
        }, 100);
    }

    async run() {
        if (this.stop) return;

        if (this.connecting) {
            await sleep(100);
            return this.run();
        }

        // Grab hold of the elements
        const [chatBox, disconnect, send] = Object.values(OmegleSelectors).map((str) => select(str)) as [
            HTMLTextAreaElement,
            HTMLButtonElement,
            HTMLButtonElement
        ];

        // Send message
        chatBox.value = this.message;
        await sleep(500);
        send.click();

        this.emit('sent');

        // If skipped, move onto next
        if (this.skipped) {
            await sleep(this.wait);
            disconnect.click();
            this.skipped = false;
            return this.run();
        }

        // Click disconnect 2 times
        for (const _ of Array(2).keys()) {
            await sleep(Math.floor(this.wait / 2));
            disconnect.click();
        }

        await sleep(500);
        disconnect.click();

        this.skipped = false;
        return this.run();
    }
}
