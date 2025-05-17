export interface LinkDTO {
  id: string;
  title: string;
  url: string;
  userId: string;
  shortCode: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export type LinkCreateDTO = Pick<LinkDTO, "title" | "url" | "userId">;

export type LinkUpdateDTO = Pick<LinkDTO, "title" | "url">;

export type LinkUpdateDbDTO = Pick<LinkDTO, "title" | "url" | "shortCode">;

export type LinkPatchDTO = Partial<Pick<LinkDTO, "title" | "url">>;

export type LinkResponseDTO = LinkDTO;
