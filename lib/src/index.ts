import { ValueOf } from "@ptolemy2002/ts-utils";
import isCallable from "is-callable";
import cloneDeep from "lodash.clonedeep";

export type ArrayOptional<T = any> = T[] | null | undefined;
export type ObjectOptional<T = Object> = T | null | undefined;

export function listsEqual(a: ArrayOptional, b: ArrayOptional): boolean {
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

export function objectsEqual(a: ObjectOptional, b: ObjectOptional): boolean {
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

export function listSwap<T>(list: T[], i: number, j: number): T[] {
    if (i !== Math.floor(i)) throw new TypeError("i must be an integer");
    if (j !== Math.floor(j)) throw new TypeError("j must be an integer");
    if (i < 0 || i >= list.length) throw new RangeError("i out of bounds");
    if (j < 0 || j >= list.length) throw new RangeError("j out of bounds");

    const newList = [...list];
    const temp = newList[i];
    newList[i] = newList[j];
    newList[j] = temp;
    return newList;
}

export function listRemove<T>(list: T[], i: number): T[] {
    if (i !== Math.floor(i)) throw new TypeError("i must be an integer");
    if (i < 0 || i >= list.length) throw new RangeError("i out of bounds");

    const newList = [...list];
    newList.splice(i, 1);
    return newList;
}

export function listPush<T>(list: T[], item: T): T[] {
    return [...list, item];
}

export function listSet<T>(list: T[], i: number, item: T): T[] {
    if (i !== Math.floor(i)) throw new TypeError("i must be an integer");
    if (i < 0 || i >= list.length) throw new RangeError("i out of bounds");

    const newList = [...list];
    newList[i] = item;
    return newList;
}

export function isSet(list: any[]): boolean {
    const seen = [];
    for(let i = 0; i < list.length; i++) {
        if (seen.includes(list[i])) return false;
        seen.push(list[i]);
    }
    return true;
}

export function listDifference<T>(a: ArrayOptional<T>, b: ArrayOptional<T>): ObjectOptional<Record<number, T>> {
    if (a === b) return {};
    if (!a || !b) return b;

    const result = {};
    a.forEach((element, i) => {
        if (b[i] !== element) {
            if (Array.isArray(element) && Array.isArray(b[i])) {
                result[i] = listDifference(element, b[i]);
                if (result[i].length === 0) delete result[i];
            } else if (typeof element === "object" && typeof b[i] === "object") {
                result[i] = objectDifference(element, b[i]);
                if (Object.keys(result[i]).length === 0) delete result[i];
            } else {
                result[i] = b[i];
            }
        }
    });

    if (b.length > a.length) {
        for (let i = a.length; i < b.length; i++) {
            result[i] = b[i];
        }
    }

    return result;
}

export type ObjectDifferenceResult<T> = {
    [P in keyof T]?:
        T[P] extends any[] ? Record<number, ValueOf<T[P]>>
        : T[P] extends Object ? Record<keyof T[P], ValueOf<T[P]>>
        : T[P];
};
export function objectDifference<T>(a: ObjectOptional<T>, b: ObjectOptional<T>): ObjectOptional<T | ObjectDifferenceResult<T>> {
    if (a === b) return {};
    if (!a || !b) return b;

    const result: any = {};
    for (const key in a) {
        if (b[key] !== a[key]) {
            if (Array.isArray(a[key]) && Array.isArray(b[key])) {
                result[key] = listDifference(a[key], b[key]);
            } else if (typeof a[key] === "object" && typeof b[key] === "object") {
                result[key] = objectDifference(a[key], b[key]);
            } else {
                result[key] = b[key];
            }
        }
    }

    for (const key in b) {
        if (!a.hasOwnProperty(key)) {
            result[key] = b[key];
        }
    }

    return result;
}

export function flattenKeys<T>(obj: T, prefix: string = ""): Record<string, ValueOf<T>> {
    const result = {};
    for (const key in obj) {
        if (Array.isArray(obj[key])) {
            const flat = flattenKeys(obj[key], prefix + key + ".");
            Object.assign(result, flat);
            if (Object.keys(flat).length === 0) result[prefix + key] = obj[key];
        } else if (typeof obj[key] === "object") {
            const flat = flattenKeys(obj[key], prefix + key + ".");
            Object.assign(result, flat);
            if (Object.keys(flat).length === 0) result[prefix + key] = obj[key];
        } else {
            result[prefix + key] = obj[key];
        }
    }
    return result;
}

export type SortCallback = (a: number, b: number) => number;
export function sortWithIndeces<T>(toSort: T[], sort: SortCallback = () => 0, descending: boolean = false): T[] {
    return Array.from(toSort.keys()).sort((a, b) => sort(a, b) * (descending ? -1 : 1)).map((i) => toSort[i]);
}

export function objectToString(obj: Object): string {
    return JSON.stringify(obj, (_, v) => v === undefined ? null : v);
}