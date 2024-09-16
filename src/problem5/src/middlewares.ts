import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const VALIDATION_ERROR_MESSAGE = "There is an issue with the data you provided";

export const addPostBodyValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loginSchema = Joi.object({
    title: Joi.string().label("Post title").min(2).max(100).required(),
    content: Joi.string().label("Post content").min(2).max(10500).required(),
  });

  const { error } = loginSchema.validate(req.body);
  if (error) {
    res.status(400).json({
      message: VALIDATION_ERROR_MESSAGE,
      error,
    });
  } else {
    next();
  }
};

export const postIdParamValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const paramSchema = Joi.object({
    id: Joi.number().label("Post ID").required(),
  });

  const { error } = paramSchema.validate(req.params);
  if (error) {
    res.status(400).json({
      message: VALIDATION_ERROR_MESSAGE,
      error,
    });
  } else {
    next();
  }
};

export const searchQueryValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const querySchema = Joi.object({
    title: Joi.string().label("Post title"),
    content: Joi.string().label("Post content"),
  });

  const { error } = querySchema.validate(req.query);
  if (error) {
    res.status(400).json({
      message: VALIDATION_ERROR_MESSAGE,
      error,
    });
  } else {
    next();
  }
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "What?" });
};
