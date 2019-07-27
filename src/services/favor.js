import { NotFound } from '../libs/http-exception'

const { flatten } = require('lodash')
const { Op,Sequelize } =require('sequelize')
const Db = require('../database/index')

const favorModel = Db.getModel('favor')
const sequelize = Db.get()
const ArtSvc = require('./art')


class Favor {
    /**
     * 点赞
     * @param {*} art_id 
     * @param {*} type 
     * @param {*} uid 
     */
    static async like(art_id,type,uid){
        const favor = await favorModel.findOne({
            where:{
                art_id,
                type,
                uid
            }
        })
        if(favor){
            throw new NotFound()
        }
        //事务
        return sequelize.transaction(async t =>{
            await favorModel.create({
                art_id,
                type,
                uid
            },{
                transaction:t
            })
            const art = await ArtSvc.getData(art_id,type,false)
            await art.increment('fav_nums',{
                by:1,
                transaction:t
            })
        })
    }

    /**
     * 取消点赞
     * @param {*} art_id 
     * @param {*} type 
     * @param {*} uid 
     */
    static async disLike(art_id,type,uid){
        const favor = await favorModel.findOne({
            where:{
                art_id,
                type,
                uid
            }
        })
        if(!favor){
            throw new NotFound()
        }
        return sequelize.transaction(async t =>{
            await favorModel.destroy({
                force:true,
                transaction:t
            })
            const art = await ArtSvc.getData(art_id,type,false)
            await art.decrement('fav_nums', {
                by: 1,
                transaction: t
            })
        })
    }

    /**
     * 当前期刊登陆的用户是否点赞
     * @param {*} art_id 
     * @param {*} type 
     * @param {*} uid 
     */
    static async userLikeIt(art_id,type,uid){
        const favor = await favorModel.findOne({
            where:{
                uid,
                art_id,
                type
            }
        })
        return favor?1:0
    }

    /**
     * 获取我点赞所有期刊
     * @param {*} uid 
     */
    static async getMyClassicFavors(uid){
        const arts = await favorModel.findAll({
            uid,
            type:{
                [Op.not]:200
            }
        })
        if(!arts){
            throw new Error()
        }
        return await ArtSvc.getList(arts)
    }

    /**
     * 当前书本点赞个数
     * @param {*} uid 
     * @param {*} bookId 
     */
    static async getBookFavor(uid,bookId){
        const favorNums =await favorModel.count({
            where:{
                art_id:bookId,
                type:400
            }
        })
        const myFavor = await favorModel.findOne({
            where:{
                art_id:bookId,
                uid,
                type:400
            }
        })
        return {
            fav_nums:favorNums,
            like_status:myFavor?1:0
        }
    }
}

module.exports = Favor