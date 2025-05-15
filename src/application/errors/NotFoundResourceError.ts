import { ApiError } from "./ApiError";

export class NotFoundResourceError extends ApiError {
  constructor(message?: string) {
    super(
      "NotFoundResourceError",
      404,
      message ?? "The requested resource was not found"
    );
  }
}
