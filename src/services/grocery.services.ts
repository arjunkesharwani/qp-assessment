import AppError from "../middlewares/errorHandler";
import Grocery, { IGrocery } from "../models/grocery.model";

const addGrocery = async (groceryData: IGrocery) => {
  try {
    return await Grocery.create({ ...groceryData });
  } catch (error) {
    throw new AppError(500, "Internal Server Error", error);
  }
};

const getGroceryById = async (id: string) => {
  try {
    const grocery = await Grocery.findByPk(id);
    if (!grocery) throw new AppError(404, "Grocery item not found");
    return grocery;
  } catch (error) {
    throw error;
  }
};

const getAllGroceries = async () => {
  try {
    return await Grocery.findAll();
  } catch (error) {
    throw new AppError(500, "Internal Server Error", error);
  }
};

const updateGrocery = async (id: string, updates: Partial<IGrocery>) => {
  try {
    const grocery = await Grocery.findByPk(id);
    if (!grocery) throw new AppError(404, "Grocery item not found");
    return await Grocery.update(updates, {
      where: { id },
    });
  } catch (error) {
    throw new AppError(500, "Internal Server Error", error);
  }
};

const deleteGrocery = async (id: string) => {
  try {
    const grocery = await Grocery.findByPk(id);
    if (!grocery) throw new AppError(404, "Grocery item not found");
    return await Grocery.destroy({
      where: { id },
    });
  } catch (error) {
    throw new AppError(500, "Internal Server Error", error);
  }
};

export default {
  addGrocery,
  getGroceryById,
  getAllGroceries,
  updateGrocery,
  deleteGrocery,
};
