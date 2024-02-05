import jwt from "jsonwebtoken";
import SOCKETUSER from "../model/socketUser.js";
import USER from "../model/userModel.js";
import MESSAGES from "../model/messageModel.js";
import CHATS from "../model/chatModel.js";
import moment from "moment";
import socketUser from "../model/socketUser.js";

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
    socket.on("connectUser", async function (data) {
      try {
        const { userId } = data;
        const checkUser = await SOCKETUSER.findOne({ userId: userId });
        const socketId = socket.id;
        if (checkUser) {
          let data = await SOCKETUSER.updateOne(
            { userId: userId },
            {
              $set: {
                socketId: socketId,
                isOnline: true,
              },
            }
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
      } catch (error) {
        console.log(error, "err rr rr rr rr rr rr rr rr rr rrr rr rr rr rr ");
        throw Error("Error in connecting user", error.message);
      }
    });

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

    socket.on("sendMessage", async function (sendMessageListener) {
      try {
        const { senderId, receiverId, message, messageType } =
          sendMessageListener;
        const socketId = socket?.id;

        let checkChat = await CHATS.findOne({
          $or: [
            { senderId: senderId, receiverId: receiverId },
            { senderId: receiverId, receiverId: senderId },
          ],
        });

        if (!checkChat) {
          chatData = await CHATS.create({ senderId, receiverId });
        }

        if (
          (checkChat.isBlocked &&
            checkChat.blockedBy?.toString() === senderId.toString()) ||
          (checkChat.isBlocked &&
            checkChat.blockedBy?.toString() === receiverId.toString())
        ) {
          if (checkChat.blockedBy.toString() === senderId.toString()) {
            throw Error("You blocked this user so you can't send message");
          } else {
            throw Error("This user blocked you so you can't send message");
          }
        }
        const chatId = checkChat._id;
        const addNewMessaage = await MESSAGES.create({
          chatId,
          senderId,
          receiverId,
          message,
          messageType,
        });

        const newMsg = {
          messageId: addNewMessaage._id,
          chatId: checkChat,
          name: socket.loginUser.name,
          image: socket.loginUser.image,
          message: addNewMessaage.message,
          lastMessage: moment(addNewMessaage.createdAt).fromNow(),
        };

        io.to(socketId).emit("newMessageSend", newMsg);
        const receiverSide = await SOCKETUSER.findOne({ userId: receiverId });

        if (receiverSide?.socketId) {
          io.to(receiverSide.socketId).emit("newMessageReceive", newMsg);
        }
      } catch (error) {
        console.error("Error in sending message", error.message);
        throw error;
      }
    });

    socket.on("getChatLastMessage", async function (data) {
      try {
        const userId = socket.loginUser._id;

        const socketId = socket.id;
        const getChats = await CHATS.find({
          $or: [{ senderId: userId }, { receiverId: userId }],
        })
          .sort({ createdAt: -1 })
          .populate([
            { path: "senderId", select: "name image" },
            { path: "receiverId", select: "name image" },
          ]);

        const chatList = [];
        const length = getChats.length;

        for (let i = 0; i < getChats.length; i++) {
          const chat = getChats[i];

          const { senderId, receiverId, isBlocked } = chat;

          const lastMessage = await MESSAGES.find({
            chatId: chat._id,
            isDeleted: false,
          })
            .sort({ createdAt: -1 })
            .limit(1);

          const lstMsgData = lastMessage[0];
          const messageData = {
            messageType: lstMsgData.messageType,
            message: lstMsgData.message,
            createdAt: lstMsgData.createdAt,
          };

          const chatData = {
            chatId: chat._id,
            receiverId:
              userId.toString() === senderId.toString() ? receiverId : senderId,
            name:
              userId.toString() === senderId.toString()
                ? chat.receiverId.name
                : chat.senderId.name,
            image:
              userId.toString() === senderId.toString()
                ? chat.receiverId.image
                : chat.senderId.image,
            messageData,
            isBlocked,
          };

          chatList.push(chatData);
        }
        io.to(socketId).emit("getChatLastMessage", chatList);
      } catch (error) {
        console.log(error, "==== error roro ");
        throw Error("Error in getChats", error.message);
      }
    });

    socket.on("getMessagesList", async function (data) {
      const userId = socket.loginUser._id;
      const socketId = socket.id;
      const receiverId = data.receiverId;
      if (!receiverId) {
        throw Error("receiverId is required");
      }

      let getUsersChat = await CHATS.findOne({
        $or: [
          { senderId: userId, receiverId: receiverId },
          { senderId: receiverId, receiverId: userId },
        ],
      });

      if (!getUsersChat) {
        getUsersChat = await CHATS.create({
          senderId: userId,
          receiverId: receiverId,
        });
      }

      const { isBlocked, blockedBy } = getUsersChat;
      if (isBlocked && blockedBy.toString() !== userId.toString()) {
        let message = "You are blocked by this user so you can't send message";

        io.to(socketId).emit("blockedUserStatus", {
          isBlocked,
          message,
        });
      }

      await MESSAGES.updateMany(
        { chatId: getUsersChat._id, isRead: 2 },
        { $set: { isRead: 1 } }
      );

      const messagesList = await MESSAGES.find({
        chatId: getUsersChat._id,
        isDeleted: false,
      })
        .populate([
          { path: "senderId", select: "name image" },
          { path: "receiverId", select: "name image" },
        ])
        .sort({ createdAt: -1 });

      io.to(socketId).emit("getMessagesList", messagesList);
    });

    socket.on("editMessage", async function (data) {
      try {
        const socketId = socket?.id;
        const { messageId, message, receiverId } = data;
        if (!messageId) {
          throw Error("No messageId");
        }

        const updateMessaage = await MESSAGES.findByIdAndUpdate(
          messageId,
          { message: message },
          { new: true }
        );

        io.to(socketId).emit("editMessageListener", updateMessaage);

        const receiverSide = await SOCKETUSER.findOne({ userId: receiverId });
        if (receiverSide?.socketId) {
          io.to(receiverSide.socketId).emit(
            "editMessageListener",
            updateMessaage
          );
        }
      } catch (error) {
        throw Error(error.message);
      }
    });

    socket.on("deleteMessage", async function (data) {
      try {
        const socketId = socket?.id;
        const { messageId, message, receiverId } = data;
        if (!messageId) {
          throw Error("No messageId");
        }

        const updateMessaage = await MESSAGES.findByIdAndUpdate(
          messageId,
          { isDeleted: true, deletedBy: socket.loginUser._id },
          { new: true }
        );

        io.to(socketId).emit("deleteMessageListener", updateMessaage);

        const receiverSide = await SOCKETUSER.findOne({ userId: receiverId });
        if (receiverSide?.socketId) {
          io.to(receiverSide.socketId).emit(
            "deleteMessageListener",
            updateMessaage
          );
        }
      } catch (error) {
        throw Error(error.message);
      }
    });

    socket.on("disconnect", async function () {
      try {
        const userId = socket.loginUser._id;
        const disconnect = await socketUser.updateOne(
          { userId },
          { $set: { isOnline: false } }
        );
      } catch (error) {
        throw Error(error.message);
      }
    });
  });
}
