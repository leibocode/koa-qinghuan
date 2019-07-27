import config from '../config/config'

const { flatten } = require('lodash')
const { Op } =require('sequelize')
const Db = require('../database/index')

const  favorModel = Db.getModel('favor')


class Book {
    async detail(id){
        const url = '' 
        const options = {
            url:config
        }

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

module.exports = Book