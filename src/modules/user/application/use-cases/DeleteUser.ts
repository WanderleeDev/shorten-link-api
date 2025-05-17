import { DeleteResourceError } from "../../../../application/errors/DeleteResourceError";
import type { UserRepositoryImpl } from "../../infrastructure/repositories/UserRepositoryImpl";

export class DeleteUser {
  constructor(private readonly repository: UserRepositoryImpl) {}

  async execute(id: string) {
    const isDelete = await this.repository.delete(id);

    if (!isDelete) {
      throw new DeleteResourceError(500, "Failed to delete the user.");
    }
  }
}
