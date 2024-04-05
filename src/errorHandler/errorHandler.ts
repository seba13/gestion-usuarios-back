import { Request, Response } from 'express';

export class ErrorHandler extends Error {
  public status?: number | 500;

  constructor(status?: number, message?: string | any) {
    super(message);
    this.status = status;
  }

  public setStatus(status: number) {
    this.status = status;
  }

  public setMessage(msg: string) {
    this.message = msg;
  }

  public static errorHandler(
    err: ErrorHandler,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next?: any
  ): void {
    if (err) {
      res.status(err.status || 500).json({
        error: err.message,
      });
    }
  }
}
