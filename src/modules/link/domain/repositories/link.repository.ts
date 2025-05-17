import type { BaseRepository } from "../../../../domain/base.repository";
import type { Link } from "../entities/link.entity";

/**
 * Interface representing a repository for managing Link entities.
 * Extends the BaseRepository interface to include additional operations specific to Link entities.
 */
export interface LinkRepository extends BaseRepository<Link> {
  /**
   * Deletes a group of Link entities by their IDs.
   * @param ids - An array of IDs representing the Link entities to delete.
   * @returns A promise that resolves to a boolean indicating whether the operation was successful.
   */
  deleteGroup(ids: string[]): Promise<boolean>;

  /**
   * Retrieves a Link entity by its title.
   * @param title - The title of the Link entity to retrieve.
   * @returns A promise that resolves to the Link entity if found, or null if not found.
   */
  getByTitle(title: string): Promise<Link | null>;
}
