import express from "express";
import { UserRepositoryImpl } from "../repositories/UserRepositoryImpl";
import { CreateUser } from "../../application/use-cases/CreateUser";
import { UserController } from "../controllers/UserController";
import { validateBody } from "../../../../infrastructure/middleware/zod.middleware";
import {
  userCreateSchema,
  userPatchSchema,
  userUpdateSchema,
} from "../validators";
import { PasswordEncryptService } from "../../../auth/application/services/PasswordEncrypt.service";
import { GetUser } from "../../application/use-cases/GetUser";
import { DeleteUser } from "../../application/use-cases/DeleteUser";
import { UpdateUser } from "../../application/use-cases/UpdateUser";
import { PatchUser } from "../../application/use-cases/PatchUser";

const userRouter = express.Router();

const userRepository = new UserRepositoryImpl();
const passwordEncryptService = new PasswordEncryptService();
const createUserUseCase = new CreateUser(
  userRepository,
  passwordEncryptService
);
const createGetUserUseCase = new GetUser(userRepository);
const updateUserUseCase = new UpdateUser(
  userRepository,
  passwordEncryptService
);
const patchUserUseCase = new PatchUser(userRepository);
const deleteUserUseCase = new DeleteUser(userRepository);
const userController = new UserController(
  createUserUseCase,
  createGetUserUseCase,
  deleteUserUseCase,
  updateUserUseCase,
  patchUserUseCase
);

userRouter.get("/:id", userController.getUser.bind(userController));
userRouter.post(
  "",
  validateBody(userCreateSchema),
  userController.createUser.bind(userController)
);
userRouter.put(
  "/:id",
  validateBody(userUpdateSchema),
  userController.updateUser.bind(userController)
);
userRouter.patch(
  "/:id",
  validateBody(userPatchSchema),
  userController.patchUser.bind(userController)
);
userRouter.delete("/:id", userController.deleteUser.bind(userController));

export default userRouter;
