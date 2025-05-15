import { ApiError } from "./ApiError";

export class PasswordMismatchError extends ApiError {
  constructor(message?: string) {
    super("PasswordMismatchError", 400, message ?? "Passwords do not match");
  }
}
