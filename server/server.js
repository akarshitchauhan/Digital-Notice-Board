import express from "express";
import { createServer } from "http";

import setupSocket from "./socket.js";
import pollRoutes from "./routes/pollSystemRoutes.js";
import cors from "cors";
import cron from "node-cron";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore/lite";
import { db } from "./config.js"; // Ensure correct path to config
import googleAutRoutes from "./routes/googleAuthRoutes.js"

const app = express();
const server = createServer(app);
const io = setupSocket(server);

// CORS configuration options
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "chrome-extension://njdhjlkfbinmakpnbiakfbbcahjodhaf",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Middleware to attach io to requests
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/polls", pollRoutes);
app.use("/google", googleAutRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Function to delete expired polls
const deleteExpiredPolls = async () => {
  try {
    console.log("Running deleteExpiredPolls...");
    const snapshot = await getDocs(collection(db, "polls"));
    const now = new Date().getTime();
    const polls = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    polls.forEach(async (poll) => {
      const createdAt = new Date(poll.createdAt).getTime();
      const ageInHours = (now - createdAt) / (1000 * 60 * 60);
      console.log(`Poll ID: ${poll.id}, Age: ${ageInHours} hours`);

      if (ageInHours >= 24) {
        await deleteDoc(doc(db, "polls", poll.id));
        console.log(`Deleted poll with ID: ${poll.id}`);
      }
    });
  } catch (error) {
    console.error("Error deleting expired polls:", error);
  }
};

// // Schedule the job to run every minute (for testing purposes)
// cron.schedule("* * * * *", deleteExpiredPolls);
// Schedule the job to run every 30 minutes
cron.schedule("*/30 * * * *", deleteExpiredPolls);

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`Server running on ${port}`);
});
