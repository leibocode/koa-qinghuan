const { flatten } = require('lodash')
const { Op } =require('sequelize')
const Db = require('../database/index')

const Movie = Db.getModel('movie')
const Sentence = Db.getModel('sentence')
const Music = Db.getModel('music')

class Art {
    constructor(art_id,type) {
        this.art_id = art_id
        this.type = type
    }

    static async getDetail(uid) {
        
    }

    static async _getListByType(ids,type){
        
    }

    static async getList(){

    }

}