
const { flatten } = require('lodash')
const { Op,Sequelize } =require('sequelize')
const Db = require('../database/index')

const favorModel = Db.getModel('favor')

export default class Favor {

    static async like(art_id,type,uid){
        const favor = await favorModel.findOne({
            where:{
                art_id,
                type,
                uid
            }
        })
        if(favor){
            throw new Error()
        }
        //事务
        return Sequelize
    }

    static async disLike(art_id,type,uid){

    }

    static async userLikeIt(art_id,type,uid){

    }

    static async getMyClassicFavors(uid){

    }

    static async getBookFavor(uid,bookId){
        
    }
}