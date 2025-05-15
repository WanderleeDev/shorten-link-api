import bcrypt from "bcryptjs";
import type { PasswordEncrypt } from "../../domain/services/PasswordEncrypt.services";
import { PasswordMismatchError } from "../../../../application/errors/PasswordMismatchError";

export class PasswordEncryptService implements PasswordEncrypt {
  #SALTS = 10;

  async hash(password: string): Promise<string> {
    const hashed = await bcrypt.genSalt(this.#SALTS);
    return bcrypt.hash(password, hashed);
  }

  async compare(password: string, hash: string): Promise<void> {
    const isMatch = await bcrypt.compare(password, hash);

    if (!isMatch) {
      throw new PasswordMismatchError("Password does not match");
    }
  }
}
