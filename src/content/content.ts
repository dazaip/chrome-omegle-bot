import { box, ElementIds } from './components.js';
import { addToSent, handleStart, handleStop } from './dataManagement.js';
import OmegleBot from './OmegleBot/OmegleBot.js';

document.body.appendChild(box());

const run = async () => {
    try {
        const bot = new OmegleBot();

        handleStart();

        bot.on('sent', () => addToSent());

        document.getElementById(ElementIds.STOP).addEventListener('click', () => {
            handleStop();
            bot.stop = true;
        });

        await bot.run();
    } catch (error) {
        const e = error as Error;
        return alert(e?.message);
    }
};

document.getElementById(ElementIds.START).addEventListener('click', run);
