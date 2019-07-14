import {
    controller,
    get,
    post,
    del,
    put
}from '../services/decorator'
import {
    NotFound,
    Success
}from '../libs/http-exception'
import {  
    PositiveIntegerValidator,
    SearchValidator
 } from '../libs/validator'

const db = require('../database/index')
const Book = db.getModel('book')
const HotBook = db.getModel('hot_book')

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
}