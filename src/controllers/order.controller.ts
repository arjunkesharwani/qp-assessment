import { NextFunction, Request, Response } from "express";
import orderServices from "../services/order.services";
import { success } from "../middlewares/response.handler";


export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = res.locals.user.id;
    const { items } = req.body;
    const order = await orderServices.createOrder(userId, items);
    success(res, 201, order, "Order created successfully");
  } catch (error) {
    next(error);
  }
};

export const getOrderDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderId = req.params.id;
    const order = await orderServices.getOrderWithDetails(orderId);
    success(res, 200, order, "Order details fetched successfully");
  } catch (error) {
    next(error);
  }
};