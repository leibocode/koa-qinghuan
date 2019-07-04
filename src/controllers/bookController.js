import { controller,get,post,put,del } from '../services/decorator'
import {  PositiveIntegerValidator } from '../libs/validator'
import { Success,NotFound } from '../libs/http-exception'

const {
    Comment
} = require('../database/book-comment')
const  {
    Book
} = require('../database/book')

@controller('/api/book')
export class BookController {
    
    /**
     *
     *
     * @memberof BookController
     */
    @get('/detail/:id')
    async getBookDetail(ctx,next){
        const v = await new PositiveIntegerValidator().validate(ctx)
        const book = new Book()
        
    }


    @get('/favor_count')
    async getFavorCount(ctx){
        
    }

    @get('/search')
    async search(ctx){

    }

    @get('/hot_keyword')
    async getkeyWord(ctx,next){
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
    }

    @get('/:book_id/favor')
    async getBookByFavor(){
        const v = await PositiveIntegerValidator().validate()

    }
}