# AI Tribes V2 Setup Guide

## Prerequisites
- Node.js 18+ installed
- Git installed
- GitHub account
- Code editor (VS Code recommended)
- Package manager (npm/yarn/pnpm)

## Step-by-Step Setup

### 1. Repository Setup
```bash
# Create project directory
mkdir ai-tribes-v2
cd ai-tribes-v2

# Initialize Next.js project
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-eslint \
  --no-prettier

# Initialize Git
git init
git add .
git commit -m "feat: Initial commit with fresh Next.js setup"

# Create reference directory (optional)
mkdir _reference
cd _reference
git clone https://github.com/your-username/ai-tribes-next.git legacy
cd ..
```

### 2. Project Structure Setup
```bash
# Create core directories
mkdir -p src/features
mkdir -p src/components/ui
mkdir -p src/lib
mkdir -p src/types
mkdir -p src/utils
mkdir -p src/hooks
mkdir -p src/styles
mkdir -p public/assets

# Create configuration files
touch .env.local .env.example
touch .prettierrc.json .prettierignore
touch .eslintrc.json .eslintignore
touch jest.config.js
touch tsconfig.json
```

### 3. Dependencies Installation

```bash
# Core dependencies
npm install @tanstack/react-query
npm install @prisma/client
npm install zod
npm install @trpc/server @trpc/client
npm install @stripe/stripe-js

# Development dependencies
npm install -D @types/node @types/react @types/react-dom
npm install -D typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install -D prettier eslint-config-prettier eslint-plugin-prettier
npm install -D jest @testing-library/react @testing-library/jest-dom
npm install -D husky lint-staged
npm install -D prisma
```

### 4. Configuration Files

1. TypeScript Configuration (`tsconfig.json`):
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules", "_reference"]
}
```

2. ESLint Configuration (`.eslintrc.json`):
```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "plugins": ["@typescript-eslint", "prettier"],
  "rules": {
    "prettier/prettier": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "error"
  }
}
```

3. Prettier Configuration (`.prettierrc.json`):
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false
}
```

4. Jest Configuration (`jest.config.js`):
```javascript
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);
```

### 5. Environment Setup

1. Create `.env.local`:
```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/ai_tribes_v2"

# Authentication
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your-key-here"
STRIPE_SECRET_KEY="your-secret-key-here"
```

2. Create `.env.example` (same as above but with placeholder values)

### 6. Git Setup

1. Create `.gitignore`:
```gitignore
# Dependencies
node_modules
.pnp
.pnp.js

# Testing
coverage

# Next.js
.next/
out/

# Production
build
dist

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env*.local

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts

# Reference
_reference/
```

2. Set up Husky:
```bash
# Initialize Husky
npx husky-init && npm install

# Add pre-commit hook
npx husky add .husky/pre-commit "npx lint-staged"
```

3. Configure lint-staged in `package.json`:
```json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

### 7. VS Code Setup

1. Create `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### 8. Initial Test Setup

1. Create `jest.setup.js`:
```javascript
import '@testing-library/jest-dom';
```

2. Add test script to `package.json`:
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

### 9. Verification Steps

1. Run development server:
```bash
npm run dev
```

2. Run tests:
```bash
npm test
```

3. Check linting:
```bash
npm run lint
```

4. Verify Git hooks:
```bash
git commit -m "test: Add test commit"
```

This setup provides a solid foundation for the V2 project with proper tooling and configuration. 