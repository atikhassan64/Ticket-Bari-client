// EmailJS Configuration
// To set up EmailJS:
// 1. Go to https://www.emailjs.com/
// 2. Create an account and verify your email
// 3. Create a new service (Gmail, Outlook, etc.)
// 4. Create an email template
// 5. Get your Public Key from the Integration page
// 6. Replace the values below with your actual EmailJS credentials

export const emailjsConfig = {
    serviceId: 'YOUR_SERVICE_ID_HERE',    // Replace with your actual Service ID
    templateId: 'YOUR_TEMPLATE_ID_HERE',  // Replace with your actual Template ID  
    publicKey: 'YOUR_PUBLIC_KEY_HERE'     // Replace with your actual Public Key
};

// Email template variables that will be used:
// {{from_name}} - Sender's name
// {{from_email}} - Sender's email
// {{subject}} - Email subject
// {{message}} - Email message
// {{to_email}} - Your email (atikhassant64@gmail.com)
// {{reply_to}} - Sender's email for replies

// Example template content:
/*
Subject: New Contact Form Message: {{subject}}

Hello,

You have received a new message from your TicketBari contact form:

From: {{from_name}} ({{from_email}})
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from the TicketBari contact form.
Reply directly to this email to respond to the sender.
*/