import { DataTypes } from "sequelize";
import sequelize from "../config/db.config";
import Order from "./order.model";
import Grocery from "./grocery.model";

export const OrderItems = sequelize.define(
  "OrderItems",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Order,
        key: "id",
      },
    },
    groceryId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Grocery,
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Order.hasMany(OrderItems, { foreignKey: "orderId" });
OrderItems.belongsTo(Order, { foreignKey: "orderId" });

Grocery.hasMany(OrderItems, { foreignKey: "groceryId" });
OrderItems.belongsTo(Grocery, { foreignKey: "groceryId" });

export default OrderItems;