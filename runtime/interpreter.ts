import { RuntimeVal, NumberVal, NullVal } from "./value.ts";
import { Program, BinaryExpression, NumericLiteral, Stmt, Identifier, VarDeclaration, AssignmentExpression, ObjectLiteral} from "../Frontend/ast.ts";
import Environment from "./environment.ts";
import { evaluate_binary_expr, eval_identifier, eval_assign_expr, eval_object_expr } from "./Eval/expressions.ts";
import { evaluate_program, eval_var_declare } from "./Eval/Statements.ts";

export function evaluate(ASTnode: Stmt, env: Environment) : RuntimeVal {
    
    switch (ASTnode.kind){

        case "NumericLiteral": {
            return {
                kind: "sankhya",
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

        case "Object": {
            return eval_object_expr(ASTnode as ObjectLiteral, env);
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