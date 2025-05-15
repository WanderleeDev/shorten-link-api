export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public hashedPassword: string,
    public createdAt: Date,
    public updatedAt: Date | null
  ) {}
}
