# React TypeScript Project with CSS Modules + CSS Variables Theme System

## Overview

Create a React TypeScript project using Vite with a theme system that combines CSS Modules for component-scoped styles and CSS Variables for theme values (colors, spacing). Components will use `useAppTheme()` hook and `createStyles()` utility to inject theme values as CSS variables, then reference them in CSS Module files.

The project should include aliases for the base files like utils, components, providers, services, etc.

## Project Structure

```
NuclearNY/
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── index.html
├── .env
├── .env.example
├── .eslintrc.cjs
├── .prettierrc
├── .gitignore
├── .github/
│   └── workflows/
│       └── [copy-sync.yml] (placeholder for future GitHub Action)
└── src/
    ├── theme/
    │   ├── index.ts
    │   ├── colors.ts
    │   ├── spacing.ts
    │   ├── types.ts
    │   └── styled.d.ts
    ├── providers/
    │   └── ThemeProvider.tsx
    ├── utils/
    │   ├── useAppTheme.ts
    │   └── createStyles.ts
    ├── data/
    │   └── copy.json
    ├── types/
    │   └── copy.ts
    ├── services/
    │   ├── clients/
    │   │   ├── index.ts
    │   │   ├── apiClient.ts
    │   │   └── [otherClients].ts
    │   ├── index.ts
    │   ├── apiService.ts
    │   ├── userService.ts
    │   ├── authService.ts
    │   └── [otherServices].ts
    ├── components/
    │   └── ManageAccountScreen/
    │       ├── ManageAccountScreen.tsx
    │       └── ManageAccountScreen.module.css
    ├── screens/
    │   ├── Home/
    │   │   ├── index.ts
    │   │   ├── HomeScreen.tsx
    │   │   └── HomeScreen.module.css
    │   ├── CMS/
    │   │   ├── index.ts
    │   │   ├── CMSScreen.tsx
    │   │   └── CMSScreen.module.css
    │   ├── NotFound/
    │   │   ├── index.ts
    │   │   ├── NotFoundScreen.tsx
    │   │   └── NotFoundScreen.module.css
    │   ├── ServerError/
    │   │   ├── index.ts
    │   │   ├── ServerErrorScreen.tsx
    │   │   └── ServerErrorScreen.module.css
    │   └── [otherScreens]/
    ├── App.tsx
    ├── App.css
    └── main.tsx
```

## Implementation Steps

### 1. Project Configuration

