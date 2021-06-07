enum PromiseState {
    Pending = 0,
    Fulfilled = 1,
    Rejected = 2,
}

type NiceAny<T> = PromiseLike<T> | T | undefined | null | void;

export class PromiseLike<T> {
    public static resolve(value: any): PromiseLike<any> {
        if (value instanceof PromiseLike) {
            return value;
        }
        if (typeof value === "object" && value !== null && typeof value.then === "function") {
            return new PromiseLike((resolve) => {
                value.then(resolve);
            });
        }
        return new PromiseLike((resolve) => {
            resolve(value);
        });
    }

    public static reject(value: any): PromiseLike<any> {
        if (typeof value === "object" && value !== null && typeof value.then === "function") {
            return new PromiseLike((_, reject) => {
                value.then(null, reject);
            });
        }
        return new PromiseLike((_, reject) => {
            reject(value);
        });
    }

    public static all(promises: any[]) {
        let fulfilledCount = 0;
        let results = new Array(promises.length);
        return new PromiseLike((resolve, reject) => {
            promises.forEach((promise, index) => {
                PromiseLike.resolve(promise).then(
                    (value) => {
                        results[index] = value;
                        fulfilledCount++;
                        if (fulfilledCount === promises.length) {
                            resolve(results);
                        }
                    },
                    (error) => reject(error)
                );
            });
        });
    }

    public static race(promises: any[]) {
        return new PromiseLike((resolve, reject) => {
            promises.forEach((promise) => {
                PromiseLike.resolve(promise).then(
                    (value) => {
                        resolve(value);
                    },
                    (error) => reject(error)
                );
            });
        });
    }

    private callbacks: any[];
    private state: PromiseState;
    private value: any;
    constructor(callback) {
        callback(this._resolve, this._reject);
        this.callbacks = [];
        this.state = PromiseState.Pending;
        this.handle = this.handle.bind(this);
    }

    public then(onFulfilled?: (payload) => NiceAny<T>, onRejected?: (error) => NiceAny<T>) {
        return new PromiseLike((resolve, reject) => {
            this.handle({
                resolve,
                reject,
                onFulfilled,
                onRejected,
            });
        });
    }

    public catch(onRejected?: (error) => NiceAny<T>) {
        return this.then(void 0, onRejected);
    }

    public finally(onDone?: () => any) {
        if (typeof onDone !== "function") {
            return this.then();
        }
        return this.then(
            (value) => PromiseLike.resolve(onDone()).then(() => value),
            (error) => PromiseLike.reject(onDone()).then(() => { throw error })
        );
    }

    private handle({ resolve, reject, onFulfilled, onRejected }) {
        if (this.state === PromiseState.Pending) {
            this.callbacks.push({ resolve, reject, onFulfilled, onRejected });
        } else if (this.state === PromiseState.Fulfilled) {

            if (!onFulfilled) {
                resolve(this.value);
                return
            }

            try {
                resolve(onFulfilled(this.value));
            } catch (error) {
                reject(error);
            }
        } else {

            if (!onRejected) {
                reject(this.value);
                return;
            }

            try {
                reject(onRejected(this.value));
            } catch (error) {
                reject(error);
            }
        }
    }

    private _resolve(payload) {
        if (this.state !== PromiseState.Pending) {
            return;
        }
        if (payload instanceof PromiseLike) {
            payload.then(this._resolve);
            return;
        }
        this.value = payload;
        this.callbacks.forEach(this.handle);
    }

    private _reject(error) {
        if (this.state !== PromiseState.Pending) {
            return;
        }
        this.state = PromiseState.Rejected;
        this.value = error;
        this.callbacks.forEach(this.handle);
    }
}