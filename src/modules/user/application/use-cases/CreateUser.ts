import { CreateResourceError } from "../../../../application/errors/CreateResourceError";
import { PasswordMismatchError } from "../errors/PasswordMismatchError";
import { ResourceAlreadyExistsError } from "../../../../application/errors/ResourceAlreadyExistsError";
import type { PasswordEncrypt } from "../../../auth/domain/services/PasswordEncrypt.services";
import type { UserRepositoryImpl } from "../../infrastructure/repositories/UserRepositoryImpl";
import type { User } from "../../domain/entities/user.entity";
import type { UserCreateDTO } from "../DTOs";

export class CreateUser {
  constructor(
    private repository: UserRepositoryImpl,
    private passwordEncryptService: PasswordEncrypt
  ) {}

  async execute(user: UserCreateDTO) {
    const existUser = await this.repository.findByEmail(user.email);

    if (existUser) {
      throw new ResourceAlreadyExistsError(
        `User with email ${user.email} already exists`
      );
    }

    const hashedPassword = await this.encryptPassword(
      user.password,
      user.confirmPassword
    );

    const newUser: User = {
      id: crypto.randomUUID(),
      name: user.name,
      email: user.email,
      hashedPassword,
      createdAt: new Date(),
      updatedAt: null,
    };

    const result = await this.repository.create(newUser);

    if (!result) {
      throw new CreateResourceError("Failed to create a new user");
    }

    return result;
  }

  private async encryptPassword(password: string, confirmPassword: string) {
    if (password !== confirmPassword) {
      throw new PasswordMismatchError();
    }

    return await this.passwordEncryptService.hash(password);
  }
}
