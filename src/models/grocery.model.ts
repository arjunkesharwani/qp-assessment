import { DataTypes } from "sequelize";
import sequelize from "../config/db.config";

export interface IGrocery {
  id?: string;
  name: string;
  price: number;
  stock: number;
}

export const Grocery = sequelize.define(
  "Grocery",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);

export default Grocery;