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
import { refinePasswordValidation } from "./refinePasswordValidation";

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

export const userCreateSchema = refinePasswordValidation(
  z.object({
    name: nameField,
    email: emailField,
    password: passwordField,
    confirmPassword: confirmPasswordField,
  })
);

export const userUpdateSchema = refinePasswordValidation(
  z.object({
    name: nameField.optional(),
    email: emailField.optional(),
    previousPassword: previousPasswordField,
    password: passwordField,
    confirmPassword: confirmPasswordField,
  })
);

export const userPatchSchema = z.object({
  name: nameField.optional(),
  email: emailField.optional(),
});

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

export const passwordUpdateSchema = refinePasswordValidation(
  z.object({
    previousPassword: previousPasswordField,
    password: passwordField,
    confirmPassword: confirmPasswordField,
  })
);
