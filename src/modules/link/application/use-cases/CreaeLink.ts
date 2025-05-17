import { CreateResourceError } from "../../../../application/errors/CreateResourceError";
import { ResourceAlreadyExistsError } from "../../../../application/errors/ResourceAlreadyExistsError";
import type { Link } from "../../domain/entities/link.entity";
import type { LinkRepository } from "../../domain/repositories/link.repository";
import type { LinkShortener } from "../../domain/services/LinkShortener.interface";
import type { LinkCreateDTO } from "../DTOs";

export class CreateLink {
  constructor(
    private repository: LinkRepository,
    private linkShortenerService: LinkShortener
  ) {}

  async execute(idUser: string, dataLink: LinkCreateDTO) {
    const existLink = await this.repository.getByTitle(dataLink.title);

    if (existLink) {
      throw new ResourceAlreadyExistsError(
        `A link with the title "${dataLink.title}" already exists.`
      );
    }

    const urlFormat = this.linkShortenerService.shorten(dataLink.url);

    const newLink: Link = {
      id: crypto.randomUUID(),
      title: dataLink.title,
      userId: dataLink.userId,
      shortCode: urlFormat.shortUrl,
      url: urlFormat.originalUrl,
      createdAt: new Date(),
      updatedAt: null,
    };

    const result = await this.repository.create(newLink);

    if (!result) {
      throw new CreateResourceError("Failed to create the link resource.");
    }

    return result;
  }
}
