import type { Link } from "../../domain/entities/link.entity";
import type { LinkRepository } from "../../domain/repositories/link.repository";
import { db } from "../../../../externals/db";
import { mapDBLink, mapDBLinkList } from "../mappers";
import { linksTable } from "../../../../externals/db/schema";
import { eq, inArray } from "drizzle-orm";
import type { LinkPatchDTO, LinkUpdateDbDTO } from "../../application/DTOs";

export class LinkRepositoryImpl implements LinkRepository {
  #PAGE_SIZE = 10;

  async findById(id: string): Promise<Link | null> {
    const result = await db.query.linksTable.findFirst({
      where: (links, { eq }) => eq(links.id, id),
    });

    if (!result) return null;

    return mapDBLink(result);
  }

  async getByTitle(title: string): Promise<Link | null> {
    const result = await db.query.linksTable.findFirst({
      where: (links, { eq }) => eq(links.title, title),
    });

    if (!result) return null;

    return mapDBLink(result);
  }

  async create(entity: Link): Promise<Link | null> {
    const result = await db.insert(linksTable).values({
      id: entity.id,
      title: entity.title,
      url: entity.url,
      shortCode: entity.shortCode,
      userId: entity.userId,
    });

    if (result[0].affectedRows > 0) {
      return this.findById(entity.id);
    }

    return null;
  }

  async update(id: string, entity: LinkUpdateDbDTO): Promise<Link | null> {
    const result = await db
      .update(linksTable)
      .set({
        title: entity.title,
        url: entity.url,
        shortCode: entity.shortCode,
      })
      .where(eq(linksTable.id, id));

    if (result[0].affectedRows === 0) return null;

    return await this.findById(id);
  }

  async getAll(page: number = 1): Promise<Link[]> {
    const offset = (page - 1) * this.#PAGE_SIZE;

    const result = await db
      .select()
      .from(linksTable)
      .limit(this.#PAGE_SIZE)
      .offset(offset);

    return mapDBLinkList(result);
  }

  async patch(id: string, entity: LinkPatchDTO): Promise<Link | null> {
    const result = await db
      .update(linksTable)
      .set({ ...entity })
      .where(eq(linksTable.id, id));

    if (result[0].affectedRows === 0) return null;

    return await this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const [result] = await db.delete(linksTable).where(eq(linksTable.id, id));

    return result.affectedRows > 0 ? true : false;
  }

  async deleteGroup(ids: string[]): Promise<boolean> {
    const result = await db
      .delete(linksTable)
      .where(inArray(linksTable.userId, ids));

    return result[0].affectedRows > 0;
  }
}
