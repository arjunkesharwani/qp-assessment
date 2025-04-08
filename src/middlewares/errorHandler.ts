import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error details:", {
    message: err.message,
    stack: err.stack,
    timestamp: new Date().toISOString(),
    requestUrl: req.originalUrl,
    requestMethod: req.method,
    requestBody: req.body,
    requestParams: req.params,
    requestQuery: req.query,
  });

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  const errorResponse = {
    success: false,
    status: statusCode,
    message,
    error: {
      type: err.name,
      ...(err.data && { data: err.data }),
    },
  };

  if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "local"
  ) {
    errorResponse.error.stack = err.stack;
  }

  res.status(statusCode).json(errorResponse);
};

class AppError extends Error {
  statusCode: number;
  data: any;

  constructor(statusCode: number, message: string, data: any = null) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.data = data;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
