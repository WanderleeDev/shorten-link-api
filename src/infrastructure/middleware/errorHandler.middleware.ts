import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../../application/errors/ApiError";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  if (err instanceof ApiError) {
    res
      .status(err.status ?? 500)
      .json({ message: err.toString(), detail: err.cause });

    return;
  }

  if (err instanceof Error) {
    res.status(500).json({ message: "Unexpected Error", detail: err.message });
    return;
  }

  res.status(500).json({ message: "Unknown Error", detail: `${err}` });

  return;
};
