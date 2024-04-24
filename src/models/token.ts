export interface IToken {
  token: string;
  expired?: number;
}

export interface ITokenInfo {
  id?: string;
  token?: string | any;
  createdAt?: string;
  expiresAt?: string;
  userId?: string;
}

export type TSecretKey = string | any;
