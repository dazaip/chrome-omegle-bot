import { ElementIds } from './components.js';
import { select } from './utils.js';

interface Config {
    message: string;
    wait: string;
}

export const getConfig = () => {
    const { config } = JSON.parse(localStorage.getItem('config'));
    return config as Config;
};

export const addToSent = () => {
    const element = document.getElementById(ElementIds.SENT_TEXT);
    const prev = +element.textContent.split(' ')[1];
    element.textContent = `Sent: ${prev + 1}`;
};

export const handleStart = () => {
    const start = select(`#${ElementIds.START}`);
    const stop = select(`#${ElementIds.STOP}`);

    start.style.display = 'none';
    stop.style.display = 'flex';
};

export const handleStop = () => {
    const start = select(`#${ElementIds.START}`);
    const stop = select(`#${ElementIds.STOP}`);

    start.style.display = 'flex';
    stop.style.display = 'none';
};
