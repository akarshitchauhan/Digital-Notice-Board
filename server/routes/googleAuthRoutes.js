// routes/googleAuthRoutes.js
import express from "express";
import {
  getOAuth2Client,
  generateAuthUrl,
  authenticateUser,
} from "../middleware/googleAuth.js";
import { google } from "googleapis";

const router = express.Router();

// Temporarily storing tokens in-memory for simplicity
let tokensStorage = {};

router.get("/auth/google", (req, res) => {
  const url = generateAuthUrl();
  res.redirect(url);
});

router.get("/auth/google/callback", async (req, res) => {
  const code = req.query.code;
  try {
    const tokens = await authenticateUser(code);
    tokensStorage = tokens; // Store tokens for future use
    res.send(`
      <script>
        alert("Authentication successful!"); // Notify the user of success
        window.opener.postMessage('authenticated', '*'); // Notify parent window
        window.close(); // Close the popup window
      </script>
    `);
  } catch (error) {
    console.error("Error during authentication:", error);
    res.status(500).send("Authentication failed");
  }
});

router.get("/calendar/events", async (req, res) => {
  try {
    if (!tokensStorage.access_token) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const oauth2Client = getOAuth2Client();
    oauth2Client.setCredentials(tokensStorage);
    const calendar = google.calendar({ version: "v3", auth: oauth2Client });
    const response = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });
    res.json(response.data.items);
  } catch (error) {
    console.error("Error fetching calendar events:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
