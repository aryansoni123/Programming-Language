import { RuntimeVal } from "./value.ts";
import { MK_BOOL, MK_NULL} from "./value.ts";

function setupscope(env: Environment) {
    // Global Variables
    env.declarevar('nirastra', MK_NULL(), true)
    env.declarevar('asatya', MK_BOOL(true), true)
    env.declarevar('satya', MK_BOOL(true), true)
}

export default class Environment{

    private parent?: Environment;
    private variables: Map<string, RuntimeVal>;
    private constants: Set<string>;

    constructor(parentENV?: Environment){
        const Global = parentENV ? true: false;
        this.parent = parentENV;
        this.variables = new Map();
        this.constants = new Set();

        if (Global){
            setupscope(this);
        }
    }

    public declarevar (
        varname: string,
        value: RuntimeVal,
        constant: boolean = false
    ): RuntimeVal {

        if (this.variables.has(varname)){
            throw `Cannot declare variable ${varname}. Already declared before.`  //f-string in py
        }

        
        this.variables.set(varname, value);
        if (constant){
            this.constants.add(varname);
        }
        return value;
    }

    public assignvar( varname: string, value: RuntimeVal) {

        const env = this.resolve(varname);
        if (env.constants.has(varname)) {
            throw "Constant Variable cannot be reassigned"
        }
        env.variables.set(varname, value);        
        return value;
    }

    public lookupvar(varname: string): RuntimeVal {
        const env = this.resolve(varname);
        return env.variables.get(varname) as RuntimeVal; 
    }
    
    public resolve(varname:string): Environment {
        if (this.variables.has(varname)) {
            return this;
        }
        
        if (this.parent == undefined){
            throw `AssignmentError variable ${varname} does not exist`;
        }

        return this.resolve(varname);
    }
}