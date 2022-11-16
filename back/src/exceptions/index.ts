import { Request, Response } from "express"

interface IAppError {
    statusCode: number
    msg: string
}

export class AppError extends Error implements IAppError {
    constructor(public statusCode: number, public msg: string) {
        super()
    }

    static raise(data: IAppError): void {
        throw new AppError(data.statusCode, data.msg)
    }

    static notFound(msg: string): void {
        AppError.raise({ statusCode: 404, msg })
    }

    static handleError(err: unknown, _req: Request, res: Response) {
        if (err instanceof AppError) {
            res.status(err.statusCode).json({
              statusCode: err.statusCode,
              message: err.msg,
            })
          } else {
            res.status(500).json({
              statusCode: 500,
              message: String(err),
              stack: err && typeof err === 'object' ? (err as any).stack : null
            })
          }
        
    }
}

