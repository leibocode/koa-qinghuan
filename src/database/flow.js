const sequelize = require('../middwares/database')
const { Sequelize,Model } = require('sequelize')

export default class Flow extends Model {

}

Flow.init({
    index:Sequelize.INTEGER,
    art_id:Sequelize.INTEGER,
    type:Sequelize.INTEGER
},{
    sequelize,
    tableName:'flow'
})

