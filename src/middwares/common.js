/**
 * 公共的中间件
 */
import config from '../config/config'

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
        //配置规则
    }))
}

export const addLogger = app => {
    app.use(logger())
}
