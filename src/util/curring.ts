export function curring(func) {
    const args = Array.prototype.slice.call(arguments, 1);
    function collectArgs() {
        args.push(...arguments);
        return collectArgs;
    };
    function execute() {
        //@ts-ignore
        return func.apply(this, args);
    }
    return [collectArgs, execute];
}

export function curring_test() {
    const [collectArgs, execute] = curring((...args) => {
        return args.reduce((pre, cur) => pre + cur);
    });
    //@ts-ignore
    collectArgs(1)(2)(3)(4, 5, 6)(9);
    console.log(execute());
}