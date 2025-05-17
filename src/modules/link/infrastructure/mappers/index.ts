import { ParsedDBRowError } from "../../../user/infrastructure/errors/ParseDbError";
import { Link } from "../../domain/entities/link.entity";
import { linkResponseSchema } from "../validators";

export function mapDBLink(dbLink: unknown) {
  const parsed = linkResponseSchema.safeParse(dbLink);

  if (!parsed.success) {
    throw new ParsedDBRowError(400, "Failed to parse database link");
  }

  const { id, createdAt, shortCode, updatedAt, url, userId, title } =
    parsed.data;

  return new Link(
    id,
    title,
    url,
    userId,
    shortCode,
    new Date(createdAt),
    new Date(updatedAt)
  );
}

export function mapDBLinkList(dbLinks: unknown[]) {
  if (dbLinks.length === 0) return [];

  return dbLinks.map((link) => mapDBLink(link));
}
