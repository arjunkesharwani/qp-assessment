import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { createOrder, getOrderDetails } from "../controllers/order.controller";


const OrderRouter = Router();

OrderRouter.post("/", createOrder);
OrderRouter.get("/:id", getOrderDetails);

export default OrderRouter;
