export function shallow_copy1(target) {
    return Object.assign({}, target);
}

export function shallow_copy2(target, context = null) {
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

    if (typeof target === "object" && target !== null) {
        const result = Array.isArray(target) ? [] : {};
        for (const key in target) {
            result[key] = target[key];
        }
        return result;
    }
    return target;
}