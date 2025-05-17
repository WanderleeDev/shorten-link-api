import { NotFoundResourceError } from "../../../../application/errors/NotFoundResourceError";
import type { Link } from "../../domain/entities/link.entity";
import type { LinkRepository } from "../../domain/repositories/link.repository";

export class GetLink {
  constructor(private readonly repository: LinkRepository) {}

  async execute(id: string): Promise<Link> {
    const result = await this.repository.findById(id);

    if (!result) {
      throw new NotFoundResourceError(`Link with ID ${id} was not found`);
    }

    return result;
  }
}
