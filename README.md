# Patterns - Modern Design Studio

A contemporary website showcasing innovative design patterns and creative solutions. Built with React, Vite, and modern web technologies.

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Patterns-2.0
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
src/
├── components/              
│   ├── About.jsx            
│   ├── Contact.jsx          
│   ├── FooterCopyright.jsx  
│   ├── Hero.jsx             
│   ├── PrivacyPolicy.jsx    
│   ├── Services.jsx         
│   ├── TermsOfService.jsx   
│   └── VideoColorAnalyzer.jsx
│
├── styles/                  
│   ├── About.css            
│   ├── App.css              
│   ├── Contact.css          
│   ├── FooterCopyright.css  
│   ├── Hero.css             
│   ├── Modal.css            
│   ├── Services.css         
│   ├── fonts.css            
│   └── index.css            
│
├── App.jsx                  
└── main.jsx                 

```

# EmailJS Setup for Sending Emails

## 1. Register on EmailJS

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email

## 2. Connect an Email Service

1. In your EmailJS dashboard, click "Add New Service"
2. Select your email provider (Gmail, Outlook, Yahoo, etc.)
3. Follow the setup instructions
4. Copy your **Service ID**

## 3. Create an Email Template

1. Go to the "Email Templates" section
2. Click "Create New Template"
3. Create a template with the following variables:

```
Subject: New request from Patterns Agency website

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}

Message:
{{message}}

---
Sent from patterns-agency.com
```

4. Copy your **Template ID**

## 4. Get Your Public Key

1. Go to "Account" → "General"
2. Find the "Public Key" section
3. Copy your Public Key

## 5. Configure in the Project

Open src/components/Contact.jsx and replace the following:

```javascript
const serviceID = 'YOUR_SERVICE_ID'      // Insert your Service ID
const templateID = 'YOUR_TEMPLATE_ID'    // Insert your Template ID  
const publicKey = 'YOUR_PUBLIC_KEY'      // Insert your Public Key
```

## 6. Testing

1. Run the project: `npm start`
2. Fill out and submit the form
3. Check your email

## Free Plan Limits
200 emails per month