import { BinaryExpression, AssignmentExpression, Identifier, ObjectLiteral } from "../../Frontend/ast.ts";
import Environment from "../environment.ts";
import { evaluate } from "../interpreter.ts";
import { NumberVal, RuntimeVal, NullVal, ObjectVal } from "../value.ts";

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
        kind: "sankhya",
        value: result
    } as NumberVal;    
    
}    

export function evaluate_binary_expr(binop: BinaryExpression, env: Environment): RuntimeVal {
    const lhs = evaluate(binop.left,env );
    const rhs = evaluate(binop.right, env);
    
    if (lhs.kind == "sankhya" && rhs.kind == "sankhya"){
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

export function eval_assign_expr(AssignExpr: AssignmentExpression, env: Environment): RuntimeVal {
    if (AssignExpr.assigne.kind !== "Identifier") {
        throw  `Need a proper Assigne.`
    }
    const varname = ((AssignExpr.assigne)as Identifier).name;
    return env.assignvar(varname, evaluate(AssignExpr.value, env))
}

export function eval_identifier(iden: Identifier, env: Environment): RuntimeVal {
    const val = env.lookupvar(iden.name);
    return val;
}    

export function eval_object_expr (obj: ObjectLiteral, env: Environment ) : RuntimeVal{
    const object = {
        kind: "object",
        property: new Map()
    } as ObjectVal

    for( const {key, value} of obj.property){
        
        const val = (value == undefined) ? env.lookupvar(value) : evaluate(value, env);

        object.property.set(key, val);
    }

    return object;
}