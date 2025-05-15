import { ApiError } from "../../../../application/errors/ApiError";

export class ParsedDBRowError extends ApiError {
  constructor(status: number, message?: string) {
    super(
      "ParsedDBRowError",
      status,
      message ?? "Failed to transform database information"
    );
  }
}
