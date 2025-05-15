import { ApiError } from "./ApiError";

export class DeleteResourceError extends ApiError {
  constructor(status: number, message?: string) {
    super(
      "DeleteResourceError",
      status,
      message ?? "An error occurred while deleting the resource."
    );
  }
}
