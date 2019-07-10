const { flatten } = require('lodash')
const { Op } =require('sequelize')
const Db = require('../database/index')

const Movie = Db.getModel('movie')
const Sentence = Db.getModel('sentence')
const Music = Db.getModel('music')
const Favor = Db.getModel('favor')

export default class Art {
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

        }
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