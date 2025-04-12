import { Router } from "express";
import { login, registerUser } from "../controllers/auth.controller";

const AuthRouter = Router();

AuthRouter.post("/register", registerUser);

AuthRouter.post("/login", login);

export default AuthRouter;
