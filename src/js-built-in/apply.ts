//@ts-nocheck

export function applyLike(context, args: any[]) {
    let TEMP = Symbol("func");
    context[TEMP] = this;
    const result = context[TEMP](...args);
    delete context[TEMP];
    return result;
}