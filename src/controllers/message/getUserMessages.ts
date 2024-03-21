import Message from "@/models/message";
import User from "@/models/user";

const getUserMessageHandler = async (req: any, res: any) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).send({ error: "No User Found" });

    const userMessages = await Message.find({
      receiverId: user._id.toString(),
    });

    return res.status(200).send(userMessages.reverse());
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default getUserMessageHandler;
