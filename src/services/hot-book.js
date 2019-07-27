const Db = require('../database/index')
const { Sequelize,Model,Op } = require('sequelize')

const HotBook  = Db.getModel('hot-book')
const Favor = Db.getModel('favor')
const favorSvc = require('./favor')

class HotBook {
    static async getAll(){
        const books = await HotBook.findAll({
            order:[
                'index'
            ]
        })
        const ids = []
        books.forEach(book => {
            ids.push(book.id)
        })
        const favors = await Favor.findAll({
            where:{
                art_id:{
                    [Op.in]:ids
                },
                type:400
            },
            group:['art_id'],
            attributes:['art_id',[Sequelize.fn('COUNT','*'),'count']]
        })
        books.forEach((book)=>{
            HotBook._getEachBooksStatus(book,favors)
        })
        return books
    }

    static _getEachBooksStatus(book,favors){
        let count = 0
        favors.forEach(favor=>{
            if(book.id===favor.art_id){
                count = favor.get('count')
            }
        })
        book.fav_nums = count
        return book
    }
}

module.exports = HotBook