const sequelize = require('../middwares/database')
const {
    Sequelize,
    Model
} = require('sequelize')

export default class Book extends Model {
    async detail(id){
    }
    
    static async getMyFavorBookCount(){

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

