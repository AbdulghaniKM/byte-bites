# 🍽️ Byte-Bites

## Overview

Byte-Bites is a modern recipe discovery platform built with Vue.js, featuring a curated collection of meals from around the world. The application offers an intuitive interface for exploring recipes across different categories, with detailed cooking instructions and ingredients lists.

[Live Demo](https://byte-bites.vercel.app/)

## ⚡️ Features

- 🌐 Browse recipes by categories
- 🔍 Detailed recipe information including:
  - Ingredients with measurements
  - Step-by-step cooking instructions
  - Recipe images
  - YouTube video tutorials (when available)
- 🎨 Theme customization with multiple color schemes
- 🌙 Dark/Light mode support
- 📱 Responsive design for all devices
- ⚡️ Fast and smooth navigation
- 💾 Persistent data storage

## 🛠️ Tech Stack

- **Frontend Framework**: Vue 3 with Composition API
- **Styling**: Tailwind CSS + ShadCN UI
- **State Management**: Pinia with persistence
- **Routing**: Vue Router
- **HTTP Client**: Axios
- **Icons**: Iconify
- **API**: TheMealDB

## 🚀 Getting Started

### Prerequisites

- Node.js >= v16.0.0
- npm >= v8.0.0

### Installation

1. Clone the repository:

```bash
git clone https://github.com/AbdulghaniKM/byte-bites.git
cd byte-bites
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

## 📁 Project Structure

```bash
byte-bites/
├── src/
│ ├── components/ # Reusable components
│ │ ├── ui/ # ShadcnUI components
│ │ └── ... # Custom components
│ ├── pages/ # Route pages
│ ├── stores/ # Pinia stores
│ │ ├── useMealByCat.js # Category-based meals
│ │ ├── useMealsCat.js # Categories list
│ │ └── useThemeStore.js # Theme management
│ └── App.vue # Root component
```

## 🎨 Features in Detail

### Recipe Categories

- Browse meals by categories
- Persistent category selection
- Loading states with skeletons
- Error handling

### Theme System

- Multiple color themes
- Dark/Light mode toggle
- Persistent theme preferences
- Smooth transitions

### Responsive Design

- Mobile-first approach
- Adaptive layouts
- Touch-friendly interactions
- Optimized images

## 🌐 API Integration

Byte-Bites uses [TheMealDB API](https://www.themealdb.com/api.php) for recipe data:

- Category listings
- Meal listings by category
- Detailed meal information
- Ingredient images

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Recipe data provided by [TheMealDB](https://www.themealdb.com/)
- UI components from [shadcn-vue](https://www.shadcn-vue.com/)
- Icons from [Iconify](https://iconify.design/)

## 🌟 Show your support

Give a ⭐️ if this project helped you!
