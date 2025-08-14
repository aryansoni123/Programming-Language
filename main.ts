import Parser from "./Frontend/parser.ts";

xyz();

function xyz(){
    const parser = new Parser();
    console.log("New Lang 1.0")
    while (true){
        const input = prompt(">>> ");

        if (!input || input.includes("exit")){
            Deno.exit(1);
        }

        const program = parser.ProduceAST(input);
        console.log(program);
    }
}