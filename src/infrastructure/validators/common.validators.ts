import { z } from "zod";

const idField = z.string().uuid({ message: "Invalid UUID format for idField" });
const createdAtField = z
  .string()
  .datetime({ message: "Invalid datetime format for createdAtField" });
const updatedAtField = z
  .string()
  .datetime({ message: "Invalid datetime format for updatedAtField" });

export { idField, createdAtField, updatedAtField };
