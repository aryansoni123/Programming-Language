//0. Let x = 10;
//1. Define the types of tokens that can be used in the parser
export enum TokenType {
    Number,
    Identifier,
    BinaryOperator,
    OpenParen,
    CloseParen,
    Assignment,
    Let,
    EOF
}

const KEYWORDS: Record<string, TokenType> = {
    'Let': TokenType.Let
}


//2. Define the structure of a token// that will be used in the parser
export interface Token{
    value: string;
    type: TokenType;
}

//4. Create a function that will create a token
function token(src = "", type: TokenType): Token{
    return {value: src, type: type}
}

export function isalpha(src: string){
    return src.toLowerCase() != src.toUpperCase()
}

export function isdigit(src: string){
    const c = src.charAt(0);
    const bounds = ['0'.charAt(0), '9'.charAt(0)];
    return (c >= bounds[0] && c<= bounds[1]);
}

export function isskipable(src: string){
    return src == ' ' || src == '\n' || src == '\t';
}

//3. Create a function that will tokenize the source code
//   This function will take a string of source code and return an array of tokens
//   For example, the source code "let x = 10;" should return an array
export function Tokenize(sourcecode: string) : Token[]{
    const tokens = new Array<Token>();
    const src = sourcecode.split("");

    while(src.length > 0){
        //5. 
        if (src[0] == '('){
            tokens.push(token(src.shift(), TokenType.OpenParen));
        }else if (src[0] == ')'){
            tokens.push(token(src.shift(), TokenType.CloseParen));
        } else if (src[0] == '='){
            tokens.push(token(src.shift(), TokenType.Assignment));
        } else if (src[0] == '+' || src[0] == '-' || src[0] == '*' || src[0] == '/' || src[0] == '%'){
            tokens.push(token(src.shift(), TokenType.BinaryOperator));
        } else{
            //6. Multiple characters can be part of a number or identifier
            if (isdigit(src[0])){
                let num = "";
                while(src.length > 0 && isdigit(src[0])){
                    num += src.shift();
                }
                tokens.push(token(num, TokenType.Number));
            } else if (isalpha(src[0])){
                let iden = "";
                while(src.length > 0 && isalpha(src[0])){
                    iden += src.shift();
                }
                const reservedWords = KEYWORDS[iden]
                if (reservedWords != undefined){
                    tokens.push(token(iden, reservedWords));
                } else {
                    tokens.push(token(iden, TokenType.Identifier));
                }
            } else if (isskipable(src[0])){
                src.shift();
            } else{
                console.log("Unknown Keyword: ", src[0]);
                Deno.exit(1);
            }
        }
    }
    tokens.push(token("EndOfFile", TokenType.EOF));
    return tokens;
}

// //7. Test the Tokenize function with a sample source code
// const source = await Deno.readTextFile("test.txt");
// for (const token of Tokenize(source)){
//     console.log(token);
// }






