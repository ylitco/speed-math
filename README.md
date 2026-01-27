# Speed Math

[![License: BSL-1.1](https://img.shields.io/badge/License-BSL_1.1-blue.svg)](LICENSE)

A web application for practicing mental math skills with various difficulty levels and time challenges.

## Live Demo

[Speed Math](https://speed-math.ru/start) - Simulator by the Jakow Trachtenberg system.

## Features

**Training**
- Trachtenberg speed math algorithms
- Multiple difficulty levels
- Timed and free workout modes

**Experience**
- Practice session statistics
- Multi-language (EN, RU, HI)
- Works offline (PWA)

## Tech Stack

- React + TypeScript
- Vite
- Modern UI components

## Architecture

The app follows a feature-based structure:

- **Components** - Reusable UI elements (Button, Keyboard, Wheel)
- **Views** - Page-level components with React Router
- **State** - Redux Toolkit for workout and tutorial state
- **Hooks** - Custom hooks for shared logic
- **i18n** - Multi-language support via i18next

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## License

This project is licensed under the Business Source License 1.1 - see the [LICENSE](LICENSE) file for details.

## Author

Egor Litviakov
