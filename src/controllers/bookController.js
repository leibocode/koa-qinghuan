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
import {  PositiveIntegerValidator } from '../libs/validator'

const db = require('../database/index')
const Book = db.getModel('book')

@controller('/api/book')
export class BookController {
    @get('/hot')
    async getHotList(ctx,next){
        
    }

    @get('/:id/detail')
    async getDetail(ctx,next){
        const v = await new PositiveIntegerValidator().validate(ctx)
    }
}