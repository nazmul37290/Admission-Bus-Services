import { model, Schema } from "mongoose";
import { TUpdateUserData, TUser } from "./user.interface";
import { AppError } from "../../errors/AppError";

const userSchema = new Schema<TUser>({
  id: {
    type: String,
    unique: true,
    required: true,
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
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  const isAlreadyExists = await userModel.findOne({ email: this?.email });
  if (isAlreadyExists) {
    throw new AppError(409, "User email already exists");
  }
  next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
  const updatedData: TUpdateUserData = this.getUpdate() as TUpdateUserData;

  if (updatedData && updatedData.email) {
    const isAlreadyExists = await userModel.findOne({
      email: updatedData?.email,
    });
    if (isAlreadyExists) {
      throw new Error("User email already exists, cannot update");
    }
  }
  if (updatedData && updatedData.id) {
    throw new AppError(403, "You cannot update id");
  }
  next();
});

userSchema.post("find", async function (doc, next) {
  doc.forEach((item: TUser) => {
    item.password = "";
  });
  next();
});

export const userModel = model<TUser>("user", userSchema);
