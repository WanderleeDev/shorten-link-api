import { DeleteResourceError } from "../../../../application/errors/DeleteResourceError";
import type { LinkRepository } from "../../domain/repositories/link.repository";

export class DeleteLink {
  constructor(private repository: LinkRepository) {}

  async execute(id: string) {
    const result = await this.repository.delete(id);

    if (!result) {
      throw new DeleteResourceError(
        500,
        `Failed to delete the link with id: ${id}`
      );
    }
  }
}
