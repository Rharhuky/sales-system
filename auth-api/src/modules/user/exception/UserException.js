class UserException extends Error {

    constructor(status, msg) {
        super(msg)
        this.status = status;
        this.msg = msg;
        this.name = this.constructor.name;
        Error.captureStackTrace(this.this.constructor)
    }


}

// module.exports = UserException;
export default UserException;