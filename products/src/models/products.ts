import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface ProductAttrs {
  title: string;
  stock: number;
  description: string;
  image: string;
  price: number;
  id: string;
}

interface ProductModal extends mongoose.Model<ProductDoc> {
  build(attrs: ProductAttrs): ProductDoc;
}

interface ProductDoc extends mongoose.Document {
  title: string;
  stock: number;
  description: string;
  image: string;
  price: number;
  updatedAt: string;
  version: number;
}

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

productSchema.set("versionKey", "version");
productSchema.plugin(updateIfCurrentPlugin);

productSchema.statics.build = (attrs: ProductAttrs) => {
  return new Product({
    _id: attrs.id,
    title: attrs.title,
    description: attrs.description,
    price: attrs.price,
    stock: attrs.stock,
    image: attrs.image,
  });
};

const Product = mongoose.model<ProductDoc, ProductModal>(
  "Product",
  productSchema
);

export { Product };
