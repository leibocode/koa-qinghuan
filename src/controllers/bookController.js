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
// import { request,summary,query,path,body,tags, } from 'koa-swagger-decorator'

const db = require('../database/index')

import { request, summary, query, path, body, tags } from 'koa-swagger-decorator'

const bookTag = tags(['book'])


// @controller('/api/book')
export default class BookController {

    @request('get', '/api/book/hot')
    @summary('获取所有的')
    @bookTag
    @get('/hot')
    async getHotList(ctx,next){
        const books = await HotBook.getAll()
        ctx.body = new Success('ok',200,books)
    }


    @request('get', '/api/book/:id/detail')
    @summary('获取书籍的详情信息')
    @bookTag
    @query({
      book_id: { type: 'number', required: true, default: 1, description: '书籍Id' },
    })
    @get('/:id/detail')
    async getDetail(ctx,next){
        const v = await new PositiveIntegerValidator().validate(ctx)
        const book = new Book()

        const data = await book.detail(v.get('path.id'))
        ctx.body = new Success('ok',200,data)
    }

    @request('get','/api/book/search')
    @summary('搜索书籍')
    @bookTag
    @query({

    })
    @get('/search')
    async search(ctx,next){
        const v = await new SearchValidator().validate(ctx)
        const result = await　Book.searchFromYushu(

        )
        ctx.body = new Success('ok',200,result)
    }

    @request('get','/api/book/favorCount')
    @summary('获取喜欢的书籍点赞个数')
    @bookTag
    @query({
        uid:{type:'number',required:true,description:'需要登录才能看的接口'}
    })
    @get('/favor/count')
    async getMyFavorBookCount(ctx,next){
        let uid = ctx.auth.uid || 1
        const count = await Book.getMyFavorBookCount(uid)
        ctx.body = new Success('ok',200,count)
    }

    @request('post','/api/:book_id/favor')
    @summary('获取指定书籍的点赞个数')
    @bookTag
    @query({
        book_id:{type:'number',required:true,description:''}
    })
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

    @request('post','/api/:book_id/addComment')
    @summary('给指定书籍添加一条评论')
    @bookTag
    @query({
        book_id:{type:'number',required:true,description:''}
    })
    @post('/:book_id/addComment')
    async addComment(ctx,next) {
        const v = await new AddCommentValidator().validate(ctx,{
            id:'book_id'
        })
        Comment.addComment(v.get('body.book_id'),v.get('body.content'))
        ctx.body = new CreateAt()
    }

    @request('post','/api/:book_id/addComment')
    @summary('获取指定书籍的评论列表')
    @bookTag
    @query({
        book_id:{type:'number',required:true,description:''}
    })
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

    @request('post','/api/:book_id/addComment')
    @summary('获取指定书籍的评论列表')
    @bookTag
    @query({
        book_id:{type:'number',required:true,description:''}
    })
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