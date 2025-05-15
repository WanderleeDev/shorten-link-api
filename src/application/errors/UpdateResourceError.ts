import { ApiError } from "./ApiError";

export class UpdateResourceError extends ApiError {
  constructor(message?: string) {
    super(
      "UpdateResourceError",
      409,
      message ?? "An error occurred while updating the resource."
    );
  }
}
