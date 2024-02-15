import { body, validationResult } from "express-validator";
import { BadRequestError } from "../errors/customErrors.js";

const withValidatorErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((err) => err.msg);
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};
