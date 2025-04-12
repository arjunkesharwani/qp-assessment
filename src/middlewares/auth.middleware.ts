import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import AppError from "./errorHandler";
import userServices from "../services/user.services";

const SECRET_KEY = process.env.JWT_SECRET || "qp@123";

const excludedRoutes = [
  { method: "GET", path: "/public" },
  { method: "POST", path: "/auth/login" },
  { method: "POST", path: "/auth/register" },
];

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const isExcluded = excludedRoutes.some(
      (route) => route.method === req.method && route.path === req.path
    );

    if (isExcluded) {
      return next();
    }

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new AppError(401, "Unauthorized", "Token not provided");
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    res.locals.user = decoded;
    const checkUser = await userServices.getUserById(res.locals.user.id);
    if (!checkUser) {
      throw new AppError(401, "Unauthorized", "User not found");
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!res.locals.user || !roles.includes(res.locals.user.role)) {
      return next(
        new AppError(403, "You do not have permission to access this resource")
      );
    }
    next();
  };
};
