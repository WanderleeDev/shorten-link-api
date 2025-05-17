import { ApiError } from "../../../../application/errors/ApiError";
import type {
  LinkShortener,
  ShortLinkResponse,
} from "../../domain/services/LinkShortener.interface";
import { URL } from "url";

class LinkShortenerError extends ApiError {
  constructor(message?: string) {
    super(
      "LinkShortenerError",
      500,
      message ?? "An error occurred while shortening the link"
    );
  }
}

export class LinkShortenerService implements LinkShortener {
  #BASE_URL;
  #UUID_START_INDEX = 0;
  #UUID_END_INDEX = 8;
  #VALID_PROTOCOLS = ["http:", "https:"];

  constructor(urlBase: string) {
    this.#BASE_URL = this.ensureTrailingSlash(urlBase);
  }

  shorten(url: string): ShortLinkResponse {
    try {
      this.validateOriginalUrl(url);

      const shortId = crypto
        .randomUUID()
        .substring(this.#UUID_START_INDEX, this.#UUID_END_INDEX);

      const newUrl = new URL(shortId, this.#BASE_URL);

      return {
        originalUrl: url,
        shortUrl: newUrl.href,
      };
    } catch (error) {
      throw new LinkShortenerError(`
        Failed to shorten the URL: ${
          error instanceof Error ? error.message : "Unknown error"
        }
        `);
    }
  }

  private validateOriginalUrl(url: string): void {
    const parsedUrl = new URL(url);

    if (!this.#VALID_PROTOCOLS.includes(parsedUrl.protocol)) {
      throw new LinkShortenerError("URL must use http or https");
    }
  }

  private ensureTrailingSlash(url: string): string {
    this.validateOriginalUrl(url);
    return url.endsWith("/") ? url : `${url}/`;
  }
}
