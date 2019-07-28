import { controller,get,post,put,del } from '../services/decorator'
import {  
    PositiveIntegerValidator,
    ClassicValidator
 } from '../libs/validator'
import { Success,NotFound } from '../libs/http-exception'
import ArtSvc from '../services/art'
import FavorSvc from '../services/favor'

const db = require('../database/index')

const Flow = db.getModel('flow')


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

    @get('/:type/:id')
    async getArtByIdAndType(ctx,next){
        let { type,id } = ctx.params
        let uid = ctx.auth.uid || 1
        const artDetail = await new ArtSvc(id,type).getDetail(uid)

        artDetail.art.setDataValue('like_status',artDetail.like_status)
        ctx.body = new Success("ok",200,artDetail.art)
    }

    @get('/:type/:id/favor')
    async getFavorById(ctx,next){
        const v = await new ClassicController().validate(ctx)
        const id = v.get('path.id')
        const type = parseInt(v.get('path.type'))

        const artDetail = await new ArtSvc(id,type).getDetail(ctx.user.uid)
        const data = {
            fav_nums:artDetail.art.fav_nums,
            like_status:artDetail.like_status
        }
        ctx.body = new Success('ok',200,data)
    }
    

    @get('/favor')
    async favor(ctx){
        const id = ctx.auth.uid ||1
        const favors = await Favor.getMyClassicFavors(uid);
        ctx.body = new Success('ok',200,favors)
    }
}