enum PromiseState {
    Pending = 0,
    Resolved = 1,
    Rejected = 2,
}
export class PromiseLike {
    private callbacks: any[];
    private state: PromiseState;
    constructor(callback) {
        callback(() => {

        }, () => {

        });
        this.callbacks = [];
        this.state = PromiseState.Pending;
    }

    public then(onFulfilled: () => PromiseLike, onRejected: () => PromiseLike) {
        return new PromiseLike((resolve, reject) => {
            this.callbacks.push({
                resolve,
                reject,
                onFulfilled,
                onRejected,
            });
        });
    }

    private _resolve() {
        if (this.state !== PromiseState.Pending) {
            return;
        }
        this.state = PromiseState.Resolved;
        this.callbacks.forEach(({ resolve, reject, onFulfilled, onRejected }) => {

        });
    }

    private _reject() {
        this.state = PromiseState.Rejected;
    }
}