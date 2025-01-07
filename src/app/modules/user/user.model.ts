import { model, Schema } from "mongoose";
import { TUpdateUserData, TUser } from "./user.interface";
import { AppError } from "../../errors/AppError";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<TUser>(
  {
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
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const isAlreadyExists = await userModel.findOne({ email: this?.email });
  if (isAlreadyExists) {
    throw new AppError(409, "User email already exists");
  }
  next();
});

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

// userSchema.pre("findOneAndUpdate", async function (next) {
//   const updatedData: TUpdateUserData = this.getUpdate() as TUpdateUserData;

//   if (updatedData && updatedData.email) {
//     const isAlreadyExists = await userModel.findOne({
//       email: updatedData?.email,
//     });
//     if (isAlreadyExists) {
//       throw new Error("User email already exists, cannot update");
//     }
//   }
//   if (updatedData && updatedData.id) {
//     throw new AppError(403, "You cannot update id");
//   }
//   next();
// });

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
