import { google } from "googleapis";

const cred = [
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.FRONTEND_URL,
];
const oauth2Client = new google.auth.OAuth2(...cred);

export default oauth2Client;
