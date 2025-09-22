# AINevis - Intelligent Content Creation Platform

![AINevis](https://img.shields.io/badge/AINevis-Content%20Creation-blue)
![Next.js](https://img.shields.io/badge/Next.js-14.1.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)
![React](https://img.shields.io/badge/React-18+-61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3+-38B2AC)

AINevis is a dynamic AI-powered platform that enables intelligent content creation for users. Create engaging blog posts, amazing stories, and diverse social media content with the help of advanced AI technology.

## ✨ Features

- **🤖 AI-Powered Content Generation**: Generate high-quality content using advanced AI models
- **📝 Multiple Content Types**: Support for blog posts, social media content, copywriting, and more
- **🎨 Rich Text Editor**: Advanced EditorJS-based content editing with multiple plugins
- **🌍 Multi-language Support**: Built-in internationalization (i18n) with English and Persian support
- **🎯 Smart Categories**: Organized content creation with intelligent categorization
- **📊 Dashboard & Analytics**: Track your content creation progress and history
- **🖼️ Image Generation**: AI-powered image generation capabilities
- **📄 Resume Builder**: Professional resume creation tools
- **💬 Chat Interface**: Interactive AI chat for content assistance
- **🔐 Authentication**: Secure user authentication and authorization
- **📱 Responsive Design**: Fully responsive design for all devices
- **🌙 Dark Mode**: Support for dark and light themes

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm package manager
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/AIN-NextJS.git
   cd AIN-NextJS
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.development
   ```

   Edit `.env.development` and configure the following variables:
   ```bash
   NEXT_PUBLIC_SITE_URL=http://localhost:3500
   NEXT_PUBLIC_BASE_ENDPOINT=http://localhost:4000
   NEXT_PUBLIC_API_BASE_ENDPOINT=http://localhost:4000/api/v1
   ```

4. **Start the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3500](http://localhost:3500)

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   └── [locale]/           # Internationalized routes
├── components/             # Reusable UI components
│   └── ui/                 # Base UI components (shadcn/ui)
├── modules/                # Feature-based modules
│   ├── auth/               # Authentication module
│   ├── copywriting/        # Content creation module
│   ├── dashboard/          # User dashboard
│   ├── home/               # Landing page
│   ├── chat/               # AI chat interface
│   ├── image-generation/   # AI image generation
│   ├── resume/             # Resume builder
│   └── settings/           # User settings
├── interface/              # TypeScript interfaces
├── constants/              # Application constants
├── utils/                  # Utility functions
└── middleware.ts           # Next.js middleware

messages/                   # Internationalization files
├── en/                     # English translations
└── fa/                     # Persian translations

public/                     # Static assets
```


## 🛠️ Built With

### Core Technologies
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[React 18](https://reactjs.org/)** - UI library
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework

### UI Components & Styling
- **[Radix UI](https://www.radix-ui.com/)** - Headless UI components
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful UI components
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Tabler Icons](https://tabler-icons.io/)** - Icon library

### Content & Editing
- **[Editor.js](https://editorjs.io/)** - Block-style editor
- **[CodeMirror](https://codemirror.net/)** - Code editor
- **[React Hook Form](https://react-hook-form.com/)** - Form handling
- **[Zod](https://zod.dev/)** - Schema validation

### State Management & Data
- **[Zustand](https://zustand-demo.pmnd.rs/)** - State management
- **[SWR](https://swr.vercel.app/)** - Data fetching
- **[Axios](https://axios-http.com/)** - HTTP client

### Internationalization & Utils
- **[next-intl](https://next-intl-docs.vercel.app/)** - Internationalization
- **[date-fns](https://date-fns.org/)** - Date utilities
- **[Luxon](https://moment.github.io/luxon/)** - DateTime library

## 🌍 Internationalization

The application supports multiple languages:

- **English (en)**: Default language
- **Persian (fa)**: RTL support included

Translation files are located in the `messages/` directory. To add a new language:

1. Create a new directory in `messages/` (e.g., `messages/es/`)
2. Copy the translation files from `messages/en/`
3. Translate the content
4. Update the middleware configuration

## 🎨 Styling & Theming

The project uses:

- **Tailwind CSS** for utility-first styling
- **CSS Variables** for theming
- **Dark/Light mode** support
- **RTL support** for Persian language
- **Responsive design** for all screen sizes

Theme configuration is in `tailwind.config.ts`.

## 📚 Development

### Available Scripts

```bash
# Development
pnpm dev          # Start development server on port 3500
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run Biome linting
pnpm check        # Run Biome checks
pnpm format       # Format code with Biome
pnpm postbuild    # Generate sitemap (runs after build)
```

### Code Quality

- **Biome** for code linting and formatting
- **TypeScript** for type safety
- **Organized imports** with Biome

### Architecture Principles

- **Feature-based modules** for better organization
- **Component composition** over inheritance
- **TypeScript interfaces** for type safety
- **Responsive design** first approach
- **Accessibility** considerations

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on git push

### Manual Deployment

```bash
pnpm build
pnpm start
```

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run linting and formatting: `pnpm check`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔒 Security

Please read our [Security Policy](SECURITY.md) for information about reporting security vulnerabilities.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) team for the amazing framework
- [Vercel](https://vercel.com/) for hosting and deployment
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [shadcn](https://ui.shadcn.com/) for beautiful UI components
- All contributors who help improve this project

## 📞 Support

- Create an [Issue](https://github.com/amirrstm/AIN-NextJS/issues) for bug reports
- Start a [Discussion](https://github.com/amirrstm/AIN-NextJS/discussions) for questions
- Check our [Documentation](docs/) for detailed guides

---

<div align="center">
  <p>Made with ❤️ by Amir Rostami</p>
  <p>
    <a href="https://github.com/amirrstm/AIN-NextJS">⭐ Star this repository</a> if you find it helpful!
  </p>
</div>