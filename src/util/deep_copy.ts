export function deep_copy_test() {
    const b = {};
    const obj = {
        a: 0, // number
        b: "b", // string
        c: true, // boolean
        d: 5n, // bigint
        e: {},
        f: undefined,
        g: null,
        h: /^123$/gi,
        i: new Date(),
        j: new Promise((resolve) => {
            setTimeout(() => {
                resolve(5);
            }, 1000);
        }),
        k: {
            a: 0, // number
            b: "b", // string
            c: true, // boolean
            d: 5n, // bigint
            e: {},
            f: undefined,
            g: null,
            h: /^123$/gi,
            i: new Date(),
            j: new Promise((resolve) => {
                setTimeout(() => {
                    resolve(5);
                }, 1000);
            }),
        },
        l: {
            a: b
        }
    };
    b["a"] = obj.l;

    const newObj = deep_copy(obj);

    console.log(newObj);
}

export function deep_copy(object: any): any {
    const objRef = new Map();
    return (function dfs(target: any, context: object | null = null) {
        // circular reference
        if (objRef.has(target)) {
            return objRef.get(target);
        }

        // Symbol
        // Symbol is initial form type, no need to copy a new one.
        // if (typeof target === "symbol") {
        //     return Symbol(target.toString().match(/(?<=Symbol\().*(?=\))/)?.toString());
        // }

        // function
        if (typeof target === "function") {
            const newFunc = function () {
                return target.apply(context, Array.from(arguments));
            };
            newFunc.prototype = Object.create(target.prototype);
            return newFunc;
        }

        // [object Promise]
        if (target instanceof Promise) {
            return new Promise((resolve, reject) => {
                target.then(
                    (value) => resolve(value),
                    (error) => reject(error)
                );
            });
        }

        // [object RegExp]
        if (target instanceof RegExp) {
            return new RegExp(target.source, target.flags);
        }

        // [object Date]
        if (target instanceof Date) {
            return new Date(target);
        }

        // [object Object]
        if (typeof target === "object" && target !== null) {
            const result = Array.isArray(target) ? [] : {};
            objRef.set(target, result);
            for (const key in target) {
                const prop = target[key];
                result[key] = dfs(prop, result);
            }
            return result;
        }

        return target;
    })(object);
}