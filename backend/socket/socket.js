import jwt from "jsonwebtoken";
import SOCKETUSER from "../model/socketUser.js";
import USER from "../model/userModel.js";
import MESSAGES from "../model/messageModel.js";
import CHATS from "../model/chatModel.js";

const JWT_SECRET = "secret";
export default function socket(io) {
  io.use(async function (socket, next) {
    try {
      const token = socket.handshake.headers.authorization;
      if (!token) {
        throw new Error("not authorized");
      }
      const compare = jwt.verify(token, JWT_SECRET);
      const loginUser = await USER.findById(compare.checkUser._id);
      if (!loginUser) {
        throw new Error("not authorized");
      }
      socket.loginUser = loginUser;
      next();
    } catch (error) {
      console.error(error);
    }
  });

  io.on("connection", function (socket) {
    try {
      socket.on("connectUser", async function (data) {
        const { userId } = data;
        const checkUser = await SOCKETUSER.findOne({ userId: userId });
        const socketId = socket.id;
        if (checkUser) {
          console.log(socket.id);
          let data = await SOCKETUSER.findOneAndUpdate(
            { userId: userId },
            {
              socketId: socketId,
              isOnline: true,
            },
            { new: true }
          );
        } else {
          let data = await SOCKETUSER.create({
            userId,
            socketId: socketId,
            isOnline: true,
          });
        }

        let message = "Connected successfully";
        socket.emit("connectListener", message);
      });
    } catch (error) {
      console.log(error, "err rr rr rr rr rr rr rr rr rr rrr rr rr rr rr ");
      throw Error("Error in connecting user", error.message);
    }

    socket.on("createChat", async function (data) {
      try {
        const { receiverId } = data;
        if (!receiverId) {
          throw Error("receiverId not found");
        }
        const senderId = socket.loginUser._id;
        const socketId = socket.id;

        const checkChat = await CHATS.findOne({
          $or: [
            { senderId: senderId, receiverId: receiverId },
            { senderId: receiverId, receverId: senderId },
          ],
        });

        if (!checkChat) {
          const addNewChat = await CHATS.create({ senderId, receiverId });
        }

        let message = {
          message: "Chat created sussefully",
        };

        io.to(socketId).emit("chatCreated", message);

        const receiverSide = await SOCKETUSER.findOne({ userId: receiverId });

        if (receiverSide?.socketId) {
          io.to(receiverSide.socketId).emit("newChatCreated", message);
        }
      } catch (error) {
        console.log(error, "XX - XX - XX - XX - XX - XX - XX - XX - XX - XX");
        throw Error("Error in creating chat", error.message);
      }
    });

    socket.on("getChats", async function (data) {
      try {
        const userId = socket.loginUser._id;

        const getChats = await CHATS.find({
          $or: [{ senderId: userId }, { receiverId: userId }],
        })
          .sort({ createdAt: -1 })
          .populate([
            { path: "senderId", select: "name image" },
            { path: "receiverId", select: "name image" },
          ]);

        return;
      } catch (error) {
        console.log(error, "==== error roro ");
        throw Error("Error in getChats", error.message);
      }
    });

    socket.on("sendMessage", async function (sendMessageListener) {
      try {
        console.log(sendMessageListener, "=================");
        const { senderId, receiverId, message, messageType } =
          sendMessageListener;

        const checkMessages = await MESSAGES.findOne({
          $or: [
            { senderId: senderId, receiverId: receiverId },
            { senderId: receiverId, receiverId: senderId },
          ],
        });

        if (!checkMessages) {
          const data = await MESSAGES.create({
            senderId,
            receiverId,
            message,
            messageType,
          });
        }
      } catch (error) {
        console.log(error, "=jdjdj djjd jdjjd jdjdj jdjd jdjd jjd jdjd j");
        throw Error("Error in sending message", error.message);
      }
    });
  });
}
