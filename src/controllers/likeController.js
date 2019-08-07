import { controller,get,post,put,del } from '../services/decorator'
import {  
    PositiveIntegerValidator,
    LikeValidator
 } from '../libs/validator'
import { Success,NotFound } from '../libs/http-exception'
import { request,summary,tags,query,body,path } from 'koa-swagger-decorator'

const db = require('../database/index')

const Flow = db.getModel('flow')
const ArtSvc = require('../services/art')
const FavorSvc = require('../services/favor') 

const likeTag = tags(['like'])

export default class LikeController {

    /**
     * @description 点赞
     * @memberof LikeController
     */
    @request('post','/api/like')
    @summary('点赞')
    @likeTag
    @post('/')
    async like(ctx,next){
        const v = await new LikeValidator().validate(ctx,{
            id:'art_id'
        })
        let uid = ctx.auth.uid || 1
        await FavorSvc.like(
            v.get('body.art_id'),
            v.get('body.type'),
            uid
        ) 
        ctx.body = new Success()
    }

    @request('post','/api/like/cancel')
    @summary('取消点赞')
    @likeTag
    @post('/cancel')
    async disLile(ctx,next){
        const v = await new LikeValidator().validate(ctx,{
            id:'art_id'
        })
        let uid = ctx.auth.uid || 1
        await FavorSvc.disLike(
            v.get('body.art_id'),
            v.get('body.type'),
            uid
        )
        ctx.body = new Success()
    }
}