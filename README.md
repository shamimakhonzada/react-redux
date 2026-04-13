# Frontend Task - Modern Product Dashboard

A professional, high-performance React application featuring a dynamic product dashboard and validated user registration system. Built with **React 19**, **Redux Toolkit**, and **Tailwind CSS 4**.

## 🚀 Overview

This project is a modern frontend application designed with a focus on usability, performance, and maintainable architecture. It implements a feature-based folder structure and utilizes a robust tech stack for state management and form validation.

### Key Features
- 📦 **Product Management**: Real-time product listing with search and category filtering.
- 📝 **Dynamic Forms**: Sophisticated user registration form with real-time validation.
- 🌗 **Dark Mode**: Seamless theme switching supported by `next-themes`.
- 📱 **Responsive Design**: Fully optimized for mobile, tablet, and desktop views.
- ✨ **Rich UI**: Interactive components built with Shadcn UI and Lucide icons.

---

## 🛠️ Tech Stack

### Core
- **React 19**: The latest version of React for building modern user interfaces.
- **TypeScript**: Ensuring type safety and better developer experience.
- **Vite**: Ultra-fast build tool and development server.

### State Management & Logic
- **Redux Toolkit**: Efficient state management with optimized slices and actions.
- **React Hook Form**: Performant, flexible, and extensible forms with easy-to-use validation.
- **Zod**: TypeScript-first schema declaration and validation library.

### Styling & UI
- **Tailwind CSS 4**: The latest evolution of Tailwind, providing advanced styling capabilities.
- **Shadcn UI**: Beautifully designed components built on top of Radix UI primitives.
- **Lucide React**: Clean and consistent icon set.
- **Fontsource Geist**: Modern typography for a premium feel.

---

## 📂 Project Structure

```text
src/
├── components/     # High-level UI components and Shadcn primitives
│   ├── form/       # Specialized form components
│   ├── product/    # Product-specific UI components
│   └── ui/         # Base Shadcn UI components
├── features/       # Feature-based logic (Redux slices, specific business logic)
├── lib/            # Utility functions and shared configurations (Zod schemas, etc.)
├── pages/          # Main application pages
├── store/          # Redux store configuration and root reducer
├── types/          # Shared TypeScript interfaces and types
└── assets/         # Static assets like images and global styles
```

---

## 📖 User Manual

### Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v18+) and [pnpm](https://pnpm.io/) installed.

### Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend-task
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run development server**
   ```bash
   pnpm dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

| Command | Description |
| :--- | :--- |
| `pnpm dev` | Starts the development server with HMR. |
| `pnpm build` | Compiles the project for production. |
| `pnpm preview` | Locally previews the production build. |
| `pnpm lint` | Runs ESLint to check for code quality issues. |

---

## 📝 Best Practices
- **Atomic Components**: Components are kept small and focused.
- **Zod Validation**: All form inputs are strictly validated before submission.
- **Type Safety**: Extensive use of TypeScript for predictable code behavior.
- **Clean Code**: ESLint and Prettier configurations for consistent formatting.

---

### Author
Developed with ❤️ by Muhammad Shamim Shoaib 
Web: [https://sshoaib.vercel.app/](https://sshoaib.vercel.app)

