export function debounce(func: () => any | void, ms) {
    let id;
    return function () {
        clearTimeout(id);
        id = setTimeout(() => {
            //@ts-ignore
            func.apply(this, arguments);
        }, ms);
    }
}