- **package.json**: Set up dependencies:
  - React, TypeScript, Vite
  - styled-components for ThemeProvider only
  - axios for HTTP client
  - react-router-dom for routing
  - ESLint dev dependencies: `eslint`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-import-resolver-typescript`
  - Prettier dev dependencies: `prettier`, `eslint-config-prettier`, `eslint-plugin-prettier`
- **.gitignore**: Standard Vite/React gitignore:
  - node_modules, dist, .env, .DS_Store, etc.
  - Include copy.json in git (updated by GitHub Action)
- **tsconfig.json**: Configure TypeScript with:
  - Strict mode mandatory (`"strict": true` and all strict flags enabled)
  - Path aliases:
    - `@/*` → `./src/*` (general src alias)
    - `@/components` → `./src/components`
    - `@/utils` → `./src/utils`
    - `@/theme` → `./src/theme`
    - `@/providers` → `./src/providers`
    - `@/services` → `./src/services`
    - `@/screens` → `./src/screens`
    - `@/data` → `./src/data`
    - `@/types` → `./src/types`
  - Target: ES2020, Module: ESNext
  - Modern browser support (last 2 versions)
- **.eslintrc.cjs**: ESLint configuration:
  - TypeScript parser and plugin
  - React and React Hooks rules
  - Path alias support via `eslint-import-resolver-typescript`
  - Extends: `eslint:recommended`, `plugin:react/recommended`, `plugin:react-hooks/recommended`, `plugin:@typescript-eslint/recommended`
  - Prettier integration
- **.prettierrc**: Prettier configuration:
  - Code formatting rules (semi, singleQuote, tabWidth, etc.)
  - Integration with ESLint
- **vite.config.ts**: Configure Vite with:
  - React plugin
  - CSS Modules (camelCase)
  - Path alias resolution for all aliases
  - Modern browser targets (last 2 versions)
- **index.html**: Create root HTML file with:
  - Basic meta tags (viewport, charset)
  - Title tag
  - Favicon link (if needed)

### 2. Theme System Core

- **src/theme/types.ts**: Define `ThemeColors`, `ThemeSpacing`, and `Theme` interfaces
- **src/theme/colors.ts**: Export color definitions (primary, secondary, background, text, etc.)
- **src/theme/spacing.ts**: Export spacing scale (xs, sm, md, lg, xl, xxl)
- **src/theme/index.ts**: Combine colors and spacing into theme object and re-export
- **src/theme/styled.d.ts**: TypeScript declaration to extend styled-components DefaultTheme

### 3. Theme Provider & Hooks

- **src/providers/ThemeProvider.tsx**: Wrap app with styled-components ThemeProvider (only used for theme context, not styled components)
- **src/utils/useAppTheme.ts**: Custom hook that wraps `useTheme()` from styled-components and returns typed theme
- **src/utils/createStyles.ts**: Utility function that converts theme object to CSS variables object (returns CSSProperties with `--color-*` and `--spacing-*` variables)

### 4. Services Layer (Axios-based)

- **src/services/clients/apiClient.ts**: Create Axios instance with base configuration:
  - Configure baseURL from `import.meta.env.VITE_API_BASE_URL`
  - Configure timeout from `import.meta.env.VITE_API_TIMEOUT` (or default value)
  - Set up request/response interceptors
  - Export typed AxiosInstance
- **src/services/clients/index.ts**: Export all client instances (`export { apiClient, authClient }`)
- **src/services/apiService.ts**: Base service class:
  - Constructor: `constructor(protected client: AxiosInstance)`
  - Generic methods: `get()`, `post()`, `put()`, `delete()` using `this.client`
  - TypeScript generics for response types
- **src/services/userService.ts**: Example service:
  - Extends `ApiService`
  - Constructor takes `AxiosInstance` and passes to `super(client)`
  - Named methods like `getUserById({ id }: { id: string })` that use `this.client`
- **src/services/authService.ts**: Example service with methods like `login({ email, password })`
- **src/services/copyService.ts**: Copy service for reading page content from JSON file:
  - Does NOT extend `ApiService` (no API client needed)
  - Imports `copyData` from `@/data/copy.json`
  - Methods like `getPageContent({ pageId }: { pageId: string })` that parse the JSON file
  - Returns typed copy content structure
  - GitHub Action periodically updates `src/data/copy.json` with latest CMS data
- **src/services/index.ts**: Singleton exports:
  - Import clients from `./clients` (for API services)
  - Create singleton instances: `export const userService = new UserService(apiClient)`
  - Export all services including `copyService` (no client needed)

### 5. Component Pattern Example

- **src/components/ManageAccountScreen/ManageAccountScreen.tsx**: Example component showing pattern:
  - Import `useAppTheme` and `createStyles`
  - Use `useMemo` to memoize CSS variables from theme
  - Apply CSS variables via `style` prop on root element
  - Use CSS Module classes for component-scoped styles
  - Example service usage: `import { userService } from '@/services'`
- **src/components/ManageAccountScreen/ManageAccountScreen.module.css**: Example CSS Module using CSS variables (`var(--color-primary)`, `var(--spacing-md)`, etc.)

### 6. Screens Architecture (Copy-Driven)

- **src/data/copy.json**: Single large JSON file containing all copy/content data
  - Updated periodically via GitHub Action that syncs from CMS
  - Imported directly into copyService (bundled at build time)
  - Structure defined by TypeScript interfaces in `src/types/copy.ts`

- **src/types/copy.ts**: TypeScript interfaces for copy.json structure
  - Defines `CopyData` interface matching JSON schema
  - Ensures type safety when parsing copy data

- **src/screens/**: Copy-driven screens that render data from JSON file
  - Each screen folder contains: `index.ts`, `[ScreenName].tsx`, `[ScreenName].module.css`
  - Screens are reusable layouts that map JSON data from copy.json to UI components
  
- **src/screens/Home/HomeScreen.tsx**: Example home screen:
  - Gets copy content via service: `copyService.getPageContent({ pageId: 'home' })`
  - Maps JSON structure to display components
  - Uses theme system with `useAppTheme()` and `createStyles()`
  - Reusable pattern for all copy-driven pages

- **src/screens/Home/index.ts**: Export screen component for clean imports

- **Pattern**: JSON from copy.json → TypeScript interfaces → Screen component → Render with theme/styles
  - TypeScript interfaces define expected JSON schema from copy.json
  - Screen components map JSON data to UI components
  - Each screen can have its own mapping logic while sharing common patterns
  - No API calls needed - data is read from bundled JSON file

### 7. Routing Setup (React Router v6)

- **Installation**: Add `react-router-dom` and `@types/react-router-dom` to dependencies
- **src/App.tsx**: Set up BrowserRouter wrapper:
  - Wrap app with `<BrowserRouter>`
  - Define Routes structure
  - Home route: `/` → `<HomeScreen />`
  - Dynamic copy route: `/:pageId` → `<CMSScreen />` (wrapper component that reads copy data)
  - Catch-all route: `*` → `<NotFoundScreen />` (404 handling)
- **src/screens/CMS/CMSScreen.tsx**: Dynamic screen wrapper component:
  - Uses `useParams()` to get `pageId` from URL
  - Gets copy content: `copyService.getPageContent({ pageId })`
  - Maps JSON to appropriate screen component or layout
  - No loading states needed (synchronous JSON read)
  - Handles error states (missing pageId, etc.)
- **src/screens/CMS/index.ts**: Export CMSScreen component
- **Lazy Loading**: Implement code splitting with `React.lazy()` and `Suspense` for screen components
- **Navigation**: Use `<Link>` and `useNavigate()` hooks for navigation between screens

### 8. App Setup

- **src/App.tsx**: 
  - Wrap app with ThemeProvider
  - Set up BrowserRouter with Routes
  - Configure route structure (home + dynamic copy routes)
  - Add Suspense boundaries for lazy-loaded screens
  - Add catch-all route `*` → `<NotFoundScreen />` for 404 handling
- **src/App.css**: Global styles reset:
  - CSS reset to remove browser defaults (margins, padding, box-sizing)
  - Base typography styles
  - Global utility classes if needed
  - Uses CSS variables from theme system
- **src/main.tsx**: React entry point

### 9. Environment Configuration

- **.env**: Environment variables file (gitignored)
  - `VITE_API_BASE_URL` - Base URL for API services
  - `VITE_API_TIMEOUT` - Request timeout in milliseconds
  - Add other environment-specific variables as needed
- **.env.example**: Example environment file with placeholder values (committed to git)
  - Documents required environment variables
- **vite.config.ts**: Vite automatically loads `.env` files
  - Access via `import.meta.env.VITE_API_BASE_URL`
- **src/services/clients/apiClient.ts**: Use environment variables:
  - `baseURL` from `import.meta.env.VITE_API_BASE_URL`
  - `timeout` from `import.meta.env.VITE_API_TIMEOUT` (or default)

### 10. Code Quality Setup

- **ESLint Configuration**:
  - TypeScript ESLint plugin for type-aware linting
  - React and React Hooks rules enabled
  - Path alias support via `eslint-import-resolver-typescript`
  - Extends recommended configs for React and TypeScript
  - Prettier integration to avoid conflicts
- **Prettier Configuration**:
  - Consistent code formatting rules
  - Semicolons, quotes, tab width, etc.
  - Integration with ESLint via `eslint-config-prettier`
- **package.json scripts**:
  - `lint`: Run ESLint on src directory
  - `lint:fix`: Fix ESLint errors automatically
  - `format`: Format code with Prettier
  - `type-check`: Run TypeScript compiler in check mode

### 11. Error Pages Setup

- **src/screens/NotFound/NotFoundScreen.tsx**: 404 error page component
  - Uses theme system with `useAppTheme()` and `createStyles()`
  - Displays 404 error message
  - Includes navigation back to home
- **src/screens/NotFound/index.ts**: Export NotFoundScreen component
- **src/screens/NotFound/NotFoundScreen.module.css**: Styles for 404 page
- **src/screens/ServerError/ServerErrorScreen.tsx**: 500 error page component
  - Uses theme system with `useAppTheme()` and `createStyles()`
  - Displays 500 error message
  - Includes navigation back to home
- **src/screens/ServerError/index.ts**: Export ServerErrorScreen component
- **src/screens/ServerError/ServerErrorScreen.module.css**: Styles for 500 page

### 12. GitHub Action Workflow (Future)

- **.github/workflows/copy-sync.yml**: Placeholder for future GitHub Action
  - Will sync copy.json from CMS source
  - Trigger: Scheduled, manual, or webhook
  - Details to be implemented later

## CSS System Pattern

**Component Usage:**
```typescript
const { theme } = useAppTheme();
const themeStyles = useMemo(() => createStyles(theme), [theme]);

<div className={styles.container} style={themeStyles}>
  {/* CSS variables available in CSS Modules */}
