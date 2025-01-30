import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { GenerateToken } from "../utils/GenerateToken.js";

export const singInUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log("🚀 ~ singInUser ~ password:", password);
  // logic for user login goes here
  if (!email || !password) {
    throw new ApiError(400, "All fields are required");
  }
  // check if user exists in database and password is correct
  const user = await User.findOne({ email }).select("+password");
  console.log("🚀 ~ singInUser ~ user:", user);

  if (!user || !user.checkPassword(password)) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  }

  // if(!user ||!(await user.isPasswordCorrect(password))){
  //     throw new ApiError(401, "Invalid email or password");
  // }
  // if true, generate JWT token and set it in cookie
  const { accessToken, options } = await GenerateToken(user._id);
  return res.status(200).cookie("accessToken", accessToken, options).json({
    success: true,
    message: "User login successful",
    accessToken,
  });
});
export const singUpUser = asyncHandler(async (req, res) => {
  // logic for user registration goes here
  const { fullName, email, password } = req.body;
  console.log("🚀 ~ singUpUser ~ fullName:", fullName)

  if (!fullName || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }
  // check if user already exists in database
  const user = await User.findOne({ email });
  console.log("🚀 ~ singUpUser ~ user:", user)
  if (user) {
    throw new ApiError(400, "User already exists");
  }
  // create new user in database
  const newUser = await User.create({ fullName, email, password });
  console.log("🚀 ~ singUpUser ~ newUser:", newUser)
  // generate JWT token and set it in cookie
  return res.status(200).json({
    success: true,
    message: "User registration successful",
  });
});
