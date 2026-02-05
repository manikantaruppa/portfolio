// Vercel Serverless Function for Contact Form Email
const nodemailer = require('nodemailer');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validate request body
function validateRequest(body) {
  const errors = [];

  if (!body.first_name || body.first_name.trim().length < 2 || body.first_name.trim().length > 50) {
    errors.push({ field: 'first_name', message: 'First name must be between 2 and 50 characters' });
  }

  if (!body.last_name || body.last_name.trim().length < 2 || body.last_name.trim().length > 50) {
    errors.push({ field: 'last_name', message: 'Last name must be between 2 and 50 characters' });
  }

  if (!body.email || !emailRegex.test(body.email)) {
    errors.push({ field: 'email', message: 'Please provide a valid email address' });
  }

  if (!body.subject || body.subject.trim().length < 5 || body.subject.trim().length > 100) {
    errors.push({ field: 'subject', message: 'Subject must be between 5 and 100 characters' });
  }

  if (!body.message || body.message.trim().length < 10 || body.message.trim().length > 1000) {
    errors.push({ field: 'message', message: 'Message must be between 10 and 1000 characters' });
  }

  return errors;
}

// Create email transporter
function createTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD
    }
  });
}

// Email template for admin notification
function createEmailTemplate(data) {
  const { first_name, last_name, email, subject, message } = data;

  return {
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #f4f4f4; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
          .content { background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
          .footer { margin-top: 20px; font-size: 12px; color: #666; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #555; }
          .value { margin-top: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Contact Form Submission</h2>
            <p>You have received a new message from your website contact form.</p>
          </div>

          <div class="content">
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${first_name} ${last_name}</div>
            </div>

            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${email}</div>
            </div>

            <div class="field">
              <div class="label">Subject:</div>
              <div class="value">${subject}</div>
            </div>

            <div class="field">
              <div class="label">Message:</div>
              <div class="value" style="white-space: pre-wrap;">${message}</div>
            </div>
          </div>

          <div class="footer">
            <p>This message was sent from your website contact form on ${new Date().toLocaleString()}.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
New Contact Form Submission

Name: ${first_name} ${last_name}
Email: ${email}
Subject: ${subject}

Message:
${message}

Sent: ${new Date().toLocaleString()}
    `
  };
}

// Auto-reply template
function createAutoReplyTemplate(firstName) {
  return {
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.7; color: #2d3748; background-color: #f7fafc; }
          .container { max-width: 600px; margin: 0 auto; padding: 30px 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
          .header h2 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; }
          .content { background-color: #ffffff; padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 10px 10px; }
          .greeting { font-size: 18px; color: #2d3748; margin-bottom: 20px; }
          .message-text { color: #4a5568; margin-bottom: 15px; }
          .highlight { background-color: #edf2f7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
          .social-links { margin: 25px 0; padding: 20px 0; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; }
          .social-links p { margin-bottom: 12px; color: #4a5568; font-weight: 500; }
          .social-links a { color: #667eea; text-decoration: none; margin-right: 20px; font-weight: 500; }
          .signature { margin-top: 25px; }
          .signature .name { font-weight: 600; color: #2d3748; font-size: 16px; }
          .signature .title { color: #718096; font-size: 14px; margin-top: 3px; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #a0aec0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Thank You for Reaching Out!</h2>
          </div>

          <div class="content">
            <p class="greeting">Hi ${firstName},</p>

            <p class="message-text">Thank you for getting in touch! I've received your message and truly appreciate you taking the time to reach out.</p>

            <div class="highlight">
              <p style="margin: 0; color: #4a5568;">I'll review your message and get back to you within <strong>24-48 hours</strong>. If your inquiry is urgent, feel free to connect with me directly on LinkedIn.</p>
            </div>

            <p class="message-text">In the meantime, you might find these helpful:</p>

            <div class="social-links">
              <p>Let's Connect:</p>
              <a href="https://linkedin.com/in/manikanta-ruppa-496102217" target="_blank">LinkedIn</a>
              <a href="https://github.com/manikantaruppa" target="_blank">GitHub</a>
              <a href="https://medium.com/@manikantaruppa" target="_blank">Medium Blog</a>
              <a href="https://kaggle.com/manikantaruppa" target="_blank">Kaggle</a>
            </div>

            <div class="signature">
              <p class="name">Manikanta Ruppa</p>
              <p class="title">Senior Data Scientist | GenAI Engineer | Agentic AI Specialist</p>
            </div>
          </div>

          <div class="footer">
            <p>This is an automated response from my portfolio website.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Hi ${firstName},

Thank you for getting in touch! I've received your message and truly appreciate you taking the time to reach out.

I'll review your message and get back to you within 24-48 hours. If your inquiry is urgent, feel free to connect with me directly on LinkedIn.

Let's Connect:
- LinkedIn: https://linkedin.com/in/manikanta-ruppa-496102217
- GitHub: https://github.com/manikantaruppa
- Medium: https://medium.com/@manikantaruppa
- Kaggle: https://kaggle.com/manikantaruppa

Best regards,
Manikanta Ruppa
Senior Data Scientist | GenAI Engineer | Agentic AI Specialist

---
This is an automated response from my portfolio website.
    `
  };
}

// Main handler for Vercel serverless function
module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed. Use POST.'
    });
  }

  try {
    const body = req.body;

    // Validate request
    const errors = validateRequest(body);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    const { first_name, last_name, email, subject, message } = body;

    // Create transporter
    const transporter = createTransporter();

    // Verify transporter
    await transporter.verify();

    // Create email templates
    const emailTemplate = createEmailTemplate(body);
    const autoReplyTemplate = createAutoReplyTemplate(first_name);

    // Send email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `Contact Form: ${subject}`,
      html: emailTemplate.html,
      text: emailTemplate.text,
      replyTo: email
    };

    await transporter.sendMail(adminMailOptions);

    // Send auto-reply to user
    if (process.env.SEND_AUTO_REPLY === 'true') {
      const autoReplyOptions = {
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: email,
        subject: 'Thanks for reaching out - Manikanta Ruppa',
        html: autoReplyTemplate.html,
        text: autoReplyTemplate.text
      };

      await transporter.sendMail(autoReplyOptions);
    }

    // Log successful submission
    console.log(`Contact form submitted by: ${first_name} ${last_name} (${email})`);

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error sending email:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
