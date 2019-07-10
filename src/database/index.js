import config from '../config/config'
const Sequelize = require('sequelize')
const fs = require('fs')
const path = require('path')

const {  user,database,port,password,host} = config.mysql
 
class MySql {
    constructor(){
        this.sequelize = new Sequelize(database,user,password,{
            dialect:'mysql',
            host:host,
            port:port
        })
        this.db = {}
        this.Op = this.sequelize.Op
        this.loadModelsAsync()
    }

    loadModelsAsync(){
        fs.readdirSync(path.join(__dirname,'./models'))
          .forEach(module=>{
            const key = module.split('.')[0]
            const model = this.sequelize['import'](path.join(__dirname,`./models/${module}`))
            this.db[model.name] = model
        })
    }

    _format(query={},offect=0,limit=100,includeTabs = []){
        let _includeTabs = []
        for(let key of includeTabs){
            _includeTabs.push({
                model:this.db[key]
            })
        }
        return {
            where:query,
            offect:Number(offect-1)*Number(limit),
            limit:Number(limit),
            include:_includeTabs
        }
    }

    async findAll(tables,query,offect,limit){
        console.log(this.db)
        const result = await this.db[tables].findAll(this._format(query,offect,limit))
        return result
    }

    async findOne(tables,query){
        const result = await this.db[tables].findOne({
            where:query
        })
        return result
    }

    getModel(tables){
        return this.db[tables]
    }

    get(){
        return this.sequelize
    }
}

module.exports = new MySql()