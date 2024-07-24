import express from "express";
import { createServer } from "http";
import dotenv from "dotenv/config";
import setupSocket from "./socket.js";
import pollRoutes from "./routes/pollSystemRoutes.js";
import cors from "cors";

const app = express();
const server = createServer(app);
const io = setupSocket(server);

// CORS configuration options
const corsOptions = {
  origin: ["http://localhost:5173"],
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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`Server running on ${port}`);
});
