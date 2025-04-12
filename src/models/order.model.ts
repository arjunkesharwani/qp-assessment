import { DataTypes } from "sequelize";
import sequelize from "../config/db.config";
import Grocery from "./grocery.model";

export interface IItems {
    groceryId: string;
    quantity: number;
}

export interface IOrder {
  id?: string; 
  userId: string; 
  totalPrice: number;
}

export const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default Order;
