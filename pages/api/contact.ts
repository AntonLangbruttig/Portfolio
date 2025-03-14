import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { NextApiRequest, NextApiResponse } from "next";

const ses = new SESClient({ region: "us-east-1" });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (!process.env.SES_SENDER_EMAIL || !process.env.SES_RECIPIENT_EMAIL) {
    console.error("Missing env vars:", {
      SES_SENDER_EMAIL: process.env.SES_SENDER_EMAIL,
      SES_RECIPIENT_EMAIL: process.env.SES_RECIPIENT_EMAIL,
    });
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
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(200).json({ message: "Email sent successfully!", result });
  } catch (error: any) {
    console.error("SES Error:", JSON.stringify(error, null, 2));
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(500).json({ message: "Failed to send email", error: error.message });
  }
}