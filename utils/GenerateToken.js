import { User } from "../models/User.model.js";

export const GenerateToken = async ( user_id) => {
    try {
      const user = await User.findById(user_id);
      console.log("🚀 ~ exports.GenerateToken= ~ user:", user)
  
      const accessToken = user.generateAccessToken();
  
      const options = {
        expire: new Date(
          Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      };
      console.log(user)
  
      return {
        // upgradedUser: user,
        accessToken,
        options,
      };
    } catch (error) {
      console.log(error);
    }
  };
  