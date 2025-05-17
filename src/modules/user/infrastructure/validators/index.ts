import { z } from "zod";
import {
  confirmPasswordField,
  emailField,
  nameField,
  passwordField,
  previousPasswordField,
  hashedPasswordField,
} from "./common.validator";

import { passwordMatchValidation } from "./passwordMatch.validator";
import { nonEmptyObject } from "../../../../infrastructure/validators/NonEmptyObject.validator";
import {
  idField,
  createdAtField,
  updatedAtField,
} from "../../../../infrastructure/validators/common.validators";

export const userCreateSchema = passwordMatchValidation(
  z.object({
    name: nameField,
    email: emailField,
    password: passwordField,
    confirmPassword: confirmPasswordField,
  })
);

export const userUpdateSchema = passwordMatchValidation(
  z.object({
    name: nameField.optional(),
    email: emailField.optional(),
    previousPassword: previousPasswordField,
    password: passwordField,
    confirmPassword: confirmPasswordField,
  })
);

export const userPatchSchema = nonEmptyObject(
  z.object({
    name: nameField.optional(),
    email: emailField.optional(),
  })
);

export const useResponserDbSchema = z.object({
  id: idField,
  name: nameField,
  email: emailField,
  hashedPassword: hashedPasswordField,
  createdAt: createdAtField,
  updatedAt: updatedAtField,
});

export const userResponseSchema = z.object({
  id: idField,
  name: nameField,
  email: emailField,
});

export const passwordUpdateSchema = passwordMatchValidation(
  z.object({
    previousPassword: previousPasswordField,
    password: passwordField,
    confirmPassword: confirmPasswordField,
  })
);
