import { body } from "express-validator";

export const addTodoValidation = [
  body('text')
    .isString()
    .withMessage('Todo text should be string.')
    .exists()
    .withMessage('Todo text is requried.')
];

export const updateTodoValidation = [
  body('text').
    isString().
    withMessage('Todo text should be string.').
    exists().
    withMessage('Todo text is requried.'),
  body('text', 'Todo text is requried.').exists(),
];

export const deleteTodoValidation = [
  body('id').
    exists().
    withMessage('Todo ID is requried.'),
];