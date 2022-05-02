export const sleep = (time: number) => new Promise((r) => setTimeout(r, time));

export const select = (str: string) => document.querySelector(str) as HTMLElement;
