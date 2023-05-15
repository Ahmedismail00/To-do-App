import {validationResult} from "express-validator";

export default (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorsMsg = [];
    errors.array().forEach(error => {
      errorsMsg.push(error.msg);
    });
    return res.status(400).json(errorsMsg)
  }
  next();
};