const { flatten } = require('lodash')
const { Op } =require('sequelize')
const Db = require('../database/index')

const Movie = Db.getModel('movie')
const Sentence = Db.getModel('sentence')
const Music = Db.getModel('music')
const Favor = Db.getModel('favor')

 class Art {
    constructor(art_id,type) {
        this.art_id = art_id
        this.type = type
    }

    static async getDetail(uid) {
        
    }

    static async _getListByType(ids,type){
        
    }

    static async getList(artInfoList){
        const artInfoObj = {
            100:[],
            200:[],
            300:[]
        }
        for(let artInfo of artInfoList){
            artInfoObj[artInfo.type].push(artInfo.art_id)
        }
        const arts = []
        for(let key in artInfoObj){
            const ids = artInfoObj[key]
            if(ids.length ===0){
                continue
            }
            key = parseInt(key)
            arts.push(await Art._getListByType(ids,key))
        }
        return flatten(arts)
    }

    static async getData(art_id,type){
        let art = null
        const finder = {
            where:{
                id:art_id
            }
        }
        switch(type){
            case 100:
                art = await Movie.findOne(finder)
                break;
            case 200:
                art = await Music.findOne(finder)
                break;
            case 300:
                art = await Sentence.findOne(finder)
                break;
            default:
                break;
        }
        return art;
    }
}

module.exports = Art