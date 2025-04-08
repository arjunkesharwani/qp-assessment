import { Request, Response, NextFunction } from "express";

const sendSuccessResponse = (res: Response, statusCode: number, data: any = null, message: string = "Success") => {
  res.status(statusCode).json({ success: true, message, data });
};

export const success = (res: Response, statusCode = 200, data: any = null, message = "Success") => {
  sendSuccessResponse(res, statusCode, data, message);
};
