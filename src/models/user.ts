import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, trim: true, lowercase: true, required: true },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },

    hashedPassword: {
      type: String,
      required: true,
    },

    role: { type: String, enum: ["user", "admin"], default: "user" },

    manager: { type: String, enum: ["yes", "no"], default: "no" },

    verificationCode: String,
    verificationCodeExpiry: Number,
    sessionToken: String,
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;

export const createUser = async (data: {
  username: string;
  email: string;
  hashedPassword: string;
}) => new User(data).save();

// export const getAllUsers = async () => User.find({});

// export const getUserById = async (id: string) => User.findById(id);

// export const getUserByEmail = async (email: string) => User.findOne({ email });

// export const getUserByUsername = async (username: string) =>
//   User.findOne({ username });

// export const deleteUserById = async (id: string) => User.findByIdAndDelete(id);
