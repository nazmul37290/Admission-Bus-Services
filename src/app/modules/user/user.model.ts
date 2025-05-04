import { model, Schema } from "mongoose";
import { TUpdateUserData, TUser } from "./user.interface";
import bcrypt from "bcryptjs";
import config from "../../config";

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "disable"],
      default: "active",
    },
    resetToken: { type: String },
    resetTokenExpires: { type: Date },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this?.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});
userSchema.pre("findOneAndUpdate", async function (next) {
  const updateData: TUpdateUserData = this.getUpdate() as TUpdateUserData;
  if (updateData?.password) {
    updateData.password = await bcrypt.hash(
      updateData?.password,
      Number(config.bcrypt_salt_rounds)
    );
  }
  next();
});

userSchema.post("find", async function (doc, next) {
  if (doc) {
    if (Array.isArray(doc)) {
      doc?.forEach((item: TUser) => {
        item.password = "";
      });
    } else {
      doc.password = "";
    }
  }
  next();
});
userSchema.post("findOne", async function (doc, next) {
  if (doc) {
    if (this.getQuery().email) {
      next();
    } else {
      doc.password = "";
    }
  }
  next();
});

export const userModel = model<TUser>("user", userSchema);
