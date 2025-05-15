import type { ZodSchema } from "zod";

export function refinePasswordValidation(schema: ZodSchema) {
  return schema.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
}
