import { body, param, validationResult } from "express-validator";
import mongoose from "mongoose";
import { BadRequestError } from "../errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";

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

export const validateJobInput = withValidatorErrors([
  body("company").notEmpty().withMessage("company is required"),
  body("position").notEmpty().withMessage("position is required"),
  body("jobLocation").notEmpty().withMessage("job location is required"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("invalid job status"),
  body("jobType").isIn(Object.values(JOB_TYPE)).withMessage("invalid job type"),
]);

export const validateIdParam = withValidatorErrors([
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("invalid mongoDB id"),
]);
