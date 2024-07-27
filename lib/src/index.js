import isCallable from "is-callable";

export function listsEqual(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b)) return false;
    if (a === b) return true;
    if (!a || !b) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; ++i) {
        if (Array.isArray(a[i]) && Array.isArray(b[i])) {
            if (!listsEqual(a[i], b[i])) return false;
        } else if (typeof a[i] === "object" && typeof b[i] === "object") {
            if (!objectsEqual(a[i], b[i])) return false;
        } else if (a[i] !== b[i]) {
            return false;
        }
    }

    return true;
}

export function objectsEqual(a, b) {
    if (!(typeof a === "object" && !Array.isArray(a)) || !(typeof b === "object" && !Array.isArray(b))) return false;
    if (a === b) return true;
    if (!a || !b) return false;
    if (Object.keys(a).length !== Object.keys(b).length) return false;

    for (const key in a) {
        if (Array.isArray(a[key]) && Array.isArray(b[key])) {
            if (!listsEqual(a[key], b[key])) return false;
        } else if (typeof a[key] === "object" && typeof b[key] === "object") {
            if (!objectsEqual(a[key], b[key])) return false;
        } else if (a[key] !== b[key]) {
            return false;
        }
    }

    return true;
}

export function listSwap(list, i, j) {
    const newList = [...list];
    const temp = newList[i];
    newList[i] = newList[j];
    newList[j] = temp;
    return newList;
}

export function listRemove(list, i) {
    const newList = [...list];
    newList.splice(i, 1);
    return newList;
}

export function listPush(list, element) {
    return [...list, element];
}

export function listSet(list, i, element) {
    const newList = [...list];
    newList[i] = element;
    return newList;
}

export function isSet(list) {
    const seen = [];
    for(let i = 0; i < list.length; i++) {
        if (seen.includes(list[i])) return false;
        seen.push(list[i]);
    }
    return true;
}

export function listDifference(a, b, keyConvert=null, valueConvert=null) {
    if (!isCallable(keyConvert)) keyConvert = (x) => x;
    if (!isCallable(valueConvert)) valueConvert = (x) => x;

    const result = {};
    a.forEach((element, i) => {
        if (b[i] !== element) {
            if (Array.isArray(element) && Array.isArray(b[i])) {
                const k = keyConvert(i, element, b[i]);
                result[k] = listDifference(element, b[i], keyConvert, valueConvert);
                if (result[k].length === 0) delete result[k];
            } else if (typeof element === "object" && typeof b[i] === "object") {
                const k = keyConvert(i, element, b[i]);
                result[k] = objectDifference(element, b[i], keyConvert, valueConvert);
                if (Object.keys(result[k]).length === 0) delete result[k];
            } else {
                result[keyConvert(i, element, b[i])] = valueConvert(b[i], i, element);
            }
        }
    });

    if (b.length > a.length) {
        for (let i = a.length; i < b.length; i++) {
            result[keyConvert(i, undefined, b[i])] = valueConvert(b[i], i, undefined);
        }
    }

    return result;
}

export function objectDifference(a, b, keyConvert=null, valueConvert=null) {
    if (!isCallable(keyConvert)) keyConvert = (x) => x;
    if (!isCallable(valueConvert)) valueConvert = (x) => x;

    const result = {};
    for (const key in a) {
        if (b[key] !== a[key]) {
            if (Array.isArray(a[key]) && Array.isArray(b[key])) {
                result[keyConvert(key, a[key], b[key])] = listDifference(a[key], b[key], keyConvert, valueConvert);
            } else if (typeof a[key] === "object" && typeof b[key] === "object") {
                result[keyConvert(key, a[key], b[key])] = objectDifference(a[key], b[key], keyConvert, valueConvert);
            } else {
                result[keyConvert(key, a[key], b[key])] = valueConvert(b[key], key, a[key]);
            }
        }
    }

    for (const key in b) {
        if (!a.hasOwnProperty(key)) {
            result[keyConvert(key, undefined, b[key])] = valueConvert(b[key], key, undefined);
        }
    }

    return result;
}

export function sortWithIndeces(toSort, sort=() => 0, descending=false) {
    return Array.from(toSort.keys()).sort((a, b) => sort(a, b) * (descending ? -1 : 1)).map((i) => toSort[i]);
}

export function objectToString(obj) {
    return JSON.stringify(obj, (k, v) => v === undefined ? null : v);
}