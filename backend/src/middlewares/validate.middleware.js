const ApiError = require('../utils/ApiError');

const validate = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });

    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(', ');
        return next(ApiError.badRequest(errorMessage));
    }

    // Replace req.body with sanitized, validated values (Prevents SQL injection/mass assignment)
    req.body = value;
    next();
};

module.exports = validate;