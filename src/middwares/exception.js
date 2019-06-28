import { HttpException } from '../libs/http-exception'
import config from '../config/config'
export default async function catchError(ctx,next){
    try{
        await next()
    }catch(error){
        const isDev = config.env === 'dev'
        const isHttpException = error instanceof HttpException
        
        if(isDev && isHttpException){
            throw error
        }

        if(isHttpException){
            ctx.body = {
                msg:error.msg,
                errorCode:error.errorCode,
                request:`${ctx.method} ${ctx.path}`
            }
            ctx.status = error.code
        }else {
            ctx.body = {
                msg:'非业务错误,系统发生位置错误',
                error_code:999,
                request:`${ctx.method} ${ctx.path}`
            }
            //存储到数据库中
            
            ctx.status = 500
        }
    }
}
