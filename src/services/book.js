const { flatten } = require('lodash')
const { Op } =require('sequelize')
const Db = require('../database/index')

const  favorModel = Db.getModel('favor')


export default class Book {
    async detail(id){

    }
    
    static async getMyFavorBookCount(){
        const count = await favorModel.count({
            where:{
                type:400,
                uid
            }
        })
        return count 
    }

    static async searchFromYushu(q,start,count){
        
    }
}