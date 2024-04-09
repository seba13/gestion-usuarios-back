export interface IServerResponse {
  response: {
    code: number;
    status: string;
    message?: string | object;
  };
}
