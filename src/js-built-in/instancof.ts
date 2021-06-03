export function instanceofLike(instance, constructor) {
    const proto = Object.getPrototypeOf(instance);
    let p = constructor.prototype;
    while (p) {
        if (p === proto) {
            return true;
        }
        p = Object.getPrototypeOf(p);
    }
    return false;
}