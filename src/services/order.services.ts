import sequelize from "../config/db.config";
import AppError from "../middlewares/errorHandler";
import Grocery from "../models/grocery.model";
import OrderItems from "../models/order.items.model";
import Order, { IItems } from "../models/order.model";
import groceryServices from "./grocery.services";

const createOrder = async (userId: string, items: IItems[]) => {
  if (!items || items.length === 0) {
    throw new AppError(400, "Order must contain at least one item.");
  }

  try {
    return await sequelize.transaction(async (transaction) => {
      let totalPrice = 0;

      const groceryData = await Promise.all(
        items.map((item) => groceryServices.getGroceryById(item.groceryId))
      );

      const orderItemsData = [];

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const groceryInstance = groceryData[i];

        if (!groceryInstance) {
          throw new AppError(404, `Grocery item not found: ${item.groceryId}`);
        }

        const grocery = groceryInstance.toJSON();

        if (grocery.stock < item.quantity) {
          throw new AppError(
            400,
            `Insufficient stock for grocery item: ${item.groceryId}`
          );
        }

        await groceryInstance.update(
          { stock: grocery.stock - item.quantity },
          { transaction }
        );

        const itemTotal = grocery.price * item.quantity;
        totalPrice += itemTotal;

        orderItemsData.push({
          groceryId: item.groceryId,
          quantity: item.quantity,
          price: grocery.price,
        });
      }

      const orderData = await Order.create(
        { userId, totalPrice },
        { transaction }
      );
      const order = orderData.toJSON();

      const orderItemsToCreate = orderItemsData.map((item) => ({
        ...item,
        orderId: order.id,
      }));

      await OrderItems.bulkCreate(orderItemsToCreate, { transaction });

      return order;
    });
  } catch (error) {
    console.error("Error creating order:", error);
    throw new AppError(500, "Failed to create order. Please try again later.");
  }
};

const getOrderWithDetails = async (orderId: string) => {
  try {
    const order = await Order.findByPk(orderId, {
      include: [
        {
          model: OrderItems,
          include: [Grocery],
        },
      ],
    });

    if (!order) throw new AppError(404, "Order not found.");
    return order;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};

export default {
  createOrder,
  getOrderWithDetails
};
