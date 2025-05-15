import { NotFoundResourceError } from "../../../../application/errors/NotFoundResourceError";
import type { User } from "../../domain/entities/user.entity";
import type { UserRepository } from "../../domain/repositories/user.repository";

export class GetUser {
  constructor(private repository: UserRepository) {}

  async execute(id: string): Promise<User> {
    const result = await this.repository.findById(id);

    if (!result) {
      throw new NotFoundResourceError(`User with id ${id} not found`);
    }

    return result;
  }
}
