import type { ZodSchema } from "zod";

export function validateNonEmptyObject(schema: ZodSchema) {
  return schema.refine((object) => Object.keys(object).length > 0, {
    message: "At least one field must be provided",
    path: ["rootObject"],
  });
}
