export const sleep = (time) => new Promise((r) => setTimeout(r, time));
export const select = (str) => document.querySelector(str);
