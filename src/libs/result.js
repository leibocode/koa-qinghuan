import * as Error from './errors'
export default class Result {
    constructor(error,data){
        this.code = error.code
        this.message = error.message
        if(this.code ===Error.ok.code){
            this.data = data
        }
    }
}