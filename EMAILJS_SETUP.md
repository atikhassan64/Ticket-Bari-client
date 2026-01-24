# EmailJS Setup Guide for Contact Form

This guide will help you set up EmailJS to send emails from your contact form to atikhassant64@gmail.com.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Create Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" (recommended) or your preferred email provider
4. Follow the setup instructions to connect your email account
5. Note down the **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

**Template Name:** Contact Form Message

**Subject:** New Contact Form Message: {{subject}}

**Content:**
```
Hello,

You have received a new message from your TicketBari contact form:

From: {{from_name}} ({{from_email}})
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from the TicketBari contact form.
Reply directly to this email to respond to the sender.
```

4. Set the "To Email" to: `atikhassant64@gmail.com`
5. Set the "Reply To" to: `{{reply_to}}`
6. Save the template and note down the **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Public Key

1. Go to "Account" → "General" in your dashboard
2. Find your **Public Key** (e.g., `user_abcdefghijk123456`)

## Step 5: Update Configuration

Update the file `src/config/emailjs.js` with your actual values:

```javascript
export const emailjsConfig = {
    serviceId: 'your_service_id_here',    // Replace with your Service ID
    templateId: 'your_template_id_here',  // Replace with your Template ID
    publicKey: 'your_public_key_here'     // Replace with your Public Key
};
```

## Step 6: Test the Contact Form

1. Start your development server: `npm run dev`
2. Navigate to the Contact Us page
3. Fill out and submit the contact form
4. Check your email (atikhassant64@gmail.com) for the message

## Troubleshooting

- **Email not received:** Check your spam folder
- **Error in console:** Verify your Service ID, Template ID, and Public Key are correct
- **Template variables not working:** Make sure variable names match exactly (case-sensitive)

## Free Tier Limits

EmailJS free tier includes:
- 200 emails per month
- 2 email services
- 2 email templates

This should be sufficient for a contact form. If you need more, consider upgrading to a paid plan.

## Security Note

The Public Key is safe to use in frontend code as it's designed for client-side usage. However, never expose your Private Key in frontend code.