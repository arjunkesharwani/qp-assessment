import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { errorHandler } from "./src/middlewares/errorHandler";
import { connectToDatabase } from "./src/config/db.config";
import AuthRouter from "./src/routes/auth.routes";
import { authenticate } from "./src/middlewares/auth.middleware";

const app = express();

config();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(authenticate);

app.use("/auth", AuthRouter);

app.use(errorHandler);

app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Server is running on port ${PORT}`);
});
