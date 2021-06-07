export function deep_copy(object: any): any {
    const result = {};
    return (function dfs(target: any, host: any, context: object | null = null) {
        if (typeof target === "symbol") {
            return Symbol(target.toString().match(/(?<=Symbol\().*(?=\))/)?.toString());
        }

        if (typeof target === "function") {
            const newFunc = function () {
                return target.apply(context, Array.from(arguments));
            };
            newFunc.prototype = Object.create(target.prototype);
            return newFunc;
        }

        if (target instanceof Array) {
            const newItems: any[] = [];
            target.forEach((value, index) => {
                newItems[index] = dfs(host[index], value, newItems);
            });
            return newItems;
        }

        if (target instanceof Promise) {
            return new Promise((resolve, reject) => {
                target.then(
                    (value) => resolve(value),
                    (error) => reject(error)
                );
            });
        }

        if (typeof target === "object" && target !== null) {
            const keys = Object.keys(target);
            for (const key of keys) {
                host[key] = dfs(host[key], target[key], target);
            }
            return host;
        }

        return target;
    })(object, result);
}