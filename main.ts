import Parser from "./Frontend/parser.ts";
import { CreateGlobalEnv } from "./runtime/environment.ts";
import { evaluate } from "./runtime/interpreter.ts";

//xyz();

run('test.txt')

async function run(filename: string) {
    const parser = new Parser();
    const env = CreateGlobalEnv();
    //console.log(env.lookupvar("satya"));
    
    const input = await Deno.readTextFile(filename);
    const program = parser.ProduceAST(input);
    //console.log(program.body);
    const result = evaluate(program, env);
    
    console.log(result);
    
}

function xyz(){
    const parser = new Parser();
    const env = CreateGlobalEnv();
    //console.log(env.lookupvar("satya"));

    console.log(env.lookupvar)

    console.log("New Lang v0.1")
    while (true){
        const input = prompt(">>> ");

        if (!input || input.includes("exit")){
            Deno.exit(1);
        }

        const program = parser.ProduceAST(input);
        const result = evaluate(program, env);
        console.log(result);
    }
}


// 24:18