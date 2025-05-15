import { z } from "zod";
import {
  idField,
  confirmPasswordField,
  createdAtField,
  emailField,
  nameField,
  passwordField,
  previousPasswordField,
  hashedPasswordField,
  updatedAtField,
} from "./common.validator";
import { passwordMatchValidation } from "./passwordMatch.validator";
import { validateNonEmptyObject } from "./NonEmptyObject.validator";

export const userBaseSchema = z.object({
  id: idField,
  name: nameField,
  email: emailField,
  hashedPassword: hashedPasswordField,
  password: passwordField,
  confirmPassword: confirmPasswordField,
  previousPassword: previousPasswordField,
  createdAt: createdAtField,
  updatedAt: updatedAtField,
});

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

export const userPatchSchema = validateNonEmptyObject(
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