</div>
```

**CSS Module Usage:**
```css
.container {
  background-color: var(--color-background);
  padding: var(--spacing-md);
}
```

## Services Usage Pattern

**Service Method Pattern:**
```typescript
// In service file
class UserService extends ApiService {
  constructor(client: AxiosInstance) {
    super(client);
  }
  
  getUserById({ id }: { id: string }) {
    return this.client.get(`/users/${id}`);
  }
}

// In component/file
import { userService } from '@/services';
const user = await userService.getUserById({ id: '123' });
```

**Client Configuration:**
- API services take AxiosInstance in constructor (dependency injection)
- Multiple clients can be created for different APIs/base URLs
- Clients configured with interceptors, base URLs, headers
- Copy service does NOT use a client (reads from JSON file directly)
- Singleton pattern: services exported as instances from `@/services`

## Screens Usage Pattern

**Copy Service Method:**
```typescript
// In copyService.ts
import copyData from '@/data/copy.json';
import { CopyData } from '@/types/copy';

class CopyService {
  private data: CopyData = copyData;

  getPageContent({ pageId }: { pageId: string }) {
    return this.data.pages?.[pageId];
  }
}

export const copyService = new CopyService();

// In HomeScreen.tsx
import { copyService } from '@/services';
import { useAppTheme } from '@/utils/useAppTheme';
import { createStyles } from '@/utils/createStyles';

