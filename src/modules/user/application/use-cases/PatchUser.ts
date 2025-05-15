import { NotFoundResourceError } from "../../../../application/errors/NotFoundResourceError";
import { UpdateResourceError } from "../../../../application/errors/UpdateResourceError";
import type { UserRepository } from "../../domain/repositories/user.repository";
import type { UserPatchDTO } from "../DTOs";

export class PatchUser {
  constructor(private readonly repository: UserRepository) {}

  async execute(id: string, user: UserPatchDTO) {
    const existUser = await this.repository.findById(id);

    if (!existUser) {
      throw new NotFoundResourceError(`User with ID ${id} not found`);
    }

    const userPatched = await this.repository.patchUser(id, user);

    if (!userPatched) {
      throw new UpdateResourceError("Failed to update the user");
    }

    return userPatched;
  }
}
