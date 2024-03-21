import { createMessage } from "@/models/message";
import User from "@/models/user";

const createMessageHandler = async (req: any, res: any) => {
  try {
    const receiver = await User.findOne({ username: req.body.username });
    if (!receiver) return res.status(404).send({ error: "No receiver found" });

    await createMessage({
      message: req.body.message,
      receiverId: receiver._id.toString(),
    });

    return res.status(200).send({ msg: "Message sent" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default createMessageHandler;
