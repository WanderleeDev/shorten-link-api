export interface LinkShortener {
  shorten(url: string): ShortLinkResponse;
}

export interface ShortLinkResponse {
  originalUrl: string;
  shortUrl: string;
}
