import { google } from "googleapis";
import dotenv from "dotenv/config";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI // Ensure this matches your extension's redirect URI
);

export const generateAuthUrl = () => {
  const scopes = [
    "https://www.googleapis.com/auth/calendar.readonly", 
    // Add any other scopes you need
  ];
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI, // Ensure this matches the redirect URI in your extension
  });
};

export const getOAuth2Client = () => oauth2Client;

export const authenticateUser = async (code) => {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  return tokens;
};
