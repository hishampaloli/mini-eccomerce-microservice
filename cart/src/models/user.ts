import mongoose, { Schema } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { ProductAttrs } from "./products";

interface UserAttrs {
  email: string;
  userId: string;
}

interface UserModal extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
  email: string;
  updatedAt: string;
  cart: object[];
  version: number;
}

const productSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  count: {
    type: Number,
    default: 1,
  },
});

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    cart: {
      type: [productSchema],
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

userSchema.set("versionKey", "version");
userSchema.plugin(updateIfCurrentPlugin);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User({
    email: attrs.email,
    _id: attrs.userId,
  });
};

const User = mongoose.model<UserDoc, UserModal>("User", userSchema);

export { User };
