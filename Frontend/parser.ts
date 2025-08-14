import { Stmt, Program, BinaryExpression, Identifier, NumericLiteral, Expression } from "./ast.ts";
import { Tokenize, Token, TokenType} from "./lexer.ts";

/**
 * Parser class: Converts a stream of tokens into an Abstract Syntax Tree (AST).
 */
export default class Parser {

    // Stores the current list of tokens to be parsed.
    private tokens: Token[] = [];

    /**
     * Checks if the parser has not reached the end of the token stream.
     * @returns {boolean} True if not at EOF, false otherwise.
     */
    private not_eof(): boolean{
        return this.tokens[0].type != TokenType.EOF;
    }

    /**
     * Main entry point: Produces an AST from source code.
     * @param {string} sourcecode - The source code to parse.
     * @returns {Program} The root AST node.
     */
    public ProduceAST(sourcecode: string): Program{

        // Tokenize the input source code.
        this.tokens = Tokenize(sourcecode);

        // Create the root Program node.
        const program: Program = {
            kind: "Program",
            body: [],
        }

        // Parse statements until EOF is reached.
        while(this.not_eof()){
            program.body.push(this.parse_Stmt());
        }        
        return program

    }

    /**
     * Parses a statement.
     * For now, only expressions are supported as statements.
     * @returns {Stmt} The parsed statement node.
     */
    private parse_Stmt(): Stmt {
        // For upcoming Stmt types, expand here.
        return this.parse_Expr();
    }

    /**
     * Parses an expression.
     * @returns {Expression} The parsed expression node.
     */
    private parse_Expr(): Expression {
        return this.parse_adictive_Expr();
    }

    /**
     * Parses additive expressions (e.g., 10 + 8 - 9).
     * Handles left-associative chains of '+' and '-'.
     * @returns {Expression} The parsed expression node.
     */
    private parse_adictive_Expr(): Expression {
        let left = this.parse_multiplicative_Expr();

        // Continue parsing as long as the next token is '+' or '-'.
        while (this.at().value == '+' || this.at().value == '-'){
            const operator = this.eat().value; // Consume operator
            const right = this.parse_multiplicative_Expr(); // Parse right operand

            // Build a BinaryExpression node.
            left = {
                kind: "BinaryExpression",
                left,
                right,
                operator
            } as BinaryExpression;
        }
        return left;
    }

    /**
     * Parses multiplicative expressions (e.g., 10 * 8 / 9 % 2).
     * Handles left-associative chains of '*', '/', '%'.
     * @returns {Expression} The parsed expression node.
     */
    private parse_multiplicative_Expr(): Expression {
        let left = this.parse_primary_Expr();

        // Continue parsing as long as the next token is '*', '/', or '%'.
        while (
            this.at().value == '*' || this.at().value == '/' || this.at().value == '%'
        ){
            const operator = this.eat().value; // Consume operator
            const right = this.parse_primary_Expr(); // Parse right operand

            // Build a BinaryExpression node.
            left = {
                kind: "BinaryExpression",
                left,
                right,
                operator
            } as BinaryExpression;
        }
        return left;
    }
    
    /**
     * Returns the current token without consuming it.
     * @returns {Token} The current token.
     */
    private at(): Token {
        return this.tokens[0];
    }

    /**
     * Consumes and returns the current token.
     * @returns {Token} The consumed token.
     */
    private eat(){
        const prev = this.tokens.shift() as Token;
        return prev;
    }

    /**
     * Consumes the current token and checks its type.
     * Throws an error if the type does not match.
     * @param {TokenType} type - Expected token type.
     * @param {any} error - Error message to display.
     * @returns {Token} The consumed token.
     */
    private expect(type : TokenType, error: any) {
        const prev = this.eat()
        if (!prev.type || prev.type!==type){
            console.error("Parser Error:\n", error, prev, "- Expecting: ", type);
            Deno.exit(1);
        }
        return prev;
    }

    /**
     * Parses a primary expression:
     * - Identifier (variable names)
     * - Numeric literals (numbers)
     * - Parenthesized expressions
     * Throws an error for unexpected tokens.
     * @returns {Expression} The parsed primary expression node.
     */
    private parse_primary_Expr(): Expression {
        const tk = this.tokens[0].type;

        switch (tk) {
            case TokenType.Identifier:
                // Parse variable name
                return {
                    kind: "Identifier",
                    name: this.eat().value
                } as Identifier;

            case TokenType.Number:
                // Parse numeric literal
                return {
                    kind: "NumericLiteral",
                    value: parseFloat(this.eat().value)
                } as NumericLiteral;

            case TokenType.OpenParen: {
                // Parse parenthesized expression
                this.eat(); // Consume '('
                const value = this.parse_Expr(); // Parse inner expression
                this.expect(TokenType.CloseParen, ""); // Ensure closing ')'
                return value;
            }

            default:
                // Unexpected token: throw error and exit
                console.error("Unexpected Token Found during Parsing ", this.at());
                Deno.exit(1);
        }
    }
}