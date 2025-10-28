# AI Agent Instructions for CodeMaster

## Project Overview
CodeMaster is a modern React & TypeScript web application with a modular architecture. The application includes multiple feature modules including POS (Point of Sale), Room Planner, and Task Management capabilities.

## Key Architecture Patterns

### 1. Application Structure
- `src/features/` - Contains feature modules (POS, canvas-area, etc.)
- `src/components/` - Reusable UI components organized by type (buttons, tables, etc.)
- `src/contexts/` - React contexts for global state management
- `src/database/` - Local database implementation using IndexedDB
- `src/apis/` - API client implementations and utilities

### 2. State Management
- Uses combination of React Context (`AppSessionContext`) and Redux
- Global session state managed via `AppSessionContext`
- Feature-specific state managed in respective Redux slices

### 3. Database Layer
- Uses IndexedDB for local data persistence
- Key implementation in `src/database/localDb/LocalDb.ts`
- Handles schema migrations and data backups automatically
- Example usage:
```typescript
const db = new LocalDb();
await db.init();
await db.create('storeName', data);
```

### 4. UI Components
- Built on React 19.x with TypeScript
- Uses Konva for canvas-based interactions (Room Planner)
- Component hierarchy:
  - `AppContainer` → `AppLayout` → Feature-specific layouts
  - Shared components in `src/components/`

## Development Workflow

### Getting Started
```bash
cd client
npm install
npm run dev
```

### Build Commands
- `npm run dev` - Development server with HMR
- `npm run build` - Production build (runs TypeScript compile first)
- `npm run lint` - ESLint checking

## Common Patterns

### Feature Module Structure
New features should follow this structure:
```
features/
  feature-name/
    components/     # Feature-specific components
    hooks/         # Custom hooks
    store/         # Redux slice if needed
    types/         # TypeScript interfaces
    index.ts       # Public API
```

### Data Flow
1. API calls through `src/apis/`
2. Local state in IndexedDB via `LocalDb`
3. UI state in Redux/Context
4. Component-level state for UI-only concerns

### Canvas Interactions
Canvas-based features use react-konva:
- Implement shape components in `features/canvas-area/`
- Use `Konva.Layer` for grouping related elements
- Handle transformations via Konva's built-in tools

## Common Pitfalls
- Always initialize LocalDb before using it
- Use proper type definitions from `src/database/localDb/Interfaces.ts`
- Prefer controlled components for form inputs
- Handle IndexedDB errors appropriately using try-catch

## Testing & Quality
- ESLint configured for React and TypeScript
- Follow existing patterns in similar components
- Use TypeScript strict mode
- Document complex business logic

## External Dependencies
- React 19.x
- Redux Toolkit for state management
- Konva/react-konva for canvas operations
- Bootstrap 5.x for base styling
- Axios for HTTP requests
