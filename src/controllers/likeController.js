import { controller,get,post,put,del } from '../services/decorator'
import {  
    PositiveIntegerValidator,
    LikeValidator
 } from '../libs/validator'
import { Success,NotFound } from '../libs/http-exception'

const db = require('../database/index')

const Flow = db.getModel('flow')
const ArtSvc = require('../services/art')
const FavorSvc = require('../services/favor') 

export class LikeController {

    /**
     * @description 点赞
     * @memberof LikeController
     */
    @post('/')
    async like(ctx,next){
        const v = await new LikeValidator().validate(ctx,{
            id:'art_id'
        })
        await FavorSvc.like(
            v.get('body.art_id'),
            v.get('body.type')
        ) 
        ctx.body = new Success()
    }

    @post('/cancel')
    async disLile(ctx,next){
        const v = await new LikeValidator().validate(ctx,{
            id:'art_id'
        })
        await FavorSvc.disLike(
            v.get('body.art_id'),
            v.get('body.type')
        )
        ctx.body = new Success()
    }
}