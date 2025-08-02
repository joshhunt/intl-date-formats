# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `pnpm dev` (uses Vite with HMR)
- **Build for production**: `pnpm build` (TypeScript compilation + Vite build)
- **Lint code**: `pnpm lint` (ESLint with TypeScript support)
- **Preview production build**: `pnpm preview`

## Project Architecture

This is a React + TypeScript + Vite application for exploring international date formatting. The project uses:

- **React 19** with modern hooks and StrictMode
- **TypeScript 5.8** with strict type checking enabled
- **Vite 7** for fast development and optimized builds
- **pnpm** as package manager with workspace configuration

### Key Configuration Files

- `tsconfig.app.json`: Application TypeScript config with strict linting rules (noUnusedLocals, noUnusedParameters, noFallthroughCasesInSwitch)
- `eslint.config.js`: Modern ESLint config using TypeScript ESLint, React Hooks, and React Refresh plugins
- `vite.config.ts`: Standard Vite setup with React plugin

### Source Structure

- `src/main.tsx`: Application entry point with React 19's createRoot
- `src/App.tsx`: Main application component (currently Vite template)
- `src/index.css` & `src/App.css`: Application styles

## TypeScript Configuration

The project uses modern TypeScript features:
- ES2022 target with DOM libraries
- Bundler module resolution
- Strict type checking with enhanced linting
- JSX transforms via react-jsx

## Package Management

Uses pnpm with workspace configuration that ignores esbuild built dependencies for optimization.