const koa = require('koa')
const R = require('ramda')
const { resolve } = require('path')

const r = path => resolve(__dirname,path)
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
const MiddleWares = ['database','common','router']
/**
 * 应用启动入口
 *
 * @class StartUp
 */
class StartUp {
    constructor(){
        this.app = new koa()
        this.useMiddleWares(this.app)(MiddleWares)
    }
    useMiddleWares(app){
        //注入中间件
        return R.map(R.compose(
            R.map(i=>i(app)),
            require,
            i=>`${r('./middwares')}/${i}` 
        ))
    }
    async start(){
        this.app.listen(port,host) 
        console.log(`API端启动成功,端口号${port}`)  
    }
}

const startUp = new StartUp()

startUp.start()