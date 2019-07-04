const sequelize = require('../middwares/database')
const {
    Sequelize,
    Model
} = require('sequelize')
const {
    Favor
} = require('./favor')

export default class Book extends Model {
    async detail(id){
    }
    
    static async getMyFavorBookCount(){
        const count = await Favor.count({
            where:{
                type:400,
                uid
            }
        })
        return count
    }
}
Book.init({
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    fac_nums:{
        type:Sequelize.INTEGER,
        defaultValue:0
    }
},{
    sequelize,
    tableName:'book'  
})

