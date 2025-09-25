# 🚀 GitHub Pages Deployment Guide - SECURE SETUP

## 📋 Your EmailJS Configuration:
- **Public Key**: `gEQahHnEQ_kSAltX7`
- **Service ID**: `service_b01c26r`
- **Template ID**: `template_jeyqk88`

## 🔐 Secure Deployment Steps:

### 1. Repository Setup:
```bash
# Add all files EXCEPT email-config.js
git add .
git commit -m "Portfolio website with secure EmailJS integration"
git push origin main
```

### 2. GitHub Pages Setup:
1. Go to your repository settings
2. Navigate to "Pages" section
3. Select "Deploy from a branch"
4. Choose "main" branch
5. Select "/ (root)" folder
6. Click "Save"

### 3. Deploy Configuration File:
**⚠️ IMPORTANT**: After GitHub Pages deploys your site, you need to manually upload the `email-config.js` file to your hosting.

#### Option A: Using GitHub Web Interface:
1. Go to your repository on GitHub
2. Click "Add file" → "Upload files"
3. Upload your `email-config.js` file
4. Commit directly to main branch
5. **Immediately delete the file** from the repository after deployment

#### Option B: Using FTP/File Manager:
1. Access your hosting file manager
2. Navigate to your website root directory
3. Upload `email-config.js` file directly

### 4. Test Your Contact Form:
1. Visit your GitHub Pages URL: `https://yourusername.github.io/Portfolio-Website/`
2. Fill out and submit the contact form
3. Check your email inbox for the message
4. Verify all form functionality works

## 🛡️ Security Checklist:

- ✅ `email-config.js` is in `.gitignore`
- ✅ Private config file contains real credentials
- ✅ Fallback system in place if config file missing
- ✅ EmailJS domain restrictions set up
- ✅ Usage limits configured in EmailJS dashboard

## 📧 EmailJS Dashboard Settings:

### Domain Restrictions (Recommended):
1. Go to EmailJS dashboard → Account → Security
2. Add your GitHub Pages URL: `yourusername.github.io`
3. Add your custom domain if you have one

### Usage Limits:
- Monitor your monthly email quota
- Set up usage alerts in EmailJS dashboard
- Consider upgrading if you exceed free tier limits

## 🔧 Alternative Deployment Methods:

### Method 1: Environment Variables (Advanced)
Use GitHub Actions to inject secrets during build:

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Create config file
      run: |
        echo "window.EMAIL_CONFIG = {
          publicKey: '${{ secrets.EMAILJS_PUBLIC_KEY }}',
          serviceID: '${{ secrets.EMAILJS_SERVICE_ID }}',
          templateID: '${{ secrets.EMAILJS_TEMPLATE_ID }}'
        };" > email-config.js
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: .
```

### Method 2: Netlify/Vercel (Easier)
Consider using Netlify or Vercel which support environment variables natively.

## 📞 Contact Form Testing:

### Test Cases:
1. ✅ Valid form submission
2. ✅ Empty field validation
3. ✅ Invalid email validation  
4. ✅ Loading states and messages
5. ✅ Email delivery to your inbox

### Expected Email Format:
```
Subject: New message from [Name] - [Subject]

Content:
📧 New Contact from Portfolio
Name: [Sender Name]
Email: [Sender Email] 
Subject: [Message Subject]
─────────────────────
Message:
[User Message]
─────────────────────
Sent via Portfolio Contact Form
```

## 🎉 Your Portfolio is Ready!

Once deployed, your contact form will:
- ✅ Securely send emails using your credentials
- ✅ Keep your keys private from public repository
- ✅ Work seamlessly on GitHub Pages
- ✅ Provide professional email notifications

**Portfolio URL**: `https://gauravmishraedibuddy.github.io/Portfolio-Website/`

Happy coding! 🚀✨