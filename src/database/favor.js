import Art from './art'
const {
    sequelize
} = require('../middwares/database')
const { Sequelize,Model,Op } = require('sequelize')


class Favor extends Model {
    static async like(art_id,type,uid){
        const favor = await Favor.findOne({
            where:{
                art_id,
                type,
                uid
            }
        })
        if(favor){
            //抛出异常
        }
        return sequelize.transaction(async t=>{
            await Favor.create({
                art_id,
                type,
                uid
            },{
                transaction:t
            })
            const art = await Art.getDate(art_id,type,false)
            await art.increment('fav_nums',{
                by:1,
                transaction:t
            })
        })
    }

    static async disLike(art_id,type,uid){
        
    }
}

Favor.init({
    uid:Sequelize.INTEGER,
    art_id:Sequelize.INTEGER,
    type:Sequelize.INTEGER
},{
    sequelize,
    tableName:'favor'
})

