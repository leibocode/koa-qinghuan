import { controller,get,post,put,del } from '../services/decorator'
import {  PositiveIntegerValidator } from '../libs/validator'
import { Success,NotFound } from '../libs/http-exception'

const db = require('../database/index')
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
        const flow = await db.getModel('flow').findOne({
            order:[
                ['index','DESC']
            ]
        })
        ctx.body = flow
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
        // const art = await Art.getDate()
        ctx.body = new Success()
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

    }

    @get('/favor')
    async favor(ctx){
        const id = ctx.auth.uid
        const favors = await Favor.getMyClassicFavors(uid);
    }
}