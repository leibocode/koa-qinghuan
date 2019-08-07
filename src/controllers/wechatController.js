import {  
    put,
    del,
    post,
    get,
    controller 
} from '../services/decorator'
import { Success,NotFound } from '../libs/http-exception'
import { request,summary,body,tags,query } from 'koa-swagger-decorator'

const wechatTag = tags(['wechat'])

export default class WechatController {
    
    @request('get','/api/wechat/message')
    @summary('发送模板消息')
    @query({
        wxBody:{}
    })
    @wechatTag
    async message(ctx,next){
        
    }
}