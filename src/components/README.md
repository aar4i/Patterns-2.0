# Components Structure

This directory contains all the separated components from the main App.jsx file. Each component has its own JSX file and corresponding CSS file for better organization and maintainability.

## Components:

### 🧭 Navigation.jsx + Navigation.css
- Fixed navigation bar with logo and menu links
- Language toggle functionality
- Smooth scroll navigation between sections

### 🌟 Hero.jsx + Hero.css
- Main hero section with title and subtitle
- Call-to-action button
- Full-screen height layout

### 🔧 Services.jsx + Services.css
- Services grid layout
- Animated service cards
- Responsive grid system

### 🖼️ Gallery.jsx + Gallery.css
- Gallery grid with overlays
- Hover effects and animations
- Image placeholders with labels

### 📞 Contact.jsx + Contact.css
- Contact form with styled inputs
- Alternative contact information
- Social media links

## Usage:

Each component is imported and used in the main `App.jsx` file. All components receive translations (`t`) as props, and Navigation also receives language and scroll functions.

## Structure Benefits:

✅ **Better Organization**: Each screen/section is now a separate file
✅ **Easier Editing**: You can work on individual components without touching others
✅ **Modular CSS**: Each component has its own styles
✅ **Reusability**: Components can be easily reused or moved
✅ **Maintainability**: Easier to debug and maintain individual sections 