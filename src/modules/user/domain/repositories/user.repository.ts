import type { BaseRepository } from "../../../../domain/base.repository";
import type { User } from "../entities/user.entity";

export interface UserRepository extends BaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;
}
