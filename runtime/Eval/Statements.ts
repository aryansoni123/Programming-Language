import { Program, VarDeclaration } from "../../Frontend/ast.ts";
import Environment from "../environment.ts";
import { evaluate } from "../interpreter.ts";
import { MK_NULL, NullVal, RuntimeVal } from "../value.ts";

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

export function eval_var_declare(declare: VarDeclaration, env: Environment): RuntimeVal {
    
    const value = declare.value ? evaluate(declare.value, env) : MK_NULL();

    return env.declarevar(
        declare.identifier,
        value,
        declare.constant
    )    
}    