const { theme } = useAppTheme();
const themeStyles = useMemo(() => createStyles(theme), [theme]);

const pageData = copyService.getPageContent({ pageId: 'home' });
// Map data to components based on JSON structure
// No async/await needed - synchronous JSON read
```

**Screen Structure:**
- Screens read copy data from JSON file and map to UI components
- Reusable layouts adapt to different content structures
- TypeScript interfaces define expected JSON schema
- Each screen folder contains: `index.ts` (exports), `[ScreenName].tsx` (component), `[ScreenName].module.css` (styles)
- Import pattern: `import { HomeScreen } from '@/screens/Home'`
- No async data fetching - copy service reads synchronously from bundled JSON

## Routing Usage Pattern

**Route Structure:**
```typescript
// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const HomeScreen = lazy(() => import('@/screens/Home'));
const CMSScreen = lazy(() => import('@/screens/CMS'));

<BrowserRouter>
  <ThemeProvider>
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/:pageId" element={<CMSScreen />} />
      </Routes>
    </Suspense>
  </ThemeProvider>
</BrowserRouter>
```

**Dynamic Copy Screen:**
```typescript
// CMSScreen.tsx
import { useParams } from 'react-router-dom';
import { copyService } from '@/services';

const CMSScreen = () => {
  const { pageId } = useParams<{ pageId: string }>();
  const pageData = copyService.getPageContent({ pageId: pageId || '' });
  
  if (!pageData) {
    return <NotFound />;
  }
  
  // Map copy data to components
  return <CMSLayout data={pageData} />;
};
```

**Navigation:**
```typescript
// In components
import { Link, useNavigate } from 'react-router-dom';

// Using Link
<Link to="/about">About</Link>

// Using navigate hook
const navigate = useNavigate();
navigate('/contact');
```

## Key Features

- TypeScript throughout with proper type definitions
- TypeScript strict mode mandatory for maximum type safety
- CSS Modules for component-scoped styles
- CSS Variables for theme values (colors, spacing)
- Theme accessible via `theme.colors.*` and `theme.spacing.*` in TypeScript
- CSS variables accessible via `var(--color-*)` and `var(--spacing-*)` in CSS Modules
- CSS reset for consistent cross-browser styling
- Path aliases configured for all base folders (`@/components`, `@/utils`, `@/theme`, `@/providers`, `@/services`, `@/screens`, `@/data`, `@/types`)
- Memoized theme styles for performance
- ESLint and Prettier for code quality and consistent formatting
- Modern browser support (last 2 versions)
- Axios-based HTTP client with dependency injection pattern
- Service layer with singleton exports
- Named service methods that accept typed parameter objects
- Environment variable configuration via .env files
- Copy-driven screens architecture with reusable layouts
- JSON data mapping from bundled copy.json file to screen components
- TypeScript interfaces for copy content structure
- Copy service reads from single JSON file (no API calls)
- GitHub Action syncs copy.json periodically from CMS
- GitHub Action workflow placeholder for copy.json sync
- React Router v6 for navigation and dynamic copy routes
- Code splitting with lazy loading for screen components
- Dynamic route handling for CMS pages via URL params
- 404 and 500 error pages with theme integration
- Error handling can be implemented per-component as needed

