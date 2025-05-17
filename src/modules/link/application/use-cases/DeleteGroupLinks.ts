import { DeleteResourceError } from "../../../../application/errors/DeleteResourceError";
import type { LinkRepository } from "../../domain/repositories/link.repository";

export class DeleteGroupLinks {
  constructor(private repository: LinkRepository) {}

  async execute(ids: string[]) {
    const result = await this.repository.deleteGroup(ids);

    if (!result) {
      throw new DeleteResourceError(
        500,
        `Failed to delete the group of links.`
      );
    }
  }
}
