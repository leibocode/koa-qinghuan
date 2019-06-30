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

    static async getList(artInfoList){
        
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
