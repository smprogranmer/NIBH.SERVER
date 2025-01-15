import mongoose,{Schema} from 'mongoose';

const OrderSchema = new Schema({
    orderProducts: [
        {
            image:{
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            price:{
                type: Number,
                required:[true,"Please enter your product price"],
            },
            size:{
                type: String,
                required:[true,"Please enter your product size"],
            },
            model:{
                type: Number,
                required:[true,"Please enter your product model"],
            },
            quantity:{
                type: Number,
                required:[true,"Please enter your quantity"],
            },
            status:{
                type: String,
                enum: ["pending", "shipped", "delivered"],
                default: "pending",
            }
        }
    ],
    totalPrice:{
        type:Number,
        required:[true,"Please enter your total price"],
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"Users",
        // required:[true,"Please enter your user id"],
        
    },
    shippingDetails: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        phone: { type: Number, required: true },
        email: { type: String, required: true },
        streetAddress: { type: String, required: true },
        city: { type: String, required: true },
        zipCode: { type: Number,  },
      },
      refId: { type: String},
      orderId: { type: String, required: true,unique: true },
},
{
    timestamps:true
    
})


export const Order = mongoose.models.Orders || mongoose.model("Orders",OrderSchema)