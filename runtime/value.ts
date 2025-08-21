export type ValueType = "null" | "sankhya" | "boolean" | "object";

export interface RuntimeVal {
    kind: ValueType;
}

export interface NullVal extends RuntimeVal {
    kind: "null",
    value: "null";
}

export interface NumberVal extends RuntimeVal {
    kind: "sankhya",
    value: number;
}

export interface BoolVal extends RuntimeVal {
    kind: "boolean",
    value: boolean;
}

export interface ObjectVal extends RuntimeVal {
    kind: "object",
    property: Map<string, RuntimeVal>;
}

//Creation Functions

export function MK_NUMBER(n = 0){
    return {
        kind: "sankhya",
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