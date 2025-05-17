import { NotFoundResourceError } from "../../../../application/errors/NotFoundResourceError";
import { PasswordMismatchError } from "../errors/PasswordMismatchError";
import { UpdateResourceError } from "../../../../application/errors/UpdateResourceError";
import type { PasswordEncrypt } from "../../../auth/domain/services/PasswordEncrypt.services";
import type { UserRepositoryImpl } from "../../infrastructure/repositories/UserRepositoryImpl";
import type { User } from "../../domain/entities/user.entity";
import type { UserUpdateDTO } from "../DTOs";

export class UpdateUser {
  constructor(
    private repository: UserRepositoryImpl,
    private passwordEncryptService: PasswordEncrypt
  ) {}

  async execute(id: string, user: UserUpdateDTO): Promise<User> {
    if (user.password !== user.confirmPassword) {
      throw new PasswordMismatchError(
        "New password and confirm password do not match"
      );
    }

    const existUser = await this.repository.findById(id);

    if (!existUser) {
      throw new NotFoundResourceError(`User with ID ${id} not found`);
    }

    await this.passwordEncryptService.compare(
      user.previousPassword,
      existUser.hashedPassword
    );

    const hashedPassword = await this.passwordEncryptService.hash(
      user.password
    );

    const userUpdated = await this.repository.update(id, {
      name: user.name,
      email: user.email,
      hashedPassword,
    });

    if (!userUpdated) {
      throw new UpdateResourceError();
    }

    return userUpdated;
  }
}
