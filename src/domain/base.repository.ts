/**
 * Generic interface for a base repository that provides common CRUD operations.
 *
 * @template T - The type of the entity that the repository manages.
 */
export interface BaseRepository<T> {
  /**
   * Finds an entity by its unique identifier.
   *
   * @param id - The unique identifier of the entity.
   * @returns A promise that resolves to the entity if found, or `null` if not found.
   */
  findById(id: string): Promise<T | null>;

  /**
   * Creates a new entity in the repository.
   *
   * @param entity - The entity to be created.
   * @returns A promise that resolves to the created entity, or `null` if creation fails.
   */
  create(entity: T): Promise<T | null>;

  /**
   * Updates an existing entity in the repository.
   *
   * @param id - The unique identifier of the entity to update.
   * @param entity - The updated entity data.
   * @returns A promise that resolves to the updated entity, or `null` if the update fails.
   */
  update(id: string, entity: T): Promise<T | null>;

  /**
   * Deletes an entity from the repository by its unique identifier.
   *
   * @param id - The unique identifier of the entity to delete.
   * @returns A promise that resolves to `true` if the entity was successfully deleted, or `false` otherwise.
   */
  delete(id: string): Promise<boolean>;

  /**
   * Retrieves a paginated list of all entities in the repository.
   *
   * @param page - The page number to retrieve.
   * @returns A promise that resolves to an array of entities for the specified page.
   */
  getAll(page: number): Promise<T[]>;

  /**
   * Partially updates an entity in the repository.
   *
   * @param id - The unique identifier of the entity to update.
   * @param entity - An object containing the partial data to update.
   * @returns A promise that resolves to the updated entity, or `null` if the update fails.
   */
  patch(id: string, entity: Partial<T>): Promise<T | null>;
}
