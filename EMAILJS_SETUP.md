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

## Альтернативные решения

Если нужно больше писем, рассмотрите:
- Formspree.io
- Netlify Forms
- Собственный backend с Nodemailer 