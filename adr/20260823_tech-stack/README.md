# ADR: Tech Stack — React + Vite

**Date:** 2026-08-23
**Status:** Accepted

## Context

We need a web application for designing and printing digital camera skins.
The app has interactive UI requirements (dynamic canvas rendering, drag-and-drop, form controls)
but does not require a backend or server-side rendering.

Vanilla JS was considered but rejected due to the complexity of managing reactive state
across multiple components (camera selector, image upload, canvas preview, print layout).

## Decision

Use **React 19** (JSX) as the UI framework, bundled with **Vite 8**.

- React provides component-based architecture and efficient reactive state management.
- Vite provides a fast development server with HMR and a lean production build.
- CSS Modules are used for scoped component styling without a CSS-in-JS runtime overhead.
- No TypeScript in the initial version to keep onboarding low; can be added later.

## Consequences

- Developers need familiarity with React and JSX.
- Build step required (Vite); not a zero-build vanilla HTML page.
- Future migration to TypeScript is straightforward with Vite.
