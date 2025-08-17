import Parser from "./Frontend/parser.ts";
import Environment from "./runtime/environment.ts";
import { evaluate } from "./runtime/interpreter.ts";
import { MK_BOOL, MK_NULL, MK_NUMBER } from "./runtime/value.ts"

xyz();

function xyz(){
    const parser = new Parser();
    const env = new Environment();
    env.declarevar('x', MK_NULL())
    env.declarevar('y', MK_NUMBER(429))
    env.declarevar('z', MK_BOOL(true))
    console.log("New Lang v0.1")
    while (true){
        const input = prompt(">>> ");

        if (!input || input.includes("exit")){
            Deno.exit(1);
        }

        const program = parser.ProduceAST(input);
        //console.log(program);

        //console.log("\n----------------------\n")
        
        const result = evaluate(program, env);
        
        console.log(result);
       
        //console.log("\n----------------------\n")
    }
}


// 24:18