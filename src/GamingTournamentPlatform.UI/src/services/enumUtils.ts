import { LookupEntity } from "models/LookupEntity";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function enumToArray(enumObject: any): string[] {
    return Object.keys(enumObject)
        .filter((value) => isNaN(Number(value)) === false)
        .map((key) => enumObject[key]);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function enumToLookupArray(enumObject: any): LookupEntity[] {
    return Object.keys(enumObject)
        .filter((value) => isNaN(Number(value)) === false)
        .map((key) => ({ id: Number(key), name: enumObject[key] as string }));
}
