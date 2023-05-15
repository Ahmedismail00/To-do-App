import { body } from "express-validator";

export const registerValidation = [
    body('username')
        .exists()
        .withMessage('username is required.')
        .isString()
        .withMessage('username must be string.'),
    body('email')
        .exists()
        .withMessage('email is required.')
        .isEmail()
        .withMessage('email must be a valid email address'),
    body('password')
        .exists()
        .withMessage('password is required')
        .isLength({ min: 6 })
        .withMessage('password must be at least 6 characters'),
];

export const loginValidation = [
    body('email', 'email is required.').exists(),
    body('password', 'password is required.').exists(),
];