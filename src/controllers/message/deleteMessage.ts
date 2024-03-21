import Message from "@/models/message";
import User from "@/models/user";

const deleteMessageHandler = async (req: any, res: any) => {
  try {
    const requester = await User.findById(req.user._id);
    if (!requester) return res.status(404).send({ error: "No user found" });

    const message = await Message.findById(req.body.messageId);
    if (!message) return res.status(404).send({ error: "Message not found" });

    if (
      message.receiverId !== requester._id.toString() &&
      requester.role !== "admin"
    )
      return res
        .status(404)
        .send({ error: "You have no permission to delete this message" });

    await Message.findByIdAndDelete(req.body.messageId);
    return res.status(200).send({ msg: "Message deleted" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default deleteMessageHandler;
