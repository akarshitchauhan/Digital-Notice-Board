import { Server } from "socket.io";
import dotenv from "dotenv/config";
const chromeId = process.env.GOOGLE_CHROME_ID;

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173",`chrome-extension://${chromeId}`],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });

    // Handle other events, e.g., votes
    socket.on("vote", ({ pollId, optionIndex }) => {
      io.emit("vote", { pollId, optionIndex });
    });
  });

  return io;
};
export default setupSocket;
