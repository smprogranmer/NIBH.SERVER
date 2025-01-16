import JWT from "jsonwebtoken";
export const setCookieForOrders = (userRefId,status,res) =>{

    const token = JWT.sign({ refId: userRefId }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE_SECRET_KEY || "30d",
      });
    
      const cookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      };
    
      return res
        .cookie("order_newiraniborkahosue", token, cookieOptions) // Set cookie only if the user exists
        .status(status)
        .json({ message: "Order created successfully" });

}