import Message from "@/models/message";
import User from "@/models/user";

const getAllMessageHandler = async (req: any, res: any) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).send({ error: "No User Found" });

    if (user.role !== "admin")
      return res.status(400).send({ error: "Unauthorized access" });

    const messages = await Message.find({});

    return res.status(200).send(messages.reverse());
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default getAllMessageHandler;
