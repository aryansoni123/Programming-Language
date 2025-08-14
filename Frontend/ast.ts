// Frontend/ast.ts
// This file defines the structure of the Abstract Syntax Tree (AST) nodes

// The AST is used to represent the structure of the code in a way that is easy to understand
export type NodeType = 
    "Program" |
    "NumericLiteral" |
    "Identifier" |
    "BinaryExpression";

// The Stmt interface is the base interface for all AST nodes
export interface Stmt {
    kind: NodeType;
}

// The Program interface represents the root of the AST
export interface Program extends Stmt{
    kind: "Program";
    body: Stmt[]; 
}

// The Expression interface is used for all expressions in the AST

export interface Expression extends Stmt{}

// The BinaryExpression interface represents a binary expression in the AST
export interface BinaryExpression extends Expression {
    kind: "BinaryExpression";
    left: Expression;
    right: Expression;
    operator: string;
}

// The Identifier interface represents an identifier in the AST
export interface Identifier extends Expression {
    kind: "Identifier";
    name: string;
}

// The NumericLiteral interface represents a numeric literal in the AST
export interface NumericLiteral extends Expression {
    kind: "NumericLiteral";
    value: number;
}