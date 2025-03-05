# Employee Attendance System

A modern web-based attendance management system built with React, TypeScript, and Vite.

## Project Structure and File Descriptions

### Core Configuration Files

#### `package.json`
- Defines project dependencies and scripts
- Key dependencies:
  - React 18.3.1 for UI components
  - TypeScript for type safety
  - Vite for build tooling
  - TailwindCSS for styling
  - Lucide React for icons

#### `vite.config.ts`
```typescript
- Configures Vite build tool
- Sets up React plugin
- Handles dependency optimization
```

#### `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
```typescript
- TypeScript configuration files
- Define compiler options
- Set up module resolution
- Configure React JSX handling
```

### Source Code Files

#### `src/App.tsx`
```typescript
- Main application component
- Implements core functionality:
  - User authentication
  - Attendance tracking
  - Admin dashboard
  - Employee management
- Uses React hooks for state management
```

#### `src/main.tsx`
```typescript
- Application entry point
- Sets up React rendering
- Imports global styles
```

#### `src/index.css`
```css
- Global styles
- TailwindCSS imports
- Utility classes
```

### Styling and UI

#### `tailwind.config.js`
```javascript
- TailwindCSS configuration
- Defines content sources
- Theme customization
```

#### `postcss.config.js`
```javascript
- PostCSS configuration
- Sets up TailwindCSS and Autoprefixer
```

### HTML Entry Point

#### `index.html`
```html
- Main HTML template
- Loads React application
- Sets viewport and metadata
```

### Development Tools

#### `eslint.config.js`
```javascript
- ESLint configuration
- Code quality rules
- TypeScript and React specific linting
```

### Version Control

#### `.gitignore`
```plaintext
- Specifies files to ignore in version control
- Excludes node_modules, build files, and IDE settings
```

#### `.gitattributes`
```plaintext
- Git attributes configuration
- Handles line ending normalization
```

## Technologies Used

1. **Frontend Framework**
   - React (18.3.1)
   - TypeScript for type safety

2. **Build Tools**
   - Vite
   - PostCSS
   - Autoprefixer

3. **Styling**
   - TailwindCSS
   - CSS Modules

4. **Development Tools**
   - ESLint
   - TypeScript ESLint
   - React Refresh

5. **UI Components**
   - Lucide React for icons
   - Custom React components

## Features

1. **Authentication System**
   - Login/Logout functionality
   - Role-based access (Admin/Employee)

2. **Admin Dashboard**
   - Employee management
   - Attendance record viewing
   - User deletion

3. **Employee Features**
   - Check-in/Check-out
   - View personal attendance history

4. **Data Persistence**
   - Local storage implementation
   - Session management

## Local Development Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Default Credentials

```
Admin Login:
Email: admin@gmail.com
Password: admin
```