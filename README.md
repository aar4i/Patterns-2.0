# Patterns - Modern Design Studio

A contemporary website showcasing innovative design patterns and creative solutions. Built with React, Vite, and modern web technologies.

## 🚀 Features

- **Modern Design**: Clean, contemporary aesthetics with the ApfelGrotezk font
- **Multilingual**: Support for English and German languages
- **Responsive**: Fully responsive design for all devices
- **Component-based**: Modular React components for easy maintenance
- **Fast**: Built with Vite for lightning-fast development and builds

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Navigation.jsx   # Main navigation with language toggle
│   ├── Hero.jsx         # Hero section with CTA
│   ├── Services.jsx     # Services grid
│   ├── Gallery.jsx      # Gallery with overlays
│   └── Contact.jsx      # Contact form and info
├── styles/              # CSS stylesheets
│   ├── App.css          # Global styles
│   ├── fonts.css        # Font definitions
│   ├── index.css        # Base styles
│   └── [Component].css  # Component-specific styles
├── data/                # Static data
│   └── translations.js  # Multilingual content
└── assets/              # Static assets
    ├── images/          # Image files
    └── icons/           # Icon files

public/
└── fonts/               # Custom font files
    └── ApfelGrotezk-Regular.woff
```

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

## 🎨 Design System

- **Font**: ApfelGrotezk (custom loaded)
- **Color Palette**: 
  - Primary: `#dc143c` (Crimson)
  - Background: `#000` (Black)
  - Text: `#fff` (White)
  - Secondary: `#111`, `#333`, `#666`, `#ccc`

## 📱 Components

### Navigation
- Fixed top navigation
- Language switcher (EN/DE)
- Smooth scroll navigation

### Hero
- Full-screen hero section
- Animated typography
- Call-to-action button

### Services
- Grid layout
- Hover animations
- Responsive cards

### Gallery
- 3-column grid
- Overlay effects
- Scaling animations

### Contact
- Contact form
- Social media links
- Alternative contact info

## 🌐 Internationalization

The project supports multiple languages through the `translations.js` file:
- English (default)
- German

Add new languages by extending the translations object.

## 🚀 Deployment

The project is ready for deployment on any static hosting platform:
- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

## 📄 License

This project is private and proprietary.

## 👨‍💻 Development

Built with:
- React 19+
- Vite 6+
- ESLint for code quality
- Modern CSS with custom properties

---

**Patterns Studio** - Modern Design & Creative Solutions
