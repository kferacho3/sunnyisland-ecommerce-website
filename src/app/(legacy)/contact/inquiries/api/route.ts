import net from "net";
import { NextRequest, NextResponse } from "next/server";

/**
 * Simple in-memory store for rate limiting by email.
 * Maps: email -> { count: number; day: string (YYYY-MM-DD) }
 */
const rateLimitStore: Record<string, { count: number; day: string }> = {};

/**
 * SMTP configuration. Replace with your actual credentials.
 */
const SMTP_HOST = "sunnyislandpepper@gmail.com"; // e.g. smtp.gmail.com
const SMTP_PORT = 587; // or 465 for SSL
const SMTP_USER = "yourSMTPusername";
const SMTP_PASS = "yourSMTPpassword";

/**
 * Minimal raw SMTP send (unencrypted or STARTTLS).
 * For robust solutions, consider a library like nodemailer.
 */
async function sendEmailRaw(
  to: string,
  subject: string,
  message: string,
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const client = net.createConnection(SMTP_PORT, SMTP_HOST, () => {
      // Connected, proceed with SMTP handshake.
      client.write(`EHLO yourdomain.com\r\n`);
    });

    let step = 0;
    client.on("data", (data) => {
      const res = data.toString();

      if (step === 0 && res.startsWith("250")) {
        // Server greeted. Attempt AUTH if needed:
        client.write(`AUTH LOGIN\r\n`);
        step++;
      } else if (step === 1 && res.includes("334")) {
        // Username prompt
        client.write(Buffer.from(SMTP_USER).toString("base64") + "\r\n");
        step++;
      } else if (step === 2 && res.includes("334")) {
        // Password prompt
        client.write(Buffer.from(SMTP_PASS).toString("base64") + "\r\n");
        step++;
      } else if (step === 3 && res.startsWith("235")) {
        // Auth successful
        client.write(`MAIL FROM:<${SMTP_USER}>\r\n`);
        step++;
      } else if (step === 4 && res.startsWith("250")) {
        // Sender OK
        client.write(`RCPT TO:<${to}>\r\n`);
        step++;
      } else if (step === 5 && res.startsWith("250")) {
        // Recipient OK
        client.write(`DATA\r\n`);
        step++;
      } else if (step === 6 && res.startsWith("354")) {
        // Send message content
        client.write(`Subject: ${subject}\r\n`);
        client.write(`From: ${SMTP_USER}\r\n`);
        client.write(`To: ${to}\r\n`);
        client.write(`Content-Type: text/plain; charset=UTF-8\r\n\r\n`);
        client.write(`${message}\r\n.\r\n`);
        step++;
      } else if (step === 7 && res.startsWith("250")) {
        // Message accepted
        client.write(`QUIT\r\n`);
        step++;
      } else if (step === 8 && res.startsWith("221")) {
        // Connection closed
        client.end();
        resolve();
      }
    });

    client.on("error", (err) => {
      reject(err);
    });
  });
}

/**
 * The POST request handler for /contact/inquiries/api
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Basic validation
    const { email, subject, message } = body ?? {};
    if (!email || !subject || !message) {
      return NextResponse.json(
        { error: "Invalid form submission." },
        { status: 400 },
      );
    }

    // Rate limit by day: max 3 messages per day per email
    const today = new Date().toISOString().split("T")[0];
    const stored = rateLimitStore[email];
    if (!stored || stored.day !== today) {
      rateLimitStore[email] = { count: 1, day: today };
    } else {
      if (stored.count >= 3) {
        return NextResponse.json(
          { error: "Message limit exceeded (3 per day per email)." },
          { status: 429 },
        );
      }
      stored.count += 1;
    }

    // Prepare final message
    const finalMessage = `User Email: ${email}\nSubject: ${subject}\n\nMessage:\n${message}\n`;

    // Send via SMTP
    await sendEmailRaw(
      "sunnyislandpepper@gmail.com",
      `Inquiry: ${subject}`,
      finalMessage,
    );

    // Respond success
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error in /contact/inquiries/api route:", err);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
