import { z } from "zod";

const urlField = z
  .string()
  .url({ message: "Invalid URL format for urlField" })
  .max(255, { message: "url must not exceed 255 characters" });
const userIdField = z
  .string()
  .uuid({ message: "Invalid UUID format for userIdField" });
const shortCodeField = z
  .string()
  .min(1, { message: "shortCode must have at least 1 character" });
const titleField = z
  .string()
  .min(1, { message: "link title is required" })
  .max(50, { message: "link title must not exceed 50 characters" });

export { urlField, userIdField, shortCodeField, titleField };
