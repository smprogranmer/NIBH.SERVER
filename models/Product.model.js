import mongoose,{Schema} from 'mongoose';


const  productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        required: true,
        trim: true,
      },
      price: {
        type: Number,
        required: true,
        min: 0,
      },
      category: {
        type: String,
        required: true,
        trim: true,
      },
      sizes: {
        type: Map,
        of: Number,
        default: {},
        validate: {
          validator: function (sizes) {
            return [...sizes.keys()].every(size => [52, 54, 56].includes(Number(size)));
          },
          message: 'Sizes must be one of 52, 54, 56.',
        },
      },
      images: [
        {
          url: {
            type: String,
            required: true,
          },
        },
      ],
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
      },
    },
  {
    timestamps: true,
  });

export const Product = mongoose.models.Products || mongoose.model('Products', productSchema);