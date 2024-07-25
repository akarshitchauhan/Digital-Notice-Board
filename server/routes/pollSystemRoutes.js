// routes/pollRoutes.js
import express from "express";
import { db } from "../config.js";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  getDocs,
  runTransaction,
  deleteDoc,
} from "firebase/firestore/lite";

const router = express.Router();

// Create Poll
router.post("/create", async (req, res) => {
  try {
    const { question, options } = req.body;
    const pollRef = await addDoc(collection(db, "polls"), {
      question,
      options,
      votes: Array(options.length).fill(0),
      createdAt: new Date().toISOString(),
    });
    res.status(201).json({ id: pollRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Vote on Poll
router.post("/vote", async (req, res) => {
  try {
    const { pollId, optionIndex } = req.body;
    const pollRef = doc(db, "polls", pollId);

    await runTransaction(db, async (transaction) => {
      const pollDoc = await transaction.get(pollRef);
      if (!pollDoc.exists()) {
        throw new Error("Poll not found");
      }
      const data = pollDoc.data();
      const newVotes = [...data.votes];
      newVotes[optionIndex] += 1;
      transaction.update(pollRef, { votes: newVotes });
    });

    // Emit vote event to all connected clients
    req.io.emit("vote", { pollId, optionIndex });
    res.status(200).json({ message: "Vote cast successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch Polls
router.get("/getPolls", async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, "polls"));
    const polls = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(polls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
