export function flat_recursion(nestedArray: any[]) {
    const result: any[] = [];
    return (function dfs(arr: any[]) {
        arr.forEach((item) => {
            if (Array.isArray(item)) {
                dfs(item);
            } else {
                result.push(item);
            }
        });
        return result;
    })(nestedArray);
}

export function flat_toString(nestedArray: any[]) {
    const flatArrayString = nestedArray.toString();
    const result: number[] = [];
    for (const s of flatArrayString) {
        if (s === ",") {
            continue;
        }
        result.push(+s);
    }
    return result;
}

export function flat_reduce(nestedArray: any[]) {
    return nestedArray.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? flat_recursion(cur) : cur);
    }, []);
}