import { controller,get,post,put,del } from '../services/decorator'

@controller('/api/classic')
export class ClassicController {
    @get('/test')
    async test(ctx,next){
        ctx.body = 'test'
    }
}