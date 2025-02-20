
class ApiError extends Error{
    constructor(
        statusCode,
        message="Something Went Wrong",
        stack="",
        errors=[]
    ){
        super(message)
        this.statusCode=statusCode,
        this.message=message,
        this.data=null,
        this.suceess=false,
        this.errors=errors

        if(stack){
            this.stack=stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
    
}

export { ApiError }