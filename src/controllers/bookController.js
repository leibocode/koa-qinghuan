import {
    controller,
    get,
    post,
    del,
    put
}from '../services/decorator'
import {
    NotFound,
    Success, 
    CreateAt
}from '../libs/http-exception'
import {  
    PositiveIntegerValidator,
    SearchValidator,
    AddCommentValidator
 } from '../libs/validator'
 import Book from '../services/book'
 import HotBook from '../services/hot-book'
import Favor from '../services/favor';
import Comment from '../services/comment'

const db = require('../database/index')


@controller('/api/book')
export class BookController {
    @get('/hot')
    async getHotList(ctx,next){
        const books = await HotBook.getAll()
        ctx.body = new Success('ok',200,books)
    }

    @get('/:id/detail')
    async getDetail(ctx,next){
        const v = await new PositiveIntegerValidator().validate(ctx)
        const book = new Book()

        const data = await book.detail(v.get('path.id'))
        ctx.body = new Success('ok',200,data)
    }

    @get('/search')
    async search(ctx,next){
        const v = await new SearchValidator().validate(ctx)
        const result = await　Book.searchFromYushu(

        )
        ctx.body = new Success('ok',200,result)
    }

    @get('/favor/count')
    async getMyFavorBookCount(ctx,next){
        let uid = ctx.auth.uid || 1
        const count = await Book.getMyFavorBookCount(uid)
        ctx.body = new Success('ok',200,count)
    }

    @post('/:book_id/favor')
    async getBookFavor(ctx,next){
        const v = await new PositiveIntegerValidator()
         .validate(ctx,{
             id:'book_id'
         })
         let uid = ctx.auth.uid || 1;
         const favot = await Favor.getBookFavor(uid,v.get('path.book_id'))
         ctx.body = new Success('ok',200,data)

    }

    @post('/:book_id/addComment')
    async addComment(ctx,next) {
        const v = await new AddCommentValidator().validate(ctx,{
            id:'book_id'
        })
        Comment.addComment(v.get('body.book_id'),v.get('body.content'))
        ctx.body = new CreateAt()
    }

    @get('/:book_id/comments')
    async getComments(ctx,next){
        const v = await new PositiveIntegerValidator()
                             .validate(ctx,{
                                 id:'book_id'
        })
        const book_id = v.get('path.book_id')
        const comments = await Comment.getCommentsByBookId(book_id)
        ctx.body = new Success('ok',200,data)
    }

    @get('/hot_keyword')
    async getHotKeys(ctx,next){
        let data = {
            'hot': ['Python',
                '哈利·波特',
                '村上春树',
                '东野圭吾',
                '白夜行',
                '韩寒',
                '金庸',
                '王小波'
            ]
        }
        ctx.body = new Success('ok',200,data)
    }
}