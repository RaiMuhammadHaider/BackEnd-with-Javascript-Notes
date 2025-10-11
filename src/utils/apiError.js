class apiError extends Error {
    constructor(
        message = 'Something went wrong',
        errors = [],
        statusCode ,
        stack = ""
    ){
        super(message)
        this.message = message
        this.errors = errors
        this.statusCode = statusCode
        this.success = false
        this.data = null
        if (stack) {
            this.stack = stack
        }
        else{
            Error.captureStackTrace(this , this.constructor )
        }
    }
}
export {apiError}
