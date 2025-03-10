import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { NextApiRequest, NextApiResponse } from "next";
import { rateLimit } from "../../utils/rateLimiter"; // Adjust the import path as necessary

const ses = new SESClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  if (typeof ip === "string" && (await rateLimit(ip))) {
    return res.status(429).json({ message: "Too many requests. Please try again later." });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required." });
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
    const result = await ses.send(new SendEmailCommand(emailParams));
    console.log("SES Response:", result);
    return res.status(200).json({ message: "Email sent successfully!" });
  } catch (error: any) {
    console.error("SES Error:", error);
    return res.status(500).json({ message: "Failed to send email.", error: error.message });
  }
}
