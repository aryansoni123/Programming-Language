import { RuntimeVal, NumberVal, NullVal } from "./value.ts";
import { Program, BinaryExpression, NumericLiteral, Stmt } from "../Frontend/ast.ts";

export function eval_num_Expr(
    lhs: NumberVal,
    rhs: NumberVal,
    operator: string
): NumberVal {
    let result: number;

    if(operator =='+')
        result = lhs.value + rhs.value;
    else if(operator =='-')
        result = lhs.value - rhs.value;
    else if(operator =='*')
        result = lhs.value * rhs.value;
    else if(operator =='/')
        //TODO: Zero Division Fix
        result = lhs.value / rhs.value;
    else
        result = lhs.value % rhs.value;

    return {
        kind: "number",
        value: result
    } as NumberVal;
    
}

export function evaluate_binary_expr(binop: BinaryExpression): RuntimeVal {
    const lhs = evaluate(binop.left);
    const rhs = evaluate(binop.right);

    if (lhs.kind == "number" && rhs.kind == "number"){
        return eval_num_Expr(
            lhs as NumberVal,
            rhs as NumberVal,
            binop.operator as string
        );
    } else return {
        kind: "null",
        value: "null"
    } as NullVal;



}

export function evaluate_program(program: Program): RuntimeVal {
    let lasteval: RuntimeVal = {
        kind: "null",
        value: "null"
    } as NullVal;

    for (const statement of program.body){
        lasteval = evaluate(statement);
    }

    return lasteval;
}



export function evaluate(ASTnode: Stmt) : RuntimeVal {
    
    switch (ASTnode.kind){

        case "NumericLiteral": {
            return {
                kind: "number",
                value : ((ASTnode as NumericLiteral).value)
            } as NumberVal;
        }

        case "NullLiteral": {
            return { 
                kind: "null",
                value: "null"
            } as NullVal;
        }

        case "BinaryExpression": {
            return evaluate_binary_expr(ASTnode as BinaryExpression);
        }

        case "Program": {
            return evaluate_program(ASTnode as Program);
        }

        //case "Identifier":

        default:
            console.error("This node is yet to be interpreted", ASTnode);
            Deno.exit(1);
    }

}