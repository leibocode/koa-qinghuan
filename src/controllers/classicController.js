import { controller,get,post,put,del } from '../services/decorator'
import Flow from '../database/flow'

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
    @get('latest')
    async latest(ctx,next){
        const flow = await Flow.findOne({
            where:[
                ['index','DESC']
            ]
        })
    }
}