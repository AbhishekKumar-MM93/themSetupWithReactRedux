import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./route/userRoute.js";
import connectDB from "./db.js";
import { Server } from "socket.io";
import http from "http";
import socket from "./socket/socket.js";

dotenv.config();
const app = express();
/** socket connection with sever */
const server = http.createServer(app);
const io = new Server(server, {
  // cors: {
  //   origin: "http://localhost:3000",
  //   methods: ["GET", "POST"],
  // },
});
/** xxxxxxxxxxxxxxxxxxxxxxxxxxx  */

app.use(cors());
app.use(express.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);

socket(io);

connectDB();

server.listen(9111, () => {
  console.log("====================server running on 9111");
});
