import { ApiError } from "./ApiError";

export class ResourceAlreadyExistsError extends ApiError {
  constructor(message?: string) {
    super(
      "ResourceAlreadyExistsError",
      409,
      message ?? "The resource already exists."
    );
  }
}
