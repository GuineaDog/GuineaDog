# Quick Start Guide

This guide contains common development commands for formatting, linting, testing, and dependency management.

## 🛠 Development Commands

### Formatting

```
# Format all files (code and documentation)
npm run format; npm run nrm-tpgr

# Check formatting of specified files (without changes)
# npx prettier path/to/file1.ext path/to/fi*.ext --check

# Format specified files
# npx prettier path/to/file1.ext path/to/fi*.ext --write
```

### Linting

```
# Automatically fix some errors and warnings (project-wide)
# Report only: npm run lint
npm run lint:fix

# ESLint check for specified files
# npx eslint path/to/file1.ext path/to/fi*.ext

# ESLint auto-fix for specified files
# npx eslint path/to/file1.ext path/to/fi*.ext --fix
```

### Type Checking

```
# Run TypeScript type checks
npm run type-check
```

### Build and Pack

```
# Build and package the normalize-typography package
cd ./packages/normalize-typography/ && npm run clean && npm run build && npm run pack; cd ../../
```

### Testing

```
# Run all tests
npm run test
```

## 📦 Dependency Management

```
# Check for new versions of explicitly specified dependencies
# workspaces' dependencies
echo "Prod dependencies:"; npm outdated --workspaces --omit=dev; echo "#####"; echo "Prod+Dev dependencies:"; npm outdated --workspaces --include=dev
# root dependencies
echo "Prod dependencies:"; npm outdated --omit=dev; echo "#####"; echo "Prod+Dev dependencies:"; npm outdated --include=dev

# Update all dependencies according to package.json ranges
npm update --workspaces && npm update

# npm prune - removes unused packages from node_modules (those not in package.json). Useful after manual manipulations.
# Report only: npm prune --dry-run
npm prune --workspaces && npm prune

# npm dedupe - attempts to flatten the dependency tree to remove duplicates. Helps reduce node_modules size.
# Report only: npm dedupe --dry-run
npm dedupe --workspaces && npm dedupe

# knip - helps keep the project clean of unused code, files, and dependencies
# Auto-fix: npm run knip -- --fix
npm run knip

# dependency-cruiser - analyzes internal project dependencies between files and modules
npm run lint:deps

# npm audit - checks all dependencies for known vulnerabilities
# Auto-fix: npm audit fix
npm audit --workspaces && npm audit

# Final check for outdated dependencies
# workspaces' dependencies
echo "Prod dependencies:"; npm outdated --workspaces --omit=dev; echo "#####"; echo "Prod+Dev dependencies:"; npm outdated --workspaces --include=dev
# root dependencies
echo "Prod dependencies:"; npm outdated --omit=dev; echo "#####"; echo "Prod+Dev dependencies:"; npm outdated --include=dev
```
