var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { box, ElementIds } from './components.js';
import { addToSent, handleStart, handleStop } from './dataManagement.js';
import OmegleBot from './OmegleBot/OmegleBot.js';
document.body.appendChild(box());
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bot = new OmegleBot();
        handleStart();
        bot.on('sent', () => addToSent());
        document.getElementById(ElementIds.STOP).addEventListener('click', () => {
            handleStop();
            bot.stop = true;
        });
        yield bot.run();
    }
    catch (error) {
        const e = error;
        return alert(e === null || e === void 0 ? void 0 : e.message);
    }
});
document.getElementById(ElementIds.START).addEventListener('click', run);
