import Parser from "./Frontend/parser.ts";
import { evaluate } from "./runtime/interpreter.ts";

xyz();

function xyz(){
    const parser = new Parser();
    console.log("New Lang v0.1")
    while (true){
        const input = prompt(">>> ");

        if (!input || input.includes("exit")){
            Deno.exit(1);
        }

        const program = parser.ProduceAST(input);
        //console.log(program);

        //console.log("\n----------------------\n")
        
        const result = evaluate(program);
        
        try{
            console.log(result.value);
        } catch{
            console.log(result);
        }
       
        //console.log("\n----------------------\n")
    }
}