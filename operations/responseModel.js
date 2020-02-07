module.exports.AuthResponse = class AuthResponse {
    constructor(status, details) {
        this.status = status;
        this.details = details;
    }
}


module.exports.Details = class Details {
    constructor(email, token, active = true) {
        this.email = email;
        this.token = token;
        this.active = active
    }
}