export default class Result {
    constructor(error,data){
        this.code = error.code,
        this.message = error.message,
        this.data = data
    }
}