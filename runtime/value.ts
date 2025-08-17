export type ValueType = "null" | "number" | "boolean";

export interface RuntimeVal {
    kind: ValueType;
}

export interface NullVal extends RuntimeVal {
    kind: "null",
    value: "null";
}

export interface NumberVal extends RuntimeVal {
    kind: "number",
    value: number;
}

export interface BoolVal extends RuntimeVal {
    kind: "boolean",
    value: boolean;
}

export function MK_NUMBER(n = 0){
    return {
        kind: "number",
        value: n
    } as NumberVal;

}

export function MK_BOOL(bool: boolean) {
    return {
        kind: "boolean",
        value: bool
    } as BoolVal;
}

export function MK_NULL() {
    return {
        kind: "null",
        value: "null"
    } as NullVal;
}