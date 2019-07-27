
const { flatten } = require('lodash')
const { Op } =require('sequelize')
const Db = require('../database/index')

const commentModel = Db.getModel('comment')

class Comment {
    static async addComment (bookId,content){
        const comment = await commentModel.findOne({
            where:{
                book_id:bookId,
                content
            }
        })
        if(!comment){
            return await commentModel.create({
                book_id:bookId,
                content,
                nums:1
            })
        }else {
            return await comment.increment('nums',{
                by:1
            })
        }
    }

    static async getCommentsByBookId(bookId){
        const comments = await Comment.findAll({
            where:{
                book_id:bookId
            }
        })
        return comments
    }
}

module.exports = Comment 