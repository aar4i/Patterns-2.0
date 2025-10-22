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

## 🚀 Features

- **Modern Design**: Clean, contemporary aesthetics with the ApfelGrotezk font
- **Responsive**: Fully responsive design for all devices
- **Component-based**: Modular React components for easy maintenance
- **Fast**: Built with Vite for lightning-fast development and builds

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Navigation.jsx   # Main navigation
│   ├── Hero.jsx         # Hero section with CTA
│   ├── Services.jsx     # Services grid
│   ├── Gallery.jsx      # Gallery with overlays
│   └── Contact.jsx      # Contact form and info
├── styles/              # CSS stylesheets
│   ├── App.css          # Global styles
│   ├── fonts.css        # Font definitions
│   ├── index.css        # Base styles
│   └── [Component].css  # Component-specific styles
└── assets/              # Static assets
    ├── images/          # Image files
    └── icons/           # Icon files

public/
└── fonts/               # Custom font files
    └── ApfelGrotezk-Regular.woff
```

---

# Настройка EmailJS для отправки писем

## 1. Регистрация на EmailJS

1. Перейдите на [EmailJS.com](https://www.emailjs.com/)
2. Нажмите "Sign Up" и создайте бесплатный аккаунт
3. Подтвердите email

## 2. Подключение email сервиса

1. В панели управления EmailJS нажмите "Add New Service"
2. Выберите ваш email провайдер (Gmail, Outlook, Yahoo и т.д.)
3. Следуйте инструкциям для подключения
4. Скопируйте **Service ID**

## 3. Создание email шаблона

1. Перейдите в раздел "Email Templates"
2. Нажмите "Create New Template"
3. Создайте шаблон со следующими переменными:

```
Subject: Новая заявка с сайта Patterns Agency

Имя: {{from_name}}
Email: {{from_email}}
Телефон: {{phone}}

Сообщение:
{{message}}

---
Отправлено с сайта patterns-agency.com
```

4. Скопируйте **Template ID**

## 4. Получение Public Key

1. Перейдите в "Account" → "General"
2. Найдите раздел "Public Key"
3. Скопируйте **Public Key**

## 5. Настройка в проекте

Откройте файл `src/components/Contact.jsx` и замените:

```javascript
const serviceID = 'YOUR_SERVICE_ID'      // Вставьте ваш Service ID
const templateID = 'YOUR_TEMPLATE_ID'    // Вставьте ваш Template ID  
const publicKey = 'YOUR_PUBLIC_KEY'      // Вставьте ваш Public Key
```

## 6. Тестирование

1. Запустите проект: `npm start`
2. Заполните и отправьте форму
3. Проверьте email на `contact@patterns-agency.com`

## Лимиты бесплатного плана

- 200 писем в месяц
- Достаточно для большинства сайтов


**Patterns Studio** 
