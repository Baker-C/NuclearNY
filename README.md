# NuclearNY

React TypeScript project with CSS Modules + CSS Variables theme system.

## Features

- **TypeScript** with strict mode
- **React Router v6** for navigation
- **CSS Modules** for component-scoped styles
- **CSS Variables** for theme values (colors, spacing)
- **Axios** for HTTP client with dependency injection
- **Copy Service** for reading content from JSON file
- **ESLint & Prettier** for code quality
- **Modern browser support** (last 2 versions)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your API configuration:
   ```
   VITE_API_BASE_URL=http://localhost:3000/api
   VITE_API_TIMEOUT=10000
   ```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
src/
├── theme/          # Theme system (colors, spacing)
├── providers/     # React context providers
├── utils/          # Utility functions and hooks
├── services/       # API services and copy service
├── components/     # Reusable components
├── screens/        # Screen components
├── data/           # Static data (copy.json)
├── types/          # TypeScript type definitions
├── App.tsx         # Main app component
└── main.tsx        # Entry point
```

## Theme System

The project uses a CSS Variables-based theme system:

```typescript
import { useAppTheme } from '@/utils/useAppTheme';
import { createStyles } from '@/utils/createStyles';

const { theme } = useAppTheme();
const themeStyles = useMemo(() => createStyles(theme), [theme]);

// Use in component
<div style={themeStyles}>
  {/* CSS variables available */}
</div>
```

In CSS Modules:
```css
.container {
  background-color: var(--color-background);
  padding: var(--spacing-md);
}
```

## Services

Services use dependency injection pattern:

```typescript
import { userService, copyService } from '@/services';

// API service
const user = await userService.getUserById({ id: '123' });

// Copy service (synchronous)
const pageData = copyService.getPageContent({ pageId: 'home' });
```

## Environment Variables

- `VITE_API_BASE_URL` - Base URL for API services
- `VITE_API_TIMEOUT` - Request timeout in milliseconds

## Copy Service

The copy service reads from `src/data/copy.json`. This file is updated periodically via GitHub Action (to be configured).

## License

MIT

