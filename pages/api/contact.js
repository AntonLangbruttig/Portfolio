import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({
  region: "us-east-1", // Change if needed
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const emailParams = {
    Source: process.env.SES_SENDER_EMAIL, // Must be verified in AWS SES
    Destination: {
      ToAddresses: [process.env.SES_RECIPIENT_EMAIL], // Your Gmail
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
  } catch (error) {
    console.error("SES Error:", error);
    return res.status(500).json({ message: "Failed to send email.", error: error.message });
  }
}
