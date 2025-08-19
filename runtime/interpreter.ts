import { RuntimeVal, NumberVal, NullVal, MK_NULL } from "./value.ts";
import { Program, BinaryExpression, NumericLiteral, Stmt, Identifier, VarDeclaration, AssignmentExpression, Expression } from "../Frontend/ast.ts";
import Environment from "./environment.ts";

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

export function evaluate_binary_expr(binop: BinaryExpression, env: Environment): RuntimeVal {
    const lhs = evaluate(binop.left,env );
    const rhs = evaluate(binop.right, env);

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

export function evaluate_program(program: Program, env: Environment): RuntimeVal {
    let lasteval: RuntimeVal = {
        kind: "null",
        value: "null"
    } as NullVal;

    for (const statement of program.body){
        lasteval = evaluate(statement, env);
    }

    return lasteval;
}

function eval_identifier(iden: Identifier, env: Environment): RuntimeVal {
    const val = env.lookupvar(iden.name);
    return val;
}

function eval_var_declare(declare: VarDeclaration, env: Environment): RuntimeVal {
    
    const value = declare.value ? evaluate(declare.value, env) : MK_NULL();

    return env.declarevar(
        declare.identifier,
        value,
        declare.constant
    )
}

function eval_assign_expr(AssignExpr: AssignmentExpression, env: Environment): RuntimeVal {
    if (AssignExpr.assigne.kind !== "Identifier") {
        throw  `Need a proper Assigne.`
    }
    const varname = ((AssignExpr.assigne)as Identifier).name;
    return env.assignvar(varname, evaluate(AssignExpr.value, env))
}

export function evaluate(ASTnode: Stmt, env: Environment) : RuntimeVal {
    
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
            return evaluate_binary_expr(ASTnode as BinaryExpression, env);
        }

        case "Program": {
            return evaluate_program(ASTnode as Program, env);
        }

        case "Identifier": {
            return eval_identifier(ASTnode as Identifier, env);
        }

        case "VarDeclaration": {
            return eval_var_declare(ASTnode as VarDeclaration, env);
        }

        case "AssignmentExpression": {
            return eval_assign_expr(ASTnode as AssignmentExpression, env);
        }

        default:
            console.error("This node is yet to be interpreted", ASTnode);
            Deno.exit(1);
    }

}