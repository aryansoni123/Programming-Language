export type ValueType = "null"| "number";

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
