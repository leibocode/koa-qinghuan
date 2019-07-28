export class HttpException extends Error {
    constructor(msg="服务器异常",errorCode=10000,code=400){
        super();
        this.errorCode = errorCode
        this.code = code
        this.msg = msg
    }
}

export class ParamterException extends HttpException {
    constructor(msg,errorCode){
        super()
        this.code = 400
        this.msg = msg || '参数错误'
        this.errorCode = errorCode || 10000
    }
}

export class Success extends HttpException {
    constructor(msg,errorCode,data){
        super()
        this.code = 200
        this.msg = msg || 'ok'
        this.errorCode = errorCode || 0
        this.data =  data || []
    }
}

export class NotFound extends HttpException {
    constructor(msg,errorCode){
        super()
        this.msg = msg || '资源未找到'
        this.errorCode = errorCode || 10000
        this.code = 404
    }
    
}

export class CreateAt extends HttpException {
    constructor(msg,errorCode){
        super()
        this.msg = msg ||'创建成功!'
        this.errorCode = errorCode || 201
        this.code = 201
    }
}

export class AuthFailed extends HttpException {
    constructor(msg,errorCode) {
        super()
        this.msg = msg || '授权失败'
        this.errorCode = errorCode || 10004
        this.code = 401
    }
}

export class Forbbiden extends HttpException {
    constructor(msg,errorCode){
        super()
        this.msg = msg || '禁止访问'
        this.errorCode = errorCode || 10006
        this.code = 403
    }
}