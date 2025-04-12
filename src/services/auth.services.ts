import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AppError from "../middlewares/errorHandler";
import User, { IUser } from "../models/user.model";

const SECRET_KEY = process.env.JWT_SECRET || "qp@123";

const registerUserService = async (userData: IUser) => {
  try {
    const { firstName, lastName, email, password, role } = userData;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new AppError(409, "User already exists with this email");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    return newUser;
  } catch (error) {
    console.error("Error in registerUserService:", error);
    throw new AppError(500, "Internal Server Error", error);
  }
};

const login = async (email: string, password: string) => {
  try {
    const data = await User.findOne({ where: { email } });
    const user = JSON.parse(JSON.stringify(data));
    if (!user) {
      throw new AppError(404, "User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError(401, "Invalid password");
    }

    const { id, firstName, lastName, email: userEmail, role } = user;

    const token = jwt.sign(
      { id, firstName, lastName, email: userEmail, role },
      SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    return {
      token,
      user: {
        id,
        firstName,
        lastName,
        email: userEmail,
        role,
      },
    };
  } catch (error) {
    throw new AppError(500, "Internal Server Error", error);
  }
};

export default {
  registerUserService,
  login,
};
