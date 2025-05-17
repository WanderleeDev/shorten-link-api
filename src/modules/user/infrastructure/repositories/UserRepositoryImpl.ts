import { User } from "../../domain/entities/user.entity";
import type { UserRepository } from "../../domain/repositories/user.repository";
import { db } from "../../../../externals/db";
import { usersTable } from "../../../../externals/db/schema";
import { mapDbUser, mapDbUserList } from "../mappers";
import { eq } from "drizzle-orm";
import type { UserPatchDTO, UserUpdateFormatDTO } from "../../application/DTOs";

export class UserRepositoryImpl implements UserRepository {
  #PAGE_SIZE = 10;

  async findByEmail(email: string): Promise<User | null> {
    const result = await db.query.usersTable.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });

    if (!result) return null;

    return mapDbUser(result);
  }

  async findById(id: string): Promise<User | null> {
    const result = await db.query.usersTable.findFirst({
      where: (users, { eq }) => eq(users.id, id),
    });

    if (!result) return null;

    return mapDbUser(result);
  }

  async getAll(page: number = 1): Promise<User[]> {
    const offset = (page - 1) * this.#PAGE_SIZE;

    const result = await db
      .select()
      .from(usersTable)
      .limit(this.#PAGE_SIZE)
      .offset(offset);

    return mapDbUserList(result);
  }

  async create(entity: User): Promise<User | null> {
    const result = await db.insert(usersTable).values({
      id: entity.id,
      name: entity.name,
      email: entity.email,
      hashedPassword: entity.hashedPassword,
    });

    if (result[0].affectedRows > 0) {
      return this.findById(entity.id);
    }

    return null;
  }

  async update(id: string, entity: UserUpdateFormatDTO): Promise<User | null> {
    const result = await db
      .update(usersTable)
      .set({
        name: entity.name,
        email: entity.email,
        hashedPassword: entity.hashedPassword,
      })
      .where(eq(usersTable.id, id));

    if (result[0].affectedRows === 0) return null;

    return await this.findById(id);
  }

  async patch(id: string, entity: UserPatchDTO): Promise<User | null> {
    const result = await db
      .update(usersTable)
      .set({ ...entity })
      .where(eq(usersTable.id, id));

    if (result[0].affectedRows === 0) return null;

    return await this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const [result] = await db.delete(usersTable).where(eq(usersTable.id, id));

    return result.affectedRows > 0;
  }
}
