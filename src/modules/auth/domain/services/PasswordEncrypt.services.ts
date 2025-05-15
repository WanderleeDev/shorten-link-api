export interface PasswordEncrypt {
  hash(password: string): Promise<string>;
  compare(password: string, hash: string): Promise<void>;
}
