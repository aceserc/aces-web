"use server";

import { ContactValidationSchema } from "@/validations/contact";
import { z } from "zod";
import nodemailer from "nodemailer";

type ContactFormData = z.infer<typeof ContactValidationSchema>;

/**
 * Creates HTML email template for contact form submission
 * Params: data (ContactFormData) – form submission data
 * Returns: HTML string for email body
 */
function createEmailTemplate(data: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8f9fa;
        }
        .container {
          background: white;
          border-radius: 8px;
          padding: 30px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          border-bottom: 3px solid #6366f1;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .header h1 {
          color: #6366f1;
          margin: 0;
          font-size: 24px;
        }
        .field {
          margin-bottom: 20px;
        }
        .field-label {
          font-weight: 600;
          color: #374151;
          margin-bottom: 5px;
          display: block;
        }
        .field-value {
          background: #f3f4f6;
          padding: 12px;
          border-radius: 6px;
          border-left: 4px solid #6366f1;
        }
        .message-field {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          font-size: 14px;
          color: #6b7280;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📧 New Contact From ${data.name}</h1>
        </div>
        
        <div class="field">
          <span class="field-label">👤 Name:</span>
          <div class="field-value">${data.name || "Not provided"}</div>
        </div>
        
        <div class="field">
          <span class="field-label">📧 Email:</span>
          <div class="field-value">${data.email || "Not provided"}</div>
        </div>
        
        <div class="field">
          <span class="field-label">📋 Subject:</span>
          <div class="field-value">${data.subject}</div>
        </div>
        
        <div class="field">
          <span class="field-label">💬 Message:</span>
          <div class="field-value message-field">${data.body}</div>
        </div>
        
        <div class="footer">
          <p>This email was sent from your website's contact form.</p>
          <p>Received at: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Sends contact form email using nodemailer
 * Params: data (ContactFormData) – validated form data
 * Returns: Promise with success/error result
 */
export async function sendContactEmail(data: ContactFormData) {
  try {
    /** Validate the form data */
    const validatedData = ContactValidationSchema.parse(data);

    /** Create nodemailer transporter */
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    /** Email options */
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      subject: `${validatedData.subject}`,
      html: createEmailTemplate(validatedData),
      replyTo: validatedData.email || undefined,
    };

    /** Send the email */
    await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: "Email sent successfully!",
    };
  } catch (error) {
    console.error("Failed to send contact email:", error);

    return {
      success: false,
      message: "Failed to send email. Please try again later.",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Server action for handling contact form submissions
 * Params: formData (FormData) – form data from client
 * Returns: Promise with success/error result
 */
export async function submitContactForm(formData: FormData) {
  try {
    /** Extract and validate form data */
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      body: formData.get("body") as string,
    };

    /** Send the email */
    const result = await sendContactEmail(data);

    return result;
  } catch (error) {
    console.error("Contact form submission error:", error);

    return {
      success: false,
      message: "Failed to process form submission.",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
