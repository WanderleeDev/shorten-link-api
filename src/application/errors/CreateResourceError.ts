import { ApiError } from "./ApiError";

export class CreateResourceError extends ApiError {
  constructor(message: string) {
    super(
      "CreateResourceError",
      400,
      message ?? "An error occurred while creating the resource."
    );
  }
}
