export interface Subscriber {
    trigger(): void;
}

class EventsHandler {
    private subs: { [key: string]: Function[]; };

    constructor() {
        this.subs = {};
    }

    subscribe(event: string, subscriber: Function) {
        if (!this.subs[event])
            this.subs[event] = [];

        this.subs[event].push(subscriber);
    }

    dispatch(event: string, payload: unknown): void {
        if (this.subs[event])
            this.subs[event].forEach(sub => sub(payload));
    }
}

const handler = new EventsHandler();
export const dispatch = handler.dispatch.bind(handler);
export const subscribe = handler.subscribe.bind(handler);
