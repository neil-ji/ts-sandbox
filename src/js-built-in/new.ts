export function newLike(constructor, ...args: any[]) {
    const obj = {};
    const result = constructor.apply(obj, args);
    if (typeof result === "function" || (typeof result === "object" && result !== null)) {
        return result;
    }
    return obj;
}