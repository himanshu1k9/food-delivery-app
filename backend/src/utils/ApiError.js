/**
 * This module handles errors globally [ never sends raw errors to the client ]
 */
class AppError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;  // For operational errors vs programming bugs

        Error.captureStackTrace(this, this.constructor);
    }

    // Common error factory methods (Fixed: using AppError instead of ApiError)
    static badRequest(msg) { return new AppError(400, msg); }
    static unauthorized(msg) { return new AppError(401, msg); }
    static forbidden(msg) { return new AppError(403, msg); }
    static notFound(msg) { return new AppError(404, msg); }
    static internal(msg) { return new AppError(500, msg || 'Internal Server Error'); }
}

module.exports = AppError;