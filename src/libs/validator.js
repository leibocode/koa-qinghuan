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

function checkArtType(vals) {
    
}

function checkType(vals){
    let type = vals.body.type || vals.path.type
    if(!type){
        throw new Error('type是必须参数')
    }
}


export class LikeValidator extends PositiveIntegerValidator {
    constructor(){
        super()
        
    }
}

export class ClassicValidator extends LikeValidator {

}

export class AddCommentValidator extends PositiveIntegerValidator {
    constructor(){
        super()
        this.content = [
            new Rule('isLength','必须在1到12过字符之间',{
                min:1,
                max:12
            })
        ]
    }
}


export class SearchValidator extends LinValidator {
    constructor(){
        super()
        this.q = [
            new Rule('isLength','搜索关键词不能为空',{
                min:1,
                max:16
            })
        ]
        this.start = [
            new Rule('isInt','不和规范',{
                min:0,
                max:60000
            })
        ]
        this.count = [
            new Rule('isInt','不和规范',{
                min:1,
                max:20
            }),
            new Rule('isOptional','',20)
        ]
    }
}
