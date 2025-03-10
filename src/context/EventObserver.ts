import type { ContextEvent } from "@/types/enums";

export interface Subscriber {
    trigger(): void;
}

class EventsObserver {
    private subs: { [key: string]: Function[]; };

    constructor() {
        this.subs = {};
    }

    subscribe(event: ContextEvent, subscriber: Function) {
        if (!this.subs[event])
            this.subs[event] = [];

        this.subs[event].push(subscriber);
    }

    dispatch(event: ContextEvent, payload?: unknown): void {
        if (this.subs[event])
            this.subs[event].forEach(sub => sub(payload));
    }
}

const observer = new EventsObserver();
export const dispatch = observer.dispatch.bind(observer);
export const subscribe = observer.subscribe.bind(observer);
