import { controller,get,post,put,del } from '../services/decorator'
import {  PositiveIntegerValidator } from '../libs/validator'
import { Success,NotFound } from '../libs/http-exception'

const db = require('../database/index')

const Flow = db.getModel('flow')
const ArtSvc = require('../services/art')
const FavorSvc = require('../services/favor')

@controller('/api/classic')
export class ClassicController {
    @get('/test')
    async test(ctx,next){
        ctx.body = 'test'
    }

    /** 获取最新一期的期刊
     * @get get方法
     * @params 无
     * @memberof ClassicController
     */
    @get('/latest')
    async latest(ctx,next){ 
        const flow = await Flow.findOne({
            order:[
                ['index','DESC']
            ]
        })
        const art = await ArtSvc.getData(flow.art_id,flow.type)
        const like = await FavorSvc.userLikeIt(flow.art_id,
            flow.type,0)
        art.index = flow.index
        art.likeStatus = like
        ctx.body = new Success("ok",200,art)
    }

    /**
     *上一条期刊
     * @memberof ClassicController
     */
    @get('/:index/next')
    async next(ctx,next){
        const v = await new PositiveIntegerValidator().validate(ctx,{
            id:'index'
        }) 
        const index = v.get('path.index')
        const flow = await Flow.findOne({
            where:{
                index:index+1
            }
        })
        if(!flow){
            throw new NotFound()
        }
        const art = await ArtSvc.getData(flow.art_id,flow.type)
        const likeNext = await FavorSvc.userLikeIt(
            flow.art_id,flow.type,0
        )
        art.index = flow.index
        art.likeStatus = likeNext
        ctx.body = new Success("ok",200,art)
    }


    @get('/:index/previous')
    async previous(ctx,next){
        const v = await new PositiveIntegerValidator().validate(ctx,{
            id:'index'
        })
        const index = v.get('path.index')
        const flow = await Flow.findOne({
            where:{
                index:index-1
            }
        })
        if(!flow){
            throw new NotFound()
        }
        const art = await ArtSvc.getData(flow.art_id,flow.type)
        const likeNext = await FavorSvc.userLikeIt(
            flow.art_id,flow.type,0
        )
        art.index = flow.index
        art.likeStatus = likeNext
        ctx.body = new Success("ok",200,art)
    }

    

    @get('/favor')
    async favor(ctx){
        const id = ctx.auth.uid
        const favors = await Favor.getMyClassicFavors(uid);
    }
}