export function throttle(func, ms) {
    let runNow = true;
    return function () {
        if (!runNow) {
            return;
        }
        runNow = false;
        const id = setTimeout(() => {
            //@ts-ignore
            func.apply(this, arguments);
            runNow = true;
            clearTimeout(id);
        }, ms);
    }
}