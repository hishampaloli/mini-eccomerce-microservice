import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface UserAttrs {
  email: string;
  name: string;
  address: string;
  image: string;
  userId: string;
  isBlocked: boolean;
}

interface UserModal extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
  email: string;
  address: string;
  image: string;
  name: string;
  isBlocked: boolean;
  updatedAt: string;
  version: number;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    isBlocked: {
      type: Boolean,
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

userSchema.set("versionKey", "version");
userSchema.plugin(updateIfCurrentPlugin);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User({
    _id: attrs.userId,
    email: attrs.email,
    name: attrs.name,
    address: attrs.address,
    image: attrs.image,
    isBlocked: attrs.isBlocked,
  });
};

const User = mongoose.model<UserDoc, UserModal>("User", userSchema);

export { User };
