import  { 
    Music,
    Movie,
    Sentence 
} from './classic'
import { classicType } from '../libs/enum'
const { flatten } = require('loadash')
const { Op } = require('sequelize')

export default class Art {
    constructor(art_id,type){
        this.art_id = art_id
        this.type = type
    }

    async getDetail(uid){
        const {
            Favor
        } = require('./favor')
        const art = await Art.getDate(this.art_id,this.type)
        if(!art){
            //throw new 
        }
        const like = await Favor.userLikeIt(
            this.art_id, this.type, uid)
        return {
            art,
            like_status:like
        }
    }

    static async getList(artInfoList){
        const artInfoObj = {
            100:[],
            200:[],
            300:[]
        }
        for(let artInfo of artInfoObj){
            artInfoObj[artInfo.type].push(artInfo.art_id)
        }
        const arts = []
        for(let key in artInfoObj){
            const ids = artInfoObj[key]
            if(ids.length === 0 ){
                continue
            }

            key =parseInt(key)
            arts.push(await Art._getListByType(ids,key))
        }
        return flatten(arts)
    }

    static async _getListByType(ids,type){
        let arts = []
        const finder = {
            where:{
                id:{
                    [Op.in]:ids
                }
            }
        }
        const scope = 'bh'
        switch(type){
            case classicType.movie:
                arts = await Movie.scope(scope).findAll(finder)
                break;
            case classicType.music:
                arts = await Music.scope(scope).findAll(finder)
                break;
            case classicType.sentence:
                arts = await Sentence.scope(scope).findAll(finder)
                break;
        }
        return arts
    }

    static async getDate(art_id,type,useScope= true){
        let art = null
        const finder  = {
            where:{
                id:art_id
            }
        }

        const scope = useScope?'bh':null
        switch(type){
            case classicType.movie:
                art = await Movie.scope(scope).findOne(finder)
                break;
            case classicType.music:
                art = await Music.scope(scope).findOne(finder)
                break;
            case classicType.sentence:
                art = await Sentence.scope(scope).findOne(finder)
                break;
        }
        return art;
    }
}
