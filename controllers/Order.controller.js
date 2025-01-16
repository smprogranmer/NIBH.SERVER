import { Order } from "../models/Order.model.js";
import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import JWT from "jsonwebtoken";
import { checkAndSetCookies } from "../utils/CheckCookieAndCreate.js";
import { setCookieForOrders } from "../utils/setCookieForOrder.js";

export const createOrder = asyncHandler(async (req, res) => {
  // // logic for creating order goes here
  const { totalPrice, orderProducts, shippingDetails } = req.body;

  const { order_newiraniborkahosue } = req.cookies;

  const { refId, orderId } = checkAndSetCookies(order_newiraniborkahosue);

  let user;
  let userRefId = refId;

  if (
    !totalPrice ||
    !orderProducts ||
    !shippingDetails ||
    !shippingDetails.firstName ||
    !shippingDetails.lastName ||
    !shippingDetails.phone ||
    !shippingDetails.email ||
    !shippingDetails.streetAddress ||
    !shippingDetails.city ||
    !shippingDetails.zipCode
  ) {
    throw new ApiError(400, "All fields are required");
  }
  // check user exit
  if (shippingDetails.user) {
    user = await User.findOne({ email: shippingDetails.email });

    if (!user) {
      user = await User.create({
        firstName: shippingDetails.firstName,
        lastName: shippingDetails.lastName,
        email: shippingDetails.email,
        password: shippingDetails.phone, // Temporary password
      });
    }

    // Ensure shippingDetails is an array
    if (!Array.isArray(user.shippingDetails)) {
      user.shippingDetails = [];
    }

    // Add new shipping address if not already present
    const existingAddress = user.shippingDetails.find(
      (address) =>
        address.streetAddress === shippingDetails.streetAddress &&
        address.city === shippingDetails.city &&
        address.zipCode === shippingDetails.zipCode
    );

    if (!existingAddress) {
      user.shippingDetails.push(shippingDetails);
    }
  }

  const order = await Order.create({
    orderId,
    orderProducts,
    totalPrice,
    shippingDetails,
    userId: user ? user._id : null, // Attach user ID if available
    refId: user ? "" : userRefId,
  });

  if (user) {
    // Update user's order history if the user exists
    user.orders.push(order._id);
    await user.save();
  }

  if (order_newiraniborkahosue) {
    return res.status(200).json({
      message: "Order created successfully without set cookie",
      order,
    });
  }

  setCookieForOrders(userRefId, 200, res);
});

export const getAllOrder = asyncHandler(async (req, res) => {
  const orders = await Order.find();
  return res
    .status(200)
    .json(new ApiResponse(200, "Orders fetched successfully"));
});

export const getOrderByUser = asyncHandler(async (req, res) => {
  // get order by phone number or email and order Id
  const { userDetails, orderId } = req.query;
  if (!orderId || !userDetails) {
    return ApiError(400, "Please provide a valid query parameter");
  }

  // check is there any order in database by phone or email user can send only one  phone or email  and order Id those three should be in order
  const query = {
    orderId: orderId,
    [contact.includes("@") ? "email" : "phone"]: contact,
  };

  const order = await Order.findOne(query);
  console.log("🚀 ~ getOrderByUser ~ order:", order);

  return res
    .status(200)
    .json(new ApiResponse(200, "Orders fetched successfully for user"));
});

export const getOrdersByUserRefId = asyncHandler(async (req, res) => {
  // get user email from cookie then find order by user email
  const { order_newiraniborkahosue } = req.cookies;
  console.log("🚀 ~ getOrdersByUserRefId ~ refId:", order_newiraniborkahosue);
  if (!order_newiraniborkahosue) {
    throw new ApiError(401, "Unauthorized request");
  }

  // decoded the refId to find order by refId
  const decodeRefId = JWT.verify(
    order_newiraniborkahosue,
    process.env.JWT_SECRET_KEY
  );

  if (!decodeRefId) {
    throw new ApiResponse(404, "Order not found");
  }
  // find order by refId in database
  const order = await Order.find(
    {
      refId: decodeRefId.refId,
    },
    {
      orderProducts: 1,
      totalPrice: 1,
      orderId: 1,
      _id: 0, // Exclude _id from the output
    }
  );
  console.log("🚀 ~ getOrdersByUserRefId ~ order:", order);
  if (!order) return ApiError(404, "Order not found");

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Orders fetched successfully for user"));
});
