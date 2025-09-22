# Contributing to AINevis

Thank you for your interest in contributing to AINevis! We welcome contributions from the community and are grateful for any help you can provide.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Issue Guidelines](#issue-guidelines)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

1. **Fork the Repository**: Fork the AINevis repository to your GitHub account
2. **Clone Your Fork**: Clone your fork to your local machine
3. **Set Up Upstream**: Add the original repository as an upstream remote

```bash
git clone https://github.com/your-username/AIN-NextJS.git
cd AIN-NextJS
git remote add upstream https://github.com/original-username/AIN-NextJS.git
```

## Development Setup

### Prerequisites

- Node.js 18 or higher
- Yarn package manager
- Git

### Installation

1. **Install dependencies**:
   ```bash
   yarn install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env.development
   ```

   Configure the environment variables according to your setup.

3. **Start the development server**:
   ```bash
   yarn dev
   ```

## How to Contribute

### Types of Contributions

We welcome various types of contributions:

- 🐛 **Bug fixes**
- ✨ **New features**
- 📚 **Documentation improvements**
- 🎨 **UI/UX enhancements**
- 🌍 **Translations**
- 🧪 **Tests**
- 🔧 **Code refactoring**
- ⚡ **Performance improvements**

### Before You Start

1. **Check existing issues**: Look for existing issues or discussions related to your contribution
2. **Create an issue**: If no relevant issue exists, create one to discuss your proposed changes
3. **Get consensus**: Wait for maintainer feedback before starting significant work

## Pull Request Process

### 1. Create a Branch

Create a new branch for your feature or fix:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 2. Make Your Changes

- Write clean, readable code
- Follow the existing code style
- Add comments where necessary
- Update documentation if needed

### 3. Test Your Changes

```bash
# Run linting
yarn lint

# Build the project
yarn build

# Test in development
yarn dev
```

### 4. Commit Your Changes

Follow our [commit guidelines](#commit-guidelines):

```bash
git add .
git commit -m "feat: add new content generation feature"
```

### 5. Push and Create PR

```bash
git push origin your-branch-name
```

Then create a Pull Request on GitHub.

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper interfaces and types
- Avoid `any` type unless absolutely necessary
- Use meaningful variable and function names

### React Components

- Use functional components with hooks
- Follow the single responsibility principle
- Use proper prop types and interfaces
- Implement proper error boundaries where needed

### File Naming

- Use `PascalCase` for component files: `MyComponent.tsx`
- Use `camelCase` for utility files: `myUtility.ts`
- Use `kebab-case` for CSS files: `my-styles.css`

### Code Structure

```typescript
// Component structure example
import React from 'react'
import { ComponentProps } from './types'

interface MyComponentProps extends ComponentProps {
  title: string
  onAction: () => void
}

export const MyComponent: React.FC<MyComponentProps> = ({
  title,
  onAction,
  ...props
}) => {
  // Component logic here

  return (
    <div {...props}>
      <h1>{title}</h1>
      <button onClick={onAction}>Action</button>
    </div>
  )
}

export default MyComponent
```

### Styling

- Use Tailwind CSS classes primarily
- Create custom CSS only when necessary
- Follow the existing theme configuration
- Ensure responsive design
- Support both light and dark themes

## Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

### Examples

```bash
feat: add AI chat functionality
fix: resolve authentication redirect issue
docs: update API documentation
style: improve button hover states
refactor: optimize content generation logic
perf: reduce bundle size by code splitting
test: add tests for user authentication
chore: update dependencies
```

## Issue Guidelines

### Bug Reports

When reporting bugs, please include:

- **Description**: Clear description of the issue
- **Steps to Reproduce**: Detailed steps to reproduce the bug
- **Expected Behavior**: What you expected to happen
- **Actual Behavior**: What actually happened
- **Environment**: OS, browser, Node.js version, etc.
- **Screenshots**: If applicable

### Feature Requests

When suggesting features, please include:

- **Description**: Clear description of the feature
- **Use Case**: Why this feature would be useful
- **Implementation Ideas**: Any ideas on how to implement it
- **Alternatives**: Alternative solutions you've considered

## Development Workflow

### Branch Naming

- `feature/description` - for new features
- `fix/description` - for bug fixes
- `docs/description` - for documentation
- `refactor/description` - for refactoring
- `test/description` - for tests

### Code Review Process

1. **Automated Checks**: Ensure all CI checks pass
2. **Code Review**: Wait for at least one approving review
3. **Address Feedback**: Make necessary changes based on feedback
4. **Final Approval**: Get final approval from maintainers

## Testing

### Running Tests

```bash
# Run linting
yarn lint

# Build project
yarn build
```

### Test Coverage

- Write tests for new features
- Ensure existing tests pass
- Aim for meaningful test coverage

## Documentation

### Code Documentation

- Use JSDoc comments for functions and classes
- Document complex logic with inline comments
- Keep README and other docs up to date

### API Documentation

- Document all API endpoints
- Include request/response examples
- Document error codes and messages

## Internationalization

### Adding Translations

1. Add new keys to `messages/en/` files
2. Add corresponding translations to `messages/fa/` files
3. Use translation keys in components with `useTranslations()`

### Translation Guidelines

- Use clear, descriptive keys
- Provide context for translators
- Test with different languages
- Consider RTL languages (Arabic, Persian, etc.)

## Performance Guidelines

- Optimize images and assets
- Use lazy loading where appropriate
- Minimize bundle size
- Follow React performance best practices
- Use memoization when beneficial

## Accessibility Guidelines

- Follow WCAG 2.1 AA standards
- Use semantic HTML elements
- Provide alt text for images
- Ensure keyboard navigation works
- Test with screen readers

## Getting Help

If you need help with your contribution:

1. **Check the documentation**: Look through existing docs
2. **Search issues**: See if someone else had the same question
3. **Ask in discussions**: Use GitHub Discussions for questions
4. **Contact maintainers**: Reach out to project maintainers

## Recognition

Contributors will be recognized in:

- GitHub contributors list
- Release notes (for significant contributions)
- Special thanks in documentation

Thank you for contributing to AINevis! 🎉

---

## Questions?

If you have any questions about contributing, please feel free to:

- Open an issue
- Start a discussion
- Contact the maintainers

We're here to help and appreciate your contributions!