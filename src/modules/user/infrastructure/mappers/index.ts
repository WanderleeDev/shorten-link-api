import { User } from "../../domain/entities/user.entity";
import { ParsedDBRowError } from "../errors/ParseDbError";
import { useResponserDbSchema } from "../validators";

export function mapDbUser(dbUser: unknown): User {
  const parsed = useResponserDbSchema.safeParse(dbUser);

  if (!parsed.success) {
    throw new ParsedDBRowError(400);
  }

  const { id, name, email, createdAt, updatedAt, hashedPassword } = parsed.data;

  return new User(
    id,
    name,
    email,
    hashedPassword,
    new Date(createdAt),
    new Date(updatedAt)
  );
}

export function mapDbUserList(dbUsers: unknown[]): User[] {
  if (dbUsers.length === 0) return [];

  return dbUsers.map((user) => mapDbUser(user));
}
