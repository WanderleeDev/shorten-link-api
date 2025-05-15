export interface BaseRepository<T> {
  findById(id: string): Promise<T | null>;
  create(entity: T): Promise<T | null>;
  update(id: string, entity: T): Promise<T | null>;
  delete(id: string): Promise<boolean>;
  getAll(page: number): Promise<T[]>;
  patchUser(id: string, entity: Partial<T>): Promise<T | null>;
}
