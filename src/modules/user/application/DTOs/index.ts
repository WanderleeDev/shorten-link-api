export interface UserDTO {
  id: string;
  name: string;
  email: string;
  hashedPassword: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PasswordUpdateDTO {
  password: string;
  confirmPassword: string;
  previousPassword: string;
}

export type UserCreateDTO = Pick<UserDTO, "name" | "email"> & {
  password: string;
  confirmPassword: string;
};

export type UserCreateDTOWithId = UserCreateDTO & {
  id: string;
  hashedPassword: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserUpdateDTO = Pick<UserDTO, "name" | "email"> & PasswordUpdateDTO;

export type UserUpdateFormatDTO = Pick<
  UserDTO,
  "name" | "email" | "hashedPassword"
>;

export type UserPatchDTO = Partial<Pick<UserDTO, "name" | "email">>;

export type UserResponseDTO = Omit<UserDTO, "hashedPassword">;
