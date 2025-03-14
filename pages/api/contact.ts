import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { NextApiRequest, NextApiResponse } from "next";
import { rateLimit } from "../../utils/rateLimiter";

// Initialize SES outside handler to reduce cold start time
const ses = new SESClient({ region: "us-east-1" });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const ipRaw = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const ip = Array.isArray(ipRaw) ? ipRaw[0] : ipRaw?.split(",")[0].trim();

  if (typeof ip === "string" && (await rateLimit(ip))) {
    return res.status(429).json({ message: "Too many requests. Please try again later." });
  }

  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (!process.env.SES_SENDER_EMAIL || !process.env.SES_RECIPIENT_EMAIL) {
    console.error("SES Configuration Error: Missing env vars");
    return res.status(500).json({ message: "Server misconfiguration" });
  }

  const emailParams = {
    Source: process.env.SES_SENDER_EMAIL,
    Destination: { ToAddresses: [process.env.SES_RECIPIENT_EMAIL] },
    Message: {
      Subject: { Data: `New Contact Form Message from ${name}` },
      Body: { Text: { Data: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}` } },
    },
  };

  try {
    console.log("Sending email with params:", JSON.stringify(emailParams, null, 2));
    const result = await ses.send(new SendEmailCommand(emailParams));
    console.log("SES Response:", JSON.stringify(result, null, 2));
    res.setHeader("Access-Control-Allow-Origin", "*"); // Add CORS if needed
    return res.status(200).json({ message: "Email sent successfully!" });
  } catch (error: any) {
    console.error("SES Error:", JSON.stringify(error, null, 2));
    return res.status(500).json({ message: "Failed to send email", error: error.message });
  }
}

// Optional: Increase Lambda timeout in Amplify
export const config = {
  api: {
    externalResolver: true, // Helps with async responses
  },
};