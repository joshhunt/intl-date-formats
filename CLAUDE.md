# CLAUDE.md

## Project Overview

**Intl.DateTimeFormat Explorer** is a web application that helps developers understand and compare how dates are formatted across different locales and format configurations using JavaScript's built-in `Intl.DateTimeFormat` API.

### What It Does

The application provides an interactive interface for:

1. **Date Selection**: Choose any date to test formatting with
2. **Locale Management**: Add/remove and configure multiple locales (e.g., en-US, es-ES, fr-FR, ja-JP)
3. **Format Configuration**: Create and manage multiple date/time format configurations with:
   - Pre-built format styles (dateStyle, timeStyle)
   - Custom format options (weekday, year, month, day, hour, minute, etc.)
   - Named configurations for easy reference
4. **Comparison Table**: View how the same date appears across all selected locales and format configurations in a comprehensive table

### Key Features

- **Visual Comparison**: Side-by-side comparison of date formatting across cultures
- **Interactive Configuration**: Real-time editing of format options with immediate preview
- **Error Handling**: Displays formatting errors for invalid locale/format combinations
- **Responsive Design**: Works on desktop and mobile devices
- **Accessibility**: Built with Radix UI for screen reader support

### Use Cases

- **Internationalization Testing**: Verify how dates appear in different markets
- **Format Discovery**: Explore available formatting options for specific locales
- **Documentation**: Generate examples for internationalization documentation
- **Learning Tool**: Understand cultural differences in date representation

This tool is particularly useful for developers working on international applications who need to ensure proper date formatting across different regions and cultures.

## Development Commands

- **Start development server**: `pnpm dev` (uses Vite with HMR)
- **Build for production**: `pnpm build` (TypeScript compilation + Vite build)
- **Lint code**: `pnpm lint` (ESLint with TypeScript support)
- **Preview production build**: `pnpm preview`

## Project Architecture

This is a React + TypeScript + Vite application for exploring international date formatting. The project uses:

- **React 19.1** with modern hooks and StrictMode
- **TypeScript 5.8** with strict type checking enabled
- **Vite 7** for fast development and optimized builds
- **Tailwind CSS 4.1** with the new Vite plugin for styling
- **Radix UI** components for accessible UI primitives
- **shadcn/ui** component system for consistent design
- **Lucide React** for icons
- **pnpm 10.14** as package manager

### UI Component System

The project uses shadcn/ui with:

- **Style**: New York variant
- **Base color**: Neutral
- **CSS Variables**: Enabled for theming
- **Components**: Located in `src/components/ui/`
- **Utilities**: Located in `src/lib/utils.ts`

### Key Configuration Files

- `tsconfig.app.json`: Application TypeScript config with strict linting rules and path mapping (`@/*` → `./src/*`)
- `eslint.config.js`: Modern flat ESLint config using TypeScript ESLint, React Hooks, and React Refresh plugins
- `vite.config.ts`: Vite setup with React and Tailwind CSS plugins, plus path alias configuration
- `components.json`: shadcn/ui configuration for component generation
- `tsconfig.json`: Project references and base path configuration

### Source Structure

- `src/main.tsx`: Application entry point with React 19's createRoot
- `src/App.tsx`: Main application component
- `src/index.css` & `src/App.css`: Application styles with Tailwind CSS
- `src/components/`: Application-specific components
  - `DateComparisonDisplay.tsx`: Compare dates across formats
  - `DatePickerInput.tsx`: Date input component
  - `DateTimeOptionsSelector.tsx`: Format options selector
  - `LocaleSelector.tsx`: Locale selection component
  - `MultipleFormatsManager.tsx`: Manage multiple date formats
  - `TableDateComparison.tsx`: Tabular date comparison view
- `src/components/ui/`: Reusable UI components (shadcn/ui)
- `src/lib/`: Utility functions
  - `intl.ts`: Internationalization utilities
  - `utils.ts`: General utility functions (class merging, etc.)

## TypeScript Configuration

The project uses modern TypeScript features:

- ES2022 target with DOM libraries
- Bundler module resolution with verbatim module syntax
- Strict type checking with enhanced linting (noUnusedLocals, noUnusedParameters, noFallthroughCasesInSwitch, etc.)
- JSX transforms via react-jsx
- Path mapping with `@/*` alias pointing to `./src/*`

## Styling

Uses Tailwind CSS 4.1 with:

- Vite plugin integration for optimal performance
- CSS variables for theming support
- shadcn/ui component system integration

## Package Management

Uses pnpm 10.14 with workspace configuration. The project includes comprehensive UI dependencies for building rich date formatting interfaces.
