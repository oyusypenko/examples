# Books Management Application

## Prerequisites

- Node.js version 16.x

## Setup

```bash
# Install dependencies
npm install

# Start the application
npm run start
```

## Overview

A React application for managing books using MobX and MVVM pattern.

## Architecture

**Model-View-ViewModel (MVVM)**:

- **View**: React components
- **ViewModel**: MobX stores
- **Model**: Domain entities and repositories

## Project Structure

```
src/
├── controllers/     # Business logic handlers
├── models/          # Domain entities
├── repositories/    # Data access layer
├── services/        # External services integration
├── stores/          # MobX state management
└── views/           # React components
```

## Technologies

- React
- MobX
- Jest

## Implementation Details

### State Management

- Observable state
- Actions to modify state
- Computed values

### Repository Pattern

- Abstracts data access operations
- Enables mocking for tests

### Testing Strategy

- Stores: State management testing
- Repositories: Data transformation testing
- Controllers: Business logic testing