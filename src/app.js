const koa = require('koa')

/**
 * 应用启动入口
 *
 * @class StartUp
 */
class StartUp {
    constructor(){
        this.app = new koa()
        this.useMIddwares()
    }
    useMiddleWares(app){
        //注入中间件
        
    }
    async start(){
        
    }
}

const startUp = new StartUp()

startUp.start()