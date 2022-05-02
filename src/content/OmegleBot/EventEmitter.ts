interface Events {
    [key: string]: Array<(data?: unknown) => unknown>;
}

declare interface EventEmitterInterface {
    events: Events;
    emit: (name: string, data: unknown) => void;
    on: (name: string, callback: (data?: unknown) => unknown) => void;
}

export class EventEmitter implements EventEmitterInterface {
    events: Events;

    constructor() {
        this.events = {};
    }

    emit(name: string, data?: unknown) {
        if (!this.events[name]) return;

        for (const func of this.events[name]) {
            func(data);
        }
    }

    on(name: string, callback: (data?: unknown) => unknown) {
        if (!this.events[name]) this.events[name] = [];

        this.events[name].push(callback);
    }
}
