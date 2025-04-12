import { NextFunction, Request, Response } from "express";
import authServices from "../services/auth.services";
import { success } from "../middlewares/response.handler";
import { IUser } from "../models/user.model";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = req.body as IUser;
    const newUser = await authServices.registerUserService(userData);
    const registeredUser = JSON.parse(JSON.stringify(newUser));
    success(res, 201, registeredUser, "User registered successfully");
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const result = await authServices.login(email, password);
    const login = JSON.parse(JSON.stringify(result));
    success(res, 200, login, "Login successful");
  } catch (error) {
    next(error);
  }
};
