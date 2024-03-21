import changeMessageStatusHandler from "@/controllers/message/changeMessageStatus";
import createMessageHandler from "@/controllers/message/createMessage";
import deleteMessageHandler from "@/controllers/message/deleteMessage";
import getAllMessageHandler from "@/controllers/message/getAllMessages";
import getUserMessageHandler from "@/controllers/message/getUserMessages";
import userAuth from "@/middlewares/userAuth";
import { Router } from "express";

const router = Router();

router.post("/message/create", createMessageHandler);
router.get("/messages/user", userAuth, getUserMessageHandler);
router.get("/messages", userAuth, getAllMessageHandler);
router.post("/message/delete", userAuth, deleteMessageHandler);
router.post("/message/status", userAuth, changeMessageStatusHandler);
export default router;
