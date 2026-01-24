# Web3Forms Setup Guide (2 minutes)

Web3Forms is a free form backend service that sends emails directly to your inbox. No complex setup required!

## Quick Setup:

### Step 1: Get Your Access Key
1. Go to [https://web3forms.com](https://web3forms.com)
2. Enter your email: `atikhassant64@gmail.com`
3. Click "Create Access Key"
4. Copy the access key (looks like: `abc123def-456g-789h-012i-345jklmnop67`)

### Step 2: Update Configuration
Replace the access key in `src/config/web3forms.js`:

```javascript
export const web3formsConfig = {
    accessKey: 'YOUR_REAL_ACCESS_KEY_HERE', // Replace with your key
    toEmail: 'atikhassant64@gmail.com',
    // ... rest of config
};
```

### Step 3: Verify Email (Important!)
1. Check your email (atikhassant64@gmail.com)
2. Click the verification link from Web3Forms
3. Your form is now active!

## That's it! 

Your contact form will now send real emails to `atikhassant64@gmail.com`.

## Features:
- ✅ 1000 free submissions per month
- ✅ No signup required
- ✅ Spam protection included
- ✅ Works immediately after verification
- ✅ Email notifications
- ✅ Reply-to functionality

## Email Format:
Emails will arrive with:
- Subject: "TicketBari Contact: [User's Subject]"
- From: Web3Forms (on behalf of your form)
- Reply-to: User's email address
- Content: Formatted message with all form details

## Alternative: Use Demo Mode
If you don't want to set up Web3Forms right now, the form will work in demo mode and log all submissions to the console for testing.