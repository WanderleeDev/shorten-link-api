import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";

export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const bodyParsed = schema.safeParse(req.body);

    if (!bodyParsed.success) {
      const errors = bodyParsed.error.formErrors.fieldErrors;

      res.status(400).json({
        message:
          "The provided information is invalid. Please check the input data and try again.",
        errors,
      });

      return;
    }

    req.body = bodyParsed.data;
    next();
  };
};
