import { Router } from "express";
import { authorizeRoles } from "../middlewares/auth.middleware";
import { addGrocery, deleteGrocery, getGroceries, updateGrocery } from "../controllers/grocery.controller";


const GroceryRouter = Router();

GroceryRouter.post("/", authorizeRoles("admin"), addGrocery);
GroceryRouter.get("/", getGroceries);
GroceryRouter.put("/:id", authorizeRoles("admin"), updateGrocery);
GroceryRouter.delete("/:id", authorizeRoles("admin"), deleteGrocery);

export default GroceryRouter;