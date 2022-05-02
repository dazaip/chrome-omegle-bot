export class EventEmitter {
    constructor() {
        Object.defineProperty(this, "events", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.events = {};
    }
    emit(name, data) {
        if (!this.events[name])
            return;
        for (const func of this.events[name]) {
            func(data);
        }
    }
    on(name, callback) {
        if (!this.events[name])
            this.events[name] = [];
        this.events[name].push(callback);
    }
}
