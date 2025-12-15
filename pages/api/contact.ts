import type { NextApiRequest, NextApiResponse } from "next";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

type ContactResponse =
  | { message: string }
  | { message: string; error?: string };

const DEFAULT_REGION = process.env.AWS_REGION ?? "us-east-1";
const ALLOWED_ORIGIN = process.env.CORS_ALLOWED_ORIGIN ?? "*";

const REQUIRED_ENV_VARS = ["SES_SENDER_EMAIL", "SES_RECIPIENT_EMAIL"] as const;

let cachedSesClient: SESClient | null = null;

const ensureEnvVars = () => {
  const missing = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    console.error("Missing required SES environment variables", missing);
    throw new Error("Email service is not configured.");
  }
};

const getSesClient = () => {
  if (cachedSesClient) {
    return cachedSesClient;
  }

  const accessKeyId = process.env.MY_AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.MY_AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY;

  cachedSesClient = new SESClient({
    region: DEFAULT_REGION,
    credentials:
      accessKeyId && secretAccessKey
        ? { accessKeyId, secretAccessKey }
        : undefined,
  });

  return cachedSesClient;
};

const applyCors = (res: NextApiResponse) => {
  res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContactResponse>
) {
  applyCors(res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, message } = req.body ?? {};

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    ensureEnvVars();

    const ses = getSesClient();
    const emailParams = {
      Source: process.env.SES_SENDER_EMAIL,
      Destination: { ToAddresses: [process.env.SES_RECIPIENT_EMAIL!] },
      ReplyToAddresses: [email],
      Message: {
        Subject: { Data: `New Contact Form Message from ${name}` },
        Body: {
          Text: {
            Data: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
          },
          Html: {
            Data: `
              <h1>New Contact Form Message</h1>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Message:</strong></p>
              <p>${message.replace(/\n/g, "<br/>")}</p>
            `,
          },
        },
      },
    };

    const result = await ses.send(new SendEmailCommand(emailParams));

    console.log("Contact email sent", {
      messageId: result.MessageId,
      requestId: result.$metadata?.requestId,
      statusCode: result.$metadata?.httpStatusCode,
    });

    return res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Failed to send contact email", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return res
      .status(500)
      .json({ message: "Failed to send email", error: errorMessage });
  }
}
