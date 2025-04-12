import AppError from "../middlewares/errorHandler";
import User from "../models/user.model";

const getUserById = async (userId: string) => {
  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      throw new AppError(404, "User Not Found");
    }
    return user;
  } catch (error) {
    throw new AppError(500, "Internal Server Error", error);
  }
};
 
export default {
    getUserById,
}