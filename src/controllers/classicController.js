import { controller,get,post,put,del } from '../services/decorator'
import {  
    PositiveIntegerValidator,
    ClassicValidator
 } from '../libs/validator'
import { Success,NotFound } from '../libs/http-exception'
import ArtSvc from '../services/art'
import FavorSvc from '../services/favor'
import { query,request,summary,tags,body,path } from 'koa-swagger-decorator'

const db = require('../database/index')

const Flow = db.getModel('flow')

const classicTag =  tags(['classic'])

export default class ClassicController {
    


    @request('get','/api/classic/test')
    @summary('测试api接口')
    @classicTag
    @get('/test')
    async test(ctx,next){
        ctx.body = 'test'
    }


    @request('get','/api/classic/latest')
    @summary('获取最新一期的期刊')
    @classicTag
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


    @request('get','/api/classic/:index/next')
    @summary('获取下一条期刊')
    @classicTag
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

    @request('get','/api/classic/:index/previous')
    @summary('获取上一条期刊')
    @classicTag
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


    @request('get','/api/classic/:type/:id')
    @summary('获取指定类型下面的对应Id期刊')
    @classicTag
    @get('/:type/:id')
    async getArtByIdAndType(ctx,next){
        let { type,id } = ctx.params
        let uid = ctx.auth.uid || 1
        const artDetail = await new ArtSvc(id,type).getDetail(uid)

        artDetail.art.setDataValue('like_status',artDetail.like_status)
        ctx.body = new Success("ok",200,artDetail.art)
    }

    @request('get','/api/classic/:type/:id')
    @summary('获取指定类型下面的对应Id期刊点赞数量')
    @classicTag
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
    
    @request('get','/api/classic/favor')
    @summary('获取我的点赞的所有期刊')
    @query({
        uid:{description:'登录才能查看接口'}
    })
    @classicTag
    @get('/favor')
    async favor(ctx){
        const id = ctx.auth.uid ||1
        const favors = await Favor.getMyClassicFavors(uid);
        ctx.body = new Success('ok',200,favors)
    }
}