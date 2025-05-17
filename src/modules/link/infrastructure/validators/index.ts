import {
  urlField,
  shortCodeField,
  userIdField,
  titleField,
} from "./common.validators";
import {
  idField,
  createdAtField,
  updatedAtField,
} from "../../../../infrastructure/validators/common.validators";
import { nonEmptyObject } from "../../../../infrastructure/validators/NonEmptyObject.validator";
import { z } from "zod";

export const linkCreateSchema = z.object({
  id: idField,
  url: urlField,
  userId: userIdField,
  title: titleField,
});

export const linkUpdateSchema = z.object({
  url: urlField,
  title: titleField,
});

export const linkPartialSchema = nonEmptyObject(
  z.object({
    url: urlField.optional(),
    title: titleField.optional(),
  })
);

export const linkResponseSchema = z.object({
  id: idField,
  url: urlField,
  shortCode: shortCodeField,
  userId: userIdField,
  title: titleField,
  createdAt: createdAtField,
  updatedAt: updatedAtField,
});
