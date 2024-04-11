export class IpUtils {
  constructor() {}

  public static getIp(req: any) {
    return req.header('x-forwarded-*') || req.connection.remoteAddress;
  }
}
