import type { ZodSchema } from "zod";

export function passwordMatchValidation(schema: ZodSchema) {
  return schema.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
}
