import { Product } from "../models/Product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";



export const getAllProducts = asyncHandler(async (req, res) => {
    const { category, size, orderBy } = req.query;
    const queryObject = {};
    // console.log(category.toString())
    if (category) {
      queryObject.category = category;
    }
    if (size) {
      queryObject.size = size;
    }
  
    if (orderBy) {
      console.log(orderBy);
    }
    const Products = await Product.find(queryObject);
    console.log("🚀 ~ getAllProducts ~ Products:", Products.length);
  
    res.status(200).json({
      success: true,
      Products,
    });
});

export const getSingleProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const Product = await Product.findById(id);
    res.status(200).json({
      success: true,
      Product,
    });
})