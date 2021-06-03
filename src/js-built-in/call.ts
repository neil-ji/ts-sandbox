export function callLike(context, ...args) {
    const TEMP_FUNC = Symbol("func");
    context[TEMP_FUNC] = this;
    const result = context[TEMP_FUNC](...args);
    delete context[TEMP_FUNC];
    return result;
}