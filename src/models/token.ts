export interface IToken {
  token: string;
}
export interface ITokenInfo {
  id?: string;
  token?: string | any;
  createdAt?: string;
  expiresAt?: string;
  userId?: string;
}
