# 🔧 EmailJS Configuration - SECURE SETUP

## ✅ Your Configuration is Already Implemented!

Your EmailJS credentials have been securely configured:

```javascript
// ✅ Already configured in email-config.js (private file):
{
    publicKey: 'gEQahHnEQ_kSAltX7',
    serviceID: 'service_b01c26r',
    templateID: 'template_jeyqk88'
}
```

## 🔐 Security Implementation:

### ✅ What's Done:
- **Private Config File**: `email-config.js` contains your real credentials
- **Git Ignore**: `email-config.js` is added to `.gitignore` (won't be committed)
- **Fallback System**: Demo credentials if config file is missing
- **Secure Loading**: HTML loads config with error handling

### 🚨 Important Security Notes:

1. **email-config.js is PRIVATE** - Never commit this file to repository
2. **For GitHub Pages deployment**: Upload `email-config.js` manually to your hosting
3. **Domain Restrictions**: Set up domain restrictions in EmailJS dashboard
4. **Usage Monitoring**: Monitor your EmailJS usage regularly

## 📨 Recommended Email Template

**Template Name:** `Portfolio Contact Form`

**Template ID:** (Generated automatically)

**Subject Line:**
```
New message from {{from_name}} - {{subject}}
```

**Email Content:**
```html
<h2>📧 New Contact from Portfolio</h2>
<p><strong>Name:</strong> {{from_name}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Subject:</strong> {{subject}}</p>
<hr>
<h3>Message:</h3>
<p>{{message}}</p>
<hr>
<p><em>Sent via Portfolio Contact Form</em></p>
```

## ⚙️ Template Settings in EmailJS:

- **To Email:** `your-email@gmail.com` (Your actual email)
- **From Name:** `Portfolio Contact`
- **From Email:** `noreply@emailjs.com` (Default EmailJS sender)
- **Reply To:** `{{from_email}}` (So you can reply directly)
- **Subject:** `New message from {{from_name}} - {{subject}}`

## 🚀 After Setup:

1. Replace the placeholder values in `script.js`
2. Test the form on your website
3. Check your email inbox
4. Verify everything works correctly

## 📋 Checklist:

- [ ] EmailJS account created
- [ ] Gmail service connected
- [ ] Email template created
- [ ] Public key copied
- [ ] Service ID copied  
- [ ] Template ID copied
- [ ] Values updated in script.js
- [ ] Form tested successfully
- [ ] Email received in inbox

Your contact form is ready to receive emails! 🎉