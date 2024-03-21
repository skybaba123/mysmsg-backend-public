import Message from "@/models/message";
import User from "@/models/user";

const deleteUserHandler = async (req: any, res: any) => {
  try {
    const requester = req.user;
    const user = await User.findById(req.body.userId);
    if (!user) return res.status(404).send({ error: "No user found" });

    if (
      requester._id.toString() !== user._id.toString() &&
      requester.role !== "admin"
    ) {
      return res.status(400).send({ error: "Unauthorized access" });
    }

    if (user.role === "admin" && requester.manager !== "yes") {
      return res
        .status(400)
        .send({ error: "Only a Manager can delete other Admins" });
    }

    await User.findByIdAndDelete(req.body.userId);
    await Message.deleteMany({ receiverId: user._id.toString() });
    return res.status(200).send({ msg: "User deleted" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default deleteUserHandler;
