import { z } from "zod";

const idField = z
  .string()
  .uuid()
  .describe("The unique identifier for the user");
const nameField = z
  .string()
  .min(3, "Name must be at least 3 characters long")
  .max(50, "Name must be at most 50 characters long");
const emailField = z
  .string()
  .email("Invalid email address")
  .max(200, "Email must be at most 200 characters long");
const passwordField = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,50}$/,
    "Password must contain at least one letter and one number"
  );
const hashedPasswordField = z.string().min(60).max(60);
const confirmPasswordField = z
  .string()
  .min(8, "Confirm password must be at least 8 characters long");
const previousPasswordField = z
  .string()
  .min(8, "Previous password must be at least 8 characters long")
  .regex(
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,50}$/,
    "Password must contain at least one letter and one number"
  );
const createdAtField = z.date();
const updatedAtField = z.date();

export {
  idField,
  nameField,
  emailField,
  passwordField,
  confirmPasswordField,
  previousPasswordField,
  hashedPasswordField,
  createdAtField,
  updatedAtField,
};
