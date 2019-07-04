const {
    LinValidator,
    Rule
} = require('./lin-validator-v2')


export class PositiveIntegerValidator extends LinValidator {
    constructor(){
        super()
        this.id = [
            new Rule('isInt','需要正整数',{
                min:1
            })
        ]
    }
}

