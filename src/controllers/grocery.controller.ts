import { NextFunction, Request, Response } from "express";
import groceryServices from "../services/grocery.services";
import { success } from "../middlewares/response.handler";


export const addGrocery = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const grocery = await groceryServices.addGrocery(req.body);
    success(res, 201, grocery, "Grocery item added successfully");
  } catch (error) {
    next(error);
  }
};

export const getGroceries = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const groceries = await groceryServices.getAllGroceries();
    success(res, 200, groceries, "Groceries fetched successfully");
  } catch (error) {
    next(error);
  }
};

export const updateGrocery = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updatedGrocery = await groceryServices.updateGrocery(id, req.body);
    success(res, 200, updatedGrocery, "Grocery item updated successfully");
  } catch (error) {
    next(error);
  }
};

export const deleteGrocery = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await groceryServices.deleteGrocery(id);
    success(res, 200, null, "Grocery item deleted successfully");
  } catch (error) {
    next(error);
  }
};