# Programming Language Interpreter  

A custom **programming language interpreter** built in **TypeScript** using **Deno**, demonstrating core concepts of compiler and interpreter design such as **lexical analysis, parsing, abstract syntax tree (AST), runtime evaluation, and closures**.  

## 📌 Features  
- **Lexer**: Converts raw source code into tokens.  
- **Parser**: Produces an **Abstract Syntax Tree (AST)** from tokens.  
- **Runtime Environment**: Supports variable scoping, user-defined functions, and closures.  
- **Evaluator**: Executes statements and expressions from the AST.  
- **Built-in Functions**: Includes a `print` function and other runtime utilities.  

## 📂 Project Structure  
```
ep11-user-defined-functions/
│── main.ts                  # Entry point, runs the interpreter
│── test.txt                 # Example program input
│── frontend/
│    ├── lexer.ts            # Lexical analysis
│    ├── parser.ts           # Parser for AST generation
│    └── ast.ts              # AST node definitions
│── runtime/
     ├── environment.ts      # Execution environment with variable scoping
     ├── interpreter.ts      # Evaluator for running AST
     ├── values.ts           # Runtime value definitions
     └── eval/
          ├── expressions.ts # Expression evaluation
          └── statements.ts  # Statement evaluation
```  

## 🛠️ Technologies Used  
- **TypeScript**  
- **Deno Runtime**  

## 🚀 Getting Started  

### 1. Install Deno  
Follow the installation guide: [https://deno.land/](https://deno.land/)  

### 2. Clone the Repository  
```bash
git clone https://github.com/your-username/Programming-Language.git
cd Programming-Language
```

### 3. Run the Interpreter  
```bash
deno run --allow-read main.ts
```

### 4. Example Program  
`test.txt`  
```js
fn makeAdder (offset) {
  fn add (x, y) {
    x + y + offset
  }
  add
}

const adder = makeAdder(1);
print(adder(10, 5))   # Output: 16
```  

## 🎯 Learning Outcomes  
- Fundamentals of **interpreter and compiler design**  
- Hands-on experience with **lexers, parsers, and ASTs**  
- Practical application of **scoping, closures, and functional programming concepts**  

## 📜 License  
This project is licensed under the MIT License.  
