const koaBodyParser = require('koa-bodyparser')

export const addKoaBodyParser  = app=>{
    app.use(koaBodyParser())
}