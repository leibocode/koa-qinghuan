// import FavorSvc from './favor'

const { flatten } = require('lodash')
const { Op } =require('sequelize')
const Db = require('../database/index')

const Movie = Db.getModel('movie')
const Sentence = Db.getModel('sentence')
const Music = Db.getModel('music')
const Favor = Db.getModel('favor')
const Book = Db.getModel('book')
 class Art {
    constructor(art_id,type) {
        this.art_id = art_id
        this.type = type
    }

    async getDetail(uid) {
        // const art = await Art.getData(this.art_id,this.type)
        // if(!art){
        //     throw new Error()
        // }
        // const like = await FavorSvc.userLikeIt(this.art_id,this.type,uid) 
        // return {
        //     art,
        //     like_status:like
        // }
    }

    static async _getListByType(ids,type){
        let arts = []
        const finder = {
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        }
        switch(type){
            case 100:
                arts = await Movie
        }
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
            case 400:
                 art = await Book.findOne(finder)
                break;
            default:
                break;
        }
        return art;
    }
}

module.exports = Art