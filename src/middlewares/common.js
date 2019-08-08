/**
 * 公共的中间件
 */
import config from '../config/config'
import { verify } from '../libs/verify'

const koaBodyParser = require('koa-bodyparser')
const koaJwt = require('koa-jwt')
const logger = require('koa-logger')

export const addKoaBodyParser  = app=> {
    app.use(koaBodyParser())
}

export const addJwt = app=> {
    app.use(koaJwt({
        secret:config.secret
    }).unless({
        path:[
            /^\/api\/wechat\/token/,
            /^\/api\/classic\/test/  
        ]
    }))
}

export const verifyToken = app => {
    app.use(async(ctx,next)=>{
        try{
            const token = ctx.header.authorizetion
            if(token){
                const minJwt = token.split(' ')[1]
                let decoded = await verify(minJwt,config.secret)
                ctx.user = {
                    openid:decoded.openid,
                    session_key:decoded.session_key
                }
            }
        }catch(err){
            console.log('token verify fail: ', err)
            ctx.status = 500
            ctx.body ={
                success:false,
                err:err
            }
        }
    })
}

export const addLogger = app => {
    app.use(logger())
}
