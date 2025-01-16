import JWT from "jsonwebtoken";
export const setCookieForOrders = (userRefId,status,res) =>{

    const token = JWT.sign({ refId: userRefId }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE_SECRET_KEY || "30d",
      });
    
      const cookieOptions = {
        httpOnly: true,
        secure: true,
      };
    
      return res
        .cookie("order_newiraniborkahosue", token, cookieOptions) // Set cookie only if the user exists
        .status(status)
        .json({ message: "Order created successfully" });

}