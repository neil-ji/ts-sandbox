export function bindLike(context: ThisType<any>, ...args: any[]): () => any {
    const self: Function = this;

    function newFunc(..._args) {
        // 使用new 时，this 指向实例，则有this instanceof self 为true；
        return self.apply(this instanceof self ? this : context, [...args, ..._args]);
    };

    newFunc.prototype = self.prototype;

    return newFunc;
}