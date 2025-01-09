# AI Tribes V2 Repository Strategy

## Initial Setup

1. Create New Repository:
```bash
mkdir ai-tribes-v2
cd ai-tribes-v2
git init
```

2. Reference Setup (Optional):
```bash
mkdir _reference
cd _reference
git clone https://github.com/your-username/ai-tribes-next.git legacy
```

## Repository Structure
```
ai-tribes-v2/
├── src/                    # New clean architecture
│   ├── features/          # Feature modules
│   ├── components/        # Shared components
│   └── app/              # Next.js app
├── public/                # Public assets
├── _reference/            # (Optional) For reference only
│   └── legacy/           # Clone of old repo
└── package.json          # Fresh dependencies
```

## Setup Process

### 1. Initialize New Project
```bash
# Create new Next.js project with latest features
npx create-next-app@latest ai-tribes-v2 --typescript --tailwind --app --src-dir --import-alias "@/*"

# Move into project directory
cd ai-tribes-v2

# Initialize Git
git init
git add .
git commit -m "feat: Initial commit with fresh Next.js setup"
```

### 2. Create Basic Structure
```bash
# Create core directories
mkdir -p src/features
mkdir -p src/components/ui
mkdir -p src/lib

# Add initial configuration files
touch .env.local
touch .env.example
```

### 3. Development Setup

1. Package.json (Fresh start):
```json
{
  "name": "ai-tribes-v2",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest",
    "type-check": "tsc --noEmit"
  }
}
```

2. Next.js Configuration:
```typescript
// next.config.mjs
const config = {
  reactStrictMode: true,
  images: {
    domains: ['your-domains-here'],
  },
  // Start with minimal configuration
  // Add features as needed
};

export default config;
```

## Development Workflow

### 1. Feature Implementation
- Start fresh with each feature
- Reference old code only when needed
- Implement with new best practices
- No copy-pasting from old codebase

### 2. Asset Management
- Start with fresh assets in `public/`
- Optimize all assets before adding
- Use modern image formats (WebP)
- Implement proper lazy loading

### 3. Code Quality
- Start with strict TypeScript
- Implement ESLint from day one
- Set up Prettier
- Add test infrastructure immediately

## Deployment Strategy

### 1. Development
- Deploy to new domain/subdomain
- No connection to old deployment
- Fresh environment variables
- New database instance

### 2. Testing
- Fresh test environment
- New test database
- No shared resources with legacy

### 3. Production
- Deploy to separate infrastructure
- Use new domain initially
- Plan domain transition later

## Version Control Best Practices

### 1. Commit Strategy
```
feat: Add new feature
fix: Fix issue in new code
docs: Update documentation
style: Format code
refactor: Refactor implementation
test: Add tests
```

### 2. Branch Strategy (Simple)
- `main`: Primary development
- `feature/*`: New features
- `fix/*`: Bug fixes
- No need for complex branching

## Reference Strategy

### 1. Using Legacy Code
- Never copy-paste directly
- Study patterns and improve
- Document what was referenced
- Note improvements made

### 2. Asset Migration
- Copy needed assets to new `public/`
- Optimize during migration
- Update all asset references
- Document asset sources

## Success Criteria

### 1. Clean Codebase
- No legacy patterns
- Full TypeScript coverage
- Comprehensive tests
- Clear documentation

### 2. Better Performance
- Improved load times
- Better optimization
- Cleaner code splits
- Optimized assets

### 3. Enhanced Features
- Improved implementations
- Better user experience
- Cleaner architecture
- Modern best practices

### 4. Documentation
- Fresh documentation
- Clear architecture docs
- API documentation
- Setup guides

This strategy provides a clean slate while keeping the old code available for reference when needed. 