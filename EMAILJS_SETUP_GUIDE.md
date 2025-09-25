# 📧 EmailJS Integration Setup Guide

## 🚀 Complete Setup Instructions for Portfolio Contact Form

### 📋 Prerequisites
- Gmail account (or any email service)
- EmailJS account (free tier available)
- Basic understanding of JavaScript

---

## 🔧 Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click **"Sign Up"** and create a free account
3. Verify your email address
4. Log in to your EmailJS dashboard

---

## 📨 Step 2: Add Email Service

### For Gmail (Recommended):

1. In EmailJS dashboard, click **"Email Services"**
2. Click **"Add New Service"**
3. Select **"Gmail"**
4. Click **"Connect Account"** 
5. Authorize EmailJS to access your Gmail
6. **Copy your Service ID** (e.g., `service_abc123`)

### For Other Email Services:
- **Outlook**: Select "Outlook" and follow similar steps
- **Yahoo**: Select "Yahoo" and authorize
- **Custom SMTP**: Configure your SMTP settings

---

## 📝 Step 3: Create Email Template

1. Go to **"Email Templates"** in EmailJS dashboard
2. Click **"Create New Template"**
3. **Template ID** will be generated (e.g., `template_xyz789`)

### Recommended Template Structure:

**Subject:**
```
New Contact Form Message from {{from_name}} - {{subject}}
```

**Email Body:**
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Courier New', monospace; background: #0a0a0a; color: #00ff41; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #111111; padding: 30px; border-radius: 8px; border: 1px solid #333; }
        .header { text-align: center; margin-bottom: 30px; }
        .title { color: #00ffff; font-size: 24px; margin-bottom: 10px; }
        .subtitle { color: #888; font-size: 14px; }
        .content { margin: 20px 0; }
        .field { margin: 15px 0; }
        .label { color: #ffff00; font-weight: bold; }
        .value { color: #ffffff; margin-left: 10px; }
        .message-box { background: #1a1a1a; padding: 20px; border-left: 3px solid #00ff41; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="title">📧 New Portfolio Contact</div>
            <div class="subtitle">Someone wants to connect with you!</div>
        </div>
        
        <div class="content">
            <div class="field">
                <span class="label">👤 From:</span>
                <span class="value">{{from_name}}</span>
            </div>
            
            <div class="field">
                <span class="label">📧 Email:</span>
                <span class="value">{{from_email}}</span>
            </div>
            
            <div class="field">
                <span class="label">📋 Subject:</span>
                <span class="value">{{subject}}</span>
            </div>
            
            <div class="field">
                <span class="label">📅 Date:</span>
                <span class="value">{{date}}</span>
            </div>
            
            <div class="message-box">
                <div class="label">💬 Message:</div>
                <div style="margin-top: 10px; color: #ffffff; line-height: 1.6;">
                    {{message}}
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p>📱 Sent from Portfolio Website Contact Form</p>
            <p>Reply directly to this email to respond to {{from_name}}</p>
        </div>
    </div>
</body>
</html>
```

### Template Settings:
- **To Email**: Your email address (where you want to receive messages)
- **From Name**: `Portfolio Contact Form`
- **Reply To**: `{{reply_to}}` (so you can reply directly to the sender)

---

## 🔑 Step 4: Get Your Public Key

1. Go to **"Account"** → **"General"** in EmailJS dashboard
2. Find your **Public Key** (e.g., `user_abc123def456`)
3. **Copy this key** - you'll need it for the code

---

## 💻 Step 5: Update Your Code

Open your `script.js` file and find the `ContactForm` class. Replace the placeholder values:

```javascript
// EmailJS configuration - Replace with your actual IDs
this.emailJSConfig = {
    publicKey: 'YOUR_ACTUAL_PUBLIC_KEY',    // From Step 4
    serviceID: 'YOUR_ACTUAL_SERVICE_ID',    // From Step 2
    templateID: 'YOUR_ACTUAL_TEMPLATE_ID'   // From Step 3
};
```

### Example with real values:
```javascript
this.emailJSConfig = {
    publicKey: 'user_abc123def456',
    serviceID: 'service_gmail123',
    templateID: 'template_contact789'
};
```

---

## 🧪 Step 6: Test Your Integration

1. Open your portfolio website
2. Fill out the contact form
3. Submit the form
4. Check your email inbox
5. Verify the email formatting and content

### Expected Behavior:
- ✅ Form shows "Sending..." while processing
- ✅ Success message appears after sending
- ✅ Form resets after successful submission
- ✅ You receive a formatted email in your inbox
- ✅ Reply-to is set to the sender's email

---

## 🔧 Advanced Configuration

### Custom Success Messages:
```javascript
// In script.js ContactForm class
this.showMessage('🎉 Message sent successfully! I\'ll get back to you within 24 hours.', 'success');
```

### Analytics Tracking:
```javascript
// Add to trackFormSubmission method
gtag('event', 'contact_form_submission', {
    'event_category': 'engagement',
    'event_label': status
});
```

### Rate Limiting:
```javascript
// Add to ContactForm constructor
this.lastSubmission = 0;
this.rateLimitMs = 60000; // 1 minute between submissions
```

---

## 📊 Email Template Variables

Your template can use these variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `{{from_name}}` | Sender's name | "John Doe" |
| `{{from_email}}` | Sender's email | "john@example.com" |
| `{{subject}}` | Message subject | "Job Opportunity" |
| `{{message}}` | Message content | "Hi, I'd like to..." |
| `{{to_name}}` | Your name | "Gaurav Mishra" |
| `{{reply_to}}` | Reply-to email | Same as from_email |

---

## 🚨 Troubleshooting

### Common Issues:

**1. "EmailJS library not loaded" error:**
- Check if the EmailJS script is properly included in HTML
- Verify the CDN link is working

**2. "Template not found" error:**
- Double-check your Template ID
- Ensure template is published (not draft)

**3. "Service not found" error:**
- Verify your Service ID
- Check if email service is properly connected

**4. Emails not received:**
- Check spam/junk folder
- Verify your email address in template settings
- Test with a simple template first

**5. "Invalid public key" error:**
- Copy the exact public key from EmailJS dashboard
- Remove any extra spaces or characters

---

## 🔒 Security Best Practices

1. **Never expose private keys** - only use public key in frontend
2. **Implement rate limiting** to prevent spam
3. **Add CAPTCHA** for production use (optional)
4. **Validate all inputs** on both frontend and EmailJS template
5. **Monitor usage** to stay within free tier limits

---

## 📈 Free Tier Limits

EmailJS Free Plan includes:
- ✅ 200 emails per month
- ✅ 2 email services
- ✅ Custom templates
- ✅ Basic support

For higher volume, consider upgrading to paid plans.

---

## 🎉 You're All Set!

Your contact form is now fully integrated with EmailJS! 

### What happens when someone submits:
1. 📝 Form validates input
2. ⏳ Shows loading state
3. 📤 Sends email via EmailJS
4. 📧 You receive formatted email
5. ✅ User sees success message
6. 🔄 Form resets for next use

### Need Help?
- EmailJS Documentation: https://www.emailjs.com/docs/
- Test your integration thoroughly
- Check browser console for any errors
- Contact me if you need assistance!

---

**Happy coding! 🚀✨**