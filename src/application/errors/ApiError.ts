export abstract class ApiError extends Error {
  status: number = 0;

  constructor(name: string, status: number, message: string) {
    super(message ?? "Failed to transform database information");
    this.name = name;
    this.status = status;
  }

  toString() {
    return `${this.name}: ${this.message}`;
  }
}
