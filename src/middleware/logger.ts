import { Request, Response, NextFunction } from "express"
import winston from "winston"

export const logger = (req: Request, res: Response, next: NextFunction) => {
    let obj = {
        time: new Date(),
        method: req.method,
        url: req.url,
        ip: req.ip
    }
    console.log(obj)
    next()
}

export const winstonLogger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: 'log/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'log/combined.log' })
    ],
})
if (process.env.NODE_ENV !== 'production') {
    winstonLogger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}
