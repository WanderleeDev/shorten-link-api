import bcrypt from "bcryptjs";

export class PasswordEncrypt {
  static #SALTS = 10;

  static async hash(password: string): Promise<string> {
    const hashed = await bcrypt.genSalt(this.#SALTS);
    return bcrypt.hash(password, hashed);
  }

  static async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
