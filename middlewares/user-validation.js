// userValidation.js

const { body, validationResult } = require('express-validator');

const userValidationRules = () => {
    return [
        body('email').isEmail().normalizeEmail(),
        body('password').isLength({ min: 8 }),
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors });
    }
    next();
};
module.exports = {
    userValidationRules, validate
}