import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { NextApiRequest, NextApiResponse } from "next";
import { rateLimit } from "../../utils/rateLimiter"; // Adjust the import path as necessary

// Initialize AWS SES Client (no credentials, AWS will auto-detect them)
const ses = new SESClient({ region: "us-east-1" });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // Get client IP for rate limiting
  const ipRaw = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const ip = Array.isArray(ipRaw) ? ipRaw[0] : ipRaw?.split(",")[0].trim(); // Handle multiple IPs

  if (typeof ip === "string" && (await rateLimit(ip))) {
    return res.status(429).json({ message: "Too many requests. Please try again later." });
  }

  // Extract request body
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Ensure environment variables exist
  if (!process.env.SES_SENDER_EMAIL || !process.env.SES_RECIPIENT_EMAIL) {
    console.error("SES Configuration Error: Missing sender or recipient email in environment variables.");
    return res.status(500).json({ message: "Server misconfiguration. Please try again later." });
  }

  const emailParams = {
    Source: process.env.SES_SENDER_EMAIL!,
    Destination: {
      ToAddresses: [process.env.SES_RECIPIENT_EMAIL!],
    },
    Message: {
      Subject: { Data: `New Contact Form Message from ${name}` },
      Body: {
        Text: {
          Data: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        },
      },
    },
  };

  try {
    console.log("Sending email with params:", JSON.stringify(emailParams, null, 2));
    const result = await ses.send(new SendEmailCommand(emailParams));
    console.log("SES Response:", result);
    return res.status(200).json({ message: "Email sent successfully!" });
  } catch (error: any) {
    console.error("SES Error:", JSON.stringify(error, null, 2));
    return res.status(500).json({ message: "Failed to send email.", error: error.message });
  }
}
