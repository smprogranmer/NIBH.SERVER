import mongoose,{Schema} from 'mongoose';
import validator from "validator";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "Please Enter your first name"],
        maxLength: [30, "name should be less than 30 charator"],
        minLength: [4, "name should be grather than 4 charator"],
      },
      lastName: {
        type: String,
        required: [true, "Please Enter your last name"],
        maxLength: [30, "name should be less than 30 charator"],
        minLength: [4, "name should be grather than 4 charator"],
      },
      email: {
        type: String,
        required: [true, "Please Enter your email"],
        validate: [validator.isEmail, "Please Enter valid email"],
        trim: true,
        unique: true,
      },
      password: {
        type: String,
        required: [true, "Please Enter your password"],
        minLength: [4, "name should be grather than 4 charator"],
        select: false,
      },
      role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
      },
      shippingDetails: [
        {
            firstName: { type: String,  },
            lastName: { type: String,  },
            phone: { type: Number,  },
            email: { type: String, },
            streetAddress: { type: String,  },
            city: { type: String,  },
            zipCode: { type: Number,  },
          }
      ],
      orders: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Orders",
        },
      ],
    },
    {
      timestamps: true,
    });

    
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });

  UserSchema.methods.checkPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };


export const User = mongoose.models.Users || mongoose.model('Users', UserSchema);       
      