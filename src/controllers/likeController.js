import { controller,get,post,put,del } from '../services/decorator'
import Flow from '../database/flow'
import {  PositiveIntegerValidator } from '../libs/validator'
import Art from '../database/art'
import { Success,NotFound } from '../libs/http-exception'

@controller('/api/like')
export class LikeController {
    @post('/')
    async addlike(ctx,next){
        const v = await new PositiveIntegerValidator().validate(ctx,{
            id:'art_id'
        })
    }
}