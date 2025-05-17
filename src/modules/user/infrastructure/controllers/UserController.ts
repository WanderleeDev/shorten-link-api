import type { Request, Response } from "express";
import type { CreateUser } from "../../application/use-cases/CreateUser";
import type { GetUser } from "../../application/use-cases/GetUser";
import type { DeleteUser } from "../../application/use-cases/DeleteUser";
import type { UpdateUser } from "../../application/use-cases/UpdateUser";
import type { PatchUser } from "../../application/use-cases/PatchUser";

export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUser,
    private readonly getUserUseCase: GetUser,
    private readonly deleteUserUseCase: DeleteUser,
    private readonly updateUserUseCase: UpdateUser,
    private readonly patchUserUseCase: PatchUser
  ) {}

  async createUser(req: Request, res: Response) {
    const user = await this.createUserUseCase.execute(req.body);

    res.status(201).json({
      message: "User created successfully",
      user: user,
    });
  }

  async getUser(req: Request, res: Response) {
    const user = await this.getUserUseCase.execute(req.params["id"]);

    res.status(200).json({
      message: "User retrieved successfully",
      user: user,
    });
  }

  async updateUser(req: Request, res: Response) {
    const user = await this.updateUserUseCase.execute(
      req.params["id"],
      req.body
    );

    res.status(200).json({
      message: "User updated successfully",
      user: user,
    });
  }

  async patchUser(req: Request, res: Response) {
    const user = await this.patchUserUseCase.execute(
      req.params["id"],
      req.body
    );

    res.status(200).json({
      message: "User patched successfully",
      user: user,
    });
  }

  async deleteUser(req: Request, res: Response) {
    await this.deleteUserUseCase.execute(req.params["id"]);

    res.status(200).json({
      message: "User deleted successfully",
      user: null,
    });
  }
}
