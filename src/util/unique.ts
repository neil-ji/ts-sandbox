export function unique_set_constructor(duplicatedArray: any[]) {
    return Array.from(new Set(duplicatedArray));
}

export function unique_set_traverse(duplicatedArray: any[]) {
    const set = new Set;
    duplicatedArray.forEach((item) => {
        if (set.has(item)) {
            return;
        }
        set.add(item);
    });
    return Array.from(set);
}

export function unique(duplicatedArray: any[]) {
    let len = duplicatedArray.length;
    for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
            if (duplicatedArray[i] === duplicatedArray[j]) {
                duplicatedArray.splice(j, 1);
                len--;
                j--;
            }
        }
    }
    return duplicatedArray;
}

export function unique_indexOf(duplicatedArray: any[]) {
    const result: any[] = [];
    duplicatedArray.forEach((item, index) => {
        if (duplicatedArray.indexOf(item) !== index) {
            return;
        }
        result.push(item);
    });
    return result;
}

export function unique_include(duplicatedArray: any[]) {
    const result: any[] = [];
    duplicatedArray.forEach((item) => {
        if (result.includes(item)) {
            return;
        }
        result.push(item);
    });
    return result;
}

export function unique_filter(duplicatedArray: any[]) {
    return duplicatedArray.filter((item, index) => {
        return duplicatedArray.indexOf(item) === index;
    });
}
