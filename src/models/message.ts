import { model, Schema } from "mongoose";

const messageSchema = new Schema(
  {
    message: { type: String, required: true, trim: true },
    receiverId: { type: String, required: true },
    status: { type: String, enum: ["active", "archive"], default: "active" },
  },
  { timestamps: true }
);

const Message = model("Message", messageSchema);

export default Message;

export const createMessage = async (data: {
  message: string;
  receiverId: string;
}) => new Message(data).save();
