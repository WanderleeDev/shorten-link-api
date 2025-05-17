export class Link {
  constructor(
    public id: string,
    public title: string,
    public url: string,
    public userId: string,
    public shortCode: string,
    public createdAt: Date,
    public updatedAt: Date | null
  ) {}
}
