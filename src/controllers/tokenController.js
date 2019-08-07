import {  
    put,
    del,
    post,
    get,
    controller 
} from '../services/decorator'
import { Success,NotFound } from '../libs/http-exception'
import { request,summary,body,tags,query } from 'koa-swagger-decorator'

const tokenTag = tags(['token'])

export default class TokenController {
    
    @request('get','/api/token')
    @summary('获取token')
    @query({
        wxBody:{}
    })
    @tokenTag
    async getToken(ctx,next){
        
    }